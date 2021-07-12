var item =-45000;
var itemprice =45000;

function start() {
	cm.sendSimple("Precisando aumentar seus #batributos temporariamente#k?, eu sou a Mimi,tenho algo para você,gostaria de comprar um #bAnel#k com atributos #respeciais#k por 30 dias?.Apenas 5k de NX? . Lembrando que o jogador #rnão#k deve comprar mais de um anel, pois o mesmo não poderá usar, nenhum #rreembolso#k será feito, por tanto, atenção! \r\n\r\n.#b #L0#Confirmar compra#l\r\n #L1#Saber mais sobre o item#l\r\n\r\n  ");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
     if (cm.getPlayer().getCashShop().getCash(1) >= 5000) {
			cm.sendOk("#e#dParabéns!#n#k\r\n#dVocê adquiriu seu item com sucesso.");
                        cm.getPlayer().getCashShop().gainCash(1, -5000); 
                       cm.gainItem (1112300,1,false,false,2592000000);

            cm.dispose();
			}
                         else if (cm.getPlayer().getCashShop().getCash(1) < 5000)  {
			cm.sendOk("#dDesculpe-me, mas voce não possui a quantia de NX necessária.");
			cm.dispose();
			}
	}
        
        else if (selection ==1){
            
           cm.sendOk("O anel é uma #bopção#k para jogadores que estão buscando complementar seus #batributos#k afim de usar algum item,complementar seu ataque,ou, para praticar alguma outra técnica em #r True MapleStory #k.");

        }
        
        
        
        }