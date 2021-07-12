
/*
// NPC Rebirth criado por Marcos.
importPackage(Packages.server); 

var status = 0; 


function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

 function action(mode, type, selection) { 

          
         if (mode == -1) { 
        cm.dispose(); 
     
    }else if (mode == 0){ 
        cm.sendOk("Tudo bem.\r\nFale comigo quando tiver interesse de fazer o #bRebirth#k."); 
        cm.dispose(); 

    }else{             
        if (mode == 1) 
            status++; 
        else 
            status--; 
         
        if (status == 0) { 
            cm.sendYesNo("Ola, tudo bom?\r\nEu tenho a funcao de conceder o #bRebirth#k para as pessoas que alcancam o Level 200 e querem ficar mais fortes!\r\nO jogador que rebirthar, ficara level 2 e podera pegar uma nova classe, ganhando mais HP/MP, tendo seus antigos pontos de stats guardados para distribuilos novamente!\r\nOs requisitos minimos para fazer o rebirth, e ser pelo menos #blevel 200#k\r\n\r\nE ai, voce deseja rebirthar?"); 
        }else if (status == 1) { 
            if(cm.getPlayer().getReborns() < 0) { 
                cm.sendOk("Me desculpe, mas voce nao esta apto para rebirthar este personagem."); 
                cm.dispose(); 
            } else { 
            if (cm.getPlayer().getReborns() >= 0) { 
                    cm.sendOk("#bParabens#k\r\nVoce esta totalmente qualificadado para poder fazer o #bRebirth#k."); 
            } else { 
                cm.sendOk("Nao se esqueca de r!"); 
                cm.dispose(); 
            }         
            } 
         }else if (status == 2) {
		 if cm.getLevel() == 200) {
        cm.getPlayer().changeJob(Packages.client.MapleJob.BEGINNER); 
        cm.getPlayer().setHp(20000); 
        cm.getPlayer().setMp(20000); 
        cm.getPlayer().setMaxHp(20000); 
        cm.getPlayer().setMaxMp(20000);        
		cm.getPlayer().setExp(0); 
        cm.getPlayer().setLevel(2); 
		var statup = new java.util.ArrayList();
        str = cm.getChar().getStr();
        dex = cm.getChar().getDex();
        inte = cm.getChar().getInt();
        luk = cm.getChar().getLuk();
        currentAp = cm.getPlayer().getRemainingAp();
        totalAddAp = str + dex + inte + luk - 16;
        newAp = currentAp + totalAddAp;
        cm.getPlayer().setStr(4);
        cm.getPlayer().setDex(4);
        cm.getPlayer().setInt(4);
        cm.getPlayer().setLuk(4);
        cm.getPlayer().setRemainingAp(newAp);
        statup.add(new Packages.tools.Pair(MapleStat.STR, java.lang.Integer.valueOf(4)));
        statup.add(new Packages.tools.Pair(MapleStat.DEX, java.lang.Integer.valueOf(4)));
        statup.add(new Packages.tools.Pair(MapleStat.LUK, java.lang.Integer.valueOf(4)));
        statup.add(new Packages.tools.Pair(MapleStat.INT, java.lang.Integer.valueOf(4)));
        statup.add(new Packages.tools.Pair(MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(cm.getPlayer().getRemainingAp())));
        cm.getC().getSession().write (Packages.tools.MaplePacketCreator.updatePlayerStats(statup));
        cm.dispose();
		cm.reloadChar();
	    cm.sendOk("Pronto. Recomendamos que voce relogue para evitar qualquer tipo de problema.")
		 } else {
		 cm.sendOk("Voce nao esta no #blevel 200.");
		 }
		 cm.dispose(); 

        }    
} 
}  

*/