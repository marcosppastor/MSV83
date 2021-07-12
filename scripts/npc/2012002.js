/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
    cm.sendYesNo("Voce deseja sair?");
}

function action(mode, type, selection) {
    if (mode < 1)
		cm.dispose();
    else {
        cm.warp(200000111, 0);
		cm.sendOk("Tudo bem. Ate a proxima!");
        cm.dispose();
    }
}