/*
 * @author Marcos P
 * TrueMS - 2016
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
        if ((status == 1 && type == 1 && selection == -1 && mode == 0) || mode == -1) {
            cm.dispose();
        } else {
            if (status == 1) {
                cm.sendNext ("Tudo bem. Ate a proxima!");
                status++;
            } else if (status == 2) {
                if (cm.getPlayer().getMapId() == 200000122)
                    cm.warp(200000121, 0);//Volta para Orbis
                else
                    cm.warp(220000110,0);//Volta para Ludi
                cm.dispose();
            }
        }
    }
}
