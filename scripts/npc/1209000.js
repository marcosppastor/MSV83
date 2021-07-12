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
var status = 0;

function start() { 
    cm.sendNext("Aran, você acordou, como vai?");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 1) {
	cm.sendNext("Nós estamos prontos para partir,você não tem nada a temer. Nós vamos para Ilha victoria assim que terminarmos os prepativos,shinzo vai os guiar.");
	} else if (status == 2) {
	cm.sendNext("Os outros heróis? Eles deixaram a batalha contra o Black Mage. O que? você quer lutar? NÃO! você não pode! Você esta ferido. Você deve vir conosco!");
	} else if (status == 3) {
	cm.updateQuest(21002, "1");
	cm.showIntro("Effect/Direction1.img/aranTutorial/Trio");
	cm.dispose();
	}
	}
} 