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
		cm.sendNext("Ola #h #, tudo bem? Eu sou a Catraca.\r\nPor acaso, deseja ir para a #bCidade de Kerning#k?");
	else if (status == 1)
		cm.sendNextPrev("Caso voce queira, eu posso recomendar uma pessoa que venda uma passagem...");
	else if (status == 2)
		cm.sendSimple("Com um Bilhete de Metro para Kerning (#i4031711#), eu posso leva-lo para a #bCidade de Kerning#k.\r\nPara possuir um #i4031711#, fale com o #bBell#k.\r\n\r\n#b#L0#Falarei com o Bell para comprar meu ticket.#l");
	else if (status == 3) {
		if (!cm.haveItem(4031713)) {
			cm.sendOk("Voce nao possui um ticket!\r\nCompre um com o Bell..");
			cm.dispose();
		}
		else {
			if (selection == 0) {
				cm.gainItem(4031713, -1);
				cm.warp(103000100);
				cm.dispose();
			}
		}
	}
}