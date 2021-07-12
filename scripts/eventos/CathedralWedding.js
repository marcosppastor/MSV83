/*
 * @Author Jvlaple
 * @Re-coder JavaScriptz 
 *
 * Wedding p/ LeaderMS
 * 
 * Modified by Daghlawi for True MapleStory
 */
importPackage(java.lang);

importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);
importPackage(Packages.tools);

var exitMap;
var altarMap;
var cakeMap;
var areaMap;
var instanceId;
var minPlayers = 1;

function init() {
	exitMap = em.getChannelServer().getMapFactory().getMap(680000500); //Teh exit map :) <---------t
	altarMap = em.getChannelServer().getMapFactory().getMap(680000210); //Teh altar map
	cakeMap = em.getChannelServer().getMapFactory().getMap(680000300); //Teh cake
        areaMap = em.getChannelServer().getMapFactory().getMap(680000400); //Teh hunting

	instanceId = 1;
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup(eim) {
	var instanceName = "CathedralWedding" + instanceId;
        var eim = em.newInstance(instanceName);
        instanceId++;

	var eim = em.newInstance(instanceName);
	
	var mf = eim.getMapFactory();
	
	
	var map = mf.getMap(680000200);//wutt
	//Lets make the clock continue through all maps xD
	em.schedule("playerAltar", 3 * 60000);
	eim.setProperty("hclicked", 0);
	eim.setProperty("wclicked", 0);
	eim.setProperty("entryTimestamp",System.currentTimeMillis() + (3 * 60000));
	
	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(680000200);
	player.changeMap(map, map.getPortal(0));
	player.getClient().getSession().write(MaplePacketCreator.getClock((Long.parseLong(eim.getProperty("entryTimestamp")) - System.currentTimeMillis()) / 1000));
        player.getClient().getSession().write(MaplePacketCreator.serverNotice(6, "Um casamento esta acontecendo agora em Amoria!!"));

}

//lets forget this bullshit...
function playerDead(eim, player) {
}

function playerRevive(eim, player) {
	//how the fuck can this happen? o.O
}

function playerDisconnected(eim, player) {
	playerExit(eim, player);//kick him/her
}

function leftParty(eim, player) {	//this doesnt fucking matter...		
}

function disbandParty(eim) {
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
}

function playerWarpAltar(eim, player) {
	if ((player.getName() != eim.getProperty("husband")) && (player.getName() != eim.getProperty("wife"))){
	player.changeMap(altarMap, altarMap.getPortal(0));
	player.getClient().getSession().write(MaplePacketCreator.getClock(300));
	}else{
	player.changeMap(altarMap, altarMap.getPortal(2));
	player.getClient().getSession().write(MaplePacketCreator.getClock(300));
	player.getClient().getSession().write(MaplePacketCreator.serverNotice(6, "Por favor fale com o Bispo John agora para se casar!"));
	}
}

function playerWarpCake(eim, player) {
	player.changeMap(cakeMap, cakeMap.getPortal(0));
	player.getClient().getSession().write(MaplePacketCreator.getClock(300));
        player.getClient().getSession().write(MaplePacketCreator.serverNotice(6, "Tire fotos e guarde-as de recordação. Ao final do tempo você será levado para outro mapa, pré bonus! !"));

}

function playerWarpArea(eim, player) {
	player.changeMap(areaMap, areaMap.getPortal(0));
	player.getClient().getSession().write(MaplePacketCreator.getClock(150));
        player.getClient().getSession().write(MaplePacketCreator.serverNotice(6, "Recolha 7 chaves e troque-as no NPC para ir para o bônus, o tempo mostrado é para ambos, então quanto antes entregarem as chaves mais tempo terão no bonus!"));

}

function playerAltar(eim, player) {
		var iter = em.getInstances().iterator();
		while (iter.hasNext()) {
		var eim = iter.next();
		if (eim.getPlayerCount() > 0) {
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				playerWarpAltar(eim, pIter.next());
			}
		}
		em.schedule("playerCake", 5 * 60000);
		//eim.dispose();
	}
}

function playerCake(eim, player) {
		var iter = em.getInstances().iterator();
		while (iter.hasNext()) {
		var eim = iter.next();
		if (eim.getPlayerCount() > 0) {
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				playerWarpCake(eim, pIter.next());
			}
		}
		em.schedule("playerArea", eim, 5 * 60000);
		//eim.dispose();
	}
}

function playerArea(eim, player) {
		var iter = em.getInstances().iterator();
		while (iter.hasNext()) {
		var eim = iter.next();
		if (eim.getPlayerCount() > 0) {
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				playerWarpArea(eim, pIter.next());
			}
		}
		em.schedule("timeOut", 5 * 30000);
		//eim.dispose();
	}
}

//Those offline cuntts
function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) {
	//Wedding? IDK about gifts o.O
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


function dispose() {
    em.cancelSchedule();
}