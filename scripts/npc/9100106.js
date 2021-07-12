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
2022113,
1072238,
1040081,
1382002,
1442021,
1072239,
1002096,
1322010,
1472005,
1002021,
1422007,
1082148,
1102081,
1040043,
1002117,
1302013,
1462024,
1382003,
1051001,
1472000,
1002088,
1472003,
1002048,
1002178,
1040007,
1002131,
1002288,
1002183,
1372006,
1442004,
1040082,
1322003,
2022195,
1412001,
1472009,
1060088,
1002035,
1322009,
1472016,
1332011,
1032027,
1002214,
1312014,
1002120,
1322023,
1452010,
1002034,
1060025,
1082147,
1002055,
1060019,
1002180,
1002154,
1060068,
1462013


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
cm.getItemName(2022113)+"\r\n"+"#i2022113#\r\n " +
cm.getItemName(1072238)+"\r\n"+"#i1072238#\r\n " +
cm.getItemName(1040081)+"\r\n"+"#i1040081#\r\n " +
cm.getItemName(1382002)+"\r\n"+"#i1382002#\r\n " +
cm.getItemName(1442021)+"\r\n"+"#i1442021#\r\n " +
cm.getItemName(1072239)+"\r\n"+"#i1072239#\r\n " +
cm.getItemName(1002096)+"\r\n"+"#i1002096#\r\n " +
cm.getItemName(1322010)+"\r\n"+"#i1322010#\r\n " +
cm.getItemName(1472005)+"\r\n"+"#i1472005#\r\n " +
cm.getItemName(1002021)+"\r\n"+"#i1002021#\r\n " +
cm.getItemName(1422007)+"\r\n"+"#i1422007#\r\n " +
cm.getItemName(1082148)+"\r\n"+"#i1082148#\r\n " +
cm.getItemName(1102081)+"\r\n"+"#i1102081#\r\n " +
cm.getItemName(1040043)+"\r\n"+"#i1040043#\r\n " +
cm.getItemName(1002117)+"\r\n"+"#i1002117#\r\n " +
cm.getItemName(1302013)+"\r\n"+"#i1302013#\r\n " +
cm.getItemName(1462024)+"\r\n"+"#i1462024#\r\n " +
cm.getItemName(1382003)+"\r\n"+"#i1382003#\r\n " +
cm.getItemName(1051001)+"\r\n"+"#i1051001#\r\n " +
cm.getItemName(1472000)+"\r\n"+"#i1472000#\r\n " +
cm.getItemName(1002088)+"\r\n"+"#i1002088#\r\n " +
cm.getItemName(1472003)+"\r\n"+"#i1472003#\r\n " +
cm.getItemName(1002048)+"\r\n"+"#i1002048#\r\n " +
cm.getItemName(1002178)+"\r\n"+"#i1002178#\r\n " +
cm.getItemName(1040007)+"\r\n"+"#i1040007#\r\n " +
cm.getItemName(1002131)+"\r\n"+"#i1002131#\r\n " +
cm.getItemName(1002288)+"\r\n"+"#i1002288#\r\n " +
cm.getItemName(1002183)+"\r\n"+"#i1002183#\r\n " +
cm.getItemName(1372006)+"\r\n"+"#i1372006#\r\n " +
cm.getItemName(1442004)+"\r\n"+"#i1442004#\r\n " +
cm.getItemName(1040082)+"\r\n"+"#i1040082#\r\n " +
cm.getItemName(1322003)+"\r\n"+"#i1322003#\r\n " +
cm.getItemName(2022195)+"\r\n"+"#i2022195#\r\n " +
cm.getItemName(1412001)+"\r\n"+"#i1412001#\r\n " +
cm.getItemName(1472009)+"\r\n"+"#i1472009#\r\n " +
cm.getItemName(1060088)+"\r\n"+"#i1060088#\r\n " +
cm.getItemName(1002035)+"\r\n"+"#i1002035#\r\n " +
cm.getItemName(1322009)+"\r\n"+"#i1322009#\r\n " +
cm.getItemName(1472016)+"\r\n"+"#i1472016#\r\n " +
cm.getItemName(1332011)+"\r\n"+"#i1332011#\r\n " +
cm.getItemName(1032027)+"\r\n"+"#i1032027#\r\n " +
cm.getItemName(1002214)+"\r\n"+"#i1002214#\r\n " +
cm.getItemName(1312014)+"\r\n"+"#i1312014#\r\n " +
cm.getItemName(1002120)+"\r\n"+"#i1002120#\r\n " +
cm.getItemName(1322023)+"\r\n"+"#i1322023#\r\n " +
cm.getItemName(1452010)+"\r\n"+"#i1452010#\r\n " +
cm.getItemName(1002034)+"\r\n"+"#i1002034#\r\n " +
cm.getItemName(1060025)+"\r\n"+"#i1060025#\r\n " +
cm.getItemName(1082147)+"\r\n"+"#i1082147#\r\n " +
cm.getItemName(1002055)+"\r\n"+"#i1002055#\r\n " +
cm.getItemName(1060019)+"\r\n"+"#i1060019#\r\n " +
cm.getItemName(1002180)+"\r\n"+"#i1002180#\r\n " +
cm.getItemName(1002154)+"\r\n"+"#i1002154#\r\n " +
cm.getItemName(1060068)+"\r\n"+"#i1060068#\r\n " +
cm.getItemName(1462013)+"\r\n"+"#i1462013#\r\n " +

                                        








                                          
                                          


                      "");

                      

        
                    
                      }
                      
            
            }
        }
    }
