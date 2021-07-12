/*
 * @author Marcos P
 * TrueMS - 2016
 * SCARGA - Exped.
 * truems.net/
*/

importPackage(java.lang);
importPackage(Packages.server);
 
var status = 0;

function start() {
	if (cm.getPlayer().getLevel() < 90) {
		cm.sendOk("Requer-se ao menos LV. 90 para enfrentar o Scar/Targa.");
		cm.dispose();
		return;
	}
	//if (cm.getPlayer().getClient().getChannel() != 1) {
		//cm.sendOk("Pink Bean may only be attempted on channel 5.");
		//cm.dispose();
		//return;
	//}
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
        if (status == 0) {
            if (cm.getSquadState(MapleSquadType.SCARGA) == 0) {
                cm.sendSimple("Voce e seu time desejam enfrentar o #dScar/Targa#k?\r\n#b#L1#Sim, desejamos!#l\r\n\#L2#Nao. Irei esperar uns minutos...#l");
            } else if (cm.getSquadState(MapleSquadType.SCARGA) == 1) {
                if (cm.checkSquadLeader(MapleSquadType.SCARGA)) {
                    cm.sendSimple("O que voce gostaria de fazer?#b\r\n\r\n#L1#Ver a lista de participantes#l\r\n#L2#Fechar os registros de entrada#l\r\n#L3#Enfrentar o #eTarga/Scar#n!#l");
                    status = 19;
                } else if (cm.isSquadMember(MapleSquadType.SCARGA)) {
                    var noOfChars = cm.numSquadMembers(MapleSquadType.SCARGA);
                    var toSend = "#eAguarde ate que o lider inicie a batalha.\r\n#n\r\nOs participantes para enfrentar o #eTarga/Scar#n, sao:\r\n#b";
                    for (var i = 1; i <= noOfChars; i++) {
                        toSend += "\r\n#L" + i + "#" + cm.getSquadMember(MapleSquadType.SCARGA, i - 1).getName() + "#l.";
                    }
                    cm.sendSimple(toSend);
                    cm.dispose();
                } else {
                    cm.sendSimple("Um jogador iniciou a formacao de grupo contra o #dScar/Targa#k.\r\nPor acaso, voce deseja entrar neste grupo?\r\n#b#L1#Sim, desejamos!#l\r\n\#L2#Nao. Irei esperar uns minutos...#l");
                    status = 9;
                }
            } else {
                if (cm.checkSquadLeader(MapleSquadType.SCARGA)) {
                    cm.sendSimple("O que voce gostaria de fazer?\r\n\r\n#b#L1#Ver a lista de participantes#l\r\n#L2#Abrir os registros para entrada#l\r\n#L3#Enfrentar o #eTarga/Scar#n!#l");
                    status = 19;
                } else if (cm.isSquadMember(MapleSquadType.SCARGA)) {
                    var noOfChars = cm.numSquadMembers(MapleSquadType.SCARGA);
                    var toSend = "#eAguarde ate que o lider inicie a batalha.\r\n#n\r\nOs participantes para enfrentar o #eTarga/Scar#n, sao:\r\n#b";
                    for (var i = 1; i <= noOfChars; i++) {
                        toSend += "\r\n#L" + i + "#" + cm.getSquadMember(MapleSquadType.SCARGA, i - 1).getName() + "#l";
                    }
                    cm.sendSimple(toSend);

                    cm.dispose();
                } else {
                    cm.sendOk("Lamento " + cm.getPlayer().getName() + ", mas o lider da batalha contra o #eScar/Targa#n desativou a entrada de novos participantes.");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                if (cm.createMapleSquad(MapleSquadType.SCARGA) != null) {
                    cm.sendOk("O grupo designado a enfrentar o #dScar/Targa#k foi criado!\r\nFale para os jogadores do seu grupo cadastrarem-se para poderem entrar.\r\n\r\nCaso voce queira fechar ou abrir os registros de participantes, fale comigo!");
                    cm.dispose();
                } else {
                    cm.sendOk("Houve um erro. Algum outro jogador ja criou um grupo antes de voce.");
                    cm.dispose();
                }
            } else if (selection == 2) {
                cm.sendOk("Certo. Criterio seu....");
                cm.dispose();
            }
        } else if (status == 10) {
            if (selection == 1) {
                if (cm.numSquadMembers(MapleSquadType.SCARGA) > 29) {
                    cm.sendOk("Lamento, mas ja existem 29 participantes para enfrentar o #dScar/Targa#k..");
                    cm.dispose();
                } else {
                    if (cm.canAddSquadMember(MapleSquadType.SCARGA)) {
                        cm.addSquadMember(MapleSquadType.SCARGA);
                        cm.sendOk("Aguarde as instrucoes do Lider do seu grupo..");
                        cm.dispose();
                    } else {
                        cm.sendOk("Lamento, mas o Lider ainda nao 'esta pronto' para enfrentar o #eTarga/Scar#n");
                        cm.dispose();
                    }
                }
            } else if (selection == 2) {
                cm.sendOk("Lamento, mas o Lider ainda nao 'esta pronto' para enfrentar o #eTarga/Scar#n");
                cm.dispose();
            }
        } else if (status == 20) {
            if (selection == 1) {
                var noOfChars = cm.numSquadMembers(MapleSquadType.SCARGA);
                var toSend = "Os participantes para enfrentar o #eTarga/Scar#n, sao:\r\n#b";
                for (var i = 1; i <= noOfChars; i++) {
                    if (i == 1)
                        toSend += "\r\n" + cm.getSquadMember(MapleSquadType.SCARGA, i - 1).getName();
                    else
                        toSend += "\r\n#L" + i + "#" + cm.getSquadMember(MapleSquadType.SCARGA, i - 1).getName() + "#l";
                //toSend += cm.getSquadMember(MapleSquadType.SCARGA, i - 1).getName();
                }
                //System.out.println(toSend);
                cm.sendOk(toSend);
            } else if (selection == 2) {
                if (cm.getSquadState(MapleSquadType.SCARGA) == 1) {
                    cm.setSquadState(MapleSquadType.SCARGA, 2);
                    cm.sendOk("Novos registros para enfrentar o #eTarga/Scar#n foram fechados. Para abrir novamente, fale comigo.");
                } else {
                    cm.setSquadState(MapleSquadType.SCARGA, 1);
                    cm.sendOk("Novos registros para enfrentar o #eTarga/Scar#n foram abertos. Para fechar novamente, fale comigo.");
                }
                cm.dispose();
            } else if (selection == 3) {
                cm.setSquadState(MapleSquadType.SCARGA, 2);
                cm.warpSquadMembers(MapleSquadType.SCARGA, 551030200);
				cm.getPlayer().getMap().resetReactors();
				cm.mapMessage("[Noticia] Para invocar Targa/Scarlion, adquira um Spirit of Fantasy Theme Park falando com Aldol.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(0, cm.getPlayer().getName() + " iniciou uma batalha contra o Scar/Targa, estando no canal " + cm.getPlayer().getClient().getChannel() + "."));
                status = 29;
            cm.dispose();
            }
        } else if (status == 21) {
            if (selection > 0) {
                cm.removeSquadMember(MapleSquadType.SCARGA, selection - 1, true);
                cm.sendOk("O membro selecionado foi removido..");
                cm.dispose();
            } else {
                if (cm.getSquadState(MapleSquadType.SCARGA) == 1) {
                    cm.sendSimple("O que voce gostaria de fazer?\r\n\r\n#L1#Ver a lista de participantes#l\r\n#L2#Fechar os registros de entrada#l\r\n#L3#Enfrentar o #eTarga/Scar#n!#l");
                } else {
                    cm.sendSimple("O que voce gostaria de fazer?\r\n\r\n#L1#Ver a lista de participantes#l\r\n#L2#Abrir os registros para entrada#l\r\n#L3#Enfrentar o #eTarga/Scar#n!#l");
                }
                status = 19;
            }
        } else if (status == 30) {
            //cm.warpSquadMembersClock(MapleSquadType.SCARGA, 551030200, 10800, 551030100); //Should have a clock and exit now :D
            var em = cm.getEventManager("ScargaBattle");
            if (em == null) {
                cm.sendOk("...");
                cm.dispose();
            }
            else {
                // Begin the PQ.
                em.startInstance(cm.getSquad(MapleSquadType.SCARGA), cm.getChar().getMap());
            }
            cm.dispose();
        }
    }
}