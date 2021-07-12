/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1 || mode == 0)
		cm.dispose();
	if (mode == 1)
		status++;
	else
		status--;

	if (status == 0) 
		cm.sendNext("Olá #h #, tudo bem? Eu sou a Joel e trabalho neste guiche.\r\nPor acaso, voce ja pensou em explorar outros continentes?");
	else if (status == 1)
		cm.sendNextPrev("Caso voce queira, eu posso te vender uma passagem para #bOrbis#k.");
	else if (status == 2)
		cm.sendSimple("Por #b10,000#k mesos, posso te vender uma passagem para Orbis!\r\nCaso voce queira, voce pode compra-lo e viajar falando com a Cherry.\r\n#b#L0#Desejo comprar uma passagem para Orbis (Regular).#l");
	else if (status == 3) {
		if (cm.getMeso() < 10000) {
			cm.sendOk("Lamento mas voce nao possui a quantia de mesos necessaria.");
		}
		else {
			if (selection == 0) {
				cm.gainMeso(-10000);
				cm.gainItem(4031045);
				cm.sendOk("Obrigada!\r\nFale com a #bCherry#k para ir ate a #bEstacao de Orbis#k.");
			}
		}
	}
}