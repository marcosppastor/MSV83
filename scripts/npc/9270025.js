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
/* 	Xan
	Lian Hua Hua Skin Care
    by Moogra
*/
var skin = Array(0, 1, 2, 3, 4);

function start() {
    cm.sendSimple("Bem Olá! Bem-vindo ao Lian Hua Hua Skin-Care! Você gostaria de ter uma pele firme, apertada e saudável como a minha?  Com o #bCBD Skin Coupon#k, Você pode nos deixar cuidar do resto e ter o tipo de pele que você sempre quis!\r\n\#L1#Concordo!#l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        if (selection == 1)
            cm.sendStyle("Com o nosso serviço especializado, você pode ver a maneira como você irá cuidar do tratamento antecipadamente. Que tipo de tratamento de pele você gostaria de fazer? Vá em frente e escolha o estilo do seu agrado...", skin);
        else {
            if (cm.haveItem(5153010)){
                cm.gainItem(5153010 , -1);
                cm.setSkin(selection);
                cm.sendOk("Aproveite sua nova pele !");
            } else
                cm.sendOk("Parece que você não tem o cupom que precisa para receber o tratamento. Desculpe, mas parece que não podemos fazer isso por você.");
            cm.dispose();
        }
    }
}
