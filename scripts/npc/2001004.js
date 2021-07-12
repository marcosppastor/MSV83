/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/


var status = -1;

function start() {
    if (cm.c.getPlayer().getMapId() == 209000000)
        cm.sendYesNo("#h #, nos possuimos uma linda arvore de natal.\r\nPor acaso, deseja nos ajudar, decorando-a?");
    else
        cm.sendYesNo("#h #, por acaso, deseja voltar para a #bVila Feliz#k?");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && status == 0){
            cm.sendYesNo("Ainda precisamos decorar a arvore de natal!\r\nRealmente deseja voltar?");
            return;
        }else if(mode == 0 && status == 1 && type == 0){
            status -= 2;
            start();
            return;
        }else if(mode == 0 && status == 1 && type == 1)
            cm.sendNext("#h #, estou confuso. Caso deseje voltar para a #bVila Feliz#k, fale comigo.");
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 209000000){
        if(status == 0){
            //cm.sendNext("Otimo!\r\nLevarei-o(a) ate a Arvore de Natal");
			cm.warp(209000001);
        }else if(status == 1){
            cm.warp(209000001);
            cm.dispose();
		}
    }else
    if(status == 0)
	    cm.warp(209000000, 0);
    else
        cm.dispose();
}