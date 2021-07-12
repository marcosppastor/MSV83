/*huegm
function start() {
	cm.sendSimple("#e#dOlá, tenho algo para você,anda cansado de andar por ai? seria bom sentarum pouco e ralaxar,poderia fazer uma cadeira para você caso me de 1 parafuso e uma madeira \r\n#d#L0#Fazer cadeira#l\!");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if (cm.haveItem(4031161) && cm.haveItem(4031161)) {
			cm.sendOk("#e#dUAL!#n#k\r\n#dagora você pode sentar e relaxar aonde quiser.");
			cm.gainExp(50);
            
            cm.dispose();
			}
			else if (cm.haveItem(3010000) || cm.getPlayer().getLevel() >=7 ) {
			cm.sendOk("#dLamento, mas você já completou minha missão ou possui um nível superior ou igual 7.");
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
    
    if((cm.getMeso() >=45000)){
    cm.sendOk("#e#dParabéns!#n#k\r\n#dVocê adquiriu seus itens com sucesso.");
    cm.jogador.getCashShop().gainCash(-45000);
    cm.gainItem(5050000,30);
    cm.dispose();
    
    }
}
   else if (!cm.getCash(1) <= 45000) {
			cm.sendOk("#dLamento, mas voce não possui a quantia de cash necessária.");
			cm.dispose();
			}
}

*/