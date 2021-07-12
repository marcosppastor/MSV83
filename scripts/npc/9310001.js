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
            cm.sendSimple("\r\n#L0#Proceed us to next stage#l\r\n#L1#Bye.#l");
            } else if (status == 1) {
            if (selection == 0) {
                    if (cm.getPlayer().getMap().getMonsterCount() == 0) {      
                     cm.warpParty(970000105);
                     cm.getPlayer().getMap().addMapTimer(60*5);
                     cm.spawnMonster(9300063,12,23);
                    cm.spawnMonster(9300063,12,23);
	            cm.spawnMonster(9300063,12,23);
	            cm.spawnMonster(9300063,12,23);
	            cm.spawnMonster(9300063,12,23); 
                    cm.spawnMonster(9300063,12,23);
                    cm.spawnMonster(9300063,12,23);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9400242,163,83)
                    cm.spawnMonster(9400242,163,83)
                    cm.spawnMonster(9400242,163,83)
                    cm.spawnMonster(9400242,163,83)
                    cm.spawnMonster(9400242,163,83)
                    cm.spawnMonster(9500100,122,196)
                    cm.spawnMonster(9500100,122,196)
                    cm.spawnMonster(9500100,122,196)
                    cm.spawnMonster(9500100,122,196)
                    cm.spawnMonster(9500100,122,196)

            cm.mapMessage(6,"[Stage 3] Please elimate all the mob here without touching them.");
	cm.mapMessage(1,"<Stage THREE>\r\n Please elimate all the mob here without touching them.");
	cm.dispose();
                     } else {
                   cm.sendOk("Sorry, there is still mob in the map.");
                   cm.dispose();
                   }
            } else if (selection == 1) {
                    cm.sendOk("Bye.");
                   cm.dispose();
                    
	
    }
}
}  
       
  
}        