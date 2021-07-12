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

/* 	Jimmy
	Singa Random Hair/Color Changer
	Credits to Cody and AAron
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
			cm.sendSimple("Oi, sou assistente aqui. Não se preocupe, sou bastante bom o suficiente para isso. Se você tem #b#t5150032##k ou #b#t5151027##k  permita-me cuidar do resto?\r\n#L1#Corte de cabelo: #i5150032##t5150032##l\r\n#L2#Pinte seu cabelo: #i5151027##t5151027##l");						
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
				cm.sendYesNo("Se você usar o cupom REGULAR,o seu cabelo mudará de forma randomica, não possuira a opção de escolher. Você quer realmente usar o cupom #b#t5150032##k e realmente mudar seu corte de cabelo?");
			} else if (selection == 2) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getPlayer().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendYesNo(" Se você usar o cupom REGULAR,o seu cabelo mudará de forma randomica. Você quer realmente usar o cupom #b#t5151027##k e mudar seu visual??");
			} else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if (cm.haveItem(5150032) == true){
					cm.gainItem(5150032, -1);
					cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
					cm.sendOk("Aproveite o seu novo penteado!");
				} else {
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder cortar o seu cabelo sem isso. Eu sinto Muito...");
				}
			}
			if (beauty == 2){
				if (cm.haveItem(5151027) == true){
					cm.gainItem(5151027, -1);
					cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
					cm.sendOk("Aproveite o seu novo visual!");
				} else {
					cm.sendOk("Hmmm ... parece que você não tem o cupom designado ... Eu tenho medo de não poder tingir o seu cabelo sem isso. Eu sinto Muito...");
			}
		}
	}
}
}