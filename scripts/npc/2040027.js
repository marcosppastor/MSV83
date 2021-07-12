/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
    if (cm.haveItem(4001020))
        cm.sendYesNo("Caso voce use o #bPergaminho para Pedra de Eos#k (#i4001020#), podera ativar a #bQuarta Pedra de Eos#k.\r\nE ai, deseja ir ate o #e41 andar#n?");
    else {
        cm.sendOk("Caso voce tenha um #bPergaminho para Pedra de Eos#k\r\n(#i4001020#), poderei leva-lo(a) ate o #e41 andar!");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
    } else {
        cm.gainItem(4001020, -1);
        cm.warp(221021700, 3);
    }
    cm.dispose();
}