/*
	NPC Name: 		Kinu
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
    	status++;
    } else {
	if (status == 2) {
	    qm.sendNext("Ataques regulares sao os mais simples e os mais fracos. Por que nao aprimorar suas habilidades?");
	    qm.dispose();
	    return;
	}
		status--;
    }
    if (status == 0) {
    	qm.sendNext("Eu estava esperando por voce, #h0#. Meu nome e #p1102006# e um dos meus irmaos me falou sobre voce. Vejo que voce aprendeu a usar os #bAtaques regulares#k, certo? Que tal aprender outras habilidades?");
    } else if (status == 1) {
    	qm.sendNextPrev("Ao conquistar um novo level, voce ganha automaticamente #bPontos de Habilidades e Pontos de Status#k. Quando nivelar, aperte #e'K'#n e clique em 'Auto Assign'");
    } else if (status == 2) {
    	qm.sendAcceptDecline("Darei um tempo para voce praticar.... Voce precisara encontrar 1 #o100121#s nesta area. Tambem devera matar #r3 #o100121#s#k usando a sua habilidade #bThree Snails#b. Apos matar e coletar, fale comigo.");
    } else if (status == 3) {
    	qm.forceStartQuest();
    	qm.guideHint(8);
		qm.gainItem(4000483, 1);
		qm.gainItem(4000483, -1);
		qm.forceCompleteQuest();
		qm.sendNext("Parabens, voce conseguiu #o100121#s e me trouxe uma #t4000483#. Isso e impressionante! Para lhe ajudar nas proximas etapas, pegue:\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 40 exp");
		qm.gainExp(40);
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
    	qm.sendNext("Parabens, voce conseguiu #o100121#s e me trouxe uma #t4000483#. Isso e impressionante! Para lhe ajudar nas proximas etapas, pegue:\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 40 exp");
    } else if (status == 1) {
		qm.gainItem(4000483, 1);
		qm.gainItem(4000483, -1);
		qm.forceCompleteQuest();
		qm.gainExp(40);
		qm.dispose();
    }
}