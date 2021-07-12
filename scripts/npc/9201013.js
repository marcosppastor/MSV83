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
/* victora
by Angel (get31720 ragezone)
 */
/*
var wui = 0;

function start() {
    cm.sendSimple ("Bem vindo a Catedral. O que você gostaria de fazer? \r\n#L0##bEu preciso de convites para os convidados#k #l\r\n#L1##bEu gostaria de preparar meu casamento#k #l\r\n#L2##bVocê pode me explicar como organizar um casamento?#k #l\r\n#L3##bEu sou o noivo ou a noiva e eu gostaria de entrar#k #l\r\n#L4##bEu sou um convidado e eu gostaria de entrar#k #l");
}

function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) {
        if (cm.haveItem(4214002)) { 
            cm.sendNext("Tudo bem, você está com seus convites, certifique-se de que seus convidados os tenham ou não poderão entrar!"); 
            cm.gainItem(4031395,10); 
     
        } else { 
            cm.sendOk("Desculpe, mas certifique-se de ter seu recibo de casamento premium ou você não poderá ter seu casamento!"); 
            status = 9; 
        } 
    } else if (selection == 1) {
        if (cm.haveItem(5251003)) { 
            cm.sendNext("Tudo bem, vou dar-lhe o seu recibo de casamento premium e certifique-se de não o perder! Se você perder o seu recibo, não poderá receber convites ou entrar na catedral!"); 
            cm.gainItem(4214002,1);
        } else if (selection == 2) {
            cm.sendNext("Tenha tanto o noivo quanto a noiva para comprar um bilhete de casamento da catedral premium da loja . Então me peça para preparar o seu casamento e eu lhe darei um recibo de casamento. Fale comigo se quiser convites para que outros convidados possam participar. Quando você estiver pronto, apenas todos venha até mim e eu vou deixar você ou os convidados. Dentro do ambiente minha irmã Debbie vai te trazer para Amoria se você escolher sair. Nicole vai te levar para o próximo mapa..");
        } else if (selection == 3) {
            if (cm.haveItem(4214002)) { 
                cm.sendNext("Certifique-se de entrar. Uma vez que esteja pronto, clique no Bispo e ele irá casar vocês."); 
                cm.warp(680000210, 2); 
            } else { 
                cm.sendOk("Desculpe, mas você não tem um recibo de casamento."); 
                status = 9; 
            } 
        } else if (selection == 4) {
            if (cm.haveItem(4031395)) { 
                cm.sendNext("Certifique-se de entrar. Uma vez que a noiva e o noivo estejam prontos, clique na Nicole na parte inferior para se teleportar para o próximo mapa. Ou use a Debbie para sair para Amoria."); 
                cm.warp(680000210,0); 
     
            } else { 
                cm.sendOk("Desculpe, mas você não tem um convite de casamento premium."); 
                status = 9; 
            } 
            cm.dispose();
        }
    }
}
*/

function start() {
//cm.gainItem()
cm.sendOk("Não vejo a hora dos casamentos começarem!");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}