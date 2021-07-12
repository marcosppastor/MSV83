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
New gachapon format by dillusion @ SgPalMs
Perion Gachapon
 */


var ids = [
2030007,
2044700,
2044701,
2044702,
2043300,
2043301,
2043302,
2040515,
2040516,
2040517,
2040005,
2040008,
2040009,
2040318,
2040011,
2040014,
2040015,
2041021,
2041022,
2041023,
2040016,
2040017,
2040301,
1002110,
1002185,
1002248,
1002330,
1060033,
1060044,
1060072,
1060095,
1040044,
1040094,
1040100,
1040107,
1092020,
1102012,
1102002,
2290095,
2290093,
1102023,
1002270,
1102024,
1082053,
1082064,
1002086,
1002628,
1002619,
1072054,
1472030,
1472019,
1332015,
1032012,
1332055,
1012111,
1102054,
1332020,
1332018,
2040300,
2040406,
2040407,
2040410,
2040411,
2290085,
2290089,
2044404,
2044405,
2040302,
1002550,
1060104,
1040110,
1041107,
1102082,
1072238

]


    
var status = 0;

function start() {
    if (cm.haveItem(5451000)) {
        cm.gainItem(5451000, -1);
        cm.processGachapon(ids, true);
        cm.dispose();
    } else if (cm.haveItem(5220000))
        cm.sendYesNo("Você pode usar o Gachapon. Gostaria de usar o seu bilhete Gachapon?");
    else {
        cm.sendSimple("Bem vindo ao " + cm.getPlayer().getMap().getMapName() + " Gachapon. Como eu posso ajudar?\r\n\r\n#L0#Oque é Gachapon?#l\r\n#L1#Onde eu posso comprar bilhetes?#l \r\n#L2#Quais itens podem ser sorteados nesse gachapon?#l");
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
                cm.sendNext("Jogue Gachapon para ganhar pergaminhos raros, equipamentos, cadeiras, livros de maestria e outros itens legais! Tudo o que você precisa é um #bBilhete de Gachapon #k para ser o ganhador de uma mistura aleatória de itens.");
            } else if (selection == 1) {
                cm.sendNext("Os Bilhetes da Gachapon estão disponíveis na #r LOJA #k e podem ser comprados usando NX ou Maple Points. Clique no icone Loja no canto inferior direito da tela para onde você pode comprar os Bilhetes..");
                cm.dispose();
            } else if (status == 2) {
                cm.sendNext("Você vai encontrar uma variedade enorme de itens no  " + cm.getPlayer().getMap().getMapName() + " Gachapon, no entanto você pode ter uma chance maior de encontrar o item que deseja usando gachapons de outras cidades!!");
                cm.dispose();
            }
            
            else if ( selection ==2){
                cm.sendNext("No gachapon de "+ cm.getPlayer().getMap().getMapName() +  "você poderá retirar um dos itens abaixo: \r\n \r\n" +

cm.getItemName(2030007) +"\r\n"+"#i2030007#\r\n " +
cm.getItemName(2044700) +"\r\n"+"#i2044700#\r\n " +
cm.getItemName(2044701) +"\r\n"+"#i2044701#\r\n " +
cm.getItemName(2044702) +"\r\n"+"#i2044702#\r\n " +
cm.getItemName(2043300) +"\r\n"+"#i2043300#\r\n " +
cm.getItemName(2043301) +"\r\n"+"#i2043301#\r\n " +
cm.getItemName(2043302) +"\r\n"+"#i2043302#\r\n " + 
cm.getItemName(2040515) +"\r\n"+"#i2040515#\r\n " +
cm.getItemName(2040516) +"\r\n"+"#i2040516#\r\n " +
cm.getItemName(2040517) +"\r\n"+"#i2040517#\r\n " +
cm.getItemName(2040005) +"\r\n"+"#i2040005#\r\n " +
cm.getItemName(2040008) +"\r\n"+"#i2040008#\r\n " +
cm.getItemName(2040009) +"\r\n"+"#i2040009#\r\n " +
cm.getItemName(2040318) +"\r\n"+"#i2040318#\r\n " +
cm.getItemName(2040011) +"\r\n"+"#i2040011#\r\n " + 
cm.getItemName(2040014) +"\r\n"+"#i2040014#\r\n " +
cm.getItemName(2040015) +"\r\n"+"#i2040015#\r\n " +
cm.getItemName(2041021) +"\r\n"+"#i2041021#\r\n " +
cm.getItemName(2041022) +"\r\n"+"#i2041022#\r\n " +
cm.getItemName(2041023) +"\r\n"+"#i2041023#\r\n " +
cm.getItemName(2040016) +"\r\n"+"#i2040016#\r\n " +
cm.getItemName(2040017) +"\r\n"+"#i2040017#\r\n " +
cm.getItemName(2040301) +"\r\n"+"#i2040301#\r\n " + 
cm.getItemName(1002110) +"\r\n"+"#i1002110#\r\n " +
cm.getItemName(1002185) +"\r\n"+"#i1002185#\r\n " +
cm.getItemName(1002248) +"\r\n"+"#i1002248#\r\n " +
cm.getItemName(1002330) +"\r\n"+"#i1002330#\r\n " +
cm.getItemName(1060033) +"\r\n"+"#i1060033#\r\n " +
cm.getItemName(1060044) +"\r\n"+"#i1060044#\r\n " +
cm.getItemName(1060072) +"\r\n"+"#i1060072#\r\n " +
cm.getItemName(1060095) +"\r\n"+"#i1060095#\r\n " +
cm.getItemName(1040044) +"\r\n"+"#i1040044#\r\n " +
cm.getItemName(1040094) +"\r\n"+"#i1040094#\r\n " + 
cm.getItemName(1040100) +"\r\n"+"#i1040100#\r\n " +
cm.getItemName(1040107) +"\r\n"+"#i1040107#\r\n " + 
cm.getItemName(1092020) +"\r\n"+"#i1092020#\r\n " + 
cm.getItemName(1102012) +"\r\n"+"#i1102012#\r\n " + 
cm.getItemName(1102002) +"\r\n"+"#i1102002#\r\n " +
cm.getItemName(2290095) +"\r\n"+"#i2290095#\r\n " + 
cm.getItemName(2290093 ) +"\r\n"+"#i2290093 #\r\n " +
cm.getItemName(1102023) +"\r\n"+"#i1102023#\r\n " +
cm.getItemName(1002270) +"\r\n"+"#i1002270#\r\n " +
cm.getItemName(1102024) +"\r\n"+"#i1102024#\r\n " +
cm.getItemName(1082053) +"\r\n"+"#i1082053#\r\n " +
cm.getItemName(1082064) +"\r\n"+"#i1082064#\r\n " +
cm.getItemName(1002086) +"\r\n"+"#i1002086#\r\n " +
cm.getItemName(1002628) +"\r\n"+"#i1002628#\r\n " +
cm.getItemName(1002619) +"\r\n"+"#i1002619#\r\n " +
cm.getItemName(1072054) +"\r\n"+"#i1072054#\r\n " +
cm.getItemName(1472030) +"\r\n"+"#i1472030#\r\n " +
cm.getItemName(1472019) +"\r\n"+"#i1472019#\r\n " +
cm.getItemName(1332015) +"\r\n"+"#i1332015#\r\n " +
cm.getItemName(1032012) +"\r\n"+"#i1032012#\r\n " +
cm.getItemName(1332055) +"\r\n"+"#i1332055#\r\n " +
cm.getItemName(1012111) +"\r\n"+"#i1012111#\r\n " +
cm.getItemName(1102054) +"\r\n"+"#i1102054#\r\n " +
cm.getItemName(1332020) +"\r\n"+"#i1332020#\r\n " +
cm.getItemName(1332018) +"\r\n"+"#i1332018#\r\n " +
cm.getItemName(2040300) +"\r\n"+"#i2040300#\r\n " +
cm.getItemName(2040406) +"\r\n"+"#i2040406#\r\n " +
cm.getItemName(2040407) +"\r\n"+"#i2040407#\r\n " +
cm.getItemName(2040410) +"\r\n"+"#i2040410#\r\n " +
cm.getItemName(2040411) +"\r\n"+"#i2040411#\r\n " +
cm.getItemName(2290085 ) +"\r\n"+"#i2290085#\r\n " +
cm.getItemName(2290089  ) +"\r\n"+"#i2290089#\r\n " +



cm.getItemName(2044404) +"\r\n"+"#i2044404#\r\n " +
cm.getItemName(2044405) +"\r\n"+"#i2044405#\r\n " + 
cm.getItemName(2040302) +"\r\n"+"#i2040302#\r\n " + 
cm.getItemName(1002550) +"\r\n"+"#i1002550#\r\n " +
cm.getItemName(1060104) +"\r\n"+"#i1060104#\r\n " + 
cm.getItemName(1040110) +"\r\n"+"#i1040110#\r\n " + 
cm.getItemName(1041107) +"\r\n"+"#i1041107#\r\n " +
cm.getItemName(1102082) +"\r\n"+"#i1102082#\r\n " +
cm.getItemName(1072238) +"\r\n"+"#i1072238#\r\n " +


                      "");

                      

        
                    
                      }
                      
            
            }
        }
    }
