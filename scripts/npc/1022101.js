/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/


function start() {
//cm.gainItem()
cm.sendOk("Lamento informar, mas ainda não estamos em vespera de Natal!");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}


/*
        Author: Biscuit
*/

/*
var status = 0;

function start() {
        if(cm.getMapId() == 100000000) {
        cm.sendYesNo("Você está curioso(a) sobre as aventuras que Vila Feliz reservou para você?");
       } else if (cm.getMapId() == 200000000) {
        cm.sendYesNo("Você está curioso(a) sobre as aventuras que Vila Feliz reservou para você?");   
       } else {
           cm.sendYesNo("Aguarde!");
       }
}

function action(mode, type, selection) {
    if(mode != 1)
        cm.dispose();
    else {
        status++;
        if(status == 1) {
            //cm.setPlayerVariable("HV_map", cm.getMapId()+"");
            cm.warp(209000000);
			//cm.sendOk("Não estamos em epoca de natal...");
            cm.dispose();
        }
    }
}

*/