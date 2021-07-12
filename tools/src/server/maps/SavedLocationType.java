/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package server.maps;

public enum SavedLocationType {

    FREE_MARKET(0),
    EVENT(1),
    EVENTO(2),
    RANDOM_EVENT(3),
    WORLDTOUR(4),
    MONSTER_CARNIVAL(5),
    ARIANT_PQ(6),
    RICHIE(7),
    BALROGPQ(8),
    FLORINA(9),
    INTRO(10),
    SUNDAY_MARKET(11),
    MIRROR(12),
    PQMAP(13),
    BOSSPQ(14),
    HAPPYVILLE(15),
    MONSTER_PARK(16),
    ARIANT(17),
    CYGNUSINTRO(18);
    private final int index;

    private SavedLocationType(int index) {
        this.index = index;
    }

    public int getValue() {
        return index;
    }

    public static SavedLocationType fromString(String Str) {
        return valueOf(Str);
    }
}
