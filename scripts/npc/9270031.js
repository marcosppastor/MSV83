function start() {  
    status = -1;  
    action(1, 0, 0);  
}  

function action(mode, type, selection) {  
    if (mode == 1)  
        status++;  
    else {  
        cm.sendOk("Ok, Tem certeza disso?, não poderei te ajudar quando estiver em #rIlha Victoria#k!");  
        cm.dispose();  
        return;  
    }  
    if (status == 0) {     
        cm.sendSimple("Hmm,vejamos um novato , você gostaria de receber uma ajuda para auxiliar na sua jornada em #rTrue Maplestory? #k\r\n\r\n #L0# Sim,gostaria!"); 
         
          
    } else if (selection == 0) { 
        if (cm.getMeso() >= 15000 || cm.haveItem(1072092) || cm.haveItem (1302024) || cm.haveItem (1432000) || cm.haveItem (2000003) || cm.haveItem (2000001)  || cm.haveItem (1452051) || cm.haveItem (1382000) || cm.haveItem (1372043) || cm.haveItem (1492000) || cm.haveItem (1482000)) {
         cm.sendOk("Você esta tentando me enganar ? siga seu caminho!"); 
     
        }
        
        else {
    cm.sendSimple("O que você pretende ser em MapleStory ? \r\n\r\n #L1#Guerreiro/Dawn Warrior#l \r\n #L2#Arqueiro/Wind Archer#l \r\n #L3#Mago/Blaze Wizzard#l \r\n #L4#Gatuno/NightWalker #l \r\n  #L5#Pirata/Thunder Breaker#l \r\n #L6# Guerreiro Aran#l"); 
     
        }
        
    } if (selection == 1) { 
    cm.sendOk("Então é  essa sua escolha, boa sorte!"); 
    cm.gainItem(1302024, 1);  
    cm.gainItem(1432000, 1); 
    cm.gainItem(2000003, 150); 
    cm.gainItem(2000001, 150); 
    cm.gainItem(1002280,1,false,false,604800000 ); 
    cm.gainItem(1042145,1,false,false,604800000 ); 
    cm.gainItem(1062083,1,false,false,604800000 );
    cm.gainItem(1072092,1,false,false,604800000 ); 
    cm.gainItem (1112300,1,false,false,604800000);



        
     
    } else if (selection == 2) { 
    cm.sendOk("Então é  essa sua escolha, boa sorte!"); 
    cm.gainItem(1452051, 1); 
    cm.gainItem(2060001, 5000); // Arrows  
    cm.gainItem(2061003, 5000); // X-Box arrows. 
    cm.gainItem(2000003, 150); 
    cm.gainItem(2000001, 150); 
    cm.gainItem(1002280,1,false,false,604800000 ); 
    cm.gainItem(1042145,1,false,false,604800000 ); 
    cm.gainItem(1062083,1,false,false,604800000 );
    cm.gainItem(1072092,1,false,false,604800000 ); 
    cm.gainItem (1112300,1,false,false,604800000);



         
     
    } else if (selection == 3) {  
    cm.sendOk("Então é  essa sua escolha, boa sorte!"); 
    cm.gainItem(1382000, 1); 
    cm.gainItem(1372043, 1); 
    cm.gainItem(2000003, 150); 
    cm.gainItem(2000001, 150); 
    cm.gainItem(1002280,1,false,false,604800000 ); 
    cm.gainItem(1042145,1,false,false,604800000 ); 
    cm.gainItem(1062083,1,false,false,604800000 );
    cm.gainItem(1072092,1,false,false,604800000 ); 
    cm.gainItem (1112300,1,false,false,604800000);


        
     
    } else if (selection == 4) {  
    cm.sendOk("Então é  essa sua escolha, boa sorte!"); 
    cm.gainItem(1472000, 1); 
    cm.gainItem(2070001, 5000); // Stars  
    cm.gainItem(2000003, 150); 
    cm.gainItem(2000001, 150); 
    cm.gainItem(1002280,1,false,false,604800000 ); 
    cm.gainItem(1042145,1,false,false,604800000 ); 
    cm.gainItem(1062083,1,false,false,604800000 );
    cm.gainItem(1072092,1,false,false,604800000 ); 
    cm.gainItem (1112300,1,false,false,604800000);


      
     
    } else if (selection == 5) {  
    cm.sendOk("Então é  essa sua escolha, boa sorte!"); 
    cm.gainItem(1492000, 1); 
    cm.gainItem(1482000, 1); 
    cm.gainItem(2330000, 5000); // No Idea. 
    cm.gainItem(2000003, 150); 
    cm.gainItem(2000001, 150); 
    cm.gainItem(1002280,1,false,false,604800000 ); 
    cm.gainItem(1042145,1,false,false,604800000 ); 
    cm.gainItem(1062083,1,false,false,604800000 );
    cm.gainItem(1072092,1,false,false,604800000 ); 
    cm.gainItem (1112300,1,false,false,604800000);


        
     
    
    } else if (selection == 6) {  
    cm.sendOk("Então é  essa sua escolha, boa sorte!"); 
    cm.gainItem(1442077, 1); 
    cm.gainItem(2000003, 150); 
    cm.gainItem(2000001, 150); 
    cm.gainItem(1002280,1,false,false,604800000 ); 
    cm.gainItem(1042145,1,false,false,604800000 ); 
    cm.gainItem(1062083,1,false,false,604800000 );
    cm.gainItem(1072092,1,false,false,604800000 ); 
    cm.gainItem (1112300,1,false,false,604800000);


        
    } 
}  