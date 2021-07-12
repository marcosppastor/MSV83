/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
    var em = cm.getEventManager("NavioLud");
    if (em.getProperty("entry") == "true")
        cm.sendYesNo("O Barco chegou e esta de partida para #bLudibrium#k. Voce deseja ir?");
    else {
		cm.sendOk("#h #, o Barco ja partiu.\r\nPeco que aguarde no maximo #e5 minutos#n, pois neste meio tempo, ele tera voltado.");
        cm.dispose();
    }
}

function action(mode, type, selection){
    cm.warp(200000122);
    cm.dispose();
}