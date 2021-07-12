/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
    if (cm.haveItem(4031045)){
		cm.gainItem(4031045, -1);
		cm.warp(200000100);
		cm.sendOk("Bem vindo ao #bGuiche de Orbis#k");
        cm.dispose();
    } else {
        cm.sendOk("Voce nao possui uma passagem para Orbis.\r\nCaso queira viajar, voce devera comprar uma passagem falando com o #bMue.");
        cm.dispose();
        }
}

function action(mode, type, selection) {
cm.dispose();
}