2040049
//stag2

var status = 0;


function start() {
	status = -1;
	action(1, 0, 0);
}


function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk ("OrbisMS FTW!~");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
				cm.sendNext ("Eu gerencio o primeiro estagio do #bAquarioPQ#k!");
			}
		else if (status == 1) {
			if (cm.haveItem(4001022,30)) {
			cm.sendOk ("Otimo! Agora voce esta apto para o proximo estagio!");
			}
			if (!cm.haveItem(4001022,30)) {
			cm.sendOk ("Voce nao coletou:\r\n #b#i4001022# 30 Passes.#k");
			cm.dispose();
			}
		}
		else if (status == 2) {
		                cm.warpParty(230040300);
		                cm.givePartyExp(5000,cm.getPartyMembers());
                        cm.showEffect("quest/party/clear");
                        cm.playSound("Party1/Clear");
			
                        cm.gainItem(4001022,-30);
			cm.sendOk ("Neste estagio voce devera coletar dos monstros, \r\n #b#i4001022# 80 Passes#k / #e#rLEMBRE-SE DE NAO ENTRAR EM NENHUM OUTRO PORTAL.");
			dangerMap1.removePortals();
			cm.dispose();
		}
	}
}
