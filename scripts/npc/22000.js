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
/* Author: Xterminator
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    cm.sendYesNo("Pegue o navio para um continente enorme. Por #e150 mesos#n eu levarei você a #bVictoria Island#k. A questão é que quando você deixa a ilha maple, nunca mais poderá voltar . O que você acha? Você quer ir para ilha victoria?");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && type != 1)
            status -= 2;
        else if(type == 1 || (mode == -1 && type != 1)){
            if(mode == 0)
                cm.sendOk("Hmm... EU acho que você ainda tem coisas a fazer aqui , certo?");
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        if (cm.haveItem(4031801))
            cm.sendNext("Okay, agora me de 150 mesos... Hey, o que é aquilo? é uma carta de recomendação de Luccas?, o chefe de Amherst? Hey, você deveria ter me dito que você tinha aquilo. Eu vejo que você tem um grande potencial!!");
        else
            cm.sendNext("Cansado deste lugar? me de #e150 mesos#n primeiro...");
    } else if (status == 2) {
        if (cm.haveItem(4031801))
            cm.sendNextPrev("Victoria island!!");
        else
        if (cm.getLevel() > 6) {
            if (cm.getMeso() < 150) {
                cm.sendOk("What? You're telling me you wanted to go without any money? You're one weirdo...");
                cm.dispose();
            } else
                cm.sendNext("Incrivel! #e150#n mesos aceitos! Vamos la, para  Victoria Island!");
        } else {
            cm.sendOk("Hmmm..deixe-me ver ,acho que você ainda não é forte o suficiente para ir para #rVictoria Island#k, pegue ao menos o level 7 para prosseguir...ah não se esqueça dos meus \n #r150 mesos #k");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801))
            cm.gainItem(4031801, -1);
        cm.warp(104000000);
        cm.dispose();
    }
}