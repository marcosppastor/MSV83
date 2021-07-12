/*
Gachapon - ???????.js
Gachapon X Pontos Doador
Variáveis
OrbisMS - Marcos Paulo Pastor
www.OrbisMS.net - 2015
*/

var comum = Array(1432046, 1472065, 1472066, 1472067, 1332067, 1332068, 1332070, 1332071, 1452054, 1452055, 1452056, 1462047, 1462048, 1462049, 1022058, 1012108, 1012109, 1012110, 1012111, 1032046, 1102418, 1002553, 1102082, 1108080, 1102079, 1102083, 1102081, 1002424, 1002425, 1002857, 1102193);
var normal = Array(1332077, 1472072, 1462052, 1462048, 1102040, 1102041, 1102042);
var raro = Array(2340000, 2049100, 2049000, 2049001, 2049002, 2049003, 2049004, 2049005, 2070005, 2070006, 2040807, 2040806, 2044503, 2044703, 2043303, 2044403, 2044303, 2043803, 2043703, 2040506, 2070005, 2070006, 1302033, 1302058, 1302065, 1442030, 2040807, 2040807, 1082149);

function numberFormat(nStr,prefix){
	var prefix = prefix || '';
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + ',' + '$2');
	return prefix + x1 + x2;
}

function getRandom(min, max) {
	if (min > max) {
		return(-1);
	}

	if (min == max) {
		return(min);
	}

	return(min + parseInt(Math.random() * (max - min + 1)));
}

var icomum = comum[getRandom(1, comum.length - 1)];
var inormal = normal[getRandom(1, normal.length - 1)];
var iraro = raro[getRandom(1, raro.length - 1)];

var chance = getRandom(0, 3);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("Tudo bem. Ate a proxima!");
			cm.dispose();
			return;
		} else if (mode == 1) {
			status++;
		}

		if (status == 0) {
			cm.sendNext("Ola #h #, eu sou o #bMC Creu#k (creu, creu, creu) e faco a troca de pontos de doador por items aleatorios.\r\nAtualmente, voce possui #b" + numberFormat(cm.getChar().getDonatorPoints()) + "#k pontos de Doacao.\r\nQue tal trocar estes pontos por items?");
		} else if (status == 1) {
			if (!cm.getDonatorPoints() >= 1) {
				cm.sendOk("Voce nao e um Doador.\r\nCaso queira se tornar um, va no nosso site e clique na aba de #bDoacao.#k\r\n\r\nSite: www.orbisms.net/");
				cm.dispose();
			} else {
				cm.sendYesNo("Vejo que voce e um Doador!\r\nDeseja trocar 1 Ponto de Doacao por algum item aleatorio? Lembre-se que podem vir #bScrolls de GM!");
			}
		} else if (status == 2) {
			cm.gainDonatorPoints(-1);
			if (chance > 0 && chance <= 2) {
				cm.gainItem(icomum, 1);
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormal, 1);
			} else {
				cm.gainItem(iraro, 1);
			}
			cm.dispose();
		}
	}
}