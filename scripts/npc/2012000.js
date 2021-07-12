var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection){
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
        }
        if (status == 0)  {
			//cm.sendSimple("Olá #h #, tudo bem?. Me chamo #bAgatha#k e faço as vendas de passagens para outros Continentes.\r\n Os preços para todas as viagens são #b10.000 mesos#k, a seguir escolha seu destino.\r\nPara qual destes locais você deseja ir?\r\n#L0##bEllinia para Ilha de Victoria#k#l \r\n#L1##bLudibrium#k#l \r\n#L2##bLeafre#k#l \r\n#L3##bAriant#k#l \r\n#L4##bMu Lung#k#l \r\n#L6##bEreve#k#l\n\\r\n#L5##bDesejo ficar em Orbis#k#l\n\
			
			cm.sendSimple("Olá #h #, tudo bem?. Me chamo #bAgatha#k e faço as vendas de passagens para outros Continentes.\r\n Os preços para todas as viagens são #b10.000 mesos#k, a seguir escolha seu destino.\r\nPara qual destes locais você deseja ir?\r\n#L0##bEllinia para Ilha de Victoria#k#l \r\n#L1##bLudibrium#k#l \r\n#L2##bLeafre#k#l \r\n#L3##bAriant#k#l \r\n#L4##bMu Lung#k#l\\r\n#L5##bDesejo ficar em Orbis#k#l\n\
    ");
    }
        else if (status == 1 && selection == 0 && cm.getMeso() >= 10000) {

	cm.gainMeso(-10000);
        cm.gainItem(4031047);
	cm.sendOk("Pronto. Tenha uma boa viagem!");
        } else if (status == 1 && selection == 1 && cm.getMeso() >= 10000 ){
            cm.gainMeso(-10000);
            cm.warp(220000100, 0);
        }
        else if (status == 1 && selection == 2 && cm.getMeso() >= 10000 ){
            cm.gainMeso(-10000);
            cm.warp(240000100, 0);
        }
        else if (status == 1 && selection == 3 && cm.getMeso() >= 10000){
            cm.gainMeso(-10000);
            cm.warp(260000100, 0);
        }
        else if (status == 1 && selection == 4 && cm.getMeso() >= 10000){
            cm.gainMeso(-10000);
            cm.warp(250000100, 0);
        }
        else if (status == 1 && selection == 6){
            cm.gainMeso(-10000);
            cm.warp(130000210,0);
        }
        else {
            cm.dispose();
    }
}
	