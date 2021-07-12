/*
 * @author Marcos P. Pastor
 * TrueMS - 2017
 * truems.net.br/
*/

var status = 0;

function start() {
    cm.sendYesNo("Olá #h #, como vai? Por acaso, você quer retirar sua bonificação de #e#b30.000 de NX#k#n que foi prometido aos novos jogadores?");
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.sendOk("Tudo bem. Quando mudar de ideia, saiba que estarei aqui!")
        cm.dispose();
    }else {
        if(mode > 0)
            status++;
        else if(mode < 0)
            cm.dispose();
        if (status == 1) {
            if (cm.getCashBonificacao('BonificaçãoCash') >= 1 || cm.getLevel() <70) {
                cm.sendOk("Para retirar a sua bonificação de #e#b30.000 de NX#k#n, é preciso que você esteja no mínimo no LV. 70.");
                cm.dispose();
            } else
                cm.sendOk("Recompensa retirada.\r\nObrigado pelo apoio!");
        } else if (status == 2) {
            cm.modifyNX(30000, 1);
            cm.setCashLog('BonificaçãoCash');
            //cm.sendOk("Prêmio retirado com sucesso!");
            cm.dispose();
        } else
            cm.sendOk("Tudo bem, darei a outro jogador sua recompensa...")
    }
}