
var exitMap;
var minPlayers = 1;
 
importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);
importPackage(java.lang);

function init() {
        em.setProperty("shuffleReactors","false");
        em.setProperty("state", "0");

}

function setup(eim) {
	exitMap = em.getChannelServer().getMapFactory().getMap(240050400 );
	if (exitMap == null) 
		debug(eim,"O mapa de saída não foi corretamente vinculado.");
	eim.setProperty("canEnter","true");
       	em.setProperty("state","1");

}

function playerEntry(eim,player) {
	var map = eim.getMapInstance(240060200); // Last Mission: Zakum's Altar
	player.changeMap(map,map.getPortal(0));
	if (exitMap == null)
		debug(eim,"O mapa de saída não foi corretamente vinculado.");
}

function playerRevive(eim,player) {
	eim.unregisterPlayer(player);
        player.changeMap(exitMap, exitMap.getPortal(0));

    if (eim.getPlayerCount() < 1) {
       em.setProperty("state", "0");
	eim.dispose();

    }

        }

function playerDead(eim,player) {
}

function playerDisconnected(eim,player) {
	return 0;
}

function monsterValue(eim,mobId) { // potentially display time of death? does not seem to work
	if (mobId == 8810018) { // 3rd body
		var party = eim.getPlayers();
		var iter = party.iterator();
		while (iter.hasNext()) {
			var pl = iter.next();
			pl.getClient().getSession().write(Packages.tools.MaplePacketCreator.serverNotice(6,"Parabéns por derrotar o grande HornTail!"));
		}
	}
	return -1;
}

function leftParty(eim,player) { // do nothing in Zakum
}
function disbandParty(eim) { // do nothing in Zakum
}

function playerExit(eim,player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));

    if (eim.getPlayerCount() < 1) {
	 em.setProperty("state", "0");
	eim.dispose();

    }

        }
function end(eim,msg) {
        var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
                var player = iter.next();
                player.getClient().getSession().write(Packages.tools.MaplePacketCreator.serverNotice(6,msg));
		eim.unregisterPlayer(player);
		if (player != null)
                	player.changeMap(exitMap, exitMap.getPortal(0));
	}
	eim.dispose();
}

// for offline folk
function removePlayer(eim,player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) { // kinda a hack, this is used as the exit routine
	end(eim,"À medida que o som da batalha desaparece, você se sente estranhamente insatisfeito.");
}

function finish(eim) {
        var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
		var player = iter.next();
		eim.unregisterPlayer(player);
                player.changeMap(exitMap, exitMap.getPortal(0));
	}
	eim.dispose();
}

function allMonstersDead(eim) { // nothing normally done with altar here
}

function cancelSchedule() { // no
}

function timeOut() { // possibly useful
}

function debug(eim,msg) {
        var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
 		var player = iter.next();
 		player.getClient().getSession().write(Packages.tools.MaplePacketCreator.serverNotice(6,msg));
	}
}

function cancelSchedule() {
}

function dispose() {
    em.cancelSchedule();
    em.setProperty("state", "0");
}