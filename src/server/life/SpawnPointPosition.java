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
package server.life;

import java.awt.Point;
import java.util.concurrent.atomic.AtomicInteger;
import client.MapleCharacter;
import server.maps.MapleMap;

public class SpawnPointPosition {

    private Point pos;
    private long nextPossibleSpawn;
    private int monsterid, mobTime, team;
    private short fh, rx0, rx1, cy, f;
    private AtomicInteger spawnedMonsters = new AtomicInteger(0);
    private boolean immobile;

    public SpawnPointPosition(int monsterid, Point pos, int mobTime, int team, short fh, short rx0, short rx1, short cy, short f) {
        super();
        this.monsterid = monsterid;
        this.pos = new Point(pos);
        this.mobTime = mobTime;
        this.team = team;
        this.fh = fh;
        this.rx0 = rx0;
        this.rx1 = rx1;
        this.cy = cy;
        this.f = f;
        this.immobile = !MapleLifeFactory.getMonster(monsterid).isMobile();
        this.nextPossibleSpawn = System.currentTimeMillis();
    }

    public boolean shouldSpawn() {
        return shouldSpawn(System.currentTimeMillis());
    }

    private boolean shouldSpawn(long now) {
        if (mobTime < 0 || ((mobTime != 0 || immobile) && spawnedMonsters.get() > 0) || spawnedMonsters.get() > 2) {
            return false;
        }
        return nextPossibleSpawn <= now;
    }

    public MapleMonster spawnMonster(MapleMap mapleMap) {
        MapleMonster mob = MapleLifeFactory.getMonster(monsterid);
        mob.setPosition(new Point(pos));
        mob.setFh(fh);
        mob.setRx0(rx0);
        mob.setRx1(rx1);
        mob.setCy(cy);
        mob.setF(f);
        mob.setTeam(team);
        spawnedMonsters.incrementAndGet();
        mob.addListener(new MonsterListener() {
            public void monsterKilled(MapleMonster monster, MapleCharacter highestDamageChar) {
                nextPossibleSpawn = System.currentTimeMillis();
                if (mobTime > 0) {
                    nextPossibleSpawn += mobTime * 1000;
                }
                spawnedMonsters.decrementAndGet();
            }
        });
        mapleMap.spawnMonster(mob);
        if (mobTime == 0) {
            nextPossibleSpawn = System.currentTimeMillis() + 5000;
        }
        return mob;
    }

    public Point getPosition() {
        return pos;
    }
}
