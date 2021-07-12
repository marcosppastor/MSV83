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
/* Nerbit
	NLC Random Eye Change.
@TODO: Make this not sell tickets like in GMS
*/
var status = 0;
var beauty = 0;
var price = 1000000;
var mface = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20012);
var fface = Array(21001, 21002, 21003, 21004, 21005, 21006, 21008, 21012, 21014, 21016);
var facenew = Array();

function start() {
    cm.sendSimple("Oi, praticamente não devo fazer isso, mas com um #b#t5152033##k, Eu sempre farei isso por você. Mas não se esqueça, será aleatório!\r\n#L1#Eu quero comprar um #b#t5152033##k por " + price + " mesos, porfavor!#l\r\n\#L2#Eu ja tenho um cupom!#l");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 1) {
                if(cm.getMeso() >= price) {
                    cm.gainMeso(-price);
                    cm.gainItem(5152033, 1);
                    cm.sendOk("Aproveite!");
                } else
                    cm.sendOk("Você não tem mesos para comprar um cupom!");
                cm.dispose();
            } else if (selection == 2) {
                facenew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mface.length; i++)
                        facenew.push(mface[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fface.length; i++)
                        facenew.push(fface[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                cm.sendYesNo("Se você usa o cupom normal, seu rosto pode se transformar em um novo visual aleatório ... você ainda quer fazê-lo usando um #b#t5152033##k?");
            }
        } else if (status == 2){
            cm.dispose();
            if (cm.haveItem(5152033)){
                cm.gainItem(5152033, -1);
                cm.setFace(facenew[Math.floor(Math.random() * facenew.length)]);
                cm.sendOk("Aproveite seu novo visual!");
            } else 
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
        }
    }
}
