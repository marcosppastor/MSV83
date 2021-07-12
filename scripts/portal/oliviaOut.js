function enter(pi) {
    var mobCount = pi.countMonster();
    	if (pi.getPlayer().getEventInstance() != null && pi.getPlayer().getEventInstance().getProperty("stage").equals("1") && mobCount < 1) {


		var s = parseInt(pi.getPlayer().getEventInstance().getProperty("mode"));
		pi.gainExp(10000);
                pi.warp(682000000,0);
                pi.player.getEventInstance().disbandParty();



                
		//pi.gainNX((s == 0 ? 150 : (s == 1 ? 300 : 600)));
    }
    

else {
    pi.playerMessage("Você não batalhou contra o boss ainda");
}
}