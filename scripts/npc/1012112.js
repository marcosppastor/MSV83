/*
* @autor Java
* LeaderMS MapleStory Private Server
* HenesysPQ
*/


/* Variaveis */
var texto = "#dOlá, eu sou a Tory. Em época de lua cheia o coelho vem fazer bolinhos de arroz. Growlie quer bolinhos de arroz, então é melhor ir ajudá-lo ou ele irá te comer!#b\r\n#L0#Desejo participar da missão!!";
var map = 390009999;
var status = 0;
var minLevel = 10;
var maxLevel = 200;
var minPlayers = 1;
var maxPlayers = 6;

var PQItems = new Array(4001095, 4001096, 4001097, 4001098, 4001099, 40011000);
/* Fim */


function start() {
	status = -1;
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
		if(cm.getChar().getMapId()==100000200){
			if (status == 0) {
				cm.sendSimple(texto);
			} else if (status == 1) {
				// Slate has no preamble, directly checks if you're in a party
				if (cm.getParty() == null) { // no party
					cm.sendOk("Você precisa estar em algum grupo.");
					cm.dispose();
					return;
				}
				if (!cm.isLeader()) { // not party leader
					cm.sendOk("Você não é o lider do grupo.");
					cm.dispose();
				} if (checkLevelsAndMap(minLevel, maxLevel) == 2) { // not party leader  
	                          cm.sendOk("Está faltando alguém do grupo no mapa!");
                                  cm.dispose();
                                  return;
                                }  else {
					// Check teh partyy
					var party = cm.getParty().getMembers();
					var mapId = cm.getChar().getMapId();
					var next = true;
					var levelValid = 0;
					var inMap = 0;
					// Temp removal for testing
					if (party.size() < minPlayers || party.size() > maxPlayers) 
						next = false;
					else {
						for (var i = 0; i < party.size() && next; i++) {
							if ((party.get(i).getLevel() >= minLevel) && (party.get(i).getLevel() <= maxLevel))
								levelValid += 1;
							if (party.get(i).getMapId() == mapId)
								inMap += 1;
						}
						if (levelValid < minPlayers || inMap < minPlayers)
							next = false;
					}  if (next) {
		                  var em = cm.getEventManager("HenesysPQ");
	                          if (em == null) {
	                          cm.sendOk("Este evento está indisponivel.");
		                  } else {
		                  var prop = em.getProperty("state");
		                  if (prop == null || prop.equals("0")) {
		                    em.startInstance(cm.getParty(),cm.getChar().getMap());
                            party = cm.getChar().getEventInstance().getPlayers();
			                cm.dispose();
		                    } else {
								cm.sendOk("Outro grupo já está fazendo esta missão!");
                                cm.dispose();
		                    }
		               }
	                 } else {
		    cm.sendOk("Seu grupo parece nao estar conforme o dito, verifique se tem entre 3/6 jogadores em seu grupo e se eles tem o nivel de 10/200!");
                    cm.dispose();
	       }
	  }
     }
   } else if(cm.getChar().getMapId() == 910010400){
              if (status == 0){
               for (var i = 0; i < PQItems.length; i++) {
				cm.removeAll(PQItems[i]);
                            } 
                cm.warp(100000200, 0);
                //cm.playerMessage("Você foi levado para o Mapa das missões.");
                cm.dispose();
            }
        } else if (cm.getPlayer().getMapId() == 910010100) {
            if (status==0) {
                cm.sendYesNo("Você deseja voltar para Henesys?");
            }else if (status == 1){
               for (var i = 0; i < PQItems.length; i++) {
				cm.removeAll(PQItems[i]);
                            } 
                cm.warp(100000200, 0);
                cm.dispose();
            }
        }
    }
}
					
function checkLevelsAndMap(lowestlevel, highestlevel) {
    var party = cm.getParty().getMembers();
    var mapId = cm.getMapId();
    var valid = 0;
    var inMap = 0;

    var it = party.iterator();
    while (it.hasNext()) {
        var cPlayer = it.next();
        if (!(cPlayer.getLevel() >= lowestlevel && cPlayer.getLevel() <= highestlevel) && cPlayer.getJobId() != 900) {
            valid = 1;
        }
        if (cPlayer.getMapId() != mapId) {
            valid = 2;
        }
    }
    return valid;
}
		
                