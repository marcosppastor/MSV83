/*
 * @author Marcos P
 * TrueMS - 2017
 * truems.net.br/
 * Crystal Ilbi - PT. 5 (FINAL)


*/
function start() {
	cm.sendSimple("Para obter a sua #bIlbi de Cristal#k (#i2070016#), você tera de coletar e me entregar os seguintes itens:\r\n\r\n\r\n#b1#k unidade de Gold Key (#i4032440#);\r\n#b5#k unidades de Luk Crystal (#i4005003#);\r\n#b15#k unidades de Dark Crystal (#i4005004#);\r\n#b1#k Crystal Ilbi Forging Manual#k (#i4031912#);\r\n#b1#k Ilbi Throwing-Stars#k (#i2070006#);\r\n\r\n#L0#Possuo todos os requisitos.\r\n\r\n#bDesejo obter minha Ilbi de Cristal (#i2070016#)\r\n#l");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if (cm.haveItem(4005004, 15) && (cm.haveItem(4005003, 5) && (cm.haveItem(4032440, 1) && (cm.haveItem(4031912, 1) && (cm.haveItem(2070006, 1)))))) {
			cm.gainItem(4032440, -1);
			cm.gainItem(4005003, -5);
			cm.gainItem(4005004, -15);
			cm.gainItem(4031912, -1);
			cm.gainItem(2070006, -1);
            cm.gainItem(2070016, 1);	
			cm.sendOk("Parabéns por forjar sua Ilbi de Cristal (#i2070016#)! ");
			cm.mapMessage("Parabéns por forjar sua Ilbi de Cristal!");
            cm.dispose();
		}
		else {	
        cm.sendOk("Lamento, mas você não possui todos os itens exigidos.\r\nVerifique se você possui toda a requisição:\r\n\r\n#b1#k unidade de Gold Key (#i4032440#);\r\n#b4#k unidades de Luk Crystal (#i4005003#);\r\n#b10#k unidades de Dark Crystal (#i4005004#);\r\n#b1#k Crystal Ilbi Forging Manual#k (#i4031912#);\r\n#b1#k Ilbi Throwing-Stars#k (#i2070006#);");
			cm.dispose();
		}
	}
}


