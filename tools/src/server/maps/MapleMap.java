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
package server.maps;

import client.IItem;
import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleDisease;
import client.autoban.AutobanFactory;
import client.inventory.*;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.GameConstants;
import constants.ItemConstants;
import constants.ServerConstants;
import java.awt.Point;
import java.awt.Rectangle;
import java.rmi.RemoteException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.ReadLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.WriteLock;
import net.MaplePacket;
import net.channel.pvp.MaplePvp;
import net.server.Server;
import net.server.channel.Channel;
import net.server.world.MaplePartyCharacter;
import scripting.event.EventInstanceManager;
import scripting.event.EventManager;
import scripting.map.MapScriptManager;
import server.*;
import server.MapleTimer.MapTimer;
import server.events.gm.MapleCoconut;
import server.events.gm.MapleFitness;
import server.events.gm.MapleOla;
import server.events.gm.MapleOxQuiz;
import server.events.gm.MapleSnowball;
import server.life.*;
import server.life.MapleLifeFactory.selfDestruction;
import server.maps.MapleNodes.MonsterPoint;
import server.partyquest.Pyramid;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.Randomizer;
import tools.packet.CWvsContext;

public class MapleMap {

    private final Map<MapleMapObjectType, ReentrantReadWriteLock> mapobjectlocks;
    private String timeMobMessage = "";
    private static final List<MapleMapObjectType> rangedMapobjectTypes = Arrays.asList(MapleMapObjectType.SHOP, MapleMapObjectType.ITEM, MapleMapObjectType.NPC, MapleMapObjectType.MONSTER, MapleMapObjectType.DOOR, MapleMapObjectType.SUMMON, MapleMapObjectType.REACTOR);
    private Map<Integer, MapleMapObject> mapobjects = new LinkedHashMap<>();
    private Map<Integer, MapleMapObjectCPQ> mapobjectscpq = new LinkedHashMap<>();
    private String speedRunLeader = "";

    private Collection<SpawnPoint> monsterSpawn = Collections.synchronizedList(new LinkedList<SpawnPoint>());
    private final List<Spawns> monsterSpawncpq = new ArrayList<Spawns>();
    private MapleNodes nodes;
    private long speedRunStart = 0, lastSpawnTime = 0, lastHurtTime = 0;
    private ScheduledFuture<?> squadSchedule;

    private List<SpawnMob> spawnarMob = new LinkedList<>();
    private List<Point> takenSpawns = new LinkedList<>();
    private AtomicInteger spawnedMonstersOnMap = new AtomicInteger(0);
    private final ReentrantReadWriteLock charactersLock = new ReentrantReadWriteLock();
    private Collection<MapleCharacter> characters = new LinkedHashSet<>();
    private Map<Integer, MaplePortal> portals = new HashMap<>();
    private List<Rectangle> areas = new ArrayList<>();
    private MapleFootholdTree footholds = null;
    private int mapid;
    private MapleOxQuiz ox;
    private int timeMobId;
    private transient MapleMap mapa;
    private int hp, mp;
    private transient MapleTrade trade;
    private transient AtomicInteger inst, insd;
    //private int runningOid = 100;
    private AtomicInteger runningOid = new AtomicInteger(1000000001);
    private int returnMapId;
    private int channel, world;
    private byte channelcpq;

    private byte monsterRate;
    private boolean clock;
    private boolean boat;
    private boolean docked = false;
    //private boolean docked;
    private String mapName;
    private String streetName;
    private MapleMapEffect mapEffect = null;
    private boolean everlast = false;
    private int forcedReturnMap = 999999999;
    private long timeLimit;
    private int decHP = 0;
    private int protectItem = 0;
    private List<MonsterStatus> redTeamBuffs = new LinkedList<MonsterStatus>();
    private List<MonsterStatus> blueTeamBuffs = new LinkedList<MonsterStatus>();
    private List<GuardianSpawnPoint> guardianSpawns = new LinkedList<GuardianSpawnPoint>();
    private boolean town;
    private boolean timer = false;
    private MapleMapTimer mapTimer = null;
    private boolean isOxQuiz = false;
    private boolean dropsOn = true;
    private ScheduledFuture<?> RichieEnter = null;
    private String onFirstUserEnter;
    private String onUserEnter;
    private int fieldType;
    private int fieldLimit = 0;
    private int mobCapacity = -1;
    private ScheduledFuture<?> mapMonitor = null;
    private Pair<Integer, String> timeMob = null;
    private short mobInterval = 5000;
    private boolean allowSummons = true;
    // HPQ
    private int hpq_Bunny_Hits = 0;
    private int riceCakeNum = 0; // bad place to put this (why is it in here then)
    private int riceCakes = 0;
    private boolean allowHPQSummon = false; // bad place to put this
    private boolean isSpawns = true;
    private boolean checkStates = true, squadTimer = false;

    private int bunnyDamage = 0;
    // Eventos
    private boolean eventstarted = false, isMuted = false;
    private MapleSnowball snowball0 = null;
    private MapleSnowball snowball1 = null;
    private MapleCoconut coconut;
    //locks
    private final ReadLock chrRLock;
    private final WriteLock chrWLock;
    private final ReadLock objectRLock;
    private final WriteLock objectWLock;
    private MapleSquadType squad;

    //DroparNX
    private MapleInventory[] inventory;

    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    private static final SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");

    private static enum onFirstUserEnter {

        dojang_Eff,
        PinkBeen_before,
        onRewordMap,
        StageMsg_together,
        StageMsg_davy,
        party6weatherMsg,
        StageMsg_juliet,
        StageMsg_romio,
        moonrabbit_mapEnter,
        astaroth_summon,
        boss_Ravana,
        killing_BonusSetting,
        killing_MapSetting,
        metro_firstSetting,
        balog_bonusSetting,
        balog_summon,
        easy_balog_summon,
        Sky_TrapFEnter,
        shammos_Fenter,
        lostmine_morphEnter,
        lostsea_morphEnter,
        visitorCube_addmobEnter,
        PRaid_D_Fenter,
        PRaid_B_Fenter,
        NULL;

        private static onFirstUserEnter fromString(String Str) {
            try {
                return valueOf(Str);
            } catch (IllegalArgumentException ex) {
                return NULL;
            }
        }
    };

    public MapleMap(int mapid, int world, int channel, int returnMapId, float monsterRate) {
        this.mapid = mapid;
        this.channel = channel;
        this.world = world;
        this.returnMapId = returnMapId;
        this.monsterRate = (byte) Math.round(monsterRate);
        if (this.monsterRate == 0) {
            this.monsterRate = 1;
        }
        final ReentrantReadWriteLock chrLock = new ReentrantReadWriteLock(true);
        chrRLock = chrLock.readLock();
        chrWLock = chrLock.writeLock();

        EnumMap<MapleMapObjectType, ReentrantReadWriteLock> objlockmap = new EnumMap<MapleMapObjectType, ReentrantReadWriteLock>(MapleMapObjectType.class);

        final ReentrantReadWriteLock objectLock = new ReentrantReadWriteLock(true);
        objectRLock = objectLock.readLock();
        objectWLock = objectLock.writeLock();
        mapobjectlocks = Collections.unmodifiableMap(objlockmap);
    }

