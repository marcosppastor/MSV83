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
/*	
	Author: Traitor
	Map(s):	So Gong's maps
	Desc:   doesn't do anything man. ANYTHING.
*/

function enter(pi) {
    if (pi.getPlayer().getMap().getMonsterById(0100101) != null || pi.getPlayer().getMap().getMonsterById(0120100) != null || pi.getPlayer().getMap().getMonsterById(0130101) != null || pi.getPlayer().getMap().getMonsterById(0130100) != null || pi.getPlayer().getMap().getMonsterById(0210100) != null || pi.getPlayer().getMap().getMonsterById(1210102) != null || pi.getPlayer().getMap().getMonsterById(0130100) != null) {
        pi.getPlayer().enteredScript("ppq_Msg", pi.getPlayer().getMap().getId());
        pi.warp(000000005, 0);
    } else {
        pi.getPlayer().message("Vamos la!");
    }
    return true;
}