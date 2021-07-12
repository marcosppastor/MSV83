/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

var status = 0;

function start() {
    cm.sendYesNo("Voce esta na rua do esconderijo!\r\nPor acaso, voce esta com medo dos perigosos que esta tem a oferecer e deseja voltar para #m801000000#?");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.sendOk("Otimo!\r\nQuando quiser voltar para aa #m801000000#, fale comigo.");
            cm.dispose();
        } if (mode == 1) {
            status++;
        }
        if (status == 1) {
            cm.warp(801000000);
            cm.dispose();
        }
    }
}