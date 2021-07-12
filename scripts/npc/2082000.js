/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Mue - Leafre Ticketing Booth(240000100)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
    1.2 - Cleanup by Moogra
	1.1 - Price like GMS [sadiq]
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

/*
 * Corrigido por Marcos P
 * TrueMS - 2016
 * truems.net/
*/

var preco = 30000;
var status = 0;

function start() {
    cm.sendYesNo("Oi #h #, tudo bem? Eu vendo bilhetes para #bOrbis!#k\r\nO navio para Orbis sai a cada #e10 minutos#n.\r\nCada bilhete custa #b"+preco+" mesos#k. Voce deseja comprar um #t4031045#?");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 1)
            status++;
        else {
            cm.sendNext("Entao voce deseja ficar aqui, certo?");
            cm.dispose();
            return;
        }
        if(status == 1) {
            if(cm.getMeso() >= preco && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-preco);
				cm.sendOk("Obrigado! Agora voce pode ir para o #bGuiche de Orbis#k falando com o #bTommie");
            } else
                cm.sendOk("Voce realmente possui #b"+preco+" mesos#k?");
            cm.dispose();
        }
    }
}
