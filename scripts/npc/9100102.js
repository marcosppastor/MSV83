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
2022113,
2043202,
2043201,
2044102,
2044101,
2040602,
2040601,
2043302,
2043301,
2040002,
2040001,
2044402,
2002017,
1402010,
1312014,
1442017,
1002063,
1060062,
1050018,
1002392,
1040037,
1002160,
1060005,
1332009,
1332008,
1442009,
1302004,
1312006,
1002154,
1002175,
1060064,
1061088,
1402012,
1002024,
1312005,
1432002,
1302050,
1002048,
1040061,
1041067,
1002131,
1072263,
1332001,
1312027,
1322015,
1432006,
1041088,
1061087,
1402013,
1302051,
1002023,
1402006,
1322000,
1372002,
1442001,
1422004,
1432003,
1040088,
1002100,
1041004,
1061047,
1322022,
1040021,
1061091,
1102012,
1050006,
1060018,
1041044,
1041024,
1041087,
1082146,
1332043,
1062001,
1051014,
1402030,
1432004,
1060060,
1432018,
1002096,
1442010,
1422003,
1472014,
1002021,
1060060,
1442031,
1402000,
1040089,
1432005,
2340000,
2290012,
2290009,
2290011

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

cm.getItemName(2022113 )+"\r\n"+"#i2022113#\r\n " +
cm.getItemName(2043202 )+"\r\n"+"#i2043202#\r\n " +
cm.getItemName(2043201 )+"\r\n"+"#i2043201#\r\n " +
cm.getItemName(2044102 )+"\r\n"+"#i2044102#\r\n " +
cm.getItemName(2044101 )+"\r\n"+"#i2044101#\r\n " +
cm.getItemName(2040602 )+"\r\n"+"#i2040602#\r\n " +
cm.getItemName(2040601 )+"\r\n"+"#i2040601#\r\n " +
cm.getItemName(2043302 )+"\r\n"+"#i2043302#\r\n " +
cm.getItemName(2043301 )+"\r\n"+"#i2043301#\r\n " +
cm.getItemName(2040002 )+"\r\n"+"#i2040002#\r\n " +
cm.getItemName(2040001 )+"\r\n"+"#i2040001#\r\n " +
cm.getItemName(2044402 )+"\r\n"+"#i2044402#\r\n " +
cm.getItemName(2002017 )+"\r\n"+"#i2002017#\r\n " +
cm.getItemName(1402010 )+"\r\n"+"#i1402010#\r\n " +
cm.getItemName(1312014 )+"\r\n"+"#i1312014#\r\n " +
cm.getItemName(1442017 )+"\r\n"+"#i1442017#\r\n " +
cm.getItemName(1002063 )+"\r\n"+"#i1002063#\r\n " +
cm.getItemName(1060062 )+"\r\n"+"#i1060062#\r\n " +
cm.getItemName(1050018 )+"\r\n"+"#i1050018#\r\n " +
cm.getItemName(1002392 )+"\r\n"+"#i1002392#\r\n " +
cm.getItemName(1040037 )+"\r\n"+"#i1040037#\r\n " +
cm.getItemName(1002160 )+"\r\n"+"#i1002160#\r\n " +
cm.getItemName(1060005 )+"\r\n"+"#i1060005#\r\n " +
cm.getItemName(1332009 )+"\r\n"+"#i1332009#\r\n " +
cm.getItemName(1332008 )+"\r\n"+"#i1332008#\r\n " +
cm.getItemName(1442009 )+"\r\n"+"#i1442009#\r\n " +
cm.getItemName(1302004 )+"\r\n"+"#i1302004#\r\n " +
cm.getItemName(1312006 )+"\r\n"+"#i1312006#\r\n " +
cm.getItemName(1002154 )+"\r\n"+"#i1002154#\r\n " +
cm.getItemName(1002175 )+"\r\n"+"#i1002175#\r\n " +
cm.getItemName(1060064 )+"\r\n"+"#i1060064#\r\n " +
cm.getItemName(1061088 )+"\r\n"+"#i1061088#\r\n " +
cm.getItemName(1402012 )+"\r\n"+"#i1402012#\r\n " +
cm.getItemName(1002024 )+"\r\n"+"#i1002024#\r\n " +
cm.getItemName(1312005 )+"\r\n"+"#i1312005#\r\n " +
cm.getItemName(1432002 )+"\r\n"+"#i1432002#\r\n " +
cm.getItemName(1302050 )+"\r\n"+"#i1302050#\r\n " +
cm.getItemName(1002048 )+"\r\n"+"#i1002048#\r\n " +
cm.getItemName(1040061 )+"\r\n"+"#i1040061#\r\n " +
cm.getItemName(1041067 )+"\r\n"+"#i1041067#\r\n " +
cm.getItemName(1002131 )+"\r\n"+"#i1002131#\r\n " +
cm.getItemName(1072263 )+"\r\n"+"#i1072263#\r\n " +
cm.getItemName(1332001 )+"\r\n"+"#i1332001#\r\n " +
cm.getItemName(1312027 )+"\r\n"+"#i1312027#\r\n " +
cm.getItemName(1322015 )+"\r\n"+"#i1322015#\r\n " +
cm.getItemName(1432006 )+"\r\n"+"#i1432006#\r\n " +
cm.getItemName(1041088 )+"\r\n"+"#i1041088#\r\n " +
cm.getItemName(1061087 )+"\r\n"+"#i1061087#\r\n " +
cm.getItemName(1402013 )+"\r\n"+"#i1402013#\r\n " +
cm.getItemName(1302051 )+"\r\n"+"#i1302051#\r\n " +
cm.getItemName(1002023 )+"\r\n"+"#i1002023#\r\n " +
cm.getItemName(1402006 )+"\r\n"+"#i1402006#\r\n " +
cm.getItemName(1322000 )+"\r\n"+"#i1322000#\r\n " +
cm.getItemName(1372002 )+"\r\n"+"#i1372002#\r\n " +
cm.getItemName(1442001 )+"\r\n"+"#i1442001#\r\n " +
cm.getItemName(1422004 )+"\r\n"+"#i1422004#\r\n " +
cm.getItemName(1432003 )+"\r\n"+"#i1432003#\r\n " +
cm.getItemName(1040088 )+"\r\n"+"#i1040088#\r\n " +
cm.getItemName(1002100 )+"\r\n"+"#i1002100#\r\n " +
cm.getItemName(1041004 )+"\r\n"+"#i1041004#\r\n " +
cm.getItemName(1061047 )+"\r\n"+"#i1061047#\r\n " +
cm.getItemName(1322022 )+"\r\n"+"#i1322022#\r\n " +
cm.getItemName(1040021 )+"\r\n"+"#i1040021#\r\n " +
cm.getItemName(1061091 )+"\r\n"+"#i1061091#\r\n " +
cm.getItemName(1102012 )+"\r\n"+"#i1102012#\r\n " +
cm.getItemName(1050006) +"\r\n"+"#i1050006#\r\n " +
cm.getItemName(1060018) +"\r\n"+"#i1060018#\r\n " +
cm.getItemName(1041044) +"\r\n"+"#i1041044#\r\n " +
cm.getItemName(1041024) +"\r\n"+"#i1041024#\r\n " +
cm.getItemName(1041087) +"\r\n"+"#i1041087#\r\n " +
cm.getItemName(1082146) +"\r\n"+"#i1082146#\r\n " +
cm.getItemName(1332043) +"\r\n"+"#i1332043#\r\n " +
cm.getItemName(1062001) +"\r\n"+"#i1062001#\r\n " +
cm.getItemName(1051014) +"\r\n"+"#i1051014#\r\n " +
cm.getItemName(1402030) +"\r\n"+"#i1402030#\r\n " +
cm.getItemName(1432004) +"\r\n"+"#i1432004#\r\n " +
cm.getItemName(1060060) +"\r\n"+"#i1060060#\r\n " +
cm.getItemName(1432018) +"\r\n"+"#i1432018#\r\n " +
cm.getItemName(1002096) +"\r\n"+"#i1002096#\r\n " +
cm.getItemName(1442010) +"\r\n"+"#i1442010#\r\n " +
cm.getItemName(1422003) +"\r\n"+"#i1422003#\r\n " +
cm.getItemName(1472014) +"\r\n"+"#i1472014#\r\n " +
cm.getItemName(1002021) +"\r\n"+"#i1002021#\r\n " +
cm.getItemName(1060060) +"\r\n"+"#i1060060#\r\n " +
cm.getItemName(1442031) +"\r\n"+"#i1442031#\r\n " +
cm.getItemName(1402000) +"\r\n"+"#i1402000#\r\n " +
cm.getItemName(1040089) +"\r\n"+"#i1040089#\r\n " +
cm.getItemName(1432005) +"\r\n"+"#i1432005#\r\n " +
cm.getItemName(2340000) +"\r\n"+"#i2340000 #\r\n " +
cm.getItemName(2290012 ) +"\r\n"+"#i2290012 #\r\n " +
cm.getItemName(2290009 ) +"\r\n"+"#i2290009 #\r\n " +
cm.getItemName(2290011  ) +"\r\n"+"#i2290011  #\r\n " +

                                          
                                          


                      "");

                      

        
                    
                      }
                      
            
            }
        }
    }
