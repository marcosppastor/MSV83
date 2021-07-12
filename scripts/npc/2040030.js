/*
Wisp - 1012113.js
OrbisMS - Marcos Paulo Pastor
www.OrbisMS.net - 2015
OrbisPQ
*/
 
var status = 0;
var requer = 4000282
var requer1 = 4000172
var requer2 = 4000288
var requer3 = 4000295
var requer4 = 4031459
var numpasses = 30
var numpasses1 = 50
var numpasses2 = 80
var numpasses3 = 100
var numItems = 200

importPackage(Packages.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if(cm.getChar().getMapId()==109010101){ //MAPA 1
		var eim = cm.getPlayer().getEventInstance();
		if (status == 0) {
			cm.sendOk ("\r\nEstagio 1. Recomendado para jogadores level 50-55\r\n\r\nNeste estagio voce precisara pegar "+ numpasses +" #bCaroco de Pessego#kmatando os monstros que aparecer pelo seu caminho!\r\nApos obter a quantidade exigida, fale comigo.");
			}
		else if (status == 1) {
			if (cm.haveItem(4000282, numpasses)) {
			cm.sendOk ("Parabens!\r\nVoce coletou a quantidade minima exigida de Carocos e esta pronto para o #bproximo estagio.#k\r\nPrepare-se!"); //tem
			}
			if (!cm.haveItem(4000282, numpasses)) {
			cm.sendOk ("Lamento mas voce nao possui #b "+ numpasses +" Caroco de Pessego#k"); //va coletar cabra safado
			cm.dispose();
			}
		}
		else if (status == 2) {
			cm.warpParty(109010102);
			cm.removeAll(requer);
			cm.mapMessage("Parabens por concluir esta etapa. Prepare-se para a proxima!");
			cm.showEffect("quest/party/clear");
			cm.playSound("Party1/Clear");
			cm.givePartyExp(8000,cm.getPartyMembers());
			cm.dispose();
			cm.dispose();
			}
		} else if (cm.getPlayer().getMapId() == 109010102) { // MAPA 2
			var eim = cm.getPlayer().getEventInstance();
			if (status == 0) {
				cm.sendNext ("\r\nEstagio 2. Recomendado para jogadores level 52-57\r\n\r\nNeste estagio voce precisara pegar "+ numpasses1 +" #bCauda da Raposa de Tres Caudas#k matando os monstros que aparecer pelo seu caminho!\r\nApos obter a quantidade exigida, fale comigo.");
			}
		else if (status == 1) {
			if (cm.haveItem(4000172, numpasses1)) {
			cm.sendOk ("Parabens!\r\nVoce coletou a quantidade minima exigida de Caudas e esta pronto para o #bproximo estagio.#k\r\nPrepare-se!"); //tem
			}
			if (!cm.haveItem(4000172, numpasses1)) {
			cm.sendOk ("Lamento mas voce nao possui #b "+ numpasses1 +" Cauda da Raposa de Tres Caudas#k"); //va coletar cabra safado
			cm.dispose();
			}
		}
		else if (status == 2) {
			cm.warpParty(109010103);
			cm.removeAll(requer);
			cm.removeAll(requer1);
			cm.mapMessage("Parabens por concluir esta etapa. Prepare-se para a proxima!");
			cm.showEffect("quest/party/clear");
			cm.playSound("Party1/Clear");
			cm.givePartyExp(12000,cm.getPartyMembers());
			cm.dispose();
			}
		} else if (cm.getPlayer().getMapId() == 109010103) { // MAPA 3
			var eim = cm.getPlayer().getEventInstance();
			if (status == 0) {
			cm.sendNext ("\r\nEstagio 3. Recomendado para jogadores level 58-62\r\n\r\nNeste estagio voce precisara pegar "+ numpasses2 +" #bChifres de Rena#k matando os monstros que aparecer pelo seu caminho!\r\nApos obter a quantidade exigida, fale comigo.");
			}
		else if (status == 1) {
			if (cm.haveItem(4000288, numpasses2)) {
			cm.sendOk ("Parabens!\r\nVoce coletou a quantidade minima exigida de Chifres e esta pronto para o #bproximo estagio.#k\r\nPrepare-se!"); //tem
			}
			if (!cm.haveItem(4000288, numpasses2)) {
			cm.sendOk ("Lamento mas voce nao possui #b "+ numpasses2 +" Chifres de Rena#k"); //va coletar cabra safado
			cm.dispose();
			}
		}
		else if (status == 2) {
			cm.warpParty(109010104);
			cm.removeAll(requer);
			cm.removeAll(requer1);
			cm.removeAll(requer2);
			cm.mapMessage("Parabens por concluir esta etapa. Prepare-se para a proxima!");
			cm.showEffect("quest/party/clear");
			cm.playSound("Party1/Clear");
			cm.givePartyExp(18000,cm.getPartyMembers());
			cm.dispose();
			}
		} else if (cm.getPlayer().getMapId() == 109010104) { // MAPA 4
			var eim = cm.getPlayer().getEventInstance();
			if (status == 0) {
			cm.sendNext ("\r\nEstagio 4. Recomendado para jogadores level 64-70\r\n\r\nNeste estagio voce precisara pegar "+ numpasses3 +" #bCouros de Crocodilo#k matando os monstros que aparecer pelo seu caminho!\r\nApos obter a quantidade exigida, fale comigo.");
			}
		else if (status == 1) {
			if (cm.haveItem(4000295, numpasses3)) {
			cm.sendOk ("Parabens!\r\nVoce coletou a quantidade minima exigida de Couros e esta pronto para o #bproximo estagio.#k\r\nPrepare-se!"); //tem
			}
			if (!cm.haveItem(4000295, numpasses3)) {
			cm.sendOk ("Lamento mas voce nao possui #b "+ numpasses3 +" Couros de Crocodilo#k"); //va coletar cabra safado
			cm.dispose();
			}
		}
		else if (status == 2) {
			cm.warpParty(109010105);
			cm.removeAll(requer);
			cm.removeAll(requer1);
			cm.removeAll(requer2);
			cm.removeAll(requer3);
			cm.mapMessage("Parabens por concluir esta etapa. Prepare-se para a proxima!");
			cm.showEffect("quest/party/clear");
			cm.playSound("Party1/Clear");
			cm.givePartyExp(22000,cm.getPartyMembers());
			cm.dispose();			
			}
		} else if (cm.getPlayer().getMapId() == 109010105) { // MAPA 5 E ULTIMO
			var eim = cm.getPlayer().getEventInstance();
			if (status == 0) {
			cm.sendNext ("\r\nEstagio 5. Recomendado para jogadores level 68-75\r\n\r\nNeste estagio voce precisara pegar "+ numItems +" #bRedemoinhos de Vento Amaldicoado do Boogie#k, matando os monstros que aparecer pelo seu caminho!\r\nApos obter a quantidade exigida, fale comigo.");
			}
		else if (status == 1) {
			if (cm.haveItem(4031459, numItems)) {
		    cm.sendOk ("Parabens!\r\nVoce coletou a quantidade minima exigida de Couros e esta pronto para o #bproximo estagio.#k\r\nPrepare-se!"); //tem
			}
			if (!cm.haveItem(4031459, numItems)) {
			cm.sendOk ("Lamento mas voce nao possui#b "+ numItems +" Redemoinho de Vento Amaldicoado do Boogie#k"); //va coletar cabra safado
			cm.dispose();
			}
		}
		else if (status == 2) {
			cm.warpParty(100000000);
			cm.removeAll(requer);
			cm.removeAll(requer1);
			cm.removeAll(requer2);
			cm.removeAll(requer3);
			cm.removeAll(requer4);
			cm.showEffect("quest/party/clear");
			cm.playSound("Party1/Clear");
			cm.givePartyExp(40000,cm.getPartyMembers());
			cm.sendOk("#b#e[PARABENS]#k#n Voce concluiu a ZenityPQ v1.\r\n\r\nEm breve esta missao tera mais estagios, mais monstros e no fim desta, voce recebera Pontos Orbis.")
			cm.mapMessage("Parabens por terem finalizado a ZentyPQ v1");
			cm.dispose();
			}
		} else if (cm.getPlayer().getMapId() == 109010106) { // MAPA 5 E ULTIMO
			var eim = cm.getPlayer().getEventInstance();
			if (status == 0) {
			cm.sendOk ("\r\nEstagio 1. Recomendado para jogadores level 50-55\r\n\r\nNeste estagio voce precisara pegar "+ numItems +" #bRedemoinho de Vento Amaldicoado do Boogie#k, matando os monstros que aparecer pelo seu caminho!\r\nApos obter a quantidade exigida, fale comigo.");
			cm.warpParty(100000000);
			cm.removeAll(requer);
			cm.removeAll(requer1);
			cm.removeAll(requer2);
			cm.removeAll(requer3);
			cm.removeAll(requer4);
			cm.dispose();
		    }	
		}	
	}
}	