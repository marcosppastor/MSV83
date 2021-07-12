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
 *@Author RMZero213
 * Ludibrium Maze Party Quest
 * Do not release anywhere other than RaGEZONE. Give credit if used.
 * Modified by Daghlawi for TrueMapleStory 
 */
var comum = Array(2044401,2044402,2044403,2044314,2043702,2041001,2041002,2041003,2041004,2041015,2040708,2040707,2040709,2022251,2022154,2022094,2022073 );
var normal = Array(2040329,2040330,2040331,2044213,2044214,2043802,2041023,2041017,2040925,2040924,2040803,2040627 ,2040534,2040504,2040417,2040418,2040419,2040420,2040421,2040422          );
var raro = Array(3010015,2044312 ,2040805,2040804 ,2040515 ,2040517,1082145,1082147,1082148,1082146,1082150 );


function getRandom(min, max) {
	if (min > max) {
		return(-1);
	}

	if (min == max) {
		return(min);
	}

	return(min + parseInt(Math.random() * (max - min + 1)));
}

var icomum = comum[getRandom(0, comum.length - 1)];
var inormal = normal[getRandom(0, normal.length - 1)];
var iraro = raro[getRandom(0, raro.length - 1)];

var chance = getRandom(0, 5);
var status = 0;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection){
    if (mode == -1) {
        cm.dispose();
    }
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var eim = cm.getPlayer().getEventInstance();
            if (eim != null) {
                eim.unregisterPlayer(cm.getPlayer());
            }
            
            if (chance > 0 && chance <= 2) {
				cm.gainItem(icomum, 1);
                                cm.getPlayer().getCashShop().gainCash(2, 50);

    cm.playerMessage("Você ganhou 50 pontos Maple como bonificação!")
        
    
        
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormal, 1);
                                cm.getPlayer().getCashShop().gainCash(2, 50);

    cm.playerMessage("Você ganhou 50 pontos Maple como bonificação!")
        }
    
        
			 else {
                             cm.getPlayer().getCashShop().gainCash(2, 50);

    cm.playerMessage("Você ganhou 50 pontos Maple como bonificação!")
        
    
        
				cm.gainItem(iraro, 1);
			}
                        cm.warp(220000000, 0);
			cm.dispose();
            
        }
    }
}