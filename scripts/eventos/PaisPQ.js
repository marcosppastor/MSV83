 importPackage(java.lang);

importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);
importPackage(Packages.server.life);

var exitMap;
var instanceId;
var minPlayers = 1;
//var mobs = Array(,9500165,9500164,9500164,9500164,9500164,9500164);

function init() {
	
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup(eim) {
	em.setProperty("PaisPQOpen", "false")
	var instanceName = "PaisPQ" + instanceId;
	var eim = em.newInstance(instanceName);
	eim.setProperty("stage", "0");
	instanceId = em.getChannelServer().getInstanceId();
	exitMap = em.getChannelServer().getMapFactory().getMap(100000000);
    flagmap = em.getChannelServer().getMapFactory().getMap(300000010); // Mapa de início para PQ + Instância.
	exitMap2 = em.getChannelServer().getMapFactory().getMap(100000000);
	var mf = eim.getMapFactory();
	em.getChannelServer().addInstanceId();
	var map = mf.getMap(300000010); // Mapa de início para PQ + Instância.
	map.removePortals();
        map.toggleHiddenNPC(2131000);//atena

        
	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(300000010); // Mapa de início para PQ + Instância.
	player.changeMap(map, map.getPortal(0));
	map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(6, "[Evento] Seu inimigo irá aparecer se prepare para batalhar!: 15 segundos."));
	eim.schedule("monsterSpawn", 15000);
	player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(15));
      	player.getClient().getSession().write(Packages.tools.MaplePacketCreator.musicChange("Bgm14/DragonNest"));

}

function monsterSpawn(eim, player) {
    var mf = eim.getMapFactory();
	var bossmap = mf.getMap(300000010); // Mapa de início para PQ + Instância.
	bossmap.removePortals();
	bossmap.killAllMonsters(false);
	var mob = Packages.server.life.MapleLifeFactory.getMonster(9500337 );
	var overrideStats = new Packages.server.life.MapleMonsterStats();
	overrideStats.setHp(250000);
	overrideStats.setExp(50000);
	overrideStats.setMp(mob.getMaxMp());
        //overrideStats.setDrop(4001302);
	mob.setOverrideStats(overrideStats);
	mob.setHp(overrideStats.getHp());
        eim.registerMonster(mob);
	bossmap.spawnMonsterOnGroudBelow(mob, new java.awt.Point(327, 232));
      	bossmap.spawnNpc(2010000, new java.awt.Point(327,232));//Monóculo

        //player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(600*10));
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
	player.changeMap(exitMap, exitMap.getPortal(0));
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
	player.getMap().setTimer(true);
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

function invasion(eim, player) {
	
}
