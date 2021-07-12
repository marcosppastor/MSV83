/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

var status = 0;
var ticketSelection = -1;
var text = "Esta e a catraca.";
var hasTicket = false;
var NLC = false;

function start() {
	cm.sendSimple("Selecione seu destino.\n\r\n#L0##bSubterraneo da Cidade de Kerning#l\r\n#L1##bKerning Square Shopping Center#l\n\n\r\n#L2#Ir para Contruction Site#l\r\n#L3#Cidade de Folha Nova#l");
}

function action(mode, type, selection) {
    if (mode == -1) {
    	cm.dispose();
    	return;
    } else if (mode == 0) {
           cm.dispose();
           return;
    } else {
    	status++;
    }
    if (status == 1) {
        if (selection == 0) {
    		cm.warp(103000101);
    		cm.dispose();
    		return;
        } else if (selection == 1) {
    		cm.warp(103000310);
    		cm.dispose();
    		return;
        } else if (selection == 2) {
            if (cm.haveItem(4031036) || cm.haveItem(4031037) || cm.haveItem(4031038)) {
                text += " You will be brought in immediately. Which ticket you would like to use?#b";
                for (var i = 0; i < 3; i++) {
	                if (cm.haveItem(4031036 + i)) {
	                    text += "\r\n#b#L" + (i + 1) + "##t" + (4031036 + i) +"#";
	        		}
	            }
                cm.sendSimple(text);  
                hasTicket = true;
            } else { 
            	cm.sendOk("Voce nao possui um ticket!");
            	cm.dispose();
            	return;
            }
        } else if (selection == 3) {
        	if (!cm.haveItem(4031711)) {
			cm.sendOk("Voce nao possui um ticket!\r\nCompre um com o Bell..");
			cm.dispose();
		}
		else {
			if (selection == 3) {
				cm.gainItem(4031711, -1);
				cm.warp(600010001);
				cm.dispose();
			}
		}
	}
    } else if (status == 2) {
    	if (hasTicket) {
    		ticketSelection = selection;
            if (ticketSelection > -1) {
                cm.gainItem(4031035 + ticketSelection, -1);
                cm.warp(103000897 + (ticketSelection * 3));
                hasTicket = false;
                cm.dispose();
                return;
            }
    	}
	    if (cm.haveItem(4031711)) {
		   	cm.gainItem(4031711, -1);
	        cm.warp(600010004);
	    	cm.dispose();
	    	return;
		}
    }
}