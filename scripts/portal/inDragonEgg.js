/*
 * @author Marcos P
 * TrueMS - 2017
 * truems.net.br/
*/

function enter(pi) {
	if(pi.haveItem(4032452, 1)) {
		pi.warp(100030310);
		pi.playerMessage(5, "Evite matar monstros durante a conclusao da missao.");
	} else {
		pi.playerMessage(5, "Voce nao pode entrar na Lush Forest pois nao possui uma palha.");
	}
	return true;
}