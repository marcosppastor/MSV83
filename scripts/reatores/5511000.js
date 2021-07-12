/* @Author SharpAceX
* 5511000.js: Summons Targa.
*/

function act() {
	if (rm.getReactor().getMap().getMonsterById(9420542) == null) {
		rm.spawnMonster(9420542,-527,637);
		rm.changeMusic("Bgm09/TimeAttack");
		rm.mapMessage(6, "Tenha cuidado! O Furioso Targa acaba de aparecer.");
	}
}