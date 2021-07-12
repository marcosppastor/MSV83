/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
    cm.getPlayer().getStorage().sendStorage(cm.getClient(), 1200000);
    cm.dispose();
}