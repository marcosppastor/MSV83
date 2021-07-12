/*
 * @author Flav
 * @Re-coder Marcos P
 * Server name: Unknown
 * Website author: Unknown
 * 
 * Modified by Daghlawi for TrueMapleStory 



var comum = Array(3010005, 3010006, 3010007, 1442057, 3010011, 3010015,2049100,2040933,2040924,2040924,2040930,2040931,2040932,2040933 );
var normal = Array(2043701,2043801,2049100,2040306,2040304,2040205,2040029,2040501,2070005,1082150,1432009,1432013,1472054,1472053,1302106,2020023,2020022,2040008,2040009,2040010,2040011,2040012,2040013,2040014,2040015,2040016,2040017,20400118,2040304,2040305,2040306,2040307,2040308,2040317,2040318,2040319,2040320,2040321,2040322,2040323,2040324,2040325,2040326,2040327,2040328,2040610,2040611,2040623,2040624,2040625,2040626,2040627,2040915,2040918,2044701,2070005,2100000,2100001,2100002,2100003,2100004,2100005,2100006,2100007,2100009,2100016);
var raro = Array(2049100,2043705,2049100,2044701,2044702,2044704,2040758,2040760,2040306,2040304,2040205,2040413,2070006,1102043,1102040,1082145,1082146,1082147,1082148,2040921,2040915,2012008,1332053,2044910,2044817,2044713,2044613,2044513,2044420,2044320,2044220,2044120,2044028,2043813,2043713,2043313,2043220,2043120,2043022,2041068, 2041069,2040943,2040833,2040834,2040755,2040756,2040757,2040629,2040542,2040543,2040429,2040333,2040045,2040046,2101204,2101205,2101206 );


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
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("Até a proóxima!");
			cm.dispose();
			return;
		} else if (mode == 1) {
			status++;
		}

		if (status == 0) {
			cm.sendNext("Olá #h #, tudo bem? Eu sou a #bAgente E#k e estou trocando Gachapon Dourado (#i5220020#) por diversos items!\r\nPor acaso, deseja testar sua sorte?!");
		} else if (status == 1) {
			if (!cm.haveItem(5220020)) {
				cm.sendOk("Vejo que você não possui a quantidade exigida de Gachapon.\r\nVolte quando possuir #eum#n Gachapon Dourado (#i5220020#).");
				cm.dispose();
			} else {
				cm.sendYesNo("Por acaso, deseja trocar um Gachapon Dourado (#i5220020#) por items aleatorios?, tenha certeza de possuir espaço no seu inventário.");
			}
		} else if (status == 2) {
			cm.gainItem(5220020, -1);

			if (chance > 0 && chance <= 2) {
				cm.gainItem(icomum, 1);
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormal, 1);
			} else {
				cm.gainItem(iraro, 1);
			}
			cm.dispose();
		}
	}
}

*/

/* 
 * Scripted by Daghlawi
 


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("Retorne caso mude de ideia, ficarei aqui por 7 dias!");
        cm.dispose();
        return;
    }
    
if (status == 0) {
            cm.sendSimple("Após a reorganização do nosso servidor,resolvemos começar do zero,para correção de diversos bugs,e inclusão de todos os jogadores em uma categoria semelhante,incentivando assim a disputa,visto que no estado anterior havia uma tamanha desvantagem entre todos por itens adquiridos de forma ilegal,esperamos a compreensão de todos. \r\n Para ajuda-los neste novo recomeço oferecemos a vocês 7 dias de #r Double EXP #k  e também #r Double DROP #k de forma gratuita,caso queira participar, confirme a retirada de seu cartão logo abaixo:\n\
:\r\n #L1##i5211000# Cartão de Double EXP gratuito \r\n #L2##i5360000# Cartão de Double DROP grauito \r\n\r\n #L3# Não desejo partcipar ");
      
      
    } else if (selection == 1 ) {
                          
            
            cm.gainItem (5211000,1,false,false,604800000);
             cm.sendOk("Você recebeu o cartão de Double EXP com duração de 7 dias,não perca tempo,aproveite,esta promoção terá duração de sete dias, então,o cartão expirará do seu inventário,bom jogo !");
            cm.dispose();
            
        
        
        
        } else if (selection == 2 ) {
                          
            cm.gainItem (5360000,1,false,false,604800000);
             cm.sendOk("Você recebeu o cartão de Double DROP com duração de 7 dias,não perca tempo,aproveite,esta promoção terá duração de sete dias, então,o cartão expirará do seu inventário,bom jogo !");
            cm.dispose();
            
        

}else if (selection == 3 ) {
                          
            cm.dispose();
}
}

*/ 

/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Changes the players name.
	Can only be accessed with the item 2430026.
 */

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
                    if (cm.getLevel() >=15) {
				cm.sendYesNo("Sou a assistente de sugestões de #r True MapleStory #k.Antes de continuar leia abaixo as instruções: \r\n \r\n Tenha a certeza de que sua sugestão é valida e vai agregar com o servidor #rpositivamente#k. \r\n\r\nO jogador que fizer spam de sugestões receberá banimento de #r7#k dias , sem direito a reclamação, procure enviar somente sugestões necessárias!", 1);
			} else {
                             	cm.sendOk("Para mandar sugestões você precisa possuir o minimo de nível 15 .");

				cm.dispose();
			}
		} else if(status == 1) {
			cm.sendGetText("Por favor, digite sua sugestão a seguir, máximo de 100 caracteres.");
		} else if(status == 2) {
			var text = cm.getText();
                    if (cm.getLevel() >=15) {
				cm.getPlayer().mandarSugestao(text);
				cm.sendOk("A sua sugestão foi enviada com o seguinte texto #b" + text + "#k. obrigado pela sua contribuição com o servidor!", 1);
			} else {
				cm.sendNext("Me desculpe algo deu errado ao enviar sua sugestão", 1);
			}
		} else if(status == 3) {
			cm.dispose();
			//cm.getClient().disconnect(false, false);
		}
    }
}