    public void broadcastMessage(MapleCharacter source, final byte[] packet) {
        chrRLock.lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr != source) {
                    chr.getClient().announce(packet);
                }
            }
        } finally {
            chrRLock.unlock();
        }
    }

    public void broadcastGMMessage(MapleCharacter source, final byte[] packet) {
        chrRLock.lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr != source && (chr.gmLevel() > source.gmLevel())) {
                    chr.getClient().announce(packet);
                }
            }
        } finally {
            chrRLock.unlock();
        }
    }

    public void toggleDrops() {
        this.dropsOn = !dropsOn;
    }

    private static double getRangedDistance() {
        return (ServerConstants.USE_MAXRANGE ? Double.POSITIVE_INFINITY : 722500);
    }

    public List<MapleMapObject> getMapObjectsInRect(Rectangle box, List<MapleMapObjectType> types) {
        objectRLock.lock();
        final List<MapleMapObject> ret = new LinkedList<>();
        try {
            for (MapleMapObject l : mapobjects.values()) {
                if (types.contains(l.getType())) {
                    if (box.contains(l.getPosition())) {
                        ret.add(l);
                    }
                }
            }
        } finally {
            objectRLock.unlock();
        }
        return ret;
    }

    public int getId() {
        return mapid;
    }

    public MapleMap getReturnMap() {
        return Server.getInstance().getWorld(world).getChannel(channel).getMapFactory().getMap(returnMapId);
    }

    public int getReturnMapId() {
        return returnMapId;
    }

    public void setReactorState() {
        objectRLock.lock();
        try {
            for (MapleMapObject o : mapobjects.values()) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    if (((MapleReactor) o).getState() < 1) {
                        ((MapleReactor) o).setState((byte) 1);
                        broadcastMessage(MaplePacketCreator.triggerReactor((MapleReactor) o, 1));
                    }
                }
            }
        } finally {
            objectRLock.unlock();
        }
    }

    public void setReactorState(int state) {
        synchronized (this.mapobjects) {
            for (MapleMapObject o : mapobjects.values()) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    ((MapleReactor) o).setState((byte) state);
                    broadcastMessage(MaplePacketCreator.triggerReactor((MapleReactor) o, state));
                }
            }
        }
    }

    public void setReactorState(MapleReactor reactor, byte state) {
        synchronized (this.mapobjects) {
            ((MapleReactor) reactor).setState((byte) state);
            broadcastMessage(MaplePacketCreator.triggerReactor((MapleReactor) reactor, state));
        }
    }

    public int getForcedReturnId() {
        return forcedReturnMap;
    }

    public MapleMap getForcedReturnMap() {
        return Server.getInstance().getWorld(world).getChannel(channel).getMapFactory().getMap(forcedReturnMap);
    }

    public void setForcedReturnMap(int map) {
        this.forcedReturnMap = map;
    }

    public long getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(int timeLimit) {
        this.timeLimit = timeLimit;
    }

    public int getTimeLeft() {
        return (int) ((timeLimit - System.currentTimeMillis()) / 1000);
    }

    public int getCurrentPartyId() {
        for (MapleCharacter chr : this.getCharacters()) {
            if (chr.getPartyId() != -1) {
                return chr.getPartyId();
            }
        }
        return -1;
    }

    private int getUsableOID() {
        objectRLock.lock();
        try {
            Integer curOid;

            do {
                if ((curOid = runningOid.incrementAndGet()) < 0) {
                    runningOid.set(curOid = 1000000001);
                }
            } while (mapobjects.containsKey(curOid));

            return curOid;
        } finally {
            objectRLock.unlock();
        }
    }

    public void addMapObject(MapleMapObject mapobject) {
        objectWLock.lock();
        try {
            int curOID = getUsableOID();
            mapobject.setObjectId(curOID);
            this.mapobjects.put(curOID, mapobject);
        } finally {
            objectWLock.unlock();
        }
    }

    private void spawnAndAddRangedMapObject(MapleMapObject mapobject, DelayedPacketCreation packetbakery) {
        spawnAndAddRangedMapObject(mapobject, packetbakery, null);
    }

    private void spawnAndAddRangedMapObject(MapleMapObject mapobject, DelayedPacketCreation packetbakery, SpawnCondition condition) {
        chrRLock.lock();
        objectWLock.lock();
        try {
            int curOID = getUsableOID();
            mapobject.setObjectId(curOID);
            this.mapobjects.put(curOID, mapobject);
            for (MapleCharacter chr : characters) {
                if (condition == null || condition.canSpawn(chr)) {
                    if (chr.getPosition().distanceSq(mapobject.getPosition()) <= getRangedDistance()) {
                        packetbakery.sendPackets(chr.getClient());
                        chr.addVisibleMapObject(mapobject);
                    }
                }
            }
        } finally {
            objectWLock.unlock();
            chrRLock.unlock();
        }
    }

    private void spawnRangedMapObject(MapleMapObject mapobject, DelayedPacketCreation packetbakery, SpawnCondition condition) {
        chrRLock.lock();
        try {
            int curOID = getUsableOID();
            mapobject.setObjectId(curOID);
            for (MapleCharacter chr : characters) {
                if (condition == null || condition.canSpawn(chr)) {
                    if (chr.getPosition().distanceSq(mapobject.getPosition()) <= getRangedDistance()) {
                        packetbakery.sendPackets(chr.getClient());
                        chr.addVisibleMapObject(mapobject);
                    }
                }
            }
        } finally {
            chrRLock.unlock();
        }
    }

    /*public void addMapObject(MapleMapObject mapobject) {
     objectWLock.lock();
     try {
     mapobject.setObjectId(runningOid);
     this.mapobjects.put(Integer.valueOf(runningOid), mapobject);
     incrementRunningOid();
     } finally {
     objectWLock.unlock();
     }
     }

     private void spawnAndAddRangedMapObject(MapleMapObject mapobject, DelayedPacketCreation packetbakery) {
     spawnAndAddRangedMapObject(mapobject, packetbakery, null);
     }

     private void spawnAndAddRangedMapObject(MapleMapObject mapobject, DelayedPacketCreation packetbakery, SpawnCondition condition) {
     chrRLock.lock();
     try {
     mapobject.setObjectId(runningOid);
     for (MapleCharacter chr : characters) {
     if (condition == null || condition.canSpawn(chr)) {
     if (chr.getPosition().distanceSq(mapobject.getPosition()) <= 722500) {
     packetbakery.sendPackets(chr.getClient());
     chr.addVisibleMapObject(mapobject);
     }
     }
     }
     } finally {
     chrRLock.unlock();
     }
     objectWLock.lock();
     try {
     this.mapobjects.put(Integer.valueOf(runningOid), mapobject);
     } finally {
     objectWLock.unlock();
     }
     incrementRunningOid();
     }

     private void incrementRunningOid() {
     runningOid++;
     if (runningOid >= 30000) {
     runningOid = 1000;//Lol, like there are monsters with the same oid NO
     }
     objectRLock.lock();
     try {
     if (!this.mapobjects.containsKey(Integer.valueOf(runningOid))) {
     return;
     }
     } finally {
     objectRLock.unlock();
     }
     throw new RuntimeException("Out of OIDs on map " + mapid + " (channel: " + channel + ")");
     }
     */
    public void removeMapObject(int num) {
        objectWLock.lock();
        try {
            this.mapobjects.remove(Integer.valueOf(num));
        } finally {
            objectWLock.unlock();
        }
    }

    public void removeMapObject(final MapleMapObject obj) {
        removeMapObject(obj.getObjectId());
    }

    private Point calcPointBelow(Point initial) {
        MapleFoothold fh = footholds.findBelow(initial);
        if (fh == null) {
            return null;
        }
        int dropY = fh.getY1();
        if (!fh.isWall() && fh.getY1() != fh.getY2()) {
            double s1 = Math.abs(fh.getY2() - fh.getY1());
            double s2 = Math.abs(fh.getX2() - fh.getX1());
            double s5 = Math.cos(Math.atan(s2 / s1)) * (Math.abs(initial.x - fh.getX1()) / Math.cos(Math.atan(s1 / s2)));
            if (fh.getY2() < fh.getY1()) {
                dropY = fh.getY1() - (int) s5;
            } else {
                dropY = fh.getY1() + (int) s5;
            }
        }
        return new Point(initial.x, dropY);
    }

    public Point calcDropPos(Point initial, Point fallback) {
        Point ret = calcPointBelow(new Point(initial.x, initial.y - 50));
        if (ret == null) {
            return fallback;
        }
        return ret;
    }

    private void dropFromMonster(final MapleCharacter chr, final MapleMonster mob) {
        if (mob.dropsDisabled() || !dropsOn) {
            return;
        }
        int maxDrops;
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        final boolean isBoss = mob.isBoss();
        final byte droptype = (byte) (mob.getStats().isExplosiveReward() ? 3 : mob.getStats().isFfaLoot() ? 2 : chr.getParty() != null ? 1 : 0);
        final int mobpos = mob.getPosition().x;
        int chServerrate = chr.getDropRate();
        Item idrop;
        byte d = 1;
        Point pos = new Point(0, mob.getPosition().y);

        Map<MonsterStatus, MonsterStatusEffect> stati = mob.getStati();
        if (stati.containsKey(MonsterStatus.SHOWDOWN)) {
            chServerrate *= (stati.get(MonsterStatus.SHOWDOWN).getStati().get(MonsterStatus.SHOWDOWN).doubleValue() / 100.0 + 1.0);
        }

        final MapleMonsterInformationProvider mi = MapleMonsterInformationProvider.getInstance();
        final List<MonsterDropEntry> dropEntry = new ArrayList<>(mi.retrieveDrop(mob.getId()));

        Collections.shuffle(dropEntry);
        for (final MonsterDropEntry de : dropEntry) {
            if (Randomizer.nextInt(999999) < de.chance * chServerrate) {
                if (droptype == 3) {
                    pos.x = (int) (mobpos + (d % 2 == 0 ? (40 * (d + 1) / 2) : -(40 * (d / 2))));
                } else {
                    pos.x = (int) (mobpos + ((d % 2 == 0) ? (25 * (d + 1) / 2) : -(25 * (d / 2))));
                }
                if (de.itemId == 0) { // meso
                    int mesos = Randomizer.nextInt(de.Maximum - de.Minimum) + de.Minimum;

                    if (mesos > 0) {
                        if (chr.getBuffedValue(MapleBuffStat.MESOUP) != null) {
                            mesos = (int) (mesos * chr.getBuffedValue(MapleBuffStat.MESOUP).doubleValue() / 100.0);
                        }
                        spawnMesoDrop(mesos * chr.getMesoRate(), calcDropPos(pos, mob.getPosition()), mob, chr, false, droptype);
                    }
                } else {
                    if (ItemConstants.getInventoryType(de.itemId) == MapleInventoryType.EQUIP) {
                        idrop = ii.randomizeStats((Equip) ii.getEquipById(de.itemId));
                    } else {
                        idrop = new Item(de.itemId, (byte) 0, (short) (de.Maximum != 1 ? Randomizer.nextInt(de.Maximum - de.Minimum) + de.Minimum : 1));
                    }
                    spawnDrop(idrop, calcDropPos(pos, mob.getPosition()), mob, chr, droptype, de.questid);
                }
                d++;
            }
        }
        // CARNAVALPQ > PARTE UNICA
        if (mob.getId() == 9400637) { //GATO PRETO
            if (chr.getEventInstance() != null) {
                int dmapid = 931050433; // Mapa Carnaval
                if (chr.getEventInstance().getName().startsWith("CarnavalPQ") || chr.getMapId() == dmapid) {
                    //byte[] packet = MaplePacketCreator.serverNotice(6, "Parabéns e obrigado a todos os jogadores que salvaram o nosso Natal!");
                    chr.mensagem("Parabéns e obrigado por ajudar-nos a proteger o maior evento cultural do Brasil!");
                    //chr.setPontosOrbis(chr.getPontosOrbis() + 10);
                    MapleMap toGoto = chr.getClient().getChannelServer().getMapFactory().getMap(100000000);//Mapa de saida
                    MapleMap frm = chr.getMap();
                    chr.getEventInstance().dispose2(); //Fim da instancia
                    for (MapleCharacter jogador : characters) {
                        jogador.getClient().getSession().write(MaplePacketCreator.getClock(30));//Tempo p/ warpar apos matar o Ãºltimo corpo
                        if (jogador.getEventInstance() != null) {
                            jogador.getEventInstance().unregisterPlayer(jogador);
                        }
                    }
                    TimerManager tMan = TimerManager.getInstance();
                    tMan.schedule(new warpAll(toGoto, frm), 30000);
                    chr.mensagem("Fale com o Mr. Sandman e obtenha vossa premiação por ajudar-nos.");
                    //spawNpcParaJogador(chr.getClient(), 9073000, new Point(-595, 215));
                    //mob.disableDrops();
                }
            }
        }

        // FIM DA CARNAVALPQ
        // NATAL PQ > PARTE UNICA
        if (mob.getId() == 9500319) { // BONECO GIGANTE
            if (chr.getEventInstance() != null) {
                int dmapid = 209000000; // Mapa Doador
                if (chr.getEventInstance().getName().startsWith("NatalPQ") || chr.getMapId() == dmapid) {
                    //byte[] packet = MaplePacketCreator.serverNotice(6, "Parabéns e obrigado a todos os jogadores que salvaram o nosso Natal!");
                    chr.mensagem("Parabéns e obrigado por participarem do nosso evento de Natal!");
                    //chr.setPontosOrbis(chr.getPontosOrbis() + 10);
                    MapleMap toGoto = chr.getClient().getChannelServer().getMapFactory().getMap(209000000);
                    MapleMap frm = chr.getMap();
                    chr.getEventInstance().dispose2(); //Fim da instancia
                    for (MapleCharacter jogador : characters) {
                        jogador.getClient().getSession().write(MaplePacketCreator.getClock(30));//Tempo p/ warpar apos matar o Ãºltimo corpo
                        if (jogador.getEventInstance() != null) {
                            jogador.getEventInstance().unregisterPlayer(jogador);
                        }
                    }
                    TimerManager tMan = TimerManager.getInstance();
                    tMan.schedule(new warpAll(toGoto, frm), 30000);
                    chr.mensagem("Fale com o Simão para trocar as esferas por items natalinos.");
                    //spawNpcParaJogador(chr.getClient(), 9073000, new Point(-595, 215));
                    mob.disableDrops();
                }
            }
        }
        // FIM DA NATAL PQ
        //INÍCIO NavioPQ
        if (mob.getId() == 9500328) { // Super Balrog
            //MapleCharacter chr = dropOwner;
            if (chr.getEventInstance() != null) {
                if (chr.getEventInstance().getName().startsWith("NavioPQ")) {
                    //int dropArray[] = {4030002};
                    //customDrops(chr, mob, dropArray, 3);
                    //mob.disableDrops();
                    if (countMobOnMap() <= 0) {
                        //chr.setPontosOrbis(chr.getPontosOrbis() + 50);
                        chr.ganharItemEspecifico(4001302, (short) 1, false, false);//Carta do Balrog p/ concluir a PQ
                        chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(1, "Obrigado por ajudar-nos a livrar este Navio do terrível Balrog!"));
                        //MaplePacket packet = MaplePacketCreator.serverNotice(0, "Parabens a todos os participantes que concluiram a NavioPQ!");
                        chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, "Para sair deste Navio, o líder deverá falar com o Monóculo."));
                        //MapleMap toGoto = chr.getClient().getChannelServer().getMapFactory().getMap(100000000);
                        //MapleMap frm = chr.getMap();
                        //chr.getEventInstance().dispose2(); //Fim da instancia
                        //for (MapleCharacter aaa : characters) {
                        //aaa.getClient().getSession().write(MaplePacketCreator.getClock(30));
                        //if (aaa.getEventInstance() != null) {
                        //aaa.getEventInstance().unregisterPlayer(aaa);
                        //}
                        //}
                        //TimerManager tMan = TimerManager.getInstance();
                        //tMan.schedule(new warpAll(toGoto, frm), 30000);
                    }
                }
            }
        }

        if (mob.getId() == 8830000) { // Lord balrog
            //MapleCharacter chr = dropOwner;
            if (chr.getEventInstance() != null) {
                if (chr.getEventInstance().getName().startsWith("BalrogPQ")) {
                    //int dropArray[] = {4030002};
                    //customDrops(chr, mob, dropArray, 3);
                    //mob.disableDrops();
                    if (countMobOnMap() <= 0) {
                        //chr.setPontosOrbis(chr.getPontosOrbis() + 50);
                        //chr.ganharItemEspecifico(4001302, (short) 1, false, false);//Carta do Balrog p/ concluir a PQ
                        chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(1, "Obrigado por proteer o templo,você é um verdadeiro mercenário!"));
                        //MaplePacket packet = MaplePacketCreator.serverNotice(0, "Parabens a todos os participantes que concluiram a NavioPQ!");
                        //chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, "Para sair deste Navio, o líder deverá falar com o Monóculo."));
                        //MapleMap toGoto = chr.getClient().getChannelServer().getMapFactory().getMap(100000000);
                        //MapleMap frm = chr.getMap();
                        //chr.getEventInstance().dispose2(); //Fim da instancia
                        //for (MapleCharacter aaa : characters) {
                        //aaa.getClient().getSession().write(MaplePacketCreator.getClock(30));
                        //if (aaa.getEventInstance() != null) {
                        //aaa.getEventInstance().unregisterPlayer(aaa);
                        //}
                        //}
                        //TimerManager tMan = TimerManager.getInstance();
                        //tMan.schedule(new warpAll(toGoto, frm), 30000);
                    }
                }
            }
        }
        //FIM BalrogPQ
        final List<MonsterGlobalDropEntry> globalEntry = mi.getGlobalDrop();
        // Global Drops
        for (final MonsterGlobalDropEntry de : globalEntry) {
            if (Randomizer.nextInt(999999) < de.chance) {
                if (droptype == 3) {
                    pos.x = (int) (mobpos + (d % 2 == 0 ? (40 * (d + 1) / 2) : -(40 * (d / 2))));
                } else {
                    pos.x = (int) (mobpos + ((d % 2 == 0) ? (25 * (d + 1) / 2) : -(25 * (d / 2))));
                }
                if (de.itemId == 0) {
                    //chr.getCashShop().ganharNX(1, 80);
                } else {
                    if (ItemConstants.getInventoryType(de.itemId) == MapleInventoryType.EQUIP) {
                        idrop = ii.randomizeStats((Equip) ii.getEquipById(de.itemId));
                    } else {
                        idrop = new Item(de.itemId, (byte) 0, (short) (de.Maximum != 1 ? Randomizer.nextInt(de.Maximum - de.Minimum) + de.Minimum : 1));
                    }
                    spawnDrop(idrop, calcDropPos(pos, mob.getPosition()), mob, chr, droptype, de.questid);
                    d++;
                }
            }
        }
    }

    private void spawnDrop(final Item idrop, final Point dropPos, final MapleMonster mob, final MapleCharacter chr, final byte droptype, final short questid) {
        final MapleMapItem mdrop = new MapleMapItem(idrop, dropPos, mob, chr, droptype, false, questid);
        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                if (questid <= 0 || (c.getPlayer().getQuestStatus(questid) == 1 && c.getPlayer().needQuestItem(questid, idrop.getItemId()))) {
                    c.announce(MaplePacketCreator.dropItemFromMapObject(mdrop, mob.getPosition(), dropPos, (byte) 1));
                }
            }
        }, null);

        TimerManager.getInstance().schedule(new ExpireMapItemJob(mdrop), 180000);
        activateItemReactors(mdrop, chr.getClient());
    }

    public final void spawnMesoDrop(final int meso, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype) {
        final Point droppos = calcDropPos(position, position);
        final MapleMapItem mdrop = new MapleMapItem(meso, droppos, dropper, owner, droptype, playerDrop);

        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.announce(MaplePacketCreator.dropItemFromMapObject(mdrop, dropper.getPosition(), droppos, (byte) 1));
            }
        }, null);

        TimerManager.getInstance().schedule(new ExpireMapItemJob(mdrop), 180000);
    }

    public final void disappearingItemDrop(final MapleMapObject dropper, final MapleCharacter owner, final Item item, final Point pos) {
        final Point droppos = calcDropPos(pos, pos);
        final MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner, (byte) 1, false);
        broadcastMessage(MaplePacketCreator.dropItemFromMapObject(drop, dropper.getPosition(), droppos, (byte) 3), drop.getPosition());
    }

    public MapleMonster getMonsterById(int id) {
        objectRLock.lock();
        try {
            for (MapleMapObject obj : mapobjects.values()) {
                if (obj.getType() == MapleMapObjectType.MONSTER) {
                    if (((MapleMonster) obj).getId() == id) {
                        return (MapleMonster) obj;
                    }
                }
            }
        } finally {
            objectRLock.unlock();
        }
        return null;
    }

    public int countMonster(final MapleCharacter chr) {
        MapleMap map = chr.getClient().getPlayer().getMap();
        double range = Double.POSITIVE_INFINITY;
        List<MapleMapObject> monsters = map.getMapObjectsInRange(chr.getClient().getPlayer().getPosition(), range, Arrays.asList(MapleMapObjectType.MONSTER));
        return monsters.size();
    }

    public int countMonster(int id) {
        int count = 0;
        for (MapleMapObject m : getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER))) {
            MapleMonster mob = (MapleMonster) m;
            if (mob.getId() == id) {
                count++;
            }
        }
        return count;
    }

    public boolean damageMonster(MapleCharacter chr, MapleMonster monster, int damage) {
        if (monster.getId() == 8800000) {
            Collection<MapleMapObject> objects = chr.getMap().getMapObjects();
            for (MapleMapObject object : objects) {
                MapleMonster mons = chr.getMap().getMonsterByOid(object.getObjectId());
                if (mons != null && mons.getId() >= 8800003 && mons.getId() <= 8800010) {
                    return true;
                }
            }
        }

        // double checking to potentially avoid synchronisation overhead
        if (monster.isAlive()) {
            boolean killMonster = false;

            synchronized (monster) {
                if (!monster.isAlive()) {
                    return false;
                }
                if (damage > 0) {
                    int monsterhp = monster.getHp();
                    monster.damage(chr, damage, true);
                    if (!monster.isAlive()) { // monster just died
                        killMonster(monster, chr, true);
                        if (monster != null && monster.getId() >= 8810002 && monster.getId() <= 8810009) {
                            Collection<MapleMapObject> objects = chr.getMap().getMapObjects();
                            for (MapleMapObject object : objects) {
                                MapleMonster mons = chr.getMap().getMonsterByOid(object.getObjectId());
                                if (mons != null) {
                                    if (mons.getId() == 8810018) {
                                        damageMonster(chr, mons, monsterhp);
                                    }
                                }
                            }
                        }
                    } else {
                        if (monster != null && monster.getId() >= 8810002 && monster.getId() <= 8810009) {
                            Collection<MapleMapObject> objects = chr.getMap().getMapObjects();
                            for (MapleMapObject object : objects) {
                                MapleMonster mons = chr.getMap().getMonsterByOid(object.getObjectId());
                                if (mons != null) {
                                    if (mons.getId() == 8810018) {
                                        damageMonster(chr, mons, damage);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // the monster is dead, as damageMonster returns immediately for dead monsters this makes
            // this block implicitly synchronized for ONE monster
            if (killMonster) {
                killMonster(monster, chr, true);
            }
            return true;
        }
        return false;
    }

    public void killMonster(final MapleMonster monster, final MapleCharacter chr, final boolean withDrops) {
        killMonster(monster, chr, withDrops, false, 1);
    }

    public void killMonster(final MapleMonster monster, final MapleCharacter chr, final boolean withDrops, final boolean secondTime, int animation) {
        if (monster.getId() == 8810018 && !secondTime) {
            TimerManager.getInstance().schedule(new Runnable() {
                @Override
                public void run() {
                    killMonster(monster, chr, withDrops, true, 1);
                    killAllMonsters();
                }
            }, 3000);
            return;
        }
        if (chr == null) {
            spawnedMonstersOnMap.decrementAndGet();
            monster.setHp(0);
            broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), animation), monster.getPosition());
            removeMapObject(monster);
            return;
        }

        if (monster.getStats().getLevel() >= chr.getLevel() + 80 && !chr.isGM()) {
            AutobanFactory.GENERAL.autoban(chr, " por matar " + monster.getName() + " que não tem referencia com seu nível.");
        }

        if (monster.getId() == 9300049) { //Dark Nependath is Killed o.O
            if (chr.getMapId() == 920010800 && chr.getEventInstance() != null) {
                //This spawns Papa Pixie
                EventInstanceManager eim = chr.getEventInstance();
                if (eim.getProperty("papaSpawned").equals("no")) {
                    byte[] papapacket = MaplePacketCreator.serverNotice(5, "Então surge o Papa Pixie.");
                    MapleMonster papa = MapleLifeFactory.getMonster(9300039);
                    chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(papa, -98, 563);
                    chr.getClient().getPlayer().getMap().broadcastMessage(papapacket);
                    eim.setProperty("papaSpawned", "yes");
                }
            }
        }

        int monsterhp = monster.getHp();

        if (monster.getId() == 8810018) {
            if (monsterhp == 10) {
                killMonster(8810018);

            }

        }
        /*
         if (monster.getId() == 9300025 && mapid==990000630 ){ //Gargula
				
         byte[] papapacket = MaplePacketCreator.serverNotice(5, "As gargulas foram sumonadas por uma força desconhecida.");
         MapleMonster gargula = MapleLifeFactory.getMonster(9300033);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);
         chr.getClient().getPlayer().getMap().spawnMonsterWithCoords(gargula, -100, 50);

         chr.getClient().getPlayer().getMap().broadcastMessage(papapacket);
         }
				
		
         /*if (chr.getQuest(MapleQuest.getInstance(29400)).getStatus().equals(MapleQuestStatus.Status.STARTED)) {
         if (chr.getLevel() >= 120 && monster.getStats().getLevel() >= 120) {
         //FIX MEDAL SHET
         } else if (monster.getStats().getLevel() >= chr.getLevel()) {
         }
         }*/
        int buff = monster.getBuffToGive();
        if (buff > -1) {
            MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
            for (MapleMapObject mmo : this.getAllPlayer()) {
                MapleCharacter character = (MapleCharacter) mmo;
                if (character.isAlive()) {
                    MapleStatEffect statEffect = mii.getItemEffect(buff);
                    character.getClient().announce(MaplePacketCreator.showOwnBuffEffect(buff, 1));
                    broadcastMessage(character, MaplePacketCreator.showBuffeffect(character.getId(), buff, 1), false);
                    statEffect.applyTo(character);
                }
            }
        }
        if (monster.getId() == 8810018) {
            for (Channel cserv : Server.getInstance().getWorld(world).getChannels()) {
                for (MapleCharacter player : cserv.getPlayerStorage().getAllCharacters()) {
                    if (player.getMapId() == 240000000) {
                        player.mensagem("O misterioso poder do Nono Espírito do Bebê Dragão apareceu!");
                    } else {
                        player.dropMessage("Bravos guerreiros acabaram de derrotar o HornTail! Estes são os verdadeiros heróis de Leafre!");
                        if (player.isGM()) {
                            player.mensagem("[Alerta para todos os GM's] O Horntail acaba de ser derrotado por " + chr.getName());
                            FilePrinter.printError(FilePrinter.MATOU_BOSS + FilePrinter.HORN_TAIL + "", "" + chr.getName() + " derrotou o Horntail às " + sdf2.format(Calendar.getInstance().getTime()) + " no dia " + sdf.format(Calendar.getInstance().getTime()) + "\r\n");
                        }
                    }
                }
            }
        }
        spawnedMonstersOnMap.decrementAndGet();
        monster.setHp(0);
        broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), animation), monster.getPosition());
        if (monster.getStats().selfDestruction() == null) {//FUU BOMBS D:
            removeMapObject(monster);
        }
        if (monster.getId() >= 8800003 && monster.getId() <= 8800010) {
            boolean makeZakReal = true;
            Collection<MapleMapObject> objects = getMapObjects();
            for (MapleMapObject object : objects) {
                MapleMonster mons = getMonsterByOid(object.getObjectId());
                if (mons != null) {
                    if (mons.getId() >= 8800003 && mons.getId() <= 8800010) {
                        makeZakReal = false;
                        break;
                    }
                }
            }
            if (makeZakReal) {
                for (MapleMapObject object : objects) {
                    MapleMonster mons = chr.getMap().getMonsterByOid(object.getObjectId());
                    if (mons != null) {
                        if (mons.getId() == 8800000) {
                            makeMonsterReal(mons);
                            updateMonsterController(mons);
                            break;
                        }
                    }
                }
            }
        }

        MapleCharacter dropOwner = monster.killBy(chr);
        if (withDrops && !monster.dropsDisabled()) {
            if (dropOwner == null) {
                dropOwner = chr;
            }
            dropFromMonster(dropOwner, monster);
        }

    }

    public void killMonster(int monsId) {
        for (MapleMapObject mmo : getMapObjects()) {
            if (mmo instanceof MapleMonster) {
                if (((MapleMonster) mmo).getId() == monsId) {
                    this.killMonster((MapleMonster) mmo, (MapleCharacter) getAllPlayer().get(0), false);
                }
            }
        }
    }

    public void killAllMonsters() {
        for (MapleMapObject monstermo : getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER))) {
            MapleMonster monster = (MapleMonster) monstermo;
            spawnedMonstersOnMap.decrementAndGet();
            monster.setHp(0);
            broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), true), monster.getPosition());
            removeMapObject(monster);
        }
    }

    public List<MapleMapObject> getAllPlayer() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.PLAYER));
    }

    public List<MapleMapObject> getAllmonsters() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
    }

    public void destroyReactor(int oid) {
        final MapleReactor reactor = getReactorByOid(oid);
        TimerManager tMan = TimerManager.getInstance();
        broadcastMessage(MaplePacketCreator.destroyReactor(reactor));
        reactor.setAlive(false);
        removeMapObject(reactor);
        reactor.setTimerActive(false);
        if (reactor.getDelay() > 0) {
            tMan.schedule(new Runnable() {
                @Override
                public void run() {
                    respawnReactor(reactor);
                }
            }, reactor.getDelay());
        }
    }

    public void resetReactors() {
        objectRLock.lock();
        try {
            for (MapleMapObject o : mapobjects.values()) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    final MapleReactor r = ((MapleReactor) o);
                    r.setState((byte) 0);
                    r.setTimerActive(false);
                    broadcastMessage(MaplePacketCreator.triggerReactor(r, 0));
                }
            }
        } finally {
            objectRLock.unlock();
        }
    }

    public void shuffleReactors() {
        List<Point> points = new ArrayList<>();
        objectRLock.lock();
        try {
            for (MapleMapObject o : mapobjects.values()) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    points.add(((MapleReactor) o).getPosition());
                }
            }
            Collections.shuffle(points);
            for (MapleMapObject o : mapobjects.values()) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    ((MapleReactor) o).setPosition(points.remove(points.size() - 1));
                }
            }
        } finally {
            objectRLock.unlock();
        }
    }

    public MapleReactor getReactorById(int Id) {
        objectRLock.lock();
        try {
            for (MapleMapObject obj : mapobjects.values()) {
                if (obj.getType() == MapleMapObjectType.REACTOR) {
                    if (((MapleReactor) obj).getId() == Id) {
                        return (MapleReactor) obj;
                    }
                }
            }
            return null;
        } finally {
            objectRLock.unlock();
        }
    }

    /**
     * Automagically finds a new controller for the given monster from the chars
     * on the map...
     *
     * @param monster
     */
    public void updateMonsterController(MapleMonster monster) {
        monster.monsterLock.lock();
        try {
            if (!monster.isAlive()) {
                return;
            }
            if (monster.getController() != null) {
                if (monster.getController().getMap() != this) {
                    monster.getController().stopControllingMonster(monster);
                } else {
                    return;
                }
            }
            int mincontrolled = -1;
            MapleCharacter newController = null;
            chrRLock.lock();
            try {
                for (MapleCharacter chr : characters) {
                    if (!chr.isHidden() && (chr.getControlledMonsters().size() < mincontrolled || mincontrolled == -1)) {
                        mincontrolled = chr.getControlledMonsters().size();
                        newController = chr;
                    }
                }
            } finally {
                chrRLock.unlock();
            }
            if (newController != null) {// was a new controller found? (if not no one is on the map)
                if (monster.isFirstAttack()) {
                    newController.controlMonster(monster, true);
                    monster.setControllerHasAggro(true);
                    monster.setControllerKnowsAboutAggro(true);
                } else {
                    newController.controlMonster(monster, false);
                }
            }
        } finally {
            monster.monsterLock.unlock();
        }
    }

    public Collection<MapleMapObject> getMapObjects() {
        return Collections.unmodifiableCollection(mapobjects.values());
    }

    public boolean containsNPC(int npcid) {
        if (npcid == 9000066) {
            return true;
        }
        objectRLock.lock();
        try {
            for (MapleMapObject obj : mapobjects.values()) {
                if (obj.getType() == MapleMapObjectType.NPC) {
                    if (((MapleNPC) obj).getId() == npcid) {
                        return true;
                    }
                }
            }
        } finally {
            objectRLock.unlock();
        }
        return false;
    }

    public MapleMapObject getMapObject(int oid) {
        return mapobjects.get(oid);
    }

    /**
     * returns a monster with the given oid, if no such monster exists returns
     * null
     *
     * @param oid
     * @return
     */
    public MapleMonster getMonsterByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid);
        if (mmo == null) {
            return null;
        }
        if (mmo.getType() == MapleMapObjectType.MONSTER) {
            return (MapleMonster) mmo;
        }
        return null;
    }

    public MapleReactor getReactorByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid);
        if (mmo == null) {
            return null;
        }
        return mmo.getType() == MapleMapObjectType.REACTOR ? (MapleReactor) mmo : null;
    }

    public MapleReactor getReactorByName(String name) {
        objectRLock.lock();
        try {
            for (MapleMapObject obj : mapobjects.values()) {
                if (obj.getType() == MapleMapObjectType.REACTOR) {
                    if (((MapleReactor) obj).getName().equals(name)) {
                        return (MapleReactor) obj;
                    }
                }
            }
        } finally {
            objectRLock.unlock();
        }
        return null;
    }

    public void spawnMonsterOnGroudBelow(MapleMonster mob, Point pos) {
        spawnMonsterOnGroundBelow(mob, pos);
    }

    public void spawnMonsterOnGroundBelow(int a, int b, int c) {
        MapleMonster mob = MapleLifeFactory.getMonster(a);
        Point pos = new Point(b, c);
        spawnMonsterOnGroundBelow(mob, pos);
    }

    public void spawnMonsterOnGroundBelow(MapleMonster mob, Point pos) {
        Point spos = new Point(pos.x, pos.y - 1);
        spos = calcPointBelow(spos);
        spos.y--;
        mob.setPosition(spos);
        spawnMonster(mob);
    }

    private void monsterItemDrop(final MapleMonster m, final Item item, long delay) {
        final ScheduledFuture<?> monsterItemDrop = TimerManager.getInstance().register(new Runnable() {
            @Override
            public void run() {
                if (MapleMap.this.getMonsterById(m.getId()) != null && !MapleMap.this.getAllPlayer().isEmpty()) {
                    if (item.getItemId() == 4001101) {
                        MapleMap.this.riceCakes++;
                        MapleMap.this.broadcastMessage(MaplePacketCreator.serverNotice(6, "[Notícia] O Coelho da Lua fez o " + (MapleMap.this.riceCakes) + "º bolinho de arroz."));
                    }
                    spawnItemDrop(m, (MapleCharacter) getAllPlayer().get(0), item, m.getPosition(), false, false);
                }
            }
        }, delay, delay);
        if (getMonsterById(m.getId()) == null) {
            monsterItemDrop.cancel(true);
        }
    }

    public void spawnFakeMonsterOnGroundBelow(MapleMonster mob, Point pos) {
        Point spos = getGroundBelow(pos);
        mob.setPosition(spos);
        spawnFakeMonster(mob);
    }

    public Point getGroundBelow(Point pos) {
        Point spos = new Point(pos.x, pos.y - 3);
        spos = calcPointBelow(spos);
        spos.y--;//shouldn't be null!
        return spos;
    }

    public void spawnRevives(final MapleMonster monster) {
        monster.setMap(this);

        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.announce(MaplePacketCreator.spawnMonster(monster, false));
            }
        });
        updateMonsterController(monster);
        spawnedMonstersOnMap.incrementAndGet();
    }

    public void spawnMonster(final MapleMonster monster) {
        if (mobCapacity != -1 && mobCapacity == spawnedMonstersOnMap.get()) {
            return;//PyPQ
        }
        monster.setMap(this);
        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.announce(MaplePacketCreator.spawnMonster(monster, true));
            }
        }, null);
        updateMonsterController(monster);

        if (monster.getDropPeriodTime() > 0) { //9300102 - Watchhog, 9300061 - Moon Bunny (HPQ)
            if (monster.getId() == 9300102) {
                monsterItemDrop(monster, new Item(4031507, (byte) 0, (short) 1), monster.getDropPeriodTime());
            } else if (monster.getId() == 9300061) {
                monsterItemDrop(monster, new Item(4001101, (byte) 0, (short) 1), monster.getDropPeriodTime() / 5);
            } else {
                System.out.println("UNCODED TIMED MOB DETECTED: " + monster.getId());
            }
        }

        /*
         if (monster.getId() == 9300166) {
         //Bomb
         final MapleMap map = this;
         MapTimer.getInstance().schedule(new Runnable() {
         public void run() {
         killMonster(monster, (MapleCharacter) getAllPlayer().get(0), false, false, 3);
         for (MapleMapObject ob : map.getMapObjectsInRange(monster.getPosition(), 40000, Arrays.asList(MapleMapObjectType.PLAYER))) {
         MapleCharacter chr = (MapleCharacter) ob;
         if (chr != null) {
         if (chr.hasShield()) {
         chr.cancelShield();
         continue;
         }
         int hasJewels = chr.countItem(4031868);
         if (hasJewels <= 0) {
         chr.giveDebuff(MapleDisease.STUN, MobSkillFactory.getMobSkill(123, 11));
         continue;
         }
         int drop = (int) (Math.random() * hasJewels);
         if (drop > 5) {
         drop = (int) (Math.random() * 5);
         }
         if (drop < 1) {
         drop = 1;
         }
         MapleInventoryManipulator.removeById(chr.getClient(), MapleInventoryType.ETC, 4031868, (short) drop, false, false);
         for (int i = 0; i < drop; i++) {
         Point pos = chr.getPosition();
         int x = pos.x;
         int y = pos.y;
         if (Math.random() < 0.5) {
         x -= (int) (Math.random() * 100);
         } else {
         x += (int) (Math.random() * 100);
         }
         map.spawnItemDrop(ob, chr, new Item(4031868, (byte) -1, (short) 1), new Point(x, y), true, true);
         }
         broadcastMessage(MaplePacketCreator.updateAriantPQRanking(chr.getName(), chr.getAriantScore(), false));
         }
         }
         }
         }, 3000 + (int) (Math.random() * 2000));
         }
         */
        spawnedMonstersOnMap.incrementAndGet();
        final selfDestruction selfDestruction = monster.getStats().selfDestruction();
        if (monster.getStats().removeAfter() > 0 || selfDestruction != null && selfDestruction.getHp() < 0) {
            if (selfDestruction == null) {
                TimerManager.getInstance().schedule(new Runnable() {
                    @Override
                    public void run() {
                        killMonster(monster, (MapleCharacter) getAllPlayer().get(0), false);
                    }
                }, monster.getStats().removeAfter() * 1000);
            } else {
                TimerManager.getInstance().schedule(new Runnable() {
                    @Override
                    public void run() {
                        killMonster(monster, (MapleCharacter) getAllPlayer().get(0), false, false, selfDestruction.getAction());
                    }
                }, selfDestruction.removeAfter() * 1000);
            }
        }
        if (mapid == 910110000 && !this.allowHPQSummon) { // HPQ make monsters invisible
            this.broadcastMessage(MaplePacketCreator.makeMonsterInvisible(monster));
        }
    }

    public void spawnDojoMonster(final MapleMonster monster) {
        Point[] pts = {new Point(140, 0), new Point(190, 7), new Point(187, 7)};
        spawnMonsterWithEffect(monster, 15, pts[Randomizer.nextInt(3)]);
    }

    public void spawnMonsterWithEffect(final MapleMonster monster, final int effect, Point pos) {
        monster.setMap(this);
        Point spos = new Point(pos.x, pos.y - 1);
        spos = calcPointBelow(spos);
        spos.y--;
        monster.setPosition(spos);
        if (mapid < 925020000 || mapid > 925030000) {
            monster.disableDrops();
        }
        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.announce(MaplePacketCreator.spawnMonster(monster, true, effect));
            }
        });
        if (monster.hasBossHPBar()) {
            broadcastMessage(monster.makeBossHPBarPacket(), monster.getPosition());
        }
        updateMonsterController(monster);

        spawnedMonstersOnMap.incrementAndGet();
    }

    public void spawnFakeMonster(final MapleMonster monster) {
        monster.setMap(this);
        monster.setFake(true);
        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.announce(MaplePacketCreator.spawnFakeMonster(monster, 0));
            }
        });

        spawnedMonstersOnMap.incrementAndGet();
    }

    public void makeMonsterReal(final MapleMonster monster) {
        monster.setFake(false);
        broadcastMessage(MaplePacketCreator.makeMonsterReal(monster));
        updateMonsterController(monster);
    }

    public void spawnReactor(final MapleReactor reactor) {
        reactor.setMap(this);
        spawnAndAddRangedMapObject(reactor, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.announce(reactor.makeSpawnData());
            }
        });

    }

    private void respawnReactor(final MapleReactor reactor) {
        reactor.setState((byte) 0);
        reactor.setAlive(true);
        spawnReactor(reactor);
    }

    public void spawnDoor(final MapleDoor door) {
        spawnAndAddRangedMapObject(door, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.announce(MaplePacketCreator.spawnDoor(door.getOwner().getId(), door.getTargetPosition(), false));
                if (door.getOwner().getParty() != null && (door.getOwner() == c.getPlayer() || door.getOwner().getParty().containsMembers(c.getPlayer().getMPC()))) {
                    c.announce(MaplePacketCreator.partyPortal(door.getTown().getId(), door.getTarget().getId(), door.getTargetPosition()));
                }
                c.announce(MaplePacketCreator.spawnPortal(door.getTown().getId(), door.getTarget().getId(), door.getTargetPosition()));
                c.announce(MaplePacketCreator.enableActions());
            }
        }, new SpawnCondition() {
            @Override
            public boolean canSpawn(MapleCharacter chr) {
                return chr.getMapId() == door.getTarget().getId() || chr == door.getOwner() && chr.getParty() == null;
            }
        });

    }

    public List<MapleCharacter> getPlayersInRange(Rectangle box, List<MapleCharacter> chr) {
        List<MapleCharacter> character = new LinkedList<>();
        chrRLock.lock();
        try {
            for (MapleCharacter a : characters) {
                if (chr.contains(a.getClient().getPlayer())) {
                    if (box.contains(a.getPosition())) {
                        character.add(a);
                    }
                }
            }
            return character;
        } finally {
            chrRLock.unlock();
        }
    }

    public void spawnSummon(final MapleSummon summon) {
        spawnAndAddRangedMapObject(summon, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                if (summon != null) {
                    c.announce(MaplePacketCreator.spawnSummon(summon, true));
                }
            }
        }, null);
    }

    public void spawnMist(final MapleMist mist, final int duration, boolean poison, boolean fake) {
        addMapObject(mist);
        broadcastMessage(fake ? mist.makeFakeSpawnData(30) : mist.makeSpawnData());
        TimerManager tMan = TimerManager.getInstance();
        final ScheduledFuture<?> poisonSchedule;
        if (poison) {
            Runnable poisonTask = new Runnable() {
                @Override
                public void run() {
                    List<MapleMapObject> affectedMonsters = getMapObjectsInBox(mist.getBox(), Collections.singletonList(MapleMapObjectType.MONSTER));
                    for (MapleMapObject mo : affectedMonsters) {
                        if (mist.makeChanceResult()) {
                            MonsterStatusEffect poisonEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, 1), mist.getSourceSkill(), null, false);
                            ((MapleMonster) mo).applyStatus(mist.getOwner(), poisonEffect, true, duration);
                        }
                    }
                }
            };
            poisonSchedule = tMan.register(poisonTask, 2000, 2500);
        } else {
            poisonSchedule = null;
        }
        tMan.schedule(new Runnable() {
            @Override
            public void run() {
                removeMapObject(mist);
                if (poisonSchedule != null) {
                    poisonSchedule.cancel(false);
                }
                broadcastMessage(mist.makeDestroyData());
            }
        }, duration);
    }

    public final void spawnItemDrop(final MapleMapObject dropper, final MapleCharacter owner, final Item item, Point pos, final boolean ffaDrop, final boolean playerDrop) {
        final Point droppos = calcDropPos(pos, pos);
        final MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner, (byte) (ffaDrop ? 2 : 0), playerDrop);

        spawnAndAddRangedMapObject(drop, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.announce(MaplePacketCreator.dropItemFromMapObject(drop, dropper.getPosition(), droppos, (byte) 1));
            }
        }, null);
        broadcastMessage(MaplePacketCreator.dropItemFromMapObject(drop, dropper.getPosition(), droppos, (byte) 0));

        if (!everlast) {
            TimerManager.getInstance().schedule(new ExpireMapItemJob(drop), 180000);
            activateItemReactors(drop, owner.getClient());
        }
    }

    private void activateItemReactors(final MapleMapItem drop, final MapleClient c) {
        final Item item = drop.getItem();

        for (final MapleMapObject o : getAllReactor()) {
            final MapleReactor react = (MapleReactor) o;

            if (react.getReactorType() == 100) {
                if (react.getReactItem((byte) 0).getLeft() == item.getItemId() && react.getReactItem((byte) 0).getRight() == item.getQuantity()) {

                    if (react.getArea().contains(drop.getPosition())) {
                        if (!react.isTimerActive()) {
                            TimerManager.getInstance().schedule(new ActivateItemReactor(drop, react, c), 5000);
                            react.setTimerActive(true);
                            break;
                        }
                    }
                }
            }
        }
    }

    public final List<MapleMapObject> getAllReactor() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.REACTOR));
    }

    public void startMapEffect(String msg, int itemId) {
        startMapEffect(msg, itemId, 30000);
    }

    public void startMapEffect(String msg, int itemId, long time) {
        if (mapEffect != null) {
            return;
        }
        mapEffect = new MapleMapEffect(msg, itemId);
        broadcastMessage(mapEffect.makeStartData());
        TimerManager.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                broadcastMessage(mapEffect.makeDestroyData());
                mapEffect = null;
            }
        }, time);
    }

    public void addPlayer(final MapleCharacter chr) {
        chrWLock.lock();
        try {
            this.characters.add(chr);
        } finally {
            chrWLock.unlock();
        }
        chr.setMapId(mapid);
        if (onFirstUserEnter.length() != 0 && !chr.hasEntered(onFirstUserEnter, mapid) && MapScriptManager.getInstance().scriptExists(onFirstUserEnter, true)) {
            if (getAllPlayer().size() <= 1) {
                chr.enteredScript(onFirstUserEnter, mapid);
                MapScriptManager.getInstance().getMapScript(chr.getClient(), onFirstUserEnter, true);
            }
        }
        if (onUserEnter.length() != 0) {
            if (onUserEnter.equals("cygnusTest") && (mapid < 913040000 || mapid > 913040006)) {
                chr.saveLocation("INTRO");
            }
            MapScriptManager.getInstance().getMapScript(chr.getClient(), onUserEnter, false);
        }
        if (FieldLimit.CANNOTUSEMOUNTS.check(fieldLimit) && chr.getBuffedValue(MapleBuffStat.MONSTER_RIDING) != null) {
            chr.cancelEffectFromBuffStat(MapleBuffStat.MONSTER_RIDING);
            chr.cancelBuffStats(MapleBuffStat.MONSTER_RIDING);
        }
        if (mapid == 923010000 && getMonsterById(9300102) == null) { // Kenta's Mount Quest
            spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9300102), new Point(77, 426));
        } else if (mapid == 910110000) { // Henesys Party Quest
            chr.getClient().announce(MaplePacketCreator.getClock(15 * 60));
            TimerManager.getInstance().register(new Runnable() {
                @Override
                public void run() {
                    if (mapid == 910110000) {
                        chr.getClient().getPlayer().changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(925020000));
                    }
                }
            }, 15 * 60 * 1000 + 3000);
        }

        if (mapid == 970000102 || mapid == 680010000 || mapid == 670000200 || mapid == 670010000 || mapid == 910032000) {

            chr.unequipAllPets();;

        }

        if (mapid == 1000000 && !chr.haveItem(3010000)) {

            chr.ganharItemEspecifico(3010000, (short) 1, false, false);//relaxer corrigir quest

        }

        switch (chr.getMapId()) {
            case 930000000:
                chr.getMap().startMapEffect("Entre no portal para ser transformado.", 5120023);
                break;
            case 930000100:
                chr.getMap().startMapEffect("Derrote os monstros envenenados!", 5120023);
                break;
            case 930000200:
                chr.getMap().startMapEffect("Elimine o esporo que bloqueia o caminho através da purificação do veneno!", 5120023);
                break;
            case 930000300:
                chr.getMap().startMapEffect("Uh oh! A floresta é muito confusa! Me encontre rápido!", 5120023);
                break;
            case 930000400:
                chr.getMap().startMapEffect("Purifique os monstros obtendo mármores de purificação para mim!", 5120023);
                break;
            case 930000500:
                chr.getMap().startMapEffect("Encontre a pedra mágica roxa!", 5120023);
                break;
            case 930000600:
                chr.getMap().startMapEffect("Coloque a Pedra Mágica no altar!", 5120023);
                break;
            case 30000:
                chr.getMap().startMapEffect("Ajude a Nina e siga com sua jornada!", 5120027);
                break;

            case 280030000:
                if (countMonster(6300003) >= 5 || countMonster(6300004) >= 5 || countMonster(6400004) >= 5 || countMonster(6230101) >= 5 || countMonster(6400003) >= 5) {
                    killMonster(6300003);
                    killMonster(6300003);
                    killMonster(6300003);
                    killMonster(6300003);
                    killMonster(6300003);
                    killMonster(6300004);
                    killMonster(6300004);
                    killMonster(6300004);
                    killMonster(6300004);
                    killMonster(6300004);
                    killMonster(6400004);
                    killMonster(6400004);
                    killMonster(6400004);
                    killMonster(6400004);
                    killMonster(6400004);
                    killMonster(6230101);
                    killMonster(6230101);
                    killMonster(6230101);
                    killMonster(6230101);
                    killMonster(6230101);
                    killMonster(6400003);
                    killMonster(6400003);
                    killMonster(6400003);
                    killMonster(6400003);
                    killMonster(6400003);
                }
                break;

        }
        chr.announce(MaplePacketCreator.serverNotice(6, "Você está em " + getMapName()));
        MaplePet[] pets = chr.getPets();
        for (int i = 0; i < chr.getPets().length; i++) {
            if (pets[i] != null) {
                pets[i].setPos(getGroundBelow(chr.getPosition()));
                chr.announce(MaplePacketCreator.showPet(chr, pets[i], false, false));
            } else {
                break;
            }
        }

        if (chr.isHidden()) {
            broadcastGMMessage(chr, MaplePacketCreator.spawnPlayerMapobject(chr), false);
            chr.announce(MaplePacketCreator.getGMEffect(0x10, (byte) 1));
        } else {
            broadcastMessage(chr, MaplePacketCreator.spawnPlayerMapobject(chr), false);
        }

        sendObjectPlacement(chr.getClient());
        if (isStartingEventMap() && !eventStarted()) {
            chr.getMap().getPortal("join00").setPortalStatus(false);
        }
        if (hasForcedEquip()) {
            chr.getClient().announce(MaplePacketCreator.showForcedEquip(-1));
        }
        if (specialEquip()) {
            chr.getClient().announce(MaplePacketCreator.coconutScore(0, 0));
            chr.getClient().announce(MaplePacketCreator.showForcedEquip(chr.getTeam()));
        }
        objectWLock.lock();
        try {
            this.mapobjects.put(Integer.valueOf(chr.getObjectId()), chr);
        } finally {
            objectWLock.unlock();
        }
        if (chr.getPlayerShop() != null) {
            addMapObject(chr.getPlayerShop());
        }
        MapleStatEffect summonStat = chr.getStatForBuff(MapleBuffStat.SUMMON);
        if (summonStat != null) {
            MapleSummon summon = chr.getSummons().get(summonStat.getSourceId());
            summon.setPosition(chr.getPosition());
            chr.getMap().spawnSummon(summon);
            updateMapObjectVisibility(chr, summon);
        }
        if (mapEffect != null) {
            mapEffect.sendStartData(chr.getClient());
        }
        chr.getClient().announce(MaplePacketCreator.resetForcedStats());
        if (mapid == 914000200 || mapid == 914000210 || mapid == 914000220) {
            chr.getClient().announce(MaplePacketCreator.aranGodlyStats());
        }
        if (chr.getEventInstance() != null && chr.getEventInstance().isTimerStarted()) {
            chr.getClient().announce(MaplePacketCreator.getClock((int) (chr.getEventInstance().getTimeLeft() / 1000)));
        }
        if (chr.getFitness() != null && chr.getFitness().isTimerStarted()) {
            chr.getClient().announce(MaplePacketCreator.getClock((int) (chr.getFitness().getTimeLeft() / 1000)));
        }

        if (chr.getOla() != null && chr.getOla().isTimerStarted()) {
            chr.getClient().announce(MaplePacketCreator.getClock((int) (chr.getOla().getTimeLeft() / 1000)));
        }

        if (mapid == 109060000) {
            chr.announce(MaplePacketCreator.rollSnowBall(true, 0, null, null));
        }

        if (hasClock()) {
            Calendar cal = Calendar.getInstance();
            chr.getClient().announce((MaplePacketCreator.getClockTime(cal.get(Calendar.HOUR_OF_DAY), cal.get(Calendar.MINUTE), cal.get(Calendar.SECOND))));
        }
        if (hasBoat() == 2) {
            chr.getClient().announce((MaplePacketCreator.boatPacket(true)));
        } else if (hasBoat() == 1 && (chr.getMapId() != 200090000 || chr.getMapId() != 200090010)) {
            chr.getClient().announce(MaplePacketCreator.boatPacket(false));
        }
        chr.receivePartyMemberHP();
    }

    public MaplePortal findClosestPortal(Point from) {
        MaplePortal closest = null;
        double shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            double distance = portal.getPosition().distanceSq(from);
            if (distance < shortestDistance) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public MaplePortal getRandomSpawnpoint() {
        List<MaplePortal> spawnPoints = new ArrayList<>();
        for (MaplePortal portal : portals.values()) {
            if (portal.getType() >= 0 && portal.getType() <= 2) {
                spawnPoints.add(portal);
            }
        }
        MaplePortal portal = spawnPoints.get(new Random().nextInt(spawnPoints.size()));
        return portal != null ? portal : getPortal(0);
    }

    public void removePlayer(MapleCharacter chr) {
        chrWLock.lock();
        try {
            characters.remove(chr);
        } finally {
            chrWLock.unlock();
        }
        removeMapObject(Integer.valueOf(chr.getObjectId()));
        if (!chr.isHidden()) {
            broadcastMessage(MaplePacketCreator.removePlayerFromMap(chr.getId()));
        } else {
            broadcastGMMessage(MaplePacketCreator.removePlayerFromMap(chr.getId()));
        }

        for (MapleMonster monster : chr.getControlledMonsters()) {
            monster.setController(null);
            monster.setControllerHasAggro(false);
            monster.setControllerKnowsAboutAggro(false);
            updateMonsterController(monster);
        }
        chr.leaveMap();
        chr.cancelMapTimeLimitTask();
        for (MapleSummon summon : chr.getSummons().values()) {
            if (summon.isStationary()) {
                chr.cancelBuffStats(MapleBuffStat.PUPPET);
            } else {
                removeMapObject(summon);
            }
        }
    }

    public void broadcastMensagem(MaplePacket packet) {
        broadcastMensagem(null, packet, Double.POSITIVE_INFINITY, null);
    }

    public void broadcastMessage(final byte[] packet) {
        broadcastMessage(null, packet, Double.POSITIVE_INFINITY, null);
    }

    public void broadcastGMMessage(final byte[] packet) {
        broadcastGMMessage(null, packet, Double.POSITIVE_INFINITY, null);
    }

    /**
     * Nonranged. Repeat to source according to parameter.
     *
     * @param source
     * @param packet
     * @param repeatToSource
     */
    public void broadcastMessage(MapleCharacter source, final byte[] packet, boolean repeatToSource) {
        broadcastMessage(repeatToSource ? null : source, packet, Double.POSITIVE_INFINITY, source.getPosition());
    }

    /**
     * Ranged and repeat according to parameters.
     *
     * @param source
     * @param packet
     * @param repeatToSource
     * @param ranged
     */
    public void broadcastMessage(MapleCharacter source, final byte[] packet, boolean repeatToSource, boolean ranged) {
        broadcastMessage(repeatToSource ? null : source, packet, ranged ? 722500 : Double.POSITIVE_INFINITY, source.getPosition());
    }

    /**
     * Always ranged from Point.
     *
     * @param packet
     * @param rangedFrom
     */
    public void broadcastMessage(final byte[] packet, Point rangedFrom) {
        broadcastMessage(null, packet, 722500, rangedFrom);
    }

    /**
     * Always ranged from point. Does not repeat to source.
     *
     * @param source
     * @param packet
     * @param rangedFrom
     */
    public void broadcastMessage(MapleCharacter source, final byte[] packet, Point rangedFrom) {
        broadcastMessage(source, packet, 722500, rangedFrom);
    }

    private void broadcastMensagem(MapleCharacter source, MaplePacket packet, double rangeSq, Point rangedFrom) {
        synchronized (characters) {
            for (MapleCharacter chr : characters) {
                if (chr != source && !chr.isfake) {
                    if (rangeSq < Double.POSITIVE_INFINITY) {
                        if (rangedFrom.distanceSq(chr.getPosition()) <= rangeSq) {
                            chr.getClient().getSession().write(packet);
                        }
                    } else {
                        chr.getClient().getSession().write(packet);
                    }
                }
            }
        }
    }

    private void broadcastMessage(MapleCharacter source, final byte[] packet, double rangeSq, Point rangedFrom) {
        chrRLock.lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr != source) {
                    if (rangeSq < Double.POSITIVE_INFINITY) {
                        if (rangedFrom.distanceSq(chr.getPosition()) <= rangeSq) {
                            chr.getClient().announce(packet);
                        }
                    } else {
                        chr.getClient().announce(packet);
                    }
                }
            }
        } finally {
            chrRLock.unlock();
        }
    }

    private boolean isNonRangedType(MapleMapObjectType type) {
        switch (type) {
            case NPC:
            case PLAYER:
            case HIRED_MERCHANT:
            case PLAYER_NPC:
            case MIST:
                return true;
        }
        return false;
    }

    private void sendObjectPlacement(MapleClient mapleClient) {
        MapleCharacter chr = mapleClient.getPlayer();
        objectRLock.lock();
        try {
            for (MapleMapObject o : mapobjects.values()) {
                if (o.getType() == MapleMapObjectType.SUMMON) {
                    MapleSummon summon = (MapleSummon) o;
                    if (summon.getOwner() == chr) {
                        if (chr.getSummons().isEmpty() || !chr.getSummons().containsValue(summon)) {
                            objectWLock.lock();
                            try {
                                mapobjects.remove(o);
                            } finally {
                                objectWLock.unlock();
                            }
                            continue;
                        }
                    }
                }
                if (isNonRangedType(o.getType())) {
                    o.sendSpawnData(mapleClient);
                } else if (o.getType() == MapleMapObjectType.MONSTER) {
                    updateMonsterController((MapleMonster) o);
                }
            }
        } finally {
            objectRLock.unlock();
        }
        if (chr != null) {
            for (MapleMapObject o : getMapObjectsInRange(chr.getPosition(), 722500, rangedMapobjectTypes)) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    if (((MapleReactor) o).isAlive()) {
                        o.sendSpawnData(chr.getClient());
                        chr.addVisibleMapObject(o);
                    }
                } else {
                    o.sendSpawnData(chr.getClient());
                    chr.addVisibleMapObject(o);
                }
            }
        }
    }

    public List<MapleMapObject> getMapObjectsInRange(Point from, double rangeSq, List<MapleMapObjectType> types) {
        List<MapleMapObject> ret = new LinkedList<>();
        objectRLock.lock();
        try {
            for (MapleMapObject l : mapobjects.values()) {
                if (types.contains(l.getType())) {
                    if (from.distanceSq(l.getPosition()) <= rangeSq) {
                        ret.add(l);
                    }
                }
            }
            return ret;
        } finally {
            objectRLock.unlock();
        }
    }

    public List<MapleMapObject> getMapObjectsInBox(Rectangle box, List<MapleMapObjectType> types) {
        List<MapleMapObject> ret = new LinkedList<>();
        objectRLock.lock();
        try {
            for (MapleMapObject l : mapobjects.values()) {
                if (types.contains(l.getType())) {
                    if (box.contains(l.getPosition())) {
                        ret.add(l);
                    }
                }
            }
            return ret;
        } finally {
            objectRLock.unlock();
        }
    }

    public void addPortal(MaplePortal myPortal) {
        portals.put(myPortal.getId(), myPortal);
    }

    public MaplePortal getPortal(String portalname) {
        for (MaplePortal port : portals.values()) {
            if (port.getName().equals(portalname)) {
                return port;
            }
        }
        return null;
    }

    public MaplePortal getPortal(int portalid) {
        return portals.get(portalid);
    }

    public void addMapleArea(Rectangle rec) {
        areas.add(rec);
    }

    public List<Rectangle> getAreas() {
        return new ArrayList<>(areas);
    }

    public Rectangle getArea(int index) {
        return areas.get(index);
    }

    public void setFootholds(MapleFootholdTree footholds) {
        this.footholds = footholds;
    }

    public MapleFootholdTree getFootholds() {
        return footholds;
    }

    /**
     * it's threadsafe, gtfo :D
     *
     * @param monster
     * @param mobTime
     */
    public void addMonsterSpawn(MapleMonster monster2, int mobTime, int team) {
        Point newpos = calcPointBelow(monster2.getPosition());
        newpos.y -= 1;
        SpawnPoint sp = new SpawnPoint(monster2, newpos, !monster2.isMobile(), mobTime, mobInterval, team);
        monsterSpawn.add(sp);

        if (sp.shouldSpawn() || mobTime == -1) {// -1 does not respawn and should not either but force ONE spawn
            spawnMonster(sp.getMonster());
        }

    }

    public void setMonsterRate(float monsterRate) {
        this.monsterRate = (byte) monsterRate;
    }

    public float getMonsterRate() {
        return monsterRate;
    }

    public void removePortals() {
        for (MaplePortal pt : getPortals()) {
            pt.setScriptName("blank");
        }
    }

    public Collection<MapleCharacter> getCharacters() {
        return Collections.unmodifiableCollection(this.characters);
    }

    private void updateMapObjectVisibility(MapleCharacter chr, MapleMapObject mo) {
        if (!chr.isMapObjectVisible(mo)) { // monster entered view range
            if (mo.getType() == MapleMapObjectType.SUMMON || mo.getPosition().distanceSq(chr.getPosition()) <= 722500) {
                chr.addVisibleMapObject(mo);
                mo.sendSpawnData(chr.getClient());
            }
        } else if (mo.getType() != MapleMapObjectType.SUMMON && mo.getPosition().distanceSq(chr.getPosition()) > 722500) {
            chr.removeVisibleMapObject(mo);
            mo.sendDestroyData(chr.getClient());
        }
    }

    public void moveMonster(MapleMonster monster, Point reportedPos) {
        monster.setPosition(reportedPos);
        chrRLock.lock();
        try {
            for (MapleCharacter chr : characters) {
                updateMapObjectVisibility(chr, monster);
            }
        } finally {
            chrRLock.unlock();
        }
    }

    public void movePlayer(MapleCharacter player, Point newPosition) {
        player.setPosition(newPosition);
        Collection<MapleMapObject> visibleObjects = player.getVisibleMapObjects();
        MapleMapObject[] visibleObjectsNow = visibleObjects.toArray(new MapleMapObject[visibleObjects.size()]);
        try {
            for (MapleMapObject mo : visibleObjectsNow) {
                if (mo != null) {
                    if (mapobjects.get(mo.getObjectId()) == mo) {
                        updateMapObjectVisibility(player, mo);
                    } else {
                        player.removeVisibleMapObject(mo);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        for (MapleMapObject mo : getMapObjectsInRange(player.getPosition(), 722500, rangedMapobjectTypes)) {
            if (!player.isMapObjectVisible(mo)) {
                mo.sendSpawnData(player.getClient());
                player.addVisibleMapObject(mo);
            }
        }
    }

    public MaplePortal findClosestSpawnpoint(Point from) {
        MaplePortal closest = null;
        double shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            double distance = portal.getPosition().distanceSq(from);
            if (portal.getType() >= 0 && portal.getType() <= 2 && distance < shortestDistance && portal.getTargetMapId() == 999999999) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public Collection<MaplePortal> getPortals() {
        return Collections.unmodifiableCollection(portals.values());
    }

    public String getMapName() {
        return mapName;
    }

    public void setMapName(String mapName) {
        this.mapName = mapName;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setClock(boolean hasClock) {
        this.clock = hasClock;
    }

    public boolean hasClock() {
        return clock;
    }

    public void setTown(boolean isTown) {
        this.town = isTown;
    }

    public boolean isTown() {
        return town;
    }

    public boolean isOx() {
        return town;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public void setEverlast(boolean everlast) {
        this.everlast = everlast;
    }

    public boolean getEverlast() {
        return everlast;
    }

    public int getSpawnedMonstersOnMap() {
        return spawnedMonstersOnMap.get();
    }

    public void setMobCapacity(int capacity) {
        this.mobCapacity = capacity;

    }

    public MapleCharacter getCharacterByName(String name) {
        chrRLock.lock();
        try {
            for (MapleCharacter c : this.characters) {
                if (c.getName().toLowerCase().equals(name.toLowerCase())) {
                    return c;
                }
            }
        } finally {
            chrRLock.unlock();
        }
        return null;
    }

    public List<MapleMonster> getMonsters() {
        List<MapleMonster> mobs = new ArrayList<MapleMonster>();
        for (MapleMapObject object : this.getMapObjects()) {
            mobs.add(this.getMonsterByOid(object.getObjectId()));
        }
        return mobs;
    }

    public void matarBoogies() {
        List<MapleMapObject> monsters = getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
        for (MapleMapObject monstermo : monsters) {
            MapleMonster monster = (MapleMonster) monstermo;
            if (monster.getId() == 3230300 || monster.getId() == 3230301 || monster.getName().toLowerCase().contains("boogie")) {
                spawnedMonstersOnMap.decrementAndGet();
                monster.setHp(0);
                broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), true), monster.getPosition());
                removeMapObject(monster);
            }
        }
        this.broadcastMessage(MaplePacketCreator.serverNotice(6, "Todas as rochas foram quebradas. Os Jr. Boogie desapareceram."));
    }

    public void buffMap(int buffId) {
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        MapleStatEffect statEffect = mii.getItemEffect(buffId);
        synchronized (this.characters) {
            for (MapleCharacter character : this.characters) {
                if (character.isAlive()) {
                    statEffect.applyTo(character);
                }
            }
        }
    }

    public void killAllMonsters(boolean drop) {
        List<MapleMapObject> players = null;
        if (drop) {
            players = getAllPlayer();
        }
        List<MapleMapObject> monsters = getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
        for (MapleMapObject monstermo : monsters) {
            MapleMonster monster = (MapleMonster) monstermo;
            spawnedMonstersOnMap.decrementAndGet();
            monster.setHp(0);
            broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), true), monster.getPosition());
            removeMapObject(monster);
            if (drop) {
                int random = (int) Math.random() * (players.size());
                dropFromMonster((MapleCharacter) players.get(random), monster);
            }
        }
    }

    public boolean isMuted() {
        return isMuted;
    }

    public int countMobOnMap() {
        int count = 0;
        Collection<MapleMapObject> mmos = this.getMapObjects();
        for (MapleMapObject mmo : mmos) {
            if (mmo instanceof MapleMonster) {
                count++;
            }
        }
        return count;
    }

    public int getChannel() {
        return channel;
    }

    public final int getCharactersSize() {
        int ret = 0;
        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter chr;
            while (ltr.hasNext()) {
                chr = ltr.next();
                if (!chr.isClone()) {
                    ret++;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return ret;
    }

    public void CancelRichieEnter() {
        if (RichieEnter != null) {
            this.RichieEnter.cancel(true);
            this.RichieEnter = null;
        }
    }

    public void addMonsterSpawn(MapleMonster monster, int mobTime) {
        Point newpos = calcPointBelow(monster.getPosition());
        newpos.y -= 1;
        SpawnMob sp = new SpawnMob(monster, newpos, mobTime);
        spawnarMob.add(sp);
        if (sp.shouldSpawn() || mobTime == -1) {
            sp.spawnMonster(this);
        }
    }

    public final SpawnCPQ addMonsterSpawn(final MapleMonster monster, final int mobTime, final byte carnivalTeam, final String msg) {
        final Point newpos = calcPointBelow(monster.getPosition());
        newpos.y -= 1;
        final SpawnCPQ sp = new SpawnCPQ(monster, newpos, mobTime, carnivalTeam, msg);
        if (carnivalTeam > -1) {
            monsterSpawncpq.add(0, sp); //at the beginning
        } else {
            monsterSpawncpq.add(sp);
        }
        return sp;
    }

    /**
     * not threadsafe, please synchronize yourself
     *
     * @param team
     * @return
     */
    public Point getRandomSP(int team) {
        if (takenSpawns.size() > 0) {
            for (SpawnPoint sp : monsterSpawn) {
                for (Point pt : takenSpawns) {
                    if ((sp.getPosition().x == pt.x && sp.getPosition().y == pt.y) || (sp.getTeam() != team && !this.isBlueCPQMap())) {
                        continue;
                    } else {
                        takenSpawns.add(pt);
                        return sp.getPosition();
                    }
                }
            }
        } else {
            for (SpawnPoint sp : monsterSpawn) {
                if (sp.getTeam() == team || this.isBlueCPQMap()) {
                    takenSpawns.add(sp.getPosition());
                    return sp.getPosition();
                }
            }
        }
        return null;
    }

    public GuardianSpawnPoint getRandomGuardianSpawn(int team) {
        boolean alltaken = false;
        for (GuardianSpawnPoint a : this.guardianSpawns) {
            if (!a.isTaken()) {
                alltaken = false;
                break;
            }
        }
        if (alltaken) {
            return null;
        }
        if (this.guardianSpawns.size() > 0) {
            while (true) {
                for (GuardianSpawnPoint gsp : this.guardianSpawns) {
                    if (!gsp.isTaken() && Math.random() < 0.3 && (gsp.getTeam() == -1 || gsp.getTeam() == team)) {
                        return gsp;
                    }
                }
            }
        }
        return null;
    }

    public void addGuardianSpawnPoint(GuardianSpawnPoint a) {
        this.guardianSpawns.add(a);
    }

    public MapleCharacter getCharacterById(int id) {
        chrRLock.lock();
        try {
            for (MapleCharacter c : this.characters) {
                if (c.getId() == id) {
                    return c;
                }
            }
        } finally {
            chrRLock.unlock();
        }
        return null;
    }

    public void clearBuffList() {
        redTeamBuffs.clear();
        blueTeamBuffs.clear();
    }

    public void buffMonsters(int team, MonsterStatus status) {
        if (team == 0) {
            redTeamBuffs.add(status);
        } else if (team == 1) {
            blueTeamBuffs.add(status);
        }
        for (MapleMapObject mmo : this.mapobjects.values()) {
            if (mmo.getType() == MapleMapObjectType.MONSTER) {
                MapleMonster mob = (MapleMonster) mmo;
                if (mob.getTeam() == team) {
                    int skillID = getSkillId(status);
                    if (skillID != -1) {
                        MobSkill skill = getMobSkill(skillID, this.getSkillLevel(status));
                        mob.applyMonsterBuff(status, skill.getX(), skill.getSkillId(), 1000 * 60 * 10, skill);
                    }
                }
            }
        }
    }

    public void removeStatus(MonsterStatus status, int team) {
        List<MonsterStatus> a = null;
        if (team == 0) {
            a = redTeamBuffs;
        } else if (team == 1) {
            a = blueTeamBuffs;
        }
        List<MonsterStatus> r = new LinkedList<MonsterStatus>();
        for (MonsterStatus ms : a) {
            if (ms.equals(status)) {
                r.add(ms);
            }
        }
        for (MonsterStatus al : r) {
            if (a.contains(al)) {
                a.remove(al);
            }
        }
    }

    /**
     * returns 1 on success, 0 on already spawned, -1 on no spot
     *
     * @param status
     * @param team
     * @return
     */
    public int spawnGuardian(MonsterStatus status, int team) {
        List<MapleMapObject> reactors = getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.REACTOR));
        for (GuardianSpawnPoint gs : this.guardianSpawns) {
            for (MapleMapObject o : reactors) {
                MapleReactor reactor = (MapleReactor) o;
                if (reactor.getCancelStatus().equals(status) && (reactor.getId() - 9980000) == team) {
                    return 0;
                }
            }
        }
        GuardianSpawnPoint pt = this.getRandomGuardianSpawn(team);
        if (pt == null) {
            return -1;
        }
        int reactorID = 9980000 + team;
        MapleReactor reactor = new MapleReactor(MapleReactorFactory.getReactor(reactorID), reactorID);
        pt.setTaken(true);
        reactor.setPosition(pt.getPosition());
        this.spawnReactor(reactor);
        reactor.setCancelStatus(status);
        reactor.setGuardian(pt);
        this.buffMonsters(team, status);
        getReactorByOid(reactor.getObjectId()).hitReactor(((MapleCharacter) this.getAllPlayer().get(0)).getClient());
        return 1;
    }

    public void debuffMonsters(int team, MonsterStatus status) {
        if (team == 0) {
            removeStatus(status, team);
        } else if (team == 1) {
            removeStatus(status, team);
        }
        for (MapleMapObject mmo : this.mapobjects.values()) {
            if (mmo.getType() == MapleMapObjectType.MONSTER) {
                MapleMonster mob = (MapleMonster) mmo;
                if (mob.getTeam() == team) {
                    int skillID = getSkillId(status);
                    if (skillID != -1) {
                        if (mob.getMonsterBuffs().contains(status)) {
                            mob.cancelMonsterBuff(status);
                        }
                    }
                }
            }
        }
    }

    public MobSkill getMobSkill(int skillId, int level) {
        return MobSkillFactory.getMobSkill(skillId, level);
    }

    public int getSkillId(MonsterStatus status) {
        if (status == MonsterStatus.WEAPON_ATTACK_UP) {
            return 100;
        } else if (status.equals(MonsterStatus.MAGIC_ATTACK_UP)) {
            return 101;
        } else if (status.equals(MonsterStatus.WEAPON_DEFENSE_UP)) {
            return 112;
        } else if (status.equals(MonsterStatus.MAGIC_DEFENSE_UP)) {
            return 113;
        } else if (status.equals(MonsterStatus.WEAPON_IMMUNITY)) {
            return 140;
        } else if (status.equals(MonsterStatus.MAGIC_IMMUNITY)) {
            return 141;
        }
        return -1;
    }

    public int getSkillLevel(MonsterStatus status) {
        if (status == MonsterStatus.WEAPON_ATTACK_UP) {
            return 1;
        } else if (status.equals(MonsterStatus.MAGIC_ATTACK_UP)) {
            return 1;
        } else if (status.equals(MonsterStatus.WEAPON_DEFENSE_UP)) {
            return 1;
        } else if (status.equals(MonsterStatus.MAGIC_DEFENSE_UP)) {
            return 1;
        } else if (status.equals(MonsterStatus.WEAPON_IMMUNITY)) {
            return 10;
        } else if (status.equals(MonsterStatus.MAGIC_IMMUNITY)) {
            return 9;
        }
        return -1;
    }

    public void addClock(int seconds) {
        broadcastMessage(MaplePacketCreator.getClock(seconds));
    }

    private class ExpireMapItemJob implements Runnable {

        private MapleMapItem mapitem;

        public ExpireMapItemJob(MapleMapItem mapitem) {
            this.mapitem = mapitem;
        }

        @Override
        public void run() {
            if (mapitem != null && mapitem == getMapObject(mapitem.getObjectId())) {
                mapitem.itemLock.lock();
                try {
                    if (mapitem.isPickedUp()) {
                        return;
                    }
                    MapleMap.this.broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 0, 0), mapitem.getPosition());
                    mapitem.setPickedUp(true);
                } finally {
                    mapitem.itemLock.unlock();
                    MapleMap.this.removeMapObject(mapitem);
                }
            }
        }
    }

    private class ActivateItemReactor implements Runnable {

        private MapleMapItem mapitem;
        private MapleReactor reactor;
        private MapleClient c;

        public ActivateItemReactor(MapleMapItem mapitem, MapleReactor reactor, MapleClient c) {
            this.mapitem = mapitem;
            this.reactor = reactor;
            this.c = c;
        }

        @Override
        public void run() {
            if (mapitem != null && mapitem == getMapObject(mapitem.getObjectId())) {
                mapitem.itemLock.lock();
                try {
                    TimerManager tMan = TimerManager.getInstance();
                    if (mapitem.isPickedUp()) {
                        return;
                    }
                    MapleMap.this.broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 0, 0), mapitem.getPosition());
                    MapleMap.this.removeMapObject(mapitem);
                    reactor.hitReactor(c);
                    reactor.setTimerActive(false);
                    if (reactor.getDelay() > 0) {
                        tMan.schedule(new Runnable() {
                            @Override
                            public void run() {
                                reactor.setState((byte) 0);
                                broadcastMessage(MaplePacketCreator.triggerReactor(reactor, 0));
                            }
                        }, reactor.getDelay());
                    }
                } finally {
                    mapitem.itemLock.unlock();
                }
            }
        }
    }

    public void instanceMapRespawn() {
        final int numShouldSpawn = (short) ((monsterSpawn.size() - spawnedMonstersOnMap.get()));//Fking lol'd
        if (numShouldSpawn > 0) {
            List<SpawnPoint> randomSpawn = new ArrayList<>(monsterSpawn);
            Collections.shuffle(randomSpawn);
            int spawned = 0;
            for (SpawnPoint spawnPoint : randomSpawn) {
                spawnMonster(spawnPoint.getMonster());
                spawned++;
                if (spawned >= numShouldSpawn) {
                    break;
                }
            }
        }
    }

    public void respawn() {
        if (characters.isEmpty()) {
            return;
        }

        short numShouldSpawn = (short) ((monsterSpawn.size() - spawnedMonstersOnMap.get()));//Fking lol'd
        if (numShouldSpawn > 0) {
            List<SpawnPoint> randomSpawn = new ArrayList<>(monsterSpawn);
            Collections.shuffle(randomSpawn);
            short spawned = 0;
            for (SpawnPoint spawnPoint : randomSpawn) {
                if (spawnPoint.shouldSpawn()) {
                    spawnMonster(spawnPoint.getMonster());
                    spawned++;
                }
                if (spawned >= numShouldSpawn) {
                    break;
                }
            }
        }
    }

    private static interface DelayedPacketCreation {

        void sendPackets(MapleClient c);
    }

    private static interface SpawnCondition {

        boolean canSpawn(MapleCharacter chr);
    }

    public int getHPDec() {
        return decHP;
    }

    public void setHPDec(int delta) {
        decHP = delta;
    }

    public int getHPDecProtect() {
        return protectItem;
    }

    public void setHPDecProtect(int delta) {
        this.protectItem = delta;
    }
    
    private int hasBoat() {
        return !boat ? 0 : (docked ? 1 : 2);
    }

    public void setBoat(boolean hasBoat) {
        this.boat = hasBoat;
    }

    public void setDocked(boolean isDocked) {
        this.docked = isDocked;
    }

    public boolean getDocked() {
        return this.docked;
    }

    /*private int hasBoat() {
        return docked ? 2 : (boat ? 1 : 0);
    }

    public void setBoat(boolean hasBoat) {
        this.boat = hasBoat;
    }

    public void setDocked(boolean isDocked) {
        this.docked = isDocked;
    }
    */

    public void broadcastGMMessage(MapleCharacter source, final byte[] packet, boolean repeatToSource) {
        broadcastGMMessage(repeatToSource ? null : source, packet, Double.POSITIVE_INFINITY, source.getPosition());
    }

    private void broadcastGMMessage(MapleCharacter source, final byte[] packet, double rangeSq, Point rangedFrom) {
        chrRLock.lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr != source && chr.isGM()) {
                    if (rangeSq < Double.POSITIVE_INFINITY) {
                        if (rangedFrom.distanceSq(chr.getPosition()) <= rangeSq) {
                            chr.getClient().announce(packet);
                        }
                    } else {
                        chr.getClient().announce(packet);
                    }
                }
            }
        } finally {
            chrRLock.unlock();
        }
    }

    public void broadcastNONGMMessage(MapleCharacter source, final byte[] packet, boolean repeatToSource) {
        chrRLock.lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr != source && !chr.isGM()) {
                    chr.getClient().announce(packet);
                }
            }
        } finally {
            chrRLock.unlock();
        }
    }

    public MapleOxQuiz getOx() {
        return ox;
    }

    public void setOx(MapleOxQuiz set) {
        this.ox = set;
    }

    public void setOxQuiz(boolean b) {
        this.isOxQuiz = b;
    }

    public boolean isOxQuiz() {
        return isOxQuiz;
    }

    public void setOnUserEnter(String onUserEnter) {
        this.onUserEnter = onUserEnter;
    }

    public String getOnUserEnter() {
        return onUserEnter;
    }

    public void setOnFirstUserEnter(String onFirstUserEnter) {
        this.onFirstUserEnter = onFirstUserEnter;
    }

    public String getOnFirstUserEnter() {
        return onFirstUserEnter;
    }

    private boolean hasForcedEquip() {
        return fieldType == 81 || fieldType == 82;
    }

    public void setFieldType(int fieldType) {
        this.fieldType = fieldType;
    }

    public void clearDrops(MapleCharacter player) {
        List<MapleMapObject> items = player.getMap().getMapObjectsInRange(player.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM));
        for (MapleMapObject i : items) {
            player.getMap().removeMapObject(i);
            player.getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(i.getObjectId(), 0, player.getId()));
        }
    }

    public void clearDrops() {
        for (MapleMapObject i : getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM))) {
            removeMapObject(i);
        }
    }

    public void addMapTimer(int time) {
        timeLimit = System.currentTimeMillis() + (time * 1000);
        broadcastMessage(MaplePacketCreator.getClock(time));
        mapMonitor = TimerManager.getInstance().register(new Runnable() {
            @Override
            public void run() {
                if (timeLimit != 0 && timeLimit < System.currentTimeMillis()) {
                    warpEveryone(getForcedReturnId());
                }
                if (getCharacters().isEmpty()) {
                    resetReactors();
                    killAllMonsters();
                    clearDrops();
                    timeLimit = 0;
                    if (mapid >= 922240100 && mapid <= 922240119) {
                        toggleHiddenNPC(9001108);
                    }
                    mapMonitor.cancel(true);
                    mapMonitor = null;
                }
            }
        }, 1000);
    }

    public void setFieldLimit(int fieldLimit) {
        this.fieldLimit = fieldLimit;
    }

    public int getFieldLimit() {
        return fieldLimit;
    }

    public void resetRiceCakes() {
        this.riceCakeNum = 0;
    }

    public void setAllowHPQSummon(boolean b) {
        this.allowHPQSummon = b;
    }

    public void addBunnyHit() {
        bunnyDamage++;
        if (bunnyDamage > 5) {
            broadcastMessage(MaplePacketCreator.serverNotice(6, "O coelhinho da lua esta se sentindo doente, proteja-o."));
            bunnyDamage = 0;
        }
    }

    public void allowSummonState(boolean b) {
        MapleMap.this.allowSummons = b;
    }

    public boolean getSummonState() {
        return MapleMap.this.allowSummons;
    }

    public void warpEveryone(int to) {
        for (MapleCharacter chr : getCharacters()) {
            chr.changeMap(to);
        }
    }

    // BEGIN EVENTS
    public void setSnowball(int team, MapleSnowball ball) {
        switch (team) {
            case 0:
                this.snowball0 = ball;
                break;
            case 1:
                this.snowball1 = ball;
                break;
            default:
                break;
        }
    }

    public MapleSnowball getSnowball(int team) {
        switch (team) {
            case 0:
                return snowball0;
            case 1:
                return snowball1;
            default:
                return null;
        }
    }

    private boolean specialEquip() {//Maybe I shouldn't use fieldType :\
        return fieldType == 4 || fieldType == 19;
    }

    public void setCoconut(MapleCoconut nut) {
        this.coconut = nut;
    }

    public MapleCoconut getCoconut() {
        return coconut;
    }

    public void warpOutByTeam(int team, int mapid) {
        for (MapleCharacter chr : getCharacters()) {
            if (chr != null) {
                if (chr.getTeam() == team) {
                    chr.changeMap(mapid);
                }
            }
        }
    }

    public void startEvent(final MapleCharacter chr) {
        if (this.mapid == 109080000) {
            setCoconut(new MapleCoconut(this));
            coconut.startEvent();

        } else if (this.mapid == 109040000) {
            chr.setFitness(new MapleFitness(chr));
            chr.getFitness().startFitness();

        } else if (this.mapid == 109030001 || this.mapid == 109030101) {
            chr.setOla(new MapleOla(chr));
            chr.getOla().startOla();

        } else if (this.mapid == 109020001 && getOx() == null) {
            setOx(new MapleOxQuiz(this));
            getOx().sendQuestion();
            setOxQuiz(true);

        } else if (this.mapid == 109060000 && getSnowball(chr.getTeam()) == null) {
            setSnowball(0, new MapleSnowball(0, this));
            setSnowball(1, new MapleSnowball(1, this));
            getSnowball(chr.getTeam()).startEvent();
        }
    }

    public boolean eventStarted() {
        return eventstarted;
    }

    public void startEvent() {
        this.eventstarted = true;
    }

    public void setEventStarted(boolean event) {
        this.eventstarted = event;
    }

    public String getEventNPC() {
        StringBuilder sb = new StringBuilder();
        sb.append("");
        if (mapid == 60000) {
            sb.append("Paul!");
        } else if (mapid == 104000000) {
            sb.append("Jean");
        } else if (mapid == 200000000) {
            sb.append("Martin");
        } else if (mapid == 220000000) {
            sb.append("Tony");
        } else {
            return null;
        }
        return sb.toString();
    }

    public boolean hasEventNPC() {
        return this.mapid == 60000 || this.mapid == 104000000 || this.mapid == 200000000 || this.mapid == 220000000;
    }

    public boolean isStartingEventMap() {
        return this.mapid == 109040000 || this.mapid == 109020001 || this.mapid == 109010000 || this.mapid == 109030001 || this.mapid == 109030101;
    }

    public boolean isEventMap() {
        return this.mapid >= 109010000 && this.mapid < 109050000 || this.mapid > 109050001 && this.mapid <= 109090000;
    }

    public void timeMob(int id, String msg) {
        timeMob = new Pair<>(id, msg);
    }

    public Pair<Integer, String> getTimeMob() {
        return timeMob;
    }

    public void toggleHiddenNPC(int id) {
        for (MapleMapObject obj : mapobjects.values()) {
            if (obj.getType() == MapleMapObjectType.NPC) {
                MapleNPC npc = (MapleNPC) obj;
                if (npc.getId() == id) {
                    npc.setHide(!npc.isHidden());
                    if (!npc.isHidden()) //Should only be hidden upon changing maps
                    {
                        broadcastMessage(MaplePacketCreator.spawnNPC(npc));
                    }
                }
            }
        }
    }

    public void setMobInterval(short interval) {
        this.mobInterval = interval;
    }

    public short getMobInterval() {
        return mobInterval;
    }

    public boolean hasTimer() {
        return timer;
    }

    public void setTimer(boolean hasClock) {
        this.timer = hasClock;
    }

    private final class warpAll implements Runnable {

        private MapleMap toGo;
        private MapleMap from;

        public warpAll(MapleMap toGoto, MapleMap from) {
            this.toGo = toGoto;
            this.from = from;
        }

        @Override
        public void run() {
            synchronized (toGo) {
                for (MapleCharacter ppp : characters) {
                    if (ppp.getMap().equals(from)) {
                        ppp.changeMap(toGo, toGo.getPortal(0));
                        if (ppp.getEventInstance() != null) {
                            ppp.getEventInstance().unregisterPlayer(ppp);
                        }
                    }
                }
            }
        }
    }

    private class TimerDestroyWorker implements Runnable {

        @Override
        public void run() {
            if (mapTimer != null) {
                int warpMap = mapTimer.warpToMap();
                int minWarp = mapTimer.minLevelToWarp();
                int maxWarp = mapTimer.maxLevelToWarp();
                mapTimer = null;
                if (warpMap != -1) {
                    MapleMap map2wa2 = Channel.getInstance(channel).getMapFactory().getMap(warpMap);
                    String warpmsg = "Você foi levado para " + map2wa2.getStreetName() + " : " + map2wa2.getMapName();
                    broadcastMessage(MaplePacketCreator.serverNotice(6, warpmsg));
                    for (MapleCharacter chr : getCharacters()) {
                        try {
                            if (chr.getLevel() >= minWarp && chr.getLevel() <= maxWarp) {
                                chr.changeMap(map2wa2, map2wa2.getPortal(0));
                            } else {
                                chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "Você não está no level " + minWarp + " ou seu level é maior que " + maxWarp + "."));
                            }
                        } catch (Exception ex) {
                            String erromensagem = "Há um problema para leva-lo até outro mapa. Por favor, contate um GM.";
                            chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, erromensagem));
                        }
                    }
                }
            }
        }
    }

    public void removerItems() {
        MapleMap map = this;
        double range = Double.POSITIVE_INFINITY;
        List<MapleMapObject> items = map.getMapObjectsInRange(new Point(0, 0), range, Arrays.asList(MapleMapObjectType.ITEM));
        for (MapleMapObject itemmo : items) {
            map.removeMapObject(itemmo);
        }
    }

    public int[] pqmaps = {
        /* Ludi PQ */
        922010100, 922010200, 922010300, 922010400, 922010500, 922010600, 922010700, 922010800, 922010900, 922011000,/* Ludi fim */
        /* Henesys PQ */
        910010000, 910010100, 910010200, 910010300, 910010400,/* Henesys fim */
        /* Orbis PQ */
        920010100, 920010200, 920010300, 920010400, 920010500, 920010600, 920010700, 920010800, 920010900, 920011000, 920011100, 920011300,/* Orbis fim */
        /* Ariant PQ */
        980010010, 980010020, 980010101, 980010201, 980010301,/* Ariant fim */
        /* Kerning PQ */
        103000800, 103000801, 103000802, 103000803, 103000804, 103000890,/* Kerning PQ */
        /* Ludi Maze PQ */
        809050000, 809050001, 809050002, 809050003, 809050004, 809050005, 809050006, 809050007, 809050008, 809050009, 809050010, 809050011, 809050012, 809050013, 809050014, 809050015, 809050016, 809050017,/* Ludi Maze fim */
        /* Carnaval de Monstros */
        980000100, 980000101, 980000102, 980000103, 980000104, 980000200, 980000201, 980000202, 980000203, 980000204, 980000300, 980000301, 980000302, 980000303, 980000304, 980000400, 980000401, 980000402, 980000403, 980000404, 980000500, 980000501, 980000502, 980000503, 980000504, 980000600, 980000601, 980000602, 980000603, 980000604,/* CPQ fim */
        /* Maple Road */
        1, 2, 3, 4,
        /* CashPQ */
        107000200
    };

    public boolean emPQ() {
        boolean empq = false;
        for (int i = 0; i < pqmaps.length; i++) {
            if (getId() == pqmaps[i]) {
                empq = true;
            }
        }
        return empq;
    }

    public boolean isRichieMapa() {
        switch (this.getId()) {
            case 390000000:
            case 390000100:
            case 390000200:
            case 390000300:
            case 390000400:
            case 390000500:
            case 390000600:
            case 390000700:
            case 390000800:
            case 390000900:
            case 390001000:
                return true;
        }
        return false;
    }

    public boolean isMapaMPQ() {
        switch (this.getId()) {
            case 390000000:
            case 390000100:
            case 390000200:
            case 390000300:
            case 390000400:
            case 390000500:
            case 390000600:
            case 390000700:
            case 390000800:
            case 390000900:
            case 390001000:
                return true;
        }
        return false;
    }

    public final MapleInventory getInventory(MapleInventoryType type) {
        return inventory[type.ordinal()];
    }

    public final MapleInventory[] getInventorys() {
        return inventory;
    }

    public List<Integer> getUniqueMonsters() {
        List<Integer> mobs = new ArrayList<Integer>();
        for (MapleMapObject obj : this.getMapObjects()) {
            MapleMonster mob = this.getMonsterByOid(obj.getObjectId());
            if (mob != null) {
                if (!mobs.contains(mob.getId())) {
                    mobs.add(mob.getId());
                }
            }
        }
        return mobs;
    }

    public int getMonsterCount() {
        List<MapleMapObject> monsters = getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
        return monsters.size();
    }

    public boolean isWarMap() {
        switch (this.getId()) {
            case 610020011: //Cavern Of Pain
                return true;
        }
        return false;
    }

    public Collection<MapleCharacter> getNearestPvpChar(Point attacker, double maxRange, double maxHeight, Collection<MapleCharacter> chr) {
        Collection<MapleCharacter> character = new LinkedList<MapleCharacter>();

        for (MapleCharacter a : characters) {
            if (mapid == 800020400) {
                if (chr.contains(a.getClient().getPlayer())) {
                    Point attackedPlayer = a.getPosition();
                    MaplePortal Port = a.getMap().findClosestSpawnpoint(a.getPosition());
                    Point nearestPort = Port.getPosition();
                    double safeDis = attackedPlayer.distance(nearestPort);
                    double distanceX = attacker.distance(attackedPlayer.getX(), attackedPlayer.getY());
                    if (MaplePvp.isLeft) {
                        if (attacker.x > attackedPlayer.x && distanceX < maxRange && distanceX > 2
                                && attackedPlayer.y >= attacker.y - maxHeight && attackedPlayer.y <= attacker.y + maxHeight && safeDis > 2) {
                            character.add(a);
                        }
                    }
                    if (MaplePvp.isRight) {
                        if (attacker.x < attackedPlayer.x && distanceX < maxRange && distanceX > 2
                                && attackedPlayer.y >= attacker.y - maxHeight && attackedPlayer.y <= attacker.y + maxHeight && safeDis > 2) {
                            character.add(a);
                        }
                    }
                }
            }
        }
        return character;
    }

    public final void setSpawns(final boolean fm) {
        this.isSpawns = fm;
    }

    public String getTimeMobMessage() {
        return timeMobMessage;
    }

    public int getTimeMobId() {
        return timeMobId;
    }

    public final List<MapleCharacter> getCharactersThreadsafe() {
        final List<MapleCharacter> chars = new ArrayList<>();
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                chars.add(mc);
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return chars;
    }

    public final boolean makeCarnivalSpawn(final int team, final MapleMonster newMons, final int num) {
        MonsterPoint ret = null;
        for (MonsterPoint mp : nodes.getMonsterPoints()) {
            if (mp.team == team || mp.team == -1) {
                final Point newpos = calcPointBelow(new Point(mp.x, mp.y));
                newpos.y -= 1;
                boolean found = false;
                for (Spawns s : monsterSpawncpq) {
                    if (s.getCarnivalId() > -1 && (mp.team == -1 || s.getCarnivalTeam() == mp.team) && s.getPosition().x == newpos.x && s.getPosition().y == newpos.y) {
                        found = true;
                        break; //this point has already been used.
                    }
                }
                if (!found) {
                    ret = mp; //this point is safe for use.
                    break;
                }
            }
        }
        if (ret != null) {
            newMons.setCy(ret.cy);
            newMons.setF(0); //always.
            newMons.setFh(ret.fh);
            newMons.setRx0(ret.x + 50);
            newMons.setRx1(ret.x - 50); //does this matter
            newMons.setPosition(new Point(ret.x, ret.y));
            newMons.setHide(false);
            final SpawnCPQ sp = addMonsterSpawn(newMons, 1, (byte) team, null);
            sp.setCarnival(num);
        }
        return ret != null;
    }

    public final void spawnReactorOnGroundBelow(final MapleReactor mob, final Point pos) {
        mob.setPosition(pos); //reactors dont need FH lol
        mob.setCustom(true);
        spawnReactor(mob);
    }

    public final List<Pair<Integer, Integer>> getMobsToSpawn() {
        return nodes.getMobsToSpawn();
    }

    public List<MapleMonster> getAllMonstersThreadsafe() {
        ArrayList<MapleMonster> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectTypeCPQP.MONSTERCPQ).readLock().lock();
        try {
            for (MapleMapObjectCPQ mmo : mapobjectscpq.get(MapleMapObjectTypeCPQP.MONSTERCPQ).getvalues()) {
                //ret.add((MapleMonster) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectTypeCPQP.MONSTERCPQ).readLock().unlock();
        }
        return ret;
    }

    public List<MapleReactor> getAllReactorsThreadsafe() {
        ArrayList<MapleReactor> ret = new ArrayList<MapleReactor>();
        mapobjectlocks.get(MapleMapObjectTypeCPQP.REACTOR).readLock().lock();
        try {
            for (MapleMapObjectCPQ mmo : mapobjectscpq.get(MapleMapObjectTypeCPQP.REACTOR).getvalues()) {
                // ret.add((MapleReactor) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        return ret;
    }

    /*

     public void checkStates(final String chr) {
     if (!checkStates) {
     return;
     }
     final MapleSquadCPQ sqdcpq = getSquadByMapcpq();
     final EventManager em = getEMByMap();
     final int size = getCharactersSize();
     if (sqdcpq != null && sqdcpq.getStatus() == 2) {
     sqdcpq.removeMember(chr);
     if (em != null) {
     if (sqdcpq.getLeaderName().equalsIgnoreCase(chr)) {
     em.setProperty("leader", "false");
     }
     if (chr.equals("") || size == 0) {
     em.setProperty("state", "0");
     em.setProperty("leader", "true");
     cancelSquadSchedule(!chr.equals(""));
     sqdcpq.clear();
     sqdcpq.copy();
     }
     }
     }
     if (em != null && em.getProperty("state") != null && (sqdcpq == null || sqdcpq.getStatus() == 2) && size == 0) {
     em.setProperty("state", "0");
     if (em.getProperty("leader") != null) {
     em.setProperty("leader", "true");
     }
     }
     if (speedRunStart > 0 && size == 0) {
     endSpeedRun();
     }
     if (squad != null) {
     final MapleSquadCPQ sqdd = Channel.getInstance(channelcpq).getMapleSquadcpq(squad);
     if (sqdd != null && chr != null && chr.length() > 0 && sqdd.getAllNextPlayer().contains(chr)) {
     sqdd.getAllNextPlayer().remove(chr);
     broadcastMessage(CWvsContext.serverNotice(5, "The queued player " + chr + " has left the map."));
     }
     }
     }

     public void setCheckStates(boolean b) {
     this.checkStates = b;
     }
    
     public final void cancelSquadSchedule(boolean interrupt) {
     squadTimer = false;
     checkStates = true;
     if (squadSchedule != null) {
     squadSchedule.cancel(interrupt);
     squadSchedule = null;
     }
     }
     public void endSpeedRun() {
     speedRunStart = 0;
     speedRunLeader = "";
     }
        
     public final MapleSquad getSquadByMapcpq() {
     MapleSquadType zz = null;
     switch (mapid) {
     case 105100400:
     case 105100300:
     //zz = MapleSquadType.bossbalrog;
     break;
            
     default:
     return null;
     }
     return Channel.getInstance(channel).getMapleSquad(zz);
     }
        
     public final EventManager getEMByMap() {
     String em = null;
     switch (mapid) {
     case 105100400:
     em = "BossBalrog_EASY";
     break;
     case 105100300:
     em = "BossBalrog_NORMAL";
     break;
     case 280030000:
     em = "ZakumBattle";
     break;
     case 240060200:
     em = "HorntailBattle";
     break;
     case 280030001:
     em = "ChaosZakum";
     break;
     case 240060201:
     em = "ChaosHorntail";
     break;
     case 270050100:
     em = "PinkBeanBattle";
     break;
     case 802000111:
     em = "NamelessMagicMonster";
     break;
     case 802000211:
     em = "Vergamot";
     break;
     case 802000311:
     em = "2095_tokyo";
     break;
     case 802000411:
     em = "Dunas";
     break;
     case 802000611:
     em = "Nibergen";
     break;
     case 802000711:
     em = "Dunas2";
     break;
     case 802000801:
     case 802000802:
     case 802000803:
     em = "CoreBlaze";
     break;
     case 802000821:
     case 802000823:
     em = "Aufhaven";
     break;
     case 211070100:
     case 211070101:
     case 211070110:
     em = "VonLeonBattle";
     break;
     case 551030200:
     em = "ScarTarBattle";
     break;
     case 271040100:
     em = "CygnusBattle";
     break;
     default:
     return null;
     }
     return Channel.getInstance(channel).getEventSM().getEventManager(em);
     }
         
     public final MapleSquad getSquadByMapcpq2() {
     MapleSquadType zz = null;
     switch (mapid) {
     case 105100400:
     case 105100300:
     //  zz = MapleSquadType.bossbalrog;
     break;
     case 280030000:
     //  zz = MapleSquadType.zak;
     break;
     case 280030001:
     // zz = MapleSquadType.chaoszak;
     break;
     case 240060200:
     // zz = MapleSquadType.horntail;
     break;
     case 240060201:
     // zz = MapleSquadType.chaosht;
     break;
     case 270050100:
     // zz = MapleSquadType.pinkbean;
     break;
     case 802000111:
     // zz = MapleSquadType.nmm_squad;
     break;
     case 802000211:
     //  zz = MapleSquadType.vergamot;
     break;
     case 802000311:
     //zz = MapleSquadType.tokyo_2095;
     break;
     case 802000411:
     // zz = MapleSquadType.dunas;
     break;
     case 802000611:
     //zz = MapleSquadType.nibergen_squad;
     break;
     case 802000711:
     //zz = MapleSquadType.dunas2;
     break;
     case 802000801:
     case 802000802:
     case 802000803:
     // zz = MapleSquadType.core_blaze;
     break;
     case 802000821:
     case 802000823:
     //   zz = MapleSquadType.aufheben;
     break;
     case 211070100:
     case 211070101:
     case 211070110:
     // zz = MapleSquadType.vonleon;
     break;
     case 551030200:
     //zz = MapleSquadType.scartar;
     break;
     case 271040100:
     // zz = MapleSquadType.cygnus;
     break;
     default:
     return null;
     }
     return Channel.getInstance(channelcpq).getMapleSquadcpq(zz);
     }

     public final MapleSquad getSquadBegin() {
     if (squad != null) {
     return Channel.getInstance(channel).getMapleSquad(squad);
     }
     return null;
     }
     */
    public int spawnMonsterWithCoords(MapleMonster mob, int x, int y) {
        Point spos = new Point(x, y - 1);
        spos = calcPointBelow(spos);
        spos.y -= 1;
        mob.setPosition(spos);
        spawnMonster(mob);
        return mob.getObjectId();
    }

    public boolean isCPQMap() {
        switch (this.getId()) {
            case 980000101:
            case 980000201:
            case 980000301:
            case 980000401:
            case 980000501:
            case 980000601:
                return true;
        }
        return false;
    }

    public boolean isCPQLobby() {
        switch (this.getId()) {
            case 980000100:
            case 980000200:
            case 980000300:
            case 980000400:
            case 980000500:
            case 980000600:
                return true;
        }
        return false;
    }

    public boolean isBlueCPQMap() {
        switch (this.getId()) {
            case 980000501:
            case 980000601:
                return true;
        }
        return false;
    }

    public boolean isPurpleCPQMap() {
        switch (this.getId()) {
            case 980000301:
            case 980000401:
                return true;
        }
        return false;
    }

    public void spawnCPQMonster(final MapleMonster monster, final int team) {
        monster.setMap(this);
        monster.setTeam(team);
        synchronized (this.mapobjects) {
            spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {

                public void sendPackets(MapleClient c) {
                    if (c.getPlayer().getParty() != null) {
                        if (monster.getTeam() == c.getPlayer().getTeam()) {
                            //c.getSession().write(MaplePacketCreator.spawnFakeMonster(monster, 0));
                            c.getSession().write(MaplePacketCreator.spawnMonster(monster, true));
                        } else {
                            c.getSession().write(MaplePacketCreator.spawnMonster(monster, true));
                        }
                    } else {
                        c.getSession().write(MaplePacketCreator.spawnMonster(monster, true));
                    }
                    if (monster.getRemoveAfter() > 0) { // 9300166
                        MapTimer.getInstance().schedule(new Runnable() {

                            @Override
                            public void run() {
                                killMonster(monster, (MapleCharacter) getAllPlayer().get(0), false, false, 3);
                            }
                        }, monster.getRemoveAfter());
                    }
                }
            }, null);
            updateMonsterController(monster);
            List<MonsterStatus> teamS = null;
            if (team == 0) {
                teamS = redTeamBuffs;
            } else if (team == 1) {
                teamS = blueTeamBuffs;
            }
            if (teamS != null) {
                for (MonsterStatus status : teamS) {
                    int skillID = getSkillId(status);
                    MobSkill skill = getMobSkill(skillID, this.getSkillLevel(status));
                    monster.applyMonsterBuff(status, skill.getX(), skill.getSkillId(), 60 * 1000 * 10, skill);
                }
            }
        }
        spawnedMonstersOnMap.incrementAndGet();
    }

    public void respawnCPQ() {
        if (this.isCPQMap() != true) {
            return;
        }
        if (characters.isEmpty()) {
            return;
        }
        int numShouldSpawn = (monsterSpawn.size() - spawnedMonstersOnMap.get()) * Math.round(monsterRate);
        if (numShouldSpawn > 0) {
            List<SpawnPoint> randomSpawn = new ArrayList<SpawnPoint>(monsterSpawn);
            Collections.shuffle(randomSpawn);
            int spawned = 0;
            for (SpawnPoint spawnPoint : randomSpawn) {
                if (spawnPoint.shouldSpawn()) {
                    spawnPoint.spawnMonster(MapleMap.this);
                    spawned++;
                }
                if (spawned >= numShouldSpawn) {
                    break;
                }
            }
        }
    }

    public boolean isCPQWinnerMap() {
        switch (this.getId()) {
            case 980000103:
            case 980000203:
            case 980000303:
            case 980000403:
            case 980000503:
            case 980000603:
                return true;
        }
        return false;
    }

    public boolean isCPQLoserMap() {
        switch (this.getId()) {
            case 980000104:
            case 980000204:
            case 980000304:
            case 980000404:
            case 980000504:
            case 980000604:
                return true;
        }
        return false;
    }

    public void removeCPQSpawns() {
        List<SpawnPoint> remove = new LinkedList<SpawnPoint>();
        for (SpawnPoint sp : this.monsterSpawn) {
            if (sp.isTemporary()) {
                remove.add(sp);
            }
        }
        for (SpawnPoint sp : remove) {
            this.monsterSpawn.remove(sp);
        }
        this.takenSpawns.clear();
        List<MapleMapObject> removeObjects = new LinkedList<MapleMapObject>();
        for (MapleMapObject o : this.mapobjects.values()) {
            if (o.getType() == MapleMapObjectType.REACTOR) {
                removeObjects.add(o);
            }
        }
        for (MapleMapObject o : removeObjects) {
            removeMapObject(o);
        }
    }

    public int countMonster(int minid, int maxid) {
        int count = 0;
        for (MapleMapObject m : getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER))) {
            MapleMonster mob = (MapleMonster) m;
            if (mob.getId() >= minid && mob.getId() <= maxid) {
                count++;
            }
        }
        return count;
    }

    public int countMonsters() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER)).size();
    }

    public int countReactors() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.REACTOR)).size();
    }

    public final List<MapleMapObject> getReactors() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.REACTOR));
    }

    public int countItems() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM)).size();
    }

    public final List<MapleMapObject> getItems() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM));
    }

    public int countPlayers() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.PLAYER)).size();
    }

    public List<MapleMapObject> getPlayers() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.PLAYER));
    }
}
