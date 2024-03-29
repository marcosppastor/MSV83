/* 
 * This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* @Author Lerk
 *
 * Guardian Statue - Sharenian: Fountain of the Wiseman (990000500)
 * 
 * Guild Quest Stage 3
 */

importPackage(Packages.server.maps);
importPackage(Packages.server.life)
importPackage(Packages.tools)

function start() {
        //everything can be done in one status, so let's do it here.
        var eim = cm.getPlayer().getEventInstance();
        if (eim == null) {
                cm.warp(990001100, 0);
        } else {
                if (eim.getProperty("leader").equals(cm.getPlayer().getName())) {
                        if (cm.getPlayer().getMap().getReactorByName("watergate").getState() > 0){
                                cm.sendOk("Prossiga.");
                        } else {
                                var currentCombo = eim.getProperty("stage3combo");
                                if (currentCombo == null || currentCombo.equals("reset")) {
                                        var newCombo = makeCombo();
                                        eim.setProperty("stage3combo",newCombo);
                                        //cm.playerMessage("Debug: " + newCombo);
                                        eim.setProperty("stage3attempt","1");
                                        cm.sendOk("Esta fonte guarda a passagem secreta para a sala do trono. Voc� ira oferecer items nesta area para prosseguir. Os vassalos devem dizer se as suas ofertas s�o aceitas, e se n�o, quais vassalos est�o descontentes. Voc� tem sete tentativas!")
                                } else {
                                        var attempt = parseInt(eim.getProperty("stage3attempt"));
                                        var combo = parseInt(currentCombo);
                                        var guess = getGroundItems();
                                        if (guess != null) {
                                                if (combo == guess) {
                                                        cm.getPlayer().getMap().getReactorByName("watergate").hitReactor(cm.getC());
                                                        cm.sendOk("Voc� pode prosseguir.");
                                                        cm.showEffect("quest/party/clear");
                                                        cm.playSound("Party1/Clear");
                                                        var prev = eim.setProperty("stage3clear","true",true);
                                                        if (prev == null) {
                                                                cm.getGuild().gainGP(25);
                                                        }
                                                } else {
                                                        var black = MapleLifeFactory.getMonster(9300036);
                                                        var myst = MapleLifeFactory.getMonster(9300037);
                                                        if (attempt < 7) {
                                                                //cm.playerMessage("Combo : " + combo);
                                                                //cm.playerMessage("Guess : " + guess);
                                                                var parsedCombo = parsePattern(combo);
                                                                var parsedGuess = parsePattern(guess);
                                                                var results = compare(parsedCombo, parsedGuess);
                                                                var string = "";
                                                                //cm.playerMessage("Results - Correct: " + results[0] + " | Incorrect: " + results[1] + " | Unknown: " + results[2]);
                                                                if (results[0] != 0) {
                                                                        if (results[0] == 1) {
                                                                                string += "Um (1) vassalo esta #esatisfeito#n com a sua oferta.\r\n";
                                                                        } else {
                                                                                string += results[0] + " vassalos est�o #esatisfeitos#n com suas ofertas.\r\n";
                                                                        }
                                                                }
                                                                if (results[1] != 0) {
                                                                        if (results[1] == 1) {
                                                                                string += "Um (1) vassalo esta #einsatisfeito#n com a sua oferta.\r\n";
                                                                        } else {
                                                                                string += results[1] + " vassalos est�o #einsatisfeitos#n com suas ofertas.\r\n";
                                                                        }
                                                                }
                                                                if (results[2] != 0) {
                                                                        if (results[2] == 1) {
                                                                                string += "Um (1) vassalo tem recebido uma oferta desconhecida.\r\n";
                                                                        } else {
                                                                                string += results[2] + " vassalos tem recebido ofertas de desconhecidas.\r\n";
                                                                        }
                                                                }
                                                                string += "Esta � a sua ";
                                                                switch (attempt) {
                                                                        case 1:
                                                                                string += "1st";
                                                                                break;
                                                                        case 2:
                                                                                string += "2nd";
                                                                                break;
                                                                        case 3:
                                                                                string += "3rd";
                                                                                break;
                                                                        default:
                                                                                string += attempt + "th";
                                                                                break;
                                                                }
                                                                string += " tentativa.";

                                                                //spawn one black and one myst knight
                                                                cm.getPlayer().getMap().spawnMonsterOnGroundBelow(black, new java.awt.Point(-350, 150));
                                                                cm.getPlayer().getMap().spawnMonsterOnGroundBelow(myst, new java.awt.Point(400, 150));

                                                                cm.sendOk(string);
                                                                eim.setProperty("stage3attempt",attempt + 1);
                                                        } else {
                                                                //reset the combo and mass spawn monsters
                                                                eim.setProperty("stage3combo","reset");
                                                                cm.sendOk("Voc� falhou no teste. Por favor, tente novamente mais tarde.");

                                                                for (var i = 0; i < 5; i++) {
                                                                        //keep getting new monsters, lest we spawn the same monster five times o.o!
                                                                        black = MapleLifeFactory.getMonster(9300036);
                                                                        myst =  MapleLifeFactory.getMonster(9300037);
                                                                        cm.getPlayer().getMap().spawnMonsterOnGroundBelow(black, new java.awt.Point(randX(), 150));
                                                                        cm.getPlayer().getMap().spawnMonsterOnGroundBelow(myst, new java.awt.Point(randX(), 150));
                                                                }
                                                        }
                                                }
                                        } else {
                                                cm.sendOk("Verifique se a sua tentativa esta devidamente ajustada na frente dos vassalos e fale comigo de novo.");
                                        }
                                }
                        }
                } else {
                        cm.sendOk("Pe�a para o lider falar comigo.");
                }
        }
        cm.dispose();
}

