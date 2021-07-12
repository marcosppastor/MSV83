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
package scripting.npc;

import client.*;
import client.inventory.*;
import config.game.Messages;
import constants.ExpTable;
import constants.GameConstants;
import java.awt.Point;
import java.io.File;
import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import javax.script.Invocable;
import net.server.Server;
import net.server.channel.Channel;
import net.server.guild.MapleAlliance;
import net.server.guild.MapleGuild;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import net.server.world.World;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import scripting.AbstractPlayerInteraction;
import server.*;
import server.MapleTimer.NPCTimer;
import server.events.gm.MapleEvent;
import server.expeditions.MapleExpedition;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MapleMonsterStats;
import server.life.MapleNPC;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.partyquest.Pyramid;
import server.partyquest.Pyramid.PyramidMode;
import server.quest.MapleQuest;
import tools.DatabaseConnection;
import tools.FilePrinter;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Randomizer;
import tools.packet.CWvsContext;
import tools.packet.CWvsContext;
import tools.packet.CWvsContext.InventoryPacket.InfoPacket;

/**
 *
 * @author Matze
 */
public class NPCConversationManager extends AbstractPlayerInteraction {

    private MapleInventory[] inventário;
    //private MapleClient c;

    protected int channel, playerCount = 0;
    private int npc;
    private String getText;
    private String fileName = null;
    private MapleCharacter chr;
    private ScheduledFuture<?> teste = null;
    private Collection<MapleCharacter> characters = new LinkedHashSet<>();
    private List<MaplePartyCharacter> otherParty;
    private int npcOid;
    private String scriptName;
    public static ScheduledFuture<?> lobby;
    private Invocable iv;
    private byte type; // -1 = NPC, 0 = start quest, 1 = end quest

    /*public NPCConversationManager(MapleClient c, int npc) {
     super(c);
     this.npc = npc;
     }
     */
    public NPCConversationManager(MapleClient c, int npc) {
        super(c);
        this.c = c;
        this.npc = npc;
    }

    public NPCConversationManager(MapleClient c, int npc, MapleCharacter chr) {
        super(c);
        this.c = c;
        this.npc = npc;
        this.chr = chr;
    }

    public NPCConversationManager(MapleClient c, int npc, MapleCharacter chr, String fileName) {
        super(c);
        this.c = c;
        this.npc = npc;
        this.chr = chr;
        this.fileName = fileName;
    }

    public NPCConversationManager(MapleClient c, int npc, List<MaplePartyCharacter> otherParty, int b) {
        super(c);
        this.c = c;
        this.npc = npc;
        this.otherParty = otherParty;
    }

    public NPCConversationManager(MapleClient c, int npc, int oid, String scriptName) {
        super(c);
        this.npc = npc;
        this.npcOid = oid;
        this.scriptName = scriptName;
    }

    public NPCConversationManager(MapleClient c, int npc, int questid, byte type, Invocable iv) {
        super(c, npc, questid);
        this.type = type;
        this.iv = iv;
    }

    public int getNpc() {
        return npc;
    }

    public byte getType() {
        return type;
    }

    public void dispose() {
        NPCScriptManager.getInstance().dispose(this);
    }

