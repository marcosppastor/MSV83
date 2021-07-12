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
/* NPC Base
	Map Name (Map ID)
	Extra NPC info.


var status;
var ticketId = 5220000;
var mapName = ["Henesys", "Ellinia", "Perion", "Kerning City", "Sleepywood", "Mushroom Shrine", "Showa Spa (M)", "Showa Spa (F)", "New Leaf City", "Nautilus"];
var curMapName = "";

function start() {
    status = -1;
	curMapName = mapName[(cm.getNpc() != 9100117 && cm.getNpc() != 9100109) ? (cm.getNpc() - 9100100) : cm.getNpc() == 9100109 ? 8 : 9];
	
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
			if (cm.haveItem(ticketId)) {
				cm.sendYesNo("Você deseja usar o Gachapon de " + curMapName + "?\r\nQuem sabe a sorte nao esta com voce...");
			} else {
				cm.sendSimple("Você deseja usar o Gachapon de " + curMapName + "? Tambem posso lhe ajudar, caso tenha duvida:\r\n\r\n#L0#O que é um Gachapon?#l\r\n#L1#Compro faco para comprar um Gachapon?#l");
			}
		} else if(status == 1 && cm.haveItem(ticketId)) {
			if(cm.canHold(1302000) && cm.canHold(2000000) && cm.canHold(3010001) && cm.canHold(4000000)) { // One free slot in every inventory.
				cm.gainItem(ticketId, -1);
				cm.doGachapon();
			} else {
				cm.sendOk("Por favor tenha a certeza de ter no minímo um espaço livre em seu #rEQUIP, USE, SET-UP, #kand #rETC#k .");
			}
			cm.dispose();
		} else if(status == 1) {
			if (selection == 0) {
                cm.sendNext("Utilizando um Gachapon, voce pode ganhar items raros, como capas, luvas, armas e ate pergaminhos!");
            } else {
                cm.sendNext("Cupons de Gachapons estão disponiveis para venda na Loja de Cash.");
            }
		} else if(status == 2) {
			cm.sendNextPrev("Você pode ganhar uma variedades de items do " + curMapName + " Gachapon! Tudo depende da sua sorte.");
		} else {
			cm.dispose();
		}
    }
}
 */