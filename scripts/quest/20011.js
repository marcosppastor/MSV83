/*
	NPC Name: 		Kisan
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 2) {
	    qm.sendNext("Voce realmente deseja desistir? Assim como meu irmao, tambem lhe compensarei.");
	    qm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
    	qm.sendNext("De inicio, posso comecar lhe ensinando os #bAtaques basicos#k. Por ser basicos, nao surgem efeito significante em monstros mais fortes...");
    } else if (status == 1) {
    	qm.sendNextPrev(" Com uma arma em sua mao, voce devera chegar perto do monstro e bater neste, ate que o mesmo morra. Para bater, pressione #e#rCtrl#n#k");
    } else if (status == 2) {
    	qm.sendAcceptDecline("Agora que voce ja sabe mais ou menos como funciona, iremos aprender na pratica. Nesta area ha alguns #r#o100120##k. Voce precisa apenas matar um destes monstros e apos isso, falar comigo.");
    } else if (status == 3) {
		qm.forceStartQuest();
		qm.guideHint(4);
		qm.gainItem(1002869, 1);
		qm.gainItem(1052177, 1);
		qm.forceCompleteQuest();
		qm.sendNext("Estes sao os equipamentos para os Noblesses. Da mesma forma que meu irmao apostou em voce, eu tambem estou apostando. Voce vai longe!\r\nPara ajudar no seu empenho, pegue estes items: \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1002869# #t1002869# - 1 \r\n#i1052177# #t1052177# - 1 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 30 exp");
		qm.gainExp(30);
		qm.guideHint(6);
		qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0) {
    	qm.sendNext("Olha so... vejo que voce eliminou com sucesso um #o100120#. Simples e facil, nao? Eu lhe ensinei o basico.\r\nA partir de agora, vou recomendar voce para o professor #p1102006#. Ele lhe ensinara como aprimorar suas habilidades e se tornar mais forte.");
    } else if (status == 1) {
    	qm.sendNextPrev("Estes sao os equipamentos para os Noblesses. Da mesma forma que meu irmao apostou em voce, eu tambem estou apostando. Voce vai longe!\r\nPara ajudar no seu empenho, pegue estes items: \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1002869# #t1002869# - 1 \r\n#i1052177# #t1052177# - 1 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 30 exp");
    } else if (status == 2) {
		qm.gainItem(1002869, 1);
		qm.gainItem(1052177, 1);
		qm.forceCompleteQuest();
		qm.gainExp(30);
		qm.guideHint(6);
		qm.dispose();
    }
}