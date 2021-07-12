var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
	status++;
    else
	status--;
    
        var party = cm.getChar().getEventInstance().getPlayers();
    if (status == 0 ) {
        			var eim = cm.getPlayer().getEventInstance();

	cm.removeAll(4001117);
	cm.removeAll(4001120);
	cm.removeAll(4001121);
	cm.removeAll(4001122);
	cm.sendSimple("#eParabéns por chegar até aqui e salvar o Navio!~#n\r\n#b#L0#Me tire daqui.#l\r\n#L1#Obter o chápeu de pirata.#l#k \r\n#L2##rAtualizar meu chápeu.#l#k");
    } else if (status == 1) {
	if (selection == 0) {
           

		if (!cm.canHold(4031435)) {
			cm.sendOk("Deixe um espaço no ETC.");
			cm.dispose();
			return;
		}
                				var eim = cm.getChar().getEventInstance();

		cm.gainItem(4031435 , 1);
	    //cm.addTrait("will", 15);
	    //cm.gainExp_PQ(120, 2.0);
	    //cm.getPlayer().endPartyQuest(1204);
	    cm.warp(925100700 ,0);
          cm.getPlayer().getCashShop().gainCash(2, 50);
	    cm.givePartyExp(5000, party);
            eim.finishPQ();
            eim.disbandParty();


    cm.playerMessage("Você ganhou 50 pontos Maple como bonificação!")
        }
        
        
    
    
        
        	else if (selection == 1) {
                    		    if (cm.haveItem(4031435 , 30) && !cm.haveItem(1002571) && cm.canHold(1002571)) {
                                        cm.gainItem(1002571);
                                        cm.gainItem(4031435,-20);

                                    }
                                    else {
                                       cm.sendOk("Parece que você já possui um chapéu do Nível I, ou, não possui os 30 fragmentos de chapéu de pirata.Lembre-se de deixar um espaço livre em seu #bEQUIP #k.");

                                    }
                }
                
                        	else if (selection == 2) {
                                    if (cm.haveItem(4031435 , 50) && !cm.haveItem(1002574)){
                                        
                                        
                                       if (cm.haveItem(4031435 , 50) && cm.haveItem(1002571)) {
                                        cm.gainItem(1002572);
                                        cm.gainItem(1002571,-1);
                                        cm.gainItem(4031435,-50);
                                        
                                       }   else if (cm.haveItem(4031435 , 50) && cm.haveItem(1002572)) {
                                           
                                       cm.gainItem(1002573);
                                       cm.gainItem(1002572,-1);
                                       cm.gainItem(4031435,-50);

                     
                                    }  else if (cm.haveItem(4031435 , 50) && cm.haveItem(1002573)) {
                                           
                                       cm.gainItem(1002574);
                                       cm.gainItem(1002573,-1);
                                       cm.gainItem(4031435,-50); 
                                
        }
                                }
                            else {
                                cm.sendOk("Você já possui o melhor chápeu ou não possui 50 fragmentos de chápeu de pirata para evolução!")
                                    
                            }

                }
                
    

}
    }
                
        