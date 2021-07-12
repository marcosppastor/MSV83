function action(mode, type, selection) {
	if (cm.getPlayerCount(913030000) == 0) {
		//cm.removeNPC(1104002);
		var map = cm.getMap(913030000);
		map.killAllMonsters(false);
               // map=924010100;
		map.spawnNpc(1104002, new java.awt.Point(-430, 88));
		cm.warp(913030000, 0);
	} else {
	    cm.playerMessage("A bruxa negra está sendo desafiada por outra pessoa.");
	}
	cm.dispose();
}