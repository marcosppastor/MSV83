

/**
  Questions.
-- Original Author --------------------------------------------------------------------------------
	Jvlaple
-- Modified by -----------------------------------------------------------------------------------
	XoticMS.
---------------------------------------------------------------------------------------------------
**/

/*
importPackage(Packages.client);
importPackage(Packages.server);
var status;
var otherChar;
var char;
 
function start() {
	otherChar = cm.getSendermarriage();
        
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        if (type == 1 && mode == 0)
            otherChar.dropMessage(1, "Your partner has declined your request.");
        else
            otherChar.dropMessage(1, "Your partner closed the npc chat.");
        cm.dispose();
        return;
    }
	
    if (status == 0) {
        cm.sendNext("Someone in MS wants to send you a message.");
    } else if (status == 1) {
        cm.sendYesNo("Do you wish to be engaged to " + otherChar + "?") ;
    } else if (status == 2) {
        if (cm.createEngagement(otherChar)) {
            otherChar.dropMessage(1, "Your partner has accepted your request.");
            otherChar.setMarriageQuestLevel(50);
            cm.getPlayer().setMarriageQuestLevel(50);
            if (otherChar.getItemQuantity(2240000, false) > 0) {
                MapleInventoryManipulator.removeById(otherChar.getClient(), MapleInventoryType.USE, 2240000, 1, false, false);
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031358, 1, "slut!");
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031357, 1, "cunt!");
                cm.gainItem(4031358, 1);
            } else if (otherChar.getItemQuantity(2240001, false) > 0) {
                MapleInventoryManipulator.removeById(otherChar.getClient(), MapleInventoryType.USE, 2240001, 1, false, false);
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031360, 1, "shit!");
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031359, 1, "shit!");
                cm.gainItem(4031360, 1);
            } else if (otherChar.getItemQuantity(2240002, false) > 0) {
                MapleInventoryManipulator.removeById(otherChar.getClient(), MapleInventoryType.USE, 2240002, 1, false, false);
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031362, 1, "shit!");
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031361, 1, "shit!");
                cm.gainItem(4031362, 1);
            } else if (otherChar.getItemQuantity(2240003, false) > 0) {
                MapleInventoryManipulator.removeById(otherChar.getClient(), MapleInventoryType.USE, 2240003, 1, false, false);
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031364, 1, "shit!");
                MapleInventoryManipulator.addById(otherChar.getClient(), 4031363, 1, "shit!");
                cm.gainItem(4031364, 1);
            }
        } else {
            cm.sendOk("There seems to be an error with the system. Try again ?");
            otherChar.dropMessage(1, "There seems to be an error with the system. Try again ?.");
        }
        cm.dispose();
    }
}
*/


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
/**
 *9201003.js - Mom and Dad
 *@author Jvlaple
 */
var numberOfLoves = 0;
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
            if ( cm.getLevel() > 10 && cm.getPlayer().isMarried() == 0){
            if (status == 0) {
                if (cm.getPlayer().getGender() == 0) {
		    cm.sendYesNo("Olá meu filho. Você tem certeza de que quer se casar com essa garota? Eu acredito no amor à primeira vista, mas isso é bastante súbito ... Eu não acho que estamos prontos para isso. Vamos pensar sobre isso. Você realmente ama essa garota?");
                } else {
		cm.sendYesNo("Olá minha filha. Você tem certeza de que quer se casar com essa garota? Eu acredito no amor à primeira vista, mas isso é bastante súbito ... Eu não acho que estamos prontos para isso. Vamos pensar sobre isso. Você realmente ama esse rapaz?");
                }
            } else if (status == 1) {
                numberOfLoves += cm.getPlayer().countItem(4031367);
                numberOfLoves += cm.getPlayer().countItem(4031368);
                numberOfLoves += cm.getPlayer().countItem(4031369);
                numberOfLoves += cm.getPlayer().countItem(4031370);
                numberOfLoves += cm.getPlayer().countItem(4031371);
                numberOfLoves += cm.getPlayer().countItem(4031372);
                if (numberOfLoves >= 2) {
                
	               
                    
                cm.removeAll(4031367);
                cm.removeAll(4031368);
                cm.removeAll(4031369);
                cm.removeAll(4031370);
                cm.removeAll(4031371);
                cm.removeAll(4031372);
                cm.gainItem(4031373, 1);
                cm.dispose();
                    
                }
               else { cm.sendNext("Está bem então. Volte para a cidade e colete mais duas #bProvas de amor#k para provar isso.");
                cm.dispose();
            }
                
               
                
                
            }
        } else {
            cm.sendOk("Olá nós somos a mãe e o pai...");
            cm.dispose();
        }
    }
}