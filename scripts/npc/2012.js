var status = 0;

function start() {
    cm.sendNext("I'm giving out free smeges to players everyday..");
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.sendOk("Fine, I'll give to other players if you don't want it..")
        cm.dispose();
    }else {
        if(mode > 0)
            status++;
        else if(mode < 0)
            cm.dispose();
        if (status == 1) {
            if (cm.getGiftLog('FreeGift') >= 1) {
                cm.sendOk("I'm sorry, You have already received your gift in this account today!! Please come back 24 hours later!!");
                cm.dispose();
            }else
                cm.sendYesNo("Grats, you haven't received your #r#e10#n#k free #v5072000# today, do you want to get your free gift now?");
        }else if (status == 2) {
            cm.gainItem(5072000, 10);
            cm.setBossLog('FreeGift');
            cm.sendOk("Congratulation!! You've reveived your #r#e10#n#k free #v5072000#!!");
            cm.dispose();
        } else
            cm.sendOk("Fine, I'll give to other players if you don't want it..")
    }
}