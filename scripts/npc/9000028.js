/*
 * @author Marcos P
 * comando @missÃµes
 * equinox - 2016
 * equinox.net/
*/

/*
function start() {
	cm.sendSimple ("Olá #h #, tudo bem? Vejo que desejastes ir até alguma das nossas #emissões em grupo#n.\r\nPor favor, escolha a que mais lhe interessar:#b\r\n#L147#Missão do Rico Dourado (#eLevel requerido: 10#n)#l\r\n#L0#Missão de Henesys (#eLevel requerido: 10#n)#l\r\n#L1#Missão de Kerning (#eLevel requerido: 20#n)#l\r\n#L4#Missão de Ariant (#eLevel requerido: 20#n)#l\r\n#L8#Missão Dojo (#eLevel requerido: 25#n)#l\r\n#L110#Missão Invasão (#eLevel requerido: 30 ou superior#n)#n#l\r\n#L5#Missão do Pirata (#eLevel requerido: 35#n)#l\r\n#L2#Missão de Ludibrium (#eLevel requerido: 35#n)#l\r\n#L40#Missão de Amoria (#eLevel requerido: 40 ou superior#n)#l\r\n#L6#Missão da Piramide (#eLevel requerido: 40#n)#l\r\n#L3#Missão do Labirinto de Ludibrium (#eLevel requerido: 51#n)#l\r\n#L7#Missão do Balrog (#eLevel requerido: 70#n)#l\r\n#L77#Missão Maple (#eLevel requerido: 77#n)#l\r\n#L555#Missão do Navio (#eLevel requerido: 100#n)#l\r\n#L100#Missão em #eCLÃƒ#n (#eLevel requerido: 10 ou superior#n)#n#l\r\n");
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {
		if ((cm.getLevel() >= 10)) {//HPQ
			cm.sendOk("Fale com #eTory.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 10) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 10.#n");
			cm.dispose();
			}
	}
	if (selection == 1) {
		if ((cm.getLevel() >= 20)) {//KPQ
			cm.sendOk("Fale com #eLakelis.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 20) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 20.#n");
			cm.dispose();
			}
	}
	if (selection == 2) {
		if ((cm.getLevel() >= 35)) {//LPQ
			cm.sendOk("Fale com #eRed Sign.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 35) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 35.#n");
			cm.dispose();
			}
	}
	if (selection == 3) {
		if ((cm.getLevel() >= 51)) {//LMPQ
			cm.sendOk("Fale com #eRolly.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 515) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 51.#n");
			cm.dispose();
			}
	}
	if (selection == 4) {
		if ((cm.getLevel() >= 20)) {//APQ
			cm.sendOk("Fale com #eCesar.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 20) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 20.#n");
			cm.dispose();
			}
	}
	if (selection == 5) {
		if ((cm.getLevel() >= 35)) {//PPQ
			cm.sendOk("Fale com #eGuon.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 35) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 35.#n");
			cm.dispose();
			}
	}
	if (selection == 6) {//PiramidePQ
		if ((cm.getLevel() >= 40)) {
			cm.sendOk("Fale com #eDuarte.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 40) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 40.#n");
			cm.dispose();
			}
	}
	if (selection == 7) {
		if ((cm.getLevel() >= 70)) {//BalrogPQ
			cm.sendOk("Fale com #eMu Young.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 70) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 70.#n");
			cm.dispose();
			}
	}
	if (selection == 77) {
		if ((cm.getLevel() >= 77)) {//Missão Maple
			cm.sendOk("Fale com #eMad Bunny.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 77) {
			cm.sendOk("Lamento, mas esta missão requer no minimo #elevel 77.#n");
			cm.dispose();
			}
	}
	if (selection == 8) {//Dojo
		if ((cm.getLevel() >= 25)) {
			cm.warp(925020000);
			cm.dispose();
			}
			else if (!cm.getLevel() <= 25) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 25.#n");
			cm.dispose();
			}
	}
	/*if (selection == 9) {//Natal
		if ((cm.getLevel() >= 10)) {
			cm.warp(209000000);
			cm.dispose();
			}
			else if (!cm.getLevel() <= 10) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 10.#n");
			cm.dispose();
			}
	}
        */
	if (selection == 100) {
		if ((cm.getLevel() >= 10)) {//GPQ
			cm.warp(101030104);
			cm.dispose();
			}
			else if (!cm.getLevel() <= 10) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 10.#n");
			cm.dispose();
			}
	}
	if (selection == 110) {
		if ((cm.getLevel() >= 30)) {//InvasaoPQ
			cm.sendOk("Fale com #eSpindle.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 30) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 10.#n");
			cm.dispose();
			}
	}
	if (selection == 40) {
		if ((cm.getLevel() >= 40)) {//AmoriaPQ
			cm.warp(670010000);
			cm.dispose();
			}
			else if (!cm.getLevel() <= 40) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 40.#n");
			cm.dispose();
			}
	}
	if (selection == 555) {
		if ((cm.getLevel() >= 100)) {//NavioPQ
			cm.sendOk("Fale com #eCasey.#n");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 100) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 100.#n");
			cm.dispose();
			}
	}
        /*
	if (selection == 147) {
		if ((cm.getLevel() >= 10)) {//Rico Dourado
			cm.warp(390009999);
			cm.sendOk("A missao #bRico Dourado#k nao esta concluida.\r\nConclusao: 28/01");
			cm.dispose();
			}
			else if (!cm.getLevel() <= 10) {
			cm.sendOk("Lamento, mas esta missao requer no minimo #elevel 10.#n");
			cm.dispose();
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
cm.sendOk("Olá #h #, tudo bem?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}

