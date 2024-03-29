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
import client.inventory.MapleInventoryType;
import static client.inventory.MapleInventoryType.CASH;
import config.game.Messages;
import net.AbstractMaplePacketHandler;
import net.server.Server;
import server.MapleInventoryManipulator;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Matze
 */
public final class ItemMoveHandler extends AbstractMaplePacketHandler {

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCharacter chr = c.getPlayer();
        slea.skip(4);
        MapleInventoryType type = MapleInventoryType.getByType(slea.readByte());
        byte src = (byte) slea.readShort();
        byte action = (byte) slea.readShort();
        short quantity = slea.readShort();
        if (src < 0 && action > 0) {
            MapleInventoryManipulator.unequip(c, src, action);
        } else if (action < 0) {
            MapleInventoryManipulator.equip(c, src, action);
        } else if (action == 0) {
            if (type.equals(MapleInventoryType.CASH)) {

                AutobanFactory.GENERAL.autoban(chr, "Voc� foi banido pois esta usando um cliente diferente do original, � impossivel o drop de itens de cash");

            } else {
                MapleInventoryManipulator.drop(c, type, src, quantity);
            }
        } else {
            MapleInventoryManipulator.move(c, type, src, action);
        }
    }

}
