    /*
    @Author: VERO/Tronic of NosterStory/MapleTalk.
    @Name: BossPQ Easy Mode NPC.
    @Location: Monster Carnival 1:Exit
    */
     
    importPackage(net.server.life);
    importPackage(net.tools);
     
    var exitMap;
    var instanceId;
    var monster = new Array(
                    2220000, // Mano
                    3220000, // Stumpy
                    9300187, // King Slime
                    5220002, // Faust
                    5220004, // Giant Centipide
                    5220003, // Timer
                    6220000, // Dyle
                    6300005, // Zombie Mushmom
                    7220001, // Old Fox
                    8130100, // Jr. Balrog
                    9300182, // Poison Golem2
                    8220001, // Snowman
                    8220007, // Blue Mushmom
                    9420513, // Capt. Latanica
                    8180000 // Manon
    );
     
    function init() {
    }
     
    function monsterValue(eim, mobId) {
            return 1;
    }
     
    function setup(partyid) {
            exitMap = em.getChannelServer().getMapFactory().getMap(103000000);
            var instanceName = "BossQuest1" + partyid;
     
            var eim = em.newInstance(instanceName);
            var mf = eim.getMapFactory();
            var map = mf.getMap(541010100, false, true, false, true);
            map.toggleDrops();
     
            eim.setProperty("points", 0);
            eim.setProperty("monster_number", 0);
     
            eim.schedule("beginQuest", 5000);
            return eim;
    }
     
    function playerEntry(eim, player) {
            var map = eim.getMapInstance(541010100);
            player.changeMap(map, map.getPortal(0));
    }
     
    function playerDead(eim, player) {
    }
     
    function playerRevive(eim, player) {
            player.setHp(player.getMaxHp());
            playerExit(eim, player);
            return false;
    }
     
    function playerDisconnected(eim, player) {
            removePlayer(eim, player);
    }
     
    function leftParty(eim, player) {
            playerExit(eim, player);
    }
     
    function disbandParty(eim) {
            var party = eim.getPlayers();
            for (var i = 0; i < party.size(); i++) {
                    playerExit(eim, party.get(i));
            }
    }
     
    function playerExit(eim, player) {
            var party = eim.getPlayers();
            var dispose = false;
            if (party.size() == 1) {
                    dispose = true;
            }
            eim.saveBossQuestPoints(parseInt(eim.getProperty("points")), player);
            player.getClient().getSession().write(MaplePacketCreator.serverNotice(6, "[Boss Quest] Your current points have been awarded, spend them as you wish!"));
            eim.unregisterPlayer(player);
            player.changeMap(exitMap, exitMap.getPortal(0));
            if (dispose) {
                    eim.dispose();
            }
    }
     
    function removePlayer(eim, player) {
            var party = eim.getPlayers();
            var dispose = false;
            if (party.size() == 1) {
                    dispose = true;
            }
            eim.saveBossQuestPoints(parseInt(eim.getProperty("points")), player);
            eim.unregisterPlayer(player);
            player.getMap().removePlayer(player);
            player.setMap(exitMap);
            if (dispose) {
                    eim.dispose();
            }
    }
     
    function clearPQ(eim) {
            var party = eim.getPlayers();
            for (var i = 0; i < party.size(); i++) {
                    playerExit(eim, party.get(i));
            }
    }
     
    function allMonstersDead(eim) {
            var monster_number = eim.getProperty("monster_number");
            var points = parseInt(eim.getProperty("points"));
     
            // var monster_end = java.lang.System.currentTimeMillis();
            // var monster_time = Math.round((monster_end - parseInt(eim.getProperty("monster_start"))) / 1000);
            if (monster[monster_number] == 2220000) { // Mano BOSS POINT RATE STARTS HERE
                    points += 5;
            } else if (monster[monster_number] == 3220000) { // Stumpy             
                    points += 8;
            } else if (monster[monster_number] == 9300187) { // King Slime                         
                    points += 10;
            } else if (monster[monster_number] == 5220002) { // Faust
                    points += 15;
            } else if (monster[monster_number] == 5220004) { // Giant Centipide
                    points += 17;
            } else if (monster[monster_number] == 5220003) { // Timer
                    points += 20;
            } else if (monster[monster_number] == 6220000) { // Dyle
                    points += 25
            } else if (monster[monster_number] == 6300005) { // Zombie Mushmom
                    points += 35;
            } else if (monster[monster_number] == 7220001) { // Old Fox
                    points += 45;
            } else if (monster[monster_number] == 8130100) { // Jr. Balrog
                    points += 55;
            } else if (monster[monster_number] == 9300182) { // Poison Golem2
                    points += 80;
            } else if (monster[monster_number] == 8220001) { // Snowman
                    points += 100;
            } else if (monster[monster_number] == 8220007) { // Blue Mushmom
                    points += 150;
            } else if (monster[monster_number] == 9420513) { // Capt. Latanica
                    points += 250;
            } else if (monster[monster_number] == 8180000) { // Manon
                    points += 500;
            }
                    // Total points is 1345
     
            monster_number++;
     
            eim.setProperty("points", points);
            eim.setProperty("monster_number", monster_number);
     
            var map = eim.getMapInstance(541010100);
     
            if (monster_number > 14) {
                    var party = eim.getPlayers();
                    for (var i = 0; i < party.size(); i++) {
                            party.get(i).finishAchievement(39);
                    }
                    map.broadcastMessage(MaplePacketCreator.serverNotice(6, "[Boss Quest] Congratulations! Your team has succesfully beaten 'Easy' mode mode with the maximum amount of " + points + " points!"));
                    map.broadcastMessage(MaplePacketCreator.serverNotice(6, "All of the points have been awarded, spend them as you wish at the Warrior Statue!"));
                    disbandParty(eim);
            } else {
                    map.broadcastMessage(MaplePacketCreator.serverNotice(6, "[Boss Quest] Your team now has " + points + " points! Stay focused as the next boss will spawn in 10 seconds!"));
                    map.broadcastMessage(MaplePacketCreator.getClock(10));
                    eim.schedule("monsterSpawn", 10000);
            }
    }
     
    function monsterSpawn(eim) {
            var mob = MapleLifeFactory.getMonster(monster[parseInt(eim.getProperty("monster_number"))]);
            var overrideStats = new MapleMonsterStats();
     
            if (parseInt(eim.getProperty("monster_number")) < 13)
                    overrideStats.setHp(mob.getHp() * 10);
            else
                    overrideStats.setHp(mob.getHp() * 2);
     
            overrideStats.setExp(mob.getExp());
            overrideStats.setMp(mob.getMaxMp());
            mob.setOverrideStats(overrideStats);
     
            if (parseInt(eim.getProperty("monster_number")) < 13)
                    mob.setHp(Math.floor(mob.getHp() * 10));
            else
                    mob.setHp(Math.floor(mob.getHp() * 2));
     
            eim.registerMonster(mob);
     
            var map = eim.getMapInstance(541010100);
            map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-148, 255));
            eim.setProperty("monster_start", java.lang.System.currentTimeMillis());
    }
     
    function beginQuest(eim) {
            var map = eim.getMapInstance(541010100);
            map.broadcastMessage(MaplePacketCreator.serverNotice(6, "[Boss Quest] The strongest creatures of the darkness are coming in 30 seconds. Prepare for the 'Easy' mode!"));
            map.broadcastMessage(MaplePacketCreator.musicChange("BgmGL/PartyQuestGL"));
            eim.schedule("monsterSpawn", 30000);
            map.broadcastMessage(MaplePacketCreator.getClock(30));
    }
     
    function cancelSchedule() {
    }
