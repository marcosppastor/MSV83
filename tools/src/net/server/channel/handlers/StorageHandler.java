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
package net.server.channel.handlers;

import client.MapleCharacter;
import client.MapleClient;
import client.autoban.AutobanFactory;
import client.autoban.AutobanManager;
import client.inventory.Item;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import constants.ItemConstants;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import net.AbstractMaplePacketHandler;
import net.server.Server;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleStorage;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Matze
 */
public final class StorageHandler extends AbstractMaplePacketHandler {

    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    private static final SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCharacter chr = c.getPlayer();
        MapleCharacter jogador = c.getPlayer();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        byte mode = slea.readByte();
        final MapleStorage storage = chr.getStorage();
        if (mode == 4) { // take out
            byte type = slea.readByte();
            byte slot = slea.readByte();
            if (slot < 0 || slot > storage.getSlots()) { // removal starts at zero
                AutobanFactory.EDICAO_PACOTE.autoban(jogador, "O jogador(a) " + c.getPlayer().getName() + " tentou alterar pacotes de um armazemm.");
                FilePrinter.printError(FilePrinter.JOGADOR_BANIDO + FilePrinter.EXPLOITS + "", "Em suma, " + c.getPlayer().getName() + " tentou alterar o slot " + slot + " do armazÈm.\r\n");
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O jogador(a) " + c.getPlayer().getName() + " acaba de ser banido(a) automaticamente por EDICAO_PACOTE (Tentou alterar o slot " + slot + " do armazem)."));
                jogador.dropMessage(0, "VocÍ acaba de ser banido(a) automaticamente por EDICAO_PACOTE (Tentou alterar o slot " + slot + " do armazÈm).");
                c.disconnect(true, false);
                return;
            }
            slot = storage.getSlot(MapleInventoryType.getByType(type), slot);
            Item item = storage.getItem(slot);
            if (item != null) {
                if (MapleItemInformationProvider.getInstance().isPickupRestricted(item.getItemId()) && chr.getItemQuantity(item.getItemId(), true) > 0) {
                    c.announce(MaplePacketCreator.getStorageError((byte) 0x0C));
                }
                if (chr.getMap().getId() == 910000000) {
                    if (chr.getMeso() < 1000) {
                        c.announce(MaplePacketCreator.getStorageError((byte) 0x0B));
                        return;
                    } else {
                        chr.gainMeso(-1000, false);
                    }
                }
                if (MapleInventoryManipulator.checkSpace(c, item.getItemId(), item.getQuantity(), item.getOwner())) {
                    item = storage.takeOut(slot);//actually the same but idc
                    if ((item.getFlag() & ItemConstants.KARMA) == ItemConstants.KARMA) {
                        item.setFlag((byte) (item.getFlag() ^ ItemConstants.KARMA)); //items with scissors of karma used on them are reset once traded
                    } else if (item.getType() == 2 && (item.getFlag() & ItemConstants.SPIKES) == ItemConstants.SPIKES) {
                        item.setFlag((byte) (item.getFlag() ^ ItemConstants.SPIKES));
                    }

                    MapleInventoryManipulator.addFromDrop(c, item, false);
                    storage.sendTakenOut(c, ii.getInventoryType(item.getItemId()));
                } else {
                    c.announce(MaplePacketCreator.getStorageError((byte) 0x0A));
                }
            }
        } else if (mode == 5) { // store
            byte slot = (byte) slea.readShort();
            int itemId = slea.readInt();
            short quantidade = slea.readShort();
            if (quantidade < 1 || !c.getPlayer().haveItem(itemId, quantidade, false, true)) {
                return;
            }
            if (quantidade < 1) {
                AutobanFactory.EDICAO_PACOTE.autoban(jogador, "O jogador(a) " + chr + " tentou armazenar " + quantidade + " de " + itemId);
                FilePrinter.printError(FilePrinter.JOGADOR_BANIDO + FilePrinter.EXPLOITS + "", "Em suma, " + c.getPlayer().getName() + " tentou armazenar " + quantidade + " de " + itemId + "\r\n");
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O jogador(a) " + c.getPlayer().getName() + " acaba de ser banido(a) automaticamente pois tentou armazenar " + quantidade + " de " + itemId));
                jogador.dropMessage(0, "VocÍ acaba a de ser banido(a) automaticamente pois tentou armazenar " + quantidade + " de " + itemId);
                c.disconnect(true, false);
                return;
            }
            MapleInventoryType slotType = ii.getInventoryType(itemId);
            MapleInventory Inv = chr.getInventory(slotType);
            if (slot < 1 || slot > Inv.getSlotLimit()) { //player inv starts at one
                AutobanFactory.EDICAO_PACOTE.autoban(jogador, "O jogador(a) " + c.getPlayer().getName() + " tentou alterar pacote de uma loja.");
                FilePrinter.printError(FilePrinter.JOGADOR_BANIDO + FilePrinter.EXPLOITS + "", "Em suma, " + c.getPlayer().getName() + " tentou alterar o item do slot " + slot + "\r\n");
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O jogador(a) " + c.getPlayer().getName() + " acaba de ser banido(a) automaticamente pois tentou alterar o item do slot " + slot));
                jogador.dropMessage(0, "VocÍ acaba de ser banido(a) automaticamente pois tentou alterar o item do slot " + slot);
                c.disconnect(true, false);
                return;
            }
            if (quantidade < 1 || chr.getItemQuantity(itemId, false) < quantidade) {
                return;
            }
            if (storage.isFull()) {
                c.announce(MaplePacketCreator.getStorageError((byte) 0x11));
                return;
            }
            short meso = (short) (chr.getMap().getId() == 910000000 ? -500 : -100);
            if (chr.getMeso() < meso) {
                c.announce(MaplePacketCreator.getStorageError((byte) 0x0B));
            } else {
                MapleInventoryType type = ii.getInventoryType(itemId);
                Item item = chr.getInventory(type).getItem(slot).copy();
                if (item.getItemId() == itemId && (item.getQuantity() >= quantidade || ItemConstants.isRechargable(itemId))) {
                    if (ItemConstants.isRechargable(itemId)) {
                        quantidade = item.getQuantity();
                    }
                    chr.gainMeso(meso, false, true, false);
                    MapleInventoryManipulator.removeFromSlot(c, type, slot, quantidade, false);
                    item.setQuantity(quantidade);
                    storage.store(item);
                    storage.sendStored(c, ii.getInventoryType(itemId));
                    FilePrinter.printError(FilePrinter.MOVIMENTACAO_ARMAZEM + FilePrinter.ARMAZEM + "", c.getPlayer().getName() + " depositou o item " + item + ", no dia: " + sdf.format(Calendar.getInstance().getTime()) + ", √†s " + sdf2.format(Calendar.getInstance().getTime()) + ".\r\n");
                    Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O jogador(a) " + c.getPlayer().getName() + " acaba de depositar o item" + item));
                }
            }
        } else if (mode == 7) { // meso
            int meso = slea.readInt();
            int storageMesos = storage.getMeso();
            int playerMesos = c.getPlayer().getMeso();
            if ((meso > 0 && storageMesos >= meso) || (meso < 0 && playerMesos >= -meso)) {
                if (meso < 0 && (storageMesos - meso) < 0) {
                    meso = -2147483648 + storageMesos;
                    if (meso < playerMesos) {
                        return;
                    }
                } else if (meso > 0 && (playerMesos + meso) < 0) {
                    meso = 2147483647 - playerMesos;
                    if (meso > storageMesos) {
                        return;
                    }
                }
                storage.setMeso(storageMesos - meso);
                c.getPlayer().gainMeso(meso, false, true, false);
                FilePrinter.printError(FilePrinter.MOVIMENTACAO_ARMAZEM + FilePrinter.ARMAZEM + "", "No dia: " + sdf.format(Calendar.getInstance().getTime()) + ", as " + sdf2.format(Calendar.getInstance().getTime()) + ", " + c.getPlayer().getName() + " depositou (-) / removeu (+) : " + meso + " no armaz√©m. Antes do dep√≥sito / saque,  ele tinha " + storageMesos + " mesos guardado no armaz√©m.\r\n");
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O jogador(a) " + c.getPlayer().getName() + " depositou (-) / sacou (+) : " + meso + " no armaz√©m."));
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("Antes do depÛsito (-) / saque (+), " + c.getPlayer().getName() + " tinha " + storageMesos + " mesos guardados no armazÈm."));
            } else {
                AutobanFactory.EDICAO_PACOTE.autoban(chr, "O jogador(a) " + chr + " tentou armazenar ou retirar quantidade disponivel de mesos (" + meso + "/" + storage.getMeso() + "/" + c.getPlayer().getMeso() + ").");
                FilePrinter.printError(FilePrinter.JOGADOR_BANIDO + FilePrinter.EXPLOITS + "", "Em suma, " + c.getPlayer().getName() + " tentou armazenar ou retirar quantidade dispon√≠vel de mesos (" + meso + "/" + storage.getMeso() + "/" + c.getPlayer().getMeso() + ").\r\n");
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O jogador(a) " + c.getPlayer().getName() + " acaba de ser banido(a) automaticamente por tentar armazenar ou retirar a quantidade disponiveis de mesos (" + meso + "/" + storage.getMeso() + "/" + c.getPlayer().getMeso()));
                jogador.dropMessage(0, "VocÍ acaba a de ser banido(a) automaticamente pois tentou armazenar ou retirar quantidade dispon√≠vel de mesos (" + meso + "/" + storage.getMeso() + "/" + c.getPlayer().getMeso());
                c.disconnect(true, false);
                return;
            }
            storage.sendMeso(c);
        } else if (mode == 8) {// close
            storage.close();
        }
    }
}
