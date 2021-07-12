/*Map: Monster Carnival Room 4 Lobby: mapt*/
/*
var status;
var min = 2;
var max = 6;
var coin = 4001129;
var shiny = 4001254;
var map = 980000500;
var mapt = 980000600;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
    }
        if (mode == 0) {
            cm.sendOk("Come back later then.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
    if (status == 0) {
    var party = cm.partyMembersInMap();
    var mob = cm.getMonsterCount(mapt);
    var mobt = cm.getMonsterCount(map);
    var yours = cm.getMapId();
    var your = cm.getMonsterCount(yours);
    if (cm.getParty() == null) {
        cm.warp(100000000);
        cm.sendOk("You have been warped out due to not being in a party.");
        cm.dispose();
    } else if (cm.isLeader() && cm.getMapId()==mapt && cm.itemQuantity(4001254) < 1 && cm.getPlayerCount(map) < 1) {
        cm.sendOk("You must wait for the other party to join their map before summoning the first wave of monsters to kill for #rMaple Coins#k.");
        cm.dispose();
    } else if (cm.isLeader() && cm.getMapId()==mapt && cm.itemQuantity(4001254) < 1 && cm.getPlayerCount(map) >= 1) {
        cm.sendOk("You have received a #rShiny Maple Coin#k. It will let me know your progress in the CPQ. The monsters have spawned.");
        cm.summonMobAtPosition(9300133,3,-111,162);
        cm.summonMobAtPosition(9300136,3,231,162);
        cm.summonMobAtPosition(9300136,3,36,162);
        cm.summonMobAtPosition(9300133,3,185,162);
        cm.summonMobAtPosition(9300136,3,295,-138);
        cm.summonMobAtPosition(9300133,3,115,-138);
        cm.gainItem(4001254);
        cm.dispose();
    } else if (cm.isLeader() && cm.getMapId()==map && cm.itemQuantity(4001254) < 1 && cm.getPlayerCount(mapt) < 1) {
        cm.sendOk("You must wait for the other party to join their map before summoning the first wave of monsters to kill for #rMaple Coins#k.");
        cm.dispose();
    } else if (cm.isLeader() && cm.getMapId()==map && cm.itemQuantity(4001254) < 1 && cm.getPlayerCount(mapt) >= 1) {
        cm.sendOk("You have received a #rShiny Maple Coin#k. It will let me know your progress in the CPQ. The monsters have spawned.");
        cm.summonMobAtPosition(9300133,3,-111,162);
        cm.summonMobAtPosition(9300136,3,231,162);
        cm.summonMobAtPosition(9300136,3,36,162);
        cm.summonMobAtPosition(9300133,3,185,162);
        cm.summonMobAtPosition(9300136,3,295,-138);
        cm.summonMobAtPosition(9300133,3,115,-138);
        cm.gainItem(4001254);
        cm.dispose();
    } else if (cm.getMapId()==map && cm.getPlayerCount(mapt) >= 1 && cm.getMonsterCount(map) < 1) {
        cm.warpParty(980000503);
        cm.mapMessage(6,"[CPQ Assistant] Congratulations on winning! Spiegelmann is waiting for you.");
        cm.resetMap(map);
        cm.resetMap(mapt);
        cm.dispose();
    } else if (cm.getMapId()==map && cm.getPlayerCount(mapt) < 1) {
        cm.warpParty(980000504);
        cm.resetMap(map);
        cm.resetMap(mapt);
        cm.mapMessage(6,"[CPQ Assistant] Aww! You have lost the CPQ. You can try again another time! Talk to Spiegelmann for a small reward for your efforts.");
        cm.dispose();
    } else if (cm.getMapId()==mapt && cm.getPlayerCount(map) >= 1 && cm.getMonsterCount(mapt) < 1) {
        cm.warpParty(980000503);
        cm.resetMap(map);
        cm.resetMap(mapt);
        cm.mapMessage(6,"[CPQ Assistant] Congratulations on winning! Spiegelmann is waiting for you.");
        cm.dispose();
    } else if (cm.getMapId()==mapt && cm.getPlayerCount(map) < 1) {
        cm.warpParty(980000504);
        cm.resetMap(map);
        cm.resetMap(mapt);
        cm.mapMessage(6,"[CPQ Assistant] Aww! You have lost the CPQ. You can try again another time! Talk to Spiegelmann for a small reward for your efforts.");
        cm.dispose();
    } else if (cm.getMonsterCount(mapt) >= 60 || cm.getMonsterCount(map) >= 60) {
        cm.sendOk("The other map currently has over #r60#k monsters in their map. Please don't over summon them.\r\n\r\nYour map currently has #b"+your+"#k monster(s).");
        cm.dispose();
    } else if (cm.getPlayerCount(mapt) >= 1 || cm.getPlayerCount(map) >= 1) {
        cm.sendSimple("You brought some #i4001129# ... well pick what you want to summon." +
                 "#k\r\n#L0#Brown Teddy            2 #i4001129# |" +
                 "#k#L1#Bloctopus               2 #i4001129#" +
                 "#k\r\n#L2#Ratz                            3 #i4001129# |" +
                 "#k#L3#Chronos                 3 #i4001129#" +
                 "#k\r\n#L4#Toy Trojan                 4 #i4001129# |" +
                 "#k#L5#Tick-Tock                4 #i4001129#" +
                 "#k\r\n#L6#Robo                         5 #i4001129# |" +
                 "#k#L7#King Block            5 #i4001129#" +
                 "#k\r\n#L8#Master Chronos      7 #i4001129# |" +
                 "#k#L9#Rombot                 10 #i4001129#");
            } else {
                cm.sendOk("Hey, what's up? I'm part of the #bCPQ#k team.");
                cm.dispose();
            }
    } else if (status == 1) {
    var name = cm.getName();
     if (selection == 0 && cm.itemQuantity(coin) >= 2 && cm.getMapId()==mapt) {
        cm.spawnMobOnDiffMap(map, 9300127, 7, -207, 162);
        cm.spawnMobOnDiffMap(map, 9300127, 7, 174, 162);
        cm.spawnMobOnDiffMap(map, 9300127, 7, 221, -138);
        cm.gainItem(coin,-2);
        cm.mapMessage(6,""+name+" has spawned 21 Brown Teddies on the opposing party's map.");
        cm.dispose();
    } else if (selection == 1 && cm.itemQuantity(coin) >= 2 && cm.getMapId()==mapt) {
        cm.spawnMobOnDiffMap(map, 9300128, 7, -207, 162);
        cm.spawnMobOnDiffMap(map, 9300128, 7, 221, -138);
        cm.spawnMobOnDiffMap(map, 9300128, 7, 232, 162);
        cm.gainItem(coin,-2);
        cm.mapMessage(6,""+name+" has spawned 21 Bloctopus on the opposing party's map.");
        cm.dispose();
    } else if (selection == 2 && cm.itemQuantity(coin) >= 3 && cm.getMapId()==mapt) {
        cm.spawnMobOnDiffMap(map, 9300129, 7, -207, 162);
        cm.spawnMobOnDiffMap(map, 9300129, 7, 221, -138);
        cm.spawnMobOnDiffMap(map, 9300129, 7, 232, 162);
        cm.gainItem(coin,-3);
        cm.mapMessage(6,""+name+" has spawned 21 Ratz on the opposing party's map.");
        cm.dispose();
    } else if (selection == 3 && cm.itemQuantity(coin) >= 3 && cm.getMapId()==mapt) {
        cm.spawnMobOnDiffMap(map, 9300130, 7, -207, 162);
        cm.spawnMobOnDiffMap(map, 9300130, 7, 221, -138);
        cm.spawnMobOnDiffMap(map, 9300130, 7, 232, 162);
        cm.gainItem(coin,-3);
        cm.mapMessage(6,""+name+" has spawned 21 Chronos on the opposing party's map.");
        cm.dispose();
    } else if (selection == 4 && cm.itemQuantity(coin) >= 4 && cm.getMapId()==mapt) {
        cm.spawnMobOnDiffMap(map, 9300131, 7, -207, 162);
        cm.spawnMobOnDiffMap(map, 9300131, 7, 221, -138);
        cm.spawnMobOnDiffMap(map, 9300131, 7, 232, 162);
        cm.gainItem(coin,-4);
        cm.mapMessage(6,""+name+" has spawned 21 Toy Trojans on the opposing party's map.");
        cm.dispose();
    } else if (selection == 5 && cm.itemQuantity(coin) >= 4 && cm.getMapId()==mapt) {
        cm.spawnMobOnDiffMap(map, 9300132, 7, -207, 162);
        cm.spawnMobOnDiffMap(map, 9300132, 7, 221, -138);
        cm.spawnMobOnDiffMap(map, 9300132, 7, 232, 162);
        cm.gainItem(coin,-4);
        cm.mapMessage(6,""+name+" has spawned 21 Tick-Tocks on the opposing party's map.");
        cm.dispose();
    } else if (selection == 6 && cm.itemQuantity(coin) >= 5 && cm.getMapId()==mapt) {
        cm.spawnMobOnDiffMap(mapt, 9300133, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300133, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300133, 7, 232, 162);
        cm.gainItem(coin,-5);
        cm.mapMessage(6,""+name+" has spawned 21 Robo on the opposing party's map.");
        cm.dispose();
    } else if (selection == 7 && cm.itemQuantity(coin) >= 5 && cm.getMapId()==mapt) {
        cm.spawnMobOnDiffMap(map, 9300134, 7, -207, 162);
        cm.spawnMobOnDiffMap(map, 9300134, 7, 221, -138);
        cm.spawnMobOnDiffMap(map, 9300134, 7, 232, 162);
        cm.gainItem(coin,-5);
        cm.mapMessage(6,""+name+" has spawned 21 King Block Golems on the opposing party's map.");
        cm.dispose();
    } else if (selection == 8 && cm.itemQuantity(coin) >= 7 && cm.getMapId()==mapt) {
        cm.spawnMobOnDiffMap(map, 9300135, 7, -207, 162);
        cm.spawnMobOnDiffMap(map, 9300135, 7, 221, -138);
        cm.spawnMobOnDiffMap(map, 9300135, 7, 232, 162);
        cm.gainItem(coin,-7);
        cm.mapMessage(6,""+name+" has spawned 21 Master Chronos on the opposing party's map.");
        cm.dispose();
    } else if (selection == 21 && cm.itemQuantity(coin) >= 10 && cm.getMapId()==mapt) {
        cm.spawnMobOnDiffMap(map, 9300136, 7, -207, 162);
        cm.spawnMobOnDiffMap(map, 9300136, 7, 221, -138);
        cm.spawnMobOnDiffMap(map, 9300136, 7, 232, 162);
        cm.gainItem(coin,-10);
        cm.mapMessage(6,""+name+" has spawned 21 Rombots on the opposing party's map.");
        cm.dispose();
    } else if (selection == 0 && cm.itemQuantity(coin) >= 2) {
        cm.spawnMobOnDiffMap(mapt, 9300127, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300127, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300127, 7, 232, 162);
        cm.gainItem(coin,-2);
        cm.mapMessage(6,""+name+" has spawned 21 Brown Teddies on the opposing party's map.");
        cm.dispose();
    } else if (selection == 1 && cm.itemQuantity(coin) >= 2) {
        cm.spawnMobOnDiffMap(mapt, 9300128, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300128, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300128, 7, 232, 162);
        cm.gainItem(coin,-2);
        cm.mapMessage(6,""+name+" has spawned 21 Bloctopus on the opposing party's map.");
        cm.dispose();
    } else if (selection == 2 && cm.itemQuantity(coin) >= 3) {
        cm.spawnMobOnDiffMap(mapt, 9300129, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300129, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300129, 7, 232, 162);
        cm.gainItem(coin,-3);
        cm.mapMessage(6,""+name+" has spawned 21 Ratz on the opposing party's map.");
        cm.dispose();
    } else if (selection == 3 && cm.itemQuantity(coin) >= 3) {
        cm.spawnMobOnDiffMap(mapt, 9300130, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300130, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300130, 7, 232, 162);
        cm.gainItem(coin,-3);
        cm.mapMessage(6,""+name+" has spawned 21 Chronos on the opposing party's map.");
        cm.dispose();
    } else if (selection == 4 && cm.itemQuantity(coin) >= 4) {
        cm.spawnMobOnDiffMap(mapt, 9300131, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300131, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300131, 7, 232, 162);
        cm.gainItem(coin,-4);
        cm.mapMessage(6,""+name+" has spawned 21 Toy Trojans on the opposing party's map.");
        cm.dispose();
    } else if (selection == 5 && cm.itemQuantity(coin) >= 4) {
        cm.spawnMobOnDiffMap(mapt, 9300132, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300132, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300132, 7, 232, 162);
        cm.gainItem(coin,-4);
        cm.mapMessage(6,""+name+" has spawned 21 Tick-Tocks on the opposing party's map.");
        cm.dispose();
    } else if (selection == 6 && cm.itemQuantity(coin) >= 5) {
        cm.spawnMobOnDiffMap(mapt, 9300133, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300133, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300133, 7, 232, 162);
        cm.gainItem(coin,-5);
        cm.mapMessage(6,""+name+" has spawned 21 Robo on the opposing party's map.");
        cm.dispose();
    } else if (selection == 7 && cm.itemQuantity(coin) >= 5) {
        cm.spawnMobOnDiffMap(mapt, 9300134, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300134, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300134, 7, 232, 162);
        cm.gainItem(coin,-5);
        cm.mapMessage(6,""+name+" has spawned 21 King Block Golems on the opposing party's map.");
        cm.dispose();
    } else if (selection == 8 && cm.itemQuantity(coin) >= 7) {
        cm.spawnMobOnDiffMap(mapt, 9300135, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300135, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300135, 7, 232, 162);
        cm.gainItem(coin,-7);
        cm.mapMessage(6,""+name+" has spawned 21 Master Chronos on the opposing party's map.");
        cm.dispose();
    } else if (selection == 21 && cm.itemQuantity(coin) >= 10) {
        cm.spawnMobOnDiffMap(mapt, 9300136, 7, -207, 162);
        cm.spawnMobOnDiffMap(mapt, 9300136, 7, 221, -138);
        cm.spawnMobOnDiffMap(mapt, 9300136, 7, 232, 162);
        cm.gainItem(coin,-10);
        cm.mapMessage(6,""+name+" has spawned 21 Rombots on the opposing party's map.");
        cm.dispose();
    } else {
        cm.sendOk("You do not have enough #rMaple Coins#k to summon the selected monster.");
        cm.dispose();
            }
        }
    }  
    
    */
   
   function start() {
//cm.gainItem()
cm.sendOk("Olá #h #, tudo bem, a CPQ está quase finalizada,muito em breve estará disponível!");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}