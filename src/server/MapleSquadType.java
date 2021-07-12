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

/**
 *
 * @author Leifde
 */
public enum MapleSquadType {

    UNDEFINED(-1),
    BALROG_EASY(0),
    BALROG_NORMAL(1),
    ZAKUM(2),
    HORNTAIL(3),
    CHAOS_ZAKUM(4),
    CHAOS_HORNTAIL(5),
    PINKBEAN(6),
    SCARGA(7),
    ARIANT1(8), //Ariant um
    ARIANT2(9), //Ariant dois
    ARIANT3(10), //Ariant três
    CWPQ(11);
    final byte type;

    private MapleSquadType(int type) {
        this.type = (byte) type;
    }
}
