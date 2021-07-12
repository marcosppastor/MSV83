var comum = Array(2100005,2100006,2100007,2100001,2100002,2100003,2100004,2040933,2049100 );
var normal = Array(1102226,1102143,1102182,1102040,1102043,2022273,2012008,2070011,1082150,1082148,1082147,1082146,1082145,1492013,1482013,1472051,1332049,1332050,1382036,1372032,1452044,1462039,1302059,1322052,1412026,1432038);
var raro = Array(1092059,1092060,1082149,1102172,1492037,1492036,1492035,1482032,1482031,1472086,1472084,1472083,1462063,1452071,1452070,1452069,1452068,1452067,1452066,1442078,1442075,1442074,1432055,1432054,1422043,1422042,1412039, 1412038,1402059,1402058,1402057,1402056,1382068,1382067,1382066,1372051,1372050,1332087,1332086,1332085,1332084, 1322069,1372050,1302112,1302113,1312042,1312043,1322068 );


function getRandom(min, max) {
	if (min > max) {
		return(-1);
	}

	if (min == max) {
		return(min);
	}

	return(min + parseInt(Math.random() * (max - min + 1)));
}

var icomum = comum[getRandom(0, comum.length - 1)];
var inormal = normal[getRandom(0, normal.length - 1)];
var iraro = raro[getRandom(0, raro.length - 1)];

var chance = getRandom(0, 5);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("Ok, como queira!");
        cm.dispose();
        return;
    }
    
    //if (cm.getMapId()===105040300 && cm.getLevel() <=34) {
    if (status == 0 ) {
			cm.sendSimple("Olá #h #, tudo bem? Eu sou o #bAssistente PVP#k e trabalho com transporte e trocas PVP!\r\n #d#L0#Ir para o mapa PVP \r\n #d#L1# Trocar medo letal por itens \r\n #d#L2# Trocar medo letal por EXP.");
      
            
    
    } else if (selection == 1) {
        if (selection == 1 && cm.haveItem(4031448, 50)) {
                      cm.gainItem(4031448, -50);

			if (chance > 0 && chance <= 2) {
				cm.gainItem(icomum, 1);
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormal, 1);
			} else {
				cm.gainItem(iraro, 1);
			}
			cm.dispose();
                      
                      
	              cm.sendOk("Sua troca foi concluida com sucesso.");
                      cm.dispose();
            } else {
	cm.sendOk("Parece que você não possui os itens necessários,para realizar esta troca é necessario ter no minimo 50 #bmedos letais.");
                cm.dispose();
        }
        } else if (selection == 2) {
            
        if (cm.getPlayer().getLevel() >100){
                	cm.sendOk("Sendo um jogador acima do nível 100 você não pode adquirir experiência no PVP, somente itens como bonificação!");
                        cm.dispose();

            }
            
     else if (cm.haveItem(4031448, 30)) {
                      cm.gainItem(4031448, -30);
                      cm.getPlayer().gainExpRichie();
	              cm.sendOk("Sua troca foi concluida com sucesso.");

                      
                      cm.dispose();
            } else {
	cm.sendOk("Parece que você não possui os itens necessários,para realizar esta troca é necessario ter no minimo #b20 medos letais.");
                cm.dispose();
        }
        } else if (selection == 0) {
            if (cm.getPlayer().getLevel() >=10) {
      
            //cm.sendSimple ("Você gostaria de ir para o mapa PVP e lutar contra seus amigos, é necessário possuir no minimo o nivel 10.");
              
            cm.warp(800020400, 0);
            cm.dispose();
        }
    
 
             else {
	cm.sendOk("Parece que você ainda não possui o nivel 10 ou superior");
                cm.dispose();
            }
        }
     
    
}
















/*
function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        if (status == 0) {
            cm.sendYesNo ("Você gostaria de ir para o mapa PVP e lutar contra seus amigos?");
            status++;
        } else if (status == 1) {
            cm.warp(800020400, 0);
            cm.dispose();
        }
    }
} 

*/