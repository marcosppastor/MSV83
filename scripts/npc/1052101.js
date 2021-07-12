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
/* Andre
	Kerning Random Hair/Hair Color Change.
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30130, 30350, 30190, 30110, 30180, 30050, 30040, 30160, 30770, 30620, 30550, 30520);
var fhair = Array(31060, 31090, 31020, 31130, 31120, 31140, 31330, 31010, 31520, 31440, 31750, 31620);
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
            cm.sendSimple("Sou Andre, assistente de Don. Todo mundo me chama de André, no entanto. Se você tem um #b#t5150011##k ou um #b#t5151002##k, por favor, deixe-me mudar seu penteado!\r\n#L0#Eu quero comprar um cupom!#l\r\n#L1#Corte de cabelo: #i5150011##t5150011##l\r\n#L2#Pintar meu cabelo: #i5151002##t5151002##l");
        } else if (status == 1) {
            if (selection == 0) {
                beauty = 0;
                cm.sendSimple("Qual cupom você gostaria de comprar?\r\n#L0#Corte de cabelo " + hairprice + " mesos: #i5150011##t5150011##l\r\n#L1#Pintar meu cabelo por " + haircolorprice + " mesos: #i5151002##t5151002##l");
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
                cm.sendYesNo("Se você usar o cupom REGULAR,o seu cabelo mudará de forma randomica. Você quer realmente usar o cupom  #b#t5150010##k e mudar seu visual?");
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair() /10)*10;
                for(var i = 0; i < 8; i++) {
                    haircolor.push(current + i);
                }
                cm.sendYesNo("Se você usar o cupom REGULAR,o seu cabelo mudará de forma randomica. Você quer realmente usar o cupom  #b#t5151002##k e mudar seu visual?");
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150011) == true){
                    cm.gainItem(5150011, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("Aproveite seu novo visual!");
                } else {
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151002) == true){
                    cm.gainItem(5151002, -1);
                    cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
                    cm.sendOk("Aproveite seu novo visual!");
                } else {
v                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150011, 1);
                    cm.sendOk("Aproveite!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151002, 1);
                    cm.sendOk("Aproveite!");
                } else {
                    cm.sendOk("Você não tem mesos para comprar um cupom!");
                }
            }
        }
    }
}
