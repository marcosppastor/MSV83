var server = "OrbisMS";
var status;
var min = 2;
var max = 6;

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
    var party = cm.partyMembersInMap();
    var open = true;
    var players = cm.getPlayerCount(980000100);
    if (status == 0) {
    if (cm.getMapId()==100000000) {
        if (cm.getLevel() < 50 || cm.getLevel() > 30) {
            cm.sendOk("You are not eligible for #rCustom CPQ#k. It is available only for levels #r30-50#k.");
            cm.dispose();
    } else {
        cm.sendYesNo("Would you like to go to #bCPQ#k?");
    }
    } else if (cm.getMapId()!=980000000) {
            cm.sendOk("Hey, you can start #bCPQ#k with me in Kerning City.");
            cm.dispose();
    } else if (cm.getParty() == null) {
        cm.sendNext("Hey! Welcome to the #rCustom Monster Carnival#k of #d"+server+"#k.");
    } else if (!cm.isLeader()) {
        cm.sendOk("You are not the leader. Please have the leader speak to me to initiate the #rMonster Carnival#k.");
        cm.dispose();
    } else {
        cm.sendYesNo("Good. Your party is ready. Have you spoken to another party's leader and decided upon the map you wish to take on?");
    } 
    } else if (status == 1) {
    if (cm.getMapId()==100000000) {
        cm.warp(980000000);
        cm.dispose();
    } else if (cm.getParty() == null) {
        cm.sendNext("In this #rMonster Carnival#k, you will need #b2#k parties. You can find some at the lobby and speak to each party's leaders for a match to be set up.");
    } else {
        cm.sendSimple("Choose from the maps. You must have the correct number of players according to each map.\r\n\r\n#L0#Map 0 - #L1#Map 0 Challenger#b (2 - 4 players only)#k\r\n#L2#Map 1 - #L3#Map 1 Challenger #b(2 - 4 players only)#k\r\n#L4#Map 2 - #L5#Map 2 Challenger #b(3 - 6 players only)#k #e"+
        "UNAVAILABLE#n");
    }
    } else if (status == 2) {
    var party = cm.partyMembersInMap();
     if (cm.getParty() == null) {
        cm.sendNext("Each party will choose what map they wish to be on. When choosing a map, the selection adjacent to it is the map in which the opposite party will be in.\r\n\r\n#bExample: #k#bMap 1#k - 1st Party : #bMap 2#k - 2nd Party");
    } else if (selection == 0 && cm.getPlayerCount(980000100) < 1 && party >= 2 && party <= 4) {
        cm.warpParty(980000100);
        cm.dispose();
    } else if (selection == 1 && cm.getPlayerCount(980000200) < 1 && party >= 2 && party <= 4) {
        cm.warpParty(980000200);
        cm.dispose();
    } else if (selection == 2 && cm.getPlayerCount(980000400) < 1 && party >= 2 && party <= 4) {
        cm.warpParty(980000400);
        cm.dispose();
    } else if (selection == 3 && cm.getPlayerCount(980000300) < 1 && party >= 2 && party <= 4) {
        cm.warpParty(980000300);
        cm.dispose();
    } else if (selection == 4 && cm.getPlayerCount(980000500) < 1 && party >= 3 && party <= 6) {
        cm.warpParty(980000500);
        cm.dispose();
    } else if (selection == 5 && cm.getPlayerCount(980000600) < 1 && party >= 3 && party <= 6) {
        cm.warpParty(980000600);
        cm.dispose();
    } else {
        cm.sendOk("There is already a party inside participating in the #rPQ#k, or the number of people in your party are incorrect for this map.");
        cm.dispose();
    }
    } else if (status == 3) {
    if (cm.getParty() == null) {
        cm.sendOk("A large group of monsters will spawn for both maps. Players must eliminate the horde of monsters as fast as they can. The monsters will drop a certain item used for spawning monsters to your opponent's map. Whoever kills all monsters on the map first wins.");
        cm.dispose();
            }
        }
    }  