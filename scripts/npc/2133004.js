importPackage(Packages.tools);
importPackage(Packages.server);
importPackage(Packages.server.life);

importPackage(java.awt);

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
       var party = cm.getPlayer().getEventInstance().getPlayers();
      var eim = cm.getPlayer().getEventInstance();

    switch(cm.getPlayer().getMapId()) {
	case 930000500:
	    if (!cm.haveItem(4001163)) {
	    	cm.sendNext("Pegue-me a joia daqui.");
	    } else {
               //clear(1, eim, cm);
		cm.warpParty(930000600);
                cm.givePartyExp(25000,party);

	    }
	    break;
    }
    cm.dispose();
}