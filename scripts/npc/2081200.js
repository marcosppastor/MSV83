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
 *@NPC:     4th Job Mage Advancement NPC
 *@Purpose: Handles 4th job.
 */

 function start() {
	if(cm.getLevel() < 120 || Math.round(cm.getJobId() / 100) != 2) {
		cm.sendOk("Por favor estou tentando me concentrar não me interrompa..");
		cm.dispose();
    } else if ((cm.getLevel() < 120)) {
        cm.sendOk("Você não passou nos meus testes ainda.");
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
		if(cm.getJobId() == 212) {
			cm.teachSkill(2121001, 0, 10, -1);
			cm.teachSkill(2121002, 0, 10, -1);
			cm.teachSkill(2121006, 0, 10, -1);
		} else if(cm.getJobId() == 222) {
			cm.teachSkill(2221001, 0, 10, -1);
			cm.teachSkill(2221002, 0, 10, -1);
			cm.teachSkill(2221006, 0, 10, -1);
		} else if(cm.getJobId() == 232) {
			cm.teachSkill(2321001, 0, 10, -1);
			cm.teachSkill(2321002, 0, 10, -1);
			cm.teachSkill(2321005, 0, 10, -1);
		}
	} else if( mode >= 1 && cm.getJobId() % 100 % 10 == 2) {
		if(cm.getJobId() == 212) {
			if(cm.getPlayer().getSkillLevel(2121007) == 0)
				cm.teachSkill(2121007 , 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(2121005) == 0)
				cm.teachSkill(2121005 , 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(2121005) == 0)
				cm.teachSkill(2121005 , 0, 10, -1);
		} else if(cm.getJobId() == 222) {
			if(cm.getPlayer().getSkillLevel(2221007) == 0)
				cm.teachSkill(2221007 , 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(2221005) == 0)
				cm.teachSkill(2221005 , 0, 10, -1);
			if(cm.getPlayer().getSkillLevel(2221003) == 0)
				cm.teachSkill(2221003 , 0, 10, -1);
		} else if(cm.getJobId() == 232) {
			if (cm.getPlayer().getSkillLevel(2321008) < 1)
	    		  cm.teachSkill(2321008, 0, 10,-1); // Genesis 
	    	if (cm.getPlayer().getSkillLevel(2321006) < 1)
		    	cm.teachSkill(2321006, 0, 10,-1); // res
		}
		cm.sendOk("Esta feito, vá.");
	}
    cm.dispose();
}