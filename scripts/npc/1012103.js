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
/* Natalie
	Henesys VIP Hair/Hair Color Change.
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30030, 30020, 30000, 30310, 30330, 30060, 30150, 30410, 30210, 30140, 30120, 30200);
var fhair = Array(31050, 31040, 31000, 31150, 31310, 31300, 31160, 31100, 31410, 31030, 31080, 31070);
var hairnew = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 0) 
            cm.sendSimple("Eu sou o chefe deste salão de cabeleireiro. Se você tem um #b#t5150001##k ou um #b#t5151001##k Permita-me cuidar do seu penteado. Escolha o que você deseja.\r\n#L0#Eu quero comprar um cupom!#l\r\n#L1#Corte de cabelo: #i5150001##t5150001##l\r\n#L2#Pintar meu cabelo: #i5151001##t5151001##l");
        else if (status == 1) {
            if (selection == 0) {
                beauty = 0;
                cm.sendSimple("Qual cupom você gostaria de comprar?\r\n#L0#Corte de cabelo por " + hairprice + " mesos: #i5150001##t5150001##l\r\n#L1#Pintar meu cabelo " + haircolorprice + " mesos: #i5151001##t5151001##l");
            } else if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair.length; i++)
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair.length; i++)
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("Eu posso mudar totalmente seu penteado e fazê-lo parecer tão bom. Por que você não altera um pouco? Se você tem #b#t5150001##k Eu vou mudar para você. Escolha o seu gosto~.", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++)
                    haircolor.push(current + i);
                cm.sendStyle("Eu posso mudar totalmente sua cor de cabelo e fazê-la parecer tão boa. Por que você não altera um pouco? Com o #b#t51051001##k Eu vou mudar para você. Escolha o seu gosto~.", haircolor);
            }
        } else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150001)){
                    cm.gainItem(5150001, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("Aproveite seu novo corte de cabelo!");
                } else
				cm.sendOk("Um ... você não tem o cupom de cuidados da pele que você precisa para receber o tratamento. Desculpe, mas receio que não possamos fazer isso por você...");
            }
            if (beauty == 2){
                if (cm.haveItem(5151001)){
                    cm.gainItem(5151001, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("Aproveite sua nova cor de cabelo!");
                } else
				cm.sendOk("Um ... você não tem o cupom de cuidados da pele que você precisa para receber o tratamento. Desculpe, mas receio que não possamos fazer isso por você...");
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150001, 1);
                    cm.sendOk("Aproveite!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151001, 1);
                    cm.sendOk("Aproveite!");
                } else
                    cm.sendOk("Você não tem mesos para comprar um cupom!");
            }
        }
    }
}
