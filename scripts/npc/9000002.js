/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
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

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }else if (mode == 0){
        cm.dispose();
    }else{
        if (mode == 1)
            status++;
        else
            status--;
    if (status == 0) {
    cm.sendNext("Tan tan tan tan! Voce conseguiu ganhar neste #bevento!#k\r\nParabens por esta conquista!");
    } else if (status == 1) {
    cm.sendNext("Voce ganhou um #bTrofeu de Evento#k por vencer neste evento.");
    } else if (status == 2) {
    cm.sendNext("Voce pode trocar #bTrofeu de Evento#k por cadeiras, em Henesys.");
    } else if (status == 3) {
    if (cm.canHold(4000038)) {
    cm.gainItem(4000038);
    cm.warp(cm.getPlayer().getSavedLocation("EVENTO"));
    cm.dispose();
    } else {
    cm.sendNext("O seu #eETC#n esta cheio. Por favor, remova algo e fale comigo novamente.");
    }
    } else if (status == 4) {
    cm.dispose();
    }
    }
    }  
    
    */

/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/


function start() {
    cm.sendOk("Lamento por voce nao ter conseguido se sobresair vitorioso neste evento...\r\nEstarei levando-o ao mapa que voce estava.\r\nAte a proxima!");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    cm.warp(cm.getPlayer().getSavedLocation("EVENTO"));
    cm.dispose();    
}  
*/

/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
cm.warp(106021600);
}

function action(mode, type, selection) {
cm.warp(106021600);
}