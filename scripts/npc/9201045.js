/**
 *9201045.js - Amos in stage 5, 6 and 7
 *@author Jvlaple
 *For Jvlaple's APQ
 */
 
importPackage(Packages.tools);
importPackage(Packages.server.life);
importPackage(java.awt);

var status;
var curMap;
var playerStatus;
var chatState;
var party;
var preamble;
var Grog = 9400536;

function start() {
	status = -1;
	mapId = cm.getChar().getMapId();
	if (mapId == 670010500)
		curMap = 4;
	else if (mapId == 670010600)
		curMap = 5;
	else if (mapId == 670010700)
		curMap = 6;
	playerStatus = cm.isLeader();
	preamble = null;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (curMap == 4) {
			if (playerStatus) {
				if (status == 0) {
					var eim = cm.getChar().getEventInstance();
					party = eim.getPlayers();
					preamble = eim.getProperty("leader5thpreamble");
					if (preamble == null) {
						cm.sendNext("Olá e bem vindo ao 5o estágio. Há alguns #bCavaleiros de Troia, Macacos Zumbi e Olhos Maldito#k. Você devera derrotar estes monstros e coletar 50 #bParte do Codigo do Cupido#k (#i4031597#).\r\nBoa sorte!");
						eim.setProperty("leader5thpreamble","done");
						cm.dispose();
					}
					else {
						var complete = eim.getProperty(curMap.toString() + "stageclear");
							if (complete != null) {
								cm.sendNext("#h #, não deseja continuar? O portal já esta aberto!");
								cm.dispose();
							} else {
								if (cm.haveItem(4031597, 50) == false) {
									cm.sendNext("Lamento, mas você não coletou os items exigidos.\r\nPreciso de: #e50 #bParte do Codigo do Cupido#k (#i4031597#)");
									cm.dispose();
								}
								else {
									cm.sendNext("Parabéns por concluir o 5o estágio!\r\nApresse-se, pois o portal já está aberto.");
									clear(4,eim,cm);
									cm.givePartyExp(18000, party);
									cm.gainItem(4031597, -50);
									cm.dispose();
								}
						}
					}
				}
			}
			else { // non leader
				var eim = cm.getChar().getEventInstance();
				pstring = "member5thpreamble" + cm.getChar().getId().toString();
				preamble = eim.getProperty(pstring);
				if (status == 0 && preamble == null) {
					var qstring = "member5th" + cm.getChar().getId().toString();
					var question = eim.getProperty(qstring);
					if (question == null) {
						qstring = "FUCK";
					}
					cm.sendNext("Olá, bem vindo ao primeiro estágio.\r\nNeste, voce devera derrotar todos os monstros e apos isso, falar com o meu amigo #bHomem Cintilante#k para derrotar uma fada e entregar o item que preciso.");
				}
				else if (status == 0) {// otherwise
					// check for stage completed
					var complete = eim.getProperty(curMap.toString() + "stageclear");
					if (complete != null) {
						cm.warp(670010300, 0);
						cm.dispose();
					} else {
					cm.sendOk("Fale comigo apois concluir esta missão!");
					cm.dispose();
					}
				}
				else if (status == 1) {
					if (preamble == null) {
						cm.sendOk("Ok. Boa sorte para você!");
						cm.dispose();
					}
					else { // shouldn't happen, if it does then just dispose
						cm.dispose();
					}
						
				}
				else if (status == 2) { // preamble completed
					eim.setProperty(pstring,"done");
					cm.dispose();
				}
				else { // shouldn't happen, but still...
					eim.setProperty(pstring,"done"); // just to be sure
					cm.dispose();
				}
			}
		} else if (curMap == 5) {
			var eim = cm.getPlayer().getEventInstance();
			var party = eim.getPlayers();
			var mf = eim.getMapFactory();
			var map = mf.getMap(670010700);
			if (playerStatus) {
				if (status == 0) {
					cm.sendNext("Parabens! Voce conseguiu!!!");
				} else if (status == 1) {
					for (var i = 0; i < party.size(); i++) {
						party.get(i).changeMap(map, map.getPortal(0));
					}
					cm.dispose();
				}
			} else {
				cm.sendNext("Somente o lider do grupo pode falar comigo.");
				cm.dispose();
			}
		} else if (curMap == 6) {
			var eim = cm.getPlayer().getEventInstance();
			var party = eim.getPlayers();
			var mf = eim.getMapFactory();
			var map = mf.getMap(670010700);
			if (playerStatus) {
				if (eim.getProperty("rogSpawned") == null) {
					if (status == 0) {
						cm.sendNext("Esta é a sua missão final!\r\nPor favor, derrote o terrivel Balrog e me entregue uma\r\n#ePresa Espectral (#i4031594#)!\r\nBoa sorte.");
					}else if (status == 1) {
						cm.spawnMonster(Grog, 953, 570);
						for (var i = 0; i < party.size(); i++) {
							party.get(i).changeMap(map, map.getPortal(2));
						}
						eim.setProperty("rogSpawned", "yes");
						cm.dispose();
					}
				} else {
					if (status == 0) {
						if (cm.haveItem(4031594, 1)) {
							cm.sendNext("Você concluiu o desafio da #bAmoriaPQ#k\r\nParabéns!");
						} else {
							cm.sendNext("Por favor, derrote o Balrog e me entregue uma #ePresa Espectral (#i4031594#).");
							cm.dispose();
						}
					} else if (status == 1) {
						var eim = cm.getPlayer().getEventInstance();
						cm.gainItem(4031594, -1);
						eim.finishPQ();
						cm.dispose();
					}
				}
			}
		}
	}
}

function clear(stage, eim, cm) {
	eim.setProperty(stage.toString() + "stageclear","true");
	var packetef = MaplePacketCreator.showEffect("quest/party/clear");
	var packetsnd = MaplePacketCreator.playSound("Party1/Clear");
	var packetglow = MaplePacketCreator.environmentChange("gate",2);
	var map = eim.getMapInstance(cm.getChar().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
	map.broadcastMessage(packetglow);
	var mf = eim.getMapFactory();
	map = mf.getMap(670010200 + stage * 100);
	//eim.addMapInstance(670010200 + stage,map);
	//cm.givePartyExp(2, party);
	//cm.mapMessage("Clear!");
	//var nextStage = eim.getMapInstance(670010200 + stage*100);
	//var portal = nextStage.getPortal("in00");
	//if (portal != null) {
		//portal.setScriptName("hontale_BtoB1");
		//map.broadcastMessage(packetglow);
	//}
	//else { // into final stage
		//cm.sendNext("Initiating final stage monsters...");
		// spawn monsters
		//var map = eim.getMapInstance(103000804);
		//map.spawnMonsters(monsterIds);
	//}
}