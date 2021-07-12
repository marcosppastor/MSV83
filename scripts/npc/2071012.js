var map = 970000108;
var minLvl = 10;
var maxLvl = 30;
var minAmt = 1;
var maxAmt = 6;

function start() {
    if (cm.getParty() == null) {
        cm.sendOk("Se você quiser entrar na PQ, #bo líder do seu grupo tem que falar comigo #k. Level disponivel 10 ~ 30, 2~6 pessoas.");
        cm.dispose();
    } else if (!cm.isLeader()) {
        cm.sendOk("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
        cm.dispose();
    }else{
        var party = cm.getParty().getMembers();
        var inMap = cm.partyMembersInMap();
        var lvlOk = 0;
        for (var i = 0; i < party.size(); i++) {
        if (party.get(i).getLevel() >= minLvl && party.get(i).getLevel() <= maxLvl)
            lvlOk++;
        }
        if (inMap < minAmt || inMap > maxAmt) {
            cm.sendOk("You don't have enough people in your party. You need a party of #b"+minAmt+"#k - #r"+maxAmt+"#k members and they must be in the map with you. There are #b"+inMap+"#k members here.");
            cm.dispose();
        } else if (lvlOk != inMap) {
            cm.sendOk("Someone in your party isn't the proper level. Everyone needs to be Lvl. #b"+minLvl+"#k - #r"+maxLvl+"#k.");
            cm.dispose();
        } else if (cm.getChar().getMapId() == 970000108 >= 1 || cm.getChar().getMapId() ==970000107 >= 1 || cm.getChar().getMapId() ==970000106 >= 1 || cm.getChar().getMapId() ==970000105 >= 1 ) {
            cm.sendOk("Someone is inside the PQ.");
            cm.dispose();
        }else{
            cm.warpParty(map);
		cm.mapMessage(6,"[Missão]");
	
	cm.mapMessage(6,"Ajude o mundo maple eliminando os monstros que o aterrorizam.");
	cm.mapMessage(1,"<Primeira etapa>\r\n Você e seu grupo precisam eliminar os monstros do mapa .\r\n Depois disto o líder do grupo deve falar com o npc e proseguir para a segunda etapa.");
	            cm.getPlayer().getMap().addMapTimer(60*5);
                    cm.spawnMonster(9300063,12,23);
                    cm.spawnMonster(9300063,12,23);
	            cm.spawnMonster(9300063,12,23);
	            cm.spawnMonster(9300063,12,23);
	            cm.spawnMonster(9300063,12,23); 
                    cm.spawnMonster(9300063,12,23);
                    cm.spawnMonster(9300063,12,23);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9500101,-263,196);
                    cm.spawnMonster(9400242,163,83)
                    cm.spawnMonster(9400242,163,83)
                    cm.spawnMonster(9400242,163,83)
                    cm.spawnMonster(9400242,163,83)
                    cm.spawnMonster(9400242,163,83)
                    cm.spawnMonster(9500100,122,196)
                    cm.spawnMonster(9500100,122,196)
                    cm.spawnMonster(9500100,122,196)
                    cm.spawnMonster(9500100,122,196)
                    cm.spawnMonster(9500100,122,196)



        cm.dispose();
        }
    }
}  