function enter(pi) {
    if (pi.isQuestStarted(31144)) {
	pi.forceCompleteQuest(31144);
	pi.playerMessage("Quest complete");
    }
}