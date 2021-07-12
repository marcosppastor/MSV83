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

/* Aura
 * 
 * Adobis's Mission I: Unknown Dead Mine (280010000)
 * 
 * Zakum PQ NPC  [Dead Mines]
*/

var status;
var selectedType;
var scrolls;
var nomeServer = "Templo de fogo";


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
			cm.sendSimple("Cuidado, pois o poder de #b" + nomeServer + "#k não se perdeu..\r\n #b\r\n#L0#O que eu vou fazer aqui?#l\r\n#L1#Eu trouxe os itens!#l\r\n#L2#Eu quero sair!#l");
		}
		else if (status == 1) {
			selectedType = selection;
			if (selection == 0) {
				cm.sendNext("Para revelar o poder de #rZakum#k, você vai ter que recriar seu núcleo. Escondido em algum lugar neste calabouço há um \"Minério de fogo\" que é um dos materiais necessários para o núcleo . Encontre-o e traga para mim.\r\n\r\nAh, e você poderia me fazer um favor? Há também um número de documentos em papel deitado debaixo de pedras por aqui. Se você me trazer 30 ou mais deles, eu posso recompensa-lo por seus esforços.")
				cm.dispose();
			}
			else if (selection == 1) {
				if (!cm.haveItem(4001018)) { //fire ore
					cm.sendNext("Traga o Minério de  fogo com você.")
					cm.dispose();
				}
				else {
					if (!cm.haveItem(4001015, 30)) { //documents
						cm.sendYesNo("Então, você trouxe o minério de fogo com você? Nesse caso, eu posso dar a você e a seu grupo um pedaço disso que deve ser mais do que suficiente para criar o núcleo de #r Zakum #k. Certifique-se de que todo o seu grupo tenha espaço em seus inventários antes de prosseguir.");
						scrolls = false;
					}
					else {
						cm.sendYesNo("Então, você trouxe o minério de fogo e os documentos com você? Nesse caso, eu posso dar a você e ao seu grupo um pedaço disso que deve ser mais do que suficiente para criar o núcleo de #r Zakum #k. Além disso, desde que você trouxe os documentos com você, eu também posso lhe dar um item especial que o levará à entrada da mina a qualquer momento. Certifique-se de que todo o seu grupo tenha espaço em seus inventários antes de prosseguir.");
						scrolls = true;
					}
				}
			}
			else if (selection == 2) {
				cm.sendYesNo("Você tem certeza que quer sair? Se você é o líder do grupo, seu grupo também será removido da #b Mina dos mortos #k.")
			}
		}
		else if (status == 2) {
			var eim = cm.getChar().getEventInstance();
			if (selectedType == 1 && cm.haveItem(4001018)) {
				var party = eim.getPlayers();
				
				cm.gainItem(4001018, -1);
				if (scrolls) {
					var tixx = cm.getPlayer().countItem(4001015);
					cm.gainItem(4001015, -30);
				}
				
				//give items/exp
				cm.givePartyItems(4031061, 1, party);
				if (scrolls) {
					cm.givePartyItems(2030007, Math.round(tixx/5), party);
					cm.givePartyExp(20000, party);
					for (var outt = 0; outt<party.size(); outt++) {//Finish PQ and set Zakum Level up a bit...
						if (party.get(outt).getZakumLevel() < 1){ //Do this so ppl dnt cheat by doin this over and over...
						party.get(outt).addZakumLevel();
						}
						party.get(outt).saveToDB();
					}
				}
				else {
					cm.givePartyExp(12000, party);
					for (var outt = 0; outt<party.size(); outt++) {//Finish PQ and set Zakum Level up a bit...
						if (party.get(outt).getZakumLevel() < 1){ //Do this so ppl dnt cheat by doin this over and over...
						party.get(outt).addZakumLevel();
						}
						party.get(outt).saveToDB();
					}
				}
				
				//clear PQ
				eim.finishPQ();
			}
			else if (selectedType == 2) {
				if (cm.isLeader())
					eim.disbandParty();
				else
					eim.leaveParty(cm.getChar());
			}
			cm.dispose();
		}
	}
}