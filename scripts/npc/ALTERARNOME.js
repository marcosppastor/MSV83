var status = 0; 
var selected; 

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else { 
        if (mode == 0) { 
            cm.sendOk("Later."); 
            cm.dispose(); 
            return; 
        } 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
            cm.sendGetText("Escolha um nome de seu interesse.");
        } else if (status == 1) { 
            selected = cm.getText(); 
            cm.sendYesNo("Voce realmente deseja passar a se chamar " + selected + ", #h #?"); 
        } else if (status == 2) { 
                if (cm.canCreate(cm.getText())) {  
                    if (cm.getText().length() < 14 && cm.getText().length() > 4) {  
                        cm.getPlayer().setName(selected); 
                        cm.reloadChar(); 
                        cm.sendOk("#ePronto!#n\r\nO seu nome agora e " + selected + "!"); 
                        cm.dispose(); 
            } else { 
                cm.sendOk("Lamento, mas seu nome precisa ter entre #r4-16#k caracteres "); 
                cm.dispose(); 
            } 
            } else { 
            cm.sendOk("Seu novo nome possui caracteres especiais/invalidos.");  
            } 
        }  
    } 
} 