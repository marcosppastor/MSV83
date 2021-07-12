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
	Author : 		Generic
	NPC Name: 		Neinheart
	Map(s): 		Ereve: Empress' Road
	Description: 		Quest - Neinheart the Tactician
	Quest ID: 		20001
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0)
            qm.sendNext("Ola, #h #. Meu nome e Neinheart Von Rubistein. Nesta etapa, para que voce consiga passar de mapa e se tornar um Cygnus Knight, voce devera responder algumas perguntinhas...");
        else if (status == 1)
            qm.sendNextPrev("Eu entendo que voce nao tem tempo suficiente e exposicão a descobrir o que voce realmente precisa fazer como um cavaleiro Cygnus. Vou explicar-lhe em detalhe, um por um. Vou explicar de onde voce e, quem a jovem Imperatriz e, e quais sao os nossos deveres ...");
        else if (status == 2)
            qm.sendNextPrev("Voce uma ilha chamada Ereve, a unica terra que e governado pela jovem Imperatriz. Nos ficamos aqui por necessidade, mas geralmente funciona como um navio que flutua por todo o jogo, por causa da jovem Imperatriz...");
        else if (status == 3)
            qm.sendNextPrev("A jovem Imperatriz e a governanta deste Pais. Nao chega a ser uma ditadora, mas sim uma vigia.");
        else if (status == 4)
            qm.sendNextPrev("Recentemente, ficamos sabendo que o maligno do Black Mage vem mostrando sinais de ressurreicao em todo o mundo. Ele e basicamente o Rei da Destruicao e das Trevas.");
        else if (status == 5)
            qm.sendNextPrev("O nosso unico grande problema, e ter a certeza de que o Black Mage esta vivo. Se ele realmente estiver, teremos de lutar!");
        else if (status == 6)
            qm.sendNextPrev("Como nao sabemos ao certo o paradeiro do Black Mage, estamos treinando novas pessoas para que estas, caso necessario, venham lutar conosco contra o mal.");
        else if (status == 7)
            qm.sendNextPrev("A sua funcao para com a Imperatriz e simples: Voce devera ficar cada vez mais forte, a fim de protege-la caso o Black Mage apareca.");
        else if (status == 8)
            qm.sendAcceptDecline("Esta e uma visao geral de toda a situacao.\r\nPor acaso, voce entendeu?");
        else if (status == 9) {
            if (qm.isQuestCompleted(20001)) {
                qm.gainExp(40);
                qm.gainItem(1052177, 1); // fancy noblesse robe
            }
            qm.forceStartQuest();
            qm.forceCompleteQuest();
            qm.sendNext("Fico feliz em ver que voce me entendeu, mas saiba: Com a sua forca atual, voce nao e capaz nem de pensar no Black Mage!\r\nVoce acha que realmente esta pronto para assumir uma responsabilidade, e seguir esta com total dedicacao?");
        } else if (status == 10)
            qm.sendNextPrev("Voce ja pode ser um Membro Cygnus, mas esta longe de ser um Cavaleiro. De modo geral, voce precisara ficar sentado, fazendo anotacoes para seus supervisores...");
        else if (status == 11)
            qm.sendNextPrev("Mas tambem nao desanime, pois ninguem neste mundo ja nasce forte. Assim como os outros tiveram que se desempenham muito, voce tambem precisara.");
        else if (status == 12)
            qm.sendPrev("Siga a sua jornada.\r\nA proxima vez que nos vermos, quero que voce esteja ao menos no level 10!");
    }
}