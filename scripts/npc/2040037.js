/*
 *Orange Ballon - Stage 2 of LPQ =D
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
					preamble = eim.getProperty("leader2ndpreamble");
					if (preamble == null) {
						cm.sendNext("Ola e bem vindo ao segundo estagio da Missao de Ludibrium. \r\nNeste mapa ha algumas caixas. Quebre-as e me colete #r15#k cupons.\r\nApos coletar a quantia exigida, fale comigo pois liberarei o portal para que voce possa seguir em frente.");
						eim.setProperty("leader2ndpreamble","done");
						cm.dispose();
					}
					else { // check how many they have compared to number of party members
                        			// check for stage completed
                        			var complete = eim.getProperty("2stageclear");
                        			if (complete != null) {
                        				cm.sendNext("Por favor, prossiga com a missao!\r\nO portal ja encontra-se #baberto#k");
                        				cm.dispose();
                        			}
                        			else {
							if (cm.haveItem(4001022, 15) == false) {
								cm.sendNext("Me desculpe, mas voce nao coletou os 15 cupons exigidos para prosseguir com a missao.");
								cm.dispose();
							}
							else {
								cm.sendNext("#bParabens#k por concluir o segundo estagio!\r\nVou abrir o portal agora.");
								clear(1,eim,cm);
								cm.givePartyExp(3000, party);
								cm.gainItem(4001022, -15);
								cm.dispose();
							}
						}
					}
				}
			}
			else { // non leader
				var eim = cm.getChar().getEventInstance();
				pstring = "member2ndpreamble" + cm.getChar().getId().toString();
				preamble = eim.getProperty(pstring);
				if (status == 0 && preamble == null) {
					var qstring = "member2nd" + cm.getChar().getId().toString();
					var question = eim.getProperty(qstring);
					if (question == null) {
						qstring = "FUCK";
					}
					cm.sendNext("Ola e bem vindo ao segundo estagio da Missao de Ludibrium. \r\nNeste mapa ha algumas caixas. Quebre-as e me colete #r15#k cupons.\r\nApos coletar a quantia exigida, fale comigo pois liberarei o portal para que voce possa seguir em frente.");
					
				}
				else if (status == 0) {// otherwise
                        		// check for stage completed
                        		var complete = eim.getProperty("2stageclear");
                        		if (complete != null) {
                        			cm.sendNext("Por favor, prossiga com a missao! O portal ja encontra-se #baberto#k");
                        			cm.dispose();
                        		}
                        		else {
							cm.sendOk("fale comigo assim que voce concluir o estagio.");
							cm.dispose();
					}
				}
				else if (status == 1) {
					if (preamble == null) {
						cm.sendOk("Otimo!\r\nBoa sorte para voces!");
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
eim.setProperty("2stageclear","true");
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
cm.mapMessage("Parabens! Preprare-se para o proximo estagio.");
}