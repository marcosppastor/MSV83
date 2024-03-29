/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation version 3 as published by
 the Free Software Foundation. You may not use, modify or distribute
 this program under any other version of the GNU Affero General Public
 License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package scripting;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleQuestStatus;
import client.SkillFactory;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import client.inventory.ModifyInventory;
import constants.ItemConstants;
import java.awt.Point;
import java.util.*;
import net.server.Server;
import net.server.channel.Channel;
import net.server.guild.MapleGuild;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import scripting.event.EventInstanceManager;
import scripting.event.EventManager;
import scripting.npc.NPCScriptManager;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.expeditions.MapleExpedition;
import server.expeditions.MapleExpeditionType;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MapleNPC;
import server.life.MobSkill;
import server.life.MobSkillFactory;
import server.maps.*;
import server.partyquest.Pyramid;
import server.quest.MapleQuest;
import tools.MaplePacketCreator;

public class AbstractPlayerInteraction {

    public MapleClient c;
    protected int id, id2;

    public AbstractPlayerInteraction(MapleClient c) {
        this.c = c;
    }

    public AbstractPlayerInteraction(final MapleClient c, final int id, final int id2) {
        this.c = c;
        this.id = id;
        this.id2 = id2;
    }

    public MapleClient getClient() {
        return c;
    }

    public MapleCharacter getPlayer() {
        return c.getPlayer();
    }

    public List<MapleCharacter> getPartyMembers() {
        if (getPlayer().getParty() == null) {
            return null;
        }
        List<MapleCharacter> chars = new LinkedList<>();
        for (Channel channel : Server.getInstance().getChannelsFromWorld(getPlayer().getWorld())) {
            for (MapleCharacter chr : channel.getPartyMembers(getPlayer().getParty())) {
                if (chr != null) {
                    chars.add(chr);
                }
            }
        }
        return chars;
    }

    public void warp(int map) {
        getPlayer().changeMap(getWarpMap(map), getWarpMap(map).getPortal(0));
    }

    public void warp(int map, int portal) {
        getPlayer().changeMap(getWarpMap(map), getWarpMap(map).getPortal(portal));
    }

    public void warp(int map, String portal) {
        getPlayer().changeMap(getWarpMap(map), getWarpMap(map).getPortal(portal));
    }

    public void warpParty(int id) {
        for (MapleCharacter mc : getPartyMembers()) {
            mc.changeMap(getWarpMap(id));
        }
    }

    public void warpMap(int map) {
        for (MapleCharacter mc : getPlayer().getMap().getCharacters()) {
            mc.changeMap(getWarpMap(map), getWarpMap(map).getPortal(0));
        }
    }

    protected MapleMap getWarpMap(int map) {
        MapleMap target;
        if (getPlayer().getEventInstance() == null) {
            target = c.getChannelServer().getMapFactory().getMap(map);
        } else {
            target = getPlayer().getEventInstance().getMapInstance(map);
        }
        return target;
    }

    public MapleMap getMap(int map) {
        return getWarpMap(map);
    }

    public EventManager getEventManager(String event) {
        return getClient().getChannelServer().getEventSM().getEventManager(event);
    }

    public EventInstanceManager getEventInstance() {
        return getPlayer().getEventInstance();
    }

    public boolean haveItem(int itemid) {
        return haveItem(itemid, 1);
    }

    public boolean haveItem(int itemid, int quantity) {
        return getPlayer().getItemQuantity(itemid, false) >= quantity;
    }

