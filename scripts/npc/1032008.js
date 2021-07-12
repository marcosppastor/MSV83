/*
 * @author Marcos P
 * TrueMS - 2016
 * NPC ID 1032008 - Cherry
 * truems.net/
*/

function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("Voce deseja ir para Orbis?");
        else{
            cm.sendOk("O Barco para Orbis ja partiu. Seja paciente e aguarde a sua volta. O mesmo faz seu trageto de ida e volta em #e5 minutos#n.");
            cm.dispose();
        }
    }else{
        cm.sendOk("Veja se voce possui um Cupom para entrar no Barco.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
	if (mode <= 0) {
		cm.sendOk("Tudo bem. Quando decidir, fale comigo novamente!");
		cm.dispose();
		return;
    }
    cm.gainItem(4031045, -1);
    cm.warp(101000301);
    cm.dispose();
}	