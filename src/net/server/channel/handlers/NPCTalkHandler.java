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
import constants.ServerConstants;
import net.AbstractMaplePacketHandler;
import static scripting.npc.NPCConversationManager.lobby;
import scripting.npc.NPCScriptManager;
import server.life.MapleNPC;
import server.maps.MapleMapObject;
import server.maps.PlayerNPCs;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public final class NPCTalkHandler extends AbstractMaplePacketHandler {

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (!c.getPlayer().isAlive()) {
            c.announce(MaplePacketCreator.enableActions());
            return;
        }

        if (System.currentTimeMillis() - c.getPlayer().getNpcCooldown() < ServerConstants.BLOCK_NPC_RACE_CONDT) {
            c.announce(MaplePacketCreator.enableActions());
            return;
        }

        int oid = slea.readInt();
        if (NPCScriptManager.getInstance().getCM(c) != null) {
            dispose(c);
        }
        MapleMapObject obj = c.getPlayer().getMap().getMapObject(oid);

        if (obj instanceof MapleNPC) {
            MapleNPC npc = (MapleNPC) obj;
            if (ServerConstants.USE_DEBUG == true) {
                c.getPlayer().dropMessage(5, "Talking to NPC " + npc.getId());
            }

            /*if (npc.getId() == 9010009) {   //is duey
             c.getPlayer().setNpcCooldown(System.currentTimeMillis());
             c.announce(MaplePacketCreator.sendDuey((byte) 8, DueyHandler.loadItems(c.getPlayer())));
             */
            if (npc.getId() == 9010009) {
                if (c.isVisitante()) {
                    c.getPlayer().dropMessage(1, "Duey n�o est� dispon�vel para visitantes.");
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }

                c.announce(MaplePacketCreator.sendDuey((byte) 8, DueyHandler.loadItems(c.getPlayer())));
            } else {
                if (c.getCM() != null || c.getQM() != null) {
                    c.announce(MaplePacketCreator.enableActions());
                    return;
                } //if (npc.getId() >= 9100100 && npc.getId() <= 9100200) {
                // Custom handling for gachapon scripts to reduce the amount of scripts needed.
                //NPCScriptManager.getInstance().start(c, npc.getId(), "gachapon", null);
                //} 
                else {
                    boolean hasNpcScript = NPCScriptManager.getInstance().start(c, npc.getId(), oid, null);
                    if (!hasNpcScript) {
                        if (!npc.hasShop()) {
                            FilePrinter.printError(FilePrinter.NPC_UNCODED, "NPC " + npc.getName() + "(" + npc.getId() + ") n�o est� codado ou est� com algum erro.\r\n");
                            return;
                        } else if (c.getPlayer().getShop() != null) {
                            c.announce(MaplePacketCreator.enableActions());
                            return;
                        }

                        npc.sendShop(c);
                    }
                }
            }
        } else if (obj instanceof PlayerNPCs) {
            NPCScriptManager.getInstance().start(c, ((PlayerNPCs) obj).getId(), null);
        }
        MapleNPC npc = (MapleNPC) obj;
        if (npc.getId() == 2042004 || npc.getId() == 2042003 && c.getPlayer().isLeader()) {
            if (lobby != null) {
                lobby.cancel(false);
            }
            for (MapleMapObject o : c.getPlayer().getMap().getAllPlayer()) {
                ((MapleCharacter) o).changeMap(c.getChannelServer().getMapFactory().getMap(980000000), c.getChannelServer().getMapFactory().getMap(980000000).getPortal(0));
                ((MapleCharacter) o).getClient().getSession().write(MaplePacketCreator.serverNotice(5, "[Folia dos Monstros] " + c.getPlayer().getName() + " desistiu da batalha."));
                c.getSession().write(MaplePacketCreator.enableActions());
            }
            return;
        }
    }

    public void dispose(MapleClient c) {
        c.announce(MaplePacketCreator.enableActions());
        NPCScriptManager.getInstance().getCM(c).dispose();
    }
}
