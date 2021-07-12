/*Amos the Strong - Entrance
**9201043
**@author Jvlaple
*/

var status = 0;
var MySelection = -1;
var status = 0;
var tempo = new Date();
var dia = tempo.getDay();
var ano = tempo.getFullYear();
var mes = tempo.getMonth();
var data = tempo.getDate();
var hora = tempo.getHours();
var min = tempo.getMinutes();
var seg = tempo.getSeconds();

importPackage(Packages.client);



function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.sendOk("Tudo bem, volte quando estiver pronto!");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		}
		else {
			status--;
		}
                if (hora >= 8 && hora < 9 || hora >= 20 && hora < 21  || hora >= 15 && hora < 16) {
		if (status == 0) {
			cm.sendSimple("Eu sou o Amos, o Forte. O que voce gostaria de fazer?\r\n#b#L0#Entrar no desafio de Amoria#l\r\n#L1#Trocar 10 chaves por um bilhete!#l\r\n#k");
		} else if (status == 1 && selection == 0) {
                    //var party = cm.getParty().getMembers();

			if (cm.haveItem(4031592, 1) && cm.getPlayer().isMarried() > 0) {
				cm.sendYesNo("Então desejas ir para #bEntrada#k ?");
				MySelection = selection;
			} else {
				cm.sendOk("Para entrar na AmoriaPQ, requer-se um #bbilhete de entrada#k e que você seja casado(a).");//e voce deve estar #ecasado(a)#n.");
				cm.dispose();
			}
		} else if (status == 1 && selection == 1) {
			if (cm.haveItem(4031593, 10)) {
				cm.sendYesNo("Então, você gostaria de um Ticket ?");
				MySelection = selection;
			} else {
				cm.sendOk("Por favor, de-me 10 chaves antes!");
				cm.dispose();
			}
		} else if (status == 2 && MySelection == 0) {
			cm.warp(670010100, 0);
			cm.gainItem(4031592, -1)
			cm.dispose();
		} else if (status == 2 && MySelection == 1) {
			cm.gainItem(4031593, -10);
			cm.gainItem(4031592, 1);
			cm.dispose();
		
            }
        } else {
			cm.sendOk("A amoria party quest está disponivel nos seguintes horários: \r\n #b8:00 as 9:00 AM#k \r\n#b15:00 as 16:00 PM#k \r\n#b20:00 as 21:00 PM#k!");
                        cm.dispose();
        }
	}
}

/*

function start() {
//cm.gainItem()
cm.sendOk("Olá #h #, tudo bem, a APQ está finalizada,lançaremos-a nos próximos dias!");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}

*/