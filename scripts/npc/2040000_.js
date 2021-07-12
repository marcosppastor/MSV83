importPackage(Packages.net.channel);
importPackage(Packages.server);
importPackage(Packages.client);

var status = -1;
var player, inv, item, slot;

function start() {
	var players = ChannelServer.getAllPlayers();
	var text = "Pick a player.\r\n#b";
	for (var i = 0; i < players.size(); i++) {
		var x = players.get(i);
		text += "#L" + x.getId() + "#" + x.getName() + "#l\r\n";
	}
	cm.sendSimple(text);
}

function action(m, t, s) {
	if (m != 1) {
		cm.dispose();
		return;
	} 
	status++;
	if (status == 0) {
		player = ChannelServer.getPlayerById(s);
		cm.sendSimple("What inventory do you want to check?\r\n#b#L0#Equip#l\r\n#L1#Use#l\r\n#L2#Setup#l\r\n#L3#Etc#l\r\n#L4#Cash#l");
	} else if (status == 1) {
		switch (s) {
			case 0:
				inv = player.getInventory(MapleInventoryType.EQUIP);
				break;
			case 1:
				inv = player.getInventory(MapleInventoryType.USE);
				break;
			case 2:
				inv = player.getInventory(MapleInventoryType.SETUP);
				break;
			case 3:
				inv = player.getInventory(MapleInventoryType.ETC);
				break;
			case 4:
				inv = player.getInventory(MapleInventoryType.CASH);
				break;
		}
		var text = "Pick an item.\r\n";
		var items = inv.list().toArray();
		for (var j = 0; j < items.length; j++) {
			var i = items[j];
			text += "#L" + i.getPosition() + "##i" + i.getItemId() + "##l    ";
		}
		if (items.length != 0)
			cm.sendSimple(text);
		else {
			cm.sendNext("This person doesn't have anything in this inventory.");
			status = -1;
		}
	} else if (status == 2) {
		item = inv.getItem(s);
		slot = s;
		cm.sendSimple("What would you like to do with this item? #i" + item.getItemId() + "#\r\n\r\n#b#L0#Delete#l\r\n#L1#Make a copy#l");
	} else if (status == 3) {
		if (s == 0) {
			inv.removeItem(slot);
		} else {
			MapleInventoryManipulator.addFromDrop(cm.getClient(), item, "Copy");
		}
		cm.sendSimple("#bGo back to inventory select? To view another character, please restart the NPC.\r\n\r\n#L0#Yes#l\r\n#L1#No#l");
	} else if (status == 4) {
		if (s == 0) {
			cm.sendSimple("What inventory do you want to check?\r\n#b#L0#Equip#l\r\n#L1#Use#l\r\n#L2#Setup#l\r\n#L3#Etc#l\r\n#L4#Cash#l");
			status = 0;
		} else {
			cm.sendOk("Have a nice day.");
			cm.dispose();
		}
	}
}