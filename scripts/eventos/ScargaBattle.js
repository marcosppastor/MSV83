/* 
 * This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * @Author Stereo
 * 
 * Zakum Battle 
 */
 
importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);
importPackage(java.lang);

var exitMap;
var minPlayers = 1;
var pqTime = 10;//10 Minutes

function init() {
        em.setProperty("shuffleReactors","false");
}

function setup(eim) {
	exitMap = em.getChannelServer().getMapFactory().getMap(551030100);
	if (exitMap == null) 
	debug(eim,"The exit map was not properly linked.")
    var timer = 1000 * 60 * pqTime; // 10 minutes
	em.schedule("timeOut", 10 * 60000 + 10000); //10 min + Extra 10 secs like on Global.
	eim.setProperty("canEnter","true");
    eim.setProperty("entryTimestamp",System.currentTimeMillis());
}

function playerEntry(eim,player) {
	var map = eim.getMapInstance(551030200); // Mapa do Scar/Targa
	player.changeMap(map,map.getPortal(0));
	if (exitMap == null)
		debug(eim,"The exit map was not properly linked.");
}

function playerRevive(eim,player) {
	player.setHp(1000);
	player.setStance(0);
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
	var party = eim.getPlayers();
	if (party.size() < minPlayers) {
		end(eim,"Nao ha jogadores suficientes. A batalha acabou.");
	}
	return false;
}

function playerDead(eim,player) {
}

function playerDisconnected(eim,player) {
	var party = eim.getPlayers();
	if (player.getName().equals(eim.getProperty("leader"))) {
		var iter = party.iterator();
		while (iter.hasNext()) {
			var pl = iter.next();
			pl.getClient().getSession().write(Packages.tools.MaplePacketCreator.serverNotice(6,"O lider da instancia saiu do jogo."));
		}
	}
	if (party.size() < minPlayers) {
		end(eim,"Nao ha jogadores suficientes. A batalha acabou.");
	}
}

function monsterValue(eim,mobId) {
	if (mobId == 9420549 || mobId == 9420544) { // 3Âº corpo
		var party = eim.getPlayers();
		var iter = party.iterator();
		while (iter.hasNext()) {
			var pl = iter.next();
			pl.getClient().getSession().write(Packages.tools.MaplePacketCreator.serverNotice(6,"Bravos guerreiros acabam de derrotar o Furioso Targa/Scarlion"));
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
	player.changeMap(exitMap,exitMap.getPortal(0));
        var party = eim.getPlayers();
        if (party.size() < minPlayers) { //not enough after someone left
                end(eim,"Já não há jogadores suficientes para continuar, e os restantes devem ser retirados.");
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

function allMonstersDead(eim) { 
}

function cancelSchedule() {
}

function timeOut() {
}

function debug(eim,msg) {
        var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
 		var player = iter.next();
 		player.getClient().getSession().write(Packages.tools.MaplePacketCreator.serverNotice(6,msg));
	}
}

function dispose() {

}