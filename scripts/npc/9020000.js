
var status = 0;
var minLevel = 21; //arrumar
var maxLevel = 30; //arrumar
var minPlayers = 4;
var maxPlayers = 6;

var PQItems = new Array(4001007, 4001008);

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
		if (status == 0) {
			if (cm.getParty() == null) { 
				cm.sendOk("Que tal você e seu grupo terminarem uma missão juntos? Aqui você vai encontrar obstáculos e problemas que so poderão ser resolvidos em equipe. Se quiser tentar, peça ao #blíder do seu grupo#k para falar comigo.");
				cm.dispose();
                                return;
			} if (!cm.isLeader()) { 
				cm.sendSimple("Você não é o líder do grupo.");
				cm.dispose();
                                return;
                         } if (checkLevelsAndMap(minLevel, maxLevel) == 2) {  
	                          cm.sendOk("Acho que nem todos os membros do seu grupo estão presentes.");
                                  cm.dispose();
                                  return;
                         } else {
				var party = cm.getParty().getMembers();
				var mapId = cm.getChar().getMapId();
				var next = true;
				var levelValid = 0;
				var inMap = 0;
				var it = party.iterator();
				while (it.hasNext()) {
					var cPlayer = it.next();
					if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
						levelValid += 1;
					} else {
						next = false;
					}
					if (cPlayer.getMapId() == mapId) {
						inMap += 1;
					}
				}
				if (party.size() < minPlayers || party.size() > maxPlayers || inMap < minPlayers) 
					next = false;
				if (next) {
				  var em = cm.getEventManager("KerningPQ");
	                          if (em == null) {
	                          cm.sendOk("Este evento esta indisponivel.");
		                  } else {
		                  var prop = em.getProperty("state");
		                  if (prop == null || prop.equals("0")) {
				  em.startInstance(cm.getParty(),cm.getChar().getMap());
				  cm.dispose();
		                    } else {
		            	      cm.sendOk("Um outro grupo ja entrou para completar a missão. Por favor, tente mais tarde.");
                                      cm.dispose();
		                 }
		               }
	                 } else {
		                   cm.sendOk("Alguem no seu grupo não esta entre os niveis 21~30. Por favor, verifique novamente.");
                                   cm.dispose();
	                        }
			}
		}
		else {
			cm.sendOk("Dialogo perdido.");
			cm.dispose();
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

		
               
               
 /*

function start() {
cm.sendOk("Esta PQ encontra-se em manutenção !");
}

function action(m, t, s) {
   
   
   cm.dispose();
}
*/