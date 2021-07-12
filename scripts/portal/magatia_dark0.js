function enter(pi) {
    if (pi.isQuestStarted(3309)) {
	pi.forceCompleteQuest(3309);
	pi.playerMessage("Quest complete.");
    }
    pi.warp(261020700,0);
}