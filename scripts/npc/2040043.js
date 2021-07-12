/*
 *Sky Blue Ballon - Stage 7 of LPQ =D
  *@author Jvlaple
  */

importPackage(Packages.tools);
importPackage(Packages.server.life);
importPackage(java.awt);

var status;
var partyLdr;
var chatState;
var party;
var preamble;

var stage8combos = Array(Array(0, 0, 0, 0, 1, 1, 1, 1, 1), //Lol, it took me forever to work these out :D
						Array(0, 0, 0, 1, 0, 1, 1, 1, 1),
						Array(0, 0, 0, 1, 1, 0, 1, 1, 1),
						Array(0, 0, 0, 1, 1, 1, 0, 1, 1),
						Array(0, 0, 0, 1, 1, 1, 1, 0, 1),
						Array(0, 0, 0, 1, 1, 1, 1, 1, 0),
						Array(0, 0, 1, 0, 0, 1, 1, 1, 1),
						Array(0, 0, 1, 0, 1, 0, 1, 1, 1),
						Array(0, 0, 1, 0, 1, 1, 0, 1, 1),
						Array(0, 0, 1, 0, 1, 1, 1, 0, 1),
						Array(0, 0, 1, 0, 1, 1, 1, 1, 0),
						Array(0, 0, 1, 1, 0, 0, 1, 1, 1),
						Array(0, 0, 1, 1, 0, 1, 0, 1, 1),
						Array(0, 0, 1, 1, 0, 1, 1, 0, 1),
						Array(0, 0, 1, 1, 0, 1, 1, 1, 0),
						Array(0, 0, 1, 1, 1, 0, 0, 1, 1),
						Array(0, 0, 1, 1, 1, 0, 1, 0, 1),
						Array(0, 0, 1, 1, 1, 0, 1, 1, 0),
						Array(0, 0, 1, 1, 1, 1, 0, 0, 1),
						Array(0, 0, 1, 1, 1, 1, 0, 1, 0),
						Array(0, 0, 1, 1, 1, 1, 1, 0, 0),
						Array(0, 1, 0, 0, 0, 1, 1, 1, 1),
						Array(0, 1, 0, 0, 1, 0, 1, 1, 1),
						Array(0, 1, 0, 0, 1, 1, 0, 1, 1),
						Array(0, 1, 0, 0, 1, 1, 1, 0, 1),
						Array(0, 1, 0, 0, 1, 1, 1, 1, 0),
						Array(0, 1, 0, 1, 0, 0, 1, 1, 1),
						Array(0, 1, 0, 1, 0, 1, 0, 1, 1),
						Array(0, 1, 0, 1, 0, 1, 1, 0, 1),
						Array(0, 1, 0, 1, 0, 1, 1, 1, 0),
						Array(0, 1, 0, 1, 1, 0, 0, 1, 1),
						Array(0, 1, 0, 1, 1, 0, 1, 0, 1),
						Array(0, 1, 0, 1, 1, 0, 1, 1, 0),
						Array(0, 1, 0, 1, 1, 1, 0, 0, 1),
						Array(0, 1, 0, 1, 1, 1, 0, 1, 0),
						Array(0, 1, 0, 1, 1, 1, 1, 0, 0),
						Array(0, 1, 1, 0, 0, 0, 1, 1, 1),
						Array(0, 1, 1, 0, 0, 1, 0, 1, 1),
						Array(0, 1, 1, 0, 0, 1, 1, 0, 1),
						Array(0, 1, 1, 0, 0, 1, 1, 1, 0),
						Array(0, 1, 1, 0, 1, 0, 0, 1, 1),
						Array(0, 1, 1, 0, 1, 0, 1, 0, 1),
						Array(0, 1, 1, 0, 1, 0, 1, 1, 0),
						Array(0, 1, 1, 0, 1, 1, 0, 0, 1),
						Array(0, 1, 1, 0, 1, 1, 0, 1, 0),
						Array(0, 1, 1, 0, 1, 1, 1, 0, 0),
						Array(0, 1, 1, 1, 0, 0, 0, 1, 1),
						Array(0, 1, 1, 1, 0, 0, 1, 0, 1),
						Array(0, 1, 1, 1, 0, 0, 1, 1, 0),
						Array(0, 1, 1, 1, 0, 1, 0, 0, 1),
						Array(0, 1, 1, 1, 0, 1, 0, 1, 0),
						Array(0, 1, 1, 1, 0, 1, 1, 0, 0),
						Array(0, 1, 1, 1, 1, 0, 0, 0, 1),
						Array(0, 1, 1, 1, 1, 0, 0, 1, 0),
						Array(0, 1, 1, 1, 1, 0, 1, 0, 0),
						Array(0, 1, 1, 1, 1, 1, 0, 0, 0),
						Array(1, 0, 0, 0, 0, 1, 1, 1, 1),
						Array(1, 0, 0, 0, 1, 0, 1, 1, 1),
						Array(1, 0, 0, 0, 1, 1, 0, 1, 1),
						Array(1, 0, 0, 0, 1, 1, 1, 0, 1),
						Array(1, 0, 0, 0, 1, 1, 1, 1, 0),
						Array(1, 0, 0, 1, 0, 0, 1, 1, 1),
						Array(1, 0, 0, 1, 0, 1, 0, 1, 1),
						Array(1, 0, 0, 1, 0, 1, 1, 0, 1),
						Array(1, 0, 0, 1, 0, 1, 1, 1, 0),
						Array(1, 0, 0, 1, 1, 0, 0, 1, 1),
						Array(1, 0, 0, 1, 1, 0, 1, 0, 1),
						Array(1, 0, 0, 1, 1, 0, 1, 1, 0),
						Array(1, 0, 0, 1, 1, 1, 0, 0, 1),
						Array(1, 0, 0, 1, 1, 1, 0, 1, 0),
						Array(1, 0, 0, 1, 1, 1, 1, 0, 0),
						Array(1, 0, 1, 0, 0, 0, 1, 1, 1),
						Array(1, 0, 1, 0, 0, 1, 0, 1, 1),
						Array(1, 0, 1, 0, 0, 1, 1, 0, 1),
						Array(1, 0, 1, 0, 0, 1, 1, 1, 0),
						Array(1, 0, 1, 0, 1, 0, 0, 1, 1),
						Array(1, 0, 1, 0, 1, 0, 1, 0, 1),
						Array(1, 0, 1, 0, 1, 0, 1, 1, 0),
						Array(1, 0, 1, 0, 1, 1, 0, 0, 1),
						Array(1, 0, 1, 0, 1, 1, 0, 1, 0),
						Array(1, 0, 1, 0, 1, 1, 1, 0, 0),
						Array(1, 0, 1, 1, 0, 0, 0, 1, 1),
						Array(1, 0, 1, 1, 0, 0, 1, 0, 1),
						Array(1, 0, 1, 1, 0, 0, 1, 1, 0),
						Array(1, 0, 1, 1, 0, 1, 0, 0, 1),
						Array(1, 0, 1, 1, 0, 1, 0, 1, 0),
						Array(1, 0, 1, 1, 0, 1, 1, 0, 0),
						Array(1, 0, 1, 1, 1, 0, 0, 0, 1),
						Array(1, 0, 1, 1, 1, 0, 0, 1, 0),
						Array(1, 0, 1, 1, 1, 0, 1, 0, 0),
						Array(1, 0, 1, 1, 1, 1, 0, 0, 0),
						Array(1, 1, 0, 0, 0, 0, 1, 1, 1),
						Array(1, 1, 0, 0, 0, 1, 0, 1, 1),
						Array(1, 1, 0, 0, 0, 1, 1, 0, 1),
						Array(1, 1, 0, 0, 0, 1, 1, 1, 0),
						Array(1, 1, 0, 0, 1, 0, 0, 1, 1),
						Array(1, 1, 0, 0, 1, 0, 1, 0, 1),
						Array(1, 1, 0, 0, 1, 0, 1, 1, 0),
						Array(1, 1, 0, 0, 1, 1, 0, 0, 1),
						Array(1, 1, 0, 0, 1, 1, 0, 1, 0),
						Array(1, 1, 0, 0, 1, 1, 1, 0, 0),
						Array(1, 1, 0, 1, 0, 0, 0, 1, 1),
						Array(1, 1, 0, 1, 0, 0, 1, 0, 1),
						Array(1, 1, 0, 1, 0, 0, 1, 1, 0),
						Array(1, 1, 0, 1, 0, 1, 0, 0, 1),
						Array(1, 1, 0, 1, 0, 1, 0, 1, 0),
						Array(1, 1, 0, 1, 0, 1, 1, 0, 0),
						Array(1, 1, 0, 1, 1, 0, 0, 0, 1),
						Array(1, 1, 0, 1, 1, 0, 0, 1, 0),
						Array(1, 1, 0, 1, 1, 0, 1, 0, 0),
						Array(1, 1, 0, 1, 1, 1, 0, 0, 0),
						Array(1, 1, 1, 0, 0, 0, 0, 1, 1),
						Array(1, 1, 1, 0, 0, 0, 1, 0, 1),
						Array(1, 1, 1, 0, 0, 0, 1, 1, 0),
						Array(1, 1, 1, 0, 0, 1, 0, 0, 1),
						Array(1, 1, 1, 0, 0, 1, 0, 1, 0),
						Array(1, 1, 1, 0, 0, 1, 1, 0, 0),
						Array(1, 1, 1, 0, 1, 0, 0, 0, 1),
						Array(1, 1, 1, 0, 1, 0, 0, 1, 0),
						Array(1, 1, 1, 0, 1, 0, 1, 0, 0),
						Array(1, 1, 1, 0, 1, 1, 0, 0, 0),
						Array(1, 1, 1, 1, 0, 0, 0, 0, 1),
						Array(1, 1, 1, 1, 0, 0, 0, 1, 0),
						Array(1, 1, 1, 1, 0, 0, 1, 0, 0),
						Array(1, 1, 1, 1, 0, 1, 0, 0, 0),
						Array(1, 1, 1, 1, 1, 0, 0, 0, 0));

