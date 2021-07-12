/*
 * @author Marcos P
 * TrueMS - 2017
 * truems.net.br/
 * Crystal Ilbi - PT. 2/3

*/

function start() {
	cm.sendSimple("Seguindo a missão da #bIlbi de Cristal#k (#i2070016#)\r\n\r\nAqui daremos o #esegundo e o terceiro passo!#n\r\n\r\n2° Passo:\r\nVocê deverá coletar 20 unidades de #bFirebrand Badge#k para que eu possa trocar por 1 unidade de #bCrystal Shard#k.\r\n\r\n3° Passo:\r\nVocê deverá coletar 25 unidades de #bStormbreaker Badge#k para que eu possa trocar por 1 unidade de #bNaricain Jewel#k.\r\n\r\n#L0##e2° Passo:\r\n#n: Trocar 20 unidades de #bFirebrand Badge#k #i4032008#\r\n#bPor 1 unidade de Crystal Shard#k (#i4031917#)\r\n#k#l\r\n\r\n#L1##e3° Passo:\r\n#n: Trocar 25 unidades de #bStormbreaker Badge#k #i4032006#\r\n#bPor 1 unidade de Naricain Jewel#k (#i4031758#)\r\n#k#l");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if ((cm.haveItem(4032008, 20))) {
			cm.sendOk("#e#dPronto!#n#k\r\n#dTroca efetuada com sucesso.");
			cm.mapMessage("O segundo passo foi dado. Agora cumpra o terceiro, falando comigo!");
			cm.gainItem(4032008, -20);
            cm.gainItem(4031917, 1);	
            cm.dispose();
		}
		else if (!cm.haveItem(4032008, 20)) {
			cm.sendOk("#dLamento, mas voce nao possui 20 unidades de #i4032008#.");
			cm.dispose();
		}
	}
	if (selection == 1) {
		if ((cm.haveItem(4032006, 25))) {
			cm.sendOk("#e#dPronto!#n#k\r\n#dTroca efetuada com sucesso.");
			cm.mapMessage("O terceiro passo foi dado. Agora cumpra o quarto falando com o John Barricade!");
			cm.gainItem(4032006, -25);
            cm.gainItem(4031758, 1);	
            cm.dispose();
		}
		else if (!cm.haveItem(4032006, 25)) {
			cm.sendOk("#dLamento, mas voce nao possui 25 unidades de #i4032006#.");
			cm.dispose();
		}
	}
}

