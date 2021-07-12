var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
	}
	status--;
    }
    if (status == 0) {
	    cm.removeAll(4001163);
	    cm.removeAll(4001169);
	    cm.removeAll(2270004);
	cm.sendSimple("\r\n#b#L0#Me de os brincos de altair.#l\r\n#L1#Me de os brincos brilhantes de Altaire.#l\r\n#L2#Desafiar a Floresta da Névoa venenosa.#l#k");
    } else if (status == 1) {
	if (selection == 0) {
	    if (!cm.haveItem(1032060) && cm.haveItem(4001198, 10)) {
		cm.gainItem(1032060,1);
		cm.gainItem(4001198, -10);
	    } else {
		cm.sendOk("Você já tem Jóias Altair ou você não tem 10 Fragmentos Altair");
	    }
	} else if (selection == 1){
	    if (cm.haveItem(1032060) && !cm.haveItem(1032061) && cm.haveItem(4001198, 10)) {
		cm.gainItem(1032060,-1);
		cm.gainItem(1032061, 1);
		cm.gainItem(4001198, -10);
	    } else {
		cm.sendOk("Você já possui os brincos Altair  ou você não tem 10 Fragmentos");
	    }
	
	} else if (selection == 2) {
	    if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
		cm.sendOk("O lider do seu grupo precisa estar aqui.");
	    } else {
		var party = cm.getPlayer().getParty().getMembers();
		var mapId = cm.getPlayer().getMapId();
		var next = true;
		var size = 0;
		var it = party.iterator();
		while (it.hasNext()) {
			var cPlayer = it.next();
			var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
			if (ccPlayer == null || ccPlayer.getLevel() < 70 || ccPlayer.getLevel() > 255) {
				next = false;
				break;
			}
			size += (ccPlayer.isGM() ? 4 : 1);
		}	
		if (next && size >= 1) {
			var em = cm.getEventManager("Ellin");
			if (em == null) {
				cm.sendOk("Por favor tente mais tarde.");
			} else {
				em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
			}
		} else {
			cm.sendOk("Pelo menos #bdois#k membros do seu grupo precisam estar aqui!");
		}
	    }
	}
	cm.dispose();
    }
}