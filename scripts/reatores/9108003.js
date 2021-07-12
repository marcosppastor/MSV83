importPackage(Packages.tools);
importPackage(Packages.server);
importPackage(Packages.server.life);
importPackage(Packages.server.maps);


function act() {	rm.mapMessage(6, "[Noticia] Uma semente foi plantada.");
	var em = rm.getEventManager("HenesysPQ");
	if (em != null) {
		var react = rm.getMap().getReactorByName("fullmoon");
		em.setProperty("stage", parseInt(em.getProperty("stage")) + 1);
		react.forceHitReactor(react.getState() + 1);
		if (em.getProperty("stage").equals("6")) {
                      var eim = rm.getPlayer().getEventInstance();
                      var tehMap = eim.getMapInstance(910010000);
                      var bunny = MapleLifeFactory.getMonster(9300061);
                      var mf = eim.getMapFactory();
                      var map = mf.getMap(910010000);
                      map.killAllMonsters(true);
                      tehMap.spawnMonsterOnGroundBelow(bunny, new java.awt.Point(-187, -186));
                      eim.registerMonster(bunny);
                      eim.setProperty("shouldDrop", "true");
                      //rm.getPlayer().getMap().setMonsterRate(1);
                      rm.mapMessage(6, "[Noticia] Proteja o coelhinho da lua!");
                      //rm.getPlayer().getClient().getChannelServer().getMapFactory().disposeMap(910010000);
                      //tehMap.respawn();
                      //rm.getPlayer().getMap().setMonsterRate(9999);
                      map.setMonsterRate(1);
                      rm.spawnMonster(9300083, -901, -558);
                      rm.spawnMonster(9300082, -888, -655);
                      rm.spawnMonster(9300082, 609, -442);
                      rm.spawnMonster(9300081, -653, -836);
                      rm.spawnMonster(9300081, -958, -242);
                      rm.spawnMonster(9300063, 587, -263);
                      rm.spawnMonster(9300063, -947, -387);
                      rm.spawnMonster(9300062, 494, -755);
                      rm.spawnMonster(9300064, 177, -836);
                      rm.spawnMonster(9300064, 562, -597);
		}
	}
}