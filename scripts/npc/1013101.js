/*
 * NPC Name: Utah
 * @author Marcos P
 * TrueMS - 2017
 * truems.net.br/
*/


var status = -1;

function start() {
    if (cm.getPlayer().getMapId() == 100030102 && (cm.getPlayer().getLevel() == 2))
        cm.sendYesNo("Oi #h #! Minha colega #bAnna#k falou de voce... Disse que tu buscas encontrar novas aventuras e novas missoes...\r\nPara que voce consiga realizar este sonho, precisaremos treinar para que voce fique cada vez mais forte!\r\nE ai, vamos?!");
    else
        cm.sendNext("#h #, para que voce possa dar continuidade a esta jornada, voce precisa estar no #bLV. 02#k e nao pode exceder esse limite!");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && status == 0){
            cm.sendYesNo("#h #, e ai, vamos treinar, ou nao?!");
            return;
        }else if(mode == 0 && status == 1 && type == 0){
            status -= 2;
            start();
            return;
        }else if(mode == 0 && status == 1 && type == 1)
			cm.sendOk("Garanto que com a sua forma atual, voce podera encontrar tudo, menos aventura e missoes...");
		    cm.dispose();
        return;
    }
    if (cm.getPlayer().getMapId() == 100030102 && (cm.getPlayer().getLevel() == 2)){
        if(status == 0){
            cm.sendNext("Otimo. Fico feliz em ouvir isso!\r\nPara que possamos treina-lo, estarei dando a voce um item muito importante (#i4032450#). A sua primeira missao e trocar este, falando com o #bHen#k.");
        }else if(status == 1 && type == 1){
            cm.sendNext("Tudo bem...\r\nPara que voce prossiga para com sua jornada, peco que fale com #bUtah#k, pois ele o(a) orientara em sua jornada!");
        }else if(status == 1){
			cm.removeAll(4032450);
			cm.gainItem(4032450, 1);
			cm.mapMessage("[Nova Missao] " + cm.getPlayer().getName() + ", fale Hen!");
            cm.dispose();
        }else{
            cm.gainItem(4032450, 1);
			cm.mapMessage("[Nova Missao] " + cm.getPlayer().getName() + ", fale Hen!");
            cm.dispose();
        }
    }else
    if(status == 0)
        //cm.sendPrev("Espero ve-lo(a) forte, portanto, boa sorte para com sua jornada!");
	cm.dispose();
    //else
        //cm.dispose();
}