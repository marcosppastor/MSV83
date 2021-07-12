
/*
var status = -1;

var comum = Array(3010005, 3010006, 3010007, 1442057, 3010011, 3010015,2049100,2040933,2040924,2040924,2040930,2040931,2040932,2040933 );
var normal = Array(2043701,2043801,2049100,2040306,2040304,2040205,2040029,2040501,2070005,1082150,1432009,1432013,1472054,1472053,1302106,2020023,2020022,2040008,2040009,2040010,2040011,2040012,2040013,2040014,2040015,2040016,2040017,20400118,2040304,2040305,2040306,2040307,2040308,2040317,2040318,2040319,2040320,2040321,2040322,2040323,2040324,2040325,2040326,2040327,2040328,2040610,2040611,2040623,2040624,2040625,2040626,2040627,2040915,2040918,2044701,2070005,2100000,2100001,2100002,2100003,2100004,2100005,2100006,2100007,2100009,2100016);
var raro = Array(2049100,2043705,2049100,2044701,2044702,2044704,2040758,2040760,2040306,2040304,2040205,2040413,2070006,1102043,1102040,1082145,1082146,1082147,1082148,2040921,2040915,2012008,1332053,2044910,2044817,2044713,2044613,2044513,2044420,2044320,2044220,2044120,2044028,2043813,2043713,2043313,2043220,2043120,2043022,2041068, 2041069,2040943,2040833,2040834,2040755,2040756,2040757,2040629,2040542,2040543,2040429,2040333,2040045,2040046,2101204,2101205,2101206 );


function getRandom(min, max) {
	if (min > max) {
		return(-1);
	}

	if (min == max) {
		return(min);
	}

	return(min + parseInt(Math.random() * (max - min + 1)));
}

var icomum = comum[getRandom(0, comum.length - 1)];
var inormal = normal[getRandom(0, normal.length - 1)];
var iraro = raro[getRandom(0, raro.length - 1)];

var chance = getRandom(0, 5);

function start() {
	status = -1;
	action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
		return;
	}
	status--;
    }
    	if (status == 0) {
                if(cm.getPlayer().getLevel() >0 && cm.getPlayer().getLevel() <30) {
	        cm.sendSimple("Olá  Sou a Bruxa Malady e estou aqui para deixar o seu #r Halloween #k animado e divertido, que tal enfrentar um grande desafio e receber inumeras recompensas, então gostaria desafiar olivia?.#b\r\n\r\n#L0#Ir desafiar olivia - Facil (Nìvel 10)#l \r\n\r\n#L4#Trocar item por recompensas (Random)");
            }else if (cm.getPlayer().getLevel() >=30 && cm.getPlayer().getLevel() <70) {

            cm.sendSimple("Olá  Sou a Bruxa Malady e estou aqui para deixar o seu #r Halloween #k animado e divertido, que tal enfrentar um grande desafio e receber inumeras recompensas, então gostaria desafiar olivia?.#b\r\n\r\n#L1#Ir desafiar olivia - Médio (Nìvel 30)#l \r\n\r\n#L4#Trocar item por recompensas (Random)#l");
          }else if (cm.getPlayer().getLevel() >=70) {

            cm.sendSimple("Olá  Sou a Bruxa Malady e estou aqui para deixar o seu #r Halloween #k animado e divertido, que tal enfrentar um grande desafio e receber inumeras recompensas, então gostaria desafiar olivia?.#b\r\n\r\n#L2#Ir desafiar olivia - Dificil (Nìvel 70)#l \r\n\r\n#L4#Trocar item por recompensas (Random)#l");
          }
        } else if (status == 1) {
            
                    var em = cm.getEventManager("Olivia");
    		    if (em == null) {
			cm.sendOk("Por favor, tente novamente mais tarde");
			cm.dispose();
			return;
    		    }
                    
                       else if(selection==4) { 
                           
                           if(cm.haveItem(4000385)){
                if (chance > 0 && chance <= 2) {
				cm.gainItem(icomum, 1);
                                cm.gainItem(4000385,-1);

			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormal, 1);
                                cm.gainItem(4000385,-1);

			} else {
				cm.gainItem(iraro, 1);
                                cm.gainItem(4000385,-1);

			}
                           }
                           else if (!cm.haveItem(4000385)){
                             cm.sendOk("Você tem certeza que possui o item necessário para esta troca? \r\n\r\n Item; #i4000385#");

                           }
                         
                       }
                       
                       
                       
		 else if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
			cm.sendOk("O líder do grupo deve estar aqui.");
		    } else {
			var s = selection;
			var party = cm.getPlayer().getParty().getMembers();
			var mapId = cm.getPlayer().getMapId();
			var next = true;
			var size = 0;
			var it = party.iterator();
			while (it.hasNext()) {
				var cPlayer = it.next();
				var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
				if (ccPlayer == null || ccPlayer.getLevel() < (s == 0 ? 10 : (s == 1 ? 30 : 70))) {
					next = false;
					break;
				}
				size++;
			}	
			if (next && size >= 1) {
		    		if (em.getInstance("Olivia" + 0) == null) {
					em.startInstance_Party("" + s, cm.getPlayer());
		    		} else {
					cm.sendOk("Outro grupo já entrou neste canal.");
		    		}
			} else {
				cm.sendOk("Todos os membros do seu grupo precisam estar aqui.");
			}
		    }
                    
                    
	        cm.dispose();
                
                
                
                
                
                            }
            
			
}
*/
function start() {
//cm.gainItem()
cm.sendOk("Aaah o Halloween..");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}