function action(mode, type, selection) {
}

function makeCombo() {
        var combo = 0;
        
        for (var i = 0; i < 4; i++) {
                combo += Math.floor(Math.random() * 4) * Math.pow(10, i);
        }
        
        return combo;
}

//check the items on ground and convert into an applicable string; null if items aren't proper
function getGroundItems() {
    var items = cm.getPlayer().getMap().getMapObjectsInRange(cm.getPlayer().getPosition(), Packages.java.lang.Double.POSITIVE_INFINITY, Packages.java.util.Arrays.asList([Packages.server.maps.MapleMapObjectType.ITEM]));
    var itemInArea = new Array(-1, -1, -1, -1);
        
    if (items.size() != 4) {
	cm.getPlayer().dropMessage("Verifique se a sua tentativa est� devidamente ajustada na frente das estatuas.");
	return null;
    }
        
    var iter = items.iterator();
    while (iter.hasNext()) {
	var item = iter.next();
	var id = item.getItem().getItemId();
	if (id < 4001027 || id > 4001030) {
	    cm.getPlayer().dropMessage("Alguns item do mapa n�o fazem parte dos 4 items necess�rios.");
	    return null;
	} else {
	    //check item location
	    for (var i = 0; i < 4; i++) {
		if (cm.getPlayer().getMap().getArea(i).contains(item.getPosition())) {
		    itemInArea[i] = id - 4001027;
		    //cm.getPlayer().dropMessage("Item in area "+i+": " + id);
		    break;
		}
	    }
	}
    }
        
    //guaranteed four items that are part of the stage 3 item set by this point, check to see if each area has an item
    if (itemInArea[0] == -1 || itemInArea[1] == -1 || itemInArea[2] == -1 || itemInArea[3] == -1) {
	cm.getPlayer().dropMessage("Por favor, fa�a a posi��o correta: " + (itemInArea[0] == -1 ? "Estatua 1, " : "") + (itemInArea[1] == -1 ? "Estatua 2, " : "") + (itemInArea[2] == -1 ? "Estatua 3, " : "") + (itemInArea[3] == -1 ? "Estatua 4. " : ""));
              /*  for (var i = 0; i < 4; i++) {
                        cm.getPlayer().dropMessage("Item in area "+i+": " + itemInArea[i]);
                }*/
	return null;
    }
        
    return (itemInArea[0] * 1000 + itemInArea[1] * 100 + itemInArea[2] * 10 + itemInArea[3]);
}

//convert an integer for answer or guess into int array for comparison
function parsePattern(pattern) {
        var tempPattern = pattern;
        var items = new Array(-1, -1, -1, -1);
        for (var i = 0; i < 4; i++) {
                items[i] = Math.floor(tempPattern / Math.pow(10, 3-i));
                tempPattern = tempPattern % Math.pow(10, 3-i);
        }
        return items;
}

// compare two int arrays for the puzzle
function compare(answer, guess) {
        var correct = 0;
        var incorrect = 0;
        /*var debugAnswer = "Combo : ";
        var debugGuess = "Guess : ";
        
        for (var d = 0; d < answer.length; d++) {
                debugAnswer += answer[d] + " ";
                debugGuess += guess[d] + " ";
        }
        
        cm.playerMessage(debugAnswer);
        cm.playerMessage(debugGuess);*/
        
        for (var i = 0; i < answer.length; i) {
                if (answer[i] == guess[i]) {
                        correct++;
                        //cm.playerMessage("Item match : " + answer[i]);
                        
                        //pop the answer/guess at i
                        if (i != answer.length - 1) {
                                answer[i] = answer[answer.length - 1];
                                guess[i] = guess[guess.length - 1];
                        }
                        
                        answer.pop();
                        guess.pop();
                        
                        /*/debugAnswer = "Combo : ";
                        debugGuess = "Guess : ";

                        for (var d = 0; d < answer.length; d++) {
                                debugAnswer += answer[d] + " ";
                                debugGuess += guess[d] + " ";
                        }

                        cm.playerMessage(debugAnswer);
                        cm.playerMessage(debugGuess);*/
                }
                else {
                        i++;
                }
        }
        
        //check remaining answers for "incorrect": correct item in incorrect position
        var answerItems = new Array(0, 0, 0, 0);
        var guessItems = new Array(0, 0, 0, 0);
        
        for (var j = 0; j < answer.length; j++) {
                var aItem = answer[j];
                var gItem = guess[j]
                answerItems[aItem]++;
                guessItems[gItem]++;
        }
        
        /*for (var d = 0; d < answer.length; d++) {
                cm.playerMessage("Item " + d + " in combo: " + answerItems[d] + " | in guess: " + guessItems[d]);
        }*/
        
        for (var k = 0; k < answerItems.length; k++) {
                var inc = Math.min(answerItems[k], guessItems[k]);
                //cm.playerMessage("Incorrect for item " + k + ": " + inc);
                incorrect += inc;
        }
        
        return new Array(correct, incorrect, (4 - correct - incorrect));
}

//for mass spawn
function randX() {
	return -350 + Math.floor(Math.random() * 750);
}