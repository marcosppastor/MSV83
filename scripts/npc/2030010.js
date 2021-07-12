/* Amon
 * 
 * @Author Stereo
 * Adobis's Mission I : Breath of Lava <Level 1> (280020000)
 * Adobis's Mission I : Breath of Lava <Level 2> (280020001)
 * Last Mission : Zakum's Altar (280030000)
 * Zakum Quest NPC 
 * Helps players leave the map
 */
 
function start() {
    cm.sendYesNo("Caso você saia agora, não poderá voltar depois.\r\nVocê realmente deseja sair?");
}
 
function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        if (cm.getPlayer().getMap().getCharacters().size() < 1){
            cm.getPlayer().getMap().killAllMonsters();
            cm.getPlayer().getMap().resetReactors();
        }
        if (cm.getPlayer().getEventInstance() != null)
            cm.getPlayer().getEventInstance().removePlayer(cm.getPlayer());
        else
            cm.warp(211042300);
        cm.dispose();
    }
}