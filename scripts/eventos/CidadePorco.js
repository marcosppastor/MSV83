/*
Cidade dos Porcos.js
*Author Jvlaple*
Melhorado e adaptado por Marcos Paulo
OrbisMS v0.7 - 2015
www.Orbisms.net/
*/

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
	exitMap = em.getChannelServer().getMapFactory().getMap(910010400);
	var instanceName = "CidadePorco" + instanceId;

	var eim = em.newInstance(instanceName);
	respawn(eim);
	var mf = eim.getMapFactory();
	
	em.getChannelServer().addInstanceId();
	
	var map = mf.getMap(910010200);
	//map.shuffleReactors();
	// eim.addMapInstance(910010200,map);
	//var firstPortal = eim.getMapInstance(910010200).getPortal("in00");
	//firstPortal.setScriptName("hontale_BtoB1");
	//Fuck this timer
	//eim.setProperty("bulbWay", 0);
	em.schedule("timeOut", 3 * 60000);
	
	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(910010200);
	player.changeMap(map, map.getPortal(0));
	player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(300));
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
	if (eim.isLeader(player)) {
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim, party.get(i));
		}
		eim.dispose();
	}
	else {
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
	if (eim.isLeader(player)) {
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
	else {
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
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
}

function respawn(eim) {	
	var map = eim.getMapInstance(910010200);
	if (map.getSummonState()) {	//Map spawns are set to true by default
		map.instanceMapRespawn();
	}
		eim.schedule("respawn", 10000);
}

function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) {
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}

function allMonstersDead(eim) {
}

function cancelSchedule() {
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
