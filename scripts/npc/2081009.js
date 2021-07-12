/*
Moose
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }

    if (status == 0) {
	if (cm.getQuestStatus(6180) == 1) {
	    cm.sendOk("Bom. Eu vou te levar para o treinamento, fale comigo novamente ." );
	} else {
         cm.sendOk("Está em missão? se sim posso lhe ajudar." );

	    cm.dispose();
	}
    } else if (status == 1) {
	cm.warp(924000000, 0);
	cm.dispose();
    }
}