importPackage(Packages.tools);
importPackage(Packages.server);
importPackage(Packages.server.life);

importPackage(java.awt);
var party2;
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
                			var party = cm.getPlayer().getEventInstance().getPlayers();

			var eim = cm.getPlayer().getEventInstance();
   party2 = eim.getPlayers();
    switch(cm.getPlayer().getMapId()) {
	case 930000000:
	    cm.sendNext("Bem-vindo.Entre no portal");
	    break;
	case 930000100:
	    cm.sendNext("Nós temos que eliminar todos esses monstros contaminados!");
            cm.dispose();
	    break;
	case 930000200:
	    cm.sendNext("Nós temos que eliminar todos esses espinhos contaminados,use o antidoto!");
             cm.dispose();

	    break;
	case 930000300:
	    cm.warpParty(930000400);
            cm.givePartyExp(25000,party);
            cm.dispose();


	    break;
	case 930000400:
            			var party = cm.getPlayer().getEventInstance().getPlayers();

	    if (cm.haveItem(4001169,20)) {
		cm.warpParty(930000500);
		cm.gainItem(4001169,-20);
                cm.givePartyExp(15000,party);
                cm.dispose();


	    } else {
		cm.sendOk("Temos que purificar todos esses monstros contaminados! Me entregue 20 pedras de monstros!");
                cm.dispose();

	    }
	    break;
	case 930000600:
	    cm.sendNext("É isso! Coloque a Pedra Mágica no Altar!");
            cm.dispose();

	    break;
	case 930000700:
	    cm.removeAll(4001163);
	    cm.removeAll(4001169);
	    cm.removeAll(2270004);
            cm.givePartyExp(800,party);
	    cm.warpParty(930000800);
            cm.givePartyItems(4001198,1,party);
            cm.givePartyNX(party2);
            cm.mapMessage(5,"Vocês finalizaram com sucesso a missão da Névoa Venenosa [Poison Haze]");
	     eim.disbandParty();
             //eim.finishPQ();
             //eim.dispose();
             cm.dispose();
           //eim.finishPQ();


	    
    break;

function isLeader(){
    return cm.isLeader();
}


}
}