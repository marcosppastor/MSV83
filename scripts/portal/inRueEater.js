function enter(pi) {
    if (pi.isQuestStarted(23970)) {
	pi.forceCompleteQuest(23970);
	pi.playerMessage("Quest complete.");
    }
}