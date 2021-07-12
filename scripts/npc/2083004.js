/*
 * @author Marcos P
 * TrueMS - 2016
 * Horntail - Exped.
 * truems.net/
*/
/*
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
            if (cm.getSquadState(MapleSquadType.HORNTAIL) == 0) {
                cm.sendSimple("Voce e seu time desejam enfrentar o tenebroso #rHorntail#k?\r\n#b#L1#Sim, desejamos!#l\r\n\#L2#Nao. Irei esperar uns minutos...#l");
            } else if (cm.getSquadState(MapleSquadType.HORNTAIL) == 1) {
                if (cm.checkSquadLeader(MapleSquadType.HORNTAIL)) {
                    cm.sendSimple("O que voce gostaria de fazer?#b\r\n\r\n#L1#Ver a lista de participantes#l\r\n#L2#Fechar os registros de entrada#l\r\n#L3#Enfrentar o #eHorntail#n!#l");
                    status = 19;
                } else if (cm.isSquadMember(MapleSquadType.HORNTAIL)) {
                    var noOfChars = cm.numSquadMembers(MapleSquadType.HORNTAIL);
                    var toSend = "Os seguintes jogadores estao participando para enfrentar o #eHorntail#n:\r\n#b";
                    for (var i = 1; i <= noOfChars; i++) {
                        toSend += "\r\n#L" + i + "#" + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l";
                    }
                    cm.sendSimple(toSend);
                    cm.dispose();
                } else {
                    cm.sendSimple("Voce e seu time desejam enfrentar o tenebroso #rHorntail#k?\r\n#b#L1#Sim, desejamos!#l\r\n\#L2#Nao. Irei esperar uns minutos...#l");
                    status = 9;
                }
            } else {
                if (cm.checkSquadLeader(MapleSquadType.HORNTAIL)) {
                    cm.sendSimple("O que voce gostaria de fazer?\r\n\r\n#b#L1#Ver a lista de participantes#l\r\n#L2#Abrir os registros para entrada#l\r\n#L3#Enfrentar o #eHorntail#n!#l");
                    status = 19;
                } else if (cm.isSquadMember(MapleSquadType.HORNTAIL)) {
                    var noOfChars = cm.numSquadMembers(MapleSquadType.HORNTAIL);
                    var toSend = "Os seguintes jogadores estao participando para enfrentar o #eHorntail#n:\r\n#b";
                    for (var i = 1; i <= noOfChars; i++) {
                        toSend += "\r\n#L" + i + "#" + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l";
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
                if (cm.createMapleSquad(MapleSquadType.HORNTAIL) != null) {
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
                if (cm.numSquadMembers(MapleSquadType.HORNTAIL) > 29) {
                    cm.sendOk("Lamento, mas ja existem 29 participantes para enfrentar o Horntail..");
                    cm.dispose();
                } else {
                    if (cm.canAddSquadMember(MapleSquadType.HORNTAIL)) {
                        cm.addSquadMember(MapleSquadType.HORNTAIL);
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
                var noOfChars = cm.numSquadMembers(MapleSquadType.HORNTAIL);
                var toSend = "Os seguintes jogadores estao participando para enfrentar o #eHorntail#n:\r\n#b";
                for (var i = 1; i <= noOfChars; i++) {
                    if (i == 1)
                        toSend += "\r\n" + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName();
                    else
                        toSend += "\r\n#L" + i + "#" + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l";
                //toSend += cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName();
                }
                //System.out.println(toSend);
                cm.sendOk(toSend);
            } else if (selection == 2) {
                if (cm.getSquadState(MapleSquadType.HORNTAIL) == 1) {
                    cm.setSquadState(MapleSquadType.HORNTAIL, 2);
                    cm.sendOk("Novos registros para enfrentar o #eHorntail#n foram fechados. Para abrir novamente, fale comigo.");
                } else {
                    cm.setSquadState(MapleSquadType.HORNTAIL, 1);
                    cm.sendOk("Novos registros para enfrentar o #eHorntail#n foram abertos. Para fechar novamente, fale comigo.");
                }
                cm.dispose();
            } else if (selection == 3) {
                cm.setSquadState(MapleSquadType.HORNTAIL, 2);
                cm.sendOk("Agora sim voces estao prontos para enfrentar o #eHorntail#n.");
                cm.warpSquadMembers(MapleSquadType.HORNTAIL, 240060200);
				cm.mapMessage(6, "Quebre o cristal para fazer o Horntail emergir!");
				cm.mapMessage(6, "Caso nao haja um cristal, troque de canal e tente novamente.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(0, cm.getPlayer().getName() + " iniciou uma batalha contra o Horntail, estando no canal" + cm.getPlayer().getClient().getChannel() + "."));
                status = 29;
            cm.dispose();
            }
        } else if (status == 21) {
            if (selection > 0) {
                cm.removeSquadMember(MapleSquadType.HORNTAIL, selection - 1, true);
                cm.sendOk("O membro selecionado foi removido..");
                cm.dispose();
            } else {
                if (cm.getSquadState(MapleSquadType.HORNTAIL) == 1) {
                    cm.sendSimple("O que voce gostaria de fazer?\r\n\r\n#L1#Ver a lista de participantes#l\r\n#L2#Fechar os registros de entrada#l\r\n#L3#Enfrentar o #eHorntail#n!#l");
                } else {
                    cm.sendSimple("O que voce gostaria de fazer?\r\n\r\n#L1#Ver a lista de participantes#l\r\n#L2#Abrir os registros para entrada#l\r\n#L3#Enfrentar o #eHorntail#n!#l");
                }
                status = 19;
            }
        } else if (status == 30) {
            //cm.warpSquadMembersClock(MapleSquadType.HORNTAIL, 240060200, 10800, 211042300); //Should have a clock and exit now :D
            var em = cm.getEventManager("HontaleSquad");
            if (em == null) {
                cm.sendOk("...");
                cm.dispose();
            }
            else {
                // Begin the PQ.
                em.startInstance(cm.getSquad(MapleSquadType.HORNTAIL), cm.getChar().getMap());
            }
            cm.dispose();
        }
    }
}
*/

