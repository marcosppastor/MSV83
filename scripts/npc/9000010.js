/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/


function start() {
    cm.sendOk("Lamento por voce nao ter conseguido se sobresair vitorioso neste evento...\r\nEstarei levando-o ao mapa que voce estava.\r\nAte a proxima!");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    cm.warp(cm.getPlayer().getSavedLocation("EVENTO"));
    cm.dispose();    
}  
*/

/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
cm.warp(106021600);
}

function action(mode, type, selection) {
cm.warp(106021600);
}