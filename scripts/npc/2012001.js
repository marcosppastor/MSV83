/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true")
        cm.sendYesNo("O Barco chegou!\r\nEle esta de partida para #gEllinia#k. Voce deseja ir?\r\n#eFique ciente:#n Nao recomendamos que saia da cabine, pois e comum monstros fortes passarem entre o Barco.");
    else {
		cm.sendOk("#h #, o Barco ja partiu.\r\nPeco que aguarde no maximo #e5 minutos#n, pois neste meio tempo, ele tera voltado.");
        cm.dispose();
    }
}

function action(mode, type, selection){
    cm.warp(200000112);
    cm.dispose();
}