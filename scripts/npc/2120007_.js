/*
highRate = true;
var currency = 2010007;

function start() {
cm.sendNext("I am the #rSuper Gachapon#k, want to take the chance? I will take #b" + (highRate == true ? "one of your #t"+ currency +"#" : mesos + " mesos") + "#k and give you a random item with random stats! Good luck!");
}

function action(m,t,s){
cm.dispose();
if(m > 0) {
if(cm.haveItem(currency)) {
cm.gainItem(currency, -1); //loses the currency item
//You have to put your IDs in the array!!!! Example (not real item IDs): var Prizes = [[1072344], [2340199], [2839028], [1827400, 2844709]]; 
//var Prizes = [["common prizes"], ["standard prizes"], ["rare prizes"], ["extremely rare prizes"]];
var Prizes = [["1432046, 1472065, 1472066, 1472067, 1332067, 1332068, 1332070, 1332071, 1452054, 1452055, 1452056, 1462047, 1462048, 1462049"], ["1332077, 1472072, 1462052, 1462048"], ["2340000, 2049100, 2049000, 2049001, 2049002, 2049003, 2049004, 2049005, 2070005, 2070006"], ["2040807, 2040806, 2044503, 2044703, 2044603, 2043303, 2043103, 2043203, 2043003, 2044403, 2044303, 2043803, 2044103, 2044303, 2043703, 2040506, 2070005, 2070006, 1302033, 1302058, 1302065, 1442030, 2040807, 2040807"]];
//var Prizes = [["1432046"], ["1472065"], ["1472066"], ["1472067"], ["1332067"], ["1332068"], ["1332070"], ["1332071"], ["1452054"], ["1452055"], ["1452056"], ["1462047"], ["1462048"], ["1462049"], ["2340000"], ["2049100"], ["2049000"], ["2049001"], ["2049002"], ["2049003"], ["2049004"], ["2049005"], ["2040807"], ["2040806"], ["2044503"], ["2044703"], ["2044603"], ["2043303"], ["2043103"], ["2043203"], ["2043003"], ["2044403"], ["2044303"], ["2043803"], ["2044103"], ["2044303"], ["2043703"], ["2040506"], ["2070005"], ["2070006"], ["1302033"], ["1302058"], ["1302065"], ["1442030"], ["2040807"], ["2040807"]];
var random1 = Math.floor(Math.random() * 100); // this is the number that will determine which section they get (common, standard, rare, extremely rare)
var section = random1 < 6 ? 3 : random1 >= 6 && random1 < 18 ? 2 : random1 >= 18 && random1 < 50 ? 1 : 0; // Determines what section the item they win will be in
var random2 = Math.floor(Math.random() * Prizes[section].length); // This determines the item from the section in the array that they will get
var newitem;
newitem = Prizes[section][random2];

var newstat = Math.floor(Math.random());
var slot = cm.gainItemRetPos(newitem); // gains the item AND declares the variable for stat editing
cm.editEquipById(slot, -1, newstat, true); // check the method to see how it works
//cm.reloadChar(); // reloads your character so the item's stats are successfully editted
//cm.serverNotice("[Super Gachapon]: "+ cm.getPlayer().getName() +" has won a "+ newstat +" stat "+ Packages.server.MapleItemInformationProvider.getInstance().getName(newitem) +" from the Super Gachapon!"); // server notice for the entire world to see
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