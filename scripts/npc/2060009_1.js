/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Dolphin in Aquaroad - Monster Riding Teacher and Aquarium PQ
*/

var status = 0;
var minLevel = 180;
var maxLevel = 200;
var minPlayers = 1;
var maxPlayers = 6;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple ("I drive the dolphin Taxi! What do you want to do today?\r\n#L0#Learn to ride a Pig#l\r\n#L1#Go to Herb Town#l\r\n#L2#Start Aquarium Party Quest#l\r\n#L3#Tell me about the other dimension.#l");
		} else if (status == 1) {
			if (selection == 0) {
				if(cm.getLevel() >= 70) {
					cm.teachSkill(1004, 1, 0);
					cm.sendOk("You are ready to get on the Pig.");
				} else {
					cm.sendOk("You are too weak. Please come back when you've grown stronger.");
				}
				cm.dispose();
			} else if (selection == 1) {
				cm.sendNext ("Alright, see you next time. Take care.");
			} else if (selection == 2) {
					if (cm.getParty() == null) { // no party
						cm.sendOk("Please talk to me again after you've formed a party.");
						cm.dispose();
						return;
					}
					if (!cm.isLeader()) { // not party leader
						cm.sendOk("Please ask your party leader to talk to me.");
						cm.dispose();
					} else {
						// Check teh partyy
						var party = cm.getParty().getMembers();
						var mapId = cm.getChar().getMapId();
						var next = true;
						var levelValid = 0;
						var inMap = 0;
						// Temp removal for testing
						if (party.size() < minPlayers || party.size() > maxPlayers) 
							next = false;
						else {
							for (var i = 0; i < party.size() && next; i++) {
								if ((party.get(i).getLevel() >= minLevel) && (party.get(i).getLevel() <= maxLevel))
									levelValid += 1;
								if (party.get(i).getMapid() == mapId)
									inMap += 1;
							}
							if (levelValid < minPlayers || inMap < minPlayers)
								next = false;
						}
						if (next) {
							// Kick it into action.  Slate says nothing here, just warps you in.
							var em = cm.getEventManager("AquariumPQ");
							if (em == null) {
								cm.sendOk("unavailable");
								cm.dispose();
							}
							else {
								// Begin the PQ.
								var eim = em.startInstance(cm.getParty(),cm.getChar().getMap());
								cm.dispose();
							}
							cm.dispose();
						}
						else {
							cm.sendOk("Your party is not a party of three to six.  Make sure all your members are present and qualified to participate in this quest.  I see #b" + levelValid.toString() + " #kmembers are in the right level range, and #b" + inMap.toString() + "#k are in my map. If this seems wrong, #blog out and log back in,#k or reform the party.");
							cm.dispose();
						}
					}
					cm.dispose();
			} else if (selection == 3) {
				cm.sendNext("Lately in Aquarium, another dimension has popped out of nowhere, and the biggest threat that poses on us is that #bSuper Pianus#k, the boss of their world is slowly merging into our world. We need brave people to combat #bSuper Pianus.#k Super pianus drops are also from another dimension, which means that they are insanely strong.");
				cm.dispose();
			}
		} else if (status == 2) {
			cm.warp(251000100, 0);
			cm.dispose();
		}
	}
}	