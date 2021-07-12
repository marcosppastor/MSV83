/* Lira - Zakum Jump Quest NPC 
 * @author Manfred
 * For use with Zakum PQ.
 */
 
//4031062 - Breath of lava

var status = 0;
var nomeServer = "Pelo zakum";

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("Está bem. Parece que você não quer tentar a #r Sopro de lava #k...");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("#b" + nomeServer + "#k! Você terminou o desafio mais duradouro de #rAdobis#k ! Uhhhhh ... quer o #rSopro de Lava #k?");
		} else if (status == 1) {
			cm.gainItem(4031062, 1);
			cm.getPlayer().saveToDB();
			cm.warp(211042300, 0);
			cm.dispose();
		}
	}
}