
//Author: Moogra
 var invasao1= Array (8130100,6130101, 6300005, 9400205,8160000,8170000,9400567,8180001,8180000,9400549,9300140,9300139,9300028);

function start() {
   if( cm.getPlayer().getClient().getChannel()==1){
    cm.sendSimple("Eu sou o invocador de Boss de #rTrue MapleStory! #k.\r\n Você gostaria que eu sumonasse algum mob para você? o preço para sumonar mobs estão logo abaixo \r\n Por favor,escolha! #b\r\n#L0#Papulatus clock ,(10.000.000) Mesos#l\r\n#L3#Anego(15.000.000) Mesos#l\r\n#L4#Zakum (120.000.000) Mesos#l\r\n#L5#BigFoot (20.000.000) Mesos\r\n#L6#Invasão Fácil (5.000.000) Mesos\r\n#L7#Invasão Média (10.000.000) Mesos#k \r\n#L8# #rSair deste mapa #k");
}

else {
    cm.sendSimple("Este NPC está disponível apenas no canal 1.  \r\n#L8# #rSair deste mapa #k");

}
}
function action(mode, type, selection) {
    
	if (selection == 0) {
		if ((cm.getMeso() >= 10000000)) {
			cm.sendOk("#eCuidado!#n#k\r\n#do Boss de sua escolha foi Spawnado..");
			cm.gainMeso(-10000000);
                        cm.summonMob(8500001);
                        cm.mapMessage(5, "[Aviso] O boss escolhido foi Sumonado por algum jogador!");
                        cm.dispose();
			}
			else if (!cm.getMeso() <= 10000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos necessária para sumonar esse Boss.");
			cm.dispose();
			}
	}
		
             
if (selection==1){
    
    if((cm.getMeso() >=5000000)){
    cm.sendOk("#eCuidado!#n#k\r\n#do Boss de sua escolha foi Spawnado..");
    cm.gainMeso(-5000000);
    cm.summonMob(8510000);
    cm.mapMessage(5, "[Aviso] O boss escolhido foi Sumonado por algum jogador!");

    cm.dispose();
    
    }

   else if (!cm.getMeso() <= 5000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos necessária para sumonar esse Boss.");
			cm.dispose();
			}
}      

if (selection==2){
    
    if((cm.getMeso() >=50000000)){
    cm.sendOk("#eCuidado!#n#k\r\n#do Boss de sua escolha foi Spawnado..");
    cm.gainMeso(-50000000);
    cm.summonMob(9400608);
    cm.mapMessage(5, "[Aviso] O boss escolhido foi Sumonado por algum jogador!");

    cm.dispose();
    
    }

   else if (!cm.getMeso() <= 50000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos necessária para sumonar esse Boss.");
			cm.dispose();
			}
}      
if (selection==3){
    
    if((cm.getMeso() >=15000000)){
    cm.sendOk("#eCuidado!#n#k\r\n#do Boss de sua escolha foi Spawnado..");
    cm.gainMeso(-15000000);
    cm.summonMob(9400121);
    cm.mapMessage(5, "[Aviso] O boss escolhido foi Sumonado por algum jogador!");

    cm.dispose();
    
    }

   else if (!cm.getMeso() <= 15000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos necessária para sumonar esse Boss.");
			cm.dispose();
			}
}    

    if (selection==4){
    
    if((cm.getMeso() >=120000000)){
    cm.sendOk("#eCuidado!#n#k\r\n#do Boss de sua escolha foi Spawnado..");
    cm.gainMeso(-120000000);
    cm.summonMob(8800000);
    //for (i=8800003; i<8800011; i++)
     //cm.spawnMonster(i)
    
    //cm.summonMob(mobzk);
    cm.mapMessage(5, "[Aviso] O boss escolhido foi Sumonado por algum jogador!");

    cm.dispose();
    
    }

   else if (!cm.getMeso() <= 100000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos necessária para sumonar esse Boss.");
			cm.dispose();
			}
}   

if (selection==5){
    
    if((cm.getMeso() >=20000000)){
    cm.sendOk("#eCuidado!#n#k\r\n#do Boss de sua escolha foi Spawnado..");
    cm.gainMeso(-20000000);
    cm.summonMob(9400575);
    cm.mapMessage(5, "[Aviso] O boss escolhido foi Sumonado por algum jogador!");

    cm.dispose();
    
    }

   else if (!cm.getMeso() <= 20000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos necessária para sumonar esse Boss.");
			cm.dispose();
			}
}    

if (selection==6){
    
    if((cm.getMeso() >=5000000)){
    cm.sendOk("#eCuidado!#n#k\r\n#do Boss de sua escolha foi Spawnado..");
    cm.gainMeso(-5000000);
    cm.summonMob(8130100);
    cm.summonMob(6130101);
    cm.summonMob(6300005);
    cm.summonMob(9400205);
    cm.summonMob(8160000);
    cm.summonMob(8170000);
    cm.summonMob(9400567);
    cm.summonMob(8180001);
    cm.summonMob(8180000);
    cm.summonMob(9400549);
    cm.summonMob(9300140);
    cm.summonMob(9300139);
    cm.summonMob(9300028);
    cm.mapMessage(5, "[Aviso] O boss escolhido foi Sumonado por algum jogador!");

    cm.dispose();
    
    }

   else if (!cm.getMeso() <= 5000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos necessária para sumonar esse Boss.");
			cm.dispose();
			}
}    
if (selection==7){
    
    if((cm.getMeso() >=10000000)){
    cm.sendOk("#eCuidado!#n#k\r\n#do Boss de sua escolha foi Spawnado..");
    cm.gainMeso(-10000000);
    cm.summonMob(8130100);
    cm.summonMob(8150000);
    //cm.summonMob(9300139);
    //cm.summonMob(9300140);
    ///cm.summonMob(9300139);
    cm.summonMob(9300028);
    cm.summonMob(9001002);
    cm.summonMob(9001000);
    cm.summonMob(9001003);
    cm.summonMob(9001001);
    cm.summonMob(9500177);
    cm.summonMob(9300207);
    cm.summonMob(9300213);
    cm.summonMob(7130200);
    cm.summonMob(7130100);
    cm.summonMob(7130101);

    
    
    cm.mapMessage(5, "[Aviso] O boss escolhido foi Sumonado por algum jogador!");

    cm.dispose();
    
    }

   else if (!cm.getMeso() <= 10000000) {
			cm.sendOk("#dLamento, mas você não possui a quantia de mesos necessária para sumonar esse Boss.");
			cm.dispose();
			}
}    


if (selection==8){
    
    cm.warp(910000000);
    cm.dispose();
}
}            



 