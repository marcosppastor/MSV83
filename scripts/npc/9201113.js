/*
 * @author Marcos P
 * TrueMS - 2016
 * Horntail - Exped.
 * truems.net/


importPackage(java.lang);
importPackage(Packages.server);
 
var status = 0;

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
        if (status == 0) {
            if (cm.getSquadState(MapleSquadType.CWPQ) == 0) {
                cm.sendSimple("Voce e seu time desejam enfrentar o tenebroso #rHorntail#k?\r\n#b#L1#Sim, desejamos!#l\r\n\#L2#Nao. Irei esperar uns minutos...#l");
            } else if (cm.getSquadState(MapleSquadType.CWPQ) == 1) {
                if (cm.checkSquadLeader(MapleSquadType.CWPQ)) {
                    cm.sendSimple("O que voce gostaria de fazer?#b\r\n\r\n#L1#Ver a lista de participantes#l\r\n#L2#Fechar os registros de entrada#l\r\n#L3#Enfrentar o #eHorntail#n!#l");
                    status = 19;
                } else if (cm.isSquadMember(MapleSquadType.CWPQ)) {
                    var noOfChars = cm.numSquadMembers(MapleSquadType.CWPQ);
                    var toSend = "Os seguintes jogadores estao participando para enfrentar o #eHorntail#n:\r\n#b";
                    for (var i = 1; i <= noOfChars; i++) {
                        toSend += "\r\n#L" + i + "#" + cm.getSquadMember(MapleSquadType.CWPQ, i - 1).getName() + "#l";
                    }
                    cm.sendSimple(toSend);
                    cm.dispose();
                } else {
                    cm.sendSimple("Voce e seu time desejam enfrentar o tenebroso #rHorntail#k?\r\n#b#L1#Sim, desejamos!#l\r\n\#L2#Nao. Irei esperar uns minutos...#l");
                    status = 9;
                }
            } else {
                if (cm.checkSquadLeader(MapleSquadType.CWPQ)) {
                    cm.sendSimple("O que voce gostaria de fazer?\r\n\r\n#b#L1#Ver a lista de participantes#l\r\n#L2#Abrir os registros para entrada#l\r\n#L3#Enfrentar o #eHorntail#n!#l");
                    status = 19;
                } else if (cm.isSquadMember(MapleSquadType.CWPQ)) {
                    var noOfChars = cm.numSquadMembers(MapleSquadType.CWPQ);
                    var toSend = "Os seguintes jogadores estao participando para enfrentar o #eHorntail#n:\r\n#b";
                    for (var i = 1; i <= noOfChars; i++) {
                        toSend += "\r\n#L" + i + "#" + cm.getSquadMember(MapleSquadType.CWPQ, i - 1).getName() + "#l";
                    }
                    cm.sendSimple(toSend);
                    cm.dispose();
                } else {
                    cm.sendOk("Lamento mas o lider do grupo cancelou novos registros.");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                if (cm.createMapleSquad(MapleSquadType.CWPQ) != null) {
                    cm.sendOk("O grupo para enfrentar o #rHorntail#k foi criado!\r\nFale para os jogadores do seu grupo cadastrarem-se para poderem entrar.\r\n\r\nCaso voce queira fechar ou abrir os registros de participantes, fale comigo!");
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
                if (cm.numSquadMembers(MapleSquadType.CWPQ) > 29) {
                    cm.sendOk("Lamento, mas ja existem 29 participantes para enfrentar o Horntail..");
                    cm.dispose();
                } else {
                    if (cm.canAddSquadMember(MapleSquadType.CWPQ)) {
                        cm.addSquadMember(MapleSquadType.CWPQ);
                        cm.sendOk("Aguarde as instrucoes do Lider do seu grupo..");
                        cm.dispose();
                    } else {
                        cm.sendOk("Lamento, mas o Lider ainda nao 'esta pronto' para enfrentar o #eHorntail#n");
                        cm.dispose();
                    }
                }
            } else if (selection == 2) {
                cm.sendOk("Lamento, mas o Lider ainda nao 'esta pronto' para enfrentar o #eHorntail#n");
                cm.dispose();
            }
        } else if (status == 20) {
            if (selection == 1) {
                var noOfChars = cm.numSquadMembers(MapleSquadType.CWPQ);
                var toSend = "Os seguintes jogadores estao participando para enfrentar o #eHorntail#n:\r\n#b";
                for (var i = 1; i <= noOfChars; i++) {
                    if (i == 1)
                        toSend += "\r\n" + cm.getSquadMember(MapleSquadType.CWPQ, i - 1).getName();
                    else
                        toSend += "\r\n#L" + i + "#" + cm.getSquadMember(MapleSquadType.CWPQ, i - 1).getName() + "#l";
                //toSend += cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName();
                }
                //System.out.println(toSend);
                cm.sendOk(toSend);
            } else if (selection == 2) {
                if (cm.getSquadState(MapleSquadType.CWPQ) == 1) {
                    cm.setSquadState(MapleSquadType.CWPQ, 2);
                    cm.sendOk("Novos registros para enfrentar o #eHorntail#n foram fechados. Para abrir novamente, fale comigo.");
                } else {
                    cm.setSquadState(MapleSquadType.CWPQ, 1);
                    cm.sendOk("Novos registros para enfrentar o #eHorntail#n foram abertos. Para fechar novamente, fale comigo.");
                }
                cm.dispose();
            } else if (selection == 3) {
                cm.setSquadState(MapleSquadType.CWPQ, 2);
                cm.sendOk("Agora sim voces estao prontos para enfrentar o #eHorntail#n.");
                cm.warpSquadMembers(MapleSquadType.CWPQ, 610030100 );
				cm.mapMessage(6, "Quebre o cristal para fazer o Horntail emergir!");
				cm.mapMessage(6, "Caso nao haja um cristal, troque de canal e tente novamente.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(0, cm.getPlayer().getName() + " iniciou uma batalha contra o Horntail, estando no canal" + cm.getPlayer().getClient().getChannel() + "."));
                status = 29;
            cm.dispose();
            }
        } else if (status == 21) {
            if (selection > 0) {
                cm.removeSquadMember(MapleSquadType.CWPQ, selection - 1, true);
                cm.sendOk("O membro selecionado foi removido..");
                cm.dispose();
            } else {
                if (cm.getSquadState(MapleSquadType.CWPQ) == 1) {
                    cm.sendSimple("O que voce gostaria de fazer?\r\n\r\n#L1#Ver a lista de participantes#l\r\n#L2#Fechar os registros de entrada#l\r\n#L3#Enfrentar o #eHorntail#n!#l");
                } else {
                    cm.sendSimple("O que voce gostaria de fazer?\r\n\r\n#L1#Ver a lista de participantes#l\r\n#L2#Abrir os registros para entrada#l\r\n#L3#Enfrentar o #eHorntail#n!#l");
                }
                status = 19;
            }
        } else if (status == 30) {
            //cm.warpSquadMembersClock(MapleSquadType.HORNTAIL, 240060200, 10800, 211042300); //Should have a clock and exit now :D
            var em = cm.getEventManager("CWKPQ");
            if (em == null) {
                cm.sendOk("...");
                cm.dispose();
            }
            else {
                // Begin the PQ.
                em.startInstance(cm.getSquad(MapleSquadType.CWPQ), cm.getChar().getMap());
            }
            cm.dispose();
        }
    }
}

*/
/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
//cm.gainItem()
cm.sendOk("A CWKPQ está indisponivel no momento,aguarde próximas atualizações!");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}