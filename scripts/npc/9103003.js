/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		cm.dispose();
		return;
	}
	
	if (status == 0) {
		cm.sendNext("Ate a proxima!");
	} else if (status == 1) {
		cm.warp(220000000);
		cm.removeAll(4001106);
		cm.dispose();
	}
}