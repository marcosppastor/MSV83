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
/* Author: Xterminator (Modified by XxOsirisxX)
	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
*/
importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(type == 1 && mode == 0)
            status -= 2;
        else{
            qm.dispose();
            return;
        }
    }
    if (status == 0){
        qm.forceStartQuest();
        qm.forceCompleteQuest();
		qm.gainItem(1092003, 1);
	}else if (status == 1)
        qm.sendNextPrev("Você está pedindo que me fez fazer isso? Ahahahaha!\r\nMyself! Farei minha magica, e você verá sua vida decer.");
    else if (status == 2)
        qm.sendAcceptDecline("E la vai...! Abaracadabra~!");
    else if (status == 3) {
        if (qm.c.getPlayer().getHp() >= 50) {
            qm.c.getPlayer().setHp(25);
            qm.c.getPlayer().updateSingleStat(MapleStat.HP, 25);
        }
        if (!qm.haveItem(2010007))
            qm.gainItem(2010007, 1);
        qm.sendNext("Surpreso não?? Então para recuperar sua vida, é necessario comer algo. No seu inventario eu lhe dei algumas maçã's. Você pdoe abrir-lo apertanto a tecla {i}. Abra-o e clique duas vezes na mancã");
    } else if (status == 4) {
        qm.sendPrev("CUIDADO. Caso sua vida chegue a 0, você perderá exp.");
    } else if (status == 5) {
        qm.forceStartQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(type == 1 && mode == 0)
            status -= 2;
        else{
            qm.dispose();
            return;
        }
    }
    if (status == 0)
        if (qm.c.getPlayer().getHp() < 50) {
            qm.sendNext("Bom, verifiquei que você não usou a maça. Coma-a no seu inventario clicando duas vezes nela.");
            qm.dispose();
        } else
            qm.sendNext("Parabense sua vida foi restaurada.");
    else if (status == 1)
        qm.sendNextPrev("Lembre-se CASO SUA VIDA FIQUE ABAIXO DE 1 VOCÊ MORRERA PERDENDO ASSIM EXP.!");
    else if (status == 2)
        qm.sendNextPrev("Ok. Boa jornada e leve consigo estes presentes!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
    else if (status == 3) {
        if(qm.isQuestCompleted(1021))
            qm.dropMessage(1,"Unknown Error");
        else if(qm.canHold(2010000) && qm.canHold(2010009)){
            qm.gainExp(10);
            qm.gainItem(2010000, 3);
            qm.gainItem(2010009, 3);
            qm.forceCompleteQuest();
        }else
            qm.dropMessage(1,"Your inventory is full");
        qm.dispose();
    }
}