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
 *@NPC:     4th Job Warrior Advancement NPC
 *@Purpose: Handles 4th job.
 */

function start() {
	if(cm.getLevel() < 120 || Math.round(cm.getJobId() / 100) != 1) {
		cm.sendOk("Por favor estou tentando me concentrar não me interrompa.");
		cm.dispose();
    } else if (cm.getLevel() < 120) {
        cm.sendOk("Você não passou nos meus testes ainda.");
        cm.dispose();
    } else if ( cm.getJobId() % 100 % 10 != 2) {
        cm.sendYesNo("VocÃª esta pronto para adquirir a #rQuarta#k classe?");
	} else {
		cm.sendSimple("Se você quiser eu posso lhe ensinar poderes secretos de sua classe.\r\n#b#L0#Me ensine tais magias!.#l");
		//cm.dispose();
	}
}

function action(mode, type, selection) {
    if (mode >= 1 && cm.getJobId() % 100 % 10 != 2) {
		cm.changeJobById(cm.getJobId() + 1);
		if(cm.getJobId() == 112) {
			cm.teachSkill(1121001, 0, 10, -1);
			cm.teachSkill(1120004, 0, 10, -1);
			cm.teachSkill(1121008, 0, 10, -1);
		} else if(cm.getJobId() == 122) {
			cm.teachSkill(1221001, 0, 10, -1);
			cm.teachSkill(1220005, 0, 10, -1);
			cm.teachSkill(1221009, 0, 10, -1);
		} else if(cm.getJobId() == 132) {
			cm.teachSkill(1321001, 0, 10, -1);
			cm.teachSkill(1320005, 0, 10, -1);
			cm.teachSkill(1321007, 0, 10, -1);
		}
	} else if(mode >= 0 && cm.getJobId() % 100 % 10 == 2) {
		// TEMP until I can get the quest fixed...
		if(cm.getJobId() == 112) {
			if(cm.getPlayer().getSkillLevel(1121010) == 0)
				cm.teachSkill(1121010 , 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(1120005) == 0)
				cm.teachSkill(1120005 , 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(1121002) == 0)
				cm.teachSkill(1121002 , 0, 10, -1);
		}  else if(cm.getJobId() == 122) {
			if(cm.getPlayer().getSkillLevel(1221002) == 0)
				cm.teachSkill(1221002, 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(1221003) == 0)
				cm.teachSkill(1221003, 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(1221004) == 0)
				cm.teachSkill(1221004, 0, 10, -1);
		} else if(cm.getJobId() == 132) {
			if(cm.getPlayer().getSkillLevel(1321002) == 0)
				cm.teachSkill(1321002, 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(1320008) == 0)
				cm.teachSkill(1320008, 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(1320009) == 0)
				cm.teachSkill(1320009, 0, 10, -1);
		}
		cm.sendOk("Esta feito, vá.");
	}
    cm.dispose();
}