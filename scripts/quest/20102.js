/*
 * 1º Avanço de Classe - Cygnus
 * Feito por Marcos P
 * OrbisMS - 2015
 * http://orbisms.net/
 */
 
importPackage(Packages.client);

var status = -1;

function end(mode, type, selection) {
    if (mode == 0) {
	if (status == 0) {
	    qm.sendNext("Esta es uma decisao muito importante.");
	    qm.dispose();
	    return;
	}
		status--;
    } else {
    	status++;
    }
    if (status == 0) {
    	qm.sendYesNo("Voce esta certo? esta sera sua decisao final, e nao sera possivel voltar tras. Voce esta certo que deseja se tornar um Blaze Wizard?");
    if (qm.getPlayer().getJob().getId() != 1200) {
	    qm.gainItem(1372043, 1);
	    qm.gainItem(1142066, 1);
	    qm.changeJob(MapleJob.BLAZEWIZARD1);
	    qm.getPlayer().resetStats();
	}
	qm.forceCompleteQuest();
    } else if (status == 2) {
    	qm.sendNextPrev("Ao obter uma nova classe, voce ganha items e seu inventario e automaticamente expandido.");
    } else if (status == 3) {
    	qm.sendNextPrev("Ao pegar uma nova classe, voce ganhara alguns pontos #bSP#k. Abra sua lista de #bhabilidades#k e selecione seus novos ataques.");
    } else if (status == 4) {
    	qm.sendNextPrev("Lembre-se: Ao morrer, voce perde EXP.");
    } else if (status == 5) {
    	qm.sendNextPrev("Seja forte e nunca desista! E isso que um Cavaleiro Cygnus faz.");
    	qm.dispose();
    }
}