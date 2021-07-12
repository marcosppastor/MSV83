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


var ids = [   1382001,1002064,1050049,1302027,1051023,1332013,1312001,1040080,1061087,1050054,1051047, 1312030,1050008,1051027,1051055,1372003,1061083,1050055,1442017,1442009,1372010,2022113, 1302019,1051017,1002245,1002084,1050056,1422005,2000005,1002028,2002018,1050003,1002143, 1322010,1102014,
1040037,
1412004,
1002036,
1050060,
1060079,
1002243,
1041081,
2044501 ,
2044502, 
1041039,
1040069,
1040091,
1040075,
2290056 ,
1002166,
1041069,
1002022,
1040000,
2044601,
2044602,
1432001,
1060085,
1051026,
1060004,
1322009,
1442016,
1050008,
1040042,
1002153,
2290053]

    
var status = 0;

function start() {
    if (cm.haveItem(5451000)) {
        cm.gainItem(5451000, -1);
        cm.processGachapon(ids, true);
        cm.dispose();
    } else if (cm.haveItem(5220000))
        cm.sendYesNo("Vejo que você pode usar o #bBilhete de Gachapon#k (#i5220000#). Gostaria de usá-lo?");
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

cm.getItemName(1382001) +"\r\n"+"#i1382001#\r\n " +
cm.getItemName(1002064) +"\r\n"+"#i1002064#\r\n " +
cm.getItemName(1050049) +"\r\n"+"#i1050049#\r\n " +
cm.getItemName(1302027) +"\r\n"+"#i1302027#\r\n " +
cm.getItemName(1051023) +"\r\n"+"#i1051023#\r\n " +
cm.getItemName(1332013) +"\r\n"+"#i1332013#\r\n " +
cm.getItemName(1312001) +"\r\n"+"#i1312001#\r\n " +
cm.getItemName(1040080) +"\r\n"+"#i1040080#\r\n " +
cm.getItemName(1061087) +"\r\n"+"#i1061087#\r\n " +
cm.getItemName(1050054) +"\r\n"+"#i1050054#\r\n " +
cm.getItemName(1051047) +"\r\n"+"#i1051047#\r\n " +
cm.getItemName(1312030) +"\r\n"+"#i1312030#\r\n " +
cm.getItemName(1050008) +"\r\n"+"#i1050008#\r\n " +
cm.getItemName(1051027) +"\r\n"+"#i1051027#\r\n " +
cm.getItemName(1051055) +"\r\n"+"#i1051055#\r\n " +
cm.getItemName(1372003) +"\r\n"+"#i1372003#\r\n " +
cm.getItemName(1061083) +"\r\n"+"#i1061083#\r\n " +
cm.getItemName(1050055) +"\r\n"+"#i1050055#\r\n " +
cm.getItemName(1442017) +"\r\n"+"#i1442017#\r\n " +
cm.getItemName(1442009) +"\r\n"+"#i1442009#\r\n " +
cm.getItemName(1372010) +"\r\n"+"#i1372010#\r\n " +
cm.getItemName(2022113) +"\r\n"+"#i2022113#\r\n " + 
cm.getItemName(1302019) +"\r\n"+"#i1302019#\r\n " +
cm.getItemName(1051017) +"\r\n"+"#i1051017#\r\n " +
cm.getItemName(1002245) +"\r\n"+"#i1002245#\r\n " +
cm.getItemName(1002084) +"\r\n"+"#i1002084#\r\n " +
cm.getItemName(1050056) +"\r\n"+"#i1050056#\r\n " +
cm.getItemName(1422005) +"\r\n"+"#i1422005#\r\n " +
cm.getItemName(2000005) +"\r\n"+"#i2000005#\r\n " +
cm.getItemName(1002028) +"\r\n"+"#i1002028#\r\n " +
cm.getItemName(2044601) +"\r\n"+"#i2044601#\r\n " +
cm.getItemName(2044602) +"\r\n"+"#i2044602#\r\n " +
cm.getItemName(2002018) +"\r\n"+"#i2002018#\r\n " +
cm.getItemName(1050003) +"\r\n"+"#i1050003#\r\n " +
cm.getItemName(1002143) +"\r\n"+"#i1002143#\r\n " +
cm.getItemName(1102014) +"\r\n"+"#i1102014#\r\n " +
cm.getItemName(1040037) +"\r\n"+"#i1040037#\r\n " +
cm.getItemName(1412004) +"\r\n"+"#i1412004#\r\n " +
cm.getItemName(1002036) +"\r\n"+"#i1002036#\r\n " +
cm.getItemName(1050060) +"\r\n"+"#i1050060#\r\n " +
cm.getItemName(1060079) +"\r\n"+"#i1060079#\r\n " +
cm.getItemName(2290053 ) +"\r\n"+"#i2290053#\r\n " +
cm.getItemName(1002243) +"\r\n"+"#i1002243#\r\n " +
cm.getItemName(1041081) +"\r\n"+"#i1041081#\r\n " +
cm.getItemName(1041039) +"\r\n"+"#i1041039#\r\n " +
cm.getItemName(1040069) +"\r\n"+"#i1040069#\r\n " +
cm.getItemName(2044501 ) +"\r\n"+"#i2044501#\r\n " +
cm.getItemName(2044502 ) +"\r\n"+"#i2044502#\r\n " +
cm.getItemName(1040091) +"\r\n"+"#i1040091#\r\n " +
cm.getItemName(1040075) +"\r\n"+"#i1040075#\r\n " +
cm.getItemName(1002166) +"\r\n"+"#i1002166#\r\n " +
cm.getItemName(1041069) +"\r\n"+"#i1041069#\r\n " +
cm.getItemName(1002022) +"\r\n"+"#i1002022#\r\n " +
cm.getItemName(1040000) +"\r\n"+"#i1040000#\r\n " +
cm.getItemName(1432001) +"\r\n"+"#i1432001#\r\n " +
cm.getItemName(1060085) +"\r\n"+"#i1060085#\r\n " +
cm.getItemName(1051026) +"\r\n"+"#i1051026#\r\n " +
cm.getItemName(1060004) +"\r\n"+"#i1060004#\r\n " +
cm.getItemName(1322009) +"\r\n"+"#i1322009#\r\n " +
cm.getItemName(1442016) +"\r\n"+"#i1442016#\r\n " +
cm.getItemName(1050008) +"\r\n"+"#i1050008#\r\n " +
cm.getItemName(1040042) +"\r\n"+"#i1040042#\r\n " +
cm.getItemName(1002153) +"\r\n"+"#i1002153#\r\n " +
cm.getItemName(2290056 ) +"\r\n"+"#i2290056#\r\n " +

cm.getItemName(1322010) +"\r\n"+"#i1322010#\r\n " + "");

        
                    
                      }
                      
            
            }
        }
    }
