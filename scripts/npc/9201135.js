/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

var toMap = new Array(550000000, 551000000, 540000000,540000000);
var inMap = new Array(540000000, 540000000, 551000000, 550000000);
var cost = new Array(10000, 50000, 50000, 10000);
var location;
var text = "Para onde você deseja ir?\n\n";
var status = 0;

function start() {
	if (cm.getPlayer().getMap().getId() != 540000000) {
		for (var i = 0; i < toMap.length; i ++) {
			if (inMap[i] == cm.getPlayer().getMap().getId()) {
				location = i;
				break;
			}
		}
		text +="\t\r\n#b#L0##m" + toMap[location] + "# (" + cost[location] + " mesos)#l#k";
	} else {
    	text += "\t\r\n#b#L0##m" + toMap[0] + "# (" + cost[0] + " mesos)#l\n\t\r\n#L1##m" + toMap[1] + "# (" + cost[1] + " mesos)#l#k";
	}
    cm.sendSimple(text);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else if (mode == 0) {
    	cm.sendNext("Tudo bem. Voce sabe o que e melhor para voce!");
        cm.dispose();
        return;
    } else {
        status++;
     }
    if (status == 1) {
        if (cm.getPlayer().getMap().getId() == 540000000) {
            location = selection;
        }
        if (toMap[location] == null) {
            cm.dipose();
            return;
        }
        cm.sendYesNo("Voce deseja ir para #b#m"+toMap[location]+"##k? A viagem de ida para #b#m"+toMap[location]+"##k, lhe custara #b" + cost[location] + "#k.\r\nVoce deseja ir?");
    } else if (status == 2) {
        if (cm.getMeso() < cost[location]) {
            cm.sendNext("Voce nao possui a quantidade de meso exigida.");
        } else {
            cm.warp(toMap[location]);
            cm.gainMeso(-cost[location]);
        }
        cm.dispose();
    }
}
