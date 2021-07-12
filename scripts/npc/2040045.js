/*
@	Author : Raz
@
@	NPC = Pink Balloon
@	Map = Hidden-Street <Stage B>
@	NPC MapId = 922011000
@	Function = LPQ - B Stage
@
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();//ExitChat
    }else if (mode == 0){
        cm.sendOk("Parabéns por terem chegado ao #bEstagio Boss#k da Missão em Grupo de Lidibrium.");
        cm.dispose();//No
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        var eim = cm.getChar().getEventInstance();
        if (status == 0)
            cm.sendYesNo("Você realmente deseja sair do estagio Bonus??");
        else if (status == 1) {
            if(isLeader){
                cm.sendOk("Tudo bem. Irei tira-lo daqui.");

            }       
            else{
                cm.sendOk("Fale para o #bLider do Grupo#k falar comigo.");
                cm.dispose();
            }
        }else if (status == 2) {
            var map = eim.getMapInstance(922011100);
            var party = eim.getPlayers();
            cm.warpParty(map, "st00", party);
            cm.dispose();
        }
    }
}
     
function isLeader(){
    if(cm.getParty() == null){
        return false;
    }else{
        return cm.isLeader();
    }
}
