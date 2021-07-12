/**
    VersÃ£o 0.2 
    MÃ©todo fixado e NPC arrumado por Marcos Paulo
	OrbisMS - 2015
	www.orbisms.net/

 * Modified by Daghlawi for TrueMapleStory 
* */

var status;
var quant;

function start() {
	quant = cm.itemQuantity(4001106);
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		cm.dispose();
		return;
	}
	if (status == 0)
		cm.sendNext("Então você conseguiu escapar do labirinto, em? Parabéns! Como forma de recompensa, você gostaria de trocar os cupons coletados por coisas melhores?");
	else if (status == 1) {
		if (cm.getParty() != null && cm.isLeader()) {
			if (quant >= 100) {
				cm.sendOk("Otimo! Voce coletou #b" + quant + " Cupom de entrada para Ludibrium\r\n#k Agora voce por ir e receber sua recompensa!");
			} else {
				cm.sendOk("Por favor, colete mais cupons.\r\nVocê precisa de #b100 Cupons de entrada para Ludibrium#k para concluir esta missão.");
				cm.dispose();
			}
		} else {
			cm.sendPrev("Por favor, contate o #blider do seu grupo#k para falar comigo apos coletar no minimo 100 cupons.");
			cm.dispose();
		}
	} else if (status == 2) {
		var eim = cm.getChar().getEventInstance();
		if (eim != null) {
			cm.givePartyExp(quant* 50, eim.getPlayers());
			eim.finishPQ();
		} else
		cm.gainItem(4001106, -100);	
	    cm.removeAll(4001106);
		cm.warpParty(809050016);
		cm.givePartyExp(7500,cm.getPartyMembers());
		cm.dispose();
	}
}