function start() {
	status = -1;
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
			boxStage(cm);
		}
	}
			
function clear(stage, eim, cm) {
eim.setProperty("8stageclear","true");
var packetef = MaplePacketCreator.showEffect("quest/party/clear");
var packetsnd = MaplePacketCreator.playSound("Party1/Clear");
var packetglow = MaplePacketCreator.environmentChange("gate",2);
var map = eim.getMapInstance(cm.getChar().getMapId());
map.broadcastMessage(packetef);
map.broadcastMessage(packetsnd);
map.broadcastMessage(packetglow);
var mf = eim.getMapFactory();
map = mf.getMap(922010100 + stage * 100);
cm.givePartyExp(300, party);
cm.mapMessage("Pronto! Prepare-se para o ultimo estagio!");
}

function failstage(eim, cm) {
	var packetef = MaplePacketCreator.showEffect("quest/party/wrong_kor");
	var packetsnd = MaplePacketCreator.playSound("Party1/Failed");
	var map = eim.getMapInstance(cm.getChar().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
}

function boxStage(cm) {
	var debug = false;
	var eim = cm.getChar().getEventInstance();
	var nthtext = "eighth";
	var nthobj = "boxes";
	var nthverb = "stand";
	var nthpos = "stand too close to the edges";
	var curcombo = stage8combos;
	var currect = cm.getChar().getMap().getAreas();
	var objset = [0,0,0,0,0,0,0,0,0];
		if (playerStatus) { // leader
			if (status == 0) {
					// check for preamble
				 
					party = eim.getPlayers();
					preamble = eim.getProperty("leader" + nthtext + "preamble");
					if (preamble == null) {
							cm.sendNext("Oi, bem vindo ao penultimo estagio da Missao de Ludibrium!\r\nNeste local havera #r4 caixas#k. Voce precisara de #b5#k jogadores para que eles possam ficar em cima da caixa, tentando acertar a sequencia correta.\r\nEste e um processo demorado, portando, preste muita atencao ao fazer este estagio!\r\nQuando formarem uma sequencia de 5 pessoas, fale comigo pois eu lhe falarei se esta correta ou nao.\r\nQuando acertarem, liberarei o mapa para o proximo e ultimo estagio!");
							eim.setProperty("leader" + nthtext + "preamble","done");
							var sequenceNum = Math.floor(Math.random() * curcombo.length);
							eim.setProperty("stage" + nthtext + "combo",sequenceNum.toString());
							cm.dispose();
					}
					else {
						// otherwise
						// check for stage completed
						var complete = eim.getProperty("8stageclear");
						if (complete != null) {	
							var mapClear = "8stageclear";
							eim.setProperty(mapClear,"true"); // Just to be sure
							cm.sendNext("Por favor, corra para o proximo estagio! O portal ja encontra-se #baberto#k");
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
								// first, are there 3 players on the objset?
								var numSpawn = 5;
								if (totplayers == 5 || debug) {
										var combo = curcombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
										// debug
										// combo = curtestcombo;
										var testcombo = true;
										for (i = 0; i < objset.length; i++) {
											if (combo[i] != objset[i]){
												testcombo = false;
												}
										}
										if (testcombo || debug) {
												// do clear
												clear(1,eim,cm);
												var exp = (3000);
												cm.givePartyExp(exp, party);
												cm.dispose();
										}
										else { // wrong
												// do wrong
												//failstage(eim,cm);
												//cm.sendOk("Wrong!");1706/300
												failstage(eim,cm);
												//cm.sendOk(combo);
												cm.dispose();
												
										}
								}
								else {
										if (debug) {
											var outstring = "Objetos contem:"
											for (i = 0; i < objset.length; i++) {
												outstring += "\r\n" + (i+1).toString() + ". " + objset[i].toString();
											}
											cm.sendNext(outstring); 
											var combo = curcombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
											//cm.sendNext(combo);
										}
										else
											cm.sendNext("Parece que voce nao encontrou a combinacao correta. Pense numa combinacao diferente.\r\nSomente 5 pessoas estao autorizadas para fazer uma combinacao correta. Se voce nao possui 5 pessoas no seu grupo, fale com o #bSargento#k e desista desta missao.");
											cm.dispose();
								}
						}
					}
					// just in case.
			}
			else {
				var complete = eim.getProperty("8stageclear");
					if (complete != null) {	
					var target = eim.getMapInstance(103000800 + curMap);
			var targetPortal = target.getPortal("st00");
					cm.getChar().changeMap(target, targetPortal);
				}
				cm.dispose();
			}
	}
	else { // not leader
		if (status == 0) {
				var complete = eim.getProperty("8stageclear");
				if (complete != null) {
					cm.sendNext("Por favor, prossiga com a missao!\r\nO portal ja encontra-se #baberto#k!");
					cm.dispose();
				}
				else {
					cm.sendNext("Fale para o lider do grupo falar comigo.");
					cm.dispose();
				}
		}
	else {
				var complete = eim.getProperty("8stageclear");
			if (complete != null) {	
			cm.sendNext("Por favor, prossiga com a missao!\r\nO portal ja encontra-se #baberto#k!");
			cm.dispose();
		}
				cm.dispose();
			}
	}
}