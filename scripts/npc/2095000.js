/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Twilight of the gods
	Description: 		Pink Bean
 */

function start() {
    cm.sendYesNo("Você quer realmente sair?, espero que tenha derrotado o monstro!");
}

function action(mode, type, selection) {
    if (mode == 1) {
	
       var eim = cm.getPlayer().getEventInstance();
          eim.disbandParty();
	  cm.dispose();
         cm.warp(100000000);
    }
    cm.dispose();
}