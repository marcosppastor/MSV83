var status = 0;
var PQItems = new Array(4001095, 4001096, 4001097, 4001098, 4001099, 4001100, 4001101, 4001101);

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
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
                var eim = cm.getPlayer().getEventInstance(); // Remove them from the PQ!
		if(cm.getChar().getMapId()== 910010300){
			if (status==0) {
				cm.sendNext("Que sorte a sua hein? Tente novamente mais tarde.");			
			}else if (status == 1){
                                for (var i = 0; i < PQItems.length; i++) {
				cm.removeAll(PQItems[i]);
                                }
				cm.warp(100000200, 0);
				cm.dispose();
			}
		} if (cm.getPlayer().getMap().getId() == 910010200) { //Bonus map	
		    if (status == 0) {
				cm.sendYesNo("Deseja sair do bonus agora?");
				} else {
					for (var i = 0; i < PQItems.length; i++) {
					cm.removeAll(PQItems[i]);
				    }
				    //eimleftParty(cm.getPlayer());
					cm.warp(910010400);
					cm.dispose();
                    return;
				}
		} else if (cm.getPlayer().getMapId() == 910010100) {
			if (status == 0) {
				cm.sendYesNo("Gostaria de ir para #rCidade dos Porcos#k? E uma cidade onde os porcos estao em toda parte, voce pode encontrar alguns itens valiosos la!");
			} else if (status == 1) {
				cm.mapMessage("Voce foi levado para Cidade dos Porcos.");
				var em = cm.getEventManager("CidadePorco");
				if (em == null) {
					cm.sendOk("Evento nao esta indisponivel.");
					cm.dispose();
				}
				else {
					em.startInstance(cm.getParty(),cm.getChar().getMap());
					party = cm.getChar().getEventInstance().getPlayers();
				}
				cm.dispose();
			}
		}
	}
}	