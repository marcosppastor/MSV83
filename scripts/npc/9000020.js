/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

status = -1;

function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
    status++;
    if(mode != 1){
        if(mode == 0 && status == 4)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    if (cm.getPlayer().getMapId() == 800000000) {
        if (status == 0) 
            cm.sendSimple("Como esta a sua estadia? Enjoou daqui?#b\r\n#L0#Sim, tenho compromisso em #m" + cm.getPlayer().getSavedLocation("WORLDTOUR") + "#\r\n#L1#Nao, ainda tenho muito o que explorar neste local!");
        else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("Tudo bem. Ficamos contentes com a sua visita!\r\nCaso queira vir novamente, agende uma viagem conosco!");
            } else if (selection == 1) {
                cm.sendOk("Otimo. Continue explorando!");
                cm.dispose();
            }
        } else if (status == 2) {
            var map = cm.getPlayer().getSavedLocation("WORLDTOUR");
            if (map == undefined)
                map = 104000000;
            cm.warp(map, parseInt(Math.random() * 5));
            cm.dispose();
        }
    } else {
        if (status == 0) 
            cm.sendNext("Cansado dessa vida monotona? Que tal viajar para outro continente?!\r\nPor apenas #b3.000#k mesos, posso leva-lo(a) para um local cheio de cultura, misterios e monstros.");
        else if (status == 1) 
            cm.sendSimple("Otimo, parece que voce possui interesse!\r\nO local cujo qual tenho falado, e o Japao. Deseja ir?#b\r\n#L0#Sim, me leve para Mushroom Shrine (Japao)");
        else if (status == 2) {
            if(cm.getMeso() < 3000){
                cm.sendNext("Lamento, mas voce nao possui #b3.000#k mesos para fazer viajar..");
                cm.dispose();
                return;
            }
            cm.sendNextPrev("Aproveite a viagem!\r\nAh, recomendamos que deguste de Takoyaki, Yakisoba e outras delicidas da culinaria Japonesa!\r\nTenha uma boa viagem.");
        } else if (status == 3) {
            cm.gainMeso(-3000);
            cm.getPlayer().saveLocation("WORLDTOUR");
            cm.warp(800000000);
            cm.dispose();
        }
    }
}