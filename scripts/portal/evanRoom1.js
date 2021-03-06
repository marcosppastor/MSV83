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
	Map(s):	Mu Lung Dojo Entrance
	Desc:   Sends the entrance message or the taunt message from that dojo guy
*/
var messages = Array("Bem vindo ao True MapleStory!");

function start(ms) {
    if (ms.getPlayer().getMap().getId() == 100030100) {
        ms.getPlayer().startMapEffect(messages[(Math.random() * messages.length) | 0], 5120024);
    } else {
        ms.getPlayer().resetEnteredScript(); //in case the person dcs in here we set it at dojang_tuto portal
        ms.getPlayer().startMapEffect("Ha! Vamos ver se voce e capaz de ficar ate o fim!", 5120024);
    }
}
