/*
var status = 0;

function start() {
    cm.sendNext("Sou o assistente da promoção da nossa página no Facebook, para se cadastrar e concorrer a prêmios em #rCash#k, siga os passos comigo e vá para nossa página no facebook,seguir os de lá, é importante não esquecer de nenhum passo ou seu nome não será validado ao final da promoção, portanto não se esqueça, vá para (#bFacebook.com/TrueBrMapleStory).#k");
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.sendOk("Tudo bem, você quem sabe..")
        cm.dispose();
    }else {
        if(mode > 0)
            status++;
        else if(mode < 0)
            cm.dispose();
        if (status == 1) {
            if (cm.getGiftLog('Promocao') >= 1 || cm.getLevel() <20) {
                cm.sendOk("Desculpe,acreditamos que você já está participando da promoção com esta conta, ou ainda não possui o minímo de nível 20!");
                cm.dispose();
            }else
                cm.sendYesNo("Parabéns,você gostaria de se cadastrar na promoção da nossa página no Facebook #r True MapleStory#k?");
        }else if (status == 2) {
            
            cm.setBossLog('Promocao');
            cm.sendOk("Você se cadastrou na promoção com sucesso, fique ligado na nossa Página no Facebook!#e(True MapleStory) ");
            cm.dispose();
        } else
            cm.sendOk("Tem certeza?, a promoção vai até o dia 29/09 as 23:59min (horário de brasilia!")
    }
}

*/

/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
//cm.gainItem()
cm.sendOk("Ola #h #, tudo bem?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}