/* 
* @Author Stereo
* Adobis - El Nath: Entrance to Zakum Altar (211042400)
* Start of Zakum Bossfight
*/

var status;
var minLevel = 120;
var state;
var maxPlayers = 30;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
		status++;
        if (mode == 0 && status == 0) {
			cm.sendOk("Até mais!");
            cm.dispose();
            return;
        }
        if (status == 0) {
            
             if (cm.getPlayer().getLevel() < 120) {
			cm.sendOk("Existe um requisito de nível superior a 120 para desafiar o HornTail.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getClient().getChannel() !=3) {
			cm.sendOk("O HornTail só pode ser desafiado no canal 3.");
			cm.dispose();
			return;
		}
            if (cm.getPlayer().getLevel() < minLevel && !cm.getPlayer().isGM()) {
                cm.warp(240050400);
                cm.sendOk("Volte quando estiver preparado para enfrentar o HornTail!\r\nPara que você possa participar, requer-se que voce seja no minimo #eLV. 120#n.");
                cm.dispose();
                return;
            }
            //if(cm.getBossLog('ZAKUM') > 50) {
            //	cm.sendOk("You have entered the Zakum Altar more than 50 times today. You may not enter until tomorrow.");
            //	cm.dispose();
            //	return;
            //  }
            
            
            
            
            cm.sendSimple("A batalha contra o HornTailt comeca aqui!\r\nO que voce gostaria de fazer?#b\r\n#L0#Iniciar a Batalha contra o HornTail#l\r\n#L1#Entrar em um Grupo que esteja lutando contra o HornTail#l");
        }
        else if (status == 1) {
            state = selection;
            if (selection == 0) {
                            var em = cm.getEventManager("HontaleSquad");
		            var prop = em.getProperty("state");

                if (prop == null || prop.equals("0")) {
                                    cm.sendGetText("Para ir ate o HornTail, voce precisara escolher um nome para a instancia da sua batalha. Esta sera basicamente a senha de acesso para que outras pessoas possam lhe ajudar, entrando em sua batalha por meio da senha.");
		                    } else {
		            	      cm.sendOk("Existe outro grupo dentro da PQ.");
                                      cm.dispose();
		                 }
		                    
		               
                
	
        
            }
            else if (selection == 1) {//Join
                cm.sendGetText("Para participar de uma batalha, voce precisara da senha da instancia criada. Caso voce nao saiba, pergunte ao lider do grupo que esta a batalhar.");
		}
        }
        else if (status == 2) {
            var em = cm.getEventManager("HontaleSquad");
            var passwd = cm.getText();
            if (em == null)
                cm.sendOk("Esta missão esta temporariamente desativada.");
            else {
                if (state == 0) { // Leader
                    if (getEimForString(em,passwd) != null)
                        cm.sendOk("Você não pode usar esta senha para sua instancia.");
                    else {
                        var eim = em.newInstance("Horn" + passwd);
                        em.startInstance(eim,cm.getPlayer().getName());
                        eim.registerPlayer(cm.getPlayer());
                    //	cm.setBossLog('ZAKUM');
					    cm.dispose();
                    }
                }
                if (state == 1) {
                    var eim = getEimForString(em,passwd);
                    if (eim == null)
                        cm.sendOk("Nao ha nenhuma batalha registrada com este nome.");
					    //cm.dispose();
                    else {
                        if (eim.getProperty("canEnter").toLowerCase() == "true") {
                            if (eim.getPlayers().size() < maxPlayers)
                                eim.registerPlayer(cm.getPlayer());
                            //  cm.setBossLog('ZAKUM');
                            else
                                cm.sendOk("Lamento, mas esta batalha ja esta cheia de participantes. Inicie uma ou aguarde vaga.");
                        }
                        else
                            cm.sendOk("Lamento, mas esta batalha ja esta em progresso. Aguarde ate o fim desta.");
                    }
                }
            }
        }
    }
}

function getEimForString(em, name) {
    var stringId = "Horn" + name;
    return em.getInstance(stringId);
}