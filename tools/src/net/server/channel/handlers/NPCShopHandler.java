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
import constants.ItemConstants;
import net.AbstractMaplePacketHandler;
import net.server.Server;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Matze
 */
public final class NPCShopHandler extends AbstractMaplePacketHandler {

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCharacter jogador = c.getPlayer();
        byte bmode = slea.readByte();
        if (bmode == 0) { // mode 0 = buy :)
            short slot = slea.readShort();// slot
            int itemId = slea.readInt();
            short quantity = slea.readShort();
            if (quantity < 1) {
                AutobanFactory.EDICAO_PACOTE.autoban(jogador, "O jogador(a) " + c.getPlayer().getName() + " tentou enviar pacote diferente numa Loja de NPC.");
                FilePrinter.printError(FilePrinter.JOGADOR_BANIDO + FilePrinter.EXPLOITS + "", "Em suma, " + c.getPlayer().getName() + " tentou comprar " + quantity + " do seguinte Item ID: " + itemId + ".\r\n");
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O jogador(a) " + c.getPlayer().getName() + " acaba de ser banido(a) automaticamente por EDICAO_PACOTE (Tentou comprar " + quantity + " do seguinte Item ID: " + itemId + ")."));
                jogador.dropMessage(0, "Você acaba de ser banido(a) automaticamente por EDICAO_PACOTE (Tentou comprar " + quantity + " do seguinte Item ID: " + itemId + ").");
                c.disconnect(true, false);
                return;
            }
            c.getPlayer().getShop().buy(c, slot, itemId, quantity);
        } else if (bmode == 1) { // sell ;)
            short slot = slea.readShort();
            int itemId = slea.readInt();
            short quantity = slea.readShort();
            c.getPlayer().getShop().sell(c, ItemConstants.getInventoryType(itemId), slot, quantity);
        } else if (bmode == 2) { // recharge ;)
            byte slot = (byte) slea.readShort();
            c.getPlayer().getShop().recharge(c, slot);
        } else if (bmode == 3) { // leaving :(
            c.getPlayer().setShop(null);
        }
    }
}
