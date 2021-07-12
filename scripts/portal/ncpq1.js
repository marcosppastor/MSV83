/*
*Ninja Challenge Party Quest
*Criada por Marcos P.
*Planejada por Eduardo Oliveira
*ZenityMS - 2015
*www.zentyms.net/
*/

/*
NCPQ Estágio 1
*/

importPackage(Packages.server.maps);
importPackage(Packages.net.channel);
importPackage(Packages.tools);

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance()
	var target = eim.getMapInstance(925010000);
	if (eim.getProperty("1stageclear") != null) {
		pi.getPlayer().changeMap(target, target.getPortal("st00"));
		return true
	} else 
		return false;	
}
