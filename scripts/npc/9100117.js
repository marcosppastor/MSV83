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
2000004,
2020012,
2000005,
2030007,
2022027,
2040001,
2041002,
2040805,
2040702,
2043802,
2040402,
2043702,
1302022,
1322021,
1322026,
1302026,
1442017,
1082147,
1102043,
1442016,
1402012,
1302027,
1322027,
1322025,
1312012,
1062000,
1332020,
1302028,
1372002,
1002033,
1092022,
1302021,
1102042,
1322024,
1002012,
1322012,
1322022,
1002020,
1302013,
1082146,
1442014,
1002096,
1302017,
1442012,
1322010,
1442011,
1442018,
1092011,
1092014,
1302003,
1432001,
1312011,
1002088,
1041020,
1322015,
1442004,
1422008,
1302056,
1432000,
1382001,
1041053,
1060014,
1050053,
1051032,
1050073,
1061036,
2290122,
2290116,
2290107,
2290103,
2290118

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



cm.getItemName(2000004)+"\r\n"+"#i2000004#\r\n " +
cm.getItemName(2020012)+"\r\n"+"#i2020012#\r\n " +
cm.getItemName(2000005)+"\r\n"+"#i2000005#\r\n " +
cm.getItemName(2030007)+"\r\n"+"#i2030007#\r\n " +
cm.getItemName(2022027)+"\r\n"+"#i2022027#\r\n " +
cm.getItemName(2040001)+"\r\n"+"#i2040001#\r\n " +
cm.getItemName(2041002)+"\r\n"+"#i2041002#\r\n " +
cm.getItemName(2040805)+"\r\n"+"#i2040805#\r\n " +
cm.getItemName(2040702)+"\r\n"+"#i2040702#\r\n " +
cm.getItemName(2043802)+"\r\n"+"#i2043802#\r\n " +
cm.getItemName(2040402)+"\r\n"+"#i2040402#\r\n " +
cm.getItemName(2043702)+"\r\n"+"#i2043702#\r\n " +
cm.getItemName(1302022)+"\r\n"+"#i1302022#\r\n " +
cm.getItemName(1322021)+"\r\n"+"#i1322021#\r\n " +
cm.getItemName(1322026)+"\r\n"+"#i1322026#\r\n " +
cm.getItemName(1302026)+"\r\n"+"#i1302026#\r\n " +
cm.getItemName(1442017)+"\r\n"+"#i1442017#\r\n " +
cm.getItemName(1082147)+"\r\n"+"#i1082147#\r\n " +
cm.getItemName(1102043)+"\r\n"+"#i1102043#\r\n " +
cm.getItemName(1442016)+"\r\n"+"#i1442016#\r\n " +
cm.getItemName(1402012)+"\r\n"+"#i1402012#\r\n " +
cm.getItemName(1302027)+"\r\n"+"#i1302027#\r\n " +
cm.getItemName(1322027)+"\r\n"+"#i1322027#\r\n " +
cm.getItemName(1322025)+"\r\n"+"#i1322025#\r\n " +
cm.getItemName(1312012)+"\r\n"+"#i1312012#\r\n " +
cm.getItemName(1062000)+"\r\n"+"#i1062000#\r\n " +
cm.getItemName(1332020)+"\r\n"+"#i1332020#\r\n " +
cm.getItemName(1302028)+"\r\n"+"#i1302028#\r\n " +
cm.getItemName(1372002)+"\r\n"+"#i1372002#\r\n " +
cm.getItemName(1002033)+"\r\n"+"#i1002033#\r\n " +
cm.getItemName(1092022)+"\r\n"+"#i1092022#\r\n " +
cm.getItemName(1302021)+"\r\n"+"#i1302021#\r\n " +
cm.getItemName(1102042)+"\r\n"+"#i1102042#\r\n " +
cm.getItemName(1322024)+"\r\n"+"#i1322024#\r\n " +
cm.getItemName(1002012)+"\r\n"+"#i1002012#\r\n " +
cm.getItemName(1322012)+"\r\n"+"#i1322012#\r\n " +
cm.getItemName(1322022)+"\r\n"+"#i1322022#\r\n " +
cm.getItemName(1002020)+"\r\n"+"#i1002020#\r\n " +
cm.getItemName(1302013)+"\r\n"+"#i1302013#\r\n " +
cm.getItemName(1082146)+"\r\n"+"#i1082146#\r\n " +
cm.getItemName(1442014)+"\r\n"+"#i1442014#\r\n " +
cm.getItemName(1002096)+"\r\n"+"#i1002096#\r\n " +
cm.getItemName(1302017)+"\r\n"+"#i1302017#\r\n " +
cm.getItemName(1442012)+"\r\n"+"#i1442012#\r\n " +
cm.getItemName(1322010)+"\r\n"+"#i1322010#\r\n " +
cm.getItemName(1442011)+"\r\n"+"#i1442011#\r\n " +
cm.getItemName(1442018)+"\r\n"+"#i1442018#\r\n " +
cm.getItemName(1092011)+"\r\n"+"#i1092011#\r\n " +
cm.getItemName(1092014)+"\r\n"+"#i1092014#\r\n " +
cm.getItemName(1302003)+"\r\n"+"#i1302003#\r\n " +
cm.getItemName(1432001)+"\r\n"+"#i1432001#\r\n " +
cm.getItemName(1312011)+"\r\n"+"#i1312011#\r\n " +
cm.getItemName(1002088)+"\r\n"+"#i1002088#\r\n " +
cm.getItemName(1041020)+"\r\n"+"#i1041020#\r\n " +
cm.getItemName(1322015)+"\r\n"+"#i1322015#\r\n " +
cm.getItemName(1442004)+"\r\n"+"#i1442004#\r\n " +
cm.getItemName(1422008)+"\r\n"+"#i1422008#\r\n " +
cm.getItemName(1302056)+"\r\n"+"#i1302056#\r\n " +
cm.getItemName(1432000)+"\r\n"+"#i1432000#\r\n " +
cm.getItemName(1382001)+"\r\n"+"#i1382001#\r\n " +
cm.getItemName(1041053)+"\r\n"+"#i1041053#\r\n " +
cm.getItemName(1060014)+"\r\n"+"#i1060014#\r\n " +
cm.getItemName(1050053)+"\r\n"+"#i1050053#\r\n " +
cm.getItemName(1051032)+"\r\n"+"#i1051032#\r\n " +
cm.getItemName(1050073)+"\r\n"+"#i1050073#\r\n " +
cm.getItemName(1061036)+"\r\n"+"#i1061036#\r\n " +
cm.getItemName(2290122 )+"\r\n"+"#i2290122#\r\n " +
cm.getItemName(2290116  )+"\r\n"+"#i2290116#\r\n " +
cm.getItemName(2290107 )+"\r\n"+"#i2290107 #\r\n " +
cm.getItemName(2290103  )+"\r\n"+"#i2290103#\r\n " +
cm.getItemName(2290118   )+"\r\n"+"#i2290118 #\r\n " +



 










                                        








                                          
                                          


                      "");

                      

        
                    
                      }
                      
            
            }
        }
    }
