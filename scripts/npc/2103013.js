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
/*
importPackage(Packages.client);

var status = 0;
var selected = -1;
var party = 0;

function start() {
	status = -1;
	var text = "Voce nao pode falar com este NPC estando neste mapa.";
	if (cm.getMapId() == 926020001)
		text = "Stop! You've succesfully passed Nett's test. By Nett's grace, you will now be given the opportunity to enter Pharaoh Yeti's Tomb. Do you wish to enter it now?\r\n\r\n#b#L0# Yes, I will go now.#l\r\n#L1# No, I will go later.#l";
	else if (cm.getMapId() == 541010100)
		text = "Ola #h #, eu sou o #bDuarte#k.\r\n\r\n#b#L0#Duarte, me fale sobre a Piramide.#l\r\n#e#L1#Desejo entrar na Piramide.#l#n\r\n\r\n#L2#Desejo procurar um Grupo.#l\r\n\r\n#L3#Entrar na Tumba do Farao.#l\r\n#L4#Me fale sobre os Tesouros do Farao.#l\r\n#L5#Desejo receber a medalha <Protetor do Farao>.#l";
	else 
		text = "Voce deseja sair desta disputa?\r\n\r\n#b#L0# Sim.#l";
		
	cm.sendSimple(text);
}

function action(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode < 0 || (type == 4 && mode == 0)) {
		cm.dispose();
		return;
	} else status++;
	
	if (cm.getMapId() == 541010100) {
		if (status == 0) {
			if (selection > -1) selected = selection;
			if (selection == 0 || selected == 0) {
				cm.sendNext("This is the pyramid of Nett, the god of chaos and revenge. For a long time, it was buried deep in the desert, but Nett has ordered it to rise above ground. If you are unafraid of chaos and possible death, you may challenge Pharaoh Yeti, who lies asleep inside the Pyramid. Whatever the outcome, the choice is yours to make.");
			} else if (selection == 1) {
				cm.sendSimple("Selecione o que deseja fazer!\r\n\r\n#b#L0#Entrar sozinho.#l\r\n#L1#Entrar com um Grupo de #e2 ou mais#n.#l");
			} else if (selection == 2) {
				cm.openUI(0x16);
				cm.showInfoText("Use o Party Search (Teclado O). Abrira um 'pesquisador' de Grupo. Procure e entre em um para entrar!");
				cm.dispose();
			} else if (selection == 3) {
				cm.sendSimple("What gem have you brought?\r\n\r\n#L0##i4001322# #t4001322##l\r\n#L1##i4001323# #t4001323##l\r\n#L2##i4001324# #t4001324##l\r\n#L3##i4001325# #t4001325##l");
			} else if (selection == 4) {
				cm.sendNext("Inside Pharaoh Yeti's Tomb, you can acquire a #e#b#t2022613##k#n by proving yourself capable of defeating the #bPharaoh Jr. Yeti#k, the Pharaoh's clone. Inside that box lies a very special treasure. It is the #e#b#t1132012##k#n.\r\n#i1132012:# #t1132012#\r\n\r\n And if you are somehow able to survive Hell Mode, you will receive the #e#b#t1132013##k#n.\r\n\r\n#i1132013:# #t1132013#\r\n\r\n Though, of course, Nett won't allow that to happen.");
			} else if (selection == 5) {
				var progress = cm.getQuestProgress(29932);
				if (progress >= 50000)
					cm.dispose();
				else
					cm.sendNext("");
					
			}
		} else if (status == 1) {
			if (selected == 0) {
				cm.sendNextPrev("Once you enter the Pyramid, you will be faced with the wrath of Nett. Since you don't look too sharp, I will offer you some advice and rules to follow. Remember them well.#b\r\n\r\n1. Be careful that your #e#rAct Gauge#b#n does not decrease. The only way to maintain your Gauge level is to battle the monsters without stopping.\r\n2. Those who are unable will pay dearly. Be careful to not cause any #rMiss#b.\r\n3. Be wary of the Pharaoh Jr. Yeti with the #v04032424# mark. Make the mistake of attacking him and you will regret it.\r\n4. Be wise about using the skill that is given to you for Kill accomplishments.");
			} else if (selected == 1) {
				party = selection;
				cm.sendSimple("Cuidado para nao morrer!\r\nSelecione seu destino:\r\n#L0##i3994115##l#L1##i3994116##l#L2##i3994117##l#L3##i3994118##l");
			} else if (selected == 3) {
				if (selection == 0) {
					if (cm.haveItem(4001322)) {
						return;
					}
				} else if (selection == 1) {
				    if (cm.haveItem(4001323)) {
						return;
					}
				} else if (selection == 2) {
					if (cm.haveItem(4001324)) {
						return;
					}
				} else if (selection == 3) {
					if (cm.haveItem(4001325)) {
						return;
					}
				}
				cm.sendOk("You'll need a gem to enter Pharaoh Yeti's Tomb. Are you sure you have one?");
				cm.dispose();
			} else if (selected == 5) {
			} else {
				cm.dispose();
			}
		} else if (status == 2) {
			if (selected == 0) {
				cm.sendNextPrev("Those who are able to withstand Nett's wrath will be honored, but those who fail will face destruction. This is all the advice I can give you. The rest is in your hands.");
			} else if (selected == 1) {
				var mode = "EASY";
				//Finish this
				var pqparty = cm.getPlayer().getParty();
				if (party == 1) {
					if (pqparty == null) {
						cm.sendOk("Crie um grupo antes.");//BE NICE
						cm.dispose();
						return;		
					} else {
						if (pqparty.getMembers().size() < 1) {
							cm.sendOk("E necessario mais jogadores em seu grupo...");
							cm.dispose();
							return;								
						} else {
							var i = 0;
							for (var a = 0; a < pq.getMembers().size(); a++) {
								var pqchar = pq.getMembers().get(a);
								if (i > 1) break;
								if (pqchar != null && pqchar.getMapId() == 541010100) i++;
							}
							if (i < 2) {
								cm.sendOk("Verifique se Ha #e2 jogadores ou mais#n no mesmo mapa com voce.");
								cm.dispose();
								return;								
							}
						}
					}					
				}
				
				if (cm.getPlayer().getLevel() < 40) {
					cm.sendOk("Voce precisa estar no #eLVL 40+#n para entrar nesta missao.");
					cm.dispose();
					return;
				}
				if (selection < 3 && cm.getPlayer().getLevel() > 60) {
					cm.sendOk("Somente o Modo Hell esta disponivel para jogadores level Lv. 60.");
					cm.dispose();
					return;
				} 
				if (selection == 1) mode = "NORMAL";
				else if (selection == 2) mode = "HARD";
				else if (selection == 3) mode = "HELL";
	
				if (!cm.createPyramid(mode, party == 1)) {
					cm.sendOk("Todas as salas estao cheias para este modo. Tente entrar em outro canal:");
				}
				cm.dispose();
			}
		} else if (status == 3) {
			cm.dispose();
		}
	} else if (cm.getMapId() == 926020001) {
		if (status == 0) {
			if (selection == 0) 
				cm.dispose();//:(
			else if (selection == 1) 
				cm.sendNext("I will give you Pharaoh Yeti's Gem. You will be able to enter Pharaoh Yeti's Tomb anytime with this Gem. Check to see if you have at least 1 empty slot in your Etc window.");
			
		} else if (status == 1) {
			var itemid = 4001325;
			if (cm.getPlayer().getLevel() >= 60) itemid = 4001325;
			if (cm.canHold(itemid)) {
				cm.gainItem(itemid);
				cm.warp(541010100);
			} else 
				cm.showInfoText("You must have at least 1 empty slot in your Etc window to receive the reward.");
			
			cm.dispose();
		}
	} else {
			cm.warp(541010100);
			cm.getPlayer().setPartyQuest(null);
			cm.dispose();
	}



}

*/

function start() {
cm.sendOk("Estamos reparando a Piramide PQ para você,aguarde!");
}

function action(m, t, s) {
   
   
   cm.dispose();
}

