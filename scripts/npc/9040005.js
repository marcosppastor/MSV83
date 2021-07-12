var status = -1;

function action(mode, type, selection) {
    if (mode != 1) {
	cm.sendOk("Boa sorte em terminar a Missão de Clã!");
	cm.dispose();
	return;
    }
status++;
    if (status == 0) {
	if (cm.isPlayerInstance()) {
		cm.sendSimple("O que você gostaria de fazer? \r\n #L0#Sair da Missão de Clã#l");
	} else {
		cm.sendOk("Desculpe, mas eu não posso fazer nada por você!");
		cm.dispose();
	}
    }
    else if (status == 1) {
	cm.sendYesNo("Tem certeza de que quer fazer isso? Você não sera capaz de voltar!");
    }
    else if (status == 2) {
	if (cm.isPlayerInstance()) { 
		cm.getPlayer().getEventInstance().removePlayer(cm.getPlayer());
	}
	cm.dispose();
	return;
    }
}
