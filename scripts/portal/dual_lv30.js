function enter(pi) {
    if (pi.getPlayer().getLevel() >= 30) {
	pi.warp(103050370,0);
    } else {
	pi.playerMessage(5, "You must be level 30.");
    }
}