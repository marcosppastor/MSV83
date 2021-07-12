
/*
var status = 0;
var minlvl = 10;
var maxlvl = 200;
var minplayers = 1;
var maxplayers = 1;
var time = 10;
var on = true;
var open = true;

var comum = Array(3010005, 3010006, 3010007, 1442057, 3010011, 3010015,2049100,2040933,2040924,2040924,2040930,2040931,2040932,2040933 );
var normal = Array(2043701,2043801,2049100,2040306,2040304,2040205,2040029,2040501,2070005,1082150,1432009,1432013,1472054,1472053,1302106,2020023,2020022,2040008,2040009,2040010,2040011,2040012,2040013,2040014,2040015,2040016,2040017,20400118,2040304,2040305,2040306,2040307,2040308,2040317,2040318,2040319,2040320,2040321,2040322,2040323,2040324,2040325,2040326,2040327,2040328,2040610,2040611,2040623,2040624,2040625,2040626,2040627,2040915,2040918,2044701,2070005,2100000,2100001,2100002,2100003,2100004,2100005,2100006,2100007,2100009,2100016,3010008 ,3010009 ,3010010,3010012 ,3010013 ,3010016 ,3010017,3010040  );
var raro = Array(2049100,2043705,2049100,2044701,2044702,2044704,2040758,2040760,2040306,2040304,2040205,2040413,2070006,1102043,1102040,1082145,1082146,1082147,1082148,2040921,2040915,2012008,1332053,2044910,2044817,2044713,2044613,2044513,2044420,2044320,2044220,2044120,2044028,2043813,2043713,2043313,2043220,2043120,2043022,2041068, 2041069,2040943,2040833,2040834,2040755,2040756,2040757,2040629,2040542,2040543,2040429,2040333,2040045,2040046,2101204,2101205,2101206,2290125,2290096,2290093 ,2290069 ,2290061,2290049 ,2290048, 2290041 ,2290047 ,2290023,2290085 ,2290084,2290093  );


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
    } else if (mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;	
        if (cm.haveItem(4001126,100)){

        if (status == 0) {
        if (on == false) {
        cm.sendOk("Eu não estou disponivel no momento. Por hora, já existe guerreiros lutando.\r\nTente falar comigo em outro canal.");
        cm.dispose();
        } else {
            cm.sendSimple("Viva ao brasil!, #h #, eu sou o seu assistente de evento!\r\n #r Independência ou morte! #k A data oficial para a comemoração da #b Independência do Brasil #k é 7 de Setembro de 1822, dia em que ,as margens do rio #b Ipiranga #k, em São Paulo quando D.Pedro deu o grito da independência!\r\n \r\n Preciso de fortes guerreiros para me ajudar!\r\n\r\n Colete dois tipos de jóias diferentes e troque por itens, basta Iniciar o evento,cada vez você irá a um mapa diferente e enfrentará um boss diferente!\r\n#b\r\n#b#L0#Realizar o desafio de indepedência!#l\r\n  #L2#Matei o monstro final,quero minha jóia!#l\r\n #L3#Desistir e largar o brasil!#l\r\n#L10#Trocar as jóias por item!#l\r\n");
	 	}
        
        } else if (status == 1 ) {
            
                               
                
                if ( cm.getLevel()>500){
            
                }
                
               else if (cm.getLevel()<0){
               
              // var em = cm.getEventManager("PaisPQMedia");
           } 
           else if (cm.getLevel()>10 && !hasItem){
               
               var em = cm.getEventManager("PaisPQFacil");
           }
                
                else if (hasItem){
               
               var em = cm.getEventManager("PaisPQMedia");
           }
           
           
                if(selection == 0 ) {//ENTR
                     
                if (!hasParty()) {//MONGOL SEM PT
                    cm.sendOk("Você não possui um grupo.");
                } else if (!isLeader()) {//NAO E LIDER
                    cm.sendOk("Você não é o lider do grupo. Peça para ele falar comigo!");
                } else if (!checkPartySize()) {//NAO POSSUI A QUANTIA MINIMA
                    cm.sendOk("Seu grupo precisa ter no minimo " + minplayers + " membros.");
                } else if (em == null) {//ERRO NO EVENTO
                    cm.sendOk("Ocorreu um erro.\r\nPor favor, relate este para algum Moderador!");
                } else if (cm.getChar().getMapId()> 100000000 ||cm.getChar().getMapId()< 100000000){
                    cm.sendOk("Eu não estou disponivel neste mapa.");
                                
                    } else if (!open){
                    cm.sendOk("Eu não estou disponivel no momento.");
                }
                    
                    else {
                    em.startInstance(cm.getParty(), cm.getChar().getMap());
                    var party = cm.getChar().getEventInstance().getPlayers();
                   // cm.removeFromParty(4001302, party);
                }
                cm.dispose();
                                
                    } 
                               
                              
                
                
                    else if(selection == 1) {
       	                  cm.sendOk("O evento consiste em duas etapas: \r\n \r\n\ A #b1°#k visa dar mobilidade ao jogador fazendo com que o mesmo conheça todos os cantos de MapleStory, por tanto você deve coletar alguns itens. \r\n\ #b2°#k A segunda etapa sera a fase de boss, mata-lo significa que você é um vencedor!");
                cm.dispose();
            } else if(selection == 2 && cm.getChar().getMapId()== 683000000) {
                if( cm.countMonster() == 0 )  {
                   var eim = cm.getPlayer().getEventInstance();
                    cm.gainItem(4001024);
                    cm.gainItem(4001126,-100);
                    cm.warp(100000000);
                    eim.disbandParty();
                    cm.mapMessage(6,"Agradecemos sua partipação no evento!")

                  
                } else {
                    cm.sendOk("Você não matou o boss ou você não esta no mapa do BOSS!")
                }
                
                               
                
                              
                
                
                }           
                
                
                 else if(selection == 2 && cm.getChar().getMapId()== 970000004) {
                if( cm.countMonster() == 0 )  {
                   var eim = cm.getPlayer().getEventInstance();
                    cm.gainItem(4001163 );
                    cm.gainItem(4001126,-100);
                    cm.warp(100000000);
                    eim.disbandParty();
                    cm.mapMessage(6,"Agradecemos sua partipação no evento!")

                  
                } else {
                    cm.sendOk("Você não matou o boss ou você não esta no mapa do BOSS!")
                }
                
                }           
                             
                
                
                
                
                
                
                 else if(selection == 3) {
                    var eim = cm.getPlayer().getEventInstance();
                    cm.warp(100000000);
                    eim.disbandParty();
                    
                cm.dispose();
           }
           
           else if(selection == 10) {
                    if (cm.haveItem(4001163,1) && cm.haveItem(4001024,1)){
                        cm.gainItem(4001163,-1);
                        cm.gainItem(4001024,-1);
                        
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
                                   cm.sendOk("Você não possui duas jóias diferentes!")

           }
    }
    
        }else {
            
                               cm.sendOk("Por favor colete os seguintes itens para que a segunda etapa do evento seja liberada: \r\n\\r\n\ #i4001126# x100  \r\n\ \r\n\ Tendo os itens volte e fale comigo parar liberar a proxima etapa, jamais jogue fora os itens!");
                          cm.dispose();

        }
}
    }

   
  
function getPartySize(){
    if(cm.getPlayer().getParty() == null){
        return 0;
    }else{
        return (cm.getPlayer().getParty().getMembers().size());
    }
}

function isLeader(){
    return cm.isLeader();
}

function checkPartySize(){
    var size = 0;
    if(cm.getPlayer().getParty() == null){
        size = 0;
    }else{
        size = (cm.getPlayer().getParty().getMembers().size());
    }
    if(size < minplayers || size > maxplayers){
        return false;
    }else{
        return true;
    }
}

function checkPartyLevels(){
    var pass = true;
    var party = cm.getPlayer().getParty().getMembers();
    if(cm.getPlayer().getParty() == null){
        pass = false;
    }else{
        for (var i = 0; i < party.size() && pass; i++) {
            if ((party.get(i).getLevel() < minlvl) || (party.get(i).getLevel() > maxlvl) || (party.get(i).getMapid() != cm.getMapId())) {
                pass = false;
            }
        }
    }
    return pass;
}

function hasParty(){
    if(cm.getPlayer().getParty() == null){
        return false;
    }else{
        return true;
    }
}

function hasItem(){
    if(cm.haveItem(4001024)){
        return false;
    }else{
        return true;
    }
}
}
*/

function start() {
//cm.gainItem()
cm.sendOk("Olá #h #, tudo bem?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}
