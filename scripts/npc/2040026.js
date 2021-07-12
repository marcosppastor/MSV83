/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

var status = 0;
var map;

function start() {
    if (cm.haveItem(4001020)) {
        cm.sendSimple("Caso voce deseje usar o #bPergaminho para Pedra de Eos#k (#i4001020#) para ativar a #Terceira Pedra de Eos#k, levarei voce ate alguns locais especificos.\r\nCaso queira usar, em qual das pedras voce deseja ir?#b\r\n#L0#Segunda Pedra de Eos(71 andar)#l\r\n#L1#Quarta Pedra de Eos(1 andar)#l");
    } else {
        cm.sendOk("Caso voce tenha um #bPergaminho para Pedra de Eos#k\r\n(#i4001020#), poderei leva-lo(a) ate um andar de sua preferencia!");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                cm.sendYesNo("Caso voce deseje usar o #bPergaminho para Pedra de Eos#k (#i4001020#) para ativar a #Terceira Pedra de Eos#k, levarei voce ate a #bSegunda Pedra de Eos#k, localizada no #e71 andar#n.");
                map = 221022900;
            } else {
                cm.sendYesNo("Caso voce deseje usar o #bPergaminho para Pedra de Eos#k (#i4001020#) para ativar a #Terceira Pedra de Eos#k, levarei voce ate a #bQuarta Pedra de Eos#k, localizada no #e1 andar#n.");
                map = 221020000;
            }
        } else if (status == 2) {
            cm.gainItem(4001020, -1);
            cm.warp(map, map % 1000 == 900 ? 3 : 4);
            cm.dispose();
        }
    }
}