/*2101014.js - Lobby and Entrance
 * @author Jvlaple
 * For Jvlaple's AriantPQ
 */
importPackage(java.lang);
importPackage(Packages.server);
 
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
		if (cm.getPlayer().getMapId() == 980010000) {
			if (status == 0) {
				var toSnd = "Você deseja participar da batalha do #eColiseu de Ariant#n?\r\n\#b";
				if (cm.getSquadState(MapleSquadType.ARIANT1) != 2 && cm.getSquadState(MapleSquadType.ARIANT1) != 1) {
					toSnd += "#L0#Iniciar batalha no Coliseu de Ariant (1)#l\r\n";
				} else if (cm.getSquadState(MapleSquadType.ARIANT1) == 1) {
					toSnd += "#L0#Juntar-me à batalha do Coliseu de Ariant (1)\r\nLíder: (" + cm.getSquadMember(MapleSquadType.ARIANT1, 0).getName() + ")\r\n" + "Participantes: " + cm.numSquadMembers(MapleSquadType.ARIANT1) + "\r\n";
				}
				if (cm.getSquadState(MapleSquadType.ARIANT2) != 2 && cm.getSquadState(MapleSquadType.ARIANT2) != 1) {
					toSnd += "#L1#Iniciar batalha no Coliseu de Ariant (2)#l\r\n";
				} else if (cm.getSquadState(MapleSquadType.ARIANT2) == 1) {
					toSnd += "#L1#Juntar-me à batalha do Coliseu de Ariant (2)\r\nLíder: (" + cm.getSquadMember(MapleSquadType.ARIANT2, 0).getName() + ")\r\n" + "Participantes: " + cm.numSquadMembers(MapleSquadType.ARIANT2) + "\r\n";
				}
				if (cm.getSquadState(MapleSquadType.ARIANT3) != 2 && cm.getSquadState(MapleSquadType.ARIANT3) != 1) {
					toSnd += "#L2#Iniciar batalha no Coliseu de Ariant (3)#l\r\n";
				} else if (cm.getSquadState(MapleSquadType.ARIANT3) == 1) {
					toSnd += "#L2#Juntar-me à batalha do Coliseu de Ariant (3)\r\nLíder: (" + cm.getSquadMember(MapleSquadType.ARIANT3, 0).getName() + ")\r\n" + "Participantes: " + cm.numSquadMembers(MapleSquadType.ARIANT3) + "\r\n";
				}
				if (toSnd.equals("Você deseja participar da batalha do #eColiseu de Ariant#n?Escolha uma arena!\r\n#b")) {
                                        cm.sendOk("Todas as arenas estão ocupadas.\r\nSugiro que você volte mais tarde ou tente acessar em outro canal.");
					cm.dispose();
				} else {
					cm.sendSimple(toSnd);
				}
			} else if (status == 1) {
				switch (selection) {
					case 0 : choice = MapleSquadType.ARIANT1;
							 map = 980010100;
							 break;
					case 1 : choice = MapleSquadType.ARIANT2;
							 map = 980010200;
							 break;
					case 2 : choice = MapleSquadType.ARIANT3;
							 map = 980010300;
							 break;
					default : choice = MapleSquadType.UNDEFINED;
							  map = 0;
							  return;
							  break;
					}
				if (cm.getSquadState(choice) == 0) {
					if (cm.createMapleSquad(choice) != null) {
						cm.getPlayer().dropMessage("Sua arena foi criada. Aguarde a vinda de novos participantes.");
						cm.warp(map, 0);
						cm.dispose();
					} else {
						cm.getPlayer().dropMessage("Houve um erro! Por favor, reporte este por meio do comando @bug <mensagem>");
						cm.dispose();
					}
				} else if (cm.getSquadState(choice) == 1) {
					if (cm.numSquadMembers(choice) > 5) {
						cm.sendOk("Lamento #h #, mas esta Arena já possui a capacidade máxima de participantes.");
						cm.dispose();
					} else {
						if (cm.canAddSquadMember(choice)) {
							cm.addSquadMember(choice);
							cm.sendOk("Você já é um participante.");
							cm.warp(map, 0);
							cm.dispose();
						} else {
							cm.sendOk("Desculpe, mas o líder pediu para nao ser autorizado a entrar.");
							cm.dispose();
						}
					}
				} else {
					cm.sendOk("Ocorreu algum problema. Contate um GM agora mesmo!");
					cm.dispose();
				}
			}  
		} 
	}
}