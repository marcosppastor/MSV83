/*
 * @author Marcos P
 * TrueMS - 2016
 * Konpei - Showa Town(801000000)
 * truems.net/
*/

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
	cm.dispose();
    } else {
	if (mode == 1)
	    status++;
	if (status == 0) {
	    cm.sendSimple ("O que voce busca comigo?\r #L0##bMe fale sobre o tal local esconderijo#l\r\n#L1#Me leve para o tal local esconderijo#l\r\n#L2#Nada#l#k");
	} else if (status == 1) {
	    if (selection == 0) {
		cm.sendNext("O tal local esconderijo possui vandalos, cujos destroem carros, pixam muros e vandalizam tudo! Alem de serem agressivos, fazem parte de uma certa mafia!\r\nShowa esta passando por um problema com esses vandalos. Ficamos sabendo que os baderneiros sao extremamente fortes, e as pessoas que estao no topo da hierarquia, sao os mais fortes!\r\nSegundo investigacoes, os mais fortes sao uma mulher que geralmente veste rosa, e um senhor, gordo. Este eh o mais esconderijo!\r\nCaso queira ir la, tenha cuidado!");
	    } if (selection == 1) {
		cm.sendNext("O tal local esconderijo possui vandalos, cujos destroem carros, pixam muros e vandalizam tudo! Alem de serem agressivos, fazem parte de uma certa mafia!\r\nShowa esta passando por um problema com esses vandalos. Ficamos sabendo que os baderneiros sao extremamente fortes, e as pessoas que estao no topo da hierarquia, sao os mais fortes!\r\nSegundo investigacoes, os mais fortes sao uma mulher que geralmente veste rosa, e um senhor, gordo. Este eh o mais esconderijo!\r\n#eBoa sorte!#n");
	    } if (selection == 2) {
		cm.sendOk("Menos mal!");
	    } if(selection != 1) {
		cm.dispose();
	    }
	} else if (status == 2) {
	    cm.warp(801040000, 0);
	    cm.dispose();
	}
    }
}