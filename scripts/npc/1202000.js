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

var status = -1;

function start() {
	action(1, 0, 0);	
}

function action(mode, type, selection) {  
	if (mode == -1) {
        cm.dispose();
    		} else {
        if (mode == 1)
            status++;
        else
            status--;
	if(cm.getPlayer().getMapId() == 140090000) {
		if (!cm.containsAreaInfo(21019, "helper=clear")) {
		if (status == 0) {
		cm.sendNext("Você finalmente acordou...!", 8);
		} else if (status == 1) {
			cm.sendNextPrev("E quem é você...?", 2);
		} else if (status == 2) {
			cm.sendNextPrev("A pessoa que te salvou do Black Mage... Que esperou você acordar!", 8);
		} else if (status == 3) {
			cm.sendNextPrev("Como... Como assim? Do que você esta falando?", 2);
		} else if (status == 4) {
			cm.sendNextPrev("Espera.. Eu... Estou me lembrando! Minha cabeça esta confusa...", 2);
		} else if (status == 5) {
			cm.showIntro("Effect/Direction1.img/aranTutorial/face");
			cm.showIntro("Effect/Direction1.img/aranTutorial/ClickLilin");
			cm.updateAreaInfo(21019, "helper=clear");
			cm.dispose();
		}
		} else {
		if (status == 0) {
			cm.sendNextPrev("Você esta pronto?", 8);
		} else if (status == 1) {
			cm.sendNextPrev("Eu não me lembro de quase nada. Quem es você...?", 2);
		} else if (status == 2) {
			cm.sendNextPrev("Fique calmo. Não entre em pânico. Você se lembra de pouco, pois o Black Mage afetou sua cabeça.Para voltar a se lembrar, somente o tempo para lhe ajudar...", 8);
		} else if (status == 3) {
			cm.sendNextPrev("Há alguns anos atrás, você lutou contra o Black Mage, para salvar a sua vila! Infelizmente ele o derrotou e consequentemente, mecheu com sua cabeça.", 8);
		} else if (status == 4) {
			cm.sendNextPrev("A vila agora se chama Rien, e o Black Mage o congelou. Não fale sobre o Black Mage, pois as pessoas sentem medo deste nome. Como você pode ver, esta Vila ficou coberta de gelo e neve, por conta do Black Mage. Faz pouco tempo que lhe encontrei aqui nesta Caverna de Gelo.", 8);
		} else if (status == 5) {
			cm.sendNextPrev("Eu sou a Lilin e lidero um clã de Rien. Estavamos a espera do Guerreiro de Rien, e você finalmente retornou!", 8);
		} else if (status == 6) {
			cm.sendNextPrev("Desculpe se estou falando muito, mas há muita coisa para falar, mostrar e te ajudar a lembrar. Aos poucos, conseguirei fazer com que você se lembre do passado.", 8);
		} else if (status == 7) {
			cm.gainExp(15);
			cm.gainExp(40);
			cm.gainExp(60);
			cm.gainExp(100);
			cm.gainExp(200);
			cm.gainExp(300);
			cm.gainExp(641);
			cm.gainExp(1000);
			cm.gainExp(993);
			cm.resetarStats();
			cm.gainMeso(1000);
			cm.warp(140000000);
			cm.mapMessage("Fale com Eleanor para adquirir sua primeira classe!");
                        cm.mapMessage("Fale com a Lilin para obter uma arma.");

			cm.mapMessage("Caso não consiga distrbuir pontos de habilidade, relogue.");
			cm.dispose();
		}	
	        }	
	} else {
		if (status == 0)
			cm.sendSimple("Is there anything you're still curious about? If so, I'll try to explain it better. #b#l\r\n#L0#Who am I? #l #l\r\n#L1#Where am I? #l #l\r\n#L2#Who are you?#l#l\r\n#L3#Tell me what I have to do.#l #l\r\n#L4#Tell me about my Inventory.#l #l\r\n#L5#How do I advance my skills?#l #l\r\n#L6#I want to know how to equip items.#l #l\r\n#L7#How do I use quick slots? #l #l\r\n#L8#How can I open breakable containers?#l #l\r\n#L9#I want to sit in a chair but I forgot how.#l#k");
		else if (status == 1) {
				if (selection == 0) {
					cm.sendNext("You are one of the heroes that saved Maple World from the Black Mage hundreds of years ago. You've lost your memory due to the curse of the Black Mage.");
					cm.dispose();
				} else if (selection == 1) {
					cm.sendNext("This island is called Rien, and this is where the Black Mage's curse put you to sleep. It's a small island covered in ice and snow, and the majority of the residents are Penguins.");
					cm.dispose();
				} else if(selection == 2) {
					cm.sendNext("I'm Lilin, a clan member of Rien, and I've been waiting for your return as the prophecy foretold. I'll be your guide for now.");
					cm.dispose();
				} else if(selection == 3) {
					cm.sendNext("Let's not waste any more time and just get to town. I'll give you the details when we get there.");
					cm.dispose();
				} else if(selection == 4) {
					cm.guideHint(14);
					cm.dispose();
				} else if(selection == 5) {
					cm.guideHint(15);
					cm.dispose();
				} else if(selection == 6) {
					cm.guideHint(16);
					cm.dispose();
				} else if(selection == 7) {
					cm.guideHint(17);
					cm.dispose();
				} else if(selection == 8) {
					cm.guideHint(18);
					cm.dispose();
				} else if(selection == 9) {
					cm.guideHint(19);
					cm.dispose();
				}									
		}
	}
}
}