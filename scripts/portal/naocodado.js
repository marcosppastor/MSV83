function action(mode, type, selection) {
	if (cm.getNpc() >= 9901000) {
		cm.sendNext("Hello #h0#, I am in the Hall of Fame for reaching LEVEL 200.");
	} else {
		cm.sendNext("Hello #h #, how are you?\r\n#bRecommends a function for me? If you have, send this using @bug command, please!");
	}
	cm.safeDispose();
}