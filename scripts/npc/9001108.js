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
/**
* @Author : iAkira/Kevintjuh93
**/
var status = 0; 
var selected = 0;

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
	if (cm.getPlayer().getMapId() == 100000000) {
		cm.sendNext("Lá! Você viu aquilo? Você não? Um OVNI acaba de passar ... lá !! Olha, alguém está sendo arrastado para o UFO ... arrrrrrgh, é Gaga! #rGaga acabou de ser sequestrada por um ET! #k");
	} else if (cm.getPlayer().getMapId() == 922240200) {
		cm.sendSimple("Você tem algo a dizer...? #b\b\r\n#L0#Eu quero salvar Gaga!.#l");
	} else if (cm.getPlayer().getMapId() >= 922240000 && cm.getPlayer().getMapId() <= 922240019) {
		cm.sendYesNo("Não se preocupe se voce falhar. Você terá mais chances. Você quer desistir?"); 
	} else if (cm.getPlayer().getMapId() >= 922240100 && cm.getPlayer().getMapId() <= 922240119) {
		var text = "Você passou por tantos problemas para resgatar Gaga, mas parece que estamos de volta ao quadrado. ";				
		if (cm.getPlayer().getMapId() >= 922240100) {
			text += "Por favor, não desista até que Gaga seja resgatada. Para mostrar-lhe o meu apreço pelo que você realizou até agora, eu lhe dei uma Nave espacial. Está bastante cansado, mas ainda deve ser operacional. Verifique a janela #bSkill #k.";
			
		} else 
			text += "Vamos voltar agora.";
                        
					
		cm.sendNext(text); 
               if (chance > 0 && chance <= 2) {
				cm.gainItem(icomum, 1);
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormal, 1);
			} else {
				cm.gainItem(iraro, 1);
			}
			cm.dispose();
                        cm.warp(922240200);
	}
}

function action(m,t,s) { 
	if (m > 0) {
		status++; 
		if (cm.getPlayer().getMapId() == 100000000) { // warper completed
			if (status == 1) {
				if (cm.getPlayer().getLevel() >= 12) 
					cm.sendYesNo("O que fazemos agora? É apenas um rumor ainda, mas ... Ouvi dizer que coisas assustadoras acontecem com você se você é seqüestrado por alienígenas ... pode ser que é o que aconteceu com Gaga agora mesmo! Por favor, resgate Gaga! \ r\ n #bResgatar Gaga pode ser um pouco indeterminado e sem pistas, mas # k ele tem um coração muito bom. Eu não posso deixar que algo terrível aconteça com ele. Certo! O vovô da lua pode saber como para resgatá-lo! Vou mandar você para a lua, por favor, vá ao vovô e resgate Gaga ");
				else 
					cm.sendOk("Ah! Parece que você não alcança os requisitos de nível para salvar o Gaga. Por favor, volte quando estiver no nível 12 ou superior.");
          
			} else if (status == 2)
				cm.sendNext("Muito obrigado. Por favor, resgate Gaga! O vovô da lua irá ajudá-lo.");
			else if (status == 3) {
				cm.warp(922240200); 
				cm.dispose();
			}
		} else if (cm.getPlayer().getMapId() == 922240200) {
			if (status == 1) {
				if(s == 0) {
					selected = 1;
					cm.sendNext("Bem vindo(a)! Ouvi o que aconteceu com o Baby Moon Bunny. Fico feliz que você tenha vindo desde que eu estava realmente precisando de alguma ajuda. Gaga é uma amiga minha que me ajudou antes e muitas vezes para para dizer olá. Desafortunado, ele foi seqüestrado por alienígenas."); 
				} else {
					selected = 2;
					cm.sendYesNo("At the Space Mine, you can find special ores called #bKrypto Crystals#k that contain the mysterious power of space. #bKrypto Crystals#l are usually emerald in color, but will turn brown if hit with the Spaceship's #bSpace Beam#k. Remember, in order to thwart this alien conspracy, #b10 Brown Krypto Crystal's and 10 Emerald Krypto Crystal's are needed. But since even #b1 Krypto Crystal#k can be of help, brign me as many as possible. Oh, and one more thing! The Space Mines are protected by the Space Mateons. They are extemely strong due to the power of the #Krypto Crystals#k, so don't try to defeat them. Simply concentrate on quickly collecting the crystals."); 
				} 
			} else if (status == 2) {
				if(selected == 1) {
					cm.sendYesNo("Se simplesmente deixarmos Gaga com os alienígenas, algo terrível acontecerá com ele! Eu vou deixar você emprestar uma nave espacial que os coelhos da lua usam para viajar para que você possa resgatar Gaga. #b  Embora ele possa aparecer um pouco indecibido, lento e imaturo às vezes #k, ele é realmente um jovem simpático. Você quer ir resgatá-lo agora?");
				} else if(selected == 2) { 
					cm.sendOk("Not coded yet, f4."); 
					cm.dispose();
				}
			} else  if (status == 3) {
				var number = -1;
				for (var i = 0; i < 20; i++) {
					var mapFactory = cm.getClient().getChannelServer().getMapFactory();
					if (mapFactory.getMap(922240000 + i).getCharacters().isEmpty()) {
						number = i;
						break;
					}	    
				}
				if (number > -1) 
					cm.warp(922240000 + number);
				else 
					cm.sendOk("Atualmente não há mapas vazios, tente novamente mais tarde.");
				
				cm.dispose();
			}
		} else if ((cm.getPlayer().getMapId() >= 922240000 && cm.getPlayer().getMapId() <= 922240019) || (cm.getPlayer().getMapId() >= 922240100 && cm.getPlayer().getMapId() <= 922240119)) {
			cm.warp(922240200);
			cm.dispose();
		}
	} else if (m < 1) {
		if(m == 0) {
			if (cm.getPlayer().getMapId() == 922240200)  {
				cm.sendOk("Isso é uma vergonha, volte quando estiver pronto.");
			}
		}
		cm.dispose();
	}
}