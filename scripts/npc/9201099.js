/*
 * @author Marcos P
 * TrueMS - 2017
 * truems.net.br/
 * Crystal Ilbi - PT. 1


*/
function start() {
	cm.sendSimple("Que tal forjar a sua Ilbi de Cristal (#i2070016#), #h #?\r\n\r\nEste é o #bprimeiro passo#k para a criação de uma Ilbi de Cristal, pois estou vendendo um dos materiais necessarios para que você possa forja-la.\r\n\r\nCaso possua interesse, a materia prima que estou vendendo é a Chave (#i4032440#).\r\n\r\nVocê podera obte-la pagando-me #b35.000.000 mesos.#k\r\n\r\n#L0#Irei pagar 35.000.000 #fUI/UIWindow.img/QuestIcon/7/0#\r\n#b");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if ((cm.getMeso() >= 35000000)) {
			cm.gainMeso(-35000000);
            cm.gainItem(4032440, 1);	
			cm.sendOk("#e#dPronto.#n#k\r\n#dSeu item foi comprado com sucesso!");
			cm.mapMessage("O primeiro passo foi dado. Agora cumpra o segundo, falando com Joko!");
            cm.dispose();
			}
			else if (!cm.getMeso() <= 35000000) {
			cm.sendOk("#dLamento, mas você não possui 35.000.000  #fUI/UIWindow.img/QuestIcon/7/0#.");
			cm.dispose();
			}
	}
}



