/**
 * @Auther XoticStory.
 * Clan NPC.
*/

var status;
var clan;

function start() {
    status = -1;
    action(1, 0, -1);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else if (mode == 0 && type == 0) {
        status--;
        selection = clan;
    } else {
        cm.dispose();
        return;
    }
    if (cm.getPlayer().getClan() == -1) {
        if (status == 0) {
            var text = "Hey there ! You need a clan to join before doing anything else in this game. ";
            text += "There are currently two clans that you can join.. #bBlue#k clan and #rRed#k Clan.\r\n\r\n";
            text += "#L0##b#fEffect/SetEff.img/14/effect/3#BLUE CLAN SECTION#k#l\r\n";
            text += "#L1##r#fEffect/SetEff.img/15/effect/3#RED CLAN SECTION#k#l\r\n";
            cm.sendSimple(text);
        } else if (status == 1) {
            clan = selection;
            if (selection == 0) { // Blue
                var text = "\t\t\t\t\t\t\t\t#bBLUE SECTION#k\r\n";
                text += "In this section you can find out details about the blue team and apply for a position#b\r\n";
                text += "#L0#Check the amount of members #eONLINE#n in the clan#l\r\n";
                text += "#L1#Check the amount of #eALL#n members in the clan#l\r\n";
                text += "#L2#Check #eALL#n player names of the clan#l\r\n\r\n";
                text += "#L3#I want to apply for this team !#l\r\n";
                text += "#L4#Take me back to the clan selection page..#l\r\n";
                cm.sendSimple(text);
            } else { // Red
                var text = "\t\t\t\t\t\t\t\t#rRED SECTION#k\r\n";
                text += "In this section you can find out details about the red team and apply for a position#r\r\n";
                text += "#L0#Check the amount of members #eONLINE#n in the clan#l\r\n";
                text += "#L1#Check the amount of #eALL#n members in the clan#l\r\n";
                text += "#L2#Check #eALL#n player names of the clan#l\r\n\r\n";
                text += "#L3#I want to apply for this team !#l\r\n";
                text += "#L4#Take me back to the clan selection page..#l\r\n";
                cm.sendSimple(text);
            }
        } else if (status == 2) {
            if (selection == 0) {
                cm.sendNextPrev("There is currently "+cm.getOnlineClanCount(clan)+" in this team");
            } else if (selection == 1) {
                cm.sendNextPrev("There is currently "+cm.getOfflineClanCount(clan)+" in this team");
            } else if (selection == 2) {
                var clanText = cm.getAllOfflineNamesFromClan(clan);
                if (clanText.equals(""))
                    cm.sendNextPrev("Sadly there is no one in this clan.. );");
                else
                    cm.sendNextPrev("These are the people inside this clan\r\n" +clanText);
            } else if (selection == 3) {
                cm.sendNext("You are officially in this clan !");
                cm.setClan(clan);
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("OKAY !");
                status = -1;
            }
        } else if (status == 3) // pressing next...
            cm.dispose();
    } else {
        cm.sendOk("You're already in a clan !");
        cm.dispose();
    }
}