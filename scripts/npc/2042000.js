

var map = 980000000; 
var minLvl = 30;
var maxLvl = 51;
var minAmt = 1;
var maxAmt = 6;

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
    if (cm.getParty() == null) {
        cm.sendOk("#eE necessário criar um grupo antes de começar o Festival de Monstros!#k");
        cm.dispose();
    } else if (!cm.isLeader()) {
        cm.sendOk("Se você quer começar o Festival, avise o #blíder do grupo#k para falar comigo.");
        cm.dispose();
    }else{
        var party = cm.getParty().getMembers();
        var inMap = cm.partyMembersInMap();
        var lvlOk = 0;
		var isInMap = 0;
        for (var i = 0; i < party.size(); i++) {
			if (party.get(i).getLevel() >= minLvl && party.get(i).getLevel() <= maxLvl) {
				lvlOk++;
			}
			if (party.get(i).getMapid() != 980000000) {
				//isInMap = false;
				isInMap++
			}
        }
	
        if (party >= 1) {
            cm.sendOk("Você não tem número suficiente de pessoas em seu grupo. Você precisa de um grupo com #b"+minAmt+"#k - #r"+maxAmt+"#k membros e eles devem estar no mapa com você.");
            cm.dispose();
        } else if (lvlOk != inMap) {
            cm.sendOk("Certifique se todos em seu grupo estão dentre os níveis corretos (" + minLvl + "~" + maxLvl + ")!");
            cm.dispose();
		} else if (isInMap > 0) {
			cm.sendOk("Existe alguém do grupo que não esta no mapa!");
			cm.dispose();
        }else{
            cm.sendCPQMapLists();	
        }
    }
} else if (status == 1) {
		if (cm.fieldTaken(selection)) {
				if (cm.fieldLobbied(selection)) {
					cm.challengeParty(selection);
					cm.dispose();
				} else {
					cm.sendOk("A sala esta cheia.");
					cm.dispose();
					}
				} else {
				cm.cpqLobby(selection);
				cm.dispose();
				}
	}
}
}



