function enter(pi) {
    var mobCount = pi.countMonster();
    var reactorCount = pi.countReactor()
	switch(pi.getMapId()) {
		case 930000000:
			pi.warp(930000100,0);
			break;
		case 930000100:
			if (mobCount == 0) {
				pi.warp(930000200,0);
                               pi.getPlayer().dropMessage(6,"Colete os frascos de antidoto dos monstros e jogue sobre os espinhos venenosos até sumir.");

			} else {
				pi.playerMessage(5, "Elimine todos os monstros.");
			}
			break;
		case 930000200:
			if (pi.getMap().getReactorByName("spine") != null && pi.getMap().getReactorByName("spine").getState() < 4) {
				pi.playerMessage(5, "Os espinhos bloqueiam o caminho,use o antidoto até elimina-lo.");
			} else {
				pi.warp(930000300,0); //assuming they cant get past reactor without it being gone
			}
			break;
	}
}