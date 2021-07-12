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

import client.MapleClient;
import client.MapleDisease;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import net.AbstractMaplePacketHandler;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 * @author Matze
 */
public final class UseItemHandler extends AbstractMaplePacketHandler {

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (!c.getPlayer().isAlive()) {
            c.announce(MaplePacketCreator.enableActions());
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        slea.readInt();
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt();
        Item toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemId) {
            if (itemId == 2022178 || itemId == 2022433 || itemId == 2050004) {
                c.getPlayer().dispelDebuffs();
                remove(c, slot);
                return;
            } else if (itemId == 2050003) {
                c.getPlayer().dispelDebuff(MapleDisease.SEAL);
                remove(c, slot);
                return;

            } else if (itemId == 2030019) {
                MapleMap target = c.getChannelServer().getMapFactory().getMap(120000000);
                c.getPlayer().changeMap(target, c.getChannelServer().getMapFactory().getMap(120000000).getPortal(0));
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                c.getSession().write(MaplePacketCreator.enableActions());
                return;

            } else if (itemId == 2030001) {
                MapleMap target = c.getChannelServer().getMapFactory().getMap(104000000);
                c.getPlayer().changeMap(target, c.getChannelServer().getMapFactory().getMap(104000000).getPortal(0));
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                c.getSession().write(MaplePacketCreator.enableActions());
                return;

            } else if (itemId == 2030002) {
                MapleMap target = c.getChannelServer().getMapFactory().getMap(101000000);
                c.getPlayer().changeMap(target, c.getChannelServer().getMapFactory().getMap(101000000).getPortal(0));
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                c.getSession().write(MaplePacketCreator.enableActions());
                return;

            } else if (itemId == 2030003) {
                MapleMap target = c.getChannelServer().getMapFactory().getMap(102000000);
                c.getPlayer().changeMap(target, c.getChannelServer().getMapFactory().getMap(102000000).getPortal(0));
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                c.getSession().write(MaplePacketCreator.enableActions());
                return;

            } else if (itemId == 2030004) {
                MapleMap target = c.getChannelServer().getMapFactory().getMap(100000000);
                c.getPlayer().changeMap(target, c.getChannelServer().getMapFactory().getMap(100000000).getPortal(0));
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                c.getSession().write(MaplePacketCreator.enableActions());
                return;

            } else if (itemId == 2030005) {
                MapleMap target = c.getChannelServer().getMapFactory().getMap(103000000);
                c.getPlayer().changeMap(target, c.getChannelServer().getMapFactory().getMap(103000000).getPortal(0));
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                c.getSession().write(MaplePacketCreator.enableActions());
                return;

            } else if (itemId == 2030006) {
                MapleMap target = c.getChannelServer().getMapFactory().getMap(105040300);
                c.getPlayer().changeMap(target, c.getChannelServer().getMapFactory().getMap(105040300).getPortal(0));
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                c.getSession().write(MaplePacketCreator.enableActions());
                return;

            } else if (itemId == 2030007) {
                MapleMap target = c.getChannelServer().getMapFactory().getMap(211041500);
                c.getPlayer().changeMap(target, c.getChannelServer().getMapFactory().getMap(211041500).getPortal(0));
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                c.getSession().write(MaplePacketCreator.enableActions());
                return;

            }

            if (isTownScroll(itemId)) {
                if (ii.getItemEffect(toUse.getItemId()).applyTo(c.getPlayer())) {
                    remove(c, slot);
                }
                c.announce(MaplePacketCreator.enableActions());
                return;
            }
            remove(c, slot);
            ii.getItemEffect(toUse.getItemId()).applyTo(c.getPlayer());
            c.getPlayer().checkBerserk();
        }
    }

    private void remove(MapleClient c, byte slot) {
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
        c.announce(MaplePacketCreator.enableActions());
    }

    private boolean isTownScroll(int itemId) {
        return itemId >= 2030000 && itemId < 2030021;
    }

}
