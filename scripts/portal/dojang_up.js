function enter(pi) {
    try {
	    if (pi.getPlayer().getMap().getMonsterById(9300216) != null) {
	        pi.goDojoUp();
	        pi.getPlayer().getMap().setReactorState();
	        var stage = (pi.getPlayer().getMapId() / 100) % 100;
	        if ((stage - (stage / 6) | 0) == pi.getPlayer().getVanquisherStage() && !pi.getPlayer().getDojoParty()) // we can also try 5 * stage / 6 | 0 + 1
	            pi.getPlayer().setVanquisherKills(pi.getPlayer().getVanquisherKills() + 1);
	    } else {
	        pi.getPlayer().message("Elimine os monstros restantes para .");
	    }
	    pi.enableActions();
	    return true;
    } catch(err) {
        pi.getPlayer().dropMessage(err);
    }
}
