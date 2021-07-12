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
/* Grendel the Really Old
	Magician Job Advancement
	Victoria Road : Magic Library (101000003)

	Custom Quest 100006, 100008, 100100, 100101
*/

var status = 0;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 2) {
            cm.sendOk("Você sabe que não há outra escolha....");
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getJobId()==0) {
                if (cm.getLevel() > 7)
            cm.sendNext("Quer ser um bruxo? Tens muitas classes a seguir,porém eu não aceito a todos... #bSeu level tem que ser pelo menos 8, com INT acima de 25#k. Deixe-me ver.");
                else {
            cm.sendOk("Treine um pouco mais e eu lhe mostrarei o que é ser um #rBruxo#k.");
                    cm.dispose();
                }
            } else {
                if (cm.getLevel() >= 30 && cm.getJobId()==200) {
                    if (cm.isQuestStarted(100006)) {
                        cm.completeQuest(100008);
                        if (cm.isQuestCompleted(100008)) {
                            status = 20;
            cm.sendNext("Vejo que você esta indo bem, terei de concordar em lhe ajudar no próximo passo de sua longa jornada.");
                        } else {
                            cm.sendOk("Go and see the #rJob Instructor#k.")
                            cm.dispose();
                        }
                    } else {
                        status = 10;
            cm.sendNext("Vejo que você esta indo bem, terei de concordar em lhe ajudar no próximo passo de sua longa jornada.");
                    }
                } else if (cm.isQuestStarted(100100)) {
                    cm.completeQuest(100101);
                    if (cm.isQuestCompleted(100101)) {
                        cm.sendOk("Alright, now take this to #bRobeira#k.");
                    } else {
                        cm.sendOk("Hey, " + cm.getPlayer().getName() + "! I need a #bBlack Charm#k. Go and find the Door of Dimension.");
                        cm.startQuest(100101);
                    }
                    cm.dispose();
                } else {
            cm.sendOk("Ok,agora vá e siga seu caminho com sabedoria.");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            cm.sendNextPrev("Esta é uma escolha importante, não podera voltar atrás.");
        } else if (status == 2) {
            cm.sendYesNo("Você quer se tornar um #rBruxo#k?");
        } else if (status == 3) {
            if (cm.getJobId()==0)
                cm.changeJobById(200);
            cm.gainItem(1372005, 1);
            cm.gainItem(1372043, 1);
            cm.gainItem(1003032,1);
            cm.sendOk("Agora vá....");
            cm.resetStats();
            cm.dispose();
        } else if (status == 11) {
            cm.sendNextPrev("Você esta pronto para o próximo passo #rFeiticeiro Fogo/Veneno #k, #rFeiticeiro Gelo/Raio #k ou #rClérigo#k.");
        } else if (status == 12) {
            cm.sendAcceptDecline("Mas primeiro quero lhe testar!");
        } else if (status == 13) {
            //            cm.startQuest(100006);
            //            cm.sendOk("Go see the #bJob Instructor#k near Ellinia. He will show you the way.");
            //        } else if (status == 21) {
            cm.sendSimple("O que você quer se tornar ?#b\r\n#L0#Feiticeiro Fogo/Veneno#l\r\n#L1#Feitieiro Gelo/Raio#l\r\n#L2#Clérigo#l#k");
        } else if (status == 14) {
            var jobName;
            if (selection == 0) {
                jobName = "Feiticeiro Fogo/Veneno";
                job = 210;
            } else if (selection == 1) {
                jobName = "Feiticeiro Gelo/Raio";
                job = 220;
            } else {
                jobName = "Clérigo";
                job = 230;
            }
            cm.sendYesNo("Você quer se tornar um  #r" + jobName + "#k?");
        } else if (status == 15) {
            cm.changeJobById(job);
            cm.sendOk("Ok,agora vá e siga seu caminho com sabedoria.");
        }
    }
}	
