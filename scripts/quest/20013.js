/*
	NPC Name: 		Kia
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
    	status++;
    } else {
	if (status == 2) {
	    qm.sendNext("Entao o ser nao quer quebrar simples caixas? Tsc...");
	    qm.dispose();
	    return;
	}
		status--;
    }
    if (status == 0) {
    	qm.sendNext("#b(*tsc, tsc*)#k");
    } else if (status == 1) {
    	qm.sendNextPrev("Ola, meu nome e #p1102007#, e, por  hobbye, eu gosto de construir #bCadeiras#k. Voce gostaria de um presente?");
    } else if (status == 2) {
    	qm.sendNextPrev("A primeira coisa que precisamos para poder construir uma cadeira, e possuir os materiais necessarios.");
    } else if (status == 3) {
    	qm.sendNextPrev("Como nao possuimos as materias primas, deveremos obte-las!\r\nUsando os #bAtaques regulares#k, voce precisara quebrar as caixas e coletar os materiais necessarios para que possamos construir uma.");
    } else if (status == 4) {
    	qm.sendAcceptDecline("Eu precisarei de 1 #b#t4032267##k e 1 #b#t4032268##k. Para obter estes materiais, sera necessario extrai-los de algum local.\r\nComo pode ver, ha muitas caixas neste mapa. Se voce quebrar e coletar os materiais necessarios, darei-lhe uma cadeira.\r\nVoce deseja fazer isso?");
    } else if (status == 5) {
		qm.forceStartQuest();
		qm.guideHint(9);
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
    	qm.sendNext("Voce conseguiu coletar o #t4032267# e o #t4032268#, ambos materiais necessarios para criar uma cadeira.");
    } else if (status == 1) {
    	qm.sendNextPrev("Isto aqui e uma #t3010060#. O que voce achou? Apesar de ser algo simples, ela e totalmente sua!\r\nPegue suas recompensas: \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i3010060# 1 #t3010060# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
    } else if (status == 2) {
		qm.gainItem(4032267, -1);
		qm.gainItem(4032268, -1);
		qm.gainItem(3010060, 1);
		qm.forceCompleteQuest();
		qm.forceCompleteQuest(20000);
		qm.forceCompleteQuest(20001);
		qm.forceCompleteQuest(20002);
		qm.forceCompleteQuest(20015);
		qm.gainExp(95);
		qm.guideHint(10);
		qm.dispose();
    }
}