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
*/

/* Mino the Owner
	Orbis VIP Hair/Hair Color Change.
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30030, 30020, 30000, 30270, 30230, 30260, 30280, 30240, 30290, 30340);
var fhair = Array(31040, 31000, 31250, 31220, 31260, 31240, 31110, 31270, 31030, 31230);
var hairnew = Array();

function start() {
    status = -1;
    action(1, 0, 0);
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
        if (status == 0) {
            cm.sendSimple("Olá, eu sou Mino. Se você tem um #b#t5150005##k ou um #b#t5151005##k, então deixe-me cuidar do seu cabelo. Escolha o que você quer fazer com ele.\r\n#L0#Eu quero comprar um cupom!#l\r\n#L1#Corte de cabelo: #i5150005##t5150005##l\r\n#L2#Pintar meu cabelo: #i5151005##t5151005##l");
        } else if (status == 1) {
            if (selection == 0) {
                beauty = 0;
                cm.sendSimple("Qual cupom você gostaria de comprar?\r\n#L0#Corte de cabelo por " + hairprice + " mesos: #i5150005##t5150005##l\r\n#L1#Pintar meu cabelo por " + haircolorprice + " mesos: #i5151005##t5151005##l");
            } else if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair.length; i++) {
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair.length; i++) {
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                cm.sendStyle("Eu posso mudar totalmente seu penteado e fazê-lo parecer tão incrivel. Por que você não muda um pouco? Com o #b#t5150005##k, Eu cuidarei do resto por você. Escolha o estilo do seu agrado!", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++) {
                    haircolor.push(current + i);
                }
                cm.sendStyle("Eu posso mudar totalmente seu penteado e fazê-lo parecer tão incrivel. Por que você não muda um pouco? Com o #b#t5151005##k, Eu cuidarei do resto por você. Escolha a cor do seu agrado!!", haircolor);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150005) == true){
                    cm.gainItem(5150005, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("Aproveite seu novo visual!");
                } else {
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151005) == true){
                    cm.gainItem(5151005, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("Aproveite seu novo visual!");
                } else {
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150005, 1);
                    cm.sendOk("Aproveite!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151005, 1);
                    cm.sendOk("Aproveite!");
                } else {
                    cm.sendOk("Você não tem mesos para comprar um cupom!");
                }
            }
        }
    }
}
