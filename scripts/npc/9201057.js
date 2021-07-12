function start() {
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001)
        cm.sendYesNo("Vagoes para a " + (cm.c.getPlayer().getMapId() == 103000100 ? "Cidade de Folha Nova" : "Cidade de Kerning - Ilha de Victoria") + " sai a todo minuto!\r\nE cobrado uma taxa de #b5000 mesos#k.\r\nVoce deseja comprar um #b#t" + (4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000)) + "##k?");
    else if (cm.c.getPlayer().getMapId() == 600010002 || cm.c.getPlayer().getMapId() == 600010004)
        cm.sendYesNo("Voce realmente deseja sair? Caso saia, nao podera voltar.\r\nRecomendo que seja paciente, pois ja estamos de partida! Alem do mais, chegaremos em apenas #r1 minuto#k apos partirmos daqui.");
}

function action(mode, type, selection) {
    if(mode != 1){
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001){
        if(cm.getMeso() >= 5000){
            cm.gainMeso(-5000);
            cm.gainItem(4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000), 1);
            cm.sendNext("Boa viagem!");
        }else
            cm.sendNext("Voce nao possui #bmesos#k.");
    }else{
        cm.warp(cm.c.getPlayer().getMapId() == 600010002 ? 600010001 : 103000100);
    }
    cm.dispose();
}