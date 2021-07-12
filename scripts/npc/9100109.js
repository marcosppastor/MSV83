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
1472010,
1402010,
1382001,
1452000,
1302026,
1472023,
1472019,
1472022,
1102011,
1472033,
1402017,
1442009,
1472013,
1472021,
1472075,
2000004,
1382005,
1332030,
1432001,
2044901,
2044902,
1422025,
1442015,
1432017,
1442025,
1312004,
1322015,
1462005,
1312012,
1302003,
1442004,
1302028,
1402006,
1322000,
2022195,
1412001,
1372002,
1472009,
1422001,
1462000,
1412004,
1452008,
1432016,
1302021,
1442000,
2000005,
2022113,
1432013,
1322024,
1322012,
1302012,
2049000,
2049100,
1102041,
1102042,
1102043,
1402001,
1372005,
1442021,
2040915,
2040920,
2041301,
2041304,
2041307,
2041310,
2044803,
2044804

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



cm.getItemName(1472010)+"\r\n"+"#i1472010#\r\n " +
cm.getItemName(1402010)+"\r\n"+"#i1402010#\r\n " +
cm.getItemName(1382001)+"\r\n"+"#i1382001#\r\n " +
cm.getItemName(1452000)+"\r\n"+"#i1452000#\r\n " +
cm.getItemName(1302026)+"\r\n"+"#i1302026#\r\n " +
cm.getItemName(1472023)+"\r\n"+"#i1472023#\r\n " +
cm.getItemName(1472019)+"\r\n"+"#i1472019#\r\n " +
cm.getItemName(1472022)+"\r\n"+"#i1472022#\r\n " +
cm.getItemName(1102011)+"\r\n"+"#i1102011#\r\n " +
cm.getItemName(1472033)+"\r\n"+"#i1472033#\r\n " +
cm.getItemName(1402017)+"\r\n"+"#i1402017#\r\n " +
cm.getItemName(1442009)+"\r\n"+"#i1442009#\r\n " +
cm.getItemName(1472013)+"\r\n"+"#i1472013#\r\n " +
cm.getItemName(1472021)+"\r\n"+"#i1472021#\r\n " +
cm.getItemName(1472075)+"\r\n"+"#i1472075#\r\n " +
cm.getItemName(2000004)+"\r\n"+"#i2000004#\r\n " +
cm.getItemName(1382005)+"\r\n"+"#i1382005#\r\n " +
cm.getItemName(1332030)+"\r\n"+"#i1332030#\r\n " +
cm.getItemName(1432001)+"\r\n"+"#i1432001#\r\n " +
cm.getItemName(2044901)+"\r\n"+"#i2044901#\r\n " +
cm.getItemName(2044902)+"\r\n"+"#i2044902#\r\n " +
cm.getItemName(1422025)+"\r\n"+"#i1422025#\r\n " +
cm.getItemName(1442015)+"\r\n"+"#i1442015#\r\n " +
cm.getItemName(1432017)+"\r\n"+"#i1432017#\r\n " +
cm.getItemName(1442025)+"\r\n"+"#i1442025#\r\n " +
cm.getItemName(1312004)+"\r\n"+"#i1312004#\r\n " +
cm.getItemName(1322015)+"\r\n"+"#i1322015#\r\n " +
cm.getItemName(1462005)+"\r\n"+"#i1462005#\r\n " +
cm.getItemName(1312012)+"\r\n"+"#i1312012#\r\n " +
cm.getItemName(1302003)+"\r\n"+"#i1302003#\r\n " +
cm.getItemName(1442004)+"\r\n"+"#i1442004#\r\n " +
cm.getItemName(1302028)+"\r\n"+"#i1302028#\r\n " +
cm.getItemName(1402006)+"\r\n"+"#i1402006#\r\n " +
cm.getItemName(1322000)+"\r\n"+"#i1322000#\r\n " +
cm.getItemName(2022195)+"\r\n"+"#i2022195#\r\n " +
cm.getItemName(1412001)+"\r\n"+"#i1412001#\r\n " +
cm.getItemName(1372002)+"\r\n"+"#i1372002#\r\n " +
cm.getItemName(1472009)+"\r\n"+"#i1472009#\r\n " +
cm.getItemName(1422001)+"\r\n"+"#i1422001#\r\n " +
cm.getItemName(1462000)+"\r\n"+"#i1462000#\r\n " +
cm.getItemName(1412004)+"\r\n"+"#i1412004#\r\n " +
cm.getItemName(1452008)+"\r\n"+"#i1452008#\r\n " +
cm.getItemName(1432016)+"\r\n"+"#i1432016#\r\n " +
cm.getItemName(1302021)+"\r\n"+"#i1302021#\r\n " +
cm.getItemName(1442000)+"\r\n"+"#i1442000#\r\n " +
cm.getItemName(2000005)+"\r\n"+"#i2000005#\r\n " +
cm.getItemName(2022113)+"\r\n"+"#i2022113#\r\n " +
cm.getItemName(1432013)+"\r\n"+"#i1432013#\r\n " +
cm.getItemName(1322024)+"\r\n"+"#i1322024#\r\n " +
cm.getItemName(1322012)+"\r\n"+"#i1322012#\r\n " +
cm.getItemName(1302012)+"\r\n"+"#i1302012#\r\n " +
cm.getItemName(2049000)+"\r\n"+"#i2049000#\r\n " +
cm.getItemName(2049100)+"\r\n"+"#i2049100#\r\n " +
cm.getItemName(1102041 )+"\r\n"+"#i1102041#\r\n " +
cm.getItemName(1102042 )+"\r\n"+"#i1102042#\r\n " +
cm.getItemName(1102043 )+"\r\n"+"#i1102043#\r\n " +
cm.getItemName(1402001)+"\r\n"+"#i1402001#\r\n " +
cm.getItemName(1372005)+"\r\n"+"#i1372005#\r\n " +
cm.getItemName(1442021)+"\r\n"+"#i1442021#\r\n " +
cm.getItemName(2040915)+"\r\n"+"#i2040915#\r\n " +
cm.getItemName(2040920)+"\r\n"+"#i2040920#\r\n " +
cm.getItemName(2041301)+"\r\n"+"#i2041301#\r\n " +
cm.getItemName(2041304)+"\r\n"+"#i2041304#\r\n " +
cm.getItemName(2041307)+"\r\n"+"#i2041307#\r\n " +
cm.getItemName(2041310)+"\r\n"+"#i2041310#\r\n " +
cm.getItemName(2044803)+"\r\n"+"#i2044803#\r\n " +
cm.getItemName(2044804)+"\r\n"+"#i2044804#\r\n " +










                                        








                                          
                                          


                      "");

                      

        
                    
                      }
                      
            
            }
        }
    }
