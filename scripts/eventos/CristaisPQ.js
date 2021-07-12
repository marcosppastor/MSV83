
importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);

var exitMap;
var instanceId;
var minPlayers = 1;

function init() {
    	exitMap = em.getChannelServer().getMapFactory().getMap(105100100); 
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup(eim) {
        var eim = em.newInstance("CristaisPQ");
	var mf = eim.getMapFactory();
        var eventTime = 3 * 60000;
	var map = mf.getMap(105100300);//wutt
        em.schedule("timeOut", eim, eventTime); 
        eim.startEventTimer(eventTime);
        var hog = MapleLifeFactory.getMonster(9300102);
        map.spawnMonsterOnGroundBelow(hog, new java.awt.Point(-112, 250));   
        eim.registerMonster(hog);
	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(910010200);
	player.changeMap(map, map.getPortal(0));
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
	playerExit(eim, player);
	if (eim.getPlayers().size() < 1)
		eim.dispose(); //Fixed PigTown
}

function playerDisconnected(eim, player) {
	playerExit(eim, player);
	if (eim.getPlayers().size() < 1)
		eim.dispose(); //Fixed PigTown
}

function leftParty(eim, player) {			
	playerExit(eim, player);
	if (eim.getPlayers().size() < 1)
		eim.dispose(); //Fixed PigTown
}

function disbandParty(eim) {
	playerExit(eim, player);
	if (eim.getPlayers().size() < 1)
		eim.dispose(); //Fixed PigTown
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
}

//Those offline cuntts
function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) {
	//HTPQ does nothing special with winners
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}

function allMonstersDead(eim) {
        //Open Portal? o.O
}

function cancelSchedule() {
}

function dispose() {
    em.cancelSchedule();
}

function timeOut(eim) {
    if (eim != null) {
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext())
                playerExit(eim, pIter.next());
        }
        eim.dispose();
    }
}