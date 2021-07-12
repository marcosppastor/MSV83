/*
 * @author Marcos P
 * equinox - 2017
 * truems.net.br/
*/

var status = -1;

function start() {
    if (cm.c.getPlayer().getMapId() == 390000100 || cm.c.getPlayer().getMapId() == 390000200 || cm.c.getPlayer().getMapId() == 390000300 || cm.c.getPlayer().getMapId() == 390000400 || cm.c.getPlayer().getMapId() == 390000500 || cm.c.getPlayer().getMapId() == 390000600 || cm.c.getPlayer().getMapId() == 390000700 || cm.c.getPlayer().getMapId() == 390000800 || cm.c.getPlayer().getMapId() == 390000900 || cm.c.getPlayer().getMapId() == 390001000)
        cm.sendYesNo("Oi #h #. Por acaso, deseja sair?");
    else
        cm.sendNext("Olá #h #, tudo bem?");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && status == 0){
            cm.sendYesNo("Afinal, deseja sair, ou não?");
            return;
        }else if(mode == 0 && status == 1 && type == 0){
            status -= 2;
            start();
            return;
        }else if(mode == 0 && status == 1 && type == 1)
		cm.sendNext("Tudo bem.\r\nFale comigo quando quiser sair.");
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 390000100 || cm.c.getPlayer().getMapId() == 390000200 || cm.c.getPlayer().getMapId() == 390000300 || cm.c.getPlayer().getMapId() == 390000400 || cm.c.getPlayer().getMapId() == 390000500 || cm.c.getPlayer().getMapId() == 390000600 || cm.c.getPlayer().getMapId() == 390000700 || cm.c.getPlayer().getMapId() == 390000800 || cm.c.getPlayer().getMapId() == 390000900 || cm.c.getPlayer().getMapId() == 390001000){
        if(status == 0){
            cm.sendNext("Tudo bem.\r\nAté a próxima!");
        }else if(status == 1 && type == 1){
            cm.sendNext("Caso queira fazer a missão do #bRico Dourado#k, fale com o NPC Rico em henesys.");
        }else if(status == 1){
            cm.warp(390009999, 0);
            cm.dispose();
        }else{
            cm.warp(390009999, 0);
            cm.dispose();
        }
    }else
    if(status == 0)
            cm.sendNext("Caso queira fazer a missão do #bRico Dourado#k, fale com o NPC Rico em henesys.");
    else
        cm.dispose();
}