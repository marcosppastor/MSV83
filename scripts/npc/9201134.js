/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

var status;
var minLevel = 90;
var state;
var maxPlayers = 6;

function isLeader(){
    return cm.isLeader();
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
		status++;
        if (mode == 0 && status == 0) {
			cm.sendOk("Até mais!");
            cm.dispose();
            return;
        }
        if (status == 0) {
            if (cm.getPlayer().getLevel() < minLevel && !cm.getPlayer().isGM()) {
                //cm.warp(211042300);
                cm.sendOk("Volte quando estiver preparado para enfrentar o Scarlion/Targa!\r\nPara que voce possa participar, requer-se que você seja no minimo #eLV. 90#n.");
                cm.dispose();
                return;
            }
            cm.sendSimple("Oi #h #, eu sou a #bAldol#k, a guardiã da entrada do\r\n#eScarlion#n e #eTarga#n.\r\nO que você gostaria de fazer?#b\r\n#L0#Adquirir um #eSpirit of Fantasy Theme Park#n#l\r\n#L1#Abandonar a batalha contra o #eScarlion#n e #eTarga#n#l");
        }
        else if (status == 1) {
            state = selection;
            if (selection == 0) {//Participar
                cm.sendYesNo("A missão para obtenção de #b#eSpirit of Fantasy Theme Park#k#n foi removida. Você podera estar adquirindo este por apenas #e#r150000000 (150M) mesos cada.#n#k\r\nPor acaso, deseja fazer a adquiricao?");
	        } else if (selection == 1) {//Abandonar
			if (cm.getPlayer().getParty() == null) {//SEM PT
				cm.sendOk("Para que você possa sair, sera necessário estar em um grupo.");
			} else if (!cm.isLeader()) {//NÃƒO Ã‰ LIDER
				cm.sendOk("Para que você possa sair, sera necessário que o lider do grupo fale comigo.");
			} else {
				cm.sendYesNo("Você realmente deseja abandonar esta batalha contra o #eScarlion#n e #eTarga#n?");
				}
			}
        }
        else if (status == 2) {
            var em = cm.getEventManager("ScargaBattle");
            if (em == null)
                cm.sendOk("Esta missão esta temporariamente desativada.");
            else {
                if (state == 0) { //Compra
                    if(mode != 1){
						cm.sendOk("Sem um #i4032246#, você não poderá invocar o #e#bTarga ou Scarlion.#k");
						cm.dispose();
						return;
					}
					if (cm.c.getPlayer().getMapId() == 551030200){
						if(cm.getMeso() >= 150000000 && cm.canHold(4032246)){
						cm.gainMeso(-150000000);
						cm.gainItem(4032246,1);
						cm.sendOk("#eCompra efetuada com sucesso!#n\r\n#eSaiba:#n Tendo um #i4032246#, você poderá invocar #e#bTarga ou Scarlion.#k");
						cm.mapMessage("[Noticia] " + cm.getPlayer().getName() + " adquiriu um Spirit of Fantasy Theme Park e pode invocar um Targa/Scarlion");
						cm.dispose();
					}else
						cm.sendOk("Você não possui #bmesos suficiente#k, ou seu inventário esta cheio.");
					    cm.dispose();
					}
				}
                if (state == 1) {
					if (mode < 1) {
						cm.sendOk("Por favor, decida-se.");
						cm.dispose();
					}else if (cm.getPlayer().getParty() == null) {//SEM PT
					    cm.dispose();
					} else if (!cm.isLeader()) {//NÃƒO Ã‰ LIDER
				        cm.dispose();
					} else {
						cm.warpParty(551030100);
						//if (cm.getPlayer().getMap().getCharacters().size() < 1){
							//cm.getPlayer().getMap().killAllMonsters();
							//cm.getPlayer().getMap().resetReactors();
						//}
						cm.dispose();
					}
					/*else {
						if (cm.getPlayer().getMap().getCharacters().size() < 1){
							cm.getPlayer().getMap().killAllMonsters();
							cm.getPlayer().getMap().resetReactors();
						}
						cm.warp(551030100);
						//if (cm.getPlayer().getMap().getCharacters().size() < 2){
							//cm.getPlayer().getMap().killAllMonsters();
							//cm.getPlayer().getMap().resetReactors();
						//}
						cm.dispose();
					}
					*/
                }
            }
        }
    }
}