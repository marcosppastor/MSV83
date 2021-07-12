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
	Nicole
-- By ---------------------------------------------------------------------------------------------
	Angel (get31720 ragezone)
-- Extra Info -------------------------------------------------------------------------------------
	Fixed by  [happydud3] & [XotiCraze]
---------------------------------------------------------------------------------------------------
**/

var status;
var x;
var hasEngageRing = false;

function start() {  
    status = -1;  
    action(1, 0, 0);  
}  

function action(mode, type, selection) {  
     if (mode == -1 || mode == 0) {
        cm.sendOk("Então adeus.."); 
            cm.dispose();
			return;
    } else if (mode == 1) {
            status++;
        } else {
            status--;
        }
		var item = new Array(4031360, 4031358, 4031362, 4031364);
		for (x = 0; x < item.length && !hasEngageRing; x++) {
			if (cm.haveItem(item[x], 1))
				hasEngageRing = true;
		}
    if (status == 0) {
		var text = "Estou aqui para ajudá-los em casamentos !";
		var choice = new Array("Como eu preparo meu casamento?", "Tenho uma autorização de convites de casamento e preciso de convites para os meus amigos", "Eu sou a noiva / noivo e gostaria de começar o casamento", "Eu sou o convidado e gostaria de entrar no casamento");
		for (x = 0; x < choice.length; x++) {
			text += "\r\n#L" + x + "##b" + choice[x] + "#l";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		switch(selection) {
			case 0:
                                    cm.sendOk ("Moony faz o anel de noivado. O anel de noivado é necessário durante todo o casamento,e posterior a ele para obter alguns previlegios, então nunca o perca. Para convidar seus amigos para o casamento, você precisa me mostrar a autorização para obter convites e depois lhe darei 15 Folhas de Maple de Ouro . Seus convidados precisam de uma folha de cada para entrar no casamento. Desfrute! ");				cm.dispose();
				break;
			case 1:
				if (cm.haveItem(4000313,15)) {
                    cm.sendOk ("Você já possui mais que 15 Folhas Maple de Ouro. Vá, entregue-a aos seus convidados antes de entrar no casamento.");					cm.dispose();
                } else if (cm.haveItem(5251100)) {
					cm.sendOk("Você recebeu 5 Folhas maple de Ouro.");
					cm.gainItem(4000313,5);
                                        cm.gainItem(5251100,-1)
					cm.dispose();
				} else {
					cm.sendOk("Você não tem uma autorização para convites de casamento.");
					cm.dispose();
				}
				break;
			case 2:
				if (hasEngageRing) {
					//cm.warp(680000210, 2);
					cm.sendOk("Fale com o Bispo John quando estiver pronto para se casar,lembre-se de ver todos os detalhes corretamente.");
					cm.dispose();
				} else {
					cm.sendOk("Você não tem um anel de noivado.");
					cm.dispose();
				}
				break;
			case 3:
				if (cm.haveItem(4000313)) {
					cm.warp(680000210);
					cm.sendOk("Aproveite o casamento. Não deixe cair sua Folha  Maple de Ouro ou você não poderá terminar o casamento inteiro.");
					cm.dispose();
				} else {
					cm.sendOk("Você não tem uma folha maple de Ouro");
					cm.dispose();
				}
				break;
		}
	}
}