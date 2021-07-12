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

importPackage(Packages.net.server.guild);

var status;
var choice;
var guildName;
var partymembers;

function start() {
    partymembers = cm.getPartyMembers();
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 0)
        cm.sendSimple("Olá! Eu sou #bLenario#k\r\n#b#L0#Você pode me dizer o que é a aliança de Clã??#l\r\n#L1#Como eu faço uma aliança de clã#l\r\n#L2#Eu quero fazer uma aliança.#l\r\n#L3#Eu quero adicionar mais clãs a aliança#l\r\n#L4#Eu quero cancelar minha aliança.#l");
    else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            cm.sendNext("A aliança é exatamente como se diz, uma união de uma série de clãs para formar um super grupo. Eu estou encarregada de gerenciar essas uniões!");
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("Para criar uma aliança, 2 Mestres do clã precisam estar em uma grupo. O líder deste grupo será designado como o Mestre da aliança.");
            cm.dispose();
        } else if(selection == 2) {
                cm.sendYesNo("Você esta interessado em criar uma aliança?");
        } else if (selection == 3) {
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendOk("Não esta pronto"); //ExpandGuild Text
            else {
                cm.sendNext("Apenas o liderda aliança pode expandir o numero de clãs.");
                cm.dispose();
            }
        } else if(selection == 4) {
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("Você quer desfazer sua aliança?");
            else {
                cm.sendNext("Apenas o lider da aiança pode desfaze-la.");
                cm.dispose();
            }
        }
    } else if(status == 2) {
        if (choice == 2) {
            cm.sendGetText("Agora digite o nome da sua aliança. (max. 12 letras)");
        } else if (choice == 4) {
            if (cm.getPlayer().getGuild() == null) {
                cm.sendNext("Você não pode desfazer uma aliança que não existe!");
                cm.dispose();
            } else if (cm.getPlayer().getGuild().getAllianceId() <= 0) {
                cm.sendNext("Você não pode desfazer uma aliança que não existe!");
                cm.dispose();
            } else {
                cm.disbandAlliance(cm.getClient(), cm.getPlayer().getGuild().getAllianceId());
                cm.sendOk("Sua aliança foi desfeita");
                cm.dispose();
            }
        }
    } else if (status == 3) {
        guildName = cm.getText();
        cm.sendYesNo("Será "+ guildName + " o nome de sua aliança?");
    } else if (status == 4) {
        if (!cm.canBeUsedAllianceName(guildName)) {
            cm.sendNext("Este nome está indisponivel, tente outro"); //Not real text
            status = 1;
            choice = 2;
        } else {
            if (MapleAlliance.createAlliance(partymembers.get(0), partymembers.get(1), guildName) == null)
                cm.sendOk("Um erro .");
            else
                cm.sendOk("Você formou uma aliança  com sucesso!.");
            
            cm.dispose();
        }
    }
}