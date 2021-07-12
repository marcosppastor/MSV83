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
/* Mani
NLC VIP Hair/Hair Color Change.
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30250, 30110, 30230, 30050, 30280, 30410, 30730, 30160, 30200);
var fhair = Array(31150, 31310, 31220, 31300, 31260, 31160, 31730, 31410, 31410);
var hairnew = Array();

function start() {
    cm.sendSimple("Eu sou a chefe deste salão de cabeleireiro Mani. Se você tem um #b#t5150031##k ou um #b#t5151026##k, Permita-me cuidar do seu penteado. Escolha o que você deseja.\r\n#L0#Eu quero comprar um cupom!#l\r\n#L1#Corte de cabelo: #i5150031##t5150031##l\r\n#L2#Pintar meu cabelo: #i5151026##t5151026##l");
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
            if (selection == 0) {
                beauty = 0;
                cm.sendSimple("Qual cupom você gostaria de compar?\r\n#L0#Corte de cabelo por " + hairprice + " mesos: #i5150031##t5150031##l\r\n#L1#Pintar meu cabelo por " + haircolorprice + " mesos: #i5151026##t5151026##l");
            } else if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair.length; i++)
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair.length; i++)
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("Eu posso mudar totalmente seu penteado e fazê-lo parecer tão incrivel. Por que você não muda um pouco? Com o #b#t5150031##k, Eu cuidarei do resto por você. Escolha o estilo de sua preferência!", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++)
                    haircolor.push(current + i);
                cm.sendStyle("Eu posso mudar totalmente sua cor de cabelo e fazê-la parecer tão diferente. Por que você não muda um pouco? Com o#b#t5151026##k, Eu cuidarei do resto por você. Escolha o estilo de sua preferência!", haircolor);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150031)){
                    cm.gainItem(5150031, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("Aproveite o seu novo estilo!");
                } else
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
            }
            if (beauty == 2){
                if (cm.haveItem(5151026) == true){
                    cm.gainItem(5151026, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("Aproveite o seu novo estilo!");
                } else
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150031, 1);
                    cm.sendOk("Aproveite!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151026, 1);
                    cm.sendOk("Aproveite!");
                } else
                    cm.sendOk("Você não tem mesos para comprar um cupom!");
            }
        }
    }
}