/*
var map = 980040000;
var minLvl = 9;
var maxLvl = 256;
var minAmt = 1;
var maxAmt = 6;

function start() {
    if (cm.getParty() == null) {
        cm.sendOk("Se você quiser entrar na PQ, #b o líder do seu grupo precisa falar comigo#k.  ser do nível  10-30 e posuir um grupo de 2~6 pessoas.");
        cm.dispose();
    } else if (!cm.isLeader()) {
        cm.sendOk("Se você quiser entrar na PQ, #b o líder do seu grupo precisa falar comigo#k.  ser do nível  10-30 e posuir um grupo de 2~6 pessoas.");
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
            cm.sendOk("Você não possui um grupo com membrom suficientes #b"+minAmt+"#k - #r"+maxAmt+"#k eles precisam estar no mapa com você. .");
            cm.dispose();
        } else if (lvlOk != inMap) {
            cm.sendOk("Alguém do seu grupo não esta no nível necessário. #b"+minLvl+"#k - #r"+maxLvl+"#k.");
            cm.dispose();
        } else if (cm.getChar().getMapId() == 980040000 >= 1 || cm.getChar().getMapId() ==980040010 >= 1 || cm.getChar().getMapId() ==240050103 >= 1 || cm.getChar().getMapId() ==240050310 >= 1 ) {
            cm.sendOk("Alguém esta participand da PQ neste momento.");
            cm.dispose();
        }else{
            cm.warpParty(map);
		cm.mapMessage(6,"[Missão]");
	
	cm.mapMessage(6,"Ajude o mundo maple eliminando os monstros escondidos na torre da bruxax.");
	cm.mapMessage(1,"<Primeira etapa>\r\n Você e seu grupo precisam eliminar os monstros do mapa .\r\n Depois disto o líder do grupo deve falar com o npc Fairytale e proseguir para a segunda etapa.");
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

*/

/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
//cm.gainItem()
cm.sendOk("Jovem #h #, em breve levarei você a uma PQ divertida e especial,aguarde mais informações");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}