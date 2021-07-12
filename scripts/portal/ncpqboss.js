/*
*Ninja Challenge Party Quest
*Criada por Marcos P.
*Planejada por Eduardo Oliveira
*ZenityMS - 2015
*www.zentyms.net/
*/

/*
NCPQ Estágio 4
*/

function enter(pi) {
	var nextMap = 925010400;
	var eim = pi.getPlayer().getEventInstance()
	var target = eim.getMapInstance(nextMap);
	var targetPortal = target.getPortal("st00");
	var avail = eim.getProperty("4stageclear");
	if (avail == null) {
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "Ate que voce conclua, o portal deste estagio ficara fechado."));
		return false;	}
	else {
		pi.getPlayer().changeMap(target, targetPortal);
		return true;
	}
}