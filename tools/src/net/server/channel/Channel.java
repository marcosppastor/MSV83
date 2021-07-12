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
package net.server.channel;

import client.MapleCharacter;
import client.MapleCharacterUtil;
import client.MapleClient;
import config.jogo.Funções;
import constants.ServerConstants;
import handling.login.LoginServer;
import java.io.File;
import java.net.InetSocketAddress;
import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.WriteLock;
import net.MapleServerHandler;
import net.mina.MapleCodecFactory;
import net.server.PlayerStorage;
import net.server.Server;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import net.server.world.World;
import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.buffer.SimpleBufferAllocator;
import org.apache.mina.core.filterchain.IoFilter;
import org.apache.mina.core.service.IoAcceptor;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.transport.socket.SocketSessionConfig;
import org.apache.mina.transport.socket.nio.NioSocketAcceptor;
import provider.MapleDataProviderFactory;
import scripting.event.EventScriptManager;
import server.MapleSquad;
import server.MapleSquadType;
import server.MapleTimer;
import server.TimerManager;
import server.events.gm.MapleEvent;
import server.expeditions.MapleExpedition;
import server.expeditions.MapleExpeditionType;
import server.maps.HiredMerchant;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.market.MarketEngine;
import tools.DatabaseConnection;
import tools.MaplePacketCreator;

public final class Channel {

    private int port = 6565;
    private PlayerStorage players = new PlayerStorage();
    private int world, channel;
    private IoAcceptor acceptor;
    private String ip, serverMessage;
    private MapleMapFactory mapFactory;
    private List<World> worlds = new ArrayList<>();
    private Map<MapleSquadType, MapleSquad> mapleSquads = new EnumMap<MapleSquadType, MapleSquad>(MapleSquadType.class);
    private EventScriptManager eventSM;
    private Map<Integer, HiredMerchant> hiredMerchants = new HashMap<>();
    private ReentrantReadWriteLock merchant_lock = new ReentrantReadWriteLock(true);
    private EnumMap<MapleExpeditionType, MapleExpedition> expeditions = new EnumMap<>(MapleExpeditionType.class);
    private MapleEvent event;
    private int accId = 1;
    private String pin = null;
    private final ReentrantReadWriteLock squadLock = new ReentrantReadWriteLock(); //squad
    private boolean finishedShutdown = false;
    private static Map<Integer, Channel> instances = new HashMap<Integer, Channel>();
    private int instanceId = 0;
    public boolean eventOn = false;
    private int expRate;
    private int mesoRate;
    private int dropRate;
    private boolean gmWhiteText, cashshop, dropUndroppables, moreThanOne;
    private boolean godlyItems;
    private short itemStatMultiplier;
    private short godlyItemRate;
    private MarketEngine me = new MarketEngine();
    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    private static final SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");
    private List<MapleExpedition> expeditionscwpq = new ArrayList<>();
    private final Lock merchant_mutex = new ReentrantLock();
    private final Map<Integer, HiredMerchant> merchants = new HashMap<Integer, HiredMerchant>();

