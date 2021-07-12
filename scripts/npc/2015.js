/*
help.js - Maple Admin(@gm)
Coded by Navi for MapleLegends
*/


importPackage(client);
importPackage(tools);


var status = -1;
var amount;
var selected;
var open = false;
var messages;


function start() {
   status = -1;
   action(1,0,0);
}


function action(mode,type,selection) {
    if (mode == -1) {
        if (open) {
            GMMessage.setSession(false);
        }
        cm.dispose();
    } else if (mode == 0 && status <= 2) {
        if (open) {
            GMMessage.setSession(false);
        }
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            if (!cm.getPlayer().isGM()) {
                cm.sendGetText("Hello! Do you have a question, comment, or suggestion? Please type it in the space provided.");
            } else {
                if (!GMMessage.sessionOpen()) {
                    open = true;
                    GMMessage.setSession(true);
                    cm.sendGetNumber("Would you like to check the recent GM Messages? How many messages would you like to see?", 1, 1, 50); //too many may crash it?
                } else {
                    //GMMessage.setSession(false); //to debug if needed
                    cm.sendOk("Another GM is currently checking GM Messages. Please try again later.");
                    cm.dispose();
                }
            }
        } else if(status == 1){
            if (!cm.getPlayer().isGM()) {
                if (cm.getText().length() > 0) {
                    GMMessage.addMessage(cm.getPlayer().getName(), cm.getText());
                    cm.getClient().getChannelServer().getWorldInterface().broadcastGMMessage(null, MaplePacketCreator.serverNotice(6, "[GM MESSAGE - " + cm.getPlayer().getName() + "] " + cm.getText()).getBytes());
                    cm.sendOk("An in-game message has been sent to all online game moderators.");
                    cm.dispose();
                } else {
                    status = -1;
                    cm.sendOk("You did not enter a message.");
                }
            } else {
                amount = selection;
                cm.sendNext("We are pulling up the "+amount+" most recent GM messages...");
            }
        } else if (status == 2) {
            messages = GMMessage.getMessages();
            if (messages.size() > 0) {
                var str = "Here are all of the unresolved GM Messages. Click on a message if it has been resolved:"
                for (var i=0; i<Math.min(amount, messages.size()); i++) {
                    str+="\r\n#L"+i+"##e"+messages.get(i).getCName()+"#n #r("+messages.get(i).getTimestamp()+")#k\r\n#b"+messages.get(i).getMessage()+"#k";
                }
                cm.sendSimple(str);
            } else {
                GMMessage.setSession(false);
                cm.sendOk("There are no new GM Messages.");
                cm.dispose();
            }
        } else if (status == 3) {
            selected = selection;
            cm.sendYesNo("Would you like to delete the following GM Message?\r\n#e"+messages.get(selected).getCName()+"#n #r("+messages.get(selected).getTimestamp()+")#k\r\n#b"+messages.get(selected).getMessage()+"#k");
        } else if (status == 4) {
            status = 1;
            GMMessage.removeMessage(selected);
            cm.sendOk("This message has been deleted");
        }
    }
}