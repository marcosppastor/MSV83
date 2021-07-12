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

/* Rinz the assistant
	Orbis Random Hair/Hair Color Change.
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30030, 30020, 30000, 30270, 30230, 30260, 30280, 30240, 30290, 30340, 30370, 30630, 30530, 30760);
var fhair = Array(31040, 31000, 31250, 31220, 31260, 31240, 31110, 31270, 31030, 31230, 31530, 31710, 31320, 31650, 31630);
var hairnew = Array();

function start() {
    cm.sendSimple("Sou Rinz, a assistente. Você tem #b#t5150013##k ou #b#t5151004##k contigo? Em caso afirmativo, o que você acha de me deixar cuidar do seu penteado? O que você quer fazer com seu cabelo?\r\n#L0#Eu quero comprar um cupom!#l\r\n#L1#Corte de cabelo: #i5150013##t5150013##l\r\n#L2#Pintar meu cabelo: #i5151004##t5151004##l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                beauty = 0;
                cm.sendSimple("Qual cupom você gostaria de comprar?\r\n#L0#Cortar cabelo por " + hairprice + " mesos: #i5150013##t5150013##l\r\n#L1#Pintar meu cabelo " + haircolorprice + " mesos: #i5151004##t5151004##l");
            } else if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair.length; i++)
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                else
                    for (var i = 0; i < fhair.length; i++)
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendYesNo("Se você usar o cupom NORMAL seu cabelo vai mudar aleatoriamente com a chance de obter um novo estilo experimental que eu criei. Você vai usar o #b#t5150010##k e realmente mudar seu visual?");
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = (cm.getPlayer().getHair() / 10) | 0;
                for (var i = 0; i < 8; i++)
                    haircolor.push(current + i);
                cm.sendYesNo("Se você usar o cupom NORMAL seu cabelo vai mudar aleatoriamente com a chance de obter um novo estilo experimental que eu criei. Você vai usar o #b#t5151004##k e mudar de visual?");
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150013)){
                    cm.gainItem(5150013, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("Aproveite seu novo visual!");
                } else
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
            }
            if (beauty == 2){
                if (cm.haveItem(5151004)){
                    cm.gainItem(5151004, -1);
                    cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
                    cm.sendOk("Aproveite seu novo visual!");
                } else
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150013, 1);
                    cm.sendOk("Aproveite!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151004, 1);
                    cm.sendOk("Aproveite!");
                } else
                    cm.sendOk("Você não tem mesos para comprar um cupom!");
            }
        }
    }
}
