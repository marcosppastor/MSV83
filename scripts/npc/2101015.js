/*
 * @author Marcos P
 * TrueMS - 2016
 * APQ
 * truems.net/
*/

var status = 0;

importPackage(Packages.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			apqpontos = cm.getPlayer().getAriantPontos();
			if (apqpontos < 100) {
				cm.sendOk("#h #, a sua atual #bPontuação de Arena de Batalha#k é de #b" + apqpontos + "#k pontos.\r\nVocê precisa possuir ao menos #b100 pontos#k para que eu possa lhe dar a Cadeira de Praia com Palmeira (#i3010018#).\r\nQuando possuir os #b100 pontos#k, volte a falar comigo.")
				cm.dispose();
				}
				if (apqpontos > 99) {
					cm.sendNext("Vejo que você conseguiu conquistar os #b100 pontos#k necessários para troca!");
					}
				} else if (status == 1) {
                                    cm.getPlayer().getCashShop().gainCash(2, 50);

                  cm.playerMessage("Você ganhou 50 pontos Maple como bonificação!")
					cm.getPlayer().gainAriantPontos(-100);
					cm.gainItem(3010018, 1);
					cm.dispose();
				}
	}
}