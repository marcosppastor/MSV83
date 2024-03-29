/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package server;

import client.MapleCharacter;
import client.autoban.AutobanManager;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import constants.ItemConstants;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import net.server.Server;
import tools.FilePrinter;
import tools.MaplePacketCreator;

/**
 *
 * @author Matze
 */
public class MapleTrade {

    private MapleTrade partner = null;
    private List<Item> items = new ArrayList<>();
    private List<Item> exchangeItems;
    private int meso = 0;
    private int exchangeMeso;
    boolean locked = false;
    private MapleCharacter chr;
    private byte number;

    public MapleTrade(byte number, MapleCharacter c) {
        chr = c;
        this.number = number;
    }

    private static int getFee(int meso) {
        int fee = 0;
        if (meso >= 100000000) {
            fee = (int) Math.round(0.06 * meso);
        } else if (meso >= 25000000) {
            fee = meso / 20;
        } else if (meso >= 10000000) {
            fee = meso / 25;
        } else if (meso >= 5000000) {
            fee = (int) Math.round(.03 * meso);
        } else if (meso >= 1000000) {
            fee = (int) Math.round(.018 * meso);
        } else if (meso >= 100000) {
            fee = meso / 125;
        }
        return fee;
    }

    private void lock() {
        locked = true;
        partner.getChr().getClient().announce(MaplePacketCreator.getTradeConfirmation());
    }

    private void complete1() {
        exchangeItems = partner.getItems();
        exchangeMeso = partner.getMeso();
    }

    private void complete2() {
        items.clear();
        meso = 0;
        for (Item item : exchangeItems) {
            if ((item.getFlag() & ItemConstants.KARMA) == ItemConstants.KARMA) {
                item.setFlag((byte) (item.getFlag() ^ ItemConstants.KARMA)); //items with scissors of karma used on them are reset once traded
            } else if (item.getType() == 2 && (item.getFlag() & ItemConstants.SPIKES) == ItemConstants.SPIKES) {
                item.setFlag((byte) (item.getFlag() ^ ItemConstants.SPIKES));
            }

            MapleInventoryManipulator.addFromDrop(chr.getClient(), item, true);
        }
        if (exchangeMeso > 0) {
            chr.gainMeso(exchangeMeso - getFee(exchangeMeso), true, true, true);
        }
        exchangeMeso = 0;
        if (exchangeItems != null) {
            exchangeItems.clear();
        }
        chr.getClient().announce(MaplePacketCreator.getTradeCompletion(number));
    }

    private void cancel() {
        // return the things
        StringBuilder logInfo = new StringBuilder("Troca cancelada ");
        if (partner != null) {
            logInfo.append("com ");
            logInfo.append(partner.getChr().getName());
        }
        logInfo.append(". ");
        logInfo.append(chr.getName());
        logInfo.append(" recebeu o item.");
        for (Item item : items) {
            MapleInventoryManipulator.addFromDrop(chr.getClient(), item, true);
        }
        if (meso > 0) {
            chr.gainMeso(meso, true, true, true);
        }
        meso = 0;
        if (items != null) {
            items.clear();
        }
        exchangeMeso = 0;
        if (exchangeItems != null) {
            exchangeItems.clear();
        }
        chr.getClient().announce(MaplePacketCreator.getTradeCancel(number));
    }

    private boolean isLocked() {
        return locked;
    }

    private int getMeso() {
        return meso;
    }

