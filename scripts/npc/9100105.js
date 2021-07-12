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
1082179,
2049100,
1082149,
2043105,
2043104,
2043205,
2043204,
2043018,
2043005,
2043004,
2043007,
2043006,
2044105,
2044104,
2044205,
2044204,
2044005,
2044004,
2040605,
2040604,
2040611,
2040610,
2040609,
2040608,
2040607,
2040606,
2044505,
2044504,
2041039,
2041038,
2041031,
2041030,
2041037,
2041036,
2041041,
2041040,
2041033,
 

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



cm.getItemName(1082179)+"\r\n"+"#i1082179#\r\n " +
cm.getItemName(2049100)+"\r\n"+"#i2049100#\r\n " +
cm.getItemName(1082149)+"\r\n"+"#i1082149#\r\n " +
cm.getItemName(2043105)+"\r\n"+"#i2043105#\r\n " +
cm.getItemName(2043104)+"\r\n"+"#i2043104#\r\n " +
cm.getItemName(2043205)+"\r\n"+"#i2043205#\r\n " +
cm.getItemName(2043204)+"\r\n"+"#i2043204#\r\n " +
cm.getItemName(2043018)+"\r\n"+"#i2043018#\r\n " +
cm.getItemName(2043005)+"\r\n"+"#i2043005#\r\n " +
cm.getItemName(2043004)+"\r\n"+"#i2043004#\r\n " +
cm.getItemName(2043007)+"\r\n"+"#i2043007#\r\n " +
cm.getItemName(2043006)+"\r\n"+"#i2043006#\r\n " +
cm.getItemName(2044105)+"\r\n"+"#i2044105#\r\n " +
cm.getItemName(2044104)+"\r\n"+"#i2044104#\r\n " +
cm.getItemName(2044205)+"\r\n"+"#i2044205#\r\n " +
cm.getItemName(2044204)+"\r\n"+"#i2044204#\r\n " +
cm.getItemName(2044005)+"\r\n"+"#i2044005#\r\n " +
cm.getItemName(2044004)+"\r\n"+"#i2044004#\r\n " +
cm.getItemName(2040605)+"\r\n"+"#i2040605#\r\n " +
cm.getItemName(2040604)+"\r\n"+"#i2040604#\r\n " +
cm.getItemName(2040611)+"\r\n"+"#i2040611#\r\n " +
cm.getItemName(2040610)+"\r\n"+"#i2040610#\r\n " +
cm.getItemName(2040609)+"\r\n"+"#i2040609#\r\n " +
cm.getItemName(2040608)+"\r\n"+"#i2040608#\r\n " +
cm.getItemName(2040607)+"\r\n"+"#i2040607#\r\n " +
cm.getItemName(2040606)+"\r\n"+"#i2040606#\r\n " +
cm.getItemName(2044505)+"\r\n"+"#i2044505#\r\n " +
cm.getItemName(2044504)+"\r\n"+"#i2044504#\r\n " +
cm.getItemName(2041039)+"\r\n"+"#i2041039#\r\n " +
cm.getItemName(2041038)+"\r\n"+"#i2041038#\r\n " +
cm.getItemName(2041031)+"\r\n"+"#i2041031#\r\n " +
cm.getItemName(2041030)+"\r\n"+"#i2041030#\r\n " +
cm.getItemName(2041037)+"\r\n"+"#i2041037#\r\n " +
cm.getItemName(2041036)+"\r\n"+"#i2041036#\r\n " +
cm.getItemName(2041041)+"\r\n"+"#i2041041#\r\n " +
cm.getItemName(2041040)+"\r\n"+"#i2041040#\r\n " +
cm.getItemName(2041033)+"\r\n"+"#i2041033#\r\n " +







                                        








                                          
                                          


                      "");

                      

        
                    
                      }
                      
            
            }
        }
    }
