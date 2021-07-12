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
var status = 0;
var party;

function start(chrs) {
    status = -1;
    party = chrs;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.getChar().setChallenged(false);
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.sendOk("Come back once you have thought about it some more.");
            cm.getChar().setChallenged(false);
            cm.dispose();
            return;
        }
    }
    if (mode == -1) 
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else 
            status--;
        if (status == 0) {
            if (cm.getParty().getMembers().size() == party.size()){
            cm.getPlayer().setChallenged(true);
            var snd = "";
            for (var i = 0; i < party.size(); i++)
                snd += "#b" + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / " + party.get(i).getJobNameById(party.get(i).getJobId()) + "#k\r\n\r\nGostaria de lutar contra este grupo no Festival de Monstros?";
            cm.sendAcceptDecline(snd);
           } else {
             return;  
           }
        } else if (status == 1) {
			var ch = cm.getChrById(party.get(0).getId());
			cm.c(ch, ch.getMapId() + 1);
			ch.getParty().setEnemy(cm.getPlayer().getParty());
			cm.getChar().getParty().setEnemy(ch.getParty());
			cm.getChar().setChallenged(false);
			//cm.dispose();
        }
    }
}