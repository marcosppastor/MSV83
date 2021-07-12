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
2000005,
2022113,
2002018,
1382001,
1050008,
1442017,
1002084,
1050003,
1002064,
1061006,
1051027,
1442009,
1050056,
1051047,
1050049,
1040080,
1051055,
1372010,
1422005,
1002143,
1302027,
1061087,
1372003,
1302019,
1051023,
1050054,
1061083,
1051017,
1002028,
1322010,
1332013,
1050055,
1002245,
1382048,
1372035,
1372037,
1082145,
2290027,
2290041,
2290047

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

cm.getItemName(2000005)+"\r\n"+"#i2000005#\r\n " +
cm.getItemName(2022113)+"\r\n"+"#i2022113#\r\n " +
cm.getItemName(2002018)+"\r\n"+"#i2002018#\r\n " +
cm.getItemName(1382001)+"\r\n"+"#i1382001#\r\n " +
cm.getItemName(1050008)+"\r\n"+"#i1050008#\r\n " +
cm.getItemName(1442017)+"\r\n"+"#i1442017#\r\n " +
cm.getItemName(1002084)+"\r\n"+"#i1002084#\r\n " + 
cm.getItemName(1050003)+"\r\n"+"#i1050003#\r\n " + 
cm.getItemName(1002064)+"\r\n"+"#i1002064#\r\n " + 
cm.getItemName(1061006)+"\r\n"+"#i1061006#\r\n " + 
cm.getItemName(1051027)+"\r\n"+"#i1051027#\r\n " + 
cm.getItemName(1442009)+"\r\n"+"#i1442009#\r\n " + 
cm.getItemName(1050056)+"\r\n"+"#i1050056#\r\n " + 
cm.getItemName(1051047)+"\r\n"+"#i1051047#\r\n " +
cm.getItemName(1050049)+"\r\n"+"#i1050049#\r\n " +
cm.getItemName(1040080)+"\r\n"+"#i1040080#\r\n " +
cm.getItemName(1051055)+"\r\n"+"#i1051055#\r\n " +
cm.getItemName(1372010)+"\r\n"+"#i1372010#\r\n " + 
cm.getItemName(1422005)+"\r\n"+"#i1422005#\r\n " +
cm.getItemName(1002143)+"\r\n"+"#i1002143#\r\n " +
cm.getItemName(1302027)+"\r\n"+"#i1302027#\r\n " + 
cm.getItemName(1061087)+"\r\n"+"#i1061087#\r\n " +
cm.getItemName(1372003)+"\r\n"+"#i1372003#\r\n " +
cm.getItemName(1302019)+"\r\n"+"#i1302019#\r\n " +
cm.getItemName(1051023)+"\r\n"+"#i1051023#\r\n " +
cm.getItemName(1050054)+"\r\n"+"#i1050054#\r\n " + 
cm.getItemName(1061083)+"\r\n"+"#i1061083#\r\n " + 
cm.getItemName(1051017)+"\r\n"+"#i1051017#\r\n " + 
cm.getItemName(1002028)+"\r\n"+"#i1002028#\r\n " + 
cm.getItemName(1322010)+"\r\n"+"#i1322010#\r\n " + 
cm.getItemName(1332013)+"\r\n"+"#i1332013#\r\n " + 
cm.getItemName(1050055)+"\r\n"+"#i1050055#\r\n " + 
cm.getItemName(1002245)+"\r\n"+"#i1002245#\r\n " +
cm.getItemName(1382048)+"\r\n"+"#i1382048#\r\n " +
cm.getItemName(1372035)+"\r\n"+"#i1372035#\r\n " +
cm.getItemName(1372037)+"\r\n"+"#i1372037#\r\n " +
cm.getItemName(1082145)+"\r\n"+"#i1082145#\r\n " +
cm.getItemName(2290027 )+"\r\n"+"#i2290027#\r\n " +
cm.getItemName(2290041 )+"\r\n"+"#i2290041 #\r\n " +
cm.getItemName(2290047  )+"\r\n"+"#i2290047#\r\n " +








                                          
                                          


                      "");

                      

        
                    
                      }
                      
            
            }
        }
    }
