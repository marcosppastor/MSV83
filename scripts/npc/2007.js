/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
	cm.sendNext("Ate a proxima.");
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
		cm.sendNext("Ate a proxima.");
		cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) 
			cm.sendYesNo("Deseja pular o tutorial e ir direto para #bLith Harbor?");
	else if (status == 1){
			cm.warp(104000000);
			cm.dispose();
		}
	}
}