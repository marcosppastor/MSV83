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
/*9201091 - Ames
 *@author Moogra
*/

/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
//cm.gainItem()
cm.sendOk("Desejando se casar ? \r\n \r\n #r Leia com atenção todos os passos #k \r\n\r\n 1° Você vai precisar fazer um anel com o NPC #rmoony#k, e entrega-lo para sua parceira\r\n\r\n 2°Após ambos estarem com o anel, o noivo deverá ir para a area de caça de henesys 3 e falar com os Pais,completar a pequena missão da prova de amor e coletar a benção dos pais.\r\n\r\n 3° Troque a benção dos pais com o NPC #rBispo john#k pela permissão do oficial, ela é a autorização para você se casar.\r\n\r\n 4° Compre o cupom de casamento capela ou catedral chique na #rLOJA#k (depende do gosto),estando em grupo com a parceira o noivo como lider clique nao npc #rBispo John #k e comece o casamento.\r\n\r\n #bDentro do casamento #k \r\n\r\n1° No primeiro mapa vocês devem apenas esperar zerar o relógio, é o mapa de entrada. \r\n\r\n2° No segundo mapa vocês devem ambos clicar no #rBispo John #k e aceitar os termos de casamento clicando em sim, após ambos aceitarem, aparecerá a mensagem de que vocês foram casados, espere o tempo terminar.\r\n\r\n3° Neste mapa você estará no mapa das fotos, onde há um enorme bolo, tire fotos, guarde lambranças,aguarde o tempo passar.\r\n\r\n4° Neste mapa clique na npc e colete os drops dos mobs para prosseguir para o bônus, quanto mais rápido for,mais tempo ficará no bônus.\r\n\r\n\r\n\r\n Bom casamento!");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}