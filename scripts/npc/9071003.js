/*
 * @author Marcos P
 * TrueMS - 2017
 * truems.net.br/
*/

var status = 0;
var m;

function start() {
    if (cm.getMapId() == 951000000) {
        cm.sendYesNo("Deseja voltar para Henesys?");
		//cm.sendSimple("Would you like to go back?\r\n#b#L100#Henesys#l\r\n#b#L101#Kerning#l");
        m = 1;
        return;
    }
    cm.sendYesNo("Deseja ir para o Monster Park?");
}

function action(mode, type, selection) {
    if (mode == 1) {
        if (m == 1) {
            cm.warp(100000000);
        } else {
            cm.warp(951000000);
            //cm.saveReturnLocation("MONSTER_PARK");
        }
    }
    cm.dispose();
}