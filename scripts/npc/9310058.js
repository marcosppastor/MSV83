/*
var status = 0;

function start() {
        cm.sendYesNo("Deseja participar da #bMissão do boneco de neve#k?");
}

function action(mode, type, selection) {
    if(mode != 1)
        cm.dispose();
    else {
        status++;
        if(status == 1) {
               if(cm.getPlayer().getLevel() > 9) {
                cm.warp(889100100, 0);
                cm.dispose();
                } else {
                  cm.sendOk("E necesário ter no minino lv. 10!");
                  cm.dispose();
              }
        }
    }
}

*/

/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
//cm.gainItem()
cm.sendOk("Ola #h #, tudo bem?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}