    public void sendNext(String text) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", (byte) 0));

    }

    public void sendPrev(String text) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", (byte) 0));
    }

    public void sendNextPrev(String text) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", (byte) 0));
    }

    public void sendOk(String text) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", (byte) 0));
    }

    public void sendYesNo(String text) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 1, text, "", (byte) 0));
    }

    public void sendAcceptDecline(String text) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0x0C, text, "", (byte) 0));
    }

    public void sendSimple(String text) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 4, text, "", (byte) 0));
    }

    public void sendSimple(String text, String... selections) {
        if (selections.length > 0) // Adding this even if selections length is 0 will do anything, but whatever.
        {
            text += "#b\r\n";
        }
        for (int i = 0; i < selections.length; i++) {
            text += "#L" + i + "#" + selections[i] + "#l\r\n";
        }
        sendSimple(text);
    }

    public void sendNext(String text, byte speaker) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", speaker));
    }

    public void sendPrev(String text, byte speaker) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", speaker));
    }

    public void sendNextPrev(String text, byte speaker) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", speaker));
    }

    public void sendOk(String text, byte speaker) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", speaker));
    }

    public void sendYesNo(String text, byte speaker) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 1, text, "", speaker));
    }

    public void sendAcceptDecline(String text, byte speaker) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0x0C, text, "", speaker));
    }

    public void sendSimple(String text, byte speaker) {
        getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 4, text, "", speaker));
    }

    public void sendStyle(String text, int styles[]) {
        getClient().announce(MaplePacketCreator.getNPCTalkStyle(npc, text, styles));
    }

    public void sendGetNumber(String text, int def, int min, int max) {
        getClient().announce(MaplePacketCreator.getNPCTalkNum(npc, text, def, min, max));
    }

    public void sendGetText(String text) {
        getClient().announce(MaplePacketCreator.getNPCTalkText(npc, text, ""));
    }

    /*
     * 0 = ariant colliseum
     * 1 = Dojo
     * 2 = Carnival 1
     * 3 = Carnival 2
     * 4 = Ghost Ship PQ?
     * 5 = Pyramid PQ
     * 6 = Kerning Subway
     */
    public void sendDimensionalMirror(String text) {
        getClient().announce(MaplePacketCreator.getDimensionalMirror(text));
    }

    public void setGetText(String text) {
        this.getText = text;
    }

    public String getText() {
        return this.getText;
    }

    public int getJobId() {
        return getPlayer().getJob().getId();
    }

    public void aprenderSkill(int id, int level, int masterlevel) {
        getPlayer().alterarLevelSkill(SkillFactory.obterSkill(id), level, masterlevel);
    }

    public void startQuest(short id) {
        try {
            MapleQuest.getInstance(id).forceStart(getPlayer(), npc);
        } catch (NullPointerException ex) {
        }
    }

    public void completeQuest(short id) {
        try {
            MapleQuest.getInstance(id).forceComplete(getPlayer(), npc);
        } catch (NullPointerException ex) {
        }
    }

    public int getMeso() {
        return getPlayer().getMeso();
    }

    public void gainMeso(int gain) {
        if (gain > 0) {
            //FilePrinter.printError(FilePrinter.JOGADOR_BANIDO+FilePrinter.EXPLOITS+"", "Em suma, " + c.getPlayer().getName() + " ganhou " + gain + " mesos do NPC " + npc + "\r\n");
        }
        getPlayer().gainMeso(gain, true, false, true);
    }

    public void gainExp(int gain) {
        getPlayer().gainExp(gain, true, true);
    }

    public int getLevel() {
        return getPlayer().getLevel();
    }

    public void showEffect(String effect) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.environmentChange(effect, 3));
    }

    public void setHair(int hair) {
        getPlayer().setHair(hair);
        getPlayer().updateSingleStat(MapleStat.HAIR, hair);
        getPlayer().equipChanged();
    }

    public void setFace(int face) {
        getPlayer().setFace(face);
        getPlayer().updateSingleStat(MapleStat.FACE, face);
        getPlayer().equipChanged();
    }

    public void setSkin(int color) {
        getPlayer().setSkinColor(MapleSkinColor.getById(color));
        getPlayer().updateSingleStat(MapleStat.SKIN, color);
        getPlayer().equipChanged();
    }

    public int itemQuantity(int itemid) {
        return getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(itemid)).countById(itemid);
    }

    public Item getItem(int slot, int type) {
        MapleInventory invy = c.getPlayer().getInventory(MapleInventoryType.getByType((byte) type));
        for (Item item : invy.list()) {
            if (item.getPosition() == slot) {
                return item;
            }
        }
        return null;
    }

    public void RichieEnter(MapleClient ct) {
        boolean warp = false;
        if (ct.getPlayer().getLevel() > 9 && ct.getPlayer().getLevel() < 20 && ct.getChannelServer().getMapFactory().getMap(390000100).getCharactersSize() == 0) { // 10~20
            ct.getPlayer().changeMap(390000100);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 19 && ct.getPlayer().getLevel() < 30 && ct.getChannelServer().getMapFactory().getMap(390000200).getCharactersSize() == 0) { // 20~30
            ct.getPlayer().changeMap(390000200);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 29 && ct.getPlayer().getLevel() < 40 && ct.getChannelServer().getMapFactory().getMap(390000300).getCharactersSize() == 0) { // 30~40
            ct.getPlayer().changeMap(390000300);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 39 && ct.getPlayer().getLevel() < 50 && ct.getChannelServer().getMapFactory().getMap(390000400).getCharactersSize() == 0) { // 40~50
            ct.getPlayer().changeMap(390000400);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 49 && ct.getPlayer().getLevel() < 60 && ct.getChannelServer().getMapFactory().getMap(390000500).getCharactersSize() == 0) { // 50~60
            ct.getPlayer().changeMap(390000500);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 59 && ct.getPlayer().getLevel() < 70 && ct.getChannelServer().getMapFactory().getMap(390000600).getCharactersSize() == 0) { // 60~70
            ct.getPlayer().changeMap(390000600);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 69 && ct.getPlayer().getLevel() < 80 && ct.getChannelServer().getMapFactory().getMap(390000700).getCharactersSize() == 0) { // 70~80
            ct.getPlayer().changeMap(390000700);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 79 && ct.getPlayer().getLevel() < 90 && ct.getChannelServer().getMapFactory().getMap(390000800).getCharactersSize() == 0) { // 80~90
            ct.getPlayer().changeMap(390000800);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 89 && ct.getPlayer().getLevel() < 100 && ct.getChannelServer().getMapFactory().getMap(390000900).getCharactersSize() == 0) { // 90~100
            ct.getPlayer().changeMap(390000900);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 99 && ct.getChannelServer().getMapFactory().getMap(390001000).getCharactersSize() == 0) { // 100+
            ct.getPlayer().changeMap(390001000);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        } else {
            if (warp == false) {
                String texto = "O mapa deve estar cheio, tente outro canal!";
                ct.getSession().write(MaplePacketCreator.getNPCTalk(2084002, (byte) 0, texto, "00 00"));
            }
        }
        ct.getSession().write(MaplePacketCreator.enableActions());
    }

    public void EntradaMPQ(MapleClient ct) {
        boolean warp = false;
        if (ct.getPlayer().getLevel() > 9 && ct.getPlayer().getLevel() < 20 && ct.getChannelServer().getMapFactory().getMap(390000100).getCharactersSize() == 0) { // 10~20
            ct.getPlayer().changeMap(390000100);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 19 && ct.getPlayer().getLevel() < 30 && ct.getChannelServer().getMapFactory().getMap(390000200).getCharactersSize() == 0) { // 20~30
            ct.getPlayer().changeMap(390000200);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 29 && ct.getPlayer().getLevel() < 40 && ct.getChannelServer().getMapFactory().getMap(390000300).getCharactersSize() == 0) { // 30~40
            ct.getPlayer().changeMap(390000300);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 39 && ct.getPlayer().getLevel() < 50 && ct.getChannelServer().getMapFactory().getMap(390000400).getCharactersSize() == 0) { // 40~50
            ct.getPlayer().changeMap(390000400);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 49 && ct.getPlayer().getLevel() < 60 && ct.getChannelServer().getMapFactory().getMap(390000500).getCharactersSize() == 0) { // 50~60
            ct.getPlayer().changeMap(390000500);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 59 && ct.getPlayer().getLevel() < 70 && ct.getChannelServer().getMapFactory().getMap(390000600).getCharactersSize() == 0) { // 60~70
            ct.getPlayer().changeMap(390000600);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 69 && ct.getPlayer().getLevel() < 80 && ct.getChannelServer().getMapFactory().getMap(390000700).getCharactersSize() == 0) { // 70~80
            ct.getPlayer().changeMap(390000700);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 79 && ct.getPlayer().getLevel() < 90 && ct.getChannelServer().getMapFactory().getMap(390000800).getCharactersSize() == 0) { // 80~90
            ct.getPlayer().changeMap(390000800);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 89 && ct.getPlayer().getLevel() < 100 && ct.getChannelServer().getMapFactory().getMap(390000900).getCharactersSize() == 0) { // 90~100
            ct.getPlayer().changeMap(390000900);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        }
        if (ct.getPlayer().getLevel() > 99 && ct.getChannelServer().getMapFactory().getMap(390001000).getCharactersSize() == 0) { // 100+
            ct.getPlayer().changeMap(390001000);
            ct.getPlayer().gainItem(2430008, (short) -1, false, true);
            warp = true;
        } else {
            if (warp == false) {
                String texto = "O mapa deve estar cheio, tente outro canal!";
                ct.getSession().write(MaplePacketCreator.getNPCTalk(2084002, (byte) 0, texto, "00 00"));
            }
        }
        ct.getSession().write(MaplePacketCreator.enableActions());
    }

    public void displayGuildRanks() {
        MapleGuild.displayGuildRanks(getClient(), npc);
    }

    public MapleSquad createMapleSquad(MapleSquadType type) {
        MapleSquad squad = new MapleSquad(c.getChannel(), getPlayer());
        if (getSquadState(type) == 0) {
            c.getChannelServer().addMapleSquad(squad, type);
        } else {
            return null;
        }
        return squad;
    }

    public MapleSquad getSquad(MapleSquadType Type) {
        return c.getChannelServer().getMapleSquad(Type);
    }

    public MapleCharacter getSquadMember(MapleSquadType type, int index) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        MapleCharacter ret = null;
        if (squad != null) {
            ret = squad.getMembers().get(index);
        }
        return ret;
    }

    public MapleCharacter getSendermarriage() {
        return this.chr;
    }

    public boolean createMarriage(String partner_) {
        MapleCharacter partner = getCharByName(partner_);
        if (partner == null) {
            return false;
        }
        partner.setMarried(1);
        getPlayer().setMarried(1);
        partner.setPartnerId(getPlayer().getId());
        getPlayer().setPartnerId(partner.getId());
        if (partner.getGender() > 0) {
            Marriage.createMarriage(getPlayer(), partner);
        } else {
            Marriage.createMarriage(partner, getPlayer());
        }
        return true;
    }

    public void giveWonkyBuff(MapleCharacter chr) {
        int Buffs[] = {2022090, 2022091, 2022092, 2022093};
        MapleItemInformationProvider.getInstance().getItemEffect(Buffs[(int) Math.round(Math.random() * 4)]).applyTo((MapleCharacter) chr);
    }

    public int getSquadState(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            return squad.getStatus();
        } else {
            return 0;
        }
    }

    public void setSquadState(MapleSquadType type, int state) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.setStatus(state);
        }
    }

    public boolean checkSquadLeader(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            return squad.getLeader().getId() == getPlayer().getId();
        } else {
            return false;
        }
    }

    public Point getNPCPosition() {
        MapleNPC thenpc = MapleLifeFactory.getNPC(this.npc);
        Point pos = thenpc.getPosition();
        return pos;
    }

    public Point getPosition() {
        Point pos = getPlayer().getPosition();
        return pos;
    }

    public void removeMapleSquad(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            if (squad.getLeader().getId() == getPlayer().getId()) {
                squad.clear();
                c.getChannelServer().removeMapleSquad(squad, type);
            }
        }
    }

    public int numSquadMembers(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        int ret = 0;
        if (squad != null) {
            ret = squad.getSquadSize();
        }
        return ret;
    }

    public boolean isSquadMember(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        boolean ret = false;
        if (squad.containsMember(getPlayer())) {
            ret = true;
        }
        return ret;
    }

    public void addSquadMember(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.addMember(getPlayer());
        }
    }

    public void removeSquadMember(MapleSquadType type, MapleCharacter chr, boolean ban) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.banMember(chr, ban);
        }
    }

    public void removeSquadMember(MapleSquadType type, int index, boolean ban) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            MapleCharacter chr = squad.getMembers().get(index);
            squad.banMember(chr, ban);
        }
    }

    public boolean canAddSquadMember(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            return !squad.isBanned(getPlayer());
        }
        return false;
    }

    public void warpSquadMembers(MapleSquadType type, int mapId) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        MapleMap map = c.getChannelServer().getMapFactory().getMap(mapId);
        if (squad != null) {
            if (checkSquadLeader(type)) {
                for (MapleCharacter chr : squad.getMembers()) {
                    chr.changeMap(map, map.getPortal(0));
                }
            }
        }
    }

    @Override
    public MapleParty getParty() {
        return getPlayer().getParty();
    }

    @Override
    public void resetMap(int mapid) {
        getClient().getChannelServer().getMapFactory().getMap(mapid).resetReactors();
    }

    public void gainCloseness(int closeness) {
        for (MaplePet pet : getPlayer().getPets()) {
            if (pet.getCloseness() > 30000) {
                pet.setCloseness(30000);
                return;
            }
            pet.gainCloseness(closeness);
            while (pet.getCloseness() > ExpTable.getClosenessNeededForLevel(pet.getLevel())) {
                pet.setLevel((byte) (pet.getLevel() + 1));
                byte index = getPlayer().getPetIndex(pet);
                getClient().announce(MaplePacketCreator.showOwnPetLevelUp(index));
                getPlayer().getMap().broadcastMessage(getPlayer(), MaplePacketCreator.showPetLevelUp(getPlayer(), index));
            }
            Item petz = getPlayer().getInventory(MapleInventoryType.CASH).getItem(pet.getPosition());
            getPlayer().forceUpdateItem(petz);
        }
    }

    public String getName() {
        return getPlayer().getName();
    }

    public int getGender() {
        return getPlayer().getGender();
    }

    public int countMonster() {
        return c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER)).size();
    }

    public int countReactor() {
        return c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.REACTOR)).size();
    }

    public int getDayOfWeek() {
        return Calendar.getInstance().get(Calendar.DAY_OF_WEEK);
    }

    public void changeJob(MapleJob job) {
        getPlayer().changeJob(job);
    }

    public void changeJobById(int a) {
        getPlayer().changeJob(MapleJob.getById(a));
    }

    public MapleJob getJob() {
        return getPlayer().getJob();
    }

    public String getJobById(int id) {
        return MapleJob.getJobName(id);
    }

    public int getEquipId(byte slot) {
        MapleInventory equip = getPlayer().getInventory(MapleInventoryType.EQUIP);
        Equip eu = (Equip) equip.getItem(slot);
        return equip.getItem(slot).getItemId();
    }

    public int getEquipadoId(byte slot) {
        MapleInventory equip = getPlayer().getInventory(MapleInventoryType.EQUIPPED);
        Equip eu = (Equip) equip.getItem(slot);
        return equip.getItem(slot).getItemId();
    }

    public int getUseId(byte slot) {
        MapleInventory use = getPlayer().getInventory(MapleInventoryType.USE);
        return use.getItem(slot).getItemId();
    }

    public int getSetupId(byte slot) {
        MapleInventory setup = getPlayer().getInventory(MapleInventoryType.SETUP);
        return setup.getItem(slot).getItemId();
    }

    public int getCashId(byte slot) {
        MapleInventory cash = getPlayer().getInventory(MapleInventoryType.CASH);
        return cash.getItem(slot).getItemId();
    }

    public int getETCId(byte slot) {
        MapleInventory etc = getPlayer().getInventory(MapleInventoryType.ETC);
        return etc.getItem(slot).getItemId();
    }

    public String EquipList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory equip = c.getPlayer().getInventory(MapleInventoryType.EQUIP);
        List<String> stra = new LinkedList<String>();
        for (Item item : equip.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    public String UseList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory use = c.getPlayer().getInventory(MapleInventoryType.USE);
        List<String> stra = new LinkedList<String>();
        for (Item item : use.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    public String CashList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory cash = c.getPlayer().getInventory(MapleInventoryType.CASH);
        List<String> stra = new LinkedList<String>();
        for (Item item : cash.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    public String ETCList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory etc = c.getPlayer().getInventory(MapleInventoryType.ETC);
        List<String> stra = new LinkedList<String>();
        for (Item item : etc.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    public String SetupList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory setup = c.getPlayer().getInventory(MapleInventoryType.SETUP);
        List<String> stra = new LinkedList<String>();
        for (Item item : setup.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    public String Equipado(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory equipado = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED);
        List<String> stra = new LinkedList<String>();
        for (Item item : equipado.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    public void wearEquip(int itemid, byte slot) {
        final MapleItemInformationProvider li = MapleItemInformationProvider.getInstance();
        final MapleInventory equip = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED);
        Item item = li.getEquipById(itemid);
        item.setPosition(slot);
        equip.addFromDB(item);
    }

    public int parseInt(String s) {
        return Integer.parseInt(s);
    }

    public byte parseByte(String s) {
        return Byte.parseByte(s);
    }

    public short parseShort(String s) {
        return Short.parseShort(s);
    }

    public long parseLong(String s) {
        return Long.parseLong(s);
    }

    public void write(Object o) {
        c.getSession().write(o);
    }

    /*@Deprecated
     public MapleCharacter getChar() {
     return getPlayer();
     } 
     */
    public MapleCharacter getChar() {
        return c.getPlayer();
    }

    public MapleClient getC() {
        return getClient();
    }

    public void resetStats() {
        getPlayer().resetStats();
    }

    public void resetarStats() {
        int totAp = getPlayer().getStr() + getPlayer().getDex() + getPlayer().getLuk() + getPlayer().getInt() + getPlayer().getRemainingAp();
        getPlayer().setStr(4);
        getPlayer().setDex(4);
        getPlayer().setLuk(4);
        getPlayer().setInt(4);
        getPlayer().setRemainingAp(totAp - 16);
        getPlayer().updateSingleStat(MapleStat.STR, 4);
        getPlayer().updateSingleStat(MapleStat.DEX, 4);
        getPlayer().updateSingleStat(MapleStat.LUK, 4);
        getPlayer().updateSingleStat(MapleStat.INT, 4);
        getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, totAp);
    }

    public void reloadChar() {
        getPlayer().getClient().getSession().write(MaplePacketCreator.getCharInfo(getPlayer()));
        getPlayer().getMap().removePlayer(getPlayer());
        getPlayer().getMap().addPlayer(getPlayer());
        playerMessage(5, "Verifique seu inventário.");
    }

    public void openShopNPC(int id) {
        MapleShopFactory.getInstance().getShop(id).sendShop(c);
    }

    public void addRandomItem(int id) {
        MapleItemInformationProvider i = MapleItemInformationProvider.getInstance();
        MapleInventoryManipulator.addFromDrop(getClient(), i.randomizeStats((Equip) i.getEquipById(id)), true);
    }

    public MapleJob getJobName(int id) {
        return MapleJob.getById(id);
    }

    public MapleCharacter getCharByName(String namee) {
        try {
            return getClient().getChannelServer().getPlayerStorage().getCharacterByName(namee);
        } catch (Exception e) {
            return null;
        }
    }

    public MapleStatEffect getItemEffect(int itemId) {
        return MapleItemInformationProvider.getInstance().getItemEffect(itemId);
    }

    public void maxMastery() {
        for (MapleData skill_ : MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/" + "String.wz")).getData("Skill.img").getChildren()) {
            try {
                Skill skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
                getPlayer().changeSkillLevel(skill, (byte) 0, skill.getMaxLevel(), -1);
            } catch (NumberFormatException nfe) {
                break;
            } catch (NullPointerException npe) {
                continue;
            }
        }
    }

    public void processGachapon(int[] id, boolean remote) {
        int[] gacMap = {100000000, 101000000, 102000000, 103000000, 105040300, 800000000, 809000101, 809000201, 600000000, 120000000};
        int itemid = id[Randomizer.nextInt(id.length)];
        addRandomItem(itemid);
        if (!remote) {
            gainItem(5220000, (short) -1);
        }
        sendOk("Você ganhou um #b#t" + itemid + "##k (#i" + itemid + "#).");
        getClient().getChannelServer().broadcastPacket(MaplePacketCreator.gachaponMessage(getPlayer().getInventory(MapleInventoryType.getByType((byte) (itemid / 1000000))).findById(itemid), c.getChannelServer().getMapFactory().getMap(gacMap[(getNpc() != 9100117 && getNpc() != 9100109) ? (getNpc() - 9100100) : getNpc() == 9100109 ? 8 : 9]).getMapName(), getPlayer()));
    }

    public void disbandAlliance(MapleClient c, int allianceId) {
        PreparedStatement ps = null;
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM `alliance` WHERE id = ?");
            ps.setInt(1, allianceId);
            ps.executeUpdate();
            ps.close();
            Server.getInstance().allianceMessage(c.getPlayer().getGuild().getAllianceId(), MaplePacketCreator.disbandAlliance(allianceId), -1, -1);
            Server.getInstance().disbandAlliance(allianceId);
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        } finally {
            try {
                if (ps != null && !ps.isClosed()) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public boolean canBeUsedAllianceName(String name) {
        if (name.contains(" ") || name.length() > 12) {
            return false;
        }
        try {
            ResultSet rs;
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT name FROM alliance WHERE name = ?")) {
                ps.setString(1, name);
                rs = ps.executeQuery();
                if (rs.next()) {
                    ps.close();
                    rs.close();
                    return false;
                }
            }
            rs.close();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public void warpParty(int id) {
        for (MapleCharacter mc : getPartyMembers()) {
            if (id == 925020100) {
                mc.setDojoParty(true);
            }
            mc.changeMap(getWarpMap(id));
        }
    }

    public boolean hasMerchant() {
        return getPlayer().hasMerchant();
    }

    public boolean hasMerchantItems() {
        try {
            if (!ItemFactory.MERCHANT.loadItems(getPlayer().getId(), false).isEmpty()) {
                return true;
            }
        } catch (SQLException e) {
            return false;
        }
        if (getPlayer().getMerchantMeso() == 0) {
            return false;
        } else {
            return true;
        }
    }

    public void showFredrick() {
        c.announce(MaplePacketCreator.getFredrick(getPlayer()));
    }

    public int partyMembersInMap() {
        int inMap = 0;
        for (MapleCharacter char2 : getPlayer().getMap().getCharacters()) {
            if (char2.getParty() == getPlayer().getParty()) {
                inMap++;
            }
        }
        return inMap;
    }

    public MapleEvent getEvent() {
        return c.getChannelServer().getEvent();
    }

    public void divideTeams() {
        if (getEvent() != null) {
            getPlayer().setTeam(getEvent().getLimit() % 2); //muhaha :D
        }
    }

    public MapleExpedition createExpedition(String type, byte min) {
        MapleParty party = getPlayer().getParty();
        if (party == null || party.getMembers().size() < min) {
            return null;
        }
        return new MapleExpedition(getPlayer());
    }

    public boolean createPyramid(String mode, boolean party) {//lol
        PyramidMode mod = PyramidMode.valueOf(mode);

        MapleParty partyz = getPlayer().getParty();
        MapleMapFactory mf = c.getChannelServer().getMapFactory();

        MapleMap map = null;
        int mapid = 926010100;
        if (party) {
            mapid += 10000;
        }
        mapid += (mod.getMode() * 1000);

        for (byte b = 0; b < 5; b++) {//They cannot warp to the next map before the timer ends (:
            map = mf.getMap(mapid + b);
            if (map.getCharacters().size() > 0) {
                continue;
            } else {
                break;
            }
        }

        if (map == null) {
            return false;
        }

        if (!party) {
            partyz = new MapleParty(-1, new MaplePartyCharacter(getPlayer()));
        }
        Pyramid py = new Pyramid(partyz, mod, map.getId());
        getPlayer().setPartyQuest(py);
        py.warp(mapid);
        dispose();
        return true;
    }

    public void editEquipById(int input, byte stat, short value, boolean supergacha) {
        if (supergacha) {
            MapleInventoryManipulator.editEquipById(getPlayer(), input, stat, value, true);
            return;
        }
        MapleInventoryManipulator.editEquipById(getPlayer(), input, stat, value);
    }

    public void summonMob(int mobid, int customHP, int customEXP, int amount) {
        spawnMonster(mobid, customHP, -1, -1, customEXP, 0, 0, amount, getPlayer().getPosition().x, getPlayer().getPosition().y);
    }

    public void setLevel(int level) {
        getPlayer().setLevel(level);
        getPlayer().updateSingleStat(MapleStat.LEVEL, Integer.valueOf(level));
    }

    public void spawnMonster(int mobid, int HP, int MP, int level, int EXP, int boss, int undead, int amount, int x, int y) {
        MapleMonsterStats newStats = new MapleMonsterStats();
        if (HP >= 0) {
            newStats.setHp(HP);
        }
        if (MP >= 0) {
            newStats.setMp(MP);
        }
        if (level >= 0) {
            newStats.setLevel(level);
        }
        if (EXP >= 0) {
            newStats.setExp(EXP);
        }
        newStats.setBoss(boss == 1);
        newStats.setUndead(undead == 1);
        for (int i = 0; i < amount; i++) {
            MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
            npcmob.setOverrideStats(newStats);
            npcmob.setHp(npcmob.getMaxHp());
            npcmob.setMp(npcmob.getMaxMp());
            getPlayer().getMap().spawnMonsterOnGroundBelow(npcmob, new Point(x, y));
        }
    }

    public void summonMob(int mobid) {
        getPlayer().getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(mobid), getNPCPosition());
    }

    public void summonMobAtPosition(int mobid, int customHP, int customEXP, int amount, int posx, int posy) {
        MapleMonsterStats newStats = new MapleMonsterStats();
        if (customHP > 0) {
            newStats.setHp(customHP);
        }
        if (customEXP >= 0) {
            newStats.setExp(customEXP);
        }
        if (amount <= 1) {
            MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
            npcmob.setOverrideStats(newStats);
            npcmob.setHp(npcmob.getMaxHp());
            getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, new Point(posx, posy));
        } else {
            for (int i = 0; i < amount; i++) {
                MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
                npcmob.setOverrideStats(newStats);
                npcmob.setHp(npcmob.getMaxHp());
                getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, new Point(posx, posy));
            }
        }
    }

    public void summonMobAtPosition(int mobid, int amount, int posx, int posy) {
        if (amount <= 1) {
            MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
            npcmob.setHp(npcmob.getMaxHp());
            getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, new Point(posx, posy));
        } else {
            for (int i = 0; i < amount; i++) {
                MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
                npcmob.setHp(npcmob.getMaxHp());
                getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, new Point(posx, posy));
            }
        }
    }

    public void killAllMobs() {
        MapleMap map = getPlayer().getMap();
        double range = Double.POSITIVE_INFINITY;
        List<MapleMapObject> monsters = map.getMapObjectsInRange(getPlayer().getPosition(), range, Arrays.asList(MapleMapObjectType.MONSTER));
        for (MapleMapObject monstermo : monsters) {
            map.killMonster((MapleMonster) monstermo, getPlayer(), false);
        }
    }

    public void spawnMob(int mapid, int mid, int xpos, int ypos) {
        getClient().getChannelServer().getMapFactory().getMap(mapid).spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(mid), new Point(xpos, ypos));
    }

    public final MapleInventory getInventory(MapleInventoryType type) {
        return inventário[type.ordinal()];
    }

    public final MapleInventory[] getInventorys() {
        return inventário;
    }

    public void unequipEverything() {
        MapleInventory equipped = getPlayer().getInventory(MapleInventoryType.EQUIPPED);
        MapleInventory equip = getPlayer().getInventory(MapleInventoryType.EQUIP);
        List<Byte> ids = new LinkedList<Byte>();
        for (Item item : equipped.list()) {
            ids.add(item.getPosition());
        }
        for (byte id : ids) {
            MapleInventoryManipulator.unequip(getC(), id, equip.getNextFreeSlot());
        }
    }

    public String searchMobs(String mob_name) {
        StringBuilder sb = new StringBuilder();
        MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
        MapleData data = dataProvider.getData("Mob.img");
        if (data != null) {
            String name;
            for (MapleData searchData : data.getChildren()) {
                name = MapleDataTool.getString(searchData.getChildByPath("name"), "NO-NAME");
                if (name.toLowerCase().contains(mob_name.toLowerCase())) {
                    sb.append("#L" + searchData.getName() + "##b").append(Integer.parseInt(searchData.getName())).append("#k - #r").append(name).append("\r\n");
                }
            }
        }
        if (sb.length() == 0) {
            sb.append("Não há indicios  de mob/boss com este nome.");
        }
        return sb.toString();
    }

    public int getMonsterCount(int map) {
        return c.getChannelServer().getMapFactory().getMap(map).getMonsterCount();
    }

    //public int getMapIdcpq() {
    //return c.getPlayer().getMap().getId();
    //}  
    public void spawnMobOnDiffMap(int mapid, int mobid, int amount, int xpos, int ypos) {
        MapleMap target = c.getChannelServer().getMapFactory().getMap(mapid);
        for (int x = 0; x < amount; x++) {
            target.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobid), new Point(xpos, ypos));
        }

    }

    public MapleCharacter getChrById(int id) {
        Channel cs = c.getChannelServer();
        return cs.getPlayerStorage().getCharacterById(id);
    }

    public int makeRing(String partner, int ringId) {
        return makeRing(getCharByName(partner), ringId);
    }

    public int makeRing(MapleCharacter partner, int ringId) {
        int ret = MapleRing.createRing(ringId, getPlayer(), partner);
        return ret;
    }

    public void createEngagement(MapleCharacter arg1, MapleCharacter arg2) {
        Marriage.createEngagement(arg1, arg2);
    }

    public int createMarriage(int hchr, int wchr) {
        Marriage.createMarriage(hchr, wchr);
        return 1;
    }

    public int gainGachaponItem(int id, int quantity) {
        return gainGachaponItem(id, quantity, c.getPlayer().getMap().getStreetName());
    }

    public int gainGachaponItem(int id, int quantity, final String msg) {
        try {
            if (!MapleItemInformationProvider.getInstance().itemExists(id)) {
                return -1;
            }
            final Item item = MapleInventoryManipulator.addbyId_Gachapon(c, id, (short) quantity);

            if (item == null) {
                return -1;
            }
            final byte rareness = GameConstants.gachaponRareItem(item.getItemId());
            if (rareness > 0) {
                World.Broadcast.broadcastMessage(c.getWorld(), CWvsContext.getGachaponMega(c.getPlayer().getName(), " : ganhou um", item, rareness, msg));
            }
            c.getSession().write(InfoPacket.getShowItemGain(item.getItemId(), (short) quantity, true));
            return item.getItemId();
        } catch (Exception e) {
        }
        return -1;
    }

    public boolean isPlayerInstance() {
        if (c.getPlayer().getEventInstance() != null) {
            return true;
        }
        return false;
    }

    public int getGiftLog(String idbonificacao) {
        return getPlayer().getGiftLog(idbonificacao);
    }

    public int getBossLog(String idbonificacao) {
        return getPlayer().getBossLog(idbonificacao);
    }

    public void setBossLog(String idbonificacao) {
        getPlayer().setBossLog(idbonificacao);
    }

    public int getCashBonificacao(String idbonificacao) {//getGiftLog
        return getPlayer().getCashLog(idbonificacao);//getGiftLog
    }

    public int getCashLog(String idbonificacao) {//getBossLog
        return getPlayer().getCashLog(idbonificacao);//getBossLog
    }

    public void setCashLog(String idbonificacao) {//setBossLog
        getPlayer().setCashLog(idbonificacao);
    }

    public void modifyNX(int amount, int type) {
        getPlayer().getCashShop().gainCash(1, amount);
        if (amount > 0) {
            getClient().getSession().write(MaplePacketCreator.serverNotice(5, "Você acaba de ganhar " + amount + " de NX."));
        } else {
            getClient().getSession().write(MaplePacketCreator.serverNotice(5, "Você acaba de perder " + amount + " de NX."));
        }
    }

    public boolean getHiredMerchantItems(boolean tempTable) {
        boolean temp = false, compleated = false;
        String Table = "";
        if (tempTable) {
            Table = "temp";
            temp = true;
        }
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM hiredmerchant" + Table + " WHERE ownerid = ?");
            ps.setInt(1, getPlayer().getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getInt("type") == 1) {
                    Equip spItem = new Equip(rs.getInt("itemid"), (byte) 0, -1);
                    spItem.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
                    spItem.setLevel((byte) rs.getInt("level"));
                    spItem.setStr((short) rs.getInt("str"));
                    spItem.setDex((short) rs.getInt("dex"));
                    spItem.setInt((short) rs.getInt("int"));
                    spItem.setLuk((short) rs.getInt("luk"));
                    spItem.setHp((short) rs.getInt("hp"));
                    spItem.setMp((short) rs.getInt("mp"));
                    spItem.setWatk((short) rs.getInt("watk"));
                    spItem.setMatk((short) rs.getInt("matk"));
                    spItem.setWdef((short) rs.getInt("wdef"));
                    spItem.setMdef((short) rs.getInt("mdef"));
                    spItem.setAcc((short) rs.getInt("acc"));
                    spItem.setAvoid((short) rs.getInt("avoid"));
                    spItem.setHands((short) rs.getInt("hands"));
                    spItem.setSpeed((short) rs.getInt("speed"));
                    spItem.setJump((short) rs.getInt("jump"));
                    spItem.setOwner(rs.getString("owner"));
                    if (!getPlayer().getInventory(MapleInventoryType.EQUIP).isFull()) {
                        MapleInventoryManipulator.addFromDrop(c, (IItem) spItem, "", true);
                        removeHiredMerchantItem(temp, spItem.getItemId());
                    } else {
                        rs.close();
                        ps.close();
                        return false;
                    }
                } else {
                    Item spItem = new Item(rs.getInt("itemid"), (byte) 0, (short) rs.getInt("quantity"));
                    spItem.setOwner(rs.getString("owner"));
                    MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                    MapleInventoryType type = ii.getInventoryType(spItem.getItemId());
                    if (!getPlayer().getInventory(type).isFull()) {
                        MapleInventoryManipulator.addFromDrop(c, (IItem) spItem, "", true);
                        removeHiredMerchantItem(temp, spItem.getItemId());
                    } else {
                        rs.close();
                        ps.close();
                        return false;
                    }
                }
            }
            rs.close();
            ps.close();
            compleated = true;
        } catch (SQLException se) {
            se.printStackTrace();
            return compleated;
        }
        return compleated;
    }

    public void removeHiredMerchantItem(boolean tempItem, int itemId) {
        String Table = "";
        if (tempItem) {
            Table = "temp";
        }
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM hiredmerchant" + Table + " WHERE itemid = ? AND ownerid = ? LIMIT 1");
            ps.setInt(1, itemId);
            ps.setInt(2, getPlayer().getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException se) {
        }
    }

    public int getHiredMerchantMesos() {
        int mesos;
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT MerchantMesos FROM characters WHERE id = ?");
            ps.setInt(1, getPlayer().getId());
            ResultSet rs = ps.executeQuery();
            rs.next();
            mesos = rs.getInt("MerchantMesos");
            rs.close();
            ps.close();
        } catch (SQLException se) {
            return 0;
        }
        return mesos;
    }

    public void setHiredMerchantMesos(int set) {
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET MerchantMesos = ? WHERE id = ?");
            ps.setInt(1, set);
            ps.setInt(2, getPlayer().getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException se) {
        }
    }

    public boolean hasTemp() {
        if (!getPlayer().hasMerchant() && getPlayer().tempHasItems()) {
            return true;
        } else {
            return false;
        }
    }

    public final MapleCarnivalChallenge getCarnivalChallenge(MapleCharacter chr) {
        return new MapleCarnivalChallenge(chr);
    }

    public final MapleCarnivalChallenge getNextCarnivalRequest() {
        return c.getPlayer().getNextCarnivalRequest();
    }

    public int calcAvgLvl(int map) {
        int num = 0;
        int avg = 0;
        for (MapleMapObject mmo
                : c.getChannelServer().getMapFactory().getMap(map).getAllPlayer()) {
            avg += ((MapleCharacter) mmo).getLevel();
            num++;
        }
        avg /= num;
        return avg;
    }

    public void sendCPQMapLists() {
        String msg = "Participe da Folia dos Monstros!\\r\\n";
        for (int i = 0; i < 6; i++) {
            if (fieldTaken(i)) {
                if (fieldLobbied(i)) {
                    msg += "#b#L" + i + "#Folia dos Monstros " + (i + 1) + " (Nível: "
                            + calcAvgLvl(980000100 + i * 100) + " / " + getPlayerCount(980000100 + i * 100) + "x" + getPlayerCount(980000100 + i * 100) + ")  #l\\r\\n";
                } else {
                    continue;
                }
            } else {
                msg += "#b#L" + i + "#Folia dos Monstros " + (i + 1) + "#l\\r\\n";
            }
        }
        sendSimple(msg);
    }

    public boolean fieldTaken(int field) {
        if (!c.getChannelServer().getMapFactory().getMap(980000100 + field * 100).getAllPlayer().isEmpty()) {
            return true;
        }
        if (!c.getChannelServer().getMapFactory().getMap(980000101 + field * 100).getAllPlayer().isEmpty()) {
            return true;
        }
        if (!c.getChannelServer().getMapFactory().getMap(980000102 + field * 100).getAllPlayer().isEmpty()) {
            return true;
        }
        return false;
    }

    public boolean fieldLobbied(int field) {
        if (!c.getChannelServer().getMapFactory().getMap(980000100 + field * 100).getAllPlayer().isEmpty()) {
            return true;
        }
        return false;
    }

    public void cpqLobby(int field) {
        try {
            MapleMap map;
            Channel cs = c.getChannelServer();
            map = cs.getMapFactory().getMap(980000100 + 100 * field);
            for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                MapleCharacter mc;
                mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
                if (mc != null) {
                    mc.changeMap(map, map.getPortal(0));
                    mc.getClient().announce(MaplePacketCreator.serverNotice(6, "[Folia dos Monstros] Agora você irá receber desafios de outros grupos. Se você não aceitar um desafio em 3 minutos, você será levado para fora."));
                    mc.getClient().getSession().write(MaplePacketCreator.getClock(3 * 60));
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public String getCharName(int id) {
        return c.getChannelServer().getMarket().getCharacterName(id);
    }

    public MapleCharacter getSender() {
        return this.chr;
    }

    public int getSquadAvailability(String type) {
        final MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return -1;
        }
        return squad.getStatus();
    }

    public byte isSquadMember(String type) {
        final MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return -1;
        } else {
            if (squad.getMembers().contains(c.getPlayer())) {
                return 1;
            } else if (squad.isBanned(c.getPlayer())) {
                return 2;
            } else {
                return 0;
            }
        }
    }

    public String getScriptName() {
        return scriptName;
    }
}
