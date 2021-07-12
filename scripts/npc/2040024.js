/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
    if (cm.haveItem(4001020))
        cm.sendYesNo("Voce deseja usar o #bPergaminho para Pedra de Eos#k para ativar a #bPrimeira Pedra e Eos#k? Caso deseje, poderei leva-lo ate a 71 andar.\r\nDeseja usar, ou nao?");
    else {
        cm.sendOk("Caso voce tenha um #bPergaminho para Pedra de Eos#k\r\n(#i4001020#), poderei leva-lo(a) ate o #e71 andar!");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
    } else {
        cm.gainItem(4001020, -1);
        cm.warp(221022900, 3);
    }
    cm.dispose();
}