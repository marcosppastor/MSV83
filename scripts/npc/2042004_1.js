importPackage(net.sf.odinms.net.channel);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server.maps);

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
        	cm.dispose();
	} else {
        	if (mode == 1) {
            		status++;
		} else {
            		status--;
        	}
        	if (status == 0) {
				cm.warpParty(980000000);
				cm.dispose();
                    if (cm.getParty() == null) {
                    cm.warp(980000000);
                    cm.dispose();
                    return;
                } 
			
	} 
  }
}