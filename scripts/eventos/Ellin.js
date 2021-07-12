var minPlayers = 2;
var exitMap;

function init() {
em.setProperty("state", "0");
	em.setProperty("leader", "true");
}

function setup(level, leaderid) {
em.setProperty("state", "1");
	em.setProperty("leader", "true");
    var eim = em.newInstance("Ellin" + leaderid);
exitMap = em.getChannelServer().getMapFactory().getMap(930000800);
        eim.setInstanceMap(930000000);
	eim.setInstanceMap(930000100);
	eim.setInstanceMap(930000200);
	eim.setInstanceMap(930000300);
	eim.setInstanceMap(930000400);;
	var map = eim.setInstanceMap(930000500);
	map.shuffleReactors();
	eim.setInstanceMap(930000600);
	eim.setInstanceMap(930000700);

    eim.startEventTimer(1200000); //20 mins
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
    //player.tryPartyQuest(1206);
}

function playerRevive(eim, player) {
}

function scheduledTimeout(eim) {
    end(eim);
}

function changedMap(eim, player, mapid) {
    if (mapid < 930000000 || mapid > 930000700) {
	eim.unregisterPlayer(player);

	if (eim.dispose()) {
		em.setProperty("state", "0");
		em.setProperty("leader", "true");
	}
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function monsterValue(eim, mobId) {
    return 1;
}

function disbandParty(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
    em.setProperty("state", "0");
}



function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
        if (eim.getPlayerCount() == 0) {
	em.setProperty("state", "0");
     }
}
function end(eim) {
    eim.dispose();
	em.setProperty("state", "0");
		em.setProperty("leader", "true");
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
        if (eim.getPlayerCount() == 0) {
	 em.setProperty("state", "0");
     }
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
}

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


function playerDead(eim, player) {}
function cancelSchedule() {}