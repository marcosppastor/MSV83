/*
 * This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Ludibirum Maze PQ
-- By ---------------------------------------------------------------------------------------------
	Stereo
-- Version Info -----------------------------------------------------------------------------------
	1.1 - fixed minor problems
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

/*
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300001,4001007,5);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300000,4001008,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300002,4001008,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300003,4001008,1);
*/

importPackage(Packages.world);
importPackage(Packages.server.life);
importPackage(Packages.server);
importPackage(Packages.server.maps);
importPackage(Packages.tools);
importPackage(Packages.client);

var exitMap;
var allowMapChange = true;
var minPlayers = 3;

var stage = 0;
var wave = 0;

var stages = [[
[8200001, 8142000, 8141100], //wave1
[8150200, 9400579, 8150100], //wave2
[9400574, 8140701, 8200002], //wave3
[8141300, 8150300, 8143000], //wave4
[6130101, 6300005]], //wave5

[[8150301, 8200004, 8150101], //wave1
[8150201, 8200005, 8200006], //wave2
[9300079, 8190003, 8200008], //wave3
[8200010, 8200011, 8200012], //wave4
[9300354, 8200011, 8190002]]]; //wave5        //3-dimensional arrays, get me!

var numToSpawn = 15; //number of each monster per wave

var bossid = Array(9400594, 8180001, 8180000, 9420549, 9420544, 9400575);   //can just rip the code from OPQ for this
var bossnames = Array("Master Guardian", "Griffey", "Manon", "Furious Scarlion", "Furious Targa", "Bigfoot");
var bossStage = 0;
var monsterdelay = 5000;
var testRun = true;

var finalboss = 8800002; //zakum 3rd body

var mapIds = Array(270040000, 270040100, 270050000, 270050100);

var mapBoundX1 = Array(-1499, -1500, -1005, -3);
var mapBoundX2 = Array(1642, 234, -329, -3);
var mapBoundY = Array(-41, -41, -41, -42);

var npcX = Array(-1279, -1230, -1307, -828);
var npcY = Array(-41, -41, -41, -42);


function init() { // Initial loading.
    exitMap = em.getChannelServer().getMapFactory().getMap(270030411);
    em.setProperty("TTPQOpen", "true"); // allows entrance.
    em.setProperty("shuffleReactors", "true");
    instanceId = 1;
}

function monsterValue(eim, mobId) { // Killed monster.
    var map = getMap(eim, stage);
    
    if(map.getSpawnedMonstersOnMap() == 0)
    {
       if(stage < 2)
       {
          map.broadcastMessage(MaplePacketCreator.serverNotice(6, "[PQ] " + "Congratulations on defeating wave " + (wave + 1) + " of stage " + (stage + 1) + "!")); 
          waveEnd(eim);
       } else if (stage == 2) {
         map.broadcastMessage(MaplePacketCreator.serverNotice(6, "[PQ] " + "Congratulations on defeating " + bossnames[bossStage -1] + " !"));
         eim.schedule("spawnNextBoss", monsterdelay);
       } else if (stage == 3) {
         finishEvent(eim);
       }
    }
    return 1;
}

function setup() {
    var eim = em.newInstance("TTPQ");
    var eventTime = 30 * (1000 * 60);
    var p;

    stage = 0;
    wave = 0;
    bossStage = 0;

    var map = getMap(eim, stage);
    killPortals(eim, map);
    spawnNPC(eim, 2141002, npcX[stage], npcY[stage], map);
    map.toggleDrops();

    em.schedule("timeOut", eim, eventTime); // invokes "timeOut" in how ever many seconds.
    eim.startEventTimer(eventTime); // Sends a clock packet and tags a timer to the players.
    eim.setProperty("pqFinished", "false");
    eim.setProperty("stage", 0);
    eim.setProperty("enforceParty", "true");
    if(testRun)
    {
      numToSpawn = 1;
    }
    return eim;
}

function playerEntry(eim, player) {

    player.changeMap(getMap(eim, stage), getMap(eim, stage).getPortal(0));
    player.setallowedMapChange(false);
   // spawnWave(eim); // this is now started by NPC
}