    public Channel(final int world, final int channel) {
        this.world = world;
        this.channel = channel;
        this.mapFactory = new MapleMapFactory(MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Map.wz")), MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/String.wz")), world, channel);

        try {
            eventSM = new EventScriptManager(this, ServerConstants.EVENTOS.split(" "));
            port = 6565 + this.channel - 1;
            port += (world * 100);
            ip = ServerConstants.HOST + ":" + port;
            IoBuffer.setUseDirectBuffer(false);
            IoBuffer.setAllocator(new SimpleBufferAllocator());
            acceptor = new NioSocketAcceptor();
            TimerManager.getInstance().register(new respawnMaps(), ServerConstants.RESPAWN_INTERVAL);
            acceptor.setHandler(new MapleServerHandler(world, channel));
            acceptor.getSessionConfig().setIdleTime(IdleStatus.BOTH_IDLE, 30);
            acceptor.getFilterChain().addLast("codec", (IoFilter) new ProtocolCodecFilter(new MapleCodecFactory()));
            acceptor.bind(new InetSocketAddress(port));
            ((SocketSessionConfig) acceptor.getSessionConfig()).setTcpNoDelay(true);

            eventSM.init();
            System.out.println("O Canal " + getId() + " está utilizando a porta " + port);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public final void shutdown() {
        try {
            System.out.println("Desligando os canais " + channel + " em Orion " + world);

            closeAllMerchants();
            players.disconnectAll();
            acceptor.unbind();

            finishedShutdown = true;
            System.out.println("Canal " + channel + " foi desligado com sucesso em Orion " + world + "\r\n");
        } catch (Exception e) {
            System.err.println("Erro ao desligar canal " + channel + " em Orion " + world + "\r\n" + e);
        }
    }

    public MapleMapFactory getMapFactory() {
        return mapFactory;
    }

    public int getWorld() {
        return world;
    }

    public void addPlayer(MapleCharacter chr) {
        players.addPlayer(chr);
        chr.announce(MaplePacketCreator.serverMessage(serverMessage));
    }

    public PlayerStorage getPlayerStorage() {
        return players;
    }

    public void removePlayer(MapleCharacter chr) {
        players.removePlayer(chr.getId());
    }

    public int getConnectedClients() {
        return players.getAllCharacters().size();
    }

    public void broadcastPacket(final byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            chr.announce(data);
        }
    }

    public final int getId() {
        return channel;
    }

    public String getIP() {
        return ip;
    }

    public static Collection<Channel> getAllInstances() {
        return Collections.unmodifiableCollection(instances.values());
    }

    public MapleEvent getEvent() {
        return event;
    }

    public void setEvent(MapleEvent event) {
        this.event = event;
    }

    public EventScriptManager getEventSM() {
        return eventSM;
    }

    public void broadcastGMPacket(final byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.isGM()) {
                chr.announce(data);
            }
        }
    }

    public void broadcastGMPacket(final byte[] data, String exclude) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.isGM() && !chr.getName().equals(exclude)) {
                chr.announce(data);
            }
        }
    }

    public void yellowWorldMessage(String msg) {
        for (MapleCharacter mc : getPlayerStorage().getAllCharacters()) {
            mc.announce(MaplePacketCreator.sendYellowTip(msg));
        }
    }

    public void yellowWorldMensagemAmarela(String msg) {
        for (MapleCharacter mc : getPlayerStorage().getAllCharacters()) {
            if (mc.getLevel() > 1 && mc.getLevel() < 199) {
                mc.announce(MaplePacketCreator.sendYellowTip(msg));
            }
        }
    }

    public void yellowWorldMessageAprendiz(String msg) {
        for (MapleCharacter mc : getPlayerStorage().getAllCharacters()) {
            if (mc.getLevel() > 1 && mc.getLevel() < 11) {
                mc.announce(MaplePacketCreator.sendYellowTip(msg));
            }
        }
    }

    public void worldMessage(String msg) {
        for (MapleCharacter mc : getPlayerStorage().getAllCharacters()) {
            mc.dropMessage(msg);
        }
    }

    public List<MapleCharacter> getPartyMembers(MapleParty party) {
        List<MapleCharacter> partym = new ArrayList<>(8);
        for (MaplePartyCharacter partychar : party.getMembers()) {
            if (partychar.getChannel() == getId()) {
                MapleCharacter chr = getPlayerStorage().getCharacterByName(partychar.getName());
                if (chr != null) {
                    partym.add(chr);
                }
            }
        }
        return partym;

    }

    public int getExpRate() {
        return expRate;
    }

    public void setExpRate(int expRate) {
        this.expRate = expRate;
    }

    public int getMesoRate() {
        return mesoRate;
    }

    public void setMesoRate(int mesoRate) {
        this.mesoRate = mesoRate;
    }

    public int getDropRate() {
        return dropRate;
    }

    public void setDropRate(int dropRate) {
        this.dropRate = dropRate;
    }

    public boolean allowUndroppablesDrop() {
        return dropUndroppables;
    }

    public boolean allowMoreThanOne() {
        return moreThanOne;
    }

    public boolean allowGmWhiteText() {
        return gmWhiteText;
    }

    public boolean allowCashshop() {
        return cashshop;
    }

    public List<Channel> getChannelsFromWorld(int world) {
        return worlds.get(world).getChannels();
    }

    public MapleSquad getMapleSquad(MapleSquadType type) {
        return mapleSquads.get(type);
    }

    public boolean addMapleSquad(MapleSquad squad, MapleSquadType type) {
        if (mapleSquads.get(type) == null) {
            mapleSquads.remove(type);
            mapleSquads.put(type, squad);
            return true;
        } else {
            return false;
        }
    }

    public boolean removeMapleSquad(MapleSquad squad, MapleSquadType type) {
        if (mapleSquads.containsKey(type)) {
            if (mapleSquads.get(type) == squad) {
                mapleSquads.remove(type);
                return true;
            }
        }
        return false;
    }

    public void broadcastMessage(byte[] message) {
        broadcastPacket(message);
    }

    public void broadcastGMMessage(byte[] message) {
        broadcastGMPacket(message);
    }

    public void broadcastQuestAlerta_10_30(byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.getLevel() > 9 && chr.getLevel() < 31) {
                chr.getClient().getSession().write(data);
            }
        }
    }

    public void broadcastQuestAlerta_30_50(byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.getLevel() > 30 && chr.getLevel() < 50) {
                chr.getClient().getSession().write(data);
            }
        }
    }

    public void broadcastQuestAlerta_50_70(byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.getLevel() > 50 && chr.getLevel() < 70) {
                chr.getClient().getSession().write(data);
            }
        }
    }

    public void broadcastQuestAlerta_70_100(byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.getLevel() > 71 && chr.getLevel() < 101) {
                chr.getClient().getSession().write(data);
            }
        }
    }

    public void broadcastQuestAlerta_100_130(byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.getLevel() > 101 && chr.getLevel() < 131) {
                chr.getClient().getSession().write(data);
            }
        }
    }

    public void broadcastQuestAlerta_131_161(byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.getLevel() > 131 && chr.getLevel() < 160) {
                chr.getClient().getSession().write(data);
            }
        }
    }

    public void broadcastQuestAlerta_181_255(byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.getLevel() > 161 && chr.getLevel() < 2555555) {
                chr.getClient().getSession().write(data);
            }
        }
    }

    public MarketEngine getMarket() {
        return me;
    }
    
    private static String[] getEvents() {
        List<String> events = new ArrayList<String>();
        for (File file : new File("scripts/eventos").listFiles()) {
            events.add(file.getName().substring(0, file.getName().length() - 3));
        }
        return events.toArray(new String[0]);
    }

    public void reloadEventScriptManager() {
        eventSM.cancel();
        eventSM = null;
        eventSM = new EventScriptManager(this, getEvents());
        eventSM.init();
    }

    public class respawnMaps implements Runnable {

        @Override
        public void run() {
            for (Entry<Integer, MapleMap> map : mapFactory.getMaps().entrySet()) {
                map.getValue().respawn();
            }
        }
    }

    public Map<Integer, HiredMerchant> getHiredMerchants() {
        return hiredMerchants;
    }

    public void addHiredMerchant(int chrid, HiredMerchant hm) {
        WriteLock wlock = merchant_lock.writeLock();
        wlock.lock();
        try {
            hiredMerchants.put(chrid, hm);
        } finally {
            wlock.unlock();
        }
    }

    public void removeHiredMerchant(int chrid) {
        WriteLock wlock = merchant_lock.writeLock();
        wlock.lock();
        try {
            hiredMerchants.remove(chrid);
        } finally {
            wlock.unlock();
        }
    }

    public int[] multiBuddyFind(int charIdFrom, int[] characterIds) {
        List<Integer> ret = new ArrayList<>(characterIds.length);
        PlayerStorage playerStorage = getPlayerStorage();
        for (int characterId : characterIds) {
            MapleCharacter chr = playerStorage.getCharacterById(characterId);
            if (chr != null) {
                if (chr.getBuddylist().containsVisible(charIdFrom)) {
                    ret.add(characterId);
                }
            }
        }
        int[] retArr = new int[ret.size()];
        int pos = 0;
        for (Integer i : ret) {
            retArr[pos++] = i.intValue();
        }
        return retArr;
    }

    public boolean hasExpedition(MapleExpeditionType type) {
        return expeditions.containsKey(type);
    }

    public void addExpedition(MapleExpeditionType type, MapleExpedition exped) {
        expeditions.put(type, exped);
    }

    public MapleExpedition getExpedition(MapleExpeditionType type) {
        return expeditions.get(type);
    }

    public boolean isConnected(String name) {
        return getPlayerStorage().getCharacterByName(name) != null;
    }

    public boolean finishedShutdown() {
        return finishedShutdown;
    }

    public void setServerMessage(String message) {
        this.serverMessage = message;
        broadcastPacket(MaplePacketCreator.serverMessage(message));
    }

    public void zerarPins() throws SQLException {

        try {
            if (accId != 0) {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps;
                ps = con.prepareStatement("UPDATE accounts SET pin = NULL +1");
                ps.executeUpdate();
                ps.close();
            }
        } catch (SQLException e) {
        }

    }

    public void setPin(String pin) {
        this.pin = pin;
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET = ? WHERE id = ?")) {
                ps.setString(1, pin);
                ps.setInt(2, accId);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
        }
    }

    public void saveAll() {
        for (int i = 0; i < Channel.getAllInstances().size(); i++) {
            for (MapleCharacter character : Channel.getInstance(i).getPlayerStorage().getAllCharacters()) {
                if (character == null) {
                    continue;
                }
                try {
                    character.saveToDB();
                } catch (Exception e) {
                    character.dropMessage("Seu personagem não foi salvo, pois ocorreu um problema.");
                }
            }
        }
    }

    public void setRates() {
        Calendar cal = Calendar.getInstance();
        cal.setTimeZone(TimeZone.getTimeZone("GMT-3"));
        World worldz = Server.getInstance().getWorld(world);
        int hr = cal.get(Calendar.HOUR_OF_DAY);
        int dayy = cal.get(java.util.Calendar.DAY_OF_WEEK);
        if (dayy == 7 && hr >= 5 && hr < 21 || dayy == 1 && hr >= 5 && hr < 21 || dayy == 6 && hr >= 19 && hr < 23) {
            worldz.setExpRate(6);
            worldz.setServerMessage("[Evento Automático] A taxa de expêriencia sofreu alteração. Aproveite!");
        } else {
            worldz.setExpRate(4);
            worldz.setServerMessage("");
        }
    }

    public int getInstanceId() {
        return instanceId;
    }

    public void setInstanceId(int k) {
        instanceId = k;
    }

    public void addInstanceId() {
        instanceId++;
    }

    public static Channel getInstance(int channel) {
        return instances.get(channel);
    }

    public int getChannel() {
        return channel;
    }

    public boolean isGodlyItems() {
        return godlyItems;
    }

    public void setGodlyItems(boolean blahblah) {
        this.godlyItems = blahblah;
    }

    public short getItemMultiplier() {
        return itemStatMultiplier;
    }

    public void setItemMultiplier(Short blahblah) {
        this.itemStatMultiplier = blahblah;
    }

    public short getGodlyItemRate() {
        return godlyItemRate;
    }

    public void setGodlyItemRate(Short blahblah) {
        this.godlyItemRate = blahblah;
    }

    public List<MapleExpedition> getExpeditions() {
        return expeditionscwpq;
    }

    public static MapleCharacter getCharacterFromAllServers(String name) {
        for (Channel cserv_ : Channel.getAllInstances()) {
            MapleCharacter ret = cserv_.getPlayerStorage().getCharacterByName(name);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }

    public static MapleCharacter getCharacterFromAllServers(int id) {
        for (Channel cserv_ : Channel.getAllInstances()) {
            MapleCharacter ret = cserv_.getPlayerStorage().getCharacterById(id);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }

    public void closeAllMerchants() {
        WriteLock wlock = merchant_lock.writeLock();
        wlock.lock();
        try {
            final Iterator<HiredMerchant> hmit = hiredMerchants.values().iterator();
            while (hmit.hasNext()) {
                hmit.next().forceClose();
                hmit.remove();
            }
        } catch (Exception e) {
        } finally {
            wlock.unlock();
        }
    }

    public static Channel getInstance(int world, int channel) {
        return LoginServer.getInstance().getChannel(world, channel);
    }

    public final MapleSquad getMapleSquadcpq(final String type) {
        return getMapleSquad(MapleSquadType.valueOf(type.toLowerCase()));
    }

    public final MapleSquad getMapleSquadcpq(final MapleSquadType type) {
        return mapleSquads.get(type);
    }

    public final MapleSquad getMapleSquad(final String type) {
        squadLock.readLock().lock();
        try {
            return mapleSquads.get(type.toLowerCase());
        } finally {
            squadLock.readLock().unlock();
        }
    }

}
