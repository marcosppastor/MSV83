/*
 * NPC Name: Hen
 * @author Marcos P
 * TrueMS - 2017
 * truems.net/
*/


var status = -1;

function start() {
    if (cm.haveItem(4032451, 1) && (cm.getPlayer().getMapId() == 100030102) && (cm.getPlayer().getLevel() == 2))
        cm.sendYesNo("Obrigado por verificar e limpar meu galinheiro!\r\nPor acaso, deseja continuar sua missao e obter uma recompensa pela ajuda?");
	else
        cm.sendNext("#h #, #bUtah#k avisou-me que voce viria trazendo o Empty Lunch Box (#i4032450#).\r\nComo ele solicitou para que eu lhe desse uma missao, a sua missao sera a seguinte: Voce ira ate meu galinheiro e verificara se ha alguma infestacao. Caso tenha, mate-a e volte ate eu!");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && status == 0){
            cm.sendYesNo("Afinal, deseja obter uma recompensa e continuar para com sua jornada, ou nao?");
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
    if (cm.haveItem(4032451, 1) && (cm.getPlayer().getMapId() == 100030102) && (cm.getPlayer().getLevel() == 2)){
        if(status == 0){
            cm.sendNext("Como recompensa, darei-lhe as seguintes coisas:\r\nChapeu de Palha (#i1003028#), EXP e uma nova missao!\r\n\r\nPara que voce possa fazer esta nova missao, voce devera falar com o #bBull Dog!#k\r\nMais uma vez, muito obrigado pela ajuda.");
        }else if(status == 1 && type == 1){
            cm.sendNext("Tudo bem...\r\nPara que voce prossiga para com sua jornada, peco que fale com #bUtah#k, pois ele o(a) orientara em sua jornada!");
        }else if(status == 1){
			cm.removeAll(4032451);
			cm.removeAll(4032450);
			cm.gainItem(4032451, 1);
			cm.gainItem(4032447, 10);
			cm.gainItem(1003028, 1);
			cm.gainExp(34);
			cm.gainExp(57);
			cm.mapMessage("[Nova Missao] " + cm.getPlayer().getName() + ", fale com o Bull Dog!");
            cm.dispose();
        }else{
			cm.removeAll(4032451);
			cm.removeAll(4032450);
			cm.gainItem(4032451, 1);
			cm.gainItem(4032447, 10);
			cm.gainItem(1003028, 1);
			cm.gainExp(34);
			cm.gainExp(57);
			cm.mapMessage("[Nova Missao] " + cm.getPlayer().getName() + ", fale com o Bull Dog!");
            cm.dispose();
        }
    }else
    if(status == 0)
        //cm.sendPrev("Espero ve-lo(a) forte, portanto, boa sorte para com sua jornada!");
	cm.warp(100030103, 1)
	//cm.dispose();
    //else
        //cm.dispose();
}