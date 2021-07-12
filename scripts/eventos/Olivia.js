var minPlayers = 1;
var exitMap;

function init() {
}

function setup(mapid) {

    var eim = em.newInstance("Olivia" + mapid);
	exitMap = em.getChannelServer().getMapFactory().getMap(682000000 );
	eim.setProperty("stage", "0");
	eim.setProperty("mode", mapid);
    var map = eim.setInstanceMap(682010100 + (parseInt(mapid)));
	map.getPortal(2).setScriptName("oliviaOut");

    eim.startEventTimer(600000);
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
     map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(6, "[Halloween] Seu inimigo sera invocado apenas após clicar no espelho das sombras."));
     
}

function changedMap(eim, player, mapid) {
    if (mapid != 682010100 && mapid != 682010101 && mapid != 682010102) {
	playerExit(eim,player);
    }
}

function playerDisconnected(eim, player) {
     return 0;

}
function scheduledTimeout(eim) {
	end(eim);
}

function monsterValue(eim, mobId) {
    return 1;
}

    
function allMonstersDead(eim) {
}

function end(eim) {
    eim.dispose();
	em.setProperty("state", "0");
		em.setProperty("leader", "true");

}

function playerRevive(eim, player) {
    return false;
}

function clearPQ(eim) {}
function leftParty (eim, player) {
    
	// If only 5 players are left, uncompletable:
	var party = eim.getPlayers();
	if (party.size() <= minPlayers) {
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim,party.get(i));
		}
		eim.dispose();
	}
	else
		playerExit(eim, player);
            
}

function disbandParty (eim) {
    
    var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}
function playerDead(eim, player) {}
function cancelSchedule() {}

function timeOut() {
	var iter = em.getInstances().iterator();
	while (iter.hasNext()) {
		var eim = iter.next();
		if (eim.getPlayerCount() > 0) {
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				playerExit(eim, pIter.next());
			}
		}
		eim.dispose();
                em.setProperty("state", "0");
	}
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
        if (eim.getPlayerCount() == 0) {
	 em.setProperty("state", "0");
     }
}