    public void setMeso(int meso) {
        if (locked) {
            throw new RuntimeException("Trade is locked.");
        }
        if (meso < 0) {
            System.out.println("[h4x] " + chr.getName() + " esta tentando trocar < 0 mesos");
            Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("[AVISO DE TROCA] O jogador(a) " + chr + " acaba de efetuar uma troca, passando 0 mesos ao outro personagem."));
            return;
        }
        if (chr.getMeso() >= meso) {
            chr.gainMeso(-meso, false, true, false);
            this.meso += meso;
            chr.getClient().announce(MaplePacketCreator.getTradeMesoSet((byte) 0, this.meso));
            if (partner != null) {
                partner.getChr().getClient().announce(MaplePacketCreator.getTradeMesoSet((byte) 1, this.meso));
            }
        } else {
            Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("[ALERTA POSSIVEL HACKER] O jogador(a) " + chr + " esta tentando negociar mais mesos do que possui."));
            FilePrinter.printError(FilePrinter.JOGADOR_BANIDO + FilePrinter.POSSIVEL_HACK + "", "Em suma, " + chr + " tentou negociar mais mesos do que possui.\r\n");
        }
    }

    public void addItem(Item item) {
        items.add(item);
        chr.getClient().announce(MaplePacketCreator.getTradeItemAdd((byte) 0, item));
        if (partner != null) {
            partner.getChr().getClient().announce(MaplePacketCreator.getTradeItemAdd((byte) 1, item));
        }
    }

    public void chat(String message) {
        chr.getClient().announce(MaplePacketCreator.getTradeChat(chr, message, true));
        if (partner != null) {
            partner.getChr().getClient().announce(MaplePacketCreator.getTradeChat(chr, message, false));
        }
    }

    public MapleTrade getPartner() {
        return partner;
    }

    public void setPartner(MapleTrade partner) {
        if (locked) {
            return;
        }
        this.partner = partner;
    }

    public MapleCharacter getChr() {
        return chr;
    }

    public List<Item> getItems() {
        return new LinkedList<>(items);
    }

    private boolean fitsInInventory() {
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        Map<MapleInventoryType, Integer> neededSlots = new LinkedHashMap<>();
        for (Item item : exchangeItems) {
            MapleInventoryType type = mii.getInventoryType(item.getItemId());
            if (mii.isPickupRestricted(item.getItemId()) && chr.haveItem(item.getItemId(), 1, true, true)) {
                return false;
            }

            if (neededSlots.get(type) == null) {
                neededSlots.put(type, 1);
            } else {
                neededSlots.put(type, neededSlots.get(type) + 1);
            }
        }
        for (Map.Entry<MapleInventoryType, Integer> entry : neededSlots.entrySet()) {
            if (chr.getInventory(entry.getKey()).isFull(entry.getValue() - 1)) {
                return false;
            }
        }
        return true;
    }

    public static void completeTrade(MapleCharacter c) {
        c.getTrade().lock();
        MapleTrade local = c.getTrade();
        MapleTrade partner = local.getPartner();
        if (partner.isLocked()) {
            local.complete1();
            partner.complete1();
            if (!local.fitsInInventory() || !partner.fitsInInventory()) {
                cancelTrade(c);
                c.message("N�o h� espa�o no invent�rio para concluir a troca.");
                partner.getChr().message("N�o h� espa�o no invent�rio para concluir a troca.");
                return;
            }

            if (local.getChr().getLevel() < 15) {
                if (local.getChr().getMesosTraded() + local.exchangeMeso > 1000000) {
                    cancelTrade(c);
                    local.getChr().getClient().announce(MaplePacketCreator.serverNotice(1, "Personagens abaixo do n�vel 15 s� podem trocar 1M por dia!"));
                    return;
                } else {
                    local.getChr().addMesosTraded(local.exchangeMeso);
                }
            } else if (c.getTrade().getChr().getLevel() < 15) {
                if (c.getMesosTraded() + c.getTrade().exchangeMeso > 1000000) {
                    cancelTrade(c);
                    local.getChr().getClient().announce(MaplePacketCreator.serverNotice(1, "Personagens abaixo do n�vel 15 s� podem trocar 1M por dia!"));
                    return;
                } else {
                    c.addMesosTraded(local.exchangeMeso);
                }
            }
            local.complete2();
            partner.complete2();
            partner.getChr().setTrade(null);
            c.setTrade(null);
        }
    }

    public static void cancelTrade(MapleCharacter c) {
        c.getTrade().cancel();
        if (c.getTrade().getPartner() != null) {
            c.getTrade().getPartner().cancel();
            c.getTrade().getPartner().getChr().setTrade(null);
        }
        c.setTrade(null);
    }

    public static void startTrade(MapleCharacter c) {
        if (c.getTrade() == null) {
            c.setTrade(new MapleTrade((byte) 0, c));
            c.getClient().announce(MaplePacketCreator.getTradeStart(c.getClient(), c.getTrade(), (byte) 0));
        } else {
            c.message("Voc� j� esta em troca.");
        }
    }

    public static void inviteTrade(MapleCharacter c1, MapleCharacter c2) {
        if (c1.gmLevel() == 3 && c2.gmLevel() == 3) {
            c1.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "GameMaster's n�o podem realizar trocas."));
            return;
        }
        if (c2.getTrade() == null) {
            c2.setTrade(new MapleTrade((byte) 1, c2));
            c2.getTrade().setPartner(c1.getTrade());
            c1.getTrade().setPartner(c2.getTrade());
            c2.getClient().announce(MaplePacketCreator.getTradeInvite(c1));
        } else {
            c1.message("O outro jogador ja esta em troca. Aguarde!");
            cancelTrade(c1);
        }
    }

    public static void visitTrade(MapleCharacter c1, MapleCharacter c2) {
        if (c1.getTrade() != null && c1.getTrade().getPartner() == c2.getTrade() && c2.getTrade() != null && c2.getTrade().getPartner() == c1.getTrade()) {
            c2.getClient().announce(MaplePacketCreator.getTradePartnerAdd(c1));
            c1.getClient().announce(MaplePacketCreator.getTradeStart(c1.getClient(), c1.getTrade(), (byte) 1));
        } else {
            c1.message("O outro jogador cancelou a troca.");
        }
    }

    public static void declineTrade(MapleCharacter c) {
        MapleTrade trade = c.getTrade();
        if (trade != null) {
            if (trade.getPartner() != null) {
                MapleCharacter other = trade.getPartner().getChr();
                other.getTrade().cancel();
                other.setTrade(null);
                other.message(c.getName() + " recusou seu pedido de troca.");
            }
            trade.cancel();
            c.setTrade(null);
        }
    }
}
