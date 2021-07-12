/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() { 
    cm.sendYesNo("#h #, nos possuimos uma linda arvore de natal.\r\nPor acaso, deseja nos ajudar, decorando-a?");
}

function action(made, by, osiris) {
	if(made == 1)
        cm.warp(209000001);
    else
	    cm.sendOk("Tudo bem! Ate a proxima.");
        cm.dispose();
} 
