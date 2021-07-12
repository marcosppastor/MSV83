function enter(pi) {
        
    var mobCount = pi.countMonster();
	if ((pi.getMap().getReactorByName("") == null  && mobCount ===1|| pi.getMap().getReactorByName("").getState() == 1) && mobCount ===1) {
		pi.warp(930000700,0);
		//pi.gainExp_PQ(120, 1.0);
		//pi.getPlayer().endPartyQuest(1206);
		//pi.addTrait("will", 30);
		//pi.gainNX(2000);
		//pi.gainItem(4001198,1);
	} else {
		pi.playerMessage(5, "Por favor, elimine o Golem e tenha espaço em seu inventário");
	}
}