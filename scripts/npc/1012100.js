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

/*      Athena Pierce
	Bowman Job Advancement
	Victoria Road : Bowman Instructional School (100000201)
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 310;

function start() {
    if (cm.getJobId() == 0) {
        actionx["1stJob"] = true;
        if (cm.getLevel() >= 10)
            cm.sendNext("Então você decidiu se tornar um #rArqueiro#k?");
        else {
            cm.sendOk("Treine um pouco mais e eu lhe mostrarei o que é ser um #rArqueiro#k.");
            cm.dispose();
        }
    } else if (cm.getLevel() >= 30 && cm.getJobId() == 300) {
        actionx["2ndJob"] = true;
        if (cm.haveItem(4031012))
            cm.sendNext("Vejo que você esta indo bem, terei de concordar em lhe ajudar no próximo passo de sua longa jornada.");
        else if (cm.haveItem(4031011)){
            cm.sendOk("Va e veja #b#p1072002##k.");
            cm.dispose();
        } else
            cm.sendYesNo("Hmmm... you have grown a lot since I last saw you. I don't see the weakling I saw before, and instead, look much more like a bowman now. Well, what do you think? Don't you want to get even more powerful than that? Pass a simple test and I'll do just that for you. Do you want to do it?");
    } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 3 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
        actionx["3thJobI"] = true;
        cm.sendNext("There you are. A few days ago, #b#p2020010##k of Ossyria talked to me about you. I see that you are interested in making the leap to the amazing world of the third job advancement for archers. To achieve that goal, I will have to test your strength in order to see whether you are worthy of the advancement. There is an opening in the middle of a deep forest in Victoria Island, where it'll lead you to a secret passage. Once inside, you'll face a clone of myself. Your task is to defeat him and bring #b#t4031059##k back with you.");
    } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
        cm.sendNext("Please, bring me the #b#t4031059##k.");
        cm.dispose();
    } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
        actionx["3thJobC"] = true;
        cm.sendNext("Nice work. You have defeated my clone and brought #b#t4031059##k back safely. You have now proven yourself worthy of the 3rd job advancement from the physical standpoint. Now you should give this necklace to #b#p2020011##k in Ossyria to take on the second part of the test. Good luck. You'll need it.");
    } else {
        cm.sendOk("You have chosen wisely.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type != 1)
        status -= 2;
    if (status == -1){
        start();
        return;
    } else if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
        if (mode == 0 && status == 2 && type == 1)
            cm.sendOk("Você sabe que não há outra escolha...");
        if (!(mode == 0 && type != 1)){
            cm.dispose();
            return;
        }
    }
    if (actionx["1stJob"]){
        if (status == 0)
            cm.sendYesNo("Oh...! Você parece que faz parte de nós... você apenas precisa de uma mente aguçada,com sede de aprender.Quer se tornar um Arqueiro?");
        else if (status == 1){
            if (cm.canHold(1452051) && cm.canHold(2060000)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(300);
					cm.gainItem(1452051, 1);
					cm.gainItem(2060000, 1000);
                    cm.gainItem(1003034,1);
					cm.resetStats();
                }
                cm.sendNext("Tudo bem, daqui para frente, você é uma parte de nós! Você vai viver a vida de um andarilho ...seja paciente logo, você estará vivendo a vida bela. Certo, não é muito, mas vou te dar algumas das minhas habilidades ...HAAAHHH!!!");
            } else {
                cm.sendNext("Deixe espaço no seu inventário e volte a falar comigo.");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("Você se tornou muito mais forte agora. Além disso, a cada um de seus estoques foram adicionou espaços extras.Eu apenas dei-lhe um pouco de #bSP#k. Quando você abrir o menu #bSkill#k no canto inferior esquerdo da tela, existem habilidades que você pode aprender por meio de pontos. Um aviso, porém: Você não pode ter todas habilidades juntas de uma vez juntos de uma vez. . Há também habilidades que você pode adquirir apenas depois de ter aprendido outras ");
		else
			cm.dispose();
	} else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("Ok, quando você tomar sua decisão clique em [Eu quero escolher minha classe] abaixo..#b\r\n#L0#Me explique o que faz um Caçador.\r\n#L1#Me explique o que faz um Balestreiro.\r\n#L2#Eu quero escolher minha classe!");
            else
                cm.sendNext("Sabia decisão. Você parece forte, mas eu preciso ver se você é forte o suficiente para passar no teste, não é um teste dificil, você vai se sair bem. Agora, pegue minha carta primeiro... tenha certeza de que não vai perde-la!");
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031010)){
                    if (!cm.haveItem(4031010))
                        cm.gainItem(4031010, 1);
                    cm.sendNextPrev(" Por favor entregue esta carta para #b#p1072002##k que se encontra nos arredores #b#m106010000##k próximo a Henesys. Ele sera o responsavel por instruir seu avanço de classe. De a ele minha carta e ele te mostrara a próxima etapa deste teste.");
					cm.dispose();
				} else {
                    cm.sendNext("Por favor, deixe espaço livre em seu inventário.");
                    cm.dispose();
                }
            } else {
                if (selection < 2){
                    cm.sendNext("Incompleto.");
                    status -= 2;
                } else
                    cm.sendSimple("Agora ... você se decidiu? Escolha a classe que deseja  para o seu segundo avanço. #b\r\n#L0#Caçador\r\n#L1#Balestreiro");
            }
        } else if (status == 2){
            job += selection * 10;
            cm.sendYesNo("Então você quer definir  a sua segunda classe como " + (job == 310 ? "#bCaçador#k" : "#bBalestreiro#k") + "? Você sabe que você não poderá escolher uma classe diferente para o 2º avanço , uma vez que você faça sua escolha aqui, certo?");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.sendNext("Ok,você é um " + (job == 310 ? "#bCaçador#k" : "#bBalestreiro#k") + " daqui em diante. A sua classe é o grupo inteligente com agilidade, capaz de derrotar monstros  com facilidade ... por favor, treine todos os dias. Nós o ajudaremos a tornar-se ainda mais forte do que você já é!.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("Acabei de dar-lhe um livro que lhe dá a lista de habilidades que você pode adquirir como um " + (job == 310 ? "Caçador" : "Balestreiro") + ". Também o seu inventário ETC expandiu adicionando mais espaço para armazenamento. Seu HP e MP máximo aumentaram também. Vá verificar e ver por você mesmo.");
        else if (status == 5)
            cm.sendNextPrev("Eu também lhe dei um pouco de #bAtributos de Habiliddes # k. Abra o #bMenu de Habilidades Menu # k localizado no canto inferior direito. Você poderá aumentar as novas habilidades de segunda classe adquiridas. Uma palavra de aviso . Você não pode aumentá-las de uma só vez. Algumas das habilidades só estão disponíveis depois de ter aprendido outras habilidades. Certifique-se de que você lembre disso. ");
        else if (status == 6)
            cm.sendNextPrev((job == 310 ? "Caçador" : "Balestreiro") + " precisa ser forte. Mas lembre-se de que você não pode abusar desse poder e usá-lo errado. Use seu  poder do jeito certo, porque ... para que você siga esse caminho correto, isso é muito mais complexo do que apenas ficar mais forte. Encontre-me depois que estiver mais forte. Eu estarei esperando por você..");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("Since he is a clone of myself, you can expect a tough battle ahead. He uses a number of special attacking skills unlike any you have ever seen, and it is your task to successfully take him one on one. There is a time limit in the secret passage, so it is crucial that you defeat him within the time limit. I wish you the best of luck, and I hope you bring the #b#t4031059##k with you.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}

/*
function start() {
    if (cm.getJobId() == 0) {
        actionx["1stJob"] = true;
        if (cm.getLevel() >= 10)
            
        else {
            
            cm.dispose();
        }
    } else {
        if (cm.getLevel() >= 30 && cm.getJobId() == 300) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                
            else if (cm.haveItem(4031010)){
                cm.sendOk("Go and see the #b#p1072002##k.");
                cm.dispose();
            } else
                
        } else if (cm.isQuestStarted(100100)) {
            if (cm.isQuestCompleted(100101))
                cm.sendOk("Alright, now take this to #bRene#k.");
            else {
                
                cm.startQuest(100101);
            }
            cm.dispose();
        } else {
            cm.sendOk("You have chosen wisely.");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type != 1)
        status -= 2;
    if (status == -1){
        start();
        return;
    } else if (mode != 1 || status == 7 && type != 1 || (cm.haveItem(4031010) && status == 2)){
        if (mode == 0 && status == 2)
            cm.sendOk("Make up your mind and visit me again.");
        if (!(mode == 0 && type != 1)){
            cm.dispose();
            return;
        }
    }
    if (actionx["1stJob"]){
        if (status == 0)
            
        else if (status == 1)
            
        else if (status == 2) {
            
                cm.sendOk("So be it! Now go, and go with pride.");
            } else {
                cm.sendNext("Make some room in your inventory and talk to me again.");
                cm.dispose();
            }
        }
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("Alright, when you have made your decision, click on [I'll choose my occupation] at the bottom.#b\r\n#L0#Please explain to me what being the Hunter is all about.\r\n#L1#Please explain to me what being the Crossbowman is all about.\r\n#L2#I'll choose my occupation!");
            else
                cm.sendNext("Good decision. You look strong, but I need to see if you really are strong enough to pass the test, it's not a difficult test, so you'll do just fine. Here, take my letter first... make sure you don't lose it!");
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031010)){
                    if (!cm.haveItem(4031010))
                        cm.gainItem(4031010, 1);
                    cm.sendNextPrev("Please get this letter to #b#p1072002##k who's around #b#m106010000##k near Henesys. She is taking care of the job of an instructor in place of me. Give her the letter and she'll test you in place of me. Best of luck to you.");
                } else {
                    cm.sendNext("Please, make some space in your inventory.");
                    cm.dispose();
                }
            } else {
                if (selection < 2){
                    cm.sendNext("Not done.");
                    status -= 2;
                } else
                    cm.sendSimple("Now... have you made up your mind? Please choose the job you'd like to select for your 2nd job advancement. #b\r\n#L0#Hunter\r\n#L1#Crossbowman");
            }
        } else if (status == 2){
            job += selection * 10;
            cm.sendYesNo("So you want to make the second job advancement as the " + (job == 310 ? "#bHunter#k" : "#bCrossbowman#k") + "? You know you won't be able to choose a different job for the 2nd job advancement once you make your desicion here, right?");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.sendNext("Alright, you're the " + (job == 310 ? "#bHunter#k" : "#bCrossbowman#k") + " from here on out. Hunters are the intelligent bunch with incredible vision, able to pierce the arrow through the heart of the monsters with ease... please train yourself each and everyday. We'll help you become even stronger than you already are.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("I have just given you a book that gives you the list of skills you can acquire as a " + (job == 310 ? "hunter" : "crossbowman") + ". Also your etc inventory has expanded by adding another row to it. Your max HP and MP have increased, too. Go check and see for it yourself.");
        else if (status == 5)
            cm.sendNextPrev("I have also given you a little bit of #bSP#k. Open the #bSkill Menu#k located at the bottomleft corner. you'll be able to boost up the newer acquired 2nd level skills. A word of warning, though. You can't boost them up all at once. Some of the skills are only available after you have learned other skills. Make sure yo remember that.");
        else if (status == 6)
            cm.sendNextPrev((job == 310 ? "Hunter" : "Crossbowman") + " need to be strong. But remember that you can't abuse that power and use it on a weaking. Please use your enormous power the right way, because... for you to use that the right way, that is much harden than just getting stronger. Please find me after you have advanced much further. I'll be waiting for you.");
    }
}*/