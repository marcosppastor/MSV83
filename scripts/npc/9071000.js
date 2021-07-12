/*
 * @author Marcos P
 * equinox - 2017
 * truems.net.br/
*/

importPackage(Packages.client);
importPackage(Packages.server.maps);

var status = 0;
var tempo = new Date();
var hora = tempo.getHours();

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if(cm.getChar().getMapId()== 951000000){
			if (status == 0) {
				cm.sendNext("Bem vindo a #dFolia dos monstros.");
			} else if (status == 1) {
				cm.sendSimple("O que desejas?\r\n#b#L1#Entrar na Folia\r\nL2#Como funciona esta missão?#l");
			} else if (selection == 1) {
				if (hora >= 03 && hora < 04 || hora >= 06 && hora < 07 || hora >= 09 && hora < 10 || hora >= 12 && hora < 13 || hora >= 15 && hora < 16 || hora >= 18 && hora < 19 || hora >= 23 && hora < 00){ 
					if(!cm.getPlayer().getLevel() > 77) {
						cm.sendOk("Voce precisa estar no minimo LV. 77 para entrar."); 
						cm.dispose();
						return;
					}
					//cm.EntradaMPQ(cm.getC());
					cm.sendOk("Missao desativada temporariamente.\r\nA mesma sera conclusa em #b14/02."); 
					cm.dispose();
					} else { 
					cm.sendOk("Ainda nao e hora de funcionamento da #dMissao Maple#k.\r\nPor favor, verifique os horarios e volte mais tarde.");
					cm.dispose();
					}
            } else if (selection == 2) {
				cm.sendOk("Os horarios disponiveis para esta missao, sao:\r\n\r\n#d03:00 as 04:00 #e(AM)#n;\r\n06:00 as 07:00 #e(AM)#n;\r\n09:00 as 10:00 #e(AM)#n;\r\n-\r\n12:00 as 13:00 #e(PM)#n;\r\n15:00 as 16:00 #e(PM)#n;\r\n18:00 as 19:00 #e(PM)#n;\r\n23:00 as 00:00 #e(PM)#n.");
				cm.dispose();
			} else if (selection == 3) {
				cm.sendOk("Na #dMissao Maple#k voce devera derrotar os monstros que vierem a aparecer e coletar os drops dos mesmos. Apos certa quantidade de drops coletados, voce podera trocar por items maple LV. 77 ou ate mesmo LV 120.");
				cm.dispose();
			}	
		}
	}
}	