var status = -1;

function start(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode == -1) {
		qm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
        qm.sendNext("Não há muito registro dos heróis que lutaram contra o Mago Negro. Mesmo no Livro da Profecia, a única informação disponível é que havia cinco deles. Não há nada sobre quem eram ou o que eles pareciam. Existe alguma lembrança? Nada mesmo?", 8);
    } else if (status == 1) {
		qm.sendNextPrev("Eu não me lembro de nada..", 2);
	} else if (status == 2) {
		qm.sendNextPrev("Como eu esperava. Claro, a maldição do Black Mage foi forte o suficiente para acabar com sua memória. Mas mesmo que seja o caso, deve haver um ponto em que o passado irá descobrir, especialmente agora que estamos certos de que você é um dos heróis. Eu sei que você perdeu sua armadura e arma durante a batalha, mas ... Oh, sim, sim. Eu quase esqueci! Sua #bArma#k!", 8);
	} else if (status == 3) {
		qm.sendNextPrev("Minha arma?", 2);
	} else if (status == 4) {
		qm.sendNextPrev("Encontrei uma arma incrível enquanto cavava por blocos de gelo um tempo atrás. Achei que a arma pertencia a um herói, então eu a trouxe Para a cidade e colocou-o em algum lugar no centro da cidade. Você não viu isso?? #bThe #p1201001##k... \r\r#i4032372#\r\rEla se parece com isso...", 8);
	} else if (status == 5) {
		qm.sendNextPrev("Penso nisso, eu vi uma #p1201001# na cidade.", 2);
	} else if (status == 6) {
		qm.sendAcceptDecline("Sim é isso. De acordo com o que foi gravado, a arma de um herói reconhecerá o seu proprietário legítimo, e se você é o herói que usou o #p1201001#, o #p1201001# vai reagir quando você o pegar #p1201001#. Please go find the #b#p1201001# e clique nele.#k");
	} else if (status == 7) {
		if (mode == 0 && type == 15) {
			qm.sendNext("O que está parando você? Eu prometo que não ficarei desapontado, mesmo que o #p1201001# Não mostra nenhuma reação a você. Por favor, apressar-se lá e pegar o #p1201001#. apenas #bclick#k nele.", 8);
		} else {
			qm.forceCompleteQuest();
			qm.sendOk("Se o #p1201001# Reage para você, então saberemos que você é #bAran#k, O herói que exercia uma #p1201001#.", 8);
			qm.showIntro("Effect/Direction1.img/aranTutorial/ClickPoleArm");
		}
		qm.dispose();
	}
}