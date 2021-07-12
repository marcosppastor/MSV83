/*
 * @author Marcos P
 * TrueMS - 2017
 * truems.net.br/
 * Crystal Ilbi - PT. 4
*/


function start() {
	cm.sendSimple("Olá #h #. Vejo que ainda esta tentando forjar a sua Ilbi de Cristal (#i2070016#), certo? Bom, saiba que estou admirado pela sua coragem e persistência...\r\n\r\nComo sabe, este é o #bquarto estagio#k da missão da #bIlbi de Cristal#k. Para dar continuidade a sua missão, você terá de concluir este estágio!\r\nPara o quarto estágio, precisarei dos items obtidos dos dois ultimos estagios:\r\n\r\n1 unidades de #dCrystal Shard#k;\r\n\r\n1 unidade de #dNaricain Jewel#k;\r\n\r\n#L0##e4° Passo#n:\r\nTrocar 1 Crystal Shard (#i4031917#) e 1 Naricain Jewel (#i4031758#)\r\n#bPor 1 unidade de Crystal Ilbi Forging Manual#k (#i4031912#).\r\n#l");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if (cm.haveItem(4031917, 1) && (cm.haveItem(4031758, 1))) {
			cm.sendOk("#e#dPronto!#n#k\r\n#dTroca efetuada com sucesso.");
			cm.mapMessage("Quarto passo concluido. Volte e fale com Fiona para forjar sua Ilbi de Cristal!");
			cm.gainItem(4031917, -1);
			cm.gainItem(4031758, -1);
            cm.gainItem(4031912, 1);	
            cm.dispose();
		}
		else if (!cm.haveItem(4031917, 1) && (!cm.haveItem(4031758, 1))) {
			cm.sendOk("Lamento, mas você não possui 1 unidade exigida do item #dCrystal Shard#k #i4031917# e #dNaricain Jewel#k #i4031758#.");
			cm.dispose();
		}
	}
}

