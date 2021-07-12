//Pirate Statue by Wodian

var status = 0;  

function start() {  
    status = -1;  
    action(1, 0, 0);  
}  

function action(mode, type, selection) {  
       
    if (mode == -1) {  
        cm.dispose();  
    }  
    else {   
        if (status >= 2 && mode == 0) {   
            cm.sendOk("Adeus");   
            cm.dispose();   
            return;   
        }   
          
        if (mode == 1) {  
            status++;  
        }      
        else {  
            status--;  
        }  
            if (status == 0) { 
            cm.sendNext("Se você quiser ir para nautilus,vamos lá!");
        }
        else if (status == 1) {
            cm.warp(120000100,0);//guess so... lol?
            cm.dispose();
            }
        }
    }  