/*
 * @author Marcos P
 * TrueMS - 2017
 * truems.net/
*/

var messages = Array("Ha uma pequena praga. Elimine-a!");

function start(ms) {
    if (ms.getPlayer().getMap().getId() == 100030103) {
        ms.getPlayer().startMapEffect(messages[(Math.random() * messages.length) | 0], 5120025);
    } else {
        ms.getPlayer().resetEnteredScript(); //in case the person dcs in here we set it at dojang_tuto portal
        ms.getPlayer().startMapEffect("Ha! Vamos ver se voce e capaz de ficar ate o fim!", 5120025);
    }
}
