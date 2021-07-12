/*
 * @author Marcos P
 * Acre MS - 2016
 * acrems.net/
*/
//var foo =  documento.createElement("span")
//foo=document.createTextNode("&nbsp;");


function start() {
	cm.sendSimple("#e#dOlá, eu sou o Gaga.#n#k\r\n#dPor determinado valor, eu posso lhe vender as seguintes coisas:\r\n\r\n#e#dMontaria, Sela e a habilidade Montaria de Monstros.#n#k\r\n\r\n#dPor acaso, você deseja aprender as habilidades e obter qual montaria?Lembrando que para cygnus as montarias são Mimio e Mimiana!\r\n#L0##b #i1902000# Porco (25m)#k#l\r\n#L1##b #i1902001# Juba Prateado (60m)#k#l\r\n#L2##b #i1902002# Draco Vermelho (100m)#k#l\r\n#L4##b #i1902005# Mimiana (70m)#k#l \r\n#L5##b #i1902006# Mimio (100m)#k#l\r\n \r\n #L3##bAtivar Skill de montaria(10m)#k#l\r\n");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if ((cm.getMeso() >= 25000000)) {
			cm.sendOk("#e#dParabéns!#n#k\r\n#dAgora você pode desfrutar da sua nova montaria.");
			cm.gainMeso(-25000000);
            cm.gainItem(1912000);
            cm.gainItem(1902000);
            


            cm.dispose();
			}
			else if (!cm.getMeso() <= 25000000 ) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos exigida.");
			cm.dispose();
			}
	}
		if (selection == 1) {
		if ((cm.getMeso() >= 60000000 )) {
			cm.sendOk("#e#dParabéns!#n#k\r\n#dAgora você pode desfrutar da sua nova montaria.");
			cm.gainMeso(-60000000);
            cm.gainItem(1912000);
            cm.gainItem(1902001);
            cm.dispose();
			}
			else if (!cm.getMeso() <= 60000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos exigida.");
			cm.dispose();
			}
	}
		if (selection == 2) {
		if ((cm.getMeso() >= 100000000 )) {
			cm.sendOk("#e#dParabéns!#n#k\r\n#dAgora você pode desfrutar da sua nova montaria.");
			cm.gainMeso(-100000000);
            cm.gainItem(1912000);
            cm.gainItem(1902002);
            cm.dispose();
			}
			else if (!cm.getMeso() <= 100000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos exigida.");
			cm.dispose();
		    }
			
	}
        
        if (selection == 4) {
		if ((cm.getMeso() >= 70000000)) {
			cm.sendOk("#e#dParabéns!#n#k\r\n#dAgora você pode desfrutar da sua nova montaria.");
			cm.gainMeso(-70000000);
            cm.gainItem(1902005);
            cm.gainItem(1912005);
            


            cm.dispose();
			}
			else if (!cm.getMeso() <= 70000000 ) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos exigida.");
			cm.dispose();
			}
	}
        
        if (selection == 5) {
		if ((cm.getMeso() >= 100000000)) {
			cm.sendOk("#e#dParabéns!#n#k\r\n#dAgora você pode desfrutar da sua nova montaria.");
			cm.gainMeso(-100000000);
            cm.gainItem(1902006 );
            cm.gainItem(1912005);
            


            cm.dispose();
			}
			else if (!cm.getMeso() <= 100000000 ) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos exigida.");
			cm.dispose();
			}
	}
        
        if (selection == 3) {
		if ((cm.getMeso() >= 10000000 && cm.getPlayer().getJob().getId() == 1311 || cm.getPlayer().getJob().getId() == 1211 || cm.getPlayer().getJob().getId() == 1111 || cm.getPlayer().getJob().getId() == 1411 || cm.getPlayer().getJob().getId() == 1511)) {
			cm.sendOk("#e#dParabéns!#n#k\r\n#dsua skill foi adicionada a sua lista.");
			cm.gainMeso(-10000000);
                        cm.teachSkill(10001004 ,1,1,-1);

            cm.dispose();
			}
			else if (cm.getMeso() < 10000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos exigida.");
			cm.dispose();
		    }
			
                        else if (cm.getMeso() >= 10000000 && cm.getPlayer().getJob().getId() > 2000 ) {
                        cm.gainMeso(-10000000);
                        cm.teachSkill(20001004  ,1,1,-1);
			cm.sendOk("#e#dParabéns!#n#k\r\n#dsua skill foi adicionada a sua lista.");
			cm.dispose();
		    }
                    
                     else if (cm.getMeso() >= 10000000 && cm.getPlayer().getJob().getId() > 0 && cm.getPlayer().getJob().getId() < 1000) {
                        cm.teachSkill(1004  ,1,1,-1);
                        cm.gainMeso(-10000000);

			cm.sendOk("#e#dParabéns!#n#k\r\n#dsua skill foi adicionada a sua lista.");
			cm.dispose();
                    
	}
        
    }
        
        
        
        
        
        
        
        
        
        
        
        
             
        
        
        
        
        
        
        
        }
        /*
        
        if (selection == 0) {
		if ((cm.getMeso() >= 25000000 && cm.getPlayer().getJob().getId() === 1411 || cm.getPlayer().getJob().getId() === 1311 && cm.getPlayer().getJob().getId() === 1211 || cm.getPlayer().getJob().getId() === 1111 || cm.getPlayer().getJob().getId() === 1511)) {
			cm.sendOk("#e#dParabens!#n#k\r\n#dAgora voce pode desfrutar da sua nova montaria.");
			cm.gainMeso(-25000000);
            cm.gainItem(1912000);
            cm.gainItem(1902000);
            cm.teachSkill(10001004 ,1,1);


            cm.dispose();
			}
			else if (!cm.getMeso() <= 25000000 ) {
			cm.sendOk("#dLamento, mas voce nao possui a quantia de mesos exigida.");
			cm.dispose();
			}
	}
		if (selection == 1) {
		if ((cm.getMeso() >= 60000000 && cm.getPlayer().getJob().getId() === 1411 || cm.getPlayer().getJob().getId() === 1311 || cm.getPlayer().getJob().getId() === 1211 || cm.getPlayer().getJob().getId() === 1111 || cm.getPlayer().getJob().getId() === 1511)) {
			cm.sendOk("#e#dParabens!#n#k\r\n#dAgora voce pode desfrutar da sua nova montaria.");
			cm.gainMeso(-60000000);
            cm.gainItem(1912000);
            cm.gainItem(1902001);
            cm.teachSkill(10001004   ,1,1);
            cm.dispose();
			}
			else if (!cm.getMeso() <= 60000000) {
			cm.sendOk("#dLamento, mas voce nao possui a quantia de mesos exigida.");
			cm.dispose();
			}
	}
		if (selection == 2) {
		if ((cm.getMeso() >= 100000000 && cm.getPlayer().getJob().getId() === 1411 || cm.getPlayer().getJob().getId() === 1311 || cm.getPlayer().getJob().getId() === 1211 || cm.getPlayer().getJob().getId()=== 1111 || cm.getPlayer().getJob().getId() === 1511)) {
			cm.sendOk("#e#dParabens!#n#k\r\n#dAgora voce pode desfrutar da sua nova montaria.");
			cm.gainMeso(-100000000);
            cm.gainItem(1912000);
            cm.gainItem(1902002);
            cm.teachSkill(10001004,1,1);
            cm.dispose();
			}
			else if (!cm.getMeso() <= 100000000) {
			cm.sendOk("#dLamento, mas voce nao possui a quantia de mesos exigida.");
			cm.dispose();
		    }
			
	}
}  */

