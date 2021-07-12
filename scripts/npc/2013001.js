/*
	This file is part of the OdinMS Maple Story Server
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

/* Chamberlain Eak
 *@author Jvlaple
*/
importPackage(Packages.tools);
importPackage(Packages.server.life);
importPackage(java.awt);
importPackage(java.lang);

var status;
var curMap;
var playerStatus;
var chatState;
//var party;
var preamble;

var SRArrays = Array(Array(0, 0, 5), //Sealed Room
					Array(0, 1, 4),
					Array(0, 2, 3),
					Array(0, 3, 2),
					Array(0, 4, 1),
					Array(0, 5, 0),
					Array(1, 0, 4),
					Array(1, 1, 3),
					Array(1, 2, 2),
					Array(1, 3, 1),
					Array(1, 4, 0),
					Array(2, 0, 3),
					Array(2, 1, 2),
					Array(2, 2, 1),
					Array(2, 3, 0),
					Array(3, 0, 2),
					Array(3, 1, 1),
					Array(3, 2, 0),
					Array(4, 0, 1),
					Array(4, 1, 0),
					Array(5, 0, 0));

			

function start() {
	status = -1;
	mapId = cm.getChar().getMapId();
	if (mapId == 920010000) //Entrance
		curMap = 1;
	else if (mapId == 920010100) //Center Tower
		curMap = 2;
	else if (mapId == 920010200)//Walkway
		curMap = 3;
	else if (mapId == 920010300)//Storage
		curMap = 4;
	else if (mapId == 920010400)//Lobby
		curMap = 5;
	else if (mapId == 920010500)//SR
		curMap = 6;
	else if (mapId == 920010600)//Lounge
		curMap = 7;
	else if (mapId == 920010700)//On the way up
		curMap = 8;
	else if (mapId == 920010800)//Garden
		curMap = 9;
	else if (mapId == 920011000)//Room of Darkness
		curMap = 11;
	else if (mapId == 920011200) //Exit
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
		if (curMap == 1) { // First Stage.
			if (playerStatus) { // party leader
				var eim = cm.getChar().getEventInstance(); // OPQ
				var party = cm.getChar().getEventInstance().getPlayers();
				if (status == 0) {
					party = eim.getPlayers();
					var cleared = eim.getProperty("1stageclear");
					if (cleared == null) {
						cm.sendNext("Não sei o que dizer. Obrigado por juntar meu corpo. Eu sou Eak, o camareiro de confiança da Deusa Minerva. Vocês estão aqui para resgatar Minerva, não é? Eu vou tentar ajudar. Certo, vou levar vocês até a entrada da torre.");
					}
					else { //If complete, just warp to the top :D
							var complete = eim.getProperty(curMap.toString() + "stageclear");
							if (complete != null) {
								cm.warp(920010000, 2);
								cm.dispose();
						}
					}
				} else if (status == 1) {
						cm.givePartyExp(6000, party);
						//eim.setProperty("1stageclear", "true");
						clear(1, eim, cm);
						for (var outt = 0; outt<party.size(); outt++)
							{//Kick everyone out =D
								var exitMapz = eim.getMapInstance(920010000);
								party.get(outt).changeMap(exitMapz, exitMapz.getPortal(2)); //Top
							}
						cm.dispose();
					}
				} else { // non leader
				if (status == 0) {
					var eim = cm.getChar().getEventInstance();
					var complete = eim.getProperty(curMap.toString() + "stageclear");
					if (complete != null) {
						cm.warp(920010000, 2);
						cm.dispose();
					} else {
						cm.sendOk("Por favor, peça ao seu líder para ele falar comigo!");
						cm.dispose();
					}
				}
			} //End of Entrance Eak
		} else if (curMap == 2) { //Center Tower
			if (playerStatus) { //Me IS party leader :D
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var thisMap = mf.getMap(920010100);
				if (thisMap.getReactorByName("scar1").getState() == 1 &&
					thisMap.getReactorByName("scar2").getState() == 1 &&
					thisMap.getReactorByName("scar3").getState() == 1 &&
					thisMap.getReactorByName("scar4").getState() == 1 &&
					thisMap.getReactorByName("scar5").getState() == 1 &&
					thisMap.getReactorByName("scar6").getState() == 1) {
					cm.mapMessage("Você foi teletransportado para o Jardim!");
					var party = cm.getChar().getEventInstance().getPlayers();
					for (var outt = 0; outt<party.size(); outt++)
						{//Warp to garden
							var exitMapz = eim.getMapInstance(920010800);
							party.get(outt).changeMap(exitMapz, exitMapz.getPortal(0)); //This is the garden.
						}
					cm.dispose();
				} else {
					cm.sendOk("Por favor, repare a estátua da Deusa antes de clicar em mim!");
					cm.dispose();
				}
			} else {
						cm.sendOk("Por favor, peça ao seu líder para ele falar comigo!");
				cm.dispose();
			}
		} else if (curMap == 3) { //Walkway
			if (playerStatus) { //Is leader
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				premable = eim.getProperty("leader3rdpremable");
				if (premable == null) {
					cm.sendNext("Esta é a alameda para a Torre da Deusa. Os duendes quebraram #b#t4001044# em 30 pedaços#k e levaram cada um deles. Por favor, acabe com os Duendes e traga de volta o #b#t4001050##k; em troca, eu vou fazer #b#t4001044##k com eles. Os Duendes se fortaleceram com o poder da estátua da Deusa, por isso, tenha cuidado~");
					eim.setProperty("leader3rdpremable", "done");
					cm.dispose();
				} else {
						var complete = eim.getProperty("3stageclear");
						if (complete != null) {
							cm.sendNext("Volte para a Torre do Centro e continue a missão.");
							cm.dispose();
						}else if (cm.haveItem(4001050, 30)) {
							cm.sendNext("Obrigado por me trazer de volta as 30 Peças Pequenas. Eu farei #bStatue of Goddess: 1st Piece #k agora.");
							cm.gainItem(4001050, -30);
							cm.gainItem(4001044, 1);
							cm.givePartyExp(7500, party);
							clear(3, eim, cm);
							cm.dispose();
						} else {
							cm.sendNext("Você não tem 30 #b 1ª peça pequena #k ainda.");
							cm.dispose();
					}
				}
			} else {
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				if (eim.getProperty(curMap.toString() + "stageclear") == null) {
					cm.sendNext("Esta é a passagem da Torre da Deusa. O Pixies quebrou #bStatue of Goddess: 1st Piece #k em 30 peças, e levou todos e cada um deles. Elimine o Pixie e traga de volta o #b1st Small Piece # k. Em troca, vou fazer a Estátua da Deusa: 1 ° Pedaços fora deles. Os Pixies foram fortalecidos pelo poder da estátua da deusa, então seja cuidadoso~");
					cm.dispose();
				} else {
							cm.sendNext("Volte para a Torre do Centro e continue a missão.");
					cm.dispose();
				}
			}
		}else if (curMap == 4) {
			if (playerStatus) { //Is leader
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				premable = eim.getProperty("leader4thpremable");
				if (premable == null) {
					cm.sendNext("Esta era anteriormente a área de armazenamento da Torre da Deusa, mas agora, transformou-se em uma casa dos Cellions. A Cellion levou #bStatue of Goddess: 2nd #k Piece e escondeu-se com isso, então é seu trabalho vencê-lo e trazer de volta ao #bStatue of Goddess: 2nd Piece #k.");
					eim.setProperty("leader4thpremable", "done");
					cm.dispose();
				} else {
						var complete = eim.getProperty(curMap.toString() + "stageclear");
						if (complete != null) {
							cm.sendNext("Volte para a Torre do Centro e continue a missão.");
							cm.dispose();
						}else if (cm.haveItem(4001045)) {
							cm.sendNext("Obrigado por recuperar a peça, use-a para consertar a Estátua da Deusa.");
							clear(4, eim, cm);
							cm.givePartyExp(7500, party);
							cm.dispose();
						} else {
							cm.sendNext("Você não tem a 2ª peça de estátua para finalizar esta etapa.");
							cm.dispose();
					}
				}
			} else {
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				if (eim.getProperty(curMap.toString() + "stageclear") == null) {
					cm.sendNext("Esta era anteriormente a área de armazenamento da Torre da Deusa, mas agora, transformou-se em uma casa dos Cellions. O Cellion levou #bEstatua da deusa: 2nd #k Piece e escondeu-se com isso, então é seu trabalho vencê-lo e trazer de volta ao #bStatue of Goddess: 2nd Piece #k.");
					cm.dispose();
				} else {
			                 cm.sendNext("Volte para a Torre do Centro e continue a missão.");
					cm.dispose();
				}
			}
		}else if (curMap == 5) { //Lobby
		if (playerStatus) { //Is leader
				var dayNames = Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				var dayTxt = dayNames[cm.getDayOfWeek() - 1];
				var thisMap = mf.getMap(920010400);
				var today = cm.getDayOfWeek();
				premable = eim.getProperty("leader5thpremable");
				if (premable == null) {
					cm.sendNext("Este é o saguão da Torre da Deusa. Este é o lugar que Minerva a deusa preferiu ouvir música. Ela adorava ouvir diferentes tipos de música, dependendo de qual dia da semana era. Se você toca aquela música que você tocou antes, o espírito de Minerva a deusa pode reagir a ela e ... algo curioso pode acontecer. \ r\ n #e Certifique-se de soltar o CD direito pela primeira vez. Não há backup. # \r\n\r\n Hoje é: \ r\ n" + dayTxt);
					eim.setProperty("leader5thpremable", "done");
					cm.dispose();
				} else {
						var complete = eim.getProperty(curMap.toString() + "stageclear");
						if (complete != null) {
			                 cm.sendNext("Volte para a Torre do Centro e continue a missão.");
							cm.dispose();
						}else if (eim.getMapInstance(920010400).getReactorByName("music").getMode() == 0) {
							
								cm.sendNext("Wow, Você conseguiu!");
								clear(5, eim, cm);
								//cm.gainItem(4001046, 1);
								cm.givePartyExp(5500, party);
								//cm.spawnReactor(9102000, new java.awt.Point(-342, -146), 0);
								thisMap.setReactorState(1);
								cm.dispose();
							
							
							cm.dispose();
						} else {
							cm.sendNext("Você ainda não tocou o CD.");
							cm.dispose();
					}
				}
			} else {
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				var dayNames = Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				var dayTxt = dayNames[cm.getDayOfWeek() - 1];
				var thisMap = mf.getMap(920010400);
				var today = cm.getDayOfWeek();
				if (eim.getProperty(curMap.toString() + "stageclear") == null) {
					cm.sendNext("Este é o saguão da Torre da Deusa. Este é o lugar que Minerva a deusa preferiu ouvir música. Ela adorava ouvir diferentes tipos de música, dependendo de qual dia da semana era. Se você toca aquela música que você tocou antes, o espírito de Minerva a deusa pode reagir a ela e ... algo curioso pode acontecer. \ r\ n #e Certifique-se de soltar o CD direito pela primeira vez. Não há backup. # \r\n\r\n Hoje é: \ r\ n" + dayTxt);
					cm.dispose();
				} else {
			                 cm.sendNext("Volte para a Torre do Centro e continue a missão.");
					cm.dispose();
				}
			}
		}else if (curMap == 6) { //SR
			sealedRoom(cm);
		}else if (curMap == 7) { //Lounge
			if (playerStatus) { //Is leader
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				premable = eim.getProperty("leader7thpremable");
				if (premable == null) {
					cm.sendNext("Esta é a sala de estar da Torre da Deusa, onde os convidados ficaram a noite ou a noite. #b <Estatua da deusa: 5th Piece> #k foi dividido em 40 peças, e separado em toda a sala. Por favor, vagueie e colecione as peças do # b5th Small Pieces #k.");
					eim.setProperty("leader7thpremable", "done");
					cm.dispose();
				} else {
						var complete = eim.getProperty("7stageclear");
						if (complete != null) {
			                 cm.sendNext("Volte para a Torre do Centro e continue a missão.");
							cm.dispose();
						}else if (cm.haveItem(4001052, 40)) {
							cm.sendNext("Obrigado por me trazer de volta as 40 peças pequenas. Eu farei #bStatue of Goddess: 5th Piece #k agora.");
							cm.gainItem(4001052, -40);
							cm.gainItem(4001048, 1);
							cm.givePartyExp(7500, party);
							clear(7, eim, cm);
							cm.dispose();
						} else {
							cm.sendNext("Você ainda não obteve 40 #b 5th Small Piece #k ainda.");
							cm.dispose();
					}
				}
			} else {
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				if (eim.getProperty(curMap.toString() + "stageclear") == null) {
					cm.sendNext("Esta é a sala de estar da Torre da Deusa, onde os convidados ficaram a noite ou a noite. #b <Estatua da deusa: 5th Piece> #k foi dividido em 40 peças, e separado em toda a sala. Por favor, vagueie e colecione as peças do # b5th Small Pieces #k.");
					cm.dispose();
				} else {
			                 cm.sendNext("Volte para a Torre do Centro e continue a missão.");
					cm.dispose();
				}
			}
		}else if (curMap == 8) { //Way up
			if (playerStatus) { //Is leader
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				premable = eim.getProperty("leader8thpremable");
				if (premable == null) {
					cm.sendNext("Uma vez que esta fase está incompleta, você pode ter a peça da estátua gratuitamente...");
					eim.setProperty("leader8thpremable", "done");
					cm.gainItem(4001049, 1);
					cm.givePartyExp(7500, party);
					clear(8, eim, cm);
					cm.dispose();
				} else {
			                 cm.sendNext("Volte para a Torre do Centro e continue a missão.");
					cm.dispose();
				}
			} else {
				var eim = cm.getChar().getEventInstance();
				var mf = eim.getMapFactory();
				var party = cm.getChar().getEventInstance().getPlayers();
				if (eim.getProperty(curMap.toString() + "stageclear") == null) {
					cm.sendNext("Peça ao seu líder para falar comigo...");
					cm.dispose();
				} else {
			                 cm.sendNext("Volte para a Torre do Centro e continue a missão.");
					cm.dispose();
				}
			}
		}else if (curMap == 9) {
			cm.sendNext("Agarre uma semente estranha e plante-a para encontrar um nependeth escuro! Ele gerará Papa Pixie! Largue a semente ainda estranha na tigela da planta direita e você obterá uma Grama da Vida!");
			cm.dispose();
		}else if (curMap == 11) {
			cm.sendNext("Argh, tão escuro aqui. Você está agora dentro da Sala das Trevas na Torre da Deusa, mas então, como você chegou aqui? Você não encontrará um pedaço da Estátua da Deusa aqui. Eu sugiro que você verifique os outros quartos em vez disso.");
			cm.dispose();
		}else if (curMap == 999) {
			cm.warp(970000102 , 0);
			cm.removeAll(4001063);
			cm.removeAll(4001044);
			cm.removeAll(4001045);
			cm.removeAll(4001046);
			cm.removeAll(4001047);
			cm.removeAll(4001048);
			cm.removeAll(4001049);
			cm.removeAll(4001050);
			cm.removeAll(4001051);
			cm.removeAll(4001052);
			cm.removeAll(4001053);
			cm.removeAll(4001054);
			cm.removeAll(4001055);
			cm.removeAll(4001056);
			cm.removeAll(4001057);
			cm.removeAll(4001058);
			cm.removeAll(4001059);
			cm.removeAll(4001060);
			cm.removeAll(4001061);
			cm.removeAll(4001062);		
			cm.dispose();
		}else {
			cm.dispose();
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
	var mf = eim.getMapFactory();
	map = mf.getMap(920010000 + stage * 100);
	//eim.addMapInstance(670010200 + stage,map);
	//cm.givePartyExp(2, party);
	//cm.mapMessage("Clear!");
}

function failstage(eim, cm) {
	var packetef = MaplePacketCreator.showEffect("quest/party/wrong_kor");
	var packetsnd = MaplePacketCreator.playSound("Party1/Failed");
	var map = eim.getMapInstance(cm.getChar().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
}

function sealedRoom (cm) {
	var debug = false;
	var eim = cm.getChar().getEventInstance();
	var nthtext = "6th";
	var curcombo = SRArrays;
	var currect = cm.getChar().getMap().getAreas();
	var objset = [0,0,0];
		if (curMap == 6) { //SR
	        if (playerStatus) { // leader
	                if (status == 0) {
	                        // check for preamble
	                     
	                        party = eim.getPlayers();
	                        preamble = eim.getProperty("leader" + nthtext + "preamble");
	                        if (preamble == null) {
	                                cm.sendNext("Esta é a Sala Selada da Torre da Deusa. É a sala onde Minerva, a Deusa, sentiu-se segura o suficiente para manter seus pertences muito valiosos. Os três passos que você vê no lado funcionam como os bloqueios que podem desencadear a maldição, e todos eles têm que carregar a quantidade exata de peso. Vamos ver ... vai exigir que cinco de vocês apontem para combinar o peso ideal. Por sinal, você precisará resolver isso em 7 tentativas ou menos, ou você será banido da sala selada, além de alterar a resposta no processo.");
	                                eim.setProperty("leader" + nthtext + "preamble","done");
	                                var sequenceNum = Math.floor(Math.random() * curcombo.length);
	                                eim.setProperty("stage" + nthtext + "combo",sequenceNum.toString());
									eim.setProperty("stage6Tries", "0");
	                                cm.dispose();
	                        }
	                        else {
	                        	// otherwise
	                        	// check for stage completed
	                        	var complete = eim.getProperty(curMap.toString() + "stageclear");
	                        	if (complete != null) {	
	                        		var mapClear = curMap.toString() + "stageclear";
	                        		eim.setProperty(mapClear,"true"); // Just to be sure
			                 cm.sendNext("Volte para a Torre do Centro e continue a missão.");
	                        	}
	                        	// check for people on ropes
	                        	else { 
	                        	        // check for people on ropes(objset)
	                        	        var totplayers = 0;
	                        	        for (i = 0; i < objset.length; i++) {
	                        	                for (j = 0; j < party.size(); j++) {
	                        	                        var present = currect.get(i).contains(party.get(j).getPosition());
	                        		                        if (present) {
	                        	                                objset[i] = objset[i] + 1;
	                        	                                totplayers = totplayers + 1;
	                        	                        }
	                        	                }
	                        	        }
	                        	        // compare to correct
	                        	        // first, are there 5 players on the objset?
	                        	        if (totplayers == 5 /*|| debug*/) {
	                        	                var combo = curcombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
	                        	                // debug
	                        	                // combo = curtestcombo;
	                        	                var testcombo = true;
												var right = 0;
												var wrong = 0;
												var sndString = "";
	                        	                for (i = 0; i < objset.length; i++) {
	                        	                	if (combo[i] != objset[i]){
	                        	                		testcombo = false;
														wrong += 1;
													} else {
														right += 1;
													}
	                        	                }
												if (right > 1) {
													sndString += right + " correto.\r\n";
												}
												if (wrong > 1) {
													sndString += wrong + " diferente.\r\n";
												}
	                        	                if (testcombo || debug) {
	                        	                        // do clear
	                        	                        clear(curMap,eim,cm);
	                        	                        var exp = 7500;
	                        	                        cm.givePartyExp(exp, party);
														//cm.getPlayer().getEventInstance().getMapInstance(920010500).getReactorByName("stone4").setState(1);
														cm.getPlayer().getMap().setReactorState(cm.getPlayer().getMap().getReactorByName("stone4"), 1);
	                        	                        cm.dispose();
	                        	                }
	                        	                else { // wrong
	                        	                        // do wrong
	                        	                        //failstage(eim,cm);
														var tries = Integer.parseInt(eim.getProperty("stage6Tries"));
														eim.setProperty("stage6Tries", tries + 1);
														if (tries > 6) {
															cm.mapMessage(5, "Você foi banido da sala selada e a combinação deve ser reiniciada.");
															var sequenceNum = Math.floor(Math.random() * curcombo.length); // Reset combo
															eim.setProperty("stage" + nthtext + "combo",sequenceNum.toString());
															eim.setProperty("stage6Tries", "0");//set back to zero
															for (var outt = 0; outt<party.size(); outt++) {//Kick everyone out =D
																var exitMapz = eim.getMapInstance(9200100100);
																party.get(outt).changeMap(exitMapz, exitMapz.getPortal(0)); //Out
															}
														} else {
															cm.sendOk(sndString);
														}
	                        	                        cm.dispose();
														
	                        	                }
	                        	        }
	                        	        else {
	                        	                if (debug) {
	                        	               		var outstring = "Objects contain:"
	                        	               		for (i = 0; i < objset.length; i++) {
	                        	               			outstring += "\r\n" + (i+1).toString() + ". " + objset[i].toString();
	                        	               		}
	                        	                	cm.sendNext(outstring); 
													var combo = curcombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
													//eim.setProperty("6stageclear", "true");
													//cm.getPlayer().getEventInstance().getMapInstance(920010500).getReactorByName("stone4").hitReactor(02, 1, cm.getPlayer().getClient());
													//cm.getPlayer().getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.triggerReactor(cm.getPlayer().getEventInstance().getMapInstance(920010500).getReactorByName("stone4"), 0));
													//cm.sendNext(combo);
													//clear(curMap,eim,cm);
													//cm.getPlayer().getEventInstance().getMapInstance(920010500).getReactorByName("stone4").setState(1);
	                        	                }
	                        	                else
													cm.sendNext("Parece que você ainda não encontrou as plataformas. Continue tentando!!");
													//clear(curMap,eim,cm);
													cm.dispose();
	                        	        }
	                        	}
	                        }
	                        // just in case.
	                }
	                else {
	                	var complete = eim.getProperty(curMap.toString() + "stageclear");
	                       	if (complete != null) {	
	                		//var target = eim.getMapInstance(920010100);
							//var targetPortal = target.getPortal("st00");
	                		//cm.getChar().changeMap(target, targetPortal);
	                	}
	                	cm.dispose();
	                }
	        }
	        else { // not leader
	        	if (status == 0) {
	        	        var complete = eim.getProperty(curMap.toString() + "stageclear");
	        	        if (complete != null) {
	        	        	cm.sendNext("Volte para a torre do centro e continue com a missão!");
							cm.dispose();
	        	        }
	        	        else {
	        	        	cm.sendNext("Por favor, peça ao líder do grupo para falar comigo.");
	        	        	cm.dispose();
	        	        }
	        	}
			else {
	                	var complete = eim.getProperty(curMap.toString() + "stageclear");
			       	if (complete != null) {	
					//var target = eim.getMapInstance(920010100);
					//var targetPortal = target.getPortal("st00");
	                		//cm.getChar().changeMap(target, targetPortal);
				}
	                	cm.dispose();
	                }
	        }
		}
}

