//
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("#e#kOk,boa sorte em sua jornada!");
        cm.dispose();
        return;
    }
                    if (status == 0) {
        cm.sendSimple ("#eOlá #d#h ##k! Você precisa de ajuda para treinar? aqui vai algumas sugestões:" +
        	"\r\n#L1##kLevel 1-20#k" +
                "\r\n#L2##kLevel 20-45" +
                "\r\n#L3##kLevel 45-65" +
                "\r\n#L4##kLevel 65-120" +
                 "\r\n#L6##kLevel 58-65" +
                "\r\n#L5##kLevel 110-120");
                     
} else if (selection == 1) {
	cm.warp(104040000);
	cm.dispose();
                 
} else if (selection == 2) {
        cm.warp(682010201);
	cm.dispose();
} else if (selection == 3) {
        cm.warp(682010202);
	cm.dispose();

} else if (selection == 4) {
        cm.warp(682010203);
	cm.dispose();

} else if (selection == 5) {
        cm.warp(240040510);
	cm.dispose();

} else if (selection == 6) {
        cm.warp(541010010);
	cm.dispose();

                   

    }
    
            }  