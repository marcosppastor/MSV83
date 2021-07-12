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
    if (cm.getChar().getMap().getId() == 100000000 || cm.getChar().getMap().getId() == 924010000) {
        if (status == 0) {
                if (cm.getChar().getMap().getId() == 100000000) {

            cm.sendSimple("#rHappy Halloween#k, esta pronto para mais um evento?..\r\nGarantimos que sera maravilhoso aproveitar nossos eventos!\r\n Então que tal brincarmos um pouco?, Há diversos doces espalhados por ai,você ja deve ter notado?, pegue alguns para mim e me ajude a enfrentar o perigoso boss abobora, talvez em troca eu possa lhe dar algo totalmente raro, um item muito especial !\r\n#L0#Enfrentar o boss abobora \r\n#L1#Como posso ajudar-lhe?#l\r\n#L2#Desejo obter minha recompensa .#l \r\n#L3#Retirar kit especial de halloween.#l");
                }
                
                
                 if (cm.getChar().getMap().getId() == 924010000){
                                
                    cm.sendSimple("#rHappy Halloween#k, esta pronto para mais um evento?..\r\nGarantimos que sera maravilhoso aproveitar nossos eventos!\r\n Então que tal brincarmos um pouco?, Há diversos doces espalhados por ai,você ja deve ter notado?, talvez em troca eu possa lhe dar algo totalmente raro, um item muito especial !\r\n  #L5#Desejo sair deste mapa, enfrentei meu inimigo#l");

                
                }
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
                cm.sendOk("Então que tal brincarmos um pouco?, Há diversos doces espalhados por ai,você ja deve ter notado?, pegue alguns para mim e me ajude a enfrentar o perigoso #rboss abobora#k, talvez em troca eu possa lhe dar algo totalmente raro, um item muito especial! ");
                cm.dispose();
                status = 0;
        } else if (selection == 2) {
	     cm.sendSimple("Lembre-se: tenha espaço em seu inventário.\r\n\r\n#L43#Receber minha recompensa! \r\n #l");
	 
         } 
         else if(selection == 5 ) {
                   var eim = cm.getPlayer().getEventInstance();
                    cm.warp(100000000);
                    eim.disbandParty();
                    cm.mapMessage(6,"Agradecemos sua partipação em nosso Halloween!")
         }
                else if (selection == 3) {
             if (!cm.haveItem(1052172) && !cm.haveItem(1702092)) {
                       cm.gainItem (1052172,1,false,false,604800000);
                       cm.gainItem (1702092,1,false,false,604800000);
                       cm.gainItem (1002544,1,false,false,604800000);
                       cm.gainItem (1102066,1,false,false,604800000);
                       cm.gainItem (1082079,1,false,false,604800000);
                       cm.gainItem (1070003,1,false,false,604800000);



                   }
                   else {
                      cm.sendOk("Você ja possui o kit do evento.");

                   }

	 }
    }  else if (selection == 43) {
        if (cm.haveItem(999999999))  {
         
                    cm.sendOk("Você ja possui uma unidade desta premiação.");

        }
        else {
         if(cm.haveItem(4032435,1) &&  cm.haveItem(4032444  ,500) &&  cm.haveItem(4032445, 500) && cm.haveItem(4032446,500) && cm.canHold(1032049) ) {
            cm.gainItem(1032049 , 1);
            cm.gainItem(4032435 , -1);
            cm.gainItem(4032444, -500);
            cm.gainItem(4032445, -500);
            cm.gainItem(4032446, -500);


           Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1032049  , "watk", 1);	

           cm.reloadChar();				
           cm.sendOk("Parabéns #h #!\r\nVocê ganhou um(a) #i1032049# especial de halloween.\r\n\r\n");
           cm.playerMessage("[Evento de Hallowen] Obrigado por participar deste evento!")
           cm.dispose();
           } else {
               cm.sendOk("Você não possui os itens necessários. Derrote os monstros!\r\n\r\nItens necessários: \r\n#i4032435# x1 \r\n #i4032446# x500 \r\n #i4032445# x500 \r\n #i4032444# x500 ");
               cm.dispose();
           }
        
      }}
  }}}
  
  */
 
 function start() {
//cm.gainItem()
cm.sendOk("Bem vindo ao centro de comunicação #rGoogle#k.   ");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}