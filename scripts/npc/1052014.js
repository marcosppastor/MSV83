/* 
 * Scripted by Daghlawi
 


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("Retorne caso mude de ideia, ficarei aqui por 7 dias!");
        cm.dispose();
        return;
    }
    
if (status == 0) {
            cm.sendSimple("Após a reorganização do nosso servidor,resolvemos começar do zero,para correção de diversos bugs,e inclusão de todos os jogadores em uma categoria semelhante,incentivando assim a disputa,visto que no estado anterior havia uma tamanha desvantagem entre todos por itens adquiridos de forma ilegal,esperamos a compreensão de todos. \r\n Para ajuda-los neste novo recomeço oferecemos a vocês 7 dias de #r Double EXP #k  e também #r Double DROP #k de forma gratuita,caso queira participar, confirme a retirada de seu cartão logo abaixo:\n\
:\r\n #L1##i5211000# Cartão de Double EXP gratuito \r\n #L2##i5360000# Cartão de Double DROP grauito \r\n\r\n #L3# Não desejo partcipar ");
      
      
    } else if (selection == 1 ) {
                          
            
            cm.gainItem (5211000,1,false,false,604800000);
             cm.sendOk("Você recebeu o cartão de Double EXP com duração de 7 dias,não perca tempo,aproveite,esta promoção terá duração de sete dias, então,o cartão expirará do seu inventário,bom jogo !");
            cm.dispose();
            
        
        
        
        } else if (selection == 2 ) {
                          
            cm.gainItem (5360000,1,false,false,604800000);
             cm.sendOk("Você recebeu o cartão de Double DROP com duração de 7 dias,não perca tempo,aproveite,esta promoção terá duração de sete dias, então,o cartão expirará do seu inventário,bom jogo !");
            cm.dispose();
            
        

}else if (selection == 3 ) {
                          
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
/* Changes the players name.
	Can only be accessed with the item 2430026.
 */

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
                    if (cm.getPlayer().getCashShop().getCash(1) >= 30000) {
				cm.sendYesNo("#d#h ##k...nome estranho.. bem no entanto caso queira mudar seu nome eu posso faze-lo,para isso basta me dar a quantia de #b30k de NX CASH.#kAntes de continuar leia abaixo as instruções:  \r\n Tenha a certeza de que quer fazer isso,uma vez tomada a decisão não poderá voltar #ratrás#k. \r\nCertifique-se de digitar o nome desejado corretamente , em hipótese alguma haverá ressarcimento do valor gasto!", 1);
			} else {
                             	cm.sendOk("Sou o responsável pela mudança de nome dos personagens de True MapleStory, para falar comigo possua pelo menos #r30k de NX Cash #k.");

				cm.dispose();
			}
		} else if(status == 1) {
			cm.sendGetText("Por favor,digite o nome desejado no local a seguir.");
		} else if(status == 2) {
			var text = cm.getText();
			var canCreate = Packages.client.MapleCharacter.canCreateChar(text);
			if(canCreate) {
				cm.getPlayer().changeName(text);
				cm.sendOk("O nome do seu personagem foi alterado para #b" + text + "#k. Você precisa relogar para a mudança surtir efeito!.", 1);
                                cm.getPlayer().getCashShop().gainCash(1, -30000);    
			} else {
				cm.sendNext("Me desculpe você não pode usar esse nome  #b" + text + "#k ele ja está em uso ou é um nome bloqueado.", 1);
			}
		} else if(status == 3) {
			cm.dispose();
			//cm.getClient().disconnect(false, false);
		}
    }
}