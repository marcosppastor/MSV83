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
importPackage(Packages.client);

status = -1;

function start(mode, type, selection) {
    status++;
    if(mode == 0 && type == 0)
        status -= 2;
    else if (mode != 1) {
        if (mode == 0)
            qm.sendNext("#b(Você precisa pensar sobre isso por um segundo...)#k");
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendYesNo("#b(Você está certo de que você era o herói que exercia a #p1201001#? Sim, você tem certeza. É melhor pegar o #p1201001# Muito bem. Certamente, vamos a enfrentar com você.)#k");
    } else if (status == 1) {
        if (qm.getPlayer().getJob().getId() == 2000) {
			if(!qm.canHold(1142129)) {
				cm.sendOk("Seu #bequip#k inventario esta cheio. Preciso que você deixe pelo menos 1 slot vazio para completar essa missão.");
				qm.dispose();
				return;
			}
			qm.gainItem(1142129, true);
            qm.completeQuest();
            qm.getPlayer().setStr(35);
            qm.getPlayer().setDex(4);
            qm.getPlayer().setRemainingAp((qm.getPlayer().getLevel() - 1) * 5 - 22);
            qm.getPlayer().setRemainingSp((qm.getPlayer().getLevel() - 10) * 3 + 1);
            qm.getPlayer().setMaxHp(qm.getPlayer().getMaxHp() + 275);
            qm.getPlayer().setMaxMp(qm.getPlayer().getMaxMp() + 15);
			            //qm.getPlayer().changeSkillLevel(SkillFactory.getSkill(20009000), 0, -1);
            //qm.getPlayer().changeSkillLevel(SkillFactory.getSkill(20009000), 1, 0);
            //qm.showInfo("You have acquired the Pig's Weakness skill.");
            qm.sendNextPrev("#b(Você pode estar começando a lembrar de algo...)#k", 3);
        }
    } else if (status == 2) {
        //qm.warp(914090100);
        qm.dispose();
    }
}

function end(mode, type, selection) {
}