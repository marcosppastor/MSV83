
 

importPackage(Packages.server.maps);
 
var status = 0;
var rnk = 0;
var minLevel = 10;
var maxLevel = 255;
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
			cm.sendOk("Tudo bem. Até a próxima!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (cm.getChar().getMap().getId() == 101030104 || cm.getChar().getMap().getId() == 990000000) {	
		    cm.sendOk("<Noticia>\r\nVocê faz parte de uma guild que possui uma grande quantidade de coragem e confiança? Em seguida, assumir o Guild Quest e desafie-se!\r\n\r\n#b Para participar :#k\r\n1. A Guild deve consistir em pelo menos 6 pessoas!\r\n2. O lider da grupo deve ser um Mestre ou um Mestre Jr. da Guild!\r\n3. A Guild Quest Quest pode terminar mais cedo se o numero de membros da guild participando for abaixo de 6, ou se o lider decide acabar cedo!");
            cm.dispose();
	    }
		if (cm.getChar().getMap().getId() == 910000000) {
			if (status == 0) {
				cm.sendSimple("                         #d#eVENDA SEU CASH NX AQUI! "+
				" #n#k\r\n\r\n\r\n\r\n Através de mim você pode vender seu #rCASH NX #k,sou o detentor dos mesos de True MapleStory e posso comprar determinadas quantias de cash.\r\n\\r\n\ Por acaso tem interesse em negociar comigo? #b\r\n#L1#Ver planos \r\n#L2#Para que utilizar este serviço? ");
}  else if (selection == 1) {
            cm.sendSimple("Qual plano você quer utilizar?#b\r\n\r\n\#L3#Vender 5k de NX (35M)\r\n\r\n\#L4#Vender 10 de NX (80M)\r\n\r\n\#L5#Vender 20k de NX (200M)\r\n\r\n\#L6# Vender 55k de NX (500M)");                            
                            
				
				}
                                
    else if (selection == 2) {
            cm.sendSimple("O meu serviço visa oferecer uma oportunidade aos jogadores que necessitam da moeda oficial de MapleStory #r(Mesos)#k com urgência,infelizmente não posso negociar meu preço,ele é estável porém pode variar de acordo com a economia do jogo!");                            
                            
				
				}
                                
                                else if (selection == 3) {
                                         if (cm.getPlayer().getCashShop().getCash(1) >= 5000) {
                                                                           
                   cm.sendOk("#e#dParabéns!#n#k\r\n#dsua venda foi concluida com sucesso.");
                   cm.getPlayer().getCashShop().gainCash(1, -5000);    
                   cm.gainMeso(35000000);
                   cm.dispose();
                                                                               
                                         }

                            else { cm.sendOk("Tem certeza que possui cash suficiente para utilizar meus serviços? ");
                            cm.dispose();

                            
                }
				
				}
                                
                                else if (selection == 4) {
                                         if (cm.getPlayer().getCashShop().getCash(1) >= 10000) {
                                                                           
                   cm.sendOk("#e#dParabéns!#n#k\r\n#dsua venda foi concluida com sucesso.");
                   cm.getPlayer().getCashShop().gainCash(1, -10000);    
                   cm.gainMeso(80000000);
                   cm.dispose();
                                                                               
                                         }

                            else { cm.sendOk("Tem certeza que possui cash suficiente para utilizar meus serviços? ");
                            cm.dispose();

                            
                }
				
				}
                                
                                
                                else if (selection == 5) {
                                         if (cm.getPlayer().getCashShop().getCash(1) >= 20000) {
                                                                           
                   cm.sendOk("#e#dParabéns!#n#k\r\n#dsua venda foi concluida com sucesso.");
                   cm.getPlayer().getCashShop().gainCash(1, -20000);    
                   cm.gainMeso(200000000);
                   cm.dispose();
                                                                               
                                         }

                            else { cm.sendOk("Tem certeza que possui cash suficiente para utilizar meus serviços? ");
                            cm.dispose();

                            
                }
				
				}
                                
                                
                              else if (selection == 6) {
                                         if (cm.getPlayer().getCashShop().getCash(1) >= 55000) {
                                                                           
                   cm.sendOk("#e#dParabéns!#n#k\r\n#dsua venda foi concluida com sucesso.");
                   cm.getPlayer().getCashShop().gainCash(1, -55000);    
                   cm.gainMeso(500000000);
                   cm.dispose();
                                                                               
                                         }

                            else { cm.sendOk("Tem certeza que possui cash suficiente para utilizar meus serviços? ");
                            cm.dispose();

                            
                }
				
				}
                                
                                  
                                
                                
                                
                                
                                
			}
                    }	}



