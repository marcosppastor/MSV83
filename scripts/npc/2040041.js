/*
 *Aqua Ballon - Stage 6 of LPQ =D
  *@author Jvlaple
  */

importPackage(Packages.client);

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (mode == 0 && status == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendNext("Ola e bem vindo ao sexto estagio da Missao de Ludibrium.\r\nNeste estagio voce e seu grupo tera de subir ate o top do mapa, 'entrando' nas caixas numericas.\r\nA sequencia e aleatoria. Logo, voce e seu grupo tera de encontrar uma forma para chegar ate o topo.\r\nLa havera um mapa que te levara ao setimo estagio da Missao de Ludibrium!");
		cm.dispose();
		}
	}
}