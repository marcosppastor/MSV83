/*
 * NPC Name: Dairy Cow
 * @author Marcos P
 * TrueMS - 2017
 * truems.net.br/
*/


function start() {
	cm.sendSimple("Finalmente alguem veio buscar este pobre #dporquinho#k...\r\nGustav informou-me que voce viria. Por acaso, deseja levar este pobre #dporquinho#k agora?\r\n\r\n#L0#Sim, levarei o #dporquinho perdido#k (#i4032449#) ao Gustav.\r\n#l");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if (cm.haveItem(4032452, 1)) {//Palha
			cm.warp(100030300);//Mapa do Gustav
			cm.gainItem(4032452, -1);//Palha -1
			cm.gainItem(4032449, 1);//Porquinho
			cm.gainExp(372);//Level 7
			cm.gainExp(560);//Level 8
			cm.mapMessage("Devolva o porquinho ao Gustav.");	
            cm.dispose();
		}
		else if (!cm.haveItem(4032452, 1)) {
			cm.sendOk("Lamento, mas voce nao possui 1 palha (#i4032452#). Esta pode ser obtida fazendo a missao do #bBull Dog#k.");
			cm.dispose();
		}
	}
}

