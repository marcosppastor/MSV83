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
 *Moony - 9201000.js
 *@author Jvlaple
 *For HurricaneMS v.59
 */
var numberOfLoves = 0;
var ringSelection = -1;
 
function start() {
        status = -1;
        action(1, 0, 0);
    }

    function action(mode, type, selection) {
        if (mode == -1) {
            cm.dispose();
        } else {
            if (mode == 0) {
                cm.dispose();
               return;
            }
            if (mode == 1) {
                status++;
            } else {
                status--;
            }
            if (status == 0) {
                if (cm.getPlayer().getMarriageQuestLevel() == 0 && cm.getPlayer().getLevel() >= 10) {
        cm.sendNext("Ei, sou Moony e faço anéis de noivado para casamentos.");
              } else if (cm.getPlayer().getMarriageQuestLevel() == 1) {
                    for (var i = 4031367; i < 4031373; i++)
                        numberOfLoves += cm.getPlayer().countItem(i);
                    if (numberOfLoves >= 4) {
                        cm.sendNext("Uau, você está de volta muito cedo. Obteve as #bProvas de amor #k? Vamos ver...");
                   } else {
                cm.sendOk("Certo, primeiro me traga de volta quatro  #bProvas de amor diferentes #k. Você pode obte-las falando com as Npc's #bNana#k, a fada do amor em qualquer cidade. Além disso, apenas um de vocês, quer o Noivo ou a noiva fará essa missão.");
                        cm.dispose();
                    }
                } else if (cm.getPlayer().getMarriageQuestLevel() == 2) {
                cm.sendSimple("Ei,você voltou para escolher um anel?\r\n#b#L0#Anel de pedra lunar#l\r\n#L1#Anel de jóia da lua #l\r\n#L2#Anel de coração dourado#l\r\n#L3#Anel do cisne prateado#l#k");
            } else {
    cm.sendOk("Eu odeio fazer anéis...");
    cm.dispose();
            }
        } else if (status == 1) {
            if (cm.getPlayer().getMarriageQuestLevel() == 0 && cm.getPlayer().getLevel() >= 10) {
                cm.sendYesNo("Ei,parece que você quer casar! Quer fazer um anel de noivado?");
            } else if (cm.getPlayer().getMarriageQuestLevel() == 1) {
                cm.sendNext("Ótimo trabalho obtendo as quatro #bProva de amor#k! Agora nós podemos fazer o  #bAnél de noivado#k.");
            } else if (cm.getPlayer().getMarriageQuestLevel() == 2) {
               ringSelection = selection;
                if (ringSelection == 0) {
                    if (cm.haveItem(4011007, 1) && cm.haveItem(4021007, 1) && cm.getPlayer().getMeso() >= 3000000) {
                        cm.gainItem(4011007, -1);
                        cm.gainItem(4021007, -1);
                      cm.gainMeso(-3000000);
                        cm.gainItem(2240000, 1);
                        cm.sendOk("Aqui está o anél que lhe prometi,seja feliz!");
                        cm.getPlayer().setMarriageQuestLevel(50);
                        cm.dispose();
                    } else {
                        cm.sendNext("Você não obteve todos os materiais certos. Para fazer um anel de noivado, preciso de um dos seguintes conjuntos de itens:\r\n\r\n#e#dAnel de pedra lunar:#k\r\n#v4011007#Pedra da lua 1 \r\n\r\n #v4021007#Diamante 1 \r\n\r\n3,000,000 Mesos  \r\n\r\n\r\n#dAnel de jóia da lua:#k\r\n#v4021009#Pedra estelar 1\r\n\r\n#v4021007#Diamante 1\r\n\r\n 2,000,000 Mesos\r\n\r\n\r\n#dAnel de coração dourado:#k\\r\n\r\n\n#v4011006#Placa de ouro 1 \r\n\r\n #v4021007#Diamante 1 \r\n\r\n 1,000,000 Meso\r\r\n\r\n#dAnel do cisne prateado:#k\r\r\n\r\n\n#v4011004#Prata de prata 1 \r\n\r\n#v4021007#Diamante 1 \r\n\r\n 500,000 Mesos\r\n");
                        cm.dispose();
                    }
                } else if (ringSelection == 1) {
                    if (cm.haveItem(4021009, 1) && cm.haveItem(4021007, 1) && cm.getPlayer().getMeso() >= 2000000) {
                        cm.gainItem(4021009, -1);
                        cm.gainItem(4021007, -1);
                        cm.gainMeso(-2000000);
                        cm.gainItem(2240001, 1);
                        cm.sendOk("Aqui está o anél que lhe prometi,seja feliz!");
                        cm.getPlayer().setMarriageQuestLevel(50);
                        cm.dispose();
                    } else {
                        cm.sendNext("Você não obteve todos os materiais certos. Para fazer um anel de noivado, preciso de um dos seguintes conjuntos de itens:\r\n\r\n#e#dAnel de pedra lunar:#k\r\n#v4011007#Pedra da lua 1 \r\n\r\n #v4021007#Diamante 1 \r\n\r\n3,000,000 Mesos  \r\n\r\n\r\n#dAnel de jóia da lua:#k\r\n#v4021009#Pedra estelar 1\r\n\r\n#v4021007#Diamante 1\r\n\r\n 2,000,000 Mesos\r\n\r\n\r\n#dAnel de coração dourado:#k\\r\n\r\n\n#v4011006#Placa de ouro 1 \r\n\r\n #v4021007#Diamante 1 \r\n\r\n 1,000,000 Meso\r\r\n\r\n#dAnel do cisne prateado:#k\r\r\n\r\n\n#v4011004#Prata de prata 1 \r\n\r\n#v4021007#Diamante 1 \r\n\r\n 500,000 Mesos\r\n");
                        cm.dispose();
                    }
                } else if (ringSelection == 2) {
                    if (cm.haveItem(4011006, 1) && cm.haveItem(4021007, 1) && cm.getPlayer().getMeso() >= 1000000) {
                        cm.gainItem(4011006, -1);
                        cm.gainItem(4021007, -1);
                        cm.gainMeso(-1000000);
                        cm.gainItem(2240002, 1);
                        cm.sendOk("Aqui está o anél que lhe prometi,seja feliz!");
                        cm.getPlayer().setMarriageQuestLevel(50);
                        cm.dispose();
                    } else {
                        cm.sendNext("Você não obteve todos os materiais certos. Para fazer um anel de noivado, preciso de um dos seguintes conjuntos de itens:\r\n\r\n#e#dAnel de pedra lunar:#k\r\n#v4011007#Pedra da lua 1 \r\n\r\n #v4021007#Diamante 1 \r\n\r\n3,000,000 Mesos  \r\n\r\n\r\n#dAnel de jóia da lua:#k\r\n#v4021009#Pedra estelar 1\r\n\r\n#v4021007#Diamante 1\r\n\r\n 2,000,000 Mesos\r\n\r\n\r\n#dAnel de coração dourado:#k\\r\n\r\n\n#v4011006#Placa de ouro 1 \r\n\r\n #v4021007#Diamante 1 \r\n\r\n 1,000,000 Meso\r\r\n\r\n#dAnel do cisne prateado:#k\r\r\n\r\n\n#v4011004#Prata de prata 1 \r\n\r\n#v4021007#Diamante 1 \r\n\r\n 500,000 Mesos\r\n");
                        cm.dispose();
                    }
                } else if (ringSelection == 3) {
                    if (cm.haveItem(4011004, 1) && cm.haveItem(4021007, 1) && cm.getPlayer().getMeso() >= 500000) {
                        cm.gainItem(4011004, -1);
                        cm.gainItem(4021007, -1);
                        cm.gainMeso(-500000);
                        cm.gainItem(2240003, 1);
                        cm.sendOk("Aqui está o anél que lhe prometi,seja feliz!");
                        cm.getPlayer().setMarriageQuestLevel(50);
                       cm.dispose();
                   } else {
                        cm.sendNext("Você não obteve todos os materiais certos. Para fazer um anel de noivado, preciso de um dos seguintes conjuntos de itens:\r\n\r\n#e#dAnel de pedra lunar:#k\r\n#v4011007#Pedra da lua 1 \r\n\r\n #v4021007#Diamante 1 \r\n\r\n3,000,000 Mesos  \r\n\r\n\r\n#dAnel de jóia da lua:#k\r\n#v4021009#Pedra estelar 1\r\n\r\n#v4021007#Diamante 1\r\n\r\n 2,000,000 Mesos\r\n\r\n\r\n#dAnel de coração dourado:#k\\r\n\r\n\n#v4011006#Placa de ouro 1 \r\n\r\n #v4021007#Diamante 1 \r\n\r\n 1,000,000 Meso\r\r\n\r\n#dAnel do cisne prateado:#k\r\r\n\r\n\n#v4011004#Prata de prata 1 \r\n\r\n#v4021007#Diamante 1 \r\n\r\n 500,000 Mesos\r\n");
                        cm.dispose();
                    }
                }
            }
        } else if (status == 2) {
            if (cm.getPlayer().getMarriageQuestLevel() == 0 && cm.getPlayer().getLevel() >= 10) {
                cm.getPlayer().addMarriageQuestLevel();
                cm.sendOk("Certo, primeiro me traga de volta quatro  #bProvas de amor diferentes #k. Você pode obte-las falando com as Npc's #bNana#k, a fada do amor em qualquer cidade. Além disso, apenas um de vocês, quer o Noivo ou a noiva fará essa missão.");
                cm.dispose();
           } else if (cm.getPlayer().getMarriageQuestLevel() == 1) {
                for (var j = 4031367; j < 4031373; j++)
                    cm.removeAll(j);
                cm.getPlayer().addMarriageQuestLevel();
                        cm.sendNext("Para fazer um anel de noivado, preciso de um dos seguintes conjuntos de itens:\r\n\r\n#e#dAnel de pedra lunar:#k\r\n#v4011007#Pedra da lua 1 \r\n\r\n #v4021007#Diamante 1 \r\n\r\n3,000,000 Mesos  \r\n\r\n\r\n#dAnel de jóia da lua:#k\r\n#v4021009#Pedra estelar 1\r\n\r\n#v4021007#Diamante 1\r\n\r\n 2,000,000 Mesos\r\n\r\n\r\n#dAnel de coração dourado:#k\\r\n\r\n\n#v4011006#Placa de ouro 1 \r\n\r\n #v4021007#Diamante 1 \r\n\r\n 1,000,000 Meso\r\r\n\r\n#dAnel do cisne prateado:#k\r\r\n\r\n\n#v4011004#Prata de prata 1 \r\n\r\n#v4021007#Diamante 1 \r\n\r\n 500,000 Mesos\r\n");
    cm.dispose();
            }
        }
    }
}