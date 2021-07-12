/*
  GM Custom Equipment Creator
  Author: ElternalFire
*/

importPackage(java.util);
importPackage(client);
importPackage(server);
importPackage(tools);

importPackage(server.maps);

var equip = null;
var change = null;
var ii = MapleItemInformationProvider.getInstance();

var statNames = new Array("STR", "DEX", "INT", "LUK", "HP", "MP", "Weapon attack",
	"Magic attack", "Weapon defense", "Magic defense", "Accuracy", "Avoidability", "Speed", "Jump", "Slots to Upgrade", "Own");

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if ((status == 1 || status == 3 || status == 4) && mode == 0) {
			cm.dispose();
			return;
		}
	
		if (mode == 1)
			status++;
		else if (mode == 0)
			status--;
			
		if (status == 0) {
			if (cm.getChar().gmLevel() >= 5) {
				cm.sendYesNo("Welcome #b[GM] #h ##k! Can i do something for you ?");
			}
		}if (status == 1) {
			cm.sendGetNumber("Enter the equip ID.", 1000000, 1000000, 1999999);
		} else if (status == 2) {
			// This is a bit slow
			var items = ii.getAllItems().toArray();
			for (var i = 0; i < items.length; i++) {
				if (items[i].getLeft() == selection) {
					equip = ii.getEquipById(selection);
					cm.sendYesNo("Do you want to create #b#z" + selection + "##k?");
					return;
				}
			}
			
			cm.sendPrev("The item you are trying to create does not exist.");
		} else if (status == 3) {
			var s = "You are creating: #b#z" + equip.getItemId() + "##k.\r\nSelect a stat to change it.\r\n";
			for (var i = 0; i < 16; i++) {
				s += "#L" + i + "##b" + statNames[i] + ": " + getEquipStat(i) + "#k#l\r\n";
			}
			
			s += "\r\n#L16##bCreate the equipment#k#l";
			cm.sendSimple(s);
		} else if (status == 4) {
			if (selection == 16) {
				var newSlot = cm.getChar().getInventory(MapleInventoryType.EQUIP).addItem(equip);
				if (newSlot == -1) {
					cm.sendOk("Please make sure your equipment inventory is not full.");
					cm.dispose();
					return;
				}
				cm.getChar().getClient().getSession().write(MaplePacketCreator.addInventorySlot(MapleInventoryType.EQUIP, equip));
				cm.sendOk("Have fun with your new #b#t" + equip.getItemId() + "##k!");
				cm.dispose();
			} else {
				change = selection;
				if (selection == 15) {
					cm.sendGetText("Enter the new value for #bowner#k.");
					return;
				}
				
				var def = getEquipStat(selection);
				cm.sendGetNumber("Enter the new value for #b" + statNames[selection] + "#k.", def, 0, 32767);
			}
		} else if (status == 5) {
			setEquipStat(change, selection);
			status = 3;
			action(2, 0, 0);
		}
	}

function getEquipStat(i) {
	switch (i) {
		case 0: return equip.getStr();
		case 1: return equip.getDex();
		case 2: return equip.getInt();
		case 3: return equip.getLuk();
		case 4: return equip.getHp();
		case 5: return equip.getMp();
		case 6: return equip.getWatk();
		case 7: return equip.getMatk();
		case 8: return equip.getWdef();
		case 9: return equip.getMdef();
		case 10: return equip.getAcc();
		case 11: return equip.getAvoid();
		case 12: return equip.getSpeed();
		case 13: return equip.getJump();
		case 14: return equip.getUpgradeSlots();
		case 15: return equip.getOwner() == "" ? "(none)" : equip.getOwner();;
	}
}

function setEquipStat(i, v) {
	switch (i) {
		case 0: equip.setStr(v); break;
		case 1: equip.setDex(v); break;
		case 2: equip.setInt(v); break;
		case 3: equip.setLuk(v); break;
		case 4: equip.setHp(v); break;
		case 5: equip.setMp(v); break;
		case 6: equip.setWatk(v); break;
		case 7: equip.setMatk(v); break;
		case 8: equip.setWdef(v); break;
		case 9: equip.setMdef(v); break;
		case 10: equip.setAcc(v); break;
		case 11: equip.setAvoid(v); break;
		case 12: equip.setSpeed(v); break;
		case 13: equip.setJump(v); break;
		case 14: equip.setUpgradeSlots(v); break;
		case 15: equip.setOwner(cm.getText()); break;
	}
}
}