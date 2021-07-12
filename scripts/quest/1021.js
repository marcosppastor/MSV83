/* Author: Xterminator (Modified by RMZero213)
	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
*/
importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			qm.sendNext("Olá, tudo bem? Meu nome é Roger e hoje vou lhe ensinar coisas necessárias sobre este vasto mundo...");
		} else if (status == 1) {
			qm.sendNextPrev("Uma das coisas mais comum que acontecem, é ficarmos com a taxa de HP baixa.\r\nEu não quero que isso aconteça com você, mas te ensinarei o que fazer em casos como este.");
		} else if (status == 2) {
			qm.sendAcceptDecline("Então... Deixe-me mostrar-te!\r\nAbaracadabra ~!");
		} else if (status == 3) {
		       if (qm.c.getPlayer().getHp() >= 50) {
                        qm.c.getPlayer().setHp(25);
                        qm.c.getPlayer().updateSingleStat(MapleStat.HP, 25);
               }
        if (!qm.haveItem(2010007))
                        qm.gainItem(2010007, 1);
			qm.sendNext("Surpreso(a)? Se sua taxa de HP fica em 0, isso se torna algo preocupante. Agora, eu lhe darei a #rMaçã do Roger#k. Por favor, use-a. Você vai se sentir mais forte. Abra o seu inventário e clique duas vezes para usá-lo.\r\nEi, é muito simples para abrir o seu inventário. Basta pressionar #bI#k em seu teclado.");
		} else if (status == 4) {
			qm.sendPrev("Estarei lhe dando algumas maçãs, portanto, use-as quando haver necessidade! ");
		} else if (status == 5) {
			qm.forceStartQuest();
			qm.dispose();
		}
	}
}

function end(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			qm.sendNext("Viu como é facil de consumir o item? Simples, não? Você pode definir um #bhotkey#k no slot inferior direito.\r\nHaha, você nao sabia disso! certo? Ah, e se você é um iniciante, a taxa de HP irá se recuperar automaticamente conforme o tempo passa. Bem, leva tempo, mas esta é uma das estrategias para os novatos.");
		} else if (status == 1) {
			qm.sendNextPrev("Tudo bem! Agora que você aprendeu muito, vou dar-lhe um presente. Esta é uma obrigação para sua viagem neste vasto mundo. Por favor, use isso em casos de emergencia!");
		} else if (status == 2) {
			qm.sendNextPrev("Bom... isso é tudo que eu posso te ensinar. Eu sei que é triste, mas é hora de dizer adeus. Bem, tome cuidado, e boa sorte!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
		} else if (status == 3) {
                       if(qm.isQuestCompleted(1021))
                          qm.dropMessage(1,"Houve um erro!");
                else if(qm.canHold(2010000) && qm.canHold(2010009)){
                        qm.gainExp(10);
                        qm.gainItem(2010000, 3);
                        qm.gainItem(2010009, 3);
                        qm.forceCompleteQuest();
                } else
                        qm.dropMessage(1,"Seu invetario está cheio!");
                        qm.dispose();
               }
	}
}

