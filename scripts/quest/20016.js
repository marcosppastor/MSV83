/*
	NPC Name: 		Nineheart
	Description: 		Quest - Do you know the black Magician?
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
    	status++;
    } else {
	if (status == 8) {
	    qm.sendNext("Voce possui duvidas? Vamos conversando. Quem sabe eu acabe tirando alguma duvida sua...");
	    qm.dispose();
	    return;
	}
		status--;
    }
    if (status == 0) {
    	qm.sendNext("Ola, #h0#. Bem vindo a #p1101000# Knights. Eu sou #p1101002# e atualmente estou servindo a Tatica Empress.");
    } else if (status == 1) {
    	qm.sendNextPrev("Sei que voce possa estar com muitas duvidas, mas vamos com calma... Aos poucos eu vou explicando melhor.");
    } else if (status == 2) {
    	qm.sendNextPrev("Esta es a Ilha de Ereve. Somos gratos a forca magica Empress, por proteger este local.");
    } else if (status == 3) {
    	qm.sendNextPrev("Ha muito tempo atras, guerreiros guerriaram contra o Black Mage - Ja falo sobre ele, e gracas a estes guerreiros e a forca Empress, estamos salvos.");
    } else if (status == 4) {
    	qm.sendNextPrev("Apesar de aparentemente estarmos salvos, nosso Centro de Inteligencia descobriu atividades do Black Mage.");
    } else if (status == 5) {
    	qm.sendNextPrev("Por via das duvidas, estamos recrutando pessoas para nos ajudar a proteger o Mundo Maple! Estamos fazendo novos Cavaleiros Cygnus!");
    } else if (status == 6) {
    	qm.sendNextPrev("Nao es facil tornar-se um, por isso possuimos diversos instrutores. Tudo isso para nos certificarmos de que selecionaremos as pessoas certas!");
    } else if (status == 7) {
    	qm.sendNextPrev("Vejo que voce tem futuro como um Cavaleiro Cygnus... Espero que voce nao perca vossa forca de vontade, e garra.");
    } else if (status == 8) {
    	qm.sendAcceptDecline("Deseja continuar trilhando este caminho para mais tarde se tornar um Cavaleiro Cygnus?? \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 380 exp");
    } else if (status == 9) {
	   if (!qm.isQuestStarted(20016)) {
	    	qm.forceStartQuest();
	    	qm.gainExp(380);
	   }
		qm.sendNext("Fico alegre em saber que ainda existem bravos guerreiros como voce!\r\nApesar de tudo, independente da sua bravura, resta-me uma duvida:");
    } else if (status == 10) {
    	qm.sendNextPrev("Voce se julga forte o suficiente para comecar uma nova aventura como Cavaleiro Cygnus?");
    } else if (status == 11) {
    	qm.sendNextPrev("Vemos que nao...");
    } else if (status == 12) {
    	qm.sendPrev("Irei lhe ajudar!\r\nFale com a Cygnus Empress para concluir seu treinamento!");
    	qm.forceCompleteQuest();
		qm.gainItem(4032269, 1);
		qm.gainExp(380);
		qm.gainExp(580);
		qm.gainExp(600);
		qm.gainExp(2000);
    	qm.dispose();
    }
}

function end(mode, type, selection) {
}