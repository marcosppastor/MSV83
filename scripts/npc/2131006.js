/*
 * @author Marcos P
 * TrueMS - 2016
 * NavioPQ - custom
 * truems.net/


var status = 0;
var minlvl = 10;
var maxlvl = 200;
var minplayers = 1;
var maxplayers = 1;
var time = 10;
var on = true;
var open = true;


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
        
        
        if (status == 0) {
        if (on == false) {
            
        cm.sendOk("Eu não estou disponivel no momento. Há alguém realizando este evento.\r\nTente falar comigo em outro canal.");
        cm.dispose();
        } else  {
            cm.sendSimple("Feliz dias dos pais #h #, eu sou o seu assistente de evento!\r\nTalvez não seja de seu interesse participar, mas... caso  tenha interesse em me ajudar, gostaria de ser libertado há um terrivel #eMonstro#n me mantendo como refém,posso contar com sua ajuda?!\r\nPreciso de fortes guerreiros para me ajudar!\r\n#b\r\n#b#L0#Eu ajudarei!#l#k\r\n#L3#Como realizar este evento?#l\r\n");
	 	}
        
        } else if (status == 1 && cm.getPlayer().getLevel()>=120) {
            var em = cm.getEventManager("PaisPQ");
        
        
                                     
            }  else if(selection == 0){   
                
                    em.startInstance(cm.getParty(), cm.getChar().getMap());
                    var party = cm.getChar().getEventInstance().getPlayers();
                    cm.removeFromParty(4031488,party);
                }
           
             else if(selection == 3 && cm.getPlayer().getLevel()>=120 ) {
       	                  cm.sendOk("O evento consiste em duas etapas: \r\n \r\n\ A 1° visa dar mobilidade ao jogador fazendo com que o mesmo conheça todos os cantos de MapleStory, por tanto você deve coletar os seguintes itens para que a segunda etapa seja liberada: \r\n\\r\n\ #i4000147# x100\r\n\ #i4000149# x150 \r\n\ #i4000234# x100 \r\n\ #i4000268# x100 \r\n\ #i4001126# x1000  \r\n\ \r\n\ Tendo os itens volte e fale comigo liberar a proxima etapa!");
                cm.dispose();
           } 
           else if(selection == 3 && cm.getPlayer().getLevel()>=70 && cm.getPlayer().getLevel()<120 ) {
       	                  cm.sendOk("O evento consiste em duas etapas: \r\n \r\n\ A 1° visa dar mobilidade ao jogador fazendo com que o mesmo conheça todos os cantos de MapleStory, por tanto você deve coletar os seguintes itens para que a segunda etapa seja liberada: \r\n\\r\n\ #i4000177# x100\r\n\ #i4000149# x150 \r\n\ #i4000234# x100 \r\n\ #i4000268# x100 \r\n\ #i4001126# x1000  \r\n\ \r\n\ Tendo os itens volte e fale comigo liberar a proxima etapa!");
                cm.dispose();
            }
               // } else {
                    
                   //cm.sendOk("Por favor colete os seguintes itens para que a segunda etapa seja liberada: \r\n\\r\n\ #i4000147# x100\r\n\ #i4000149# x150 \r\n\ #i4000234# x100 \r\n\ #i4000268# x100 \r\n\ #i4001126# x1000  \r\n\ \r\n\ Tendo os itens volte e fale comigo liberar a proxima etapa!");

                    
                }
}
   
  
  */
 
 /*
 * @author Marcos P
 * TrueMS - 2016
 * NavioPQ - custom
 * truems.net/
*/
/*

var status = 0;
var minlvl = 100;
var maxlvl = 200;
var minplayers = 1;
var maxplayers = 6;
var time = 10;
var on = true;
var open = true;

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
        
        if (cm.haveItem(4000147,100) && cm.haveItem(4000149,150) && cm.haveItem(4000234,100) && cm.haveItem(4001126,1000) && cm.haveItem(4000268,100)){
        if (status == 0) {
            
        if (on == false) {
        cm.sendOk("Eu não estou disponivel no momento. Por hora, já existe guerreiros lutando.\r\nTente falar comigo em outro canal.");
        cm.dispose();
        } else {
            cm.sendSimple("Feliz dias dos pais #h #, eu sou o seu assistente de evento!\r\nTalvez não seja de seu interesse participar, mas... caso  tenha interesse em me ajudar, gostaria de ser libertado há um terrivel #eMonstro#n me mantendo como refém,posso contar com sua ajuda?!\r\nPreciso de fortes guerreiros para me ajudar!\r\n#b\r\n#b#L0#Eu ajudarei!#l#k\r\n #L3#Como realizar este evento?#l\r\n");
	 	}
        
        } else if (status == 1) {
            var em = cm.getEventManager("PaisPQ");
            if(selection == 0) {//ENTRAR
                if (cm.getLevel()>10){
                }
                
                 else if (em == null) {//ERRO NO EVENTO
                    cm.sendOk("Ocorreu um erro.\r\nPor favor, relate este para algum Moderador!");
                } else if (!open){
                    cm.sendOk("Eu não estou disponivel no momento.");
                } else {
                    em.startInstance(cm.getParty(), cm.getChar().getMap());
                    var party = cm.getChar().getEventInstance().getPlayers();
                    cm.removeFromParty(4001302, party);
                }
                cm.dispose();
            }         } else if(selection == 3) {
       	                  cm.sendOk("O evento consiste em duas etapas: \r\n \r\n\ A 1° visa dar mobilidade ao jogador fazendo com que o mesmo conheça todos os cantos de MapleStory, por tanto você deve coletar os seguintes itens para que a segunda etapa seja liberada: \r\n\\r\n\ #i4000147# x100\r\n\ #i4000149# x150 \r\n\ #i4000234# x100 \r\n\ #i4000268# x100 \r\n\ #i4001126# x1000  \r\n\ \r\n\ Tendo os itens volte e fale comigo liberar a proxima etapa!");
                cm.dispose();
           }
        } else {
            
                   cm.sendOk("Por favor colete os seguintes itens para que a segunda etapa seja liberada: \r\n\\r\n\ #i4000147# x100\r\n\ #i4000149# x150 \r\n\ #i4000234# x100 \r\n\ #i4000268# x100 \r\n\ #i4001126# x1000  \r\n\ \r\n\ Tendo os itens volte e fale comigo liberar a proxima etapa!");
               
        }          cm.dispose();
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
}
*/

