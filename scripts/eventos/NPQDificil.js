/*
 * @Author JavaScriptz
 * JS-Maple 2015
 * Natal Party Quest
 */


importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.life);
importPackage(Packages.server.maps);
importPackage(Packages.tools);
importPackage(java.lang);


var PQMap3;
var mapaSaida;
var mapaInicial;
var instanceId;
var minPlayers = 1;
var HPSnow = 15000;

function init() {
    mapaSaida = em.getChannelServer().getMapFactory().getMap(889100022); 
    mapaInicial = em.getChannelServer().getMapFactory().getMap(889100021); // <main>
    em.setProperty("state", "0");
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup(eim) {
        em.setProperty("state", "1");
	instanceId = em.getChannelServer().getInstanceId();
	var instanceName = "NPQ_" + instanceId;
	var eim = em.newInstance(instanceName);
	var mf = eim.getMapFactory();
	em.getChannelServer().addInstanceId();
	var map = mf.getMap(889100021);
	em.setProperty("shouldDrop", "true");
        eim.setProperty("respawn", "true");
        eim.setProperty("stage", "0");
        var eventTime = 10 * 60000;
        em.schedule("timeOut", eim, eventTime);
        map.killAllMonsters(false);
        var snownman = MapleLifeFactory.getMonster(9500319 );
        map.spawnMonsterOnGroundBelow(snownman, new java.awt.Point(-189, 30)); 
        eim.registerMonster(snownman);
        eim.startEventTimer(eventTime);
        respawn(eim);
	return eim;
	
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(mapaInicial.getId());
    player.changeMap(map, map.getPortal(0));
    var texto = "Hahaha, que bom que você veio. Me ajude a proteger o Snowman's das ameaças e no final te deixarei escolher sua recompensa. O que você precisa fazer e não deixar que os outros monstros atingam o Boneco de Neve para que ele possa ganhar mais HP e crescer rapidamente para o Natal. O Boneco de Neve dessa fase tem o HP inicial de #e" + HPSnow + "#n você precisa protege-lo ate ele atingir o dobro de seu HP normal, boa sorte!";
    player.getClient().getSession().write(MaplePacketCreator.getNPCTalk(9105004, /*(byte)*/ 0, texto, "00 00"));
}

function respawn(eim) {	
        var map = eim.getMapInstance(889100021);
        if(!eim.getProperty("respawn").equals("false")) {
	    map.respawn();
         }
	eim.schedule("respawn", 13000);
}

function SnowMan2(eim) {  
        var map = eim.getMapInstance(889100021);
        var react = map.getReactorByName("snow01");
        map.killAllMonsters(false);
        react.forceHitReactor(react.getState() + 1);
        eim.setProperty("respawn", "false");
        eim.schedule("spawnTylus", 3000);
}

function spawnTylus(eim) {
    /* Tylus */
        eim.setProperty("stage", "1");
        var map = eim.getMapInstance(889100021);
        var tylus = MapleLifeFactory.getMonster(9400321);
        map.spawnMonsterOnGroundBelow(tylus, new java.awt.Point(-189, 30)); 
        eim.registerMonster(tylus);
}
  
function playerDead(eim, player) {
    if (player.isAlive()) {
        if (eim.isLeader(player)) {
            var party = eim.getPlayers();
            for (var i = 0; i < party.size(); i++)
                playerExit(eim, party.get(i));
            eim.dispose();
        } else {
            var partyz = eim.getPlayers();
            if (partyz.size() < minPlayers) {
                for (var j = 0; j < partyz.size(); j++)
                    playerExit(eim,partyz.get(j));
                eim.dispose();
            } else
                playerExit(eim, player);
        }
    }
}

function playerRevive(eim, player) {
}

function playerDisconnected(eim, player) {
    if (eim.isLeader(player)) {
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++) {
            if (party.get(i).equals(player)) {
                removePlayer(eim, player);
            } else {
                playerExit(eim, party.get(i));
            }
        }
        eim.dispose();
    } else {
        var partyz = eim.getPlayers();
        if (partyz.size() < minPlayers) {
            for (var j = 0; j < partyz.size(); j++) {
                playerExit(eim,partyz.get(j));
			}
            eim.dispose();
        } else {
            playerExit(eim, player);
	}
    }
}



function leftParty(eim, player) {
    var party = eim.getPlayers();
    if (party.size() < minPlayers) {
        for (var i = 0; i < party.size(); i++)
            playerExit(eim,party.get(i));
        eim.dispose();
    } else
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
    player.changeMap(mapaSaida, mapaSaida.getPortal(0));
}

function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(mapaSaida);
}

function clearPQ(eim) {
}

function liberaEntrada(eim) {
}

function finish(eim) {
}

function allMonstersDead(eim) {
}

function cancelSchedule() {
}

function dispose() {
    em.cancelSchedule();
}


function timeOut(eim) {
    if (eim != null) {
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext())
                playerExit(eim, pIter.next());
        }
        eim.dispose();
    }
}

