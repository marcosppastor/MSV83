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


function act() {
	if (rm.getPlayer().getMapId() === 109010100) {
 var rand = Math.floor(Math.random() * 9);
                if (rand == 0) {
                rm.playerMessage("Uma força desconhecida o levou para outro lugar.");
                rm.dropItems();
                }
                else if (rand == 1){
                rm.warp(109010101);
            }
                else if (rand == 2){
                rm.playerMessage("Uma força desconhecida o levou para outro lugar.");
                rm.warp(109010102);
            }
                 else if (rand == 3){
                rm.dropItems();
             }
                else if (rand == 4){
               rm.playerMessage("Uma força desconhecida o levou para outro lugar.");
                rm.warp(109010103);
               }
               
               else if (rand == 5){
               rm.dropItems();

               }
               
                else if (rand == 6){
                 rm.playerMessage("Uma força desconhecida o levou para outro lugar.");
                rm.warp(109010104);
               }
               
               else if (rand == 7){
                 rm.playerMessage("Um monstro apareceu!.");
                rm.spawnMonster(9400606, 1);

               }
               
               else if (rand == 8){
               rm.dropItems();


               }
            
        } else {
            rm.dropItems();
        }
   

    
}