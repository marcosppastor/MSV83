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
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Lira
 * 
 * Adobis's Mission I : Breath of Lava <Level 2> (280020001)
 * Zakum Quest NPC 
 * Custom Quest 100202 -> Done this stage once
x
 
var status;
 
function start() {
    cm.sendNext("Congratulations on getting this far!  Well, I suppose I'd better give you your #bBreath of Fire#k.  You've certainly earned it!");
}
 
function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1)
            cm.sendNextPrev("Well, time for you to head off.");
        else if (status == 2) {
            cm.gainItem(4031062,1);
            cm.warp(211042300);
            if (cm.isQuestCompleted(100202)) {
                cm.startQuest(100202);
                cm.completeQuest(100202);
                cm.gainExp(10000);
            }
            cm.dispose();
        }
    }
}
*/
importPackage(Packages.tools);

var rand = Math.floor(Math.random()*100);
function start() {
    status = -1;
    action(1, 0, 0);
}


              
              function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("Então,adeus...");
        cm.dispose();
        return;
    }
    
    //if (cm.getMapId()===105040300 && cm.getLevel() <=34) {
    if (status == 0 ) {
    cm.sendSimple("Olá,oque gostaria de fazer?\r\n#L0#Área de caça dos corações indomavéis #l\r\n#L1#Eu tenho 7 chaves.Me leve para quebrar caixas#l\r\n#L2#Por favor me  tire daqui.#l");
      
          
    
    } else if (selection == 0) {
            cm.warp(680000400);
                  cm.dispose();
        
		           
            
          
        
        
} else if (selection == 1) {
            var player=cm.getPlayer();
                          
          if (cm.haveItem(4031217,7)) {
                cm.gainItem(4031217, -7);
               cm.warp(680000401,0);

               
                      }
            else {
                cm.sendOk("Parece que você não possui ainda as 7 chaves.Mate os bolos e candelabros na área de caça dos corações indomáveis e obtenha as chaves.");
                  }
              
              
              
              } else if (selection == 2) {
            cm.warp(680000500);
            cm.sendOk("Adeus,eu espero que tenha gostado do casamento!");
            cm.removeAll(4031374);
             cm.dispose();
              }

}
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

var status = 0;  

function start() {  
    cm.sendSimple("Olá,oque gostaria de fazer?\r\n#L0#Área de caça dos corações indomavéis #l\r\n#L1#Eu tenho 7 chaves.Me leve para quebrar caixas#l\r\n#L2#Por favor me  tire daqui.#l");
}  

function action(mode, type, selection) {  
    if (mode < 1) {
        cm.sendOk("Então,adeus...");
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 1) {
       else if (selection === 1) {
            cm.warp(680000400);
        }
        else if (selection === 2) {
            if (cm.haveItem(4031217,7)) {
                cm.gainItem(4031217, -7);
            }   cm.warp(680000401,0);
            else {
                cm.sendOk("Parece que você não possui ainda as 7 chaves.Mate os bolos e candelabros na área de caça dos corações indomáveis e obtenha as chaves.");
        } else if (selection === 1) {
            cm.warp(680000500);
            cm.sendOk("Adeus,eu espero que tenha gostado do casamento!");
             cm.dispose();
        }
    
    
*/