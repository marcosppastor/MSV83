/*
function start() {  
    status = -1;  
    action(1, 0, 0);  
}  

function action(mode, type, selection) {  
    if (mode == 1)  
        status++;  
    else {  
        cm.sendOk("Ok, Tem certeza disso?");  
        cm.dispose();  
        return;  
    }  
    if (status == 0) {     
        cm.sendSimple("Bem-vindo ao dia da #b Independência #k de #rTrue Maplestory #k  Gostaria de retirar nosso kit de caracterização do brasil ?\r\n\r\n #L0# Sim,gostaria!"); 
         
          
    } else if (selection == 0) { 
        if ( cm.haveItem (1702069) || cm.haveItem (1012035) || cm.haveItem (1052061)) {
         cm.sendOk("Você já retirou seu kit!"); 
     
        }
        else{
            cm.gainItem(1702069,1,false,false,604800000 ); 
            cm.gainItem(1012035,1,false,false,604800000 ); 
            cm.gainItem(1052058,1,false,false,604800000 ); 
            cm.gainItem(1052061,1,false,false,604800000 );
            cm.gainItem(1072266 ,1,false,false,604800000 ); 



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
