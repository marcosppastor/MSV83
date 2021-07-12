/*
 *Violent Ballon - Stage 9 =D
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
			if (playerStatus) { // party leader
				if (status == 0) {
					var eim = cm.getChar().getEventInstance();
					party = eim.getPlayers();
					preamble = eim.getProperty("leader9thpreamble");
					if (preamble == null) {
						cm.sendNext("Olá, bem vindo ao Estagio Boss da Missão de Ludibrium.\r\nNeste mapa, você encontrará o Boss Alishar.\r\nMate o #bRato Preto#k e aguarde alguns segundos até que o Alishar apareça.\r\nRecomendo que Mercenarios e Arqueiros fiquem na linha de frente matando o #rAlishar#k, enquanto os Clérigos ficam atras, curando.\r\nApos matar o Alishar, colete a#bChave#k cuja qual ele dropa ao morrer e fale comigo.");
						eim.setProperty("leader9thpreamble","done");
						cm.dispose();
					}
					else { // check how many they have compared to number of party members
                        			// check for stage completed
                        			var complete = eim.getProperty("9stageclear");
                        			if (complete != null) {
	                        			cm.warp(922011000, 0);
										cm.dispose();
                        			}
                        			else {
							if (cm.haveItem(4001023, 1) == false) {
								cm.sendNext("Lamento mas você precisa coletar uma \r\n#bChave de Outra Dimensão#k, dropada do #eAlishar.");
								cm.dispose();
							}
							else {
								cm.sendNext("Parabéns por concluirem o Estagio Boss!\r\nPor terem concluido este e salvado Ludibrium, os levarei até o Mapa Bonus!");
								clear(1,eim,cm);
                                                                cm.givePartyNX(party);

                                                                
								cm.givePartyExp(6000, party);
								cm.gainItem(4001023, -1);
								var eim = cm.getPlayer().getEventInstance();
								eim.finishPQ();
								cm.dispose();
							}
						}
					}
				}
			}
			else { // non leader
				var eim = cm.getChar().getEventInstance();
				pstring = "member9thpreamble" + cm.getChar().getId().toString();
				preamble = eim.getProperty(pstring);
				if (status == 0 && preamble == null) {
					var qstring = "member9th" + cm.getChar().getId().toString();
					var question = eim.getProperty(qstring);
					if (question == null) {
						qstring = "FUCK";
					}
					cm.sendNext("Olé, bem vindo ao Estágio Boss da Missão de Ludibrium.\r\nNeste mapa, você encontrará o Boss Alishar.\r\nMate o #bRato Preto#k e aguarde alguns segundos até que o Alishar apareca.\r\nRecomendo que Mercenarios e Arqueiros fiquem na linha de frente matando o #rAlishar#k, enquanto os Clérigos ficam atrás, curando.\r\nApos matar o Alishar, colete a #bChave#k cuja qual ele dropa ao morrer e fale comigo.");
					
				}
				else if (status == 0) {// otherwise
                        		// check for stage completed
                        		var complete = eim.getProperty("9stageclear");
                        		if (complete != null) {
                        			cm.warp(922011000, 0);
									cm.dispose();
                        		}
                        		else {
							cm.sendOk("Fale comigo assim que você matar e coletar a #bChave#k do Alishar");
							cm.dispose();
					}
				}
				else if (status == 1) {
					if (preamble == null) {
						cm.sendOk("Tudo bem.\r\nBoa sorte!");
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
		}
	}
			
function clear(stage, eim, cm) {
eim.setProperty("9stageclear","true");
var packetef = MaplePacketCreator.showEffect("quest/party/clear");
var packetsnd = MaplePacketCreator.playSound("Party1/Clear");
var packetglow = MaplePacketCreator.environmentChange("gate",2);
var map = eim.getMapInstance(cm.getChar().getMapId());
map.broadcastMessage(packetef);
map.broadcastMessage(packetsnd);
var mf = eim.getMapFactory();
map = mf.getMap(922010100 + stage * 100);
cm.givePartyExp(300, party);
}