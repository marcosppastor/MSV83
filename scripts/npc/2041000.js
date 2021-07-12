/**
----------------------------------------------------------------------------------
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
                var display = "\r\n#L" + i + "##b Orbis (Necessário ter o ticket)#k";
            }
            cm.sendSimple("Hmm... Você gostaria de ir para orbis?\r\n" + display);

        } else if (status == 1) {
           if(!cm.haveItem(4031045)){
                cm.sendNext("Hmm... você tem certeza que possui #bTicket para orbis?#k  ...");
                cm.dispose();
            } else {
                cm.gainItem(4031045,-1);
                cm.warp(200000100);
                cm.dispose();
            }
        }
    }
}




