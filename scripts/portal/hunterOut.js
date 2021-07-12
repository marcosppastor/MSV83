/*
 * @author Marcos P
 * TrueMS - 2017
 * truems.net.br/
*/

function enter(pi) {
    var mapid = 0;
    var portal = 0;
    switch (pi.getPlayer().getMapId()) {
        case 931050410:
            mapid = 100000000;
            portal = 1;
            break;
		case 931050433:
            mapid = 100000000;
            portal = 1;
            break;	
    }
    if (mapid != 0) {
        pi.warp(mapid, portal);
    }
    return true;
}