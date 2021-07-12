function enter(pi) {
    if (pi.isQuestStarted(3164)) {
	pi.forceCompleteQuest(3164);
	pi.playerMessage("Quest complete.");
    }
    pi.warp(211060201,0);
}