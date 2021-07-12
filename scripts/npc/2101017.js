/*2101017.js
 *Cesar
 *@author Jvlaple
 */
 
importPackage(Packages.client); 
importPackage(java.lang);
importPackage(Packages.server);
importPackage(Packages.client); 

 
 
var status = 0;
var toBan = -1;
var choice;
var arena;
var arenaName;
var type;
var map;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		} else {
			status--;
		} 
	
	if (cm.getPlayer().getMapId() == 980010100 || cm.getPlayer().getMapId() == 980010200 || cm.getPlayer().getMapId() == 980010300) {
			if (status == 0) {
				switch (cm.getPlayer().getMapId()) {
					case 980010100:
						arena = MapleSquadType.ARIANT1;
						break;
					case 980010200:
						arena = MapleSquadType.ARIANT2;
						break;
					case 980010300:
						arena = MapleSquadType.ARIANT3;
						break;
					default :
						return;
				}
				if (cm.checkSquadLeader(arena)) {
					cm.sendSimple("#h #, o que deseja fazer?#b\r\n\r\n#L1#Ver a lista de participantes nesta arena.#l\r\n#L2#Iniciar a batalha!#l\r\n#L3#Sair desta arena.#l");
                    status = 19;
				} else if (cm.isSquadMember(arena)) {
					var noOfChars = cm.numSquadMembers(arena);
                    var toSend = "Atualmente  são estes os participantes desta arena:\r\n#b";
					for (var i = 1; i <= noOfChars; i++) {
						toSend += "\r\n#L" + i + "#" + cm.getSquadMember(arena, i - 1).getName() + "#l";
					}
					cm.sendSimple(toSend);
					cm.dispose();
				} else {
					cm.sendOk("O que aconteceu?");
					cm.dispose();
				}
			} else if (status == 20) {
				switch (cm.getPlayer().getMapId()) {
						case 980010100:
							arena = MapleSquadType.ARIANT1;
							arenaName = "AriantPQ1";
							break;
						case 980010200:
							arena = MapleSquadType.ARIANT2;
							arenaName = "AriantPQ2";
							break;
						case 980010300:
							arena = MapleSquadType.ARIANT3;
							arenaName = "AriantPQ3";
							break;
						default :
							return;
					}
				if (selection == 1) {
					var noOfChars = cm.numSquadMembers(arena);
                    var toSend = "Atualmente estes são  os participantes desta arena:\r\n#b";
					for (var i = 1; i <= noOfChars; i++) {
						toSend += "\r\n#L" + i + "#" + cm.getSquadMember(arena, i - 1).getName() + "#l";
					}
					cm.sendSimple(toSend);
					cm.dispose();
				} else if (selection == 2) {
					if (cm.numSquadMembers(arena) <2) {
						cm.sendOk("Requer-se #edois ou mais participantes#n para que eu possa iniciar a batalha nesta arena.");
						cm.dispose();
					} else {
						var em = cm.getEventManager(arenaName);
						if (em == null) {
							cm.sendOk("...");
							cm.dispose();
						}
						else {
							cm.setSquadState(arena, 2);
							em.startInstance(cm.getSquad(arena), cm.getChar().getMap());
						}
						cm.dispose();
					}
				} else if (selection == 3) {
					cm.mapMessage("O lider da arena saiu.");
					cm.warpSquadMembers(arena, 980010000)
					var squad = cm.getPlayer().getClient().getChannelServer().getMapleSquad(arena);
					cm.getPlayer().getClient().getChannelServer().removeMapleSquad(squad, arena);
					cm.dispose();
				}
			} 
                    } else if (cm.getPlayer().getMapId() == 980010101 || cm.getPlayer().getMapId() == 980010201 || cm.getPlayer().getMapId() == 980010301) {
			var eim = cm.getChar().getEventInstance();
			if (status == 0) {
				var gotTheBombs = eim.getProperty("gotBomb" + cm.getChar().getId());
				if (gotTheBombs != null) {
                    cm.sendOk("#h #, eu ja lhe dei as bombas (#i2100067#).\r\nDesca e mate os #eEscorpioes#n para conseguir mais!");
					cm.dispose();
				} else {
					cm.sendOk("Eu lhe dei 5 bombas (#i2100067#) e 50 Rochas Elementais\r\n(#i2270002#).\r\nUse as Rochas Elementais para capturar os escorpioes para a #bSra.Areda#k#n!");
					eim.setProperty("gotBomb" + cm.getChar().getId(), "got");
					cm.gainItem(2270002, 50);
					cm.gainItem(2100067, 5);
					cm.dispose();
				}
			}
		} 
	}
}
