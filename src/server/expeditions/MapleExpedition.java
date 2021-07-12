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
package server.expeditions;

import client.MapleCharacter;
import client.MapleClient;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import net.server.world.World;
import server.TimerManager;
import server.maps.MapleMap;
import tools.MaplePacketCreator;

/**
 *
 * @author kevintjuh93
 */
public class MapleExpedition {

    private MapleCharacter leader;
    private boolean registering;
    private MapleMap startMap;
    private ArrayList<String> bossLogs;
    private ScheduledFuture<?> schedule;
    private List<MapleCharacter> banned = new ArrayList<MapleCharacter>();
    private long startTime;
    //private final List<Integer> parties;
    private int leaderId, id;
    private List<MapleCharacter> members;
    private MapleExpeditionType type;

    public MapleExpedition(MapleCharacter leader) {
        members.add(leader);
    }

    public void addMember(MapleCharacter chr) {
        members.add(chr);
    }

    public void removeMember(MapleCharacter chr) {
        members.remove(chr);
    }

    public List<MapleCharacter> getAllMembers() {
        return members;
    }

    public MapleExpeditionType getType() {
        return type;
    }

    public void dispose(boolean log) {
        if (schedule != null) {
            schedule.cancel(false);
        }
        if (log && !registering) {
            //LogHelper.logExpedition(this);
        }
    }

}