function playerDead(eim, player) {
}


function playerRevive(eim, player) { // player presses ok on the death pop up.
    player.setallowedMapChange(true);
    if (((eim.isLeader(player)) || (party.size() <= minPlayers)) && (eim.getProperty("enforceParty").equals("true"))) { // Check for party leader
        warpPartyOut(eim);
        dispose(eim);
    } else
        playerExit(eim, player);
}

function playerDisconnected(eim, player) {
    var party = eim.getPlayers();
    if (((eim.isLeader(player)) || (party.size() < minPlayers)) && (eim.getProperty("enforceParty").equals("true"))) {
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++)
            if (party.get(i).equals(player))
                removePlayer(eim, player);
            else
                playerExit(eim, party.get(i));
        dispose(eim);
    } else
        removePlayer(eim, player);
}

function leftParty(eim, player) {
    var party = eim.getPlayers();
    if ((party.size() < minPlayers) && (eim.getProperty("enforceParty").equals("true"))) {
        warpPartyOut(eim);
        dispose(eim);
    } else
        playerExit(eim, player);
}

function disbandParty(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.setallowedMapChange(true);
    player.changeMap(exitMap, exitMap.getPortal(0));
}

function removePlayer(eim, player) {  //for disconnected peeps / peeps who have left
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setallowedMapChange(true);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++)
        playerExit(eim, party.get(i));
    eim.dispose();
}

function allMonstersDead(eim) {
}

function cancelSchedule() {
}

function playerMapChange(eim, player) {
         return player.allowedMapChange();
}

function dispose() {
    em.schedule("OpenTTPQ", 5000); // 5 seconds ?
}

function OpenTTPQ() {
    em.setProperty("TTPQOpen", "true");
}

function timeOut(eim) {
    if (eim != null) {
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext())
                playerExit(eim, pIter.next());
        }
        stage = 0;
        wave = 0;
        eim.dispose();
    }
}

function spawnNextBoss(eim) {
  eim.setProperty("roundStarted", "true");
  var map = getMap(eim, stage);
       if (bossStage > bossid.length - 1)   //arrays start at 0, length starts at 1
       {
          map.broadcastMessage(MaplePacketCreator.serverNotice(6, "[PQ] " + "Congratulations on beating the boss stage! Next up... ZAKUM!"));
          stage++;
          eim.setProperty("stage", stage);
          warpToNextStage(eim);
          return;
       }
         var mob = MapleLifeFactory.getMonster(bossid[bossStage]);
         if(testRun)
         {
         var overrideStats = new MapleMonsterStats();
    //     if (bosshp[stage] == -1) {
      //      bosshp[stage] = mob.getHp();
        // }
         overrideStats.setExp(mob.getExp());  // exp directly proportional to ratio of orig & nerfed HPs
	 overrideStats.setHp(1);
	 overrideStats.setMp(mob.getMaxMp());
         mob.setOverrideStats(overrideStats);   }
	 eim.registerMonster(mob);
         var map = getMap(eim, stage);
         map.spawnMonsterOnGroudBelow(mob, new java.awt.Point(randX(), mapBoundY[stage]));
         bossStage++;
    }

  function finishEvent(eim) {
    var map = getMap(eim, stage);
    map.broadcastMessage(MaplePacketCreator.serverNotice(6, "[PQ] " + "Congratulations - you've finished the PQ! Talk to the NPC to claim your prize!"));
    eim.setProperty("pqFinished", "true");
    eim.setProperty("enforceParty", "false");
  }

  function contains(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}

function getMap(eim, stage)
{
      return eim.getMapInstance(mapIds[stage], true);
}

function getMapFromID(eim, id)
{
      return eim.getMapInstance(id, true);
}


