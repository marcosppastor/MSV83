/*//By Blake
//Starting Npc - Sera
function start() {
cm.sendSimple ("Feliz natal!.\r\n#L0# #bRetirar itens de natal#k");
}

function action(mode, type, selection) {
cm.dispose();
         if (selection == 0) {
	
             if (!cm.haveItem(5010034) ) {
                     cm.gainItem (5010034,1,false,false,604800000);
                     cm.gainItem (3992026 ,1);
                     cm.gainItem (3992017  ,1);
                     cm.gainItem (3992018  ,1);
                     cm.gainItem (3992019  ,1);
                     cm.gainItem (3992020  ,1);
                     cm.gainItem (3992021   ,1);
                     cm.gainItem (3992022  ,1);
                     cm.gainItem (3992023  ,1);
                     cm.gainItem (3992024  ,1);
                     cm.gainItem (3992025  ,1);


                   }
                   else {
                       
                     cm.gainItem (3992026 ,10);
                     cm.gainItem (3992017  ,10);
                     cm.gainItem (3992018  ,10);
                     cm.gainItem (3992019  ,10);
                     cm.gainItem (3992020  ,10);
                     cm.gainItem (3992021   ,10);
                     cm.gainItem (3992022  ,10);
                     cm.gainItem (3992023  ,10);
                     cm.gainItem (3992024  ,10);
                     cm.gainItem (3992025  ,10);
                     cm.gainItem (3994008   ,10);
                     cm.gainItem (3994007   ,10);
                     cm.gainItem (3994001  ,10);




                   }

	 }
     }
	 
	 */
	 
	 /*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
//cm.gainItem()
cm.sendOk("Ola #h #, tudo bem?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}
