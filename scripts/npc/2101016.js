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
		copns = cm.getPlayer().countItem(4031868);
                if (copns < 1) {
                      cm.sendOk("Que pena... você nao conseguiu nenhuma jóia(#i4031868#).")
                      cm.dispose();
                }
		if (copns > 0 || !cm.getPlayer().isGM()) {
				cm.sendNext("Parabéns #h #!\r\nVocê foi muito bem conseguindo #b" + copns + "#k jóias.\r\nPor ter completado a partida, compensarei-lhe em #b5 pontos#k.\r\nSe você quiser saber mais sobre a pontuação de Arena de Batalha, fale com #b#p2101015##k.");
			}
		} else if (status == 1) {
                        //cm.warp(980010020, 0);
                        cm.getPlayer().getCashShop().gainCash(2, 50);
    cm.playerMessage("Você ganhou 50 pontos Maple como bonificação!")
                        cm.removeAll(4031868);   
                        cm.getPlayer().gainExp(92.7 * cm.getPlayer().getExpRate() * copns, true, true);
                        cm.getPlayer().gainAriantPontos(5);
			cm.dispose();
	 }
    }
}