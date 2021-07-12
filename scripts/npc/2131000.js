/*
 * @author Marcos P
 * OrbisMS - 2015
 * orbisms.net/


var status = 0;
var segundaClasse = Array("#L0#Soldado#l\r\n#L1#Escudeiro#l\r\n#L2#Lanceiro#l", "#L3#Feiticeiro Fogo/Veneno#l\r\n#L4#Feiticeiro Gelo/Raio#l\r\n#L5#Clerigo#l", "#L6#Cacador#l\r\n#L7#Balesteiro#l", "#L8#Assassino#l\r\n#L9#Arruaceiro#l", "#L10#Lutador#l\r\n#L11#Atirador#l");
var jobs = Array(110, 120, 130, 210, 220, 230, 310, 320, 410, 420, 510, 520);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getPlayer().getLevel() == 10 || (cm.getPlayer().getJob().getId() == 0 && cm.getPlayer().getLevel() >= 10)) {
                cm.sendSimple("#b#L0#Guerreiro#l\r\n#L1#Bruxo#l\r\n#L2#Arqueiro#l\r\n#L3#Gatuno#l\r\n#L4#Pirata#l#k");
            } else if (cm.getPlayer().getLevel() == 30) {
                cm.sendSimple("#b" + segundaClasse[(cm.getPlayer().getJob().getId() / 100) - 1] + "#k");
                status++;
            } else {
                cm.sendOk("Ola, voce esta tendo um bom dia?");
                cm.dispose();
            }
        } else{
            if (status == 1)
                cm.changeJobById((selection + 1) * 100);
            else if (status == 2)
            cm.changeJobById(jobs[selection]);
            cm.sendOk("Sua classe foi alterada!");
            cm.dispose();
        }
    }
}
*/