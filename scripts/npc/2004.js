var status = 0; 


function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else { 
        if (mode == 0 && status == 0) { 
            cm.dispose(); 
            return; 
        } 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
            cm.sendYesNo(" Hello #b#h ##k, do you wan to change your gender ? It takes you only 50mill to change . "); 
        } else if (status == 1) { 
                if (cm.getChar().getGender() == 0) { 
                    if (cm.getMeso() > 50000000) { 
                        cm.getChar().setGender(1); 
                        cm.gainMeso(-50000000); 
                        cm.sendOk(" You have changed your gender . Come back again to change back . HappyMapling .\r\n#d Note: You have to change channels for it to take effect. "); 
                        cm.dispose(); 
                        cm.reloadChar(); 
                    } else { 
                        cm.sendOk("Sorry you do not have 50mill mesos. Train harder.."); 
                        cm.dipose(); 
                    } 

                } else if (cm.getChar().getGender() == 1) { 
                    if (cm.getMeso() > 50000000) { 
                        cm.getChar().setGender(0); 
                        cm.gainMeso(-50000000); 
                        cm.sendOk(" You have changed your gender . Come back again to change back . HappyMapling . \r\n#d Note: You have to change channels for it to take effect. "); 
                        cm.dispose(); 
                        cm.reloadChar(); 
                    } else { 
                        cm.sendOk("Sorry you do not have 50mill mesos. Train harder.."); 
                        cm.dispose(); 
                        } 
                    } 
                     
                } 
            } 
        }  