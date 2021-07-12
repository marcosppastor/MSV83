/*
* @autor Java
* JS-Maple MapleStory Private Server
*/


/*
* @autor Java
* JS-Maple MapleStory Private Server
*/
/*
importPackage(Packages.client);
importPackage(Packages.server.maps);

  
    var status = 0;
    var tempo = new Date();
    var dia = tempo.getDay();
    var ano = tempo.getFullYear();
    var mes = tempo.getMonth();
    var data = tempo.getDate();
    var hora = tempo.getHours();
    var min = tempo.getMinutes();
    var seg = tempo.getSeconds();
    
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
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if(cm.getChar().getMapId()== 390009999){
			if (status == 0) {
				cm.sendNext("Bem vindo a missão do #bRico Dourado#k.");
			} else if (status == 1) {
				cm.sendSimple("O que deseja fazer?\r\n#b#L1#Trocar Letras#l#k\r\n#b#L2#Trocar Ovos de EXP#l#k\r\n#b#L3#Entrar na missão do Rico Dourado#l#k\r\n#b#L5#Trocar ovos por itens#l#k \r\n#b#L4#Outras informações#l#k \r\n#b#L6#Deixar o evento#l#k");
			} else if (selection == 1) {
                            if(cm.haveItem(3994102, 20) && cm.haveItem(3994103, 20) && cm.haveItem(3994104, 20) && cm.haveItem(3994105, 20)) {
                                 cm.gainItem(3994102 , -20);
                                 cm.gainItem(3994103, -20);
                                 cm.gainItem(3994104, -20);
                                 cm.gainItem(3994105, -20);
                                 cm.gainItem(2430008, 1);
                                 //cm.sendOk("Você acaba de receber a bussola!"); 
                                 cm.dispose();
                             } else {
                                 cm.sendOk("Para fazer a troca e necessário todas as letras.");
                                 cm.dispose();
                             }
                         } else if (selection == 2) {
                            ovosexp = cm.getPlayer().countItem(4001255);
                            if(ovosexp > 0) {
                                 cm.getPlayer().gainExpRichie();
                                 cm.gainItem(4001255, -1); 
                                 cm.dispose();
                             } else {
                                 cm.sendOk("Para fazer a troca é necessário ter o Ovo.");
                                 cm.dispose();
                             }
                        } else if (selection == 3) {
                               if (hora >= 8 && hora < 10 || hora >= 20 && hora < 22  || hora >= 15 && hora < 16){ 
                                         if(!cm.haveItem(2430008, 1)) {
                                            cm.sendOk("Você precisa da bussola para entrar!"); 
                                            cm.dispose();
                                            return;
                                         }
                                         cm.RichieEnter(cm.getC());
                                } else { 
				 cm.sendOk("Ainda não está no horário de funcionamento, verifique!");
                                 cm.dispose();
                        }
						
                    } else if (selection == 4) {
			cm.sendOk("O Rico Dourado está disponível das \r\n #b8:00 as 10:00 AM#k \r\n#b15:00 as 16:00 PM#k \r\n#b20:00 as 22:00 PM#k.\r\nPara entrar, é necessário uma bussola (#i2430008#). Você poderá obter a mesma, coletando 20 peças de letras\r\n#e(N,E,W,S)#n.\r\n\r\nA experiência obtida através dos ovos varia de acordo com o #blevel do personagem.\r\n\r\n #k Você também pode obter itens ao clicar duas vezes sobre determinados #bovos#k, caso estiver em busca de uma #bvariedade#k maior de itens,incusive itens raros,você podera juntar #b10 ovos #ke trocar comigo,lembre-se de que os itens vem de forma aleatória!");
                                 cm.dispose();
                        } else if (selection == 6) {
                                cm.warp(100000000,0);
                                cm.dispose();
                        }
                        
                        else if (selection == 5) {
                           
                         if(cm.haveItem(2022524, 20)) {

			cm.gainItem(2022524, -20);

			if (chance > 0 && chance <= 2) {
				cm.gainItem(icomum, 1);
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormal, 1);
			} else {
				cm.gainItem(iraro, 1);
			}
			cm.dispose();
		}
                       else {
            
             cm.sendOk("Você precisa ter no minimo 20 ovos para trocar!");

        }
                        }
                    }     
	
        
        
                          
                                                        

                  
                        
		 if(cm.getChar().getMapId()== 100000000){
			if (status==0) {
				cm.sendNext("Você gostaria de participar da Missão do Rico Dourado?");				
			} else if (status == 1){
                                if(cm.getPlayer().getLevel() > 9) {
                                    cm.getPlayer().saveLocation(SavedLocationType.RICHIE);
                                    cm.warp(390009999, 0);
                                    cm.dispose();
                                } else {
                                    cm.sendOk("Você precisa estar no minimo LV.10 .");
                                }
			}
		} 
	}
}	



*/

function start() {
//cm.gainItem()
cm.sendOk("#h #, em breve te levarei para conhecer minhas riquezas!");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}

