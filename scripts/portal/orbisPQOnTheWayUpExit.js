load("nashorn:mozilla_compat.js");

importPackage(Packages.server.maps);
importPackage(Packages.net.server.channel);
importPackage(Packages.tools);


function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	var party = pi.getPlayer().getEventInstance().getPlayers();
	var realParty = pi.getParty();
	var mf = eim.getMapFactory();
	var map = mf.getMap(920010100);
	var playerStatus = pi.isLeader();
	if (playerStatus) {
		for (var i = 0; i < party.size(); i++) {
			party.get(i).changeMap(map, map.getPortal(14));
		}
		return true;	
	} else {
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "Apenas o líder do grupo tem a decisão de deixar este local ou não."));
		return false;
	}
}