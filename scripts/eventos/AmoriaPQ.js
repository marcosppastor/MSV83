importPackage(java.lang);
importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);

var exitMap;
var instanceId;
var minPlayers = 1;

function init() {
	instanceId = 1;
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup(eim) {
	instanceId = em.getChannelServer().getInstanceId();
	exitMap = em.getChannelServer().getMapFactory().getMap(670011000); //Exit
	var instanceName = "AmoriaPQ" + instanceId;

	var eim = em.newInstance(instanceName);
	
	var mf = eim.getMapFactory();
	
	em.getChannelServer().addInstanceId();
	var map = mf.getMap(670010200);//wutt
	//map.shuffleReactors();
	// eim.addMapInstance(670010200,map);
	//var firstPortal = eim.getMapInstance(670010200).getPortal("in00");
	//firstPortal.setScriptName("hontale_BtoB1");
	//Fuck this timer
	//eim.setProperty("bulbWay", 0);
	em.schedule("broadcastClock", 1500);
	eim.setProperty("entryTimestamp",System.currentTimeMillis() + (60 * 60000));
	em.schedule("timeOut", 60 * 60000);
	var fMap = mf.getMap(670010200);
	var sMap = mf.getMap(670010300);
	var hardMap = mf.getMap(670010400);
	var easyMap = mf.getMap(670010500);
	fMap.getPortal(15).setScriptName("male00");
	fMap.getPortal(16).setScriptName("female00");
	var trapMap = mf.getMap(670010600);
	eim.setProperty("openedDoors", "0");
	sMap.getPortal(8).setScriptName("apq_door_3");
	hardMap.getPortal(2).setScriptName("apq_door_4");
	easyMap.getPortal(2).setScriptName("apq_door_5");
	
	return eim;
}

function playerEntry(eim, player) {
    	var eventTime = 60 * (1000 * 60); // 30 mins.
	var map = eim.getMapInstance(670010200);
	player.changeMap(map, map.getPortal(0));
        eim.startEventTimer(eventTime); // Sends a clock packet and tags a timer to the players.
	player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(3600));
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
	if (eim.isLeader(player)) { //check for party leader
		//boot whole party and end
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim, party.get(i));
		}
		eim.dispose();
	}
	else { //boot dead player
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
}

function playerDisconnected(eim, player) {
	if (eim.isLeader(player)) { //check for party leader
		//PWN THE PARTY (KICK OUT)
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).equals(player)) {
				removePlayer(eim, player);
			}			
			else {
				playerExit(eim, party.get(i));
			}
		}
		eim.dispose();
	}
	else { //KICK THE D/CED CUNT
		// If only 5 players are left, uncompletable:
		var party = eim.getPlayers();
		if (party.size() < minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			eim.dispose();
		}
		else
			playerExit(eim, player);
	}
}

function leftParty(eim, player) {			
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

function disbandParty(eim) {
	//boot whole party and end
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	var exitMap1 = em.getChannelServer().getMapFactory().getMap(670011000);
	player.changeMap(exitMap1, exitMap1.getPortal(0));
}

//Those offline cuntts
function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) {
	//HTPQ does nothing special with winners
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}

function allMonstersDead(eim) {
        //Open Portal? o.O
}

function cancelSchedule() {
}

function clearPQ(eim) {
	// W00t! Bonus!!
	var iter = eim.getPlayers().iterator();
        var bonusMap = eim.getMapInstance(670010800);
        while (iter.hasNext()) {
			var player = iter.next();
			player.changeMap(bonusMap, bonusMap.getPortal(0));
			eim.setProperty("entryTimestamp",System.currentTimeMillis() + (2 * 60000));
	        player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(120));
		}
        eim.schedule("finish", 120000)
}

function finish(eim) {
		var dMap = eim.getMapInstance(670011000);
        var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
			var player = iter.next();
			eim.unregisterPlayer(player);
	        player.changeMap(dMap, dMap.getPortal(0));
		}
	eim.dispose();
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
	}
}

function playerClocks(eim, player) {
  if (player.getMap().hasTimer() == false){
	player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock((Long.parseLong(eim.getProperty("entryTimestamp")) - System.currentTimeMillis()) / 1000));
	//player.getMap().setTimer(true);
	}
}

function playerTimer(eim, player) {
	if (player.getMap().hasTimer() == false) {
		player.getMap().setTimer(true);
	}
}

function broadcastClock(eim, player) {
	//var party = eim.getPlayers();
	var iter = em.getInstances().iterator();
	while (iter.hasNext()) {
		var eim = iter.next();
		if (eim.getPlayerCount() > 0) {
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				playerClocks(eim, pIter.next());
			}
		}
		//em.schedule("broadcastClock", 1600);
	}
	// for (var kkl = 0; kkl < party.size(); kkl++) {
		// party.get(kkl).getMap().setTimer(true);
	// }
	var iterr = em.getInstances().iterator();
	while (iterr.hasNext()) {
		var eim = iterr.next();
		if (eim.getPlayerCount() > 0) {
			var pIterr = eim.getPlayers().iterator();
			while (pIterr.hasNext()) {
				//playerClocks(eim, pIter.next());
				playerTimer(eim, pIterr.next());
			}
		}
		//em.schedule("broadcastClock", 1600);
	}
	em.schedule("broadcastClock", 1600);
}