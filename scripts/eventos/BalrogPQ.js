/*
 * @author Marcos D
 * BalrogPQ
 * TrueMS - 2017
 * truems.net.br/
*/


importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);
importPackage(Packages.server.life);

var exitMap;
var flagmap;
var instanceId;
var minPlayers = 1;

function init() {
	instanceId = 1;
	em.setProperty("BalrogPQpen", "true");
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup(eim) {
	em.setProperty("BalrogPQpen", "false")
	var instanceName = "BalrogPQ" + instanceId;
	var eim = em.newInstance(instanceName);
	eim.setProperty("stage", "0");
	instanceId = em.getChannelServer().getInstanceId();
	exitMap = em.getChannelServer().getMapFactory().getMap(541010100);
    flagmap = em.getChannelServer().getMapFactory().getMap(105100300); // Mapa de início para PQ + Instância.
	exitMap2 = em.getChannelServer().getMapFactory().getMap(541010100);
	var mf = eim.getMapFactory();
	em.getChannelServer().addInstanceId();
	var map = mf.getMap(105100300); // Mapa de início para PQ + Instância.
	//map.toggleHiddenNPC(2030006);
	//map.spawnNpc(2001000, new java.awt.Point(323, 99));//Cliff
	//map.removePortals();
	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(105100300); // Mapa de início para PQ + Instância.
	player.changeMap(map, map.getPortal(0));
	map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(6, "[Aten��o] O poderoso Lord Balrog apareceu!"));
	map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(5, "[Aviso] Para sair da Expedi��o, basta falar com o NPC Mu Young,covarde!."));
	eim.schedule("monsterSpawn", 15);
	player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(15));
}

function monsterSpawn(eim, player) {
    	//eim.schedule("tempoRestante", 60 * 60);
        //player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(60*60));


    var mf = eim.getMapFactory();
	var bossmap = mf.getMap(105100300); // Mapa de início para PQ + Instância.
	//bossmap.removePortals();
	bossmap.killAllMonsters(false);
	var mob = Packages.server.life.MapleLifeFactory.getMonster(8830000);//CORPO
        var mob1 = Packages.server.life.MapleLifeFactory.getMonster(8830001);//BRACO <
        var mob2 = Packages.server.life.MapleLifeFactory.getMonster(8830002);//BRACO >


	//var overrideStats = new Packages.server.life.MapleMonsterStats();
	//overrideStats.setHp(750);
	//overrideStats.setMp(mob.getMaxMp());
	//mob.setOverrideStats(overrideStats);
	//mob.setHp(overrideStats.getHp());
	//eim.registerMonster(mob);

	bossmap.spawnMonsterOnGroudBelow(mob, new java.awt.Point(412, 258));
        bossmap.spawnMonsterOnGroudBelow(mob1, new java.awt.Point(350, 100));
        bossmap.spawnMonsterOnGroudBelow(mob2, new java.awt.Point(500, 100));


}

function playerDead(eim, player) {
  if (player.getMap().hasTimer() == false) {
    player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(600));
   //  player.getMap().setTimer(true);
  }
}

function playerRevive(eim, player) {
	if (eim.isLeader(player)) { 
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim, party.get(i));
		}
		eim.dispose2();
	}
	else {
		var party = eim.getPlayers();
		if (party.size() <= minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			eim.dispose2();
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
		eim.dispose2();
	}
	else { 
		var party = eim.getPlayers();
		if (party.size() < minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			eim.dispose2();
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
		eim.dispose2();
	}
	else
		playerExit(eim, player);
}

function disbandParty(eim) {
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose2();
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
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
	eim.dispose2();
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
		eim.dispose2();
	}
}
