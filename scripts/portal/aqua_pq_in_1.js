function enter(pi) {
	pi.warp(230040000, 0);
	pi.getPlayer().getClient().getSession().write(Packages.tools.MaplePacketCreator.musicChange("Bgm12/AquaCave"));
	return true;
}