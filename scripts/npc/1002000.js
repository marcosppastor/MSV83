/* Author: Xterminator
	NPC Name: 		Phil
	Map(s): 		Victoria Road : Lith Harbour (104000000)
	Description: 		Explains Victoria Island Towns and can take you to them
*/
importPackage(Packages.client);

var status = 0;
var maps = Array(102000000, 101000000, 100000000, 103000000, 120000000)
var cost = Array(1200, 1200, 800, 1000, 1000)
var costBeginner = Array(120, 120, 80, 100, 100)
var selectedMap = -1;
var sCost;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 27 && mode == 0) {
			cm.sendNext("Há muito para se ver nesta cidade, também. Deixe-me saber se você quer ir para algum outro lugar.");
			cm.dispose();
			return;
		} else if (((status == 1 || status == 2 || status == 26) && mode == 0) || ((status == 6 || status == 9 || status == 12 || status == 15 || status == 18 || status == 21) && mode == 1)) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("Você quer ir para alguma outra cidade? Com um pouco de dinheiro envolvido, eu posso fazer isso acontecer. É um pouco caro, mas eu posso fazer um desconto especial de 90% para iniciantes.");
		} else if (status == 1) {
			cm.sendSimple("É compreensível que você pode ter confundido sobre esse lugar se esta é a sua primeira vez. Se você tem alguma dúvida sobre esse lugar, pergunte.\r\n#L0##bQue tipo de cidades tem aqui na Ilha Victoria?#l\r\n#L1#Por favor, me leve para outro lugar.#k#l");
		} else if (status == 2) {
			if (selection == 0) {
				cm.sendSimple("Há sete cidades grandes aqui na Ilha Victoria. Qual dessas você quer saber mais?\r\n#b#L0##m104000000##l\r\n#L1##m102000000##l\r\n#L2##m101000000##l\r\n#L3##m100000000##l\r\n#L4##m103000000##l\r\n#L6##m105040300##l");
			} else if (selection == 1) {
				status = 26;
				if (cm.getJob().equals(MapleJob.Aprendiz)) {
					var selStr = "Há um desconto especial de 90% para todos os aprendizes. Tudo bem, onde você quer ir?#b";
					for (var i = 0; i < maps.length; i++) {
						selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + costBeginner[i] + " mesos)#l";
					}
				} else {
					var selStr = "Oh, você não é um novato, hein? Então, eu lamento, mas terei de cobrar o preço normal. Onde você gostaria de ir?#b";
					for (var i = 0; i < maps.length; i++) {
					selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + cost[i] + " mesos)#l";
					}
				}
				cm.sendSimple(selStr);
			}
		} else if (status == 3) {
			if (selection == 0) {
				status = 4;
				cm.sendNext("Certo voce que saber mais sobre #bPort Lith#k. É uma ilha agradável, com gaivotas voando o tempo todo. Também é a primeira ilha de victoria.");
			} else if (selection == 1) {
				status = 7;
				cm.sendNext("Certo vamos falar de #bPerion#k. É uma cidade guerreira localizada na parte mais norte da Ilha Victoria, cercada por montanhas rochosas. Com uma atmosfera hostil, só o forte sobrevivem lá.");
			} else if (selection == 2) {
				status = 10;
				cm.sendNext("Certo vou lhe falar sobre #bEllinia#k. É uma cidade mágica localizada no extremo leste da Ilha Victoria, e coberta de árvores altas e místicas. Você encontrará algumas fadas lá, também. Elas não gostam de seres humanos em geral, por isso vai ser melhor para você ficar quieto.");
			} else if (selection == 3) {
				status = 13;
				cm.sendNext("#bHenesys#k, não é? É uma cidade de arqueiros situada na parte a mais sul da ilha, no meio de uma floresta e de pradarias profundas. O clima é justo, e tudo é abundante em torno dessa cidade, perfeito para viver. Vá verificar.");
			} else if (selection == 4) {
				status = 16;
				cm.sendNext("Vamos falar sobre a #bCidade de Kerning#k. É uma cidade de Gatunos localizada na parte noroeste da Ilha Victoria, e há edifícios lá em cima que têm apenas esse sentimento estranho em torno deles. É principalmente coberta de nuvens negras, mas se você pode ir até um lugar realmente alto, você será capaz de ver um pôr do sol muito bonito lá.");
			} else if (selection == 5) {
				status = 19;
				cm.sendNext("Here's a little information on #b#m120000000##k. It's a submarine that's currently parked in between Ellinia and Henesys in Victoria Island. That submarine serves as home to numerous pirates. You can have just as beautiful a view of the ocean there as you do here in Lith Harbor.");
			} else if (selection == 6) {
				status = 22;
				cm.sendNext("Ok. Vamos falar de #bSelva do Sono#k. É uma cidade da floresta situada no lado do sudeste da ilha de Victoria. É muito bem entre Henesys e o túnel de formigas. Há um hotel lá, então você pode descansar depois de um longo dia no calabouço ... é uma cidade tranquila em geral.");
			}
		} else if (status == 4) {
			cm.sendNext("The town you are at is Lith Harbor! Alright I'll explain to you more about #bLith Harbor#k. It's the place you landed on Victoria Island by riding The Victoria. That's Lith Harbor. A lot of beginners who just got here from Maple Island start their journey here.");
		} else if (status == 5) {
			cm.sendNextPrev("Porem tome cuidado, os monstro que estão por volta dessa ilha, são bem mais fortes que os que você pode estar acostumado a lutar, então onde você for, cuidado, e procure entrar em grupos, isso ajuda bastante.");
		} else if (status == 6) {
			cm.sendNextPrev("E outra coisa, decida-se agora, pois esse é o local onde você deve tomar a decisão sobre qual classe ira escolher. Boa jornada.");
		} else if (status == 7) {
			cm.sendNext("Certo vamos falar de #bPerion#k. É uma cidade guerreira localizada na parte mais norte da Ilha Victoria, cercada por montanhas rochosas. Com uma atmosfera hostil, só o forte sobrevivem lá.");
		} else if (status == 8) {
			cm.sendNextPrev("Ao redor de Perion, você vai achar tocos vivos, porcos, e alguns monstros bem fortes. Cuidado pois eles não são nem um pouco amigaveis.");
		} else if (status == 9) {
			cm.sendNextPrev("Caso você deseje ser um #bGuerreiro#k converse com #rChefe Balrog#k, porem você deve ter level 10 e uma #gFORÇA#k de 30. Lembre-se que Guerreiros também precisão de destreza. Boa jornada.");
		} else if (status == 10) {
			cm.sendNext("Certo vou lhe falar sobre #bEllinia#k. É uma cidade mágica localizada no extremo leste da Ilha Victoria, e coberta de árvores altas e místicas. Você encontrará algumas fadas lá, também. Elas não gostam de seres humanos em geral, por isso vai ser melhor para você ficar quieto.");
		} else if (status == 11) {
			cm.sendNextPrev("Perto da floresta você encontrará slimes, cogumelos, macacos, e macacos zumbi todos residentes lá. Caminhe mais fundo na floresta e você encontrará bruxas com a vassoura voando pelos céus. Uma palavra de advertência: A menos que você seja realmente forte, eu recomendo que você não vá perto deles.");
		} else if (status == 12) {
			cm.sendNextPrev("Caso deseje ser um #bBruxo#k, Procure por #rGrendel o velho#k, no topo de elinia. Para Bruxos, é necessário ter level 8 e  #binteligéncia#k de 20. Cuidado em sua jornada. Ate mais.");
		} else if (status == 13) {
			cm.sendNext("Alright I'll explain to you more about #bHenesys#k. It's a bowman-town located at the southernmost part of the island, made on a flatland in the midst of a deep forest and prairies. The weather's just right, and everything is plentiful around that town, perfect for living. Go check it out.");
		} else if (status == 14) {
			cm.sendNextPrev("Ao redor da pradaria, você encontrará monstros fracos, como caracóis, cogumelos e porcos. De acordo com o que eu ouço, no entanto, na parte mais profunda do Parque  dos Porcos, que está ligado à cidade em algum lugar, você encontrará um cogumelo gigantesco e poderoso chamado CoguMão de vez em quando.");
		} else if (status == 15) {
			cm.sendNextPrev("Para ser um #bArqueiro#k, você deve ver #rAthena Pierce#k em Henesys. Você precisa ter level 10 e uma #rDestreza#k de 25. Boa jornada");
		} else if (status == 16) {
			cm.sendNext("Alright I'll explain to you more about #bKerning City#k. It's a thief-town located at the northwest part of Victoria Island, and there are buildings up there that have just this strange feeling around them. It's mostly covered in black clouds, but if you can go up to a really high place, you'll be able to see a very beautiful sunset there.");
		} else if (status == 17) {
			cm.sendNextPrev("De Kerning City, você pode entrar em várias masmorras. Você pode ir a um pântano onde jacarés e cobras são abundantes, ou ao metrô cheio de fantasmas e morcegos. Na parte mais profunda do metrô, você encontrará Lace, que é tão grande e perigoso quanto um dragão.");
		} else if (status == 18) {
			cm.sendNextPrev("Para ser um #bGatuno#k, Veja o #rLord Negro#k, em cidade de Kerning. Mas você deve ter level 10 e uma #rDestreza#k de  20. Va em frente.");
		} else if (status == 19) {
			cm.sendNext("Here's a little information on #b#m120000000##k. It's a submarine that's currently parked in between Ellinia and Henesys in Victoria Island. That submarine serves as home to numerous pirates. You can have just as beautiful a view of the ocean there as you do here in Lith Harbor.");
		} else if (status == 20) {
			cm.sendNextPrev("#m120000000# is parked in between Henesys and Ellinia, so if you step out just a bit, you'll be able to enjoy the view of both towns. All the pirates you'll meet in town are very gregarious and friendly as well.");
		} else if (status == 21) {
			cm.sendNextPrev("If you are serious about becoming a #bPirate#k, then you better meet the captain of #m120000000#, #r#p1090000##k. If you are over Level 10 with 20 DEX, then she may let you become one. If you aren't up to that level, then you'll need to train harder to get there!");
		} else if (status == 22) {
			cm.sendNext("Alright I'll explain to you more about #bSleepywood#k. It's a forest town located at the southeast side of Victoria Island. It's pretty much in between Henesys and the ant-tunnel dungeon. There's a hotel there, so you can rest up after a long day at the dungeon ... it's a quiet town in general.");
		} else if (status == 23) {
			cm.sendNextPrev("Em frente ao hotel há um velho monge budista com o nome de #rChrishrama#k. Ninguém sabe muita coisa sobre esse monge. Aparentemente, ele recolhe materiais dos viajantes e cria algo, mas eu não tenho certeza sobre os detalhes. Se você tem algum negócio indo em torno dessa área, por favor, verifique isso para mim.");
		} else if (status == 24) {
			cm.sendNextPrev("Cuidado muitos dos mais perigosos monstros ficam por la. É um local muitissimo perigoso, e você pode não voltar com vida de alguns tuneis por la.");
		} else if (status == 25) {
			cm.sendNextPrev("E é isso que eu ouvi ... aparentemente, em Selva do Sono há uma entrada secreta levando você a um lugar desconhecido. Aparentemente, uma vez que você se move em profundidade, você encontrará uma pilha de rochas pretas que realmente se movem. CUIDADO ...");
		} else if (status == 26) {
			cm.dispose();
		} else if (status == 27) {
			if (cm.getJob().equals(MapleJob.Aprendiz)) {
				sCost = costBeginner[selection];
			} else {
				sCost = cost[selection];
			}
			cm.sendYesNo("Eu acho que você não quer estar aqui. Você realmente quer ir para #b#m" + maps[selection] + "##k? Bem, isto vai lhe custar #b" + sCost + " mesos#k. O que você acha?");
			selectedMap = selection;
		} else if (status == 28) {
			if (cm.getPlayer().getMeso() < sCost) {
				cm.sendNext("Você não tem mesos suficientes. Com suas habilidades, você deveria ter mais do que isso!");
			} else {
				cm.gainMeso(-sCost);
				cm.warp(maps[selectedMap], 0);
			}
			cm.dispose();
		}
	}
}