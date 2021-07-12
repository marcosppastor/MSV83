/*
 * @Author:     Eric
 * Map(s):     Khaos
 * Function:   Khaos Boss Spawning NPC
*/
load("nashorn:mozilla_compat.js");

importPackage(Packages.server.life); //??
importPackage(Packages.tools); //??
importPackage(Packages.scripting.npc); //NPC Direct Package(?)

 function start(ms) {
    ms.getPlayer().resetEnteredScript();
    
}