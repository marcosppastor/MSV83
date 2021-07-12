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
 * Gachapon Script 
*/

var ids = [1382001,1002064,1050049,1302027,1051023,1332013,1312001,1040080,1061087,1050054,1051047, 1312030,1050008,1051027,1051055,1372003,1061083,1050055,1442017,1442009,1372010,2022113, 1302019,1051017,1002245,1002084,1050056,1422005,2000005,1002028,2002018,1050003,1002143, 1322010];
var status = 0;

function start() {
    if (cm.haveItem(5451000)) {
        cm.gainItem(5451000, -1);
        cm.processGachapon(ids, true);
        cm.dispose();
    } else if (cm.haveItem(5220000))
        cm.sendYesNo("Ola #h #! Vejo que voce tem um Gachapon.\r\nGostaria de usa-lo?");
    else {
        cm.sendSimple("Bem vindo ao Gachapon de " + cm.getPlayer().getMap().getMapName() + ". Como eu poderia lhe ajudar?\r\n\r\n#L0#O que e Gachapon?#l\r\n#L1#Como comprar #bCupons Gachapon#k?#l");
    }
}

function action(mode, type, selection){
    if (mode == 1 && cm.haveItem(5220000)) {
        cm.processGachapon(ids, false);
        cm.dispose();
    } else {
        if (mode > 0) {
            status++;
            if (selection == 0) {
                cm.sendNext("Use o Gachapon para obter scrolls, equipamentos, cadeiras, livros de masteria e diversos outros items!\r\nVoce podera obter aleatoriamente diversos items por meio de apenas #b01 Cupom Gachapon#k");
            } else if (selection == 1) {
                cm.sendNext("Os Cupons Gachapon sao vendidos na #rLoja de Cash#k por um preco razoavel!\r\nVoce podera encontra-lo para compra no canto superior direito, na primeira tela da Loja de Cash!");
                cm.dispose();
            } else if (status == 2) {
                cm.sendNext("Voce pode obter uma variedade de items do Gachapon de " + cm.getPlayer().getMap().getMapName() + ".\r\nHa uma variedade imensa de items em cada cidade, portanto, pense bem em qual utilizara!");
                cm.dispose();
            }
        }
    }
}