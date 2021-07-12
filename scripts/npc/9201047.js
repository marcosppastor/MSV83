/*
9201047 - Glimmer Man 
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
		if (status >= 2 && mode == 0) {
			cm.sendOk("Tudo bem. Até a próxima!");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		}
		else {
			status--;
		}
		if (cm.getPlayer().getMapId() == 670010200) {
			if (status == 0 && cm.isLeader()) {
				var num = cm.countMonster();
				if (num == 0) {
					cm.sendOk("Uma fada apareceu! Derrote-a para pegar um #bCaco de Espelho Magico#k para entregar ao Amos.");
					cm.spawnMonster(9400518, -5, 150);
					cm.dispose();
				}else {
					cm.sendOk("Por favor, derrote todos os monstros do mapa antes de falar comigo.");
					cm.dispose();
				}
			} else {
				cm.sendNext("Somente o lider do grupo pode falar comigo.");
				cm.dispose();
			}
		} else if (cm.getPlayer().getMapId() == 670011000) {
			cm.warp(670010000, 0);
			cm.dispose();
		}
	}
}