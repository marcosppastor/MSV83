/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

var status = 0;
var map = 221024400;

function start() {
    if (cm.haveItem(4001020))
        cm.sendSimple("Caso voce deseje usar o #bPergaminho para Pedra de Eos#k (#i4001020#) para ativar a #Segunda Pedra de Eos#k, levarei voce ate alguns locais especificos.\r\nCaso queira usar, em qual das pedras voce deseja ir?#b\r\n#L0#Primeira Pedra de Eos (100 andar)#l\r\n#L1#Terceira Pedra de Eos (41 andar)#l");
    else {
        cm.sendOk("Caso voce tenha um #bPergaminho para Pedra de Eos#k\r\n(#i4001020#), poderei leva-lo(a) ate um andar de sua preferencia!");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 0)
                cm.sendYesNo("Caso voce deseje usar o #bPergaminho para Pedra de Eos#k (#i4001020#) para ativar a #Segunda Pedra de Eos#k, levarei voce ate a #bPrimeira Pedra de Eos#k, localizada no #e100 andar#n.\r\nE ai, deseja ir?");
            else {
                cm.sendYesNo("Caso voce deseje usar o #bPergaminho para Pedra de Eos#k (#i4001020#) para ativar a #Segunda Pedra de Eos#k, levarei voce ate #bTerceira Pedra de Eos#klocalizada no #e41 andar#n.\r\nE ai, deseja ir?");
                map = 221021700;
            }
        } else if (status == 2) {
            cm.gainItem(4001020, -1);
            cm.warp(map, 3);
            cm.dispose();
        }
    }
}