    public boolean canHold(int itemid) {
        return getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(itemid)).getNextFreeSlot() > -1;
    }

    public void updateQuest(int questid, String data) {
        MapleQuestStatus status = c.getPlayer().getQuest(MapleQuest.getInstance(questid));
        status.setStatus(MapleQuestStatus.Status.STARTED);
        status.setProgress(0, data);//override old if exists
        c.getPlayer().updateQuest(status);
    }

    public MapleQuestStatus.Status getQuestStatus(int id) {
        return c.getPlayer().getQuest(MapleQuest.getInstance(id)).getStatus();
    }

    public boolean isQuestCompleted(int quest) {
        try {
            return getQuestStatus(quest) == MapleQuestStatus.Status.COMPLETED;
        } catch (NullPointerException e) {
            return false;
        }
    }

    public boolean isQuestStarted(int quest) {
        try {
            return getQuestStatus(quest) == MapleQuestStatus.Status.STARTED;
        } catch (NullPointerException e) {
            return false;
        }
    }

    public int getQuestProgress(int qid) {
        return Integer.parseInt(getPlayer().getQuest(MapleQuest.getInstance(29932)).getProgress().get(0));
    }

    public void gainItem(int id, short quantity) {
        gainItem(id, quantity, false, false);
    }

    public void gainItem(int id, short quantity, boolean show) {//this will fk randomStats equip :P
        gainItem(id, quantity, false, show);
    }

    public void gainItem(int id, boolean show) {
        gainItem(id, (short) 1, false, show);
    }

    public void gainItem(int id) {
        gainItem(id, (short) 1, false, false);
    }

    public void gainItem(int id, short quantity, boolean randomStats, boolean showMessage) {
        if (id >= 5000000 && id <= 5000100) {
            MapleInventoryManipulator.addById(c, id, (short) 1, null, MaplePet.createPet(id), -1);
        }
        if (quantity >= 0) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            Item item = ii.getEquipById(id);
            if (!MapleInventoryManipulator.checkSpace(c, id, quantity, "")) {
                c.getPlayer().dropMessage(1, "Seu inventario esta cheio. Remova algo do  " + ii.getInventoryType(id).name() + " e tente novamente.");
                return;
            }
            if (ii.getInventoryType(id).equals(MapleInventoryType.EQUIP) && !ItemConstants.isRechargable(item.getItemId())) {
                if (randomStats) {
                    MapleInventoryManipulator.addFromDrop(c, ii.randomizeStats((Equip) item), false);
                } else {
                    MapleInventoryManipulator.addFromDrop(c, (Equip) item, false);
                }
            } else {
                MapleInventoryManipulator.addById(c, id, quantity);
            }
        } else {
            MapleInventoryManipulator.removeById(c, MapleItemInformationProvider.getInstance().getInventoryType(id), id, -quantity, true, false);
        }
        if (showMessage) {
            c.announce(MaplePacketCreator.getShowItemGain(id, quantity, true));
        }
    }

    public Item gainItem(int id, short quantity, boolean randomStats, boolean showMessage, long expires) {
        Item item = null;
        if (id >= 5000000 && id <= 5000100) {
            MapleInventoryManipulator.addById(c, id, (short) 1, null, MaplePet.createPet(id), expires == -1 ? -1 : System.currentTimeMillis() + expires);
        }
        if (quantity >= 0) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();

            if (ii.getInventoryType(id).equals(MapleInventoryType.EQUIP)) {
                item = ii.getEquipById(id);
            } else {
                item = new Item(id, (short) 0, quantity);
            }

            if (expires != -1) {
                item.setExpiration(System.currentTimeMillis() + expires);
            }

            if (!MapleInventoryManipulator.checkSpace(c, id, quantity, "")) {
                c.getPlayer().dropMessage(1, "Seu inventário esta cheio,remova um item " + ii.getInventoryType(id).name() + " inventory.");
                return null;
            }
            if (ii.getInventoryType(id).equals(MapleInventoryType.EQUIP) && !ItemConstants.isRechargable(item.getItemId())) {
                if (randomStats) {
                    item = ii.randomizeStats((Equip) item);
                    MapleInventoryManipulator.addFromDrop(c, ii.randomizeStats((Equip) item), false);
                } else {
                    MapleInventoryManipulator.addFromDrop(c, item, false);
                }
            } else {
                MapleInventoryManipulator.addFromDrop(c, item, false);
            }
        } else {
            MapleInventoryManipulator.removeById(c, MapleItemInformationProvider.getInstance().getInventoryType(id), id, -quantity, true, false);
        }
        if (showMessage) {
            c.announce(MaplePacketCreator.getShowItemGain(id, quantity, true));
        }

        return item;
    }

    public void changeMusic(String songName) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.musicChange(songName));
    }

    public void playerMessage(int type, String message) {
        c.announce(MaplePacketCreator.serverNotice(type, message));
    }

    public void playerMessage(String message) {
        playerMessage(5, message);
    }

    public void message(String message) {
        getPlayer().message(message);
    }

    public void mensagem(String mensagem) {
        getPlayer().message(mensagem);
    }

    public void mapMessage(int type, String message) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(type, message));
    }

    public void mapMessage(String message) {
        mapMessage(6, message);
    }

    public void mapClock(int time) {
        //getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(type, message));
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.getClock(time));
    }

    public void mapEffect(String path) {
        c.announce(MaplePacketCreator.mapEffect(path));
    }

    public void mapSound(String path) {
        c.announce(MaplePacketCreator.mapSound(path));
    }

    public void showIntro(String path) {
        c.announce(MaplePacketCreator.showIntro(path));
    }

    public void showInfo(String path) {
        c.announce(MaplePacketCreator.showInfo(path));
        c.announce(MaplePacketCreator.enableActions());
    }

    public void guildMessage(int type, String message) {
        if (getGuild() != null) {
            getGuild().guildMessage(MaplePacketCreator.serverNotice(type, message));
        }
    }

    public MapleGuild getGuild() {
        try {
            return Server.getInstance().getGuild(getPlayer().getGuildId(), null);
        } catch (Exception e) {
        }
        return null;
    }

    public MapleParty getParty() {
        return getPlayer().getParty();
    }

    public boolean isLeader() {
        return getParty().getLeader().equals(getPlayer().getMPC());
    }

    public void givePartyItems(int id, short quantity, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            MapleClient cl = chr.getClient();
            if (quantity >= 0) {
                MapleInventoryManipulator.addById(cl, id, quantity);
            } else {
                MapleInventoryManipulator.removeById(cl, MapleItemInformationProvider.getInstance().getInventoryType(id), id, -quantity, true, false);
            }
            cl.announce(MaplePacketCreator.getShowItemGain(id, quantity, true));
        }
    }

    public void removerHPQItems() {
        int[] items = {4001095, 4001096, 4001097, 4001098, 4001099, 4001100, 4001101};
        for (int i = 0; i < items.length; i++) {
            removePartyItems(items[i]);
        }
    }

    public void removerPPQItems() {
        int[] items = {4001120, 4001121, 4001122};
        for (int i = 0; i < items.length; i++) {
            removePartyItems(items[i]);
        }
    }

    public void removePartyItems(int id) {
        if (getParty() == null) {
            removeAll(id);
            return;
        }
        for (MaplePartyCharacter chr : getParty().getMembers()) {
            if (chr != null && chr.isOnline() && chr.getPlayer().getClient() != null) {
                removeAll(id, chr.getPlayer().getClient());
            }
        }
    }

    public int countMonster() {
        MapleMap map = c.getPlayer().getMap();
        double range = Double.POSITIVE_INFINITY;
        List<MapleMapObject> monsters = map.getMapObjectsInRange(c.getPlayer().getPosition(), range, Arrays
                .asList(MapleMapObjectType.MONSTER));
        for (MapleMapObject monstermo : monsters) {
            final MapleMonster monster = (MapleMonster) monstermo;
        }
        return monsters.size();
    }

    public int countReactor() {
        MapleMap map = c.getPlayer().getMap();
        double range = Double.POSITIVE_INFINITY;
        List<MapleMapObject> reactors = map.getMapObjectsInRange(c.getPlayer().getPosition(), range, Arrays
                .asList(MapleMapObjectType.REACTOR));
        for (MapleMapObject reactormo : reactors) {
            MapleReactor reactor = (MapleReactor) reactormo;
        }
        return reactors.size();
    }

    public int countReactor(byte st) {
        MapleMap map = c.getPlayer().getMap();
        double range = Double.POSITIVE_INFINITY;
        List<MapleMapObject> reactorz = map.getMapObjectsInRange(c.getPlayer().getPosition(), range, Arrays
                .asList(MapleMapObjectType.REACTOR));
        ArrayList<MapleMapObject> reactors = new ArrayList<MapleMapObject>();

        for (MapleMapObject reactormo : reactorz) {
            MapleReactor reactor = (MapleReactor) reactormo;
            if (reactor.getState() == st) {
                reactors.add(reactor);
            }
        }
        return reactors.size();
    }

    /*
     public void givePartyExp(int amount, List<MapleCharacter> party) {
     for (MapleCharacter chr : party) {
     chr.gainExp(amount * c.getChannelServer().getExpRate(), true, true);
     }
     }
     */
    public void removeFromParty(int id, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            MapleClient cl = chr.getClient();
            MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(id);
            MapleInventory iv = cl.getPlayer().getInventory(type);
            int possesed = iv.countById(id);
            if (possesed > 0) {
                MapleInventoryManipulator.removeById(c, MapleItemInformationProvider.getInstance().getInventoryType(id), id, possesed, true, false);
                cl.announce(MaplePacketCreator.getShowItemGain(id, (short) -possesed, true));
            }
        }
    }

    public void removeAll(int id) {
        removeAll(id, c);
    }

    public void removeAll(int id, MapleClient cl) {
        int possessed = cl.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(id)).countById(id);
        if (possessed > 0) {
            MapleInventoryManipulator.removeById(cl, MapleItemInformationProvider.getInstance().getInventoryType(id), id, possessed, true, false);
            cl.announce(MaplePacketCreator.getShowItemGain(id, (short) -possessed, true));
        }
    }

    public int getMapId() {
        return c.getPlayer().getMap().getId();
    }

    public int getPlayerCount(int mapid) {
        return c.getChannelServer().getMapFactory().getMap(mapid).getCharacters().size();
    }

    public void showInstruction(String msg, int width, int height) {
        c.announce(MaplePacketCreator.sendHint(msg, width, height));
        c.announce(MaplePacketCreator.enableActions());
    }

    public void disableMinimap() {
        c.announce(MaplePacketCreator.disableMinimap());
    }

    public void resetMap(int mapid) {
        getMap(mapid).resetReactors();
        getMap(mapid).killAllMonsters();
        for (MapleMapObject i : getMap(mapid).getMapObjectsInRange(c.getPlayer().getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM))) {
            getMap(mapid).removeMapObject(i);
            getMap(mapid).broadcastMessage(MaplePacketCreator.removeItemFromMap(i.getObjectId(), 0, c.getPlayer().getId()));
        }
    }

    public void sendClock(MapleClient d, int time) {
        d.announce(MaplePacketCreator.getClock((int) (time - System.currentTimeMillis()) / 1000));
    }

    public void useItem(int id) {
        MapleItemInformationProvider.getInstance().getItemEffect(id).applyTo(c.getPlayer());
        c.announce(MaplePacketCreator.getItemMessage(id));//Useful shet :3
    }

    public void teachSkill(int skillid, byte level, byte masterLevel, long expiration) {
        getPlayer().changeSkillLevel(SkillFactory.getSkill(skillid), level, masterLevel, expiration);
    }

    public void removeEquipFromSlot(byte slot) {
        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot);
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.EQUIPPED, slot, tempItem.getQuantity(), false, false);
    }

    public void gainAndEquip(int itemid, byte slot) {
        final Item old = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot);
        if (old != null) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.EQUIPPED, slot, old.getQuantity(), false, false);
        }
        final Item newItem = MapleItemInformationProvider.getInstance().getEquipById(itemid);
        newItem.setPosition(slot);
        c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).addFromDB(newItem);
        c.announce(MaplePacketCreator.modifyInventory(false, Collections.singletonList(new ModifyInventory(0, newItem))));
    }

    public void spawnNpc(int npcId, Point pos, MapleMap map) {
        MapleNPC npc = MapleLifeFactory.getNPC(npcId);
        if (npc != null) {
            npc.setPosition(pos);
            npc.setCy(pos.y);
            npc.setRx0(pos.x + 50);
            npc.setRx1(pos.x - 50);
            npc.setFh(map.getFootholds().findBelow(pos).getId());
            map.addMapObject(npc);
            map.broadcastMessage(MaplePacketCreator.spawnNPC(npc));
        }
    }

    public void spawnMonster(int id, int x, int y) {
        MapleMonster monster = MapleLifeFactory.getMonster(id);
        monster.setPosition(new Point(x, y));
        getPlayer().getMap().spawnMonster(monster);
    }

    public void spawnGuide() {
        c.announce(MaplePacketCreator.spawnGuide(true));
    }

    public void removeGuide() {
        c.announce(MaplePacketCreator.spawnGuide(false));
    }

    public void displayGuide(int num) {
        c.announce(MaplePacketCreator.showInfo("UI/tutorial.img/" + num));
    }

    public void talkGuide(String message) {
        c.announce(MaplePacketCreator.talkGuide(message));
    }

    public void guideHint(int hint) {
        c.announce(MaplePacketCreator.guideHint(hint));
    }

    public void updateAreaInfo(Short area, String info) {
        c.getPlayer().updateAreaInfo(area, info);
        c.announce(MaplePacketCreator.enableActions());//idk, nexon does the same :P
    }

    public boolean containsAreaInfo(short area, String info) {
        return c.getPlayer().containsAreaInfo(area, info);
    }

    public MobSkill getMobSkill(int skill, int level) {
        return MobSkillFactory.getMobSkill(skill, level);
    }

    public void earnTitle(String msg) {
        c.announce(MaplePacketCreator.earnTitleMessage(msg));
    }

    public void showInfoText(String msg) {
        c.announce(MaplePacketCreator.showInfoText(msg));
    }

    public void openUI(byte ui) {
        c.announce(MaplePacketCreator.openUI(ui));
    }

    public void lockUI() {
        c.announce(MaplePacketCreator.disableUI(true));
        c.announce(MaplePacketCreator.lockUI(true));
    }

    public void unlockUI() {
        c.announce(MaplePacketCreator.disableUI(false));
        c.announce(MaplePacketCreator.lockUI(false));
    }

    public void playSound(String sound) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.environmentChange(sound, 4));
    }

    public void environmentChange(String env, int mode) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.environmentChange(env, mode));
    }

    public Pyramid getPyramid() {
        return (Pyramid) getPlayer().getPartyQuest();
    }

    public final void saveReturnLocation(final String loc) {
        c.getPlayer().novoSaveLocation(SavedLocationType.fromString(loc), c.getPlayer().getMap().getReturnMap().getId());
    }

    public void givePartyExp(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.gainExp((amount * chr.getExpRate()), true, true);
        }
    }

    public void dojoEnergy() {
        c.announce(MaplePacketCreator.getEnergy("energy", getPlayer().getDojoEnergy()));
    }

    public MapleMonster getMonsterLifeFactory(int mid) {
        return MapleLifeFactory.getMonster(mid);
    }

    public void goDojoUp() {
        c.announce(MaplePacketCreator.dojoWarpUp());
    }

    public void enableActions() {
        c.announce(MaplePacketCreator.enableActions());
    }

    public void showEffect(String effect) {
        c.announce(MaplePacketCreator.showEffect(effect));
    }

    public final int getMapIdcpq() {
        return c.getPlayer().getMap().getId();
    }

    public final MapleMap getMap() {
        return c.getPlayer().getMap();
    }

    public long getCurrentTime() {
        return System.currentTimeMillis();
    }

    public void giveItemBuff(int itemID) {
        c.getPlayer().giveItemBuff(itemID);
    }

    public EventInstanceManager getDisconnected(String event) {
        EventManager em = getEventManager(event);
        if (em == null) {
            return null;
        }
        for (EventInstanceManager eim : em.getInstances()) {
            if (eim.isDisconnected(c.getPlayer()) && eim.getPlayerCount() > 0) {
                return eim;
            }
        }
        return null;
    }

    public String getItemName(final int id) {
        return MapleItemInformationProvider.getInstance().getName(id);
    }

    public final Channel getChannelServer() {
        return c.getChannelServer();
    }

    /*public void openNpc(int npcid) {
     NPCScriptManager.getInstance().dispose(c);
     NPCScriptManager.getInstance().start(c, npcid, null, null);
     }
     */
    public void openNpc(int npcid) {
        openNpc(npcid, null);
    }

    public void openNpc(int npcid, String script) {
        if (c.getCM() != null) {
            return;
        }

        c.removeClickedNPC();
        NPCScriptManager.getInstance().dispose(c);
        NPCScriptManager.getInstance().start(c, npcid, script, null);
    }

    /*public final void openNpc(final MapleClient cg, final int id) {
     cg.removeClickedNPC();
     NPCScriptManager.getInstance().start(cg, id);
     }
     */
    public int itemQuantity(int itemid) {
        return getPlayer().itemQuantity(itemid);
    }

    public EventInstanceManager getDisconnectedpb(String event) {
        EventManager em = getEventManager(event);
        if (em == null) {
            return null;
        }
        for (EventInstanceManager eim : em.getInstances()) {
            if (eim.isDisconnected(c.getPlayer()) && eim.getPlayerCount() > 0) {
                return eim;
            }
        }
        return null;
    }

    public final void killMob(int ids) {
        c.getPlayer().getMap().killMonster(ids);
    }

    public int getZakumLevel() {
        return c.getPlayer().getZakumLevel();
    }

    public void setZakumLevel(int level) {
        c.getPlayer().setZakumLevel(level);
    }

    public void addZakumLevel() {
        c.getPlayer().addZakumLevel();
    }

    public void subtractZakumLevel() {
        c.getPlayer().subtractZakumLevel();
    }

    // summon one monster, remote location
    // multiple monsters, remote location
    public void spawnMonster(int id, int qty, int x, int y) {
        spawnMonster(id, qty, new Point(x, y));
    }

    // handler for all spawnMonster
    public void spawnMonster(int id, int qty, Point pos) {
        for (int i = 0; i < qty; i++) {
            getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(id), pos);
        }
    }

    public void gainExp(int gain) {
        c.getPlayer().gainExp(gain, true, true, true);
    }

    public void gainExpR(int gain) {
        c.getPlayer().gainExp(gain * c.getChannelServer().getExpRate(), true, true, true);
    }

    public MapleExpedition getExpedition(MapleExpeditionType type) {
        for (MapleExpedition exped : getPlayer().getClient().getChannelServer().getExpeditions()) {
            if (exped.getType().equals(type)) {
                return exped;
            }
        }
        return null;
    }

    public void endExpedition(MapleExpedition exped) {
        exped.dispose(true);
        getPlayer().getClient().getChannelServer().getExpeditions().remove(exped);
    }

}
