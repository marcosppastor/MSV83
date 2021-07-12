function enter(pi) {
    if (!pi.haveItem(4032246)) {
	pi.playerMessage(5, "Voce nao possui um Spirit of Fantasy Theme Park.");
    } else {
	pi.openNpc(9270047);
    }
}