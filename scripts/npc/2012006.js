importPackage(Packages.client);

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("Ate a proxima.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {        // first interaction with NPC
			cm.sendNext("#wOla #h #, eu sou a #p2012006#.\r\nPor acaso, voce deseja ir para outro #bcontinente?#k");
		} else if (status == 1) {
			cm.sendSimple("#wO que voce gostaria de fazer?\r\n\r\n#L0#Me leve para o navio de Ellinia#l\r\n#L1#Me leve para Ludibrium#l\r\n#L2#Desejo ir para Mu Lung#l\r\n#L3#Preciso ir para Leafre#l");
			status=1;
		} else if (status == 2) {
				if (selection == 0){
				        if (cm.haveItem(4031047)){	
				        	cm.sendNext("Ok #h #, eu te levarei ate a plataforma de Ellinia.");
					status = 9;
				         }else{
					cm.sendOk("Voce nao possui uma passagem para Ellinia!");
					cm.dispose();
					return;
				         }		
				} 
				if (selection == 1){
				         if (cm.haveItem(4031074)){
					cm.sendNext("Ok #h #, eu te levarei ate a plataforma de Ludibrium.");
					status = 19;
				          }else{
					cm.sendOk("Voce nao possui uma passagem para Ludibrium!");
					cm.dispose();	 
					return;
				          }	
				}
				if (selection == 2){
				          if (cm.haveItem(4031044)){	
				        	 cm.sendNext("Ok #h #, eu te levarei ate a plataforma de Mu Lung.");
				       	 status = 29;
				          }else{
					  cm.sendOk("Voce nao possui uma passagem para Mu Lung!");
					  cm.dispose();
					  return;
				          }
				}	
				if (selection == 3){
				          if (cm.haveItem(4031331)){	
				        	 cm.sendNext("Ok #h #, eu te levarei ate a plataforma de Leafre.");
				       	 status = 39;
				          }else{
					  cm.sendOk("Voce nao possui uma passagem para Leafre!");
					  cm.dispose();
					  return;
				          }	
				}
		} else if(status == 10){
			cm.warp(200000110, 0);// Ellinia walkway
			cm.dispose();
		} else if (status==20){
			cm.warp(200000120, 0);// Ludi Walkway
			cm.dispose();
		} else if (status==30){
			cm.warp(200000140, 0);// Mu Lung Walkway
			cm.dispose();
		} else if (status==40){
			cm.warp(200000130, 0);// Leafre Walkway
			cm.dispose();
		}
	}
}