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
/* Miranda
NLC Skin Change.
*/
var status = 0;
var price = 1000000;
var skin = Array(0, 1, 2, 3, 4);

function start() {
    cm.sendSimple("Bem Olá! Bem-vindo ao NLC Skin-Care! Você gostaria de ter uma pele firme, apertada e saudável como a minha? Com o #b#t5153009##k, Você pode nos deixar cuidar do resto e ter o tipo de pele que você sempre quis ~!\r\n#L1#Eu quero comprar um  #b#t5153009##k por " + price + " mesos, por favor!#l\r\n\#L2#Eu já tenho um cupom!#l");
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
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
                    cm.gainItem(5153009, 1);
                    cm.sendOk("Aproveite!");
                } else 
                    cm.sendOk("Você não tem mesos para comprar um cupom!");
                cm.dispose();
            } else if (selection == 2) 
                cm.sendStyle("Com nossa máquina especializada, você pode se ver após o tratamento com antecedência. Que tipo de lente você gostaria de usar? Escolha o estilo de sua preferência.", colors);
        }
        else if (status == 2){
            cm.dispose();
            if (cm.haveItem(5153009)){
                cm.gainItem(5153009, -1);
                cm.setSkin(skin[selection]);
                cm.sendOk("Aproveite o seu novo visual!");
            } else 
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
        }
    }
}