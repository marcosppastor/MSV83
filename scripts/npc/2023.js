/* global cm */

/** 
 * Happy new year everybody :)
 * http://forum.ragezone.com/f427/bingo-1089644/
 * @author Las Systos
 */


var status = -1;
var price = 1000000; // idc about high rate servers, go learn some codez if you want item payment


function start() {
    //cm.resetBingo(true);
    if (!cm.hasCard()) {
        cm.sendYesNo("You do not have a Bingo Card yet, would you like to buy one?");
    } else {
        if (cm.hasFullCard()) {
            cm.sendOk("You won!");
            cm.resetBingo(true); // change to false if you do not want all players bingo cards to reset
            cm.worldMessage("[Bingo] " + cm.getPlayer().getName() + " won the bingo event! Bingo has been reset!");
            // add prices urself
        } else {
            cm.sendOk("This is your current bingo card:\r\n\r\n" + cm.showBingoCard());
        }
        cm.dispose();
    }
}


function action(m, t, s) {
    if (m === 1) {
        status++;
    } else if (m === 0) {
        cm.sendOk("Well I wasn't gonna sell you one anyway.");
        cm.dispose();
        return;
    } else {
        cm.dispose();
        return;
    }
    if (status === 0) {
        cm.sendYesNo("Alright, I can give you one for " + price + " mesos.\r\nAre you sure?");
    } else if (status === 1) {
        if (cm.getMeso() >= price) {
            cm.sendOk("Haha sucker I robbed you.");
            cm.gainMeso(-price);
            cm.makeBingoCard();
        } else {
            cm.sendOk("R u kiddin me? U have no moneyz");
        }
        cm.dispose();
    }
}