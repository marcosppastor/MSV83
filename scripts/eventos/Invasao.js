importPackage(java.lang);

importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);
importPackage(Packages.server.life);

var exitMap;
var instanceId;
var minPlayers = 1;
var mobs = Array(2220000, 3220000, 3220001, 5220000, 9300003, 5220002, 9300012, 5220003, 9300119, 9300039, 6220000, 6130101, 6300005, 6220001, 7220000, 7220001, 7220002, 8220000, 9300140, 8220000, 8220001, 8220002, 8150000, 8150000, 8150000, 8180000, 8180001, 8220003,9500166,9500166,9500165,9500165,9500165,9500164,9500164,9500164,9500164,9500164);

function init() {
	
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup() {
	instanceId = em.getChannelServer().getInstanceId();
	exitMap = em.getChannelServer().getMapFactory().getMap(221000000); //Teh exit map :) <---------t
	var instanceName = "Invasao" + instanceId;

	var eim = em.newInstance(instanceName);
	
	var mf = eim.getMapFactory();
	
	em.getChannelServer().addInstanceId();
	
	var map = eim.getMapInstance(221000000);//wutt
	map.toggleDrops();	// Remove todos os Drops
	var portals = map.getPortals();
	map.removePortals();
	map.toggleHiddenNPC(9201082);////Fuso - Spinder
	map.toggleHiddenNPC(2050011);//Soldado
	map.toggleHiddenNPC(2050008);//General
	map.toggleHiddenNPC(2050009);//Oficial
	map.toggleHiddenNPC(2050010);//Médico
	map.toggleHiddenNPC(2050012);//Agente
	map.toggleHiddenNPC(9010009);//Duey
	map.toggleHiddenNPC(9010000);//Maple Admin
	map.toggleHiddenNPC(9270003);//TV Maple
	map.toggleHiddenNPC(9010010);//Cassandra
	map.toggleHiddenNPC(9000021);//Gaga
	map.toggleHiddenNPC(9000040);//Dallier
	map.toggleHiddenNPC(9000041);//Doações
	map.toggleHiddenNPC(9000036);//Agente E
	map.toggleHiddenNPC(1022101);//Rooney
	map.toggleHiddenNPC(9000017);//Coco
	map.toggleHiddenNPC(2041017);//As de Copas
	map.toggleHiddenNPC(9010022);//Portal Dimensional
	map.spawnNpc(9201082, new java.awt.Point(2295, 127));//Fuso - Spinder
	//Fuck this timer
	em.schedule("timeOut", 60000 * 10);
	em.schedule("broadcastClock", 1500);
	em.schedule("invasion", 2400);
	eim.setProperty("entryTimestamp",System.currentTimeMillis() + (30 * 60000));
	eim.setProperty("mobLvl", "0");
	
	
	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(221000000);
	player.changeMap(map, map.getPortal(0));
	player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock((Long.parseLong(eim.getProperty("entryTimestamp")) - System.currentTimeMillis()) / 1000));
	player.getClient().getSession().write(Packages.tools.MaplePacketCreator.serverNotice(6, "O Setor Omega esta sendo atacado. Mate todos os monstros!"));
	player.getClient().getSession().write(Packages.tools.MaplePacketCreator.musicChange("Bgm14/DragonNest"));
	//THE CLOCK IS SHIT
	//player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(1800));
	//y=2000
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

function invasion(eim, player) {
	var iter = em.getInstances().iterator();
	var times = Math.round(Math.random() * 20);
	while (iter.hasNext()) {
		var eim = iter.next();
		var mf = eim.getMapFactory();
		var map = eim.getMapInstance(221000000);
		var mobId = Integer.parseInt(eim.getProperty("mobLvl"));
		if (mobId > mobs.length) {
			mobId = mobs.length - 1;
		}
		var mobSpawn = mobs[mobId];
		if (mobSpawn < 2220000) {
			mobSpawn = 8140701;
		}
		if (eim.getPlayerCount() > 0) {
			if (map.countMonster(eim.getPlayers().get(0)) < 30) {
				for (var i = 0; i < times && map.countMonster(eim.getPlayers().get(0)) < 30; i++) {
						var mob = Packages.server.life.MapleLifeFactory.getMonster(mobSpawn);
						var overrideStats = new Packages.server.life.MapleMonsterStats();
						overrideStats.setHp(mob.getMaxHp() * 2);
						overrideStats.setExp(mob.getExp() / 3);
						overrideStats.setMp(mob.getMaxMp());
						overrideStats.setRevives(null);
						overrideStats.setFirstAttack(true);
						mob.setOverrideStats(overrideStats);
						mob.setHp(overrideStats.getHp());
						mob.setControllerHasAggro(true);
						mob.setControllerKnowsAboutAggro(true);
						//eim.registerMonster(mob);

						map.spawnMonsterOnGroudBelow(mob, new java.awt.Point(randX(), 100));
				}
				if (Math.random() > 0.4 && mobId < mobs.length) {
					eim.setProperty("mobLvl", mobId + 1);
				}
			}
		}
	}
	em.schedule("invasion", 15000);
}

function randX() {
	var k = 1;
	if (Math.random() > 0.5) {
		k = -1;
	}
	var w = Math.round(Math.random() * 1000);
	return 2299 + k * w;
}