function enter(pi) {
    if (pi.isQuestFinished(24002) && !pi.isQuestStarted(24093)) {
		pi.openNpc(1033205);
	} else {
		pi.warp(101050100,0);
	}
}