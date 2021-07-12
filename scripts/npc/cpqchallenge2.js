var status = 0;
var prty;

function start(chrs) 
{
    status = -1;
	prty = chrs;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if ((mode == 0 && status == 1) || (mode == 0 && status == 4)) {
            cm.sendOk("Come back once you have thought about it some more.");
            cm.dispose();
            return;
        }
    }
    if (mode == -1) 
    {
        cm.dispose();
    } 
    else 
    {
        if (mode == 1)
        {
            status++;
        }
        else 
        {
            status--;
        }
		if (status == 0) {
			var snd = "Would you like to face the following party?\r\n";
			for (var i = 0; i < prty.size(); i++) {
				snd += prty.get(i).getName() + " (Level: " + prty.get(i).getLevel() + ")\r\n";
			}
			cm.sendAcceptDecline(snd);
		} else if (status == 1) {
			var ch = cm.getChrById(prty.get(0).getId());
			cm.startCPQ(ch, ch.getMapId() + 1);
			//cm.sendOk("" + (ch.getMapId() + 1));
			cm.dispose();
		}
	}
}