


importPackage(Packages.client);
importPackage(Packages.server.life);
importPackage(Packages.tools);

var setupTask;
var Mapas = Array(910000000)
var Monstros = Array(9400608);  



function init() {
    scheduleNew();
}

function scheduleNew() {
     var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 5);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis())
        nextTime += 1000*18000;

    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
	setupTask.cancel(true);
}

function start() {
    	var mob = Packages.server.life.MapleLifeFactory.getMonster(9600065);
        var map1 = em.getChannelServer().getMapFactory().getMap(209000000);
        


	         if(map1) {
		   map1.broadcastMessage(MaplePacketCreator.serverNotice(6, "[Especial] Um monstro apareceu na Vila Feliz !"));
		    map1.spawnMonsterOnGroudBelow(mob, new java.awt.Point(3203,154));
	            }
                 
    
    
   scheduleNew();
}


