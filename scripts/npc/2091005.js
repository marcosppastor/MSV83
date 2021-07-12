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
/*
* @Author: Moogra, XxOsirisxX
* @NPC:    2091005
* @Name:   So Gong
* @Map(s): Dojo Hall
*/
importPackage(Packages.server.maps);

var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);
var belt_points = Array(200, 1000, 2500, 5000, 10000);

var status = -1;
var selectedMenu = -1;

function start() {
    if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        var text = "Estou surpreso por vê-lo vivo aqui. Por acaso, o que desejas fazer?\r\n\#b#L0#Quero continuar!#l\r\n#L1#Quero sair!#l\r\n";
        //if (!cm.getPlayer().getDojoParty()) {
            //text += "#L2#Desejo fazer um novo recorde.#l";
        //}
        cm.sendSimple(text);
		//cm.dispose();
    } else if (cm.getPlayer().getLevel() >= 25) {
        if (cm.getPlayer().getMap().getId() == 925020001 || cm.getPlayer().getMap().getId() == 970000102) {
            cm.sendSimple("Meu mestre é o personagem mais forte deste Dojo! Você realmente acha que pode derrota-lo?\r\n\r\n#b#L0#Desejo fazer Dojo sozinho.#l\r\n#L1#Desejo ir com o meu grupo.#l\r\n#L2#Desejo obter um cinto.#l\r\n#L3#Desejo resetar meus pontos de treinamento.#l\r\n#L4#Desejo obter uma medalha.#l\r\n#L5#O que é o Mu Lung Dojo?#l");
        } else {
            cm.sendYesNo("O que? Você já quer sair? Você precisa passar de level!\r\nVocê realmente quer sair?!");
        }
    } else {
        cm.sendOk("Você está de brincadeira? Para participar deste Dojo, é necessário ser no minimo level #b25#k.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (cm.getPlayer().getMap().getId() == 925020001 || cm.getPlayer().getMap().getId() == 970000102){
        if (mode >= 0) {
            if (status == -1)
                selectedMenu = selection;
            status++; //there is no prev.
            if (selectedMenu == 0) { //I want to challenge him alone.
                if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                    if (status == 0) {
                        cm.sendYesNo("Ei!! Você mesmo! Esta es a sua primeira vinda a este Dojo, certo? Lamento informar, mas meu #emestre#n não permite a entrada de qualquer um. Por ordem dele, julgarei se você é digno de enfrentar este Dojo! Ha!\r\nHoje definitivamente é o seu dia de sorte!\r\nEnfim, deseja enfretar este #bDojo?");
                    } else if (status == 1) {
                        if (mode == 0) {
                            cm.sendNext("Haha! Sabia que ficaria com medo!\r\nSaia daqui! Não gostamos de fracotes.");
                        } else {
                            for (var i = 0 ; i < 39; i++) { //only 32 stages, but 38 maps
                                if(cm.getClient().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
                                    cm.sendOk("Alguém já esta no dojo ");
                                    cm.dispose();
                                    return;
                                }
                            }
                            cm.warp(925020010, 0);
                            cm.getPlayer().setFinishedDojoTutorial();
                        }
                        cm.dispose();
                    }
                } else if (cm.getPlayer().getDojoStage() > 0) {
                    if (status == 0) {
                        cm.sendYesNo("The last time you took the challenge by yourself, you went up to level " + cm.getPlayer().getDojoStage() + ". I can take you there right now. Do you want to go there?");
                    } else {
                        cm.warp(mode == 1 ? cm.getPlayer().getDojoStage() : 925020100, 0);
                        cm.dispose();
                    }
                } else {
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warp(925020100, 0);
                    cm.dispose();
                }
            } else if (selectedMenu == 1) { //I want to challenge him with a party.
                var party = cm.getPlayer().getParty();
               for (var i = 0 ; i < 39; i++) { //only 32 stages, but 38 maps
                                if(cm.getClient().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
                                    cm.sendOk("Alguém já esta no dojo ");
                                    cm.dispose();
                                    return;
                                }
                            }
                
                if (party == null) {
                    cm.sendNext("Você precisa estar em um grupo. Caso esteja em um, fale para o Lider falar comigo!");
                    cm.dispose();
                    return;
                }
                var lowest = cm.getPlayer().getLevel();
                var highest = lowest;
                for (var x = 0; x < party.getMembers().size(); x++) {
                    var lvl = party.getMembers().get(x).getLevel();
                    if (lvl > highest)
                        highest = lvl;
                    else if (lvl < lowest)
                        lowest = lvl;
                }
                var isBetween30 = highest - lowest < 30;
                if (party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendNext("Aparentemente tudo esta certo, porém, para que vocês possam entrar, solicite ao #blider do grupo#k para que fale comigo.");
                    cm.dispose();
                } else if (party.getMembers().size() == 1) {
                    cm.sendOk("Você realmente deseja fazer isso em grupo estando sozinho? Não há lógica.\r\nSelecione a opção de fazer Dojo sozinho.");
                } else if (!isBetween30) {
                    cm.sendNext("Os integrantes do seu grupo precisam estar entre o #eLV 30~200#n e a diferença de level de cada um dos integrantes não podem ser superior a 30.");
                } else {
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warpParty(925020100);
                    //cm.setDojoParty(true);
                    cm.dispose();
                }
                cm.dispose();
            } else if (selectedMenu == 2) { //I want to receive a belt.
                if (mode < 1) {
                    cm.dispose();
                    return;
                }
                if (status == 0) {
                    var selStr = "Você possui #b" + cm.getPlayer().getDojoPoints() + "#k pontos de treinamento. De acordo com a sua quantidade de pontos, você pode obter cintos diferenciados!\r\n";
                    for (var i = 0; i < belts.length; i++) {
                        if (cm.getPlayer().getItemQuantity(belts[i], true) > 0) {
                            selStr += "\r\n     #i" + belts[i] + "# #t" + belts[i] + "#(Obtido)";
                        } else
                            selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#l";
                    }
                    cm.sendSimple(selStr);
                } else if (status == 1) {
                    var belt = belts[selection];
                    var level = belt_level[selection];
                    var points = belt_points[selection];
                    var desconto = cm.getPlayer().getDojoPoints()-points;
                    if (cm.getPlayer().getDojoPoints() > points  && cm.getPlayer().getLevel() > level) {
                       cm.gainItem(belt, 1);
                       cm.getPlayer().setDojoPoints(desconto);
                       cm.sendOk("Você possui agora#b "  + cm.getPlayer().getDojoPoints() +  " #k pontos de dojo,pois adquiriu a faixa #i" +belt + ".\r\nOs pontos correspondentes a ela foram #bdescontados#k,volte a treinar para obter faixas mais poderosas!");
                       cm.dispose();
                            
                       // else
                           // cm.sendNext("Para obter o(a) #i" + belt + "# #b#t" + belt + "##k, sera necessario level #b" + level + "#k e #b" + points + " pontos de treinamento#k.\r\n\r\nCaso queira obter este cinto, voce precisara de mais #r" + (cm.getPlayer().getDojoPoints() - points) + "#k pontos de treinamento.");
                    } else
                        cm.sendNext("Para obter o(a) #i" + belt + "# #b#t" + belt + "##k, será necessário level #b" + level + "#k e #b" + points + " pontos de treinamento#k.\r\n\r\nCaso queira obter este cinto, você precisara de mais #r" + (cm.getPlayer().getDojoPoints() - points) + "#k pontos de treinamento.");
                    cm.dispose();
                }
            } else if (selectedMenu == 3) { //I want to reset my training points.
                if (status == 0) {
                    cm.sendYesNo("Ao fazer isso, você ficara com 0 pontos de treinamento.\r\nVocê realmente deseja fazer isso?!");
                } else if (status == 1) {
                    if (mode == 0) {
                        cm.sendNext("Esta foi a melhor decisão.");
                    } else {
                        cm.getPlayer().setDojoPoints(0);
                        cm.sendNext("Pronto! Todos os seus pontos foram resetados.\r\nVejo que seu caminho será arduo!");
                    }
                    cm.dispose();
                }
            } else if (selectedMenu == 4) { //I want to receive a medal.
                if (status == 0 && cm.getPlayer().getVanquisherStage() <= 0) {
                    cm.sendYesNo("You haven't attempted the medal yet? If you defeat one type of monster in Mu Lung Dojo #b100 times#k you can receive a title called #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k. It looks like you haven't even earned the #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k... Do you want to try out for the #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k?");
                } else if (status == 1 || cm.getPlayer().getVanquisherStage() > 0) {
                    if (mode == 0) {
                        cm.sendNext("If you don't want to, that's fine.");
                        cm.dispose();
                    } else {
                        if (cm.getPlayer().getDojoStage() > 37) {
                            cm.sendNext("You have complete all medals challenges.");
                        } else if (cm.getPlayer().getVanquisherKills() < 100 && cm.getPlayer().getVanquisherStage() > 0)
                            cm.sendNext("Você precisara jogar este Dojo por mais mais #b" + (100 - cm.getPlayer().getVanquisherKills()) + "#k para obter a #b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k. Sabemos que este é um processo demorado, mas tenha foco, forca e fe, pois um dia você conseguirá!\r\nLembre-se: Você precisa passar de estágio para fazer uma 'vitória'.");
                        else if (cm.getPlayer().getVanquisherStage() <= 0) {
                            cm.getPlayer().setVanquisherStage(1);
                        } else {
                            cm.sendNext("Você recebeu #b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k.");
                            cm.gainItem(1142033 + cm.getPlayer().getVanquisherStage(), 1);
                            cm.getPlayer().setVanquisherStage(cm.c.getPlayer().getVanquisherStage() + 1);
                            cm.getPlayer().setVanquisherKills(0);
                        }
                    }
                    cm.dispose();
                }
            } else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
                cm.sendNext("Meu mestre é o ultimo boss deste Dojo! Neste, há 38 estágios, um sendo mais difícil que o outro!\r\nCom o decorrer de suas vitórias, você obtera pontos de treinamento. Com estes, você podera obter cintos e medalhas diferenciadas!");
                cm.dispose();
            }
        } else
            cm.dispose();
    } else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        if (selectedMenu == -1)
            selectedMenu = selection;
        status++;
        if (selectedMenu == 0) {
            cm.warp(cm.getPlayer().getMap().getId() + 100, 0);
            cm.dispose();
        } else if (selectedMenu == 1) { //I want to leave
            if (status == 0) {
                cm.sendAcceptDecline("So, you're giving up? You're really going to leave?");
            } else {
                if (mode == 1) {
                    cm.warp(925020002);
                }
                cm.dispose();
            }
        } else if (selectedMenu == 2) { //I want to record my score up to this point
            if (status == 0) {
                cm.sendYesNo("If you record your score, you can start where you left off the next time. Isn't that convenient? Do you want to record your current score?");
            } else {
                if (mode == 0) {
                    cm.sendNext("You think you can go even higher? Good luck!");
                } else if (cm.getPlayer().getDojoStage() == cm.getPlayer().getMap().getId()) {
                    cm.sendOk("Looks like you came all the way up here without recording your score. Sorry, but you can't record now.");
                } else {
                    cm.sendNext("I recorded your score. If you tell me the next time you go up, you'll be able to start where you left off.");
                    cm.getPlayer().setDojoStage(cm.getPlayer().getMap().getId());
                }
                cm.dispose();
            }
        }
    } else {
        if (mode == 0) {
            cm.sendNext("Pare de brincadeira e comece a treinar!\r\n#eO MUNDO NÃO É UM ARCO IRIS!");
        } else if (mode == 1) {
            cm.warp(970000102, 0);
            //cm.getPlayer().message("Ate a proxima.");
        }
        cm.dispose();
    }
}

function isRestingSpot(id) {
    return (id / 100 - 9250200) % 6 == 0;
}
