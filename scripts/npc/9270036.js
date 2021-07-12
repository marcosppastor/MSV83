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

/* 	Eric
	Singapore VIP Hair/Color Changer
	MADE BY AAron and Cody
*/
var status = 0;
var beauty = 0;
var mhair = Array(30110, 30290, 30230, 30260, 30320, 30190, 30240, 30350, 30270, 30180);
var fhair = Array(31260, 31090, 31220, 31250, 31140, 31160, 31100, 31120, 31030, 31270, 31810);
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
			cm.sendSimple("Bem-vindo, bem-vindo, bem vindo ao Quick-Hand Hair-Salon !. Você por acaso, tem o #b#t5150033##k ou #b#t5151028 ##k? Em caso afirmativo, que tal me deixar cuidar do seu cabelo? Por favor, o que você quer fazer com isso?\r\n#L1#Corte de cabelo: #i5150033##t5150033##l\r\n#L2#Pintar meu cabelo: #i5151028##t5151028##l");						
		} else if (status == 1) {
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
				cm.sendStyle("Eu posso mudar completamente o aspecto do seu cabelo. Você está pronto para uma mudança? Com o #b#t5150033##k, Eu cuidarei do resto por você. Escolha o estilo de sua preferência!", hairnew);
			} else if (selection == 2) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getPlayer().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("Eu posso mudar completamente o aspecto do seu cabelo. Você está pronto para uma mudança? Com o #b#t5151028##k, Eu cuidarei do resto por você. Escolha a cor de sua preferência!", haircolor);
			} else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if (cm.haveItem(5150033) == true){
					cm.gainItem(5150033, -1);
					cm.setHair(hairnew[selection]);
					cm.sendOk("Aproveite o seu novo corte de cabelo!");
				} else {
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
				}
			}
			if (beauty == 2){
				if (cm.haveItem(5151028) == true){
					cm.gainItem(5151028, -1);
					cm.setHair(haircolor[selection]);
					cm.sendOk("Aproveite o seu novo visual!");
				} else {
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder tingir o seu cabelo sem isso. Eu sinto Muito...");
			}
		}
	}
}
}