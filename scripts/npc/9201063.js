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
/* Ari
	NLC Random Hair/Hair Color Change.
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30250, 30110, 30230, 30050, 30280, 30410, 30730, 30160, 30200, 30440, 30360, 30740, 30400);
var fhair = Array(31150, 31310, 31220, 31300, 31260, 31160, 31730, 31410, 31410, 31720, 31560, 31450);
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
            cm.sendSimple("Eu sou a assistente Ari. Se voc� tem #b#t5150030##k ou #b#t5151025##k por acaso, ent�o, que tal me deixar mudar o seu penteado??\r\n#L0#Eu quero comprar um cupom!#l\r\n#L1#Corte de cabelo: #i5150030##t5150030##l\r\n#L2#Pintar meu cabelo: #i5151025##t5151025##l");
        } else if (status == 1) {
            if (selection == 0) {
                beauty = 0;
                cm.sendSimple("Qual cupom voc� gostaria de comprar?\r\n#L0#Corte de cabelo por" + hairprice + " mesos: #i5150030##t5150030##l\r\n#L1#Pintar meu cabelo " + haircolorprice + " mesos: #i5151025##t5151025##l");
            } else if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair.length; i++) {
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair.length; i++) {
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                    }
                }
                cm.sendYesNo("Se voc� usar o cupom NORMAL seu cabelo vai mudar aleatoriamente com a chance de obter um novo estilo experimental que eu criei. Voc� vai usar #b#t5150030##k e realmente mudar seu visual?");
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++) {
                    haircolor.push(current + i);
                }
                cm.sendYesNo("Se voc� usar o cupom NORMAL seu cabelo vai mudar aleatoriamente com a chance de obter um novo estilo experimental que eu criei. Voc� vai usar #b#t5151025##k e realmente mudar seu visual?");
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150030)){
                    cm.gainItem(5150030, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("Aproveite o seu novo estilo!");
                } else {
					cm.sendOk("Hmmm ... parece que voc� n�o tem o cupom designado ... Eu tenho medo de n�o poder cortar o seu cabelo sem isso. Eu sinto Muito...");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151025)){
                    cm.gainItem(5151025, -1);
                    cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
                    cm.sendOk("Aproveite o seu novo estilo!");
                } else {
					cm.sendOk("Hmmm ... parece que voc� n�o tem o cupom designado ... Eu tenho medo de n�o poder cortar o seu cabelo sem isso. Eu sinto Muito...");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150030, 1);
                    cm.sendOk("Aproveite!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151025, 1);
                    cm.sendOk("Aproveite!");
                } else {
                    cm.sendOk("Voc� n�o tem mesos para comprar um cupom!");
                }
            }
        }
    }
}
