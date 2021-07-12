/*
var Equip = new Array(1072238, 1072239, 1072344, 1082223, 1122010, 1082246, 1032030, 1102145);
var Equipc = Math.floor(Math.random()*Equip.length);
var Scroll = new Array(2340000);
var itemamount = Math.floor(Math.random()*2+1);

importPackage(net.sf.rise.client);

function start() { 
 status = -1; 
 action(1, 0, 0); 
} 
function action(mode, type, selection) { 
 if (mode == -1) { 
  cm.dispose(); 
 } else { 
  if (status >= 0 && mode == 0) { 
   cm.sendOk("Come back anytime you feel like gambling!"); 
   cm.dispose(); 
   return; 
  } 
  if (mode == 1) 
   status++; 
  else 
   status--; 
  if (status == 0) {
     cm.sendNext("Hey, I'm the Online Gambling Machine.  You can come here to gamble and if you're lucky, you'll get something rare.");
     }else if(status == 1){
     cm.sendSimple("So what do you say?  You feeling lucky today?#r\r\n#L0#I'm feeling Lucky!#l\r\n#L1#I want to buy a ticket!#l#k");
     }else if(status == 2){
            if(selection == 0){
                if ((!cm.haveItem(4031592, 1))) {
                   cm.sendOK("You didn't buy a ticket.");
                   cm.dispose();
                } else if ((cm.haveItem(4031592, 1))) {
                   cm.gainItem(4031592, -1)
                   var type = Math.floor(Math.random()*22+1);
                   switch(type) {
                   case 1: 
                   case 10: 
                   case 3: 
                   case 4: 
                   case 5: 
                   case 6: 
                   case 7:
                   case 16:
                   case 13:
                   case 18:
                   cm.sendOk("Too bad, guess you weren't as lucky as you thought.");
                   cm.dispose();
                   break;
                   case 9:
                   case 2:
                   cm.gainMeso(5000000)
                   cm.sendOk("You were lucky today.");
                   cm.dispose();
                   break;
                   case 11: 
                   case 12:
                   cm.gainMeso(50000000)
                   cm.sendOk("You were lucky today.");
                   cm.dispose();
                   break;
                   case 14: 
                   case 15:
                   cm.gainMeso(100000000);
                   cm.sendOk("You were lucky today.");
                   cm.dispose();
                   break;
                   case 8: 
                   case 17: 
                   cm.gainItem(2340000, itemamount);
                   cm.sendOk("You were lucky today.");
                   cm.dispose();
                    break;
                   case 19:
                   case 20:
                   cm.gainItem(Equip[Equipc], 1);
                   cm.sendOk("You were lucky today.");
                   cm.dispose();
                   break;
                   default:
                   cm.gainMeso(10000000);
                   cm.sendOk("You were lucky today.");
                   cm.dispose();
                   }
                 }
              } else if(selection == 1) {
                   cm.sendSimple("It costs #b50,000,000#k for a ticket. Do you want to buy one?#b\r\n#L3#Yes#l#k#r\r\n#L4#No#l#k");
                  } 
                  } else if (status == 3) {
                   if (selection == 3) {
                      cm.gainMeso(-50000000);
                      cm.gainItem(4031592, 1);
                      cm.sendOk("There you go!");
                      cm.dispose();
                  } else if (selection == 4) {
                      cm.sendOk("Whatever you want to do.");
                      cm.dispose();
                     }
                  }
         }
}

*/