/*
 * @author Marcos P
 * TrueMS - 2016
 * NavioPQ - custom
 * truems.net/
*/
/*
var status = 0;
var minlvl = 10;
var maxlvl = 200;
var minplayers = 1;
var maxplayers = 1;
var time = 10;
var on = true;
var open = true;

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
            cm.sendSimple("Viva ao brasil!, #h #, eu sou o seu assistente de evento!\r\n #r Independência ou morte! #k A data oficial para a comemoração da #b Independência do Brasil #k é 7 de Setembro de 1822, dia em que ,as margens do rio #b Ipiranga #k, em São Paulo quando D.Pedro deu o grito da independência!\r\n \r\n Preciso de fortes guerreiros para me ajudar!\r\n#b\r\n#b#L0#Realizar o primeiro desafio!#l\r\n #L4#Realizar o segundo desafio!#l#k\r\n #L5#Realizar o terceiro desafio!#l\r\n#L1#Como realizar este evento?#l\r\n #L2#Matei o monstro final,quero minha jóia!#l\r\n #L3#Desistir e largar o brasil!#l\r\n");
	 	}
        
        } else if (status == 1 ) {
            
            if ( selection==1){
            var em = cm.getEventManager("PaisPQ");
        }
           
           else if (cm.haveItem(4001024,1)){
               
               var em = cm.getEventManager("PaisPQMedia");
           }
                
                else if (cm.haveItem(4031482 ,1)){
               
               var em = cm.getEventManager("PaisPQFacil");
           }
                if(selection == 0) {//ENTRAR
                if (!hasParty()) {//MONGOL SEM PT
                    cm.sendOk("Você não possui um grupo.");
                } else if (!isLeader()) {//NAO E LIDER
                    cm.sendOk("Você não é o lider do grupo. Peça para ele falar comigo!");
                } else if (!checkPartySize()) {//NAO POSSUI A QUANTIA MINIMA
                    cm.sendOk("Seu grupo precisa ter no minimo " + minplayers + " membros.");
                } else if (em == null) {//ERRO NO EVENTO
                    cm.sendOk("Ocorreu um erro.\r\nPor favor, relate este para algum Moderador!");
                } else if (!open){
                    cm.sendOk("Eu não estou disponivel no momento.");
                } else {
                    em.startInstance(cm.getParty(), cm.getChar().getMap());
                    var party = cm.getChar().getEventInstance().getPlayers();
                    cm.removeFromParty(4001302, party);
                }
                cm.dispose();
                                
            } else if(selection == 1) {
       	                  cm.sendOk("O evento consiste em duas etapas: \r\n \r\n\ A #b1°#k visa dar mobilidade ao jogador fazendo com que o mesmo conheça todos os cantos de MapleStory, por tanto você deve coletar alguns itens. \r\n\ #b2°#k A segunda etapa sera a fase de boss, mata-lo significa que você é um vencedor!");
                cm.dispose();
            } else if(selection == 2) {
                if(cm.getChar().getMapId()== 300000010 && cm.countMonster() == 0)  {
                   var eim = cm.getPlayer().getEventInstance();

                    cm.gainItem (5010002,1,false,false,604800000);
                    cm.gainItem(4001126,-100);
                    cm.warp(100000000);
                    eim.disbandParty();
                    cm.mapMessage(6,"Agradecemos sua partipação no evento!")


                  
                } else {
                    cm.sendOk("Você não matou o boss ou você não esta no mapa do BOSS!")
                }
                
                } else if(selection == 3) {
                    var eim = cm.getPlayer().getEventInstance();
                    cm.warp(100000000);
                    eim.disbandParty();
                    
                cm.dispose();
           }
    }
        }else {
            
                               cm.sendOk("Por favor colete os seguintes itens para que a segunda etapa do evento seja liberada: \r\n\\r\n\ #i4001126# x100  \r\n\ \r\n\ Tendo os itens volte e fale comigo parar liberar a proxima etapa, jamais jogue fora os itens!");
                          cm.dispose();

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
}
*/

function start() {
//cm.gainItem()
cm.sendOk("Quando poderei voltar?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}
