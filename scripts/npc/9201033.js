/*
 * NatalPQ (custom) - 2015
 * @author Marcos P.
 * OrbisMS - 2015
 * orbisms.net/


var wui = 0; 

function start() { 
    cm.sendSimple("Ola #h #!\r\nCaso voce possua algumas #bEsferas de Cristal de Neve#k\r\n(#i4031312#), podera trocar estas por diversos items.\r\n#e#b---------------------------------------------------------------------------------#n#k\r\n#L100# #b#b50#k Esferas de Cristal de Neve por:\r\n#i1052145#(Roupa de Festa Natalina)\r\n\r\n#l#L0# #b#b1#k Esfera de Cristal de Neve por:\r\n#i2210010#(Pocao de transformacao Masculina)\r\n#l\r\n#L1##b1#k Esfera de Cristal de Neve por:\r\n#i2210011#(Pocao de transformacao Feminina)\r\n#l\r\n#L2##b10#k Esferas de Cristal de Neve por:\r\n#i5000041#  (Pet Snowman)\r\n#l\r\n#L3##b5#k Esferas de Cristal de Neve por:\r\n#i1002479#  (Mascara de Boneco de Neve)\r\n#l\r\n#L4##b5#k Esferas de Cristal de Neve por:\r\n#i5120003#  (15 Mensagens de Flocos de Neve)\r\n#l\r\n#L5##b5#k Esferas de Cristal de Neve por:\r\n#i3010045#  (Cadeira de Gelo)\r\n#l\r\n#L6##b180#k Esferas de Cristal de Neve por:\r\n#i1702136# (30 em FOR/DES/INT/SOR)\r\n#l\r\n#L7##b135#k Esferas de Cristal de Neve por:\r\n#i1002728# (10 em FOR/DES/INT/SOR)\r\n#l\r\n#L8##b120#k Esferas de Cristal de Neve por:\r\n#i1012020# (10 em FOR/DES/INT/SOR)\r\n#l\r\n#L9##b200#k Esferas de Cristal de Neve por:\r\n#i1092040#(7 em FOR/DES/INT/SOR)"); 
} 

function action(mode, type, selection) { 
    cm.dispose();
	if (selection == 100) {
        if (cm.haveItem(4031312, 50)) {
            cm.gainItem(1052145, 1);		
            cm.gainItem(4031312, -50);
            cm.sendOk("Parabens #h #!\r\nVoce ganhou um(a) #i1052145#. Tenha um #bFeliz Natal!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b50 Esferas de Cristal de Neve#k (#i4031312#) necessarias.");
            cm.dispose();
        }
    } else if (selection == 0) {
        if (cm.haveItem(4031312, 1)) {
            cm.gainItem(2210010, 1);		
            cm.gainItem(4031312, -1);
            cm.sendOk("Parabens #h #!\r\nVoce ganhou um(a) #i2210010#. Tenha um #bFeliz Natal!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b1 Esfera de Cristal de Neve#k (#i4031312#) necessaria.");
            cm.dispose();
        }
    } else if (selection == 1) {
        if (cm.haveItem(4031312, 1)) {
            cm.gainItem(2210011, 1);			
            cm.gainItem(4031312, -1);
            cm.sendOk("Parabens #h #!\r\nVoce ganhou um(a) #i2210011#. Tenha um #bFeliz Natal!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b1 Esfera de Cristal de Neve#k (#i4031312#) necessaria.");
            cm.dispose();
        }
    } else if (selection == 2) {
        if (cm.haveItem(4031312, 0)) {
            //cm.gainItem(5000041, 1);		
            //cm.gainItem(4031312, -10);		
            cm.sendOk("#i5000041# foi removido!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b0 Esferas de Cristal de Neve#k (#i4031312#) necessarias.");
            cm.dispose();
        }
    } else if (selection == 3) {
        if (cm.haveItem(4031312, 5)) {
            cm.gainItem(1002479,1);			
            cm.gainItem(4031312, -5);
            cm.sendOk("Parabens #h #!\r\nVoce ganhou um(a) #i1002479#. Tenha um #bFeliz Natal!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b4 Esferas de Cristal de Neve#k (#i4031312#) necessarias.");
            cm.dispose();
        }
    } else if (selection == 4) {
        if (cm.haveItem(4031312, 5)) {
            cm.gainItem(5120003,15);
            cm.gainItem(4031312, -5);
            cm.sendOk("Parabens #h #!\r\nVoce ganhou um(a) #i5120003#. Tenha um #bFeliz Natal!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b5 Esferas de Cristal de Neve#k (#i4031312#) necessarias.");
            cm.dispose();
        }
    } else if (selection == 5) {
		if (cm.haveItem(4031312, 5)) {
            cm.gainItem(3010045, 1);			
            cm.gainItem(4031312, -5);
            cm.sendOk("Parabens #h #!\r\nVoce ganhou um(a) #i3010045#. Tenha um #bFeliz Natal!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b5 Esferas de Cristal de Neve#k (#i4031312#) necessarias.");
            cm.dispose();
        }
    } else if (selection == 6) {
        if (cm.haveItem(4031312, 180)) {
            cm.gainItem(1702136, 1);
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1702136, "str", 30);
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1702136, "dex", 30);	
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1702136, "int", 30);	
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1702136, "luk", 30);	
            cm.reloadChar();			
            cm.gainItem(4031312, -180);
            cm.sendOk("Parabens #h #!\r\nVoce ganhou um(a) #i1702136#. \r\n\r\n#r#eObs:#k Voce so pode ter 1 unidade deste item em seu inventario. Caso adiquira mais de uma, nao havera ressarcimento de #besferas#k.#n\r\n\r\nTenha um #bFeliz Natal!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b150 Esferas de Cristal de Neve#k (#i4031312#) necessarias.");
            cm.dispose();
        }
        cm.dispose(); 
    } else if (selection == 7) {
        if (cm.haveItem(4031312, 135)) {
            cm.gainItem(1002728, 1);	
            Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1002728, "str", 10);
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1002728, "dex", 10);
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1002728, "int", 10);
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1002728, "luk", 10);	
            cm.reloadChar();				
            cm.gainItem(4031312, -135);
            cm.sendOk("Parabens #h #!\r\nVoce ganhou um(a) #i1002728#. \r\n\r\n#r#eObs:#k Voce so pode ter 1 unidade deste item em seu inventario. Caso adiquira mais de uma, nao havera ressarcimento de #besferas#k.#n\r\n\r\nTenha um #bFeliz Natal!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b135 Esferas de Cristal de Neve#k (#i4031312#) necessarias.");
            cm.dispose();
        }
        cm.dispose(); 
	} else if (selection == 8) {
        if (cm.haveItem(4031312, 120)) {
            cm.gainItem(1012020, 1);
            Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1012020, "str", 10);
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1012020, "dex", 10);	
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1012020, "int", 10);	
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1012020, "luk", 10);	
            cm.reloadChar();			
            cm.gainItem(4031312, -120);
            cm.sendOk("Parabens #h #!\r\nVoce ganhou um(a) #i1012020#. \r\n\r\n#r#eObs:#k Voce so pode ter 1 unidade deste item em seu inventario. Caso adiquira mais de uma, nao havera ressarcimento de #besferas#k.#n\r\n\r\nTenha um #bFeliz Natal!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b120 Esferas de Cristal de Neve#k (#i4031312#) necessarias.");
            cm.dispose();
        }
        cm.dispose(); 
	} else if (selection == 9) {
        if (cm.haveItem(4031312, 200)) {
            cm.gainItem(1092040, 1);
            Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1092040, "str", 7);
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1092040, "dex", 7);	
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1092040, "int", 7);	
			Packages.server.MapleInventoryManipulator.editEquipById(cm.getPlayer(), 1,1092040, "luk", 7);	
            cm.reloadChar();			
            cm.gainItem(4031312, -200);
            cm.sendOk("Parabens #h #!\r\nVoce ganhou um(a) #i1012020#. \r\n\r\n#r#eObs:#k Voce so pode ter 1 unidade deste item em seu inventario. Caso adiquira mais de uma, nao havera ressarcimento de #besferas#k.#n\r\n\r\nTenha um #bFeliz Natal!");
            cm.dispose();
        } else {
            cm.sendOk("Desculpe, voce nao possui a quantidade de #b200 Esferas de Cristal de Neve#k (#i4031312#) necessarias.");
            cm.dispose();
        }
        cm.dispose(); 	
    }
}  

*/

/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
//cm.gainItem()
cm.sendOk("Ola #h #, tudo bem?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}