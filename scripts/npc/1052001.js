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
/* Dark Lord
	Thief Job Advancement
	Victoria Road : Thieves' Hideout (103000003)
	Custom Quest 100009, 100011
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 410;

function start() {
    if (cm.getJobId() == 0) {
        actionx["1stJob"] = true;
        if (cm.getLevel() >= 10)
            cm.sendNext("Quer ser um Gatuno? Tens muitas classes a seguir,porém eu não aceito a todos... #bSeu level tem que ser pelo menos 10, com DEX acima de 25#k. Deixe-me ver.");
        else {
            cm.sendOk("Treine um pouco mais e eu lhe mostrarei o que é ser um #rGatuno#k.");
            cm.dispose();
        }
    } else if (cm.getLevel() >= 30 && cm.getJobId() == 400) {
        actionx["2ndJob"] = true;
        if (cm.haveItem(4031012))
            cm.sendNext("Vejo que você esta indo bem, terei de concordar em lhe ajudar no próximo passo de sua longa jornada.");
        else if (cm.haveItem(4031011)){
            cm.sendOk("Va e veja #b#p1072003##k.");
            cm.dispose();
        } else
            cm.sendNext("The progress you have made is astonishing.");
    } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 4 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
        actionx["3thJobI"] = true;
        cm.sendNext("There you are. A few days ago, #b#p2020011##k of Ossyria talked to me about you. I see that you are interested in making the leap to the dark world of the third job advancement for thieves. To archieve that goal, I will have to test your strength in orden to see whether you are worthy of the advancement. There is an opening in the middle of a deep swamp in Victoria Island, where it'll lead you to a secret passage. Once inside, you'll face a clone of myself. Your task is to defeat him and bring #b#t4031059##k back with you.");
    } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
        cm.sendNext("Please, bring me the #b#t4031059##k.");
        cm.dispose();
    } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
        actionx["3thJobC"] = true;
        cm.sendNext("Nice work. You have defeated my clone and brought #b#t4031059##k back safely. You have now proven yourself worthy of the 3rd job advancement from the physical standpoint. Now you should give this necklace to #b#p2020011##k in Ossyria to take on the second part of the test. Good luck. You'll need it.");
    } else if (cm.isQuestStarted(6141)) {
        cm.warp(910300000, 3);
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
            cm.sendOk("Você sabe que não há outra escolha....");
        if (!(mode == 0 && type != 1)){
            cm.dispose();
            return;
        }
    }
    if (actionx["1stJob"]){
        if (status == 0)
            cm.sendYesNo("Oh...! Você parece que faz parte de nós... você apenas precisa de uma mente aguçada,com sede de aprender.Quer se tornar um Gatuno?");
        else if (status == 1){
            if (cm.canHold(2070000) && cm.canHold(1472061)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(400);
                    cm.gainItem(2070000, 500);
                    cm.gainItem(1472061, 1);
                    cm.gainItem(1003033,1);
                    cm.resetStats();
                }
                cm.sendNext("Tudo bem, daqui para frente, você é uma parte de nós! Você vai viver a vida de um andarilho ...seja paciente logo, você estará vivendo a vida bela. Certo, não é muito, mas vou te dar algumas das minhas habilidades ...HAAAHHH!!!");
            } else {
                cm.sendNext("Deixe espaço no seu inventário e volte a falar comigo.");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("Você se tornou muito mais forte agora. Além disso, a cada um de seus estoques foram adicionou espaços extras.Eu apenas dei-lhe um pouco de #bSP#k. Quando você abrir o menu #bSkill#k no canto inferior esquerdo da tela, existem habilidades que você pode aprender por meio de pontos. Um aviso, porém: Você não pode ter todas habilidades juntas de uma vez juntos de uma vez. . Há também habilidades que você pode adquirir apenas depois de ter aprendido outras ");
        else if (status == 3)
            cm.sendNextPrev("Nos veremos novamente!");
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("Ok, quando você tomar sua decisão clique em [Eu quero escolher minha classe] abaixo.#b\r\n#L0#Me explique o que faz um Mercenário.\r\n#L1#Me explique o que faz um Arruaceiro.\r\n#L3#Eu quero escolher minha classe!");
            else
                cm.sendNext("Sabia decisão. Você parece forte, mas eu preciso ver se você é forte o suficiente para passar no teste, não é um teste dificil, você vai se sair bem. Agora, pegue minha carta primeiro... tenha certeza de que não vai perde-la!");
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031011)){
                    if(!cm.haveItem(4031011))
                        cm.gainItem(4031011, 1);
                    cm.sendNextPrev("Por favor entregue esta carta para #b#p1072003##k que se encontra nos arredores #b#m102040000##k próximo a Cidade de Kerning.Ele sera o responsável por instruir seu avanço de classe. De a ele minha carta e ele te mostrara a próxima etapa deste teste.");
                } else {
                    cm.sendNext("Por favor, deixe espaço livre em seu inventário.");
                    cm.dispose();
                }
            }else{
                if (selection < 3){
                    cm.sendNext("Incompleto.");
                    status -= 2;
                } else
                    cm.sendSimple("Agora ... você se decidiu? Escolha a classe que deseja  para o seu segundo avanço. #b\r\n#L0#Mercenário\r\n#L1#Arruaceiro");
            }
        } else if (status == 2){
            if (cm.haveItem(4031011)){
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("Então você quer definir  a sua segunda classe como " + (job == 410 ? "#bMercenário#k" : "#bArruaceiro#k") + "? Você sabe que você não poderá escolher uma classe diferente para o 2º avanço , uma vez que você faça sua escolha aqui, certo?");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.sendNext("Ok,você é um" + (job == 410 ? "#bMercenário#k" : "#bArruaceiro#k") + " daqui em diante. A sua classe é o grupo inteligente com agilidade, capaz de derrotar monstros  com facilidade ... por favor, treine todos os dias. Nós o ajudaremos a tornar-se ainda mais forte do que você já é!.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("Acabei de dar-lhe um livro que lhe dá a lista de habilidades que você pode adquirir como um " + (job == 410 ? "mercenário" : "arruaceiro") + ". Também o seu inventário ETC expandiu adicionando mais espaço para armazenamento. Seu HP e MP máximo aumentaram também. Vá verificar e ver por você mesmo.");
        else if (status == 5)
            cm.sendNextPrev("Eu também lhe dei um pouco de #bAtributos de Habiliddes # k. Abra o #bMenu de Habilidades Menu # k localizado no canto inferior direito. Você poderá aumentar as novas habilidades de segunda classe adquiridas. Uma palavra de aviso . Você não pode aumentá-las de uma só vez. Algumas das habilidades só estão disponíveis depois de ter aprendido outras habilidades. Certifique-se de que você lembre disso. ");
        else if (status == 6)
            cm.sendNextPrev((job == 410 ? "Mercenário" : "Arruaceiro") + " precisa ser forte. Mas lembre-se de que você não pode abusar desse poder e usá-lo errado. Use seu  poder do jeito certo, porque ... para que você siga esse caminho correto, isso é muito mais complexo do que apenas ficar mais forte. Encontre-me depois que estiver mais forte. Eu estarei esperando por você..");
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