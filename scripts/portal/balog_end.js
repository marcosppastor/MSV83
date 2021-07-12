function enter(pi) {
	if (!pi.canHold(4001261,1)) {
		pi.playerMessage(5, "Tenha um slot no ETC livre.");
		return false;
	}
	pi.gainExpR(pi.getPlayer().getMapId() == 105100301 ? 130000 : 260000);
	pi.gainNX(pi.getPlayer().getMapId() == 105100301 ? 2000 : 3000);
	pi.gainItem(4001261,1);
	pi.warp(105100100,0);
}