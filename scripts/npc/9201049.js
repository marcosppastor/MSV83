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
	Ames the Wise
-- By ---------------------------------------------------------------------------------------------
	Xelkin
-- Edited by --------------------------------------------------------------------------------------
	Angel (get31720 ragezone
-- Extra Info -------------------------------------------------------------------------------------
	Fixed by  [happydud3 (BENG)] & [XotiCraze]
-- Fixed Dispose ----------------------------------------------------------------------------------
        Fixed by Moogra
---------------------------------------------------------------------------------------------------
**/
var status = -1;

function start() {
    var rings = new Array(4031362, 4031364, 4031360, 4031358);
    var hasRing = false;
    for (var x = 0; x < rings.length && !hasRing; x++)
        if (cm.haveItem(rings[x])) {
            hasRing = true;
            break;
        }
    if ( cm.getPlayer().isMarried > 0 || cm.haveItem(5251002) || cm.haveItem(5251003) ||  cm.haveItem(4031358) || cm.haveItem(4031360) ||  cm.haveItem(4031362) || cm.haveItem(4031364)) {
        cm.sendNext("Você chegou ao fim do casamento. Você receberá uma arca onix para Noiva e noivo e uma arca Onyx. Troque-as em Pila, ela está no topo de Amoria.");
        cm.gainItem(4031424,1);
        cm.removeAll(5251002);
        cm.removeAll(5251003);
        cm.removeAll(4031374);
        cm.warp(680000000);



        
        status = 1;
        
        }
    else if (cm.haveItem(4000313)) {
        cm.sendNext("Wow...o final do casamento já? Adeus então.!");
        status = 20;
    } else {
        cm.sendNext("Você não tem a Folha de Maple de Ouro e você não tem um anel de casamento, então eu vou levá-lo para Amoria.");
        status = 21;
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.sendOk("Adeus..");
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            //cm.gainItem(4031424,1);
            //cm.gainItem(4031423,1);
            cm.dispose();
        } else if (status == 21) {
            cm.gainItem(4000313,-1);
            cm.gainItem(4031423,1);
            cm.warp(680000000);

        }
        cm.warp(680000000);
        cm.dispose();
    }
}