function spawnNPC(eim, npcId, x, y, map)
{
   var point = new java.awt.Point(x, y);
  // var map = getMap(eim);
   var npc = MapleLifeFactory.getNPC(npcId);
            if (npc != null) {
                npc.setPosition(point);
                npc.setCy(y);
                npc.setRx0(x);
                npc.setRx1(x);
                npc.setFh(map.getFootholds().findBelow(point).getId());
                map.addMapObject(npc);
                map.broadcastMessage(MaplePacketCreator.spawnNPC(npc));
            }
}

function waveEnd(eim)
{
  var map = getMap(eim, stage);
   wave++;
   if(wave > stages[stage].length - 1) //completed a stage
   {
     map.broadcastMessage(MaplePacketCreator.serverNotice(6, "[PQ] " + "Congratulations on completing stage " + (stage +1) + "! You will be warped to the next stage in 5 seconds."));
     stage++;
     eim.setProperty("stage", stage);
     eim.schedule("warpToNextStage", 5000);
   } else {
     map.broadcastMessage(MaplePacketCreator.serverNotice(6, "[PQ] " + "The next wave will be spawned in 5 seconds."));
     eim.schedule("spawnWave", 5000);
   }
}


function spawnWave(eim)
{
  eim.setProperty("roundStarted", "true");
  var map = getMap(eim, stage);
  for (var x = 0; x < stages[stage][wave].length; x++)
  {
         for (var y = 0; y < numToSpawn; y++) {
        	    var mob = MapleLifeFactory.getMonster(stages[stage][wave][x]);
        		var overrideStats = new MapleMonsterStats();
        		overrideStats.setHp(mob.getHp() * 3);
        		overrideStats.setExp(mob.getExp() / 3);
        		overrideStats.setMp(mob.getMaxMp());
        		mob.setOverrideStats(overrideStats);
        		mob.setHp(mob.getHp() * 3);
       		    eim.registerMonster(mob);
                    map.spawnMonsterOnGroudBelow(mob, new java.awt.Point(randX(), mapBoundY[stage]));
                }
  }
}


function warpToNextStage(eim)
{
    eim.setProperty("roundStarted", "false");
    wave = 0;
    var map = getMap(eim, stage);

 //   spawnNPC(eim, 2043000, -155, 1779, map);
    spawnNPC(eim, 2141002, npcX[stage], npcY[stage], map);

    killPortals(eim, map);
    map.toggleDrops();

    var pIter = eim.getPlayers().iterator();
        while (pIter.hasNext()) {
                player = pIter.next();
                player.setallowedMapChange(true);
                player.changeMap(map, map.getPortal(0));
                player.setallowedMapChange(false);
        }
   /* if(stage < 2)
         spawnWave(eim);
    else if(stage == 2)
         spawnNextBoss(eim);  */
}

function randX() {
//	return mapBoundX1[stage] + (Math.floor(Math.random() * Math.abs(mapBoundX2[stage]))) - ;
return Math.floor(Math.random() * (mapBoundX2[stage]-mapBoundX1[stage]+1)) + mapBoundX1[stage];
}


function killPortals(eim, map)
{
      var iter = map.getPortals().iterator();    //kills the portals
    	while (iter.hasNext()) {
    		var p = iter.next();
                p.setScriptName("omPQ");
	}
}

function spawnFinalBoss(eim)
{
  eim.setProperty("roundStarted", "true");
   var mob = MapleLifeFactory.getMonster(finalboss);
         if(testRun)
         {
         var overrideStats = new MapleMonsterStats();
    //     if (bosshp[stage] == -1) {
      //      bosshp[stage] = mob.getHp();
        // }
         overrideStats.setExp(mob.getExp());  // exp directly proportional to ratio of orig & nerfed HPs
	 overrideStats.setHp(1);
	 overrideStats.setMp(mob.getMaxMp());
         mob.setOverrideStats(overrideStats);   
         }
	 eim.registerMonster(mob);
         var map = getMap(eim, stage);
         map.spawnMonsterOnGroudBelow(mob, new java.awt.Point(randX(), mapBoundY[stage]));
}
/*
mapbounds

270040000
-1499 / -41
1642 / -41

270040100
-1905 / -41
-185 / -41

270050000
-1005 / -41
-329 / -41

270050100
-3/-42

*/
