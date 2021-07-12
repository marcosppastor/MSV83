/*
Arturo - 2040035.js
OrbisMS - Marcos Paulo Pastor
www.OrbisMS.net - 2015
PREMIAÇÃO LPQ FINAL
*/
var status = 0;
var itemArray = Array(2000004, 2000005, 2000006, 2002020, 2002021, 2002022, 2002023, 2002024, 2002025, 2002026, 2001000, 2001002, 2002015, 2050005, 2022179, 2020014, 2020015 /*FIM DAS POTS*/, 2100000, 2100001, 2100002, 2100003, 2100004, 2100005, /*FIM DOS SACOS*/
					2061003, 2060003, 2060004, 2061004 /*FIM DAS FLECHAS*/, 2070006, 2070005, 2070007, 2070004 /*FIM DAS SHURI*/, 2210000, 2210001, 2210002);
					
var itemQuan = Array(50, 20, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 5, 30, 2, 100, 50, 1, 1, 1, 1, 1, 1, 2000, 2000, 2000, 2000, 1, 1, 1, 1, 5, 5, 5);

var ItemdaPQ = new Array(4001022, 4001023);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
		if (mode == -1) {
		cm.dispose();
		} else { 
		  if (status >= 2 && mode == 0) { 
		   cm.dispose(); 
		   return; 
		} 
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
			cm.sendNext("De forma a compensa-los pelo salvamento de Ludibrium, darei uma premiacao para cada integrante do seu grupo!\r\nO que tenho a lhes dar e simples mas e do fundo do meu #rcoracao!");
        } else if (status == 1) {
			for (var i = 0; i < ItemdaPQ.length; i++) {
				cm.removeAll(ItemdaPQ[i]); // Remove todos os items da PQ
			}
			var randmm = Math.floor(Math.random() * itemArray.length);
			cm.gainItem(itemArray[randmm], itemQuan[randmm]);
			cm.warp(970000102, 0);
			cm.sendOk("Aqui esta a sua recompensa. Vrifique seu inventario!\r\nMais uma vez, #eobrigado.");
			cm.dispose();
		}
    }
}