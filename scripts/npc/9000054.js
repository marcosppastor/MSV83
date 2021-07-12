/*
var comum = Array(1072360,2012008,3011000,2049100,2049101,2070005,2070006,1492013,1482013,1472052,1472051,1462039,1452044,1442045,1432038,1422028,1412026,1382036,1372032,1372033,2022282,2022280,1102085,1102081,1102143,1102192);
var normal = Array(1072360,2012008,3011000,2049100,2049101,2070005,2070006,1492013,1482013,1472052,1472051,1462039,1452044,1442045,1432038,1422028,1412026,1382036,1372032,1372033,2022282,2022280,1102085,1102081,1102143,1102192);
var raro = Array(1072360,2012008,3011000,2049100,2049101,2070005,2070006,1492013,1482013,1472052,1472051,1462039,1452044,1442045,1432038,1422028,1412026,1382036,1372032,1372033,2022282,2022280,1102085,1102081,1102143,1102192);


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
        cm.sendOk("Ok, volte se quiser, existem muitos peixes por ai!");
        cm.dispose();
        return;
    }
    
    //if (cm.getMapId()===105040300 && cm.getLevel() <=34) {
    if (status == 0 ) {
			cm.sendSimple("Maaas que dia bonito hein #h #, tudo bem? Eu sou o #bPescador#k mas preciso de uma quantidade enorme de peixe creio que não vou conseguir pegar todos sozinho, gostaria de me ajudar? talvez em troca eu possa lhe dar algumas coisas la do meu rancho! !\r\n #d#L3# Ir para o mapa de pesca\r\n #d#L0#Me de informações \r\n #d#L1# Entregar peixes \r\n #d#L2# Retirar redes.");
      
            
    
    } else if (selection == 1) {
        if (selection == 1 && cm.haveItem(4001187, 50) && cm.haveItem(4001188,50) && cm.haveItem(4001189,50 )) {
                      cm.gainItem(4001187, -50);
                      cm.gainItem(4001188, -50);
                      cm.gainItem(4001189, -50);

			if (chance > 0 && chance <= 2) {
				cm.gainItem(icomum, 1);
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormal, 1);
			} else {
				cm.gainItem(iraro, 1);
			}
			cm.dispose();
                      
                      
	              cm.sendOk("Agradeço pela ajuda com os peixes, toma uma recompensa!.");
                      cm.dispose();
            } else {
	cm.sendOk("Parece que você não conseguiu me ajudar com os peixes,que pena...");
                cm.dispose();
        }
        } else if (selection == 2) {
      if (selection == 2 && cm.haveItem(2270008)) {
                      
	              cm.sendOk("Parece que você ainda tem redes,só posso lhe dar mais caso você use todas.");

                      
                      cm.dispose();
            } else {
                
                cm.gainItem(2270008 , 50);
	
                cm.dispose();
        }
        } else if (selection == 0) {
            
      	    cm.sendOk("O evento basicamente se consiste em o jogador ir a algum mapa com peixes e captura-los usando a rede, o jogador ao retirar as redes comigo, deve posiciona-las em uma tecla do teclado como se fosse uma skill, quando aparecer a mensagem #bCATCH#k, significa que o jogador pegou peixes, ao pegar o jogador ganha uma rede com peixes , ao clicar duas vezes na rede o jogador recebe os peixes, por tanto deixe sempre espaço no #bUSE#k e #bETC#k, uma quantia de #b50#k peixes de cada já são suficientes para me ajudar, #e 50 Beltin 50 Breakin #k e #b 50 Poppin!.");

            //cm.sendSimple ("Você gostaria de ir para o mapa PVP e lutar contra seus amigos, é necessário possuir no minimo o nivel 10.");
              
            
        
    
 } else if (selection == 3) {
            
cm.warp(970020000,0);
cm.dispose();
            //cm.sendSimple ("Você gostaria de ir para o mapa PVP e lutar contra seus amigos, é necessário possuir no minimo o nivel 10.");
              
            
        }
             
                    }
*/
     function start() {
//cm.gainItem()
cm.sendOk("Olá #h #, que lindo dia para pescar!");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
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