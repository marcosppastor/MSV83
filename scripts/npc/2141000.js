/*
 * Time Temple - Kirston
 * Twilight of the Gods
 */

function start() {
    cm.sendYesNo("If only I had the Mirror of Goodness then I can re-summon the Black Wizard! \r\nWait! something's not right! Why is the Black Wizard not summoned? Wait, what's this force? I feel something... totally different from the Black Wizard Ahhhhh!!!!! \r\n\r\n #b(Places a hand on the shoulder of Kryston.)");
}

function action(m, t, s) {
    if (m > 0) {
		//cm.resetMap(270050100);
		cm.forceStartReactor(270050100, 2709000);
		//cm.spawnMonster(8820008);
    }
    cm.dispose();
}