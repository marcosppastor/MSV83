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
 *@Author:  Moogra
 *@NPC:     4th Job Bowman Advancement NPC
 *@Purpose: Handles 4th job.
 */

function start() {
	if(cm.getLevel() < 120 || Math.round(cm.getJobId() / 100) != 3) {
		cm.sendOk("Por favor estou tentando me concentrar não me interrompa.");
		cm.dispose();
    } else if (cm.getLevel() < 120 ) { 
        cm.sendOk("Você não passou nos meus testes ainda");
        cm.dispose();
    } else if ( cm.getJobId() % 100 % 10 != 2) {
        cm.sendYesNo("Você esta pronto para adquirir a #rQuarta#k classe?");
	} else {
		cm.sendSimple("Se você quiser eu posso lhe ensinar poderes secretos de sua classe.\r\n#b#L0#Me ensine tais magias!.#l");
		//cm.dispose();
	}
}

function action(mode, type, selection) {
	if (mode >= 1 && cm.getJobId() % 100 % 10 != 2) {
		cm.changeJobById(cm.getJobId() + 1);
		if(cm.getJobId() == 312) {
			cm.teachSkill(3121002, 0, 10, -1);
			cm.teachSkill(3120005, 0, 10, -1);
			cm.teachSkill(3121007, 0, 10, -1);
		} else if(cm.getJobId() == 322) {
			cm.teachSkill(3221002, 0, 10, -1);
			cm.teachSkill(3220004, 0, 10, -1);
			cm.teachSkill(3221006, 0, 10, -1);
		}
	} else if(mode >= 0 && cm.getJobId() % 100 % 10 == 2) {
		if(cm.getJobId() == 312) {
			if(cm.getPlayer().getSkillLevel(3121008) == 0)
				cm.teachSkill(3121008 , 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(3121006) == 0)
				cm.teachSkill(3121006 , 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(3121004) == 0)
				cm.teachSkill(3121004 , 0, 10, -1);
		} else if(cm.getJobId() == 322) {
			if(cm.getPlayer().getSkillLevel(3221007) == 0)
				cm.teachSkill(3221007 , 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(3221005) == 0)
				cm.teachSkill(3221005 , 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(3221001) == 0)
				cm.teachSkill(3221001 , 0, 10, -1);
		}
		cm.sendOk("Esta feito, vá.");
	}
    cm.dispose();
}