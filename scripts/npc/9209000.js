var item =-45000;
var itemprice =45000;

function start() {
	cm.sendSimple("#e#dOlá, eu sou Abdula o mercador,tenho algo para você,gostaria de comprar 30 Ap's Resets por #r500.000.000 de mesos?(500M) ou 45k de NX?.#k#e#k#d #e#d#n#k\r\n#d#L0#Confirmar compra com mesos. #l\r\n\r\n#L3##r Confirmar compra com Cash.#k#l \r\n#L1##bPara que servem os Ap's Resets? (#i5050000#)#k#l\r\n\r\n#L2##rSair#k#l\r\n\r\n  ");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if ((cm.getMeso() >= 500000000)) {
			cm.sendOk("#e#dParabéns!#n#k\r\n#dVocê adquiriu seus itens com sucesso.");
			cm.gainMeso(-500000000);
            cm.gainItem(5050000,30);
            cm.dispose();
			}
			else if (!cm.getMeso() <= 500000000) {
			cm.sendOk("#dLamento, mas voce não possui a quantia de mesos necessária.");
			cm.dispose();
			}
	}
		
              else  if (selection == 1) {
		
			cm.sendOk("#bOs Ap's Resets são usados para resetarem Atributos colocados de forma errada ou para técnica de wash!#n#k\r\n");
			cm.dispose();
}

else if (selection == 2) {
		
	cm.dispose();
}

if (selection==3){
    
     if (cm.getPlayer().getCashShop().getCash(1) >= 45000) {
    cm.sendOk("#e#dParabéns!#n#k\r\n#dVocê adquiriu seus itens com sucesso.");
    cm.getPlayer().getCashShop().gainCash(1, -45000);    
    cm.gainItem(5050000,30);
    cm.dispose();
    
    }

   else if (cm.getPlayer().getCashShop().getCash(1) < 45000)  {
			cm.sendOk("#dLamento, mas voce não possui a quantia de cash necessária.");
			cm.dispose();
			}
}

}