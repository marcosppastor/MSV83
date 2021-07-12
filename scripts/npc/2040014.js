/*
importPackage(Packages.server.maps);

var status = 0;
var rnk = 0;
var minLevel = 10;
var maxLevel = 2555;
var minJogadores = 1; //DEIXAR EM 3
var maxJogadores = 6;
 
function start() {
  status = -1;
        action(1, 0, 0);
}
 
function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (status >= 0 && mode == 0) {
                        cm.sendOk("Tudo bem. Até  próxima,Staff <3!");
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                    
	if (cm.getChar().getMap().getId() == 680000000) {	
        cm.getPlayer().getStorage().sendStorage(cm.getClient(), 9201042);
        cm.dispose();
	}		
    if (cm.getChar().getMap().getId() == 100000000) {
        if (status == 0) {
            cm.sendSimple("#rFeliz dia das crianças#k, mesmo que você já não seja mais uma. Que dia lindo não é mesmo?..\r\nFicamos felizes que você esteja passando este dia conosco!\r\n Então que tal brincarmos um pouco?, há diversos brinquedos espalhados pelo mundo maple, que tal se você recolhesse alguns para mim?, talvez em troca eu possa lhe dar algo totalmente raro, tenho a certeza que nunca ninguém usou !\r\n#L1#Como posso ajudar-lhe?#l\r\n#L2#Desejo obter minha recompensa .#l \r\n#L3#Retirar kit de dia das crianças .#l");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getLevel()>=10 || cm.getPlayer().isGM()) {
					if (cm.getParty() == null) { 
						cm.sendOk("Você não esta em um grupo.");
						cm.dispose();
						return;
					}
					if (!cm.isLeader()) { 
						cm.sendOk("Você não é o lider do grupo.");
						cm.dispose();
					}
                    var em = cm.getEventManager("CarnavalPQ");
						if (em == null) {
	                          cm.sendOk("Este evento esta indisponivel.");
		                } else {
							  var prop = em.getProperty("state");
							  if (prop == null || prop.equals("0")) {
								  em.startInstance(cm.getParty(),cm.getChar().getMap());
								  party = cm.getChar().getEventInstance().getPlayers();
								  cm.dispose();
								  } else {
									  cm.sendOk("Existe outro grupo dentro da PQ.");
									  cm.dispose();
								  }
					    }
                } else {
                    cm.sendOk("Para participar dessa missão, você precisa estar ao menos LV. 10 .");
                    cm.dispose();
                    return;
                }
            } else if (selection == 1) {
                cm.sendOk("Como eu lhe disse, há diversos brinquedos perdidos espalhados pelo mundo maple, e pretendemos resgatar todos eles!\r\nEstou a procura de guerreiros que possam me ajudar a recuperar estes brinquedos.\r\nPara que você possa entrar e obter sua recompensa, será necessário ter o nível 10 ou superior. Você podera conquistar sua recompensa coletando.\r\nTendo os item, fale comigo, pois somente assim lhe darei uma recompensa Derrote os monstros!\r\n\r\nItens necessários:  \r\n #i4000476# x2000 \r\n #i4031120# x1000 \r\n #i4031119# x1000 ");
                cm.dispose();
                status = 0;
        } else if (selection == 2) {
	     cm.sendSimple("Lembre-se: não há a necessidade de se ter mais de uma recompensa em seu inventário.\r\n\r\n#L43#Receber minha recompensa! \r\n #l");
	 
         } else if (selection == 3) {
             if (!cm.haveItem(1102160) && !cm.haveItem(1042172)) {
                       cm.gainItem (1102160,1,false,false,604800000);
                       cm.gainItem (1042172,1,false,false,604800000);
                       cm.gainItem (1062110,1,false,false,604800000);
                       cm.gainItem (1072324,1,false,false,604800000);
                       cm.gainItem (1002292,1,false,false,604800000);
                       cm.gainItem (1702193,1,false,false,604800000);



                   }
                   else {
                      cm.sendOk("Você ja possui o kit de evento.");

                   }

	 }
    }  else if (selection == 43) {
        if (cm.haveItem(1002980))  {
         
                    cm.sendOk("Você ja possui uma unidade desta premiação.");

        }
        else {
         if(cm.haveItem(4031119 , 1000) &&  cm.haveItem(4031120 , 1000) &&  cm.haveItem(4000476  , 2000) && cm.canHold(1012105) ) {
            cm.gainItem(1012105, 1);
            cm.gainItem(4031119, -1000);
            cm.gainItem(4031120, -1000);
            cm.gainItem(4000476, -2000);


           Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1012105 , "str", 5);
           Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1012105 , "dex", 5);
           Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1012105 , "int", 5);
           Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1012105 , "luk", 5);
           Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1012105 , "watk", 5);	
           Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1012105 , "matk", 5);
            
           cm.reloadChar();				
           cm.sendOk("Parabéns #h #!\r\nVocê ganhou um(a) #i1012105#.\r\n\r\n");
           cm.playerMessage("[Dia das crianças] Obrigado por participar deste evento!")
           cm.dispose();
           } else {
               cm.sendOk("Você não possui os itens necessários. Derrote os monstros!\r\n\r\nItens necessários: \r\n#i4000476# x2000 \r\n #i4031120# x1000 \r\n #i4031119# x1000 ");
               cm.dispose();
           }
        
      }}
  }}}

/*
 * @author Marcos P
 * TrueMS - 2016
 * NavioPQ - custom
 * truems.net/


var status = 0;
var minlvl = 100;
var maxlvl = 200;
var minplayers = 1;
var maxplayers = 2;
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
        cm.sendOk("Eu não estou disponivel no momento. Por hora, já existe guerreiros lutando.\r\nTente falar comigo em outro canal.");
        cm.dispose();
        } else {
            cm.sendSimple("Olá #h #, eu sou o Casey!\r\nTalvez não seja de seu interesse, mas... há boatos de que um Navio está sendo atacado por #eMonstros#n!\r\nPreciso de fortes guerreiros para me ajudar a expulsar estes malfeitores do Navio! Por acaso, você pode me ajudar?\r\n#b\r\n#b#L0#Eu e meu grupo desejamos lhe ajudar!#l#k\r\n#L3#O que fazer com o Gachapon Dourado (#i5220020#)?#l\r\n#L1#Como funciona essa missao?");
	 	}
        
        } else if (status == 1) {
            var em = cm.getEventManager("NavioPQ");
            if(selection == 0) {//ENTRAR
                if (!hasParty()) {//MONGOL SEM PT
                    cm.sendOk("Você não possui um grupo.");
                } else if (!isLeader()) {//NAO E LIDER
                    cm.sendOk("Você não é o lider do grupo. Peça para ele falar comigo!");
                } else if (!checkPartySize()) {//NAO POSSUI A QUANTIA MINIMA
                    cm.sendOk("Seu grupo precisa ter no minimo " + minplayers + " membros.");
                } else if (!checkPartyLevels()) {//LEVEIS INCOMPATIVEIS
                    cm.sendOk("Alguém do seu grupo não atende as exigencias de level " + minlvl + "~" + maxlvl + ".");
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
                cm.sendOk("Após certo tempo, chegara um terrivel monstro.\r\nA sua missão será destruir este monstro e manter a protecão do Navio.\r\nApós derrotar o Balrog, o Lider e somente ele ganhara um item para concluir a missão (Artefato valioso #i4001302#). Tendo este item, o mesmo devera falar com o Monóculo para entregar este item e eu vos liberar.");
                cm.dispose();
            } else if(selection == 3) {
				cm.sendOk("Completando a missão, você e seu grupo recebem um Cupom de Gachapon Dourado (#i5220020#). Tendo este, basta ir na Entrada do Mercado Livre e falar com a #bAgente E#k, pois ela trocara este cupom por ótimos items aleatorios!");
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
}
*/
/*
function start() {
//cm.gainItem()
cm.sendOk("Em que está pensando?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}

*/

/* 
 * Scripted by Daghlawi
 */ 


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("Volte se mudar de ideia.!");
        cm.dispose();
        return;
    }
    if (status == 0) {
            cm.sendSimple("Olá,sou o Casey, mestre dos jogos, através de mim você pode adquirir jogos para se divertir em #rTrue MapleStory #k com seus amigos! \n\
:\r\n #L1##i4080000# (999,999)  Fantasia Omok de Lesma e Cogumelo \r\n #L2##i4080001# (999,999) Fantasia Omok de Polvo e Lesma  \r\n #L3##i4080002# (999,999) Fantasia Omok de Porco e Lesma \r\n #L4##i4080003#(999,999) Fantasia Omok de Polvo e Cogumelo \r\n #L5##i4080004#(999,999) Fantasia Omok de Porco e Polvo \r\n #L6##i4080005#(999,999) Fantasia Omok de Porco e Cogumelo \r\n #L7##i4080006#(999,999) Fantasia Omok de Polvoso e Ursinho Rosa \r\n #L8##i4080007#(999,999) Fantasia Omok de Polvoso e Trapaceiro \r\n #L9##i4080008#(999,999) Fantasia Omok de Ursinho rosa e Trapaceiro \r\n #L10##i4080009#(999,999) Fantasia Omok de Ursinho Pnada e Polvoso \r\n #L11##i4080010#(999,999) Fantasia Omok de Ursinho Panda e Urso Rosa \r\n #L12##i4080011#(999,999) Fantasia Omok de Ursinho Panda  e Trapaceiro \r\n #L13##i4080100#(1,499,999) Um conjunto de Jogo da Memória");
      
      
    } else if (selection == 1 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080000);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
                      
      } else if (selection == 2 ) {
     if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080001);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            
            
            } else if (selection == 3 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080002);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            
            } else if (selection == 4 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080003);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
               
            
            } else if (selection == 5 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080004);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            } else if (selection == 6 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080005);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            } else if (selection == 7 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080006);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            } else if (selection == 8 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080007);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            } else if (selection == 9 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080008);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            } else if (selection == 10 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080009);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            } else if (selection == 11 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080010);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            } else if (selection == 12 ) {
      if (cm.getMeso() >= 999999) {
                     
            cm.gainMeso(-999999);
            cm.gainItem (4080011);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            } else if (selection == 13 ) {
      if (cm.getMeso() >= 1499999) {
                     
            cm.gainMeso(-1499999);
            cm.gainItem (4080003);
             cm.sendOk("Você adquiriu seu jogo com sucesso,divirta-se com seus amigos!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
            }                           
            
            
              
        
          
    

}
        
    
