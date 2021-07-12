/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Cody
-- By --------------------------------------------------------------------------------------------------
	xQuasar
Note by Tykian: Minor fixes/additions


importPackage(java.lang);

var status = -1;
var oldWepName;
var oldWepId;
var newWepId;
var newWepName;
var folhas;
var stimulator;
var custo;
var getNewWep;
var sel;

function start() {
    cm.sendSimple("O que desejas?\r\n\r\n#b#L4#Forjar Arma Maple LV. 77#l#k");
}

function action(mode, type, selection) {
    if (mode == 0) {
	cm.dispose();
	return;
    } else {
	status++;
    }
    if (status == 0) {
	sel = selection;
	if (sel == 4) {
	    cm.sendSimple("Qual delas deseja forjar?\r\n#b#L0#Maple Pyrope Sword #i1302142##l\r\n#b#L1#Maple Pyrope Axe #i1312056##l\r\n#b#L2#Maple Pyrope Hammer #i1322084##l\r\n#b#L3#Maple Pyrope Halfmoon #i1332114##l\r\n#b#L4#Maple Pyrope Wand #i1372071##l\r\n#b#L5#Maple Pyrope Staff #i1382093##l\r\n#b#L6#Maple Pyrope Rohen #i1402085##l\r\n#b#L7#Maple Pyrope Battle Axe #i1412055##l\r\n#b#L8#Maple Pyrope Maul #i1422057##l\r\n#b#L9#Maple Pyrope Spear #i1432075##l\r\n#b#L10#Maple Pyrope Hellslayer #i1442104##l\r\n#b#L11#Maple Pyrope Bow #i1452100##l\r\n#b#L12#Maple Pyrope Crow #i1462085##l\r\n#b#L13#Maple Pyrope Skanda #i1472111##l\r\n#b#L14#Maple Pyrope Knuckle #i1482073##l\r\n#b#L15#Maple Pyrope Shooter #i1492073##l\r\n#b#L16#Maple Pyrope Katara #i1342028##l");
	} 
    } else if (status == 1) {
	if (sel == 4) {
	    if (selection == 0) {
		oldWepName = "Maple Glory Sword";
		oldWepId = 1302064;
		newWepName = "Maple Pyrope Sword";
		newWepId = 1302142;
		folhas = 1100;
		custo = 3000000;
		stimulator = 4130002;
	    } else if (selection == 6) {
		oldWepName = "Maple Soul Rohen";
		oldWepId = 1402039;
		newWepName = "Maple Pyrope Rohen";
		newWepId = 1402085;
		folhas = 1250;
		custo = 5000000;
		stimulator = 4130005;
	    } else if (selection == 1) {
		oldWepName = "Maple Steel Axe";
		oldWepId = 1312032;
		newWepName = "Maple Pyrope Axe";
		newWepId = 1312056;
		folhas = 1100;
		custo = 3000000;
		stimulator = 4130003;
	    } else if (selection == 7) {
		oldWepName = "Maple Demon Axe";
		oldWepId = 1412027;
		newWepName = "Maple Pyrope Battle Axe";
		newWepId = 1412055;
		folhas = 1250;
		custo = 5000000;
		stimulator = 4130006;
	    } else if (selection == 2) {
		oldWepName = "Maple Havoc Hammer";
		oldWepId = 1322054;
		newWepName = "Maple Pyrope Hammer";
		newWepId = 1322084;
		folhas = 1100;
		custo = 3000000;
		stimulator = 4130004;
	    } else if (selection == 8) {
		oldWepName = "Maple Belzet";
		oldWepId = 1422029;
		newWepName = "Maple Pyrope Maul";
		newWepId = 1422057;
		folhas = 1250;
		custo = 500000;
		stimulator = 4130007;
	    } else if (selection == 11) {
		oldWepName = "Maple Kandiva Bow";
		oldWepId = 1452045;
		newWepName = "Maple Pyrope Bow";
		newWepId = 1452100;
		folhas = 1250;
		custo = 500000;
		stimulator = 4130012;
	    } else if (selection == 12) {
		oldWepName = "Maple Nishada";
		oldWepId = 1462040;
		newWepName = "Maple Pyrope Crow";
		newWepId = 1462085;
		folhas = 1250;
		custo = 500000;
		stimulator = 4130013;
	    } else if (selection == 13) {
		oldWepName = "Maple Skanda";
		oldWepId = 1472055;
		newWepName = "Maple PyropeSkanda";
		newWepId = 1472111;
		folhas = 1250;
		custo = 500000;
		stimulator = 4130015;
	    } else if (selection == 3) {
		oldWepName = "Maple Dark Mate";
		oldWepId = 1332055;
		newWepName = "Maple Pyrope Halfmoon";
		newWepId = 1332114;
		folhas = 1250;
		custo = 500000;
		stimulator = 4130014;
	    } else if (selection == 9) {
		oldWepName = "Maple Soul Spear";
		oldWepId = 1432040;
		newWepName = "Maple Pyrope Spear";
		newWepId = 1432075;
		folhas = 1250;
		custo = 500000;
		stimulator = 4130008;
	    } else if (selection == 10) {
		oldWepName = "Maple Karstan";
		oldWepId = 1442051;
		newWepName = "Maple Pyrope Hellslayer";
		newWepId = 1442104;
		folhas = 1250;
		custo = 500000;
		stimulator = 4130009;
	    } else if (selection == 4) {
		oldWepName = "Maple Shine Wand";
		oldWepId = 1372034;
		newWepName = "Maple Pyrope Wand";
		newWepId = 1372071;
		folhas = 1250;
		custo = 500000;
		stimulator = 4130010;
	    } else if (selection == 5) {
		oldWepName = "Maple Wisdom Staff";
		oldWepId = 1382039;
		newWepName = "Maple Pyrope Staff";
		newWepId = 1382093;
		folhas = 1250;
		custo = 500000;
		stimulator = 4130011;
	    } else if (selection == 14){
		oldWepName = "Maple Golden Claw";
		oldWepId = 1482022;
		newWepName = "Maple Pyrope Knuckle";
		newWepId = 1482073;
		folhas = 1250;
		custo = 500000;
		stimulator = 4130016;
	    } else if (selection == 15) {
		oldWepName = "Maple Cannon Shooter";
		oldWepId = 1492022;
		newWepName = "Maple Pyrope Shooter";
		newWepId = 1492073;
		folhas = 125;
		custo = 500000;
		stimulator = 4130017;
	    } else if (selection == 16) {
		oldWepName = "Maple Cleat Katara";
		oldWepId = 1342027;
		newWepName = "Maple Pyrope Katara";
		newWepId = 1342028;
		folhas = 1250;
		custo = 500000;
	    }
	    cm.sendYesNo("Se desejas forjar uma #b" + newWepName + "#k, voce precisara dos seguintes items:\r\n\r\n#i" + oldWepId + "# x 1\r\n#i4001126# x" + folhas + "\r\n\r\n#fUI/UIWindow.img/QuestIcon/7/0# " + custo + ".\r\n\r\nCaso possua os items requisitados, deseja trocar os mesmos por uma #d" + newWepName + "#k  #i" + newWepId + "#?");
	}
    } else if (status == 2) {
	if (sel == 4) {
	    if (mode != 1) {
		cm.sendOk("A escolha e sua. Volte quando quiser forjar uma Arma Maple LV. 77");
		cm.dispose();
	    } else {
		if ((cm.getMeso() < custo) || (!cm.haveItem(oldWepId,1)) || (!cm.haveItem(4001126,folhas))) {
		    cm.sendOk("Algo deu errado!\r\nPara forjar uma #b" + newWepName + "#k ( #i" + newWepId + "#), voce precisara dos seguintes items:\r\n\r\n#i" + oldWepId + "# x 1\r\n#i4001126# x" + folhas + "\r\n\r\n#fUI/UIWindow.img/QuestIcon/7/0# " + custo);
		    cm.dispose();
		} else if (stimulator == null || !cm.haveItem(stimulator)) {
		    if (cm.canHold(newWepId)) {
			cm.gainItem(oldWepId, -1);
			cm.gainItem(4001126, -folhas);
			cm.gainMeso(-custo);
			cm.gainItem(newWepId,1);
			cm.sendOk("Parabens por forjar sua arma!\r\nFaca bom uso da sua nova #d" + newWepName + "  #i" + newWepId + "#.");
		    } else {
			cm.sendOk("Aparentemente o seu inventario esta cheio.\r\nPor favor, remova algo da aba de #bequipamento#k e tente forjar sua arma novamente.");
		    }
		    cm.dispose();
		} else {
		    status = 2;
		    cm.sendSimple("It appears that you have a #rStimulator#k for this weapon. Would you like to create the weapon with or without the #rStimulator#k? If you create without the #rStimulator#k, the item will always be #baverage#k. If you do create it with the #rStimulator#k, the item has a random chance of being #blower#k or #bhigher#k than average.\r\n#b#L20#Create weapon WITH Stimulator #i1312056##l\r\n#L21#Create weapon WITHOUT Stimulator#l#k");
		}
	    }
	}
    } else if (status == 3) {
	if (sel == 2 || sel == 4) {
	    if (cm.canHold(newWepId)) {
		if (selection == 21) {
		    cm.gainItem(oldWepId,-1);
		    cm.gainItem(4001126,-folhas);
		    cm.gainMeso(-custo);
		    cm.gainItem(newWepId, 1);
		    cm.sendOk("Parabens por forjar sua arma!\r\nFaca bom uso da sua nova #d" + newWepName + "  #i" + newWepId + "#.");
		} else {
		    cm.gainItem(oldWepId,-1);
		    cm.gainItem(4001126,-folhas);
		    cm.gainItem(stimulator,-1);
		    cm.gainMeso(-custo);
		    cm.gainItem(newWepId,1,true);
		    cm.sendOk("Parabens por forjar sua arma!\r\nFaca bom uso da sua nova #d" + newWepName + "  #i" + newWepId + "#.");
		}
	    } else {
		cm.sendOk("Aparentemente o seu inventario esta cheio.\r\nPor favor, remova algo da aba de #bequipamento#k e tente forjar sua arma novamente.");
	    }
	    cm.dispose();
	}
	}
}

**/