var fromMap = new Array(211000000,220000000,240000000);
var toMap = new Array(211040200,220050300,240030000);
var cost = new Array(45000,25000,55000);
var location;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
			cm.dispose();
		} else {
			if(mode == 0 && status == 1) {
				cm.sendNext("Hmm... pense novamente. Este táxi vale pelo serviço! Você não irá se arrepender!");
				cm.dispose();
				return;
			} 
			if (mode == 0 && status == 0) {
				cm.dispose();
				return;
			}
			if (mode == 1) {
				status++;
			} else {
				status--;
			}
		} 
		if(status == 0) {
        switch(cm.getPlayer().getMapId()) {
            case fromMap[0]:
                location = 0;
                break;
            case fromMap[1]:
                location = 1;
                break;
            case fromMap[2]:
                location = 2;
                break;
        }
        cm.sendNext("Olá, como vai? Este Táxi pode lhe levar para qualquer zona perigosa de #m"+cm.getPlayer().getMapId()+"# até #b#m"+toMap[location]+"##k no Continente de Ossyria! A Taxa de transporte de #b"+cost[location]+" meso#k pode parecer cara, mas não é tanto quando você quer se locomover com facilidade entre zonas perigosas!");
    } else if(status == 1) {
        cm.sendYesNo("#bVocê quer pagar "+cost[location]+" meso#k e ir para #b#m"+toMap[location]+"##k?");
    } else if(status == 2) {
        if(cm.getPlayer().getMeso() < cost) {
            cm.sendNext("Você não parece ter mesos suficientes. Eu lamento muito, mas eu não posso ajudar a menos que você pague. Arrume alguns mesos caçando e volte aqui quando você tiver mesos suficientes.");
            cm.dispose();
        } else{
            cm.warp(toMap[location]);
            cm.gainMeso(-cost[location]);
            cm.dispose();
        }
    }
}  