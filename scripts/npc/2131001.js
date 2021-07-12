/*
importPackage(Packages.tools);
importPackage(Packages.server.life);
importPackage(java.awt);
importPackage(java.lang);


var status = -1;

var exchangeItem = 4000439;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        cm.sendSimple("Meu nome é Pergen, eu sou o mago mais forte por aqui.#b\r\n#L0#Ei, pegue esses escombros. Você pode executar sua magia neles.#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("Você não tem o suficiente ... Preciso de pelo menos 100.");
	    cm.dispose();
	} else {
            	if (selection >= 1 && cm.haveItem()) {
if (!cm.canHold(4310000, selection)) {
		cm.sendOk("Faça algum espaço na guia ETC.");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem,));
		cm.sendOk("Obrigao!");
	    }
	}
            
            
        }
    }
        cm.dispose();
    }
*/

/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
//cm.gainItem()
cm.sendOk("Meu nome é Pergen, eu sou o mago mais forte por aqui!");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}