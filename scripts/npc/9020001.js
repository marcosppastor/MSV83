/*/*
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
-- Odin JavaScript --------------------------------------------------------------------------------
	Cloto - Hidden Street : 1st Accompaniment
-- By ---------------------------------------------------------------------------------------------
	Stereo
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Second Version by Moogra
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

importPackage(Packages.tools);
importPackage(java.awt);

var status;
var curMap;
var questions = Array("Esta e a tarefa. Recolher o mesmo numero de cupons, com o nivel minimo necessario para fazer o avanco para o primeiro trabalho como Guerreiro.",
			"Esta e a tarefa. Recolher o mesmo numero de cupons, com a quantidade minima de STR â€‹â€‹necessaria para fazer o avanco para o primeiro trabalho como um Guerreiro.",
			"Esta e a tarefa. Recolher o mesmo numero de cupons, com a quantidade minima de INT necessaria para fazer o avanco para o primeiro trabalho como um Bruxo.",
			"Esta e a tarefa. Recolher o mesmo numero de cupons, com a quantidade minima de DEX necessaria para fazer o avanco para o primeiro trabalho como um Arqueiro.",
			"Esta e a tarefa. Recolher o mesmo numero de cupons, com a quantidade minima de DEX necessaria para fazer o avanco para o primeiro trabalho como um Gatuno.",
			"Esta e a tarefa. Recolher o mesmo numero de cupons, com o nivel minimo necessario para avancar para a Segunda Classe.");
var qanswers = Array(10, 35, 20, 25, 25, 30, 8);
var party;
var preamble; // we dont even need this mother fucker ! --
var stage2Rects = Array(new Rectangle(-755,-132,4,218),new Rectangle(-721,-340,4,166),new Rectangle(-586,-326,4,150),new Rectangle(-483,-181,4,222));
var stage3Rects = Array(new Rectangle(608,-180,140,50),new Rectangle(791,-117,140,45),
    new Rectangle(958,-180,140,50),new Rectangle(876,-238,140,45),
    new Rectangle(702,-238,140,45));
var stage4Rects = Array(new Rectangle(910,-236,35,5),new Rectangle(877,-184,35,5),
    new Rectangle(946,-184,35,5),new Rectangle(845,-132,35,5),
    new Rectangle(910,-132,35,5),new Rectangle(981,-132,35,5));
var stage2combos = Array(Array(0,1,1,1),Array(1,0,1,1),Array(1,1,0,1),Array(1,1,1,0));
var stage3combos = Array(Array(0,0,1,1,1),Array(0,1,0,1,1),Array(0,1,1,0,1),
    Array(0,1,1,1,0),Array(1,0,0,1,1),Array(1,0,1,0,1),
    Array(1,0,1,1,0),Array(1,1,0,0,1),Array(1,1,0,1,0),
    Array(1,1,1,0,0));
var stage4combos = Array(Array(0,0,0,1,1,1),Array(0,0,1,0,1,1),Array(0,0,1,1,0,1),
    Array(0,0,1,1,1,0),Array(0,1,0,0,1,1),Array(0,1,0,1,0,1),
    Array(0,1,0,1,1,0),Array(0,1,1,0,0,1),Array(0,1,1,0,1,0),
    Array(0,1,1,1,0,0),Array(1,0,0,0,1,1),Array(1,0,0,1,0,1),
    Array(1,0,0,1,1,0),Array(1,0,1,0,0,1),Array(1,0,1,0,1,0),
    Array(1,0,1,1,0,0),Array(1,1,0,0,0,1),Array(1,1,0,0,1,0),
    Array(1,1,0,1,0,0),Array(1,1,1,0,0,0));	
var eye = 9300002;
var necki = 9300000;
var slime = 9300003;
var monsterIds = Array(eye, eye, eye, necki, necki, necki, necki, necki, necki, slime);
var prizeIdScroll = Array(2040502, 2040505,// Overall DEX and DEF
    2040802,// Gloves for DEX
    2040002, 2040402, 2040602);// Helmet, Topwear and Bottomwear for DEF
var prizeIdUse = Array(2000001, 2000002, 2000003, 2000006,// Orange, White and Blue Potions and Mana Elixir
    2000004, 2022000, 2022003);// Elixir, Pure Water and Unagi
var prizeQtyUse = Array(80, 80, 80, 50, 5, 15, 15);
var prizeIdEquip = Array(1032004, 1032005, 1032009,// Level 20-25 Earrings
    1032006, 1032007, 1032010,// Level 30 Earrings
    1032002,// Level 35 Earring
    1002026, 1002089, 1002090);// Bamboo Hats
var prizeIdEtc = Array(4010000, 4010001, 4010002, 4010003,// Mineral Ores
    4010004, 4010005, 4010006,// Mineral Ores
    4020000, 4020001, 4020002, 4020003,// Jewel Ores
    4020004, 4020005, 4020006,// Jewel Ores
    4020007, 4020008, 4003000);	// Diamond and Black Crystal Ores and Screws
var prizeQtyEtc = Array(15, 15, 15, 15, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3, 3, 30);
//500, 1000, 2000, 4000, 7500 = default
function start() {
    status = -1;
    curMap = cm.getPlayer().getMapId() - 103000799;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (type == 0 && mode == 0)
        status--;
    else {
        cm.dispose();
        return;
    }
    if (curMap == 1) { // First Stage.
        if (isLeader()) {
            var eim = cm.getPlayer().getEventInstance();
            party = eim.getPlayers();
            preamble = eim.getProperty("leader1stpreamble");
            if (preamble == null) {
					cm.sendNext("Ola! Bem-vindo(a) ao 1 estágio. Ande pelo mapa e você vera Jacares ao seu redor. Quando você derrota-los, eles irão te dar um #bcupon#k. Cada membro do grupo que não seja o lider deve conversar comigo, e reunir o mesmo numero de #bcupons#k como a resposta para a pergunta que eu vou dar para eles.\r\nSe você juntar a quantidade correta de #bcupons#k, eu vou lhe dar o #bpasse#k. Uma vez que todos os outros membros do grupo acabarem, devem entregar ao lider os #bpasses#k, o lider vai me entregar os #bpasses#k, concluindo assim a primeira etapa. Quanto mais rapido você terminar os estágios, mais estágios você vai ser capaz de desafiar. Então eu sugiro que você tome o cuidado. Boa sorte!");
                eim.setProperty("leader1stpreamble","done");
				cm.dispose();
            } else {
                var complete = eim.getProperty(curMap + "stageclear");
                if (complete != null) {
                    cm.sendNext("Se apresse, o portal esta aberto!");
                    cm.dispose();
                } else {
                    var numpasses = party.size() - 1; // All the players in the party need to get a pass besides the leader.
                    var strpasses = "#b" + numpasses + " passes#k";
                    if (!cm.haveItem(4001008, numpasses)) {
                        cm.sendNext("Você precisa coletar o numero de cupons sugerido pela resposta. Nem mais nem menos. Verifique se você tem mesmo os cupons.");
                        cm.dispose();
                    } else {
			cm.sendNext("Você reuniu " + strpasses + "! Parabéns por concluir este estágio. Eu vou liberar o portal e envia-lo para a próxima fase. Há um limite de tempo para chegar la, então por favor apressem-se. Boa sorte para todos vocês!");
                        clear(1, eim, cm);
						cm.givePartyExp(100);
                        cm.gainItem(4001008, -numpasses);
                        cm.dispose();
                    // TODO: Make the shiny thing flash
                    }
                }
            }
        } else { // Not leader
            var eim = cm.getPlayer().getEventInstance();
            pstring = "member1stpreamble" + cm.getPlayer().getId();
            preamble = eim.getProperty(pstring);
            if (status == 0) {
                if (preamble == null) {
                    var qstring = "member1st" + cm.getPlayer().getId();
                    var question = eim.getProperty(qstring);
                    if (question == null) {
                        // Select a random question to ask the player.
                        var questionNum = Math.floor(Math.random() * questions.length);
                        eim.setProperty(qstring, questionNum);
                    }
                    cm.sendNext("Aqui, você precisa coletar # bcoupons # k ao derrotar o mesmo número de jacares que a resposta às perguntas feitas individualmente.");
                } else { // Otherwise, check for stage completed
                    var complete = eim.getProperty(curMap + "stageclear");
                    if (complete != null) { // Strage completed
                    cm.sendNext("Se apresse, o portal esta aberto!");
                        cm.dispose();
                    } else {
                        // Reply to player correct/incorrect response to the question they have been asked
                        var qstring = "member1st" + cm.getPlayer().getId();
						var qcompletestr = "member1stcom" + cm.getPlayer().getId();
                        var numcoupons = qanswers[parseInt(eim.getProperty(qstring))];
                        var qcorr = cm.itemQuantity(4001007);
						if(eim.getProperty(qcompletestr) != null) {
							cm.sendNext("Obrigado por me trazer os cupons. Entregue o passe para o líder do seu grupo para continuar.");
							cm.dispose();
						} else if (numcoupons == qcorr) {
                            cm.sendNext("Essa é a resposta certa! Para isso, você acabou de receber o #rpasse#k de passagem. Entregue-o ao líder da festa.");
                            cm.gainItem(4001007, -numcoupons);
                            cm.gainItem(4001008, 1);
							eim.setProperty(qcompletestr, "done");
							cm.dispose();
                        } else
			cm.sendNext("Resposta incorreta. So posso entregar o passe se voce coletar o numero de #bcupons#k sugerido pela resposta a pergunta.");
                    }
                }
            } else if (status == 1) {
                if (preamble == null) {
                    var qstring = "member1st" + cm.getPlayer().getId();
                    var question = parseInt(eim.getProperty(qstring));
                    cm.sendNextPrev(questions[question]);
                } else {
					var qstring = "member1st" + cm.getPlayer().getId();
                    var question = parseInt(eim.getProperty(qstring));
                    cm.sendNextPrev(questions[question]);
                    cm.dispose();
                }
            } else if (status == 2) { // Preamble completed
                eim.setProperty(pstring,"done");
                cm.dispose();
            }
        } // End first map scripts
    }else if (2 <= curMap && 4 >= curMap) {
        new Rectanglestages(cm);
    }else if (curMap == 5) { // Final stage
        var eim = cm.getPlayer().getEventInstance();
        if (eim.getProperty("5stageclear") == null) { //If no
            if (isLeader()) { // Leader
                if (cm.haveItem(4001008, 10)) {
                    // Clear stage
                    cm.sendNext("Aqui está o portal que o leva ao último estágio de bônus. É um local que permite que você derrote os monstros regulares um pouco mais fácil. Você receberá uma quantidade de tempo fixa para caçar o máximo possível, mas você sempre pode deixar o local no meio dela através do NPC. Mais uma vez, parabéns pela eliminação de todas as etapas. Cuidado...");
                    party = eim.getPlayers();
                    cm.gainItem(4001008, -10);
                    clear(5, eim, cm);
					cm.givePartyExp(500);
                    cm.dispose();
                } else { // Not done yet
                    cm.sendNext("Olá. Bem-vindo à 5ª e última etapa. Caminhe ao redor do mapa e você poderá encontrar alguns monstros Boss. Derrote todos eles, colete #b os passes # k, e por favor, pegue-os para mim. Uma vez que você ganhe o seu passe, o líder do seu grupo irá coletá-los e, em seguida, levá-los para mim, uma vez que os # bpasses # k sejam reunidos. Os monstros podem ser familiares para você, mas podem ser muito mais fortes do que você pensa, então tenha cuidado. Boa sorte! \r\n Como resultado de queixas, agora é obrigatório matar todos os Slimes! !");
                }
                cm.dispose();
            } else { // Members
                cm.sendNext("Olá. Bem-vindo à 5ª e última etapa. Caminhe ao redor do mapa e você poderá encontrar alguns monstros Boss. Derrote todos eles, colete #b os passes # k, e por favor, pegue-os para mim. Uma vez que você ganhe o seu passe, o líder do seu grupo irá coletá-los e, em seguida, levá-los para mim, uma vez que os # bpasses # k sejam reunidos. Os monstros podem ser familiares para você, mas podem ser muito mais fortes do que você pensa, então tenha cuidado. Boa sorte! \r\n Como resultado de queixas, agora é obrigatório matar todos os Slimes! !");
                cm.dispose();
            }
        } else { // Give rewards and warp to bonus
            if (status == 0) {
                cm.sendNext("Incrível! Você superou todas as etapas para chegar a este ponto. Aqui está um pequeno prêmio pelo seu trabalho bem feito. Antes de aceitá-lo, no entanto, certifique-se de que seus inventários de uso e etc. tenham slots vazios disponíveis. \r\n # b Você não receberá o prêmio se não tiver slots livres!");
            } else if (status == 1) {
                getPrize(eim,cm);
                
                cm.givePartyNX(party);

                cm.dispose();
            }
        }
    } else { // No map found
        cm.sendNext("Parece que o estágio esta incompleto.");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty(stage + "stageclear", "true");
    var map = eim.getMapInstance(cm.getPlayer().getMapId());
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
    map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));
    var mf = eim.getMapFactory();
    map = mf.getMap(103000800 + stage);
    var nextStage = eim.getMapInstance(103000800 + stage);
    var portal = nextStage.getPortal("next00");
    if (portal != null) {
        portal.setScriptName("kpq" + stage);
    }
}

function failstage(eim, cm) {
    var map = eim.getMapInstance(cm.getPlayer().getMapId());
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Failed"));
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/wrong_kor"));
}

function Rectanglestages (cm) {
    var eim = cm.getPlayer().getEventInstance();
    var nthtext;
    var nthobj;
    var nthverb;
    var nthpos;
    var curArray;
    var curCombo;
    var objset;
    if (curMap == 2) {
        nthtext = "2nd";
        nthobj = "ropes";
        nthverb = "hang";
        nthpos = "hang on the ropes too low";
        curArray = stage2Rects;
        curCombo = stage2combos;
        objset = [0,0,0,0];
    } else if (curMap == 3) {
        nthtext = "3rd";
        nthobj = "platforms";
        nthverb = "stand";
        nthpos = "stand too close to the edges";
        curArray = stage3Rects;
        curCombo = stage3combos;
        objset = [0,0,0,0,0];
    } else if (curMap == 4) {
        nthtext = "4th";
        nthobj = "barrels";
        nthverb = "stand";
        nthpos = "stand too close to the edges";
        curArray = stage4Rects;
        curCombo = stage4combos;
        objset = [0,0,0,0,0,0];
    }
    if (isLeader()) { // Check if player is leader
        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            if (preamble == null) { // first time talking.
                cm.sendNext("olá bem vindo ao " + nthtext + " estágio. Próximo a mim você vera  um numero de " + nthobj + ". Out of these " + nthobj + ", #b3 are connected to the portal that sends you to the next stage#k. All you need to do is have #b3 party members find the correct " + nthobj + " and " + nthverb + " on them.#k\r\nBUT, it doesn't count as an answer if you " + nthpos + "; please be near the middle of the " + nthobj + " to be counted as a correct answer. Also, only 3 members of your party are allowed on the " + nthobj + ". Once they are " + nthverb + "ing on them, the leader of the party must #bdouble-click me to check and see if the answer's correct or not#k. Now, find the right " + nthobj + " to " + nthverb + " on!");
                eim.setProperty("leader" + nthtext + "preamble","done");
                var sequenceNum = Math.floor(Math.random() * curCombo.length);
                eim.setProperty("stage" + nthtext + "combo", sequenceNum.toString());
                cm.dispose();
            } else {
				if(cm.getPlayer().getMap().getCharacters().size() != eim.getPlayerCount()) {
					cm.sendOk("Certifique-se de que todos os membros do seu grupo estejam aqui antes de continuar.");
					cm.dispose();
					return;
				}
                var complete = eim.getProperty(curMap + "stageclear");
                if (complete != null) {
                    cm.sendNext("Se apresse, o portal esta aberto!");
                    cm.dispose();
                } else { // Check for people on ropes and their positions
                    var playersOnCombo = 0;
                    for (var i = 0; i < party.size(); i++) {
                        for (var y = 0; y < curArray.length; y++) {
                            if (curArray[y].contains(party.get(i).getPosition())) {
                                playersOnCombo++;
                                objset[y] = 1;
                                break;
                            }
                        }
                    }
                    if (playersOnCombo == 3) {
                        var combo = curCombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
                        var correctCombo = true;
                        for (i = 0; i < objset.length && correctCombo; i++)
                            if (combo[i] != objset[i])
                                correctCombo = false;
                        if (correctCombo) {
                            clear(curMap, eim, cm);
							cm.givePartyExp(500 + nthtext);
                            cm.dispose();
                        } else { // Wrong
                            failstage(eim, cm);
                            cm.dispose();
                        }
                    } else {
                        cm.sendNext("Parece que você encontrou 3 " + nthobj + "  Pense em combinações diferentes " + nthobj + ". Apenas 3 são corretas para  " + nthverb + " a " + nthobj + ", e se você  " + nthpos + " continue até acertar");
                        cm.dispose();
                    }
                }
            }
        } else {
            var complete = eim.getProperty(curMap + "stageclear");
            if (complete != null) {
                var target = eim.getMapInstance(103000800 + curMap);
                var targetPortal = target.getPortal("st00");
                cm.getPlayer().changeMap(target, targetPortal);
            }
            cm.dispose();
        }
    } else { // Not leader
        var complete = eim.getProperty(curMap.toString() + "stageclear");
        if (complete != null) {
          cm.sendNext("Se apresse, o portal esta aberto!");
        } else {
            cm.sendNext("Por favor diga ao lider do grupo para falar comigo");
        }
        cm.dispose();
    }
}

function isLeader(){
    if(cm.getParty() == null)
        return false;
    else
        return cm.isLeader();
}

function getPrize(eim,cm) {
    var itemSetSel = Math.random();
    var itemSet;
    var itemSetQty;
    var hasQty = false;
    if (itemSetSel < 0.3)
        itemSet = prizeIdScroll;
    else if (itemSetSel < 0.6)
        itemSet = prizeIdEquip;
    else if (itemSetSel < 0.9) {
        itemSet = prizeIdUse;
        itemSetQty = prizeQtyUse;
        hasQty = true;
    } else {
        itemSet = prizeIdEtc;
        itemSetQty = prizeQtyEtc;
        hasQty = true;
    }
    var sel = Math.floor(Math.random()*itemSet.length);
    var qty = 1;
    if (hasQty)
        qty = itemSetQty[sel];
    cm.gainItem(itemSet[sel], qty, true, true);
        cm.getPlayer().changeMap(eim.getMapInstance(103000805));
}