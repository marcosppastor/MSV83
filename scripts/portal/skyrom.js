function enter(pi) {
    if (pi.isQuestStarted(3935)) {
	pi.forceCompleteQuest(3935);
	pi.playerMessage("Quest complete.");
    }
}