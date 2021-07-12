
var status = -1;
var map = 910120000;
var num = 5;
var maxp = 5;

function start() {
    status = -1;
    curMap = cm.getPlayer().getMapId() - 910120000;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status <= 1) {
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	if (cm.isQuestStarted(22515) || cm.isQuestStarted(22516) || cm.isQuestStarted(22517) || cm.isQuestStarted(22518)) {
		cm.sendYesNo("Você gostaria de entrar no centro de treinamento ?");
		status = 1;
	}
	var selStr = "Você gostaria de entrar no centro de treinamento ?";
	for (var i = 0; i < num; i++) {
		selStr += "\r\n#b#L" + i + "#Centro de treinamento " + i + " (" + cm.getPlayerCount(map + i) + "/" + maxp + ")#l#k";
	}
	cm.sendSimple(selStr);
    } else if (status == 1) {
	if (selection < 0 || selection >= num) {
		cm.dispose();
	} else if (cm.getPlayerCount(map + selection) >= maxp) {
		cm.sendNext("Este centro de treinamento esta cheio");
		status = -1;
	} else {
		cm.warp(map + selection, 0);
		cm.dispose();
	}
    } else if (status == 2) {
	cm.warp(910120000,0);
	cm.dispose();
    }
}

