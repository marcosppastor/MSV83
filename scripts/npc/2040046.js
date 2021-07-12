/*
Robert - 2040046.js
OrbisMS - Marcos Paulo Pastor
www.orbisms.net - 2015
Arquivo revisado, melhorado e traduzido.
*/

var status = 0;
	
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.sendNext("Entendo...\r\nDe qualquer forma, é você quem sabe! Se decidir voltar atrás, basta falar comigo.");
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("Entendo...\r\nDe qualquer forma, é você quem sabe! Se decidir voltar atrás, basta falar comigo.");
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("Oi #h #, tudo bem? Meu nome é Robert e tenho a função de aumentar a sua lista de amigos!\r\nPor acaso, você deseja aumenta-la?");
	} else if (status == 1) {
		cm.sendYesNo("Ótimo!\r\nPor uma taxa de #b240,000 mesos#k, eu posso adicionar\r\n#b5 espaços#k a mais na sua lista de amigos. Essa quantidade adicionada é permanente!\r\nApos ler o preço que cobro, você realmente deseja pagar #b240,000 mesos#k por isso?");
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("Acho que você não tem a quantia de mesos suficiente, ou a sua lista de amigos já está com a capacidade máxima...");
			cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-240000);
			cm.updateBuddyCapacity(newcapacity);		
			cm.sendOk("Obrigado!\r\nGraças a você, agora eu tenho bastante dinheiro e você tem mais espaços para adicionar amigos!\r\nQuando você desejar aumentar essa lista, fale comigo.");
			cm.dispose();
			}
		}
	}
}