function enter(pi) {
	if (pi.hasItem(4032125) || pi.hasItem(4032126) || pi.hasItem(4032127) || pi.hasItem(4032128) || pi.hasItem(4032129)) {
		 pi.playerMessage(5, "Voce ja tem a prova de habilidade.");
		 return false;
	}
    if (pi.isQuestStarted(20611) || pi.isQuestStarted(20612) || pi.isQuestStarted(20613) || pi.isQuestStarted(20614) || pi.isQuestStarted(20615)) {
		if (pi.getPlayerCount(913020300) == 0) {
		    var map = pi.getMap(913020300);
		    map.killAllMonsters();
		    pi.warp(913020300, 0);
		    pi.spawnMonster(9300294, 87,88);
		} else {
		    pi.playerMessage(5, "Alguem ja esta enfrentando o Boss. Por favor, aguarde.");
		}
	    } else {
		pi.playerMessage(5, "Voce nao pode acessar este andar.");
    }
}