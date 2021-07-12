/*
 * Novo START_GAME Explorer
 * @author Marcos P
 * TrueMS - 2017
 * truems.net.br/
*/


var status = -1;

function start() {
    if (cm.getPlayer().getMapId() == 100030101 && (cm.getPlayer().getLevel() == 1))
        cm.sendYesNo("Ola #h #, bem vindo ao #bMapleStory Origens!#k\r\n\r\nPor acaso, deseja dar inicio a uma jornada repleta de missoes e aventura?!");
    else
        cm.sendNext("Ola #h #, tudo bem?");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && status == 0){
            cm.sendYesNo("Afinal, deseja #bsim#k ou #bnao#k iniciar a sua jornada repleta de missoes e aventura?!");
            return;
        }else if(mode == 0 && status == 1 && type == 0){
            status -= 2;
            start();
            return;
        }else if(mode == 0 && status == 1 && type == 1)
            cm.sendNext("Tudo bem...\r\nFale comigo quando desejar iniciar uma jornada de missoes e aventura!");
        cm.dispose();
        return;
    }
    if (cm.getPlayer().getMapId() == 100030101 && (cm.getPlayer().getLevel() == 1)){
        if(status == 0){
            cm.sendNext("Tudo bem...\r\nPara que voce prossiga para com sua jornada, peco que fale com #bUtah#k, pois ele o(a) orientara em sua jornada!");
        }else if(status == 1 && type == 1){
            cm.sendNext("Tudo bem...\r\nPara que voce prossiga para com sua jornada, peco que fale com #bUtah#k, pois ele o(a) orientara em sua jornada!");
        }else if(status == 1){
            cm.warp(100030102);
			cm.gainExp(15);
			cm.mapMessage("[Nova Missao] " + cm.getPlayer().getName() + ", fale com o Utah caso queira receber orientacao para inicio de sua jornada.");
            cm.dispose();
        }else{
            cm.warp(100030102);
			cm.gainExp(15);
			cm.mapMessage("[Nova Missao] " + cm.getPlayer().getName() + ", fale com o Utah caso queira receber orientacao para inicio de sua jornada.");
            cm.dispose();
        }
    }else
    if(status == 0)
        cm.sendPrev("Espero ve-lo(a) forte, portanto, boa sorte para com sua jornada!");
    else
        cm.dispose();
}