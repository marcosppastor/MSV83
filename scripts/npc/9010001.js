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
        cm.sendOk("Volte quando mudar de idéia!");
        cm.dispose();
        return;
    }
    if (status == 0) {
            cm.sendSimple("Olá #h #, eu sou a Tia, tudo bem?\r\nTrabalho com vendas de lojas variadas para facilitar o comércio entre os jogadores!\r\n\r\nConfira nossos preços super em conta:\r\n #L1##i5030000# (500.000) #t5030000#\r\n#L2##i5030002# (500.000) #t5030002#\r\n#L3##i5030004# (500.000) #t5030004#\r\n#L4##i5030008# (1.000000) #t5030008#");
      
      
    } else if (selection == 1 ) {
      if (cm.getMeso() >= 500000) {
                     
            cm.gainMeso(-500000);
            cm.gainItem (5030000,1,false,false,604800000);
             cm.sendOk("A loja A casa de cogumelo dos elfos tem duração de 7 dias. Boas vendas!");
            cm.dispose();
            
        }  else {
            
            cm.sendOk("Você não possui mesos suficientes para a compra");
            cm.dispose();
        }
                      
      } else if (selection == 2 ) {
      if (cm.getMeso() >= 500000) {
                     
            cm.gainMeso(-500000);
            cm.gainItem (5030002,1,false,false,604800000);
             cm.sendOk("A loja Atendente do ursinho de pelucia tem duração de 7 dias. Boas vendas!");
            cm.dispose();   
            
        }     else {
            
            cm.sendOk("Você não poussui mesos suficientes para a compra");
            cm.dispose();
        }
            
            
            } else if (selection == 3 ) {
      if (cm.getMeso() >= 500000) {
                     
            cm.gainMeso(-500000);
            cm.gainItem (5030004,1,false,false,604800000);
             cm.sendOk("A loja Estande do Robô tema duração de 7 dias. Boas vendas!");
            cm.dispose();   
            
             }     else {
            
            cm.sendOk("Você não poussui mesos suficientes para a compra");
            cm.dispose();
        }
            
            } else if (selection == 4 ) {
      if (cm.getMeso() >= 1000000) {
                     
            cm.gainMeso(-1000000);
            cm.gainItem (5030008 ,1,false,false,604800000);
             cm.sendOk("A loja Cafeteria caseira tem duração de 7 dias. Boas vendas!");
            cm.dispose();   
        }
        
             else {
            
            cm.sendOk("Você não poussui mesos suficientes para a compra");
            cm.dispose();
        }
            }   
            
            
              
        
          
    

}
        
    
