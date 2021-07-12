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
package net.server.world;

import client.MapleClient;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import server.CashShop;
import tools.locks.MonitoredLockType;
import tools.locks.MonitoredReentrantLock;

public class MapleParty {

    private MaplePartyCharacter leader;
    private List<MaplePartyCharacter> members = new LinkedList<MaplePartyCharacter>();
    private List<MaplePartyCharacter> pqMembers = null;

    private Map<Integer, Integer> histMembers = new HashMap<>();

    private int id;
    private MapleParty enemy = null;

    private Lock lock = new MonitoredReentrantLock(MonitoredLockType.PARTY, true);

    public MapleParty(int id, MaplePartyCharacter chrfor) {
        this.leader = chrfor;
        this.members.add(this.leader);
        this.id = id;
    }

    public MapleParty getEnemy() {
        return enemy;
    }

    public void setEnemy(MapleParty enemy) {
        this.enemy = enemy;
    }

    public boolean containsMembers(MaplePartyCharacter member) {
        return members.contains(member);
    }

    public void addMember(MaplePartyCharacter member) {
        members.add(member);
    }

    public void removeMember(MaplePartyCharacter member) {
        members.remove(member);
    }

    public void setLeader(MaplePartyCharacter victim) {
        this.leader = victim;
    }

    public void updateMember(MaplePartyCharacter member) {
        for (int i = 0; i < members.size(); i++) {
            if (members.get(i).equals(member)) {
                members.set(i, member);
            }
        }
    }

    public MaplePartyCharacter getMemberById(int id) {
        for (MaplePartyCharacter chr : members) {
            if (chr.getId() == id) {
                return chr;
            }
        }
        return null;
    }

    public Collection<MaplePartyCharacter> getMembers() {
        return Collections.unmodifiableList(members);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public MaplePartyCharacter getLeader() {
        return leader;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final MapleParty other = (MapleParty) obj;
        if (id != other.id) {
            return false;
        }
        return true;
    }

    public MaplePartyCharacter getMemberByPos(int pos) {
        int i = 0;
        for (MaplePartyCharacter chr : members) {
            if (pos == i) {
                return chr;
            }
            i++;
        }
        return null;
    }

    public List<MaplePartyCharacter> getPartyMembers() {
        lock.lock();
        try {
            return Collections.unmodifiableList(members);
        } finally {
            lock.unlock();
        }
    }

    // used whenever entering PQs: will draw every party member that can attempt a target PQ while ingnoring those unfit.
    public Collection<MaplePartyCharacter> getEligibleMembers() {
        return Collections.unmodifiableList(pqMembers);
    }

    public void setEligibleMembers(List<MaplePartyCharacter> eliParty) {
        pqMembers = eliParty;
    }

    public byte getPartyDoor(int cid) {
        List<Map.Entry<Integer, Integer>> histList;

        lock.lock();
        try {
            histList = new LinkedList<>(histMembers.entrySet());
        } finally {
            lock.unlock();
        }

        Collections.sort(histList, new Comparator<Map.Entry<Integer, Integer>>() {
            @Override
            public int compare(Map.Entry<Integer, Integer> o1, Map.Entry<Integer, Integer> o2) {
                return (o1.getValue()).compareTo(o2.getValue());
            }
        });

        byte slot = 0;
        for (Map.Entry<Integer, Integer> e : histList) {
            if (e.getKey() == cid) {
                break;
            }
            slot++;
        }

        return slot;
    }

    public void assignNewLeader(MapleClient c) {
        World world = c.getWorldServer();
        MaplePartyCharacter newLeadr = null;

        lock.lock();
        try {
            for (MaplePartyCharacter mpc : members) {
                if (mpc.getId() != id && (newLeadr == null || newLeadr.getLevel() < mpc.getLevel())) {
                    newLeadr = mpc;
                }
            }
        } finally {
            lock.unlock();
        }

        if (newLeadr != null) {
            world.updateParty(this.getId(), PartyOperation.CHANGE_LEADER, newLeadr);
        }
    }
}
