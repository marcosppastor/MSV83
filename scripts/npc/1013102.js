/*
 * NPC Name: Bull Dog
 * @author Marcos P
 * TrueMS - 2017
 * truems.net/
*/


var status = -1;

function start() {
    if (cm.haveItem(4032447, 10) && (cm.getPlayer().getMapId() == 100030102) && (cm.getPlayer().getLevel() == 4))
        cm.sendYesNo("Oba! Vejo que voce concluiu as missoes de #bUtah#k e #bHen#k!\r\nPor acaso, deseja continuar sua jornada?");
	else
        cm.sendNext("#h #, complete as missoes de #bUtah#k e #bHen#k para obter a minha racao (#i4032447#).");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && status == 0){
            cm.sendYesNo("Deseja continuar para com sua jornada, ou nao?");
            return;
        }else if(mode == 0 && status == 1 && type == 0){
            status -= 2;
            start();
            return;
        }else if(mode == 0 && status == 1 && type == 1)
			cm.sendOk("Passar bem.");
		    cm.dispose();
        return;
    }
    if (cm.haveItem(4032447, 10) && (cm.getPlayer().getMapId() == 100030102) && (cm.getPlayer().getLevel() == 4)){
        if(status == 0){
            cm.sendOk("Obrigado pela racao (#i4032447#)!");
        }else if(status == 1 && type == 1){
            cm.sendNext("#h #, complete as missoes de #bUtah#k e #bHen#k para obter meu Racao (#i4032447#).");
        }else if(status == 1){
			cm.removeAll(4032451);//Ovo
			cm.gainItem(4032451, 1);//Ovo
			cm.removeAll(4032447);//Racao
			cm.gainItem(4032452, 1);//Palha
			cm.gainExp(92);
			cm.gainExp(135);
			cm.mapMessage("[Nova Missao] " + cm.getPlayer().getName() + ", encontre e fale com o Gustav, pois ele lhe orientara!");
            cm.dispose();
        }else{
			cm.removeAll(4032451);//Ovo
			cm.gainItem(4032451, 1);//Ovo
			cm.removeAll(4032447);//Racao
			cm.gainItem(4032452, 1);//Palha
			cm.gainExp(92);
			cm.gainExp(135);
			cm.mapMessage("[Nova Missao] " + cm.getPlayer().getName() + ", encontre e fale com o Gustav, pois ele lhe orientara!");
        }
    }else
    if(status == 0)
        //cm.sendPrev("Espero ve-lo(a) forte, portanto, boa sorte para com sua jornada!");
	//cm.warp(100030103, 1)
	cm.dispose();
    //else
        //cm.dispose();
}