/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100004 Kiru (To Orbis)

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/
var menu = new Array("Orbis");
var method;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        } else if (mode == 0) {
            cm.sendNext("OK. volte se mudar de ideia..");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            for (var i = 0; i < menu.length; i++) {
                var display = "\r\n#L" + i + "##b Orbis (5000 mesos)#k";
            }
            cm.sendSimple("Hmm... Você gostaria de ir para orbis?\r\n" + display);

        } else if (status == 1) {
            if (cm.getMeso() < 5000) {
                cm.sendNext("Hmm... você tem certeza que possui #b5000#k Mesos? ...");
                cm.dispose();
            } else {
                cm.gainMeso(-5000);
                cm.warp(200000100);
                cm.dispose();
            }
        }
    }
}