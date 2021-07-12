function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (cm.getPlayer().getLevel()>10 && cm.getPlayer().isMarried() == 0) {
            if (!cm.haveItem(4000106,30)) {
                if (status == 0) {
                    cm.sendNext("Hey, você parece que precisa de provas de amor? Hmmm está pretendendo pedir a mão de alguém em casamento? Eu posso leva-las para você.");
                } else if (status == 1) {
                    cm.sendNext("Tudo que você tem a fazer é trazer-me 30 #b Algodão de ursinho de pelúcia#k.");
                    cm.dispose();
                }
            } else {
                if (status == 0) {
                    cm.sendNext("Uau, você foi rápido ! Aqui a prova de amor...");
                    cm.gainItem(4000106, -30)
                    cm.gainItem(4031370, 1);
                    cm.dispose();
                }
            }
        } else {
            cm.sendOk("Oi, eu sou Nana a fada amor ... e você quem é?");
            cm.dispose();
        }
    }
}