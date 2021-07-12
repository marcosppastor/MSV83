var status;
var chr;

function start() {
	chr = cm.getSender();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (chr == null) {
		cm.sendOk("Unfortunately the player has disconnected");
		cm.dispose();
		return;
	} else if (mode == 1)
        status++;
    else {
        if (status == 1 && mode == 0) {
            chr.dropMessage(1, "Your partner has declined your request.");
        } else {
            chr.dropMessage(1, "Your partner closed the npc chat.");
		}
		chr.setRingRequested(0);
        cm.dispose();
        return;
    }
	
	if (status == 0)
		cm.sendNext(chr.getName()+" has sent you a ring.");
	else if (status == 1)
		cm.sendAcceptDecline("Please note that if you accept, the ring is permanent until a GM destroys your rings.\r\n\r\nIf you accept this invitation it will cost you 10,000,000 mesos.");
	else if (status == 2) {
		var i = cm.makeRing(chr, chr.getRingRequested());
		if (i == 1) {
			cm.sendOk("Sucess");
		} else {
			cm.sendOk("Failed to create ring");
			chr.dropMessage("Failed to create ring");
		}
		chr.setRingRequested(0);
		cm.dispose();
	}
}