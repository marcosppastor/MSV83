/*
 * @author Flav
 * @Re-coder Marcos DAGH
 * Server name: Unknown
 * Website author: Unknown



var comum = Array(2049100,2100016,2100001,2100002,2100005,2012008,2022179,3010002,3010003,3010004,3010005,3010006,3010009,3010011,3010015,3010018,3010019,3011000,3010013,3010016,3010017,3010040,3010045,3010041,3010072,3010062,3010064,3010066,3010085,3010069,3010062,3010060,3010045,3010063,2040013,2040029,2040206,2210021,2210022,2040758);
var normal = Array(2049100,2100016,2100001,2100002,2100005,2012008,2022179,3010002,3010003,3010004,3010005,3010006,3010009,3010011,3010015,3010018,3010019,3011000,3010013,3010016,3010017,3010040,3010045,3010041,3010072,3010062,3010064,3010066,3010085,3010069,3010062,3010060,3010045,3010063);
var raro = Array(2049100,2100016,2100001,2100002,2100005,2012008,2022179,3010002,3010003,3010004,3010005,3010006,3010009,3010011,3010015,3010018,3010019,3011000,3010013,3010016,3010017,3010040,3010045,3010041,3010072,3010062,3010064,3010066,3010085,3010069,3010062,3010060,3010045,3010063);




function getRandom(min, max) {
	if (min > max) {
		return(-1);
	}

	if (min == max) {
		return(min);
	}

	return(min + parseInt(Math.random() * (max - min + 1)));
}

var icomum = comum[getRandom(0, comum.length - 1)];
var inormal = normal[getRandom(0, normal.length - 1)];
var iraro = raro[getRandom(0, raro.length - 1)];

var chance = getRandom(0, 5);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("Ei,espere,cade meus pedaços deliciosos de bolo?!");
			cm.dispose();
			return;
		} else if (mode == 1) {
			status++;
		}

		if (status == 0) {
			cm.sendNext("Ei #h #, estou trocando estes deliciosos pedaços de bolo (#i4001167#) por diversos items!\r\n Vamos ver sua sorte?!");
		} else if (status == 1) {
			if (!cm.haveItem(4001167,50)) {
				cm.sendOk("Vejo que você não possui a quantidade correta de pedaços de bolo.\r\nVolte quando possuir no minimo #r30#k pedaços de bolo (#i4001167#).");
				cm.dispose();
			} else {
				cm.sendYesNo("Deseja trocar 50 pedaços de bolo (#i4001167#) por items aleatorios?, não se esqueça de verificar o espaço no seu inventário,em todas as abas!.");
			}
		} else if (status == 2) {
			cm.gainItem(4001167, -50);

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

*/

function start() {
cm.sendOk("Até o próximo evento !");
}

function action(m, t, s) {
   
   
   cm.dispose();
}
