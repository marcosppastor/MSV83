/*2094002.js [Guon in PPQ(Pirate PQ)]
 *@author Jvlaple
 */
 
importPackage(Packages.tools);
importPackage(Packages.server.life);
importPackage(java.awt);

var status;
var curMap;
var playerStatus;
var chatState;
//var party;
var preamble;
var PQItems = new Array(4001117, 4001120, 4001121, 4001122);


			

function start() {
	status = -1;
	mapId = cm.getChar().getMapId();
	if (mapId == 925100100) //Through head of ship...
		curMap = 1;
	else if (mapId == 925100200) //Through Deck Ip
		curMap = 2;
	else if (mapId == 925100300)//Through Deck II
		curMap = 3;
	else if (mapId == 925100400)//Eliminate Pirates
		curMap = 4;
	else if (mapId == 925100500)//The Captains Dignity
		curMap = 5;
	// else if (mapId == 920010500)//SR
		// curMap = 6;
	// else if (mapId == 920010600)//Lounge
		// curMap = 7;
	// else if (mapId == 920010700)//On the way up
		// curMap = 8;
	// else if (mapId == 920010800)//Garden
		// curMap = 9;
	// else if (mapId == 920011000)//Room of Darkness
		// curMap = 11;
	else if (mapId == 925100700) //Exit
		curMap = 999;
	if (cm.getParty() != null) //Check for Party
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
		if (curMap == 1) { //First Stage
			if (playerStatus) { //Is leader
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				premable = eim.getProperty("leader1stpremable");
				if (premable == null) {
					cm.sendNext("Aqui está a parte de trás do navio pirata. Você trabalhará no seu caminho para a frente e salvará Wu-Yang para mim. Vê os Piratas aqui? Mate-os e me dê 20 marcas de cada. Existem três tipos de Marcas. Estes piratas não são os mesmos que os que estão fora do navio, então tenha cuidado ");
					eim.setProperty("leader1stpremable", "done");
					cm.dispose();
				} else {
						var complete = eim.getProperty("1stageclear");
						if (complete != null) {
							cm.sendNext("Por favor,passe pelo portal!");
							cm.dispose();
						}else if (cm.haveItem(4001120, 20) && cm.haveItem(4001121, 20) && cm.haveItem(4001122, 20)) {
							cm.sendNext("Obrigado por me trazer 20 de cada Marca. Você pode prosseguir agora!");
							cm.gainItem(4001120, -20);
							cm.gainItem(4001121, -20);
							cm.gainItem(4001122, -20);
							//cm.gainItem(4001044, 1);
							cm.givePartyExp(5000, party);
							clear(1, eim, cm);
							cm.dispose();
						} else {
							cm.sendNext("Você não possui 20 de cada  #bMarca do Pirata.#k .");
							cm.dispose();
					}
				}
				cm.dispose();
			} else {
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				if (eim.getProperty(curMap.toString() + "stageclear") == null) {
					cm.sendNext("Aqui está a parte de trás do navio pirata. Você trabalhará no seu caminho para a frente e salvará Wu-Yang para mim. Vê os Piratas aqui? Mate-os e me dê 20 marcas de cada. Existem três tipos de Marcas. Estes piratas não são os mesmos que os que estão fora do navio, então tenha cuidado ");
					cm.dispose();
				} else {
							cm.sendNext("Por favor,passe pelo portal!");
					cm.dispose();
				}
			}
		} else if (curMap == 2 || curMap == 3) {
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				cm.sendOk("Este é o armazenamento do navio pirata. Quebre as caixas, mate todos os monstros e continue pelo portal.");
				cm.dispose();
		} else if (curMap == 4) { //2nd to last stage! w00t!!!
			if (playerStatus) { //Is leader
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				var thisMap = mf.getMap(925100400);
				premable = eim.getProperty("leader4thpremable");
				if (premable == null) {
					cm.sendNext("Por aqui, é o lugar onde os piratas de alto escalão tentam escapar. Eles bloqueiam sua passagem. Mate-os, e ocasionalmente eles podem sair da sua frente.Depois de matar todos fale comigo e você pode prosseguir. Mais uma vez, esses Piratas não são os mesmos que estão fora do navio, então fique atento ~");
					eim.setProperty("leader4thpremable", "done");
					cm.dispose();
				} else {
						var thisMap = mf.getMap(925100400);
						var complete = eim.getProperty("4stageclear");
						if (complete != null) {
							cm.sendNext("Por favor,passe pelo portal!");
							cm.dispose();
						}else if (cm.countMonster() ==0) {
							//cm.sendNext("Thank you for stopping the Pirates from running away. Please proceed, Lord Pirate must be taken down as soon as possible, and Wu Yang must be saved.");
							cm.sendNext("Obrigado por parar os piratas de fugir. Por favor, continue, Lord Pirata deve ser retirado o mais rápido possível e Wu Yang deve ser salvo.");
							// cm.gainItem(4001120, -20);
							// cm.gainItem(4001121, -20);
							// cm.gainItem(4001122, -20);
							//cm.gainItem(4001044, 1);
							cm.givePartyExp(15000, party);
							clear(4, eim, cm);
							cm.dispose();
						} else {
							cm.sendNext("Você não matou todos os piratas ainda.");
							cm.dispose();
					}
				}
				cm.dispose();
			} else {
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				if (eim.getProperty(curMap.toString() + "stageclear") == null) {
					cm.sendNext("Por aqui, é o lugar onde os piratas de alto escalão tentam escapar. Eles bloqueiam sua passagem. Mate-os, e ocasionalmente eles podem sair da sua frente.Depois de matar todos fale comigo e você pode prosseguir. Mais uma vez, esses Piratas não são os mesmos que estão fora do navio, então fique atento ~");
					cm.dispose();
				} else {
							cm.sendNext("Por favor,passe pelo portal!");
					cm.dispose();
				}
			}
		} else if (curMap == 5) { //Boss Stage!! W00t!!!
			if (playerStatus) { //Is leader
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				var toSpawn;
				premable = eim.getProperty("leader5thpremable");
				if (premable == null) {
					
						toSpawn = 9300119;
					cm.spawnMonster(toSpawn, 766, 238);
					cm.mapMessage(6, "Então aparece o Lord Pirata...");
					eim.setProperty("leader5thpremable", "done");
					cm.dispose();
						}else  if (cm.countMonster() == 0)
                                                     {
                                                         
                                        cm.givePartyExp(15000, party);
	                                clear(5, eim, cm);
					cm.mapMessage(6, "Obrigado por proteger o Navio Pirata!...");
                                        //cm.spawnNpc(2094001,712,28);
                                        eim.setProperty("leader5thpremable", "done");
                                        cm.warp(925100600, 0);


					cm.dispose();
					} 
				}else {
					var eim = cm.getChar().getEventInstance();
					var mf = eim.getMapFactory();
					var party = cm.getChar().getEventInstance().getPlayers();
					if (eim.getProperty(curMap.toString() + "stageclear") == null) {
						cm.sendNext("This is Lord Pirate's Headquarters.");
						cm.dispose();
					} else {
							cm.sendNext("Por favor,passe pelo portal!");
						cm.dispose();
				}
			}
		}else if (curMap == 999) { //Teh Exit
			if (cm.getPlayer().isGM() == false) {
				for (var i = 0; i < PQItems.length; i++) {
					cm.removeAll(PQItems[i]);
				}
			}
			cm.warp(970000102, 0);
			cm.dispose();
		}
	}
	if (curMap == 2 || curMap == 3) {
		cm.dispose();
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
	var mf = eim.getMapFactory();
	map = mf.getMap(920010000 + stage * 100);
	//eim.addMapInstance(670010200 + stage,map);
	//cm.givePartyExp(2, party);
	cm.mapMessage("Clear!");
}

function failstage(eim, cm) {
	var packetef = MaplePacketCreator.showEffect("quest/party/wrong_kor");
	var packetsnd = MaplePacketCreator.playSound("Party1/Failed");
	var map = eim.getMapInstance(cm.getChar().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
}