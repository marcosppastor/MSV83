/*
 * @author Marcos P
 * TrueMS - 2016
 * NPC ID 1032009 - Purin
 * truems.net/
*/

var status = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0) {
        cm.sendYesNo("Deseja sair deste navio?");
        status++;
    } else {
        if (mode < 1) {
            cm.dispose();
        } else {
            if (status == 1) {
                cm.sendNext ("Tudo bem. Ate a proxima!");
                status++;
            } else if (status == 2) {
                cm.warp(101000300, 0);
                cm.dispose();
            }
        }
    }
}
