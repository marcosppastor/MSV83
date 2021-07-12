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
//Fixed by Moogra
//Fixed grammar, javascript syntax
var status = 0;
var price = 100000;

function start() {
    cm.sendSimple("Bem vindo(a) a Entrada da Caverna da Vida!\r\nVocê deseja lutar contra o #rHorntail#k ? Se sim, voce precisara de #b#v2000005##k para recuperar #rHP#k\r\n#L1#Voce deseja comprar 10 por 100,000 Mesos!#l\r\n\#L2#Nao, obrigado. Me leve ate o #eHorntail!#l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else if (selection == 1) {
        if(cm.getMeso() >= price && cm.canHold(2000005)) {
            cm.gainMeso(-price);
            cm.gainItem(2000005, 10);
            cm.sendOk("Obrigado por comprar!\r\nBoa sorte!!!");
        } else
            cm.sendOk("Lamento mas sem mesos, sem pot.");
        cm.dispose();
    } else if (selection == 2) {
        if (cm.getLevel() > 99)
            cm.warp(240050000, 0);
        else
            cm.sendOk("Desculpe, mas e necessario ser level 100 para entrar na caverna.");
        cm.dispose();
    }
}