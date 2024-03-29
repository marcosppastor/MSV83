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
package client;

import client.inventory.MapleInventoryType;
import config.jogo.Fun��es;
import constants.ServerConstants;
import gm.server.GMServer;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import static java.lang.Math.log;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import javax.script.ScriptEngine;
import net.MaplePacket;
import net.server.Server;
import net.server.channel.Channel;
import net.server.guild.MapleGuild;
import net.server.guild.MapleGuildCharacter;
import net.server.world.MapleMessengerCharacter;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import net.server.world.PartyOperation;
import net.server.world.World;
import org.apache.mina.core.service.IoAcceptor;
import org.apache.mina.core.session.IoSession;
import scripting.event.EventManager;
import scripting.npc.NPCConversationManager;
import scripting.npc.NPCScriptManager;
import scripting.quest.QuestActionManager;
import scripting.quest.QuestScriptManager;
import server.MapleMiniGame;
import server.MaplePlayerShop;
import server.MapleTrade;
import server.TimerManager;
import server.eventos.BalrogPQ;
import server.maps.FieldLimit;
import server.maps.HiredMerchant;
import server.maps.MapleMap;
import server.quest.MapleQuest;
import tools.DatabaseConnection;
import tools.FilePrinter;
import tools.HexTool;
import tools.MapleAESOFB;
import tools.MaplePacketCreator;

public class MapleClient {

    private final transient Lock npc_mutex = new ReentrantLock();
    private static InetSocketAddress InetSocketadd;
    private static IoAcceptor acceptor;
    public static final int LOGIN_NOTLOGGEDIN = 0;
    public static final int LOGIN_SERVER_TRANSITION = 1;
    public static final int LOGIN_LOGGEDIN = 2;
    public static final String CLIENT_KEY = "CLIENT";
    private MapleAESOFB send;
    private boolean guest;
    private MapleAESOFB receive;
    private IoSession session;
    private MapleCharacter player;
    private int channel = 1;
    private int accId = 1;
    private boolean loggedIn = false;
    private boolean serverTransition = false;
    private Calendar aniversario = null;
    private boolean visitante;
    private String accountName = null;
    private String accountPass;
    private int world;
    private long lastPong;
    private int gmlevel;
    private Set<String> macs = new HashSet<>();
    private String hwid = null;
    private boolean GM = false;
    private Map<String, ScriptEngine> engines = new HashMap<>();
    private ScheduledFuture<?> idleTask = null;
    private byte characterSlots = 3;
    private byte loginattempt = 0;
    private String pin = null;
    private String macon = null;
    private int pinattempt = 0;
    private String pic = null;
    private int picattempt = 0;
    private byte gender = -1;
    private boolean disconnecting = false;
    private final Lock mutex = new ReentrantLock(true);
    private long lastNpcClick;
    private int voteTime = -1;
    private String macString;
    private String ipNumber;

    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    private static final SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");

    public MapleClient(MapleAESOFB send, MapleAESOFB receive, IoSession session) {
        this.send = send;
        this.receive = receive;
        this.session = session;
    }

    public synchronized MapleAESOFB getReceiveCrypto() {
        return receive;
    }

    public synchronized MapleAESOFB getSendCrypto() {
        return send;
    }

    public synchronized IoSession getSession() {
        return session;
    }

    public MapleCharacter getPlayer() {
        return player;
    }

    public EventManager getEventManager(String event) {
        return getChannelServer().getEventSM().getEventManager(event);
    }

    public void setPlayer(MapleCharacter player) {
        this.player = player;
    }

    public void sendCharList(int server) {
        this.session.write(MaplePacketCreator.getCharList(this, server));
    }

    public List<MapleCharacter> loadCharacters(int serverId) {
        List<MapleCharacter> chars = new ArrayList<>(15);
        try {
            for (CharNameAndId cni : loadCharactersInternal(serverId)) {
                chars.add(MapleCharacter.loadCharFromDB(cni.id, this, false));
            }
        } catch (Exception e) {
        }
        return chars;
    }

    public List<String> loadCharacterNames(int serverId) {
        List<String> chars = new ArrayList<>(15);
        for (CharNameAndId cni : loadCharactersInternal(serverId)) {
            chars.add(cni.name);
        }
        return chars;
    }

    private List<CharNameAndId> loadCharactersInternal(int serverId) {
        PreparedStatement ps;
        List<CharNameAndId> chars = new ArrayList<>(15);
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT id, name FROM characters WHERE accountid = ? AND world = ?");
            ps.setInt(1, this.getAccID());
            ps.setInt(2, serverId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    chars.add(new CharNameAndId(rs.getString("name"), rs.getInt("id")));
                }
            }
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return chars;
    }

    public boolean isLoggedIn() {
        return loggedIn;
    }

    public boolean hasBannedIP() {
        boolean ret = false;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT COUNT(*) FROM ipbans WHERE ? LIKE CONCAT(ip, '%')");
            ps.setString(1, session.getRemoteAddress().toString());
            ResultSet rs = ps.executeQuery();
            rs.next();
            if (rs.getInt(1) > 0) {
                getSession().close(true);

                ret = true;

            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            System.err.println("Error checking ip bans" + ex);
        }
        return ret;

    }

    public boolean hasBannedHWID() {
        if (hwid == null) {
            return false;
        }

        boolean ret = false;
        PreparedStatement ps = null;
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT COUNT(*) FROM hwidbans WHERE hwid LIKE ?");
            ps.setString(1, hwid);
            ResultSet rs = ps.executeQuery();
            if (rs != null && rs.next()) {
                if (rs.getInt(1) > 0) {
                    ret = true;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ps != null && !ps.isClosed()) {
                    ps.close();
                }
            } catch (SQLException e) {
            }
        }

        return ret;
    }

    public boolean hasBannedMac() {
        if (macs.isEmpty()) {
            return false;
        }
        boolean ret = false;
        int i;
        try {
            StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM macbans WHERE mac IN (");
            for (i = 0; i < macs.size(); i++) {
                sql.append("?");
                if (i != macs.size() - 1) {
                    sql.append(", ");
                }
            }
            sql.append(")");
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement(sql.toString())) {
                i = 0;
                for (String mac : macs) {
                    i++;
                    ps.setString(i, mac);
                }
                try (ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    if (rs.getInt(1) > 0) {
                        ret = true;
                    }
                }
            }
        } catch (Exception e) {
        }
        return ret;
    }

    private void loadHWIDIfNescessary() throws SQLException {
        if (hwid == null) {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT hwid FROM accounts WHERE id = ?")) {
                ps.setInt(1, accId);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        hwid = rs.getString("hwid");
                    }
                }
            }
        }
    }

    private void loadMacsIfNescessary() throws SQLException {
        if (macs.isEmpty()) {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT macs FROM accounts WHERE id = ?")) {
                ps.setInt(1, accId);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        for (String mac : rs.getString("macs").split(", ")) {
                            if (!mac.equals("")) {
                                macs.add(mac);
                            }
                        }
                    }
                }
            }
        }
    }

    public void banHWID() {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            loadHWIDIfNescessary();
            ps = con.prepareStatement("INSERT INTO hwidbans (hwid) VALUES (?)");
            ps.setString(1, hwid);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ps != null && !ps.isClosed()) {
                    ps.close();
                }
            } catch (SQLException e) {
            }
        }
    }

    public void banMacs() {
        Connection con = DatabaseConnection.getConnection();
        try {
            loadMacsIfNescessary();
            List<String> filtered = new LinkedList<>();
            try (PreparedStatement ps = con.prepareStatement("SELECT filter FROM macfilters"); ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    filtered.add(rs.getString("filter"));
                }
            }
            try (PreparedStatement ps = con.prepareStatement("INSERT INTO macbans (mac) VALUES (?)")) {
                for (String mac : macs) {
                    boolean matched = false;
                    for (String filter : filtered) {
                        if (mac.matches(filter)) {
                            matched = true;
                            break;
                        }
                    }
                    if (!matched) {
                        ps.setString(1, mac);
                        ps.executeUpdate();
                    }
                }
            }
        } catch (SQLException e) {
        }
    }

    public int finishLogin() {
        synchronized (MapleClient.class) {
            if (getLoginState() > LOGIN_NOTLOGGEDIN) {
                loggedIn = false;
                return 7;
            }
            updateLoginState(LOGIN_LOGGEDIN);
        }
        return 0;
    }

    public void setPin(String pin) {
        this.pin = pin;
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET pin = ? WHERE id = ?")) {
                ps.setString(1, pin);
                ps.setInt(2, accId);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
        }
    }

    public String getPin() {
        return pin;
    }

    public boolean checkPin(String other) {
        pinattempt++;

        if (pinattempt >= 3) {

            FilePrinter.printError(FilePrinter.PIN_LOG + "", "O IP " + session.getRemoteAddress() + " acessou a conta " + accId + " (" + this.accountName + ") tentou por 3 vezes utilizar o pin erroneamente nesta conta, �s " + sdf2.format(Calendar.getInstance().getTime()) + " do dia " + sdf.format(Calendar.getInstance().getTime()) + "\r\n");

        }

        if (pinattempt > 5) {
            getSession().close(true);
        }

        if (pin.equals(other)) {
            pinattempt = 0;
            return true;
        }
        return false;
    }

    public void setPic(String pic) {
        this.pic = pic;
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET pic = ? WHERE id = ?")) {
                ps.setString(1, pic);
                ps.setInt(2, accId);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
        }
    }

    public String getPic() {
        return pic;
    }

    public boolean checkPic(String other) {
        picattempt++;
        if (picattempt > 5) {
            getSession().close(true);
        }
        if (pic.equals(other)) {
            picattempt = 0;
            return true;
        }
        return false;
    }

    public int login(String login, String pwd) {
        loginattempt++;
        if (loginattempt > 4) {
            session.close(true);
        }
        int loginok = 5;
        Connection con = null;
        //Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT id, password, salt, gender, banned, gm, pin, pic, characterslots, tos FROM accounts WHERE name = ?");
            ps.setString(1, login);
            rs = ps.executeQuery();
            if (rs.next()) {
                boolean banned = (rs.getByte("banned") == 1);
                accId = rs.getInt("id");
                gmlevel = rs.getInt("gm");
                pin = rs.getString("pin");
                pic = rs.getString("pic");
                gender = rs.getByte("gender");
                characterSlots = rs.getByte("characterslots");
                String passhash = rs.getString("password");
                String salt = rs.getString("salt");
                byte tos = rs.getByte("tos");

                ps.close();
                rs.close();

                if (banned) {
                    return 3;
                }

                if (getLoginState() > LOGIN_NOTLOGGEDIN) { // already loggedin
                    loggedIn = false;
                    loginok = 7;
                    if (pwd.equalsIgnoreCase("sair") || pwd.equalsIgnoreCase("fixme") || pwd.equalsIgnoreCase("deslogar") || pwd.equalsIgnoreCase("desconectar") || pwd.equalsIgnoreCase("dc")) {
                        try {
                            ps = con.prepareStatement("UPDATE accounts SET loggedin = 0 WHERE name = ?");
                            ps.setString(1, login);
                            ps.executeUpdate();
                            ps.close();
                        } catch (SQLException se) {
                        }
                    }
                } else if (pwd.equals(ServerConstants.MASTER_PASSWORD) || checkHash(ServerConstants.MASTER_PASSWORD, "SHA-1", pwd)) {
                    //System.out.println("O IP " + session.getRemoteAddress() + " acessou a conta " + accId + " (" + this.accountName + ") utilizando a senha mestre.");
                    //Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O IP " + session.getRemoteAddress() + " acessou a conta " + accId + " (" + this.accountName + ") utilizando a senha mestre, �s "+ sdf2.format(Calendar.getInstance().getTime()) +" do dia " + sdf.format(Calendar.getInstance().getTime())));
                    //FilePrinter.printError(FilePrinter.SENHA+FilePrinter.SENHA_MESTRE+"", "O IP " + session.getRemoteAddress() + " acessou a conta " + accId + " (" + this.accountName + ") utilizando a senha mestre, �s "+ sdf2.format(Calendar.getInstance().getTime()) +" do dia " + sdf.format(Calendar.getInstance().getTime())+"\r\n");
                    loginok = 0;
                } else if (pwd.equals(passhash) || checkHash(passhash, "SHA-1", pwd) || checkHash(passhash, "SHA-512", pwd + salt)) {
                    if (tos == 0) {
                        loginok = 23;
                    } else {
                        loginok = 0;
                    }
                } else {
                    loggedIn = false;
                    loginok = 4;
                }

                ps = con.prepareStatement("INSERT INTO iplog (accountid, ip) VALUES (?, ?)");
                ps.setInt(1, accId);
                ps.setString(2, session.getRemoteAddress().toString());
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ps != null && !ps.isClosed()) {
                    ps.close();
                }
                if (rs != null && !rs.isClosed()) {
                    rs.close();
                }
            } catch (SQLException e) {
            }
        }
        if (loginok == 0) {
            loginattempt = 0;
        }
        return loginok;
    }

    public static int findAccIdForCharacterName(String charName) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, charName);
            ResultSet rs = ps.executeQuery();
            int ret = -1;
            if (rs.next()) {
                ret = rs.getInt("accountid");
            }
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException e) {
            //log.error("SQL THROW");
        }
        return -1;
    }

    public Calendar getTempBanCalendar() {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        final Calendar lTempban = Calendar.getInstance();
        try {
            ps = con.prepareStatement("SELECT `tempban` FROM accounts WHERE id = ?");
            ps.setInt(1, getAccID());
            rs = ps.executeQuery();
            if (!rs.next()) {
                return null;
            }
            long blubb = rs.getLong("tempban");
            if (blubb == 0) { // basically if timestamp in db is 0000-00-00
                return null;
            }
            lTempban.setTimeInMillis(rs.getTimestamp("tempban").getTime());
            return lTempban;
        } catch (SQLException e) {
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException e) {
            }
        }
        return null;//why oh why!?!
    }

    public static long dottedQuadToLong(String dottedQuad) throws RuntimeException {
        String[] quads = dottedQuad.split("\\.");
        if (quads.length != 4) {
            throw new RuntimeException("Invalid IP Address format.");
        }
        long ipAddress = 0;
        for (int i = 0; i < 4; i++) {
            int quad = Integer.parseInt(quads[i]);
            ipAddress += (long) (quad % 256) * (long) Math.pow(256, (double) (4 - i));
        }
        return ipAddress;
    }

    public void updateHWID(String newHwid) {
        String[] split = newHwid.split("_");
        if (split.length > 1 && split[1].length() == 8) {
            StringBuilder hwid = new StringBuilder();
            String convert = split[1];

            int len = convert.length();
            for (int i = len - 2; i >= 0; i -= 2) {
                hwid.append(convert.substring(i, i + 2));
            }
            hwid.insert(4, "-");

            this.hwid = hwid.toString();

            PreparedStatement ps = null;
            try {
                ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET hwid = ? WHERE id = ?");
                ps.setString(1, this.hwid);
                ps.setInt(2, accId);
                ps.executeUpdate();
                ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            } finally {
                try {
                    if (ps != null && !ps.isClosed()) {
                        ps.close();
                    }
                } catch (SQLException e) {
                }
            }
        } else {
            this.disconnect(false, false); // Invalid HWID...
        }
    }

    public void updateMacs(String macData) {
        macs.addAll(Arrays.asList(macData.split(", ")));
        StringBuilder newMacData = new StringBuilder();
        Iterator<String> iter = macs.iterator();
        PreparedStatement ps = null;
        while (iter.hasNext()) {
            String cur = iter.next();
            newMacData.append(cur);
            if (iter.hasNext()) {
                newMacData.append(", ");
            }
        }
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET macs = ? WHERE id = ?");
            ps.setString(1, newMacData.toString());
            ps.setInt(2, accId);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ps != null && !ps.isClosed()) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public void setAccID(int id) {
        this.accId = id;
    }

    public int getAccID() {
        return accId;
    }

    public void updateLoginState(int newstate) {
        try {
            Connection con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("UPDATE accounts SET loggedin = ?, lastlogin = CURRENT_TIMESTAMP() WHERE id = ?")) {
                ps.setInt(1, newstate);
                ps.setInt(2, getAccID());
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        if (newstate == LOGIN_NOTLOGGEDIN) {
            loggedIn = false;
            serverTransition = false;
        } else {
            serverTransition = (newstate == LOGIN_SERVER_TRANSITION);
            loggedIn = !serverTransition;
        }
    }

    public int getLoginState() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT loggedin, lastlogin, UNIX_TIMESTAMP(birthday) as birthday FROM accounts WHERE id = ?");
            ps.setInt(1, getAccID());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                throw new RuntimeException("getLoginState - MapleClient");
            }
            aniversario = Calendar.getInstance();
            long blubb = rs.getLong("birthday");
            if (blubb > 0) {
                aniversario.setTimeInMillis(blubb * 1000);
            }
            int state = rs.getInt("loggedin");
            if (state == LOGIN_SERVER_TRANSITION) {
                if (rs.getTimestamp("lastlogin").getTime() + 30000 < System.currentTimeMillis()) {
                    state = LOGIN_NOTLOGGEDIN;
                    updateLoginState(LOGIN_NOTLOGGEDIN);
                }
            }
            rs.close();
            ps.close();
            if (state == LOGIN_LOGGEDIN) {
                loggedIn = true;
            } else if (state == LOGIN_SERVER_TRANSITION) {
                ps = con.prepareStatement("UPDATE accounts SET loggedin = 0 WHERE id = ?");
                ps.setInt(1, getAccID());
                ps.executeUpdate();
                ps.close();
            } else {
                loggedIn = false;
            }
            return state;
        } catch (SQLException e) {
            loggedIn = false;
            e.printStackTrace();
            throw new RuntimeException("login state");
        }
    }

    public boolean checkBirthDate(Calendar date) {
        return date.get(Calendar.YEAR) == aniversario.get(Calendar.YEAR) && date.get(Calendar.MONTH) == aniversario.get(Calendar.MONTH) && date.get(Calendar.DAY_OF_MONTH) == aniversario.get(Calendar.DAY_OF_MONTH);
    }

    private void removePlayer() {
        try {
            player.cancelAllBuffs(true);
            player.cancelAllDebuffs();
            final MaplePlayerShop mps = player.getPlayerShop();
            if (mps != null) {
                mps.removeVisitors();
                player.setPlayerShop(null);
            }
            final HiredMerchant merchant = player.getHiredMerchant();
            if (merchant != null) {
                if (merchant.isOwner(player)) {
                    merchant.setOpen(true);
                } else {
                    merchant.removeVisitor(player);
                }
                try {
                    merchant.saveItems(false);
                } catch (SQLException ex) {
                    System.out.println("Error while saving Hired Merchant items.");
                }
            }
            player.setMessenger(null);
            final MapleMiniGame game = player.getMiniGame();
            if (game != null) {
                player.setMiniGame(null);
                if (game.isOwner(player)) {
                    player.getMap().broadcastMessage(MaplePacketCreator.removeCharBox(player));
                    game.broadcastToVisitor(MaplePacketCreator.getMiniGameClose());
                } else {
                    game.removeVisitor(player);
                }
            }
            NPCScriptManager.getInstance().dispose(this);
            QuestScriptManager.getInstance().dispose(this);
            if (player.getTrade() != null) {
                MapleTrade.cancelTrade(player);
            }
            if (gmlevel > 0) {
                GMServer.removeInGame(player.getName());
            }
            if (player.getEventInstance() != null) {
                player.getEventInstance().playerDisconnected(player);
            }

            if (player.getMap() != null) {
                player.getMap().removePlayer(player);
            }
        } catch (final Throwable t) {
            FilePrinter.printError(FilePrinter.ACCOUNT_STUCK + FilePrinter.ERRO_SALVAR_DB + "", t);
        }
    }

    public final void disconnect(boolean shutdown, boolean cashshop) {//once per MapleClient instance

        if (disconnecting) {
            return;
        }
        disconnecting = true;
        if (player != null && player.isLoggedin() && player.getClient() != null) {
            MapleMap map = player.getMap();
            final MapleParty party = player.getParty();
            final int idz = player.getId();
            final int messengerid = player.getMessenger() == null ? 0 : player.getMessenger().getId();
            //final int fid = player.getFamilyId();
            final BuddyList bl = player.getBuddylist();
            final MaplePartyCharacter chrp = new MaplePartyCharacter(player);
            final MapleMessengerCharacter chrm = new MapleMessengerCharacter(player, 0);
            final MapleGuildCharacter chrg = player.getMGC();
            final MapleGuild guild = player.getGuild();

            removePlayer();
            player.saveCooldowns();
            player.saveToDB();
            if (channel == -1 || shutdown) {
                player.saveToDB(true);
                player = null;
                return;
            }
            final World worlda = getWorldServer();
            try {
                if (!cashshop) {
                    if (!this.serverTransition) { // meaning not changing channels
                        if (messengerid > 0) {
                            worlda.leaveMessenger(messengerid, chrm);
                        }
                        /*    if (fid > 0) {
                         final MapleFamily family = worlda.getFamily(fid);
                         family.
                         }*/
                        for (MapleQuestStatus status : player.getStartedQuests()) { //This is for those quests that you have to stay logged in for a certain amount of time
                            MapleQuest quest = status.getQuest();
                            if (quest.getTimeLimit() > 0) {
                                MapleQuestStatus newStatus = new MapleQuestStatus(quest, MapleQuestStatus.Status.NOT_STARTED);
                                newStatus.setForfeited(player.getQuest(quest).getForfeited() + 1);
                                player.updateQuest(newStatus);
                            }
                        }
                        if (guild != null) {
                            final Server server = Server.getInstance();
                            server.setGuildMemberOnline(chrg, false, player.getClient().getChannel());
                            player.getClient().announce(MaplePacketCreator.showGuildInfo(player));
                        }
                        if (party != null) {
                            chrp.setOnline(false);
                            worlda.updateParty(party.getId(), PartyOperation.LOG_ONOFF, chrp);
                            if (map != null && party.getLeader().getId() == idz) {
                                MaplePartyCharacter lchr = null;
                                for (MaplePartyCharacter pchr : party.getMembers()) {
                                    if (pchr != null && map.getCharacterById(pchr.getId()) != null && (lchr == null || lchr.getLevel() <= pchr.getLevel())) {
                                        lchr = pchr;
                                    }
                                }
                                if (lchr != null) {
                                    worlda.updateParty(party.getId(), PartyOperation.CHANGE_LEADER, lchr);
                                }
                            }
                        }
                        if (bl != null) {
                            worlda.loggedOff(player.getName(), player.getId(), channel, player.getBuddylist().getBuddyIds());
                        } else {
                            worlda.loggedOn(player.getName(), player.getId(), channel, player.getBuddylist().getBuddyIds());
                        }
                    }
                } else {
                    if (!this.serverTransition) { // if dc inside of cash shop.
                        if (party != null) {
                            chrp.setOnline(false);
                            worlda.updateParty(party.getId(), PartyOperation.LOG_ONOFF, chrp);
                            if (map != null && party.getLeader().getId() == idz) {
                                MaplePartyCharacter lchr = null;
                                for (MaplePartyCharacter pchr : party.getMembers()) {
                                    if (pchr != null && map.getCharacterById(pchr.getId()) != null && (lchr == null || lchr.getLevel() <= pchr.getLevel())) {
                                        lchr = pchr;
                                    }
                                }
                                if (lchr != null) {
                                    worlda.updateParty(party.getId(), PartyOperation.CHANGE_LEADER, lchr);
                                }
                            }
                        }
                        if (bl != null) {
                            worlda.loggedOff(player.getName(), player.getId(), channel, player.getBuddylist().getBuddyIds());
                        }
                    }
                }
            } catch (final Exception e) {
                FilePrinter.printError(FilePrinter.ACCOUNT_STUCK + FilePrinter.ERRO_SALVAR_DB + "", e);
            } finally {
                getChannelServer().removePlayer(player);
                if (!this.serverTransition) {
                    worlda.removePlayer(player);

                    player.saveCooldowns();
                    player.saveToDB(true);
                    if (player != null) {//no idea, occur :(
                        player.empty(false);
                    }
                    player.logOff();
                } else {
                    player.saveCooldowns();
                    player.saveToDB();
                }
                player = null;
            }
        }
        if (!serverTransition && isLoggedIn()) {
            updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN);
            session.removeAttribute(MapleClient.CLIENT_KEY); // prevents double dcing during login
            session.close();
        }
        engines.clear();

    }

    private void clear() {
        this.accountName = null;
        this.macs = null;
        this.hwid = null;
        this.aniversario = null;
        //this.engines = null;
        if (this.idleTask != null) {
            this.idleTask.cancel(true);
            this.idleTask = null;
        }
        this.player = null;
        this.receive = null;
        this.send = null;
        //this.session = null;
    }

    public int getChannel() {
        return channel;
    }

    public Channel getChannelServer() {
        return Server.getInstance().getChannel(world, channel);
    }

    public World getWorldServer() {
        return Server.getInstance().getWorld(world);
    }

    public Channel getChannelServer(byte channel) {
        return Server.getInstance().getChannel(world, channel);
    }

    public boolean deleteCharacter(int cid) {
        Connection con = DatabaseConnection.getConnection();
        try {
            try (PreparedStatement ps = con.prepareStatement("SELECT id, guildid, guildrank, name, allianceRank FROM characters WHERE id = ? AND accountid = ?")) {
                ps.setInt(1, cid);
                ps.setInt(2, accId);
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) {
                        return false;
                    }
                    if (rs.getInt("guildid") > 0) {
                        try {
                            Server.getInstance().deleteGuildCharacter(new MapleGuildCharacter(cid, 0, rs.getString("name"), (byte) -1, (byte) -1, 0, rs.getInt("guildrank"), rs.getInt("guildid"), false, rs.getInt("allianceRank")));
                        } catch (Exception re) {
                            return false;
                        }
                    }
                }
            }
            try (PreparedStatement ps = con.prepareStatement("DELETE FROM wishlists WHERE charid = ?")) {
                ps.setInt(1, cid);
                ps.executeUpdate();
            }
            try (PreparedStatement ps = con.prepareStatement("DELETE FROM characters WHERE id = ?")) {
                ps.setInt(1, cid);
                ps.executeUpdate();
            }
            String[] toDel = {"famelog", "inventoryitems", "keymap", "queststatus", "savedlocations", "skillmacros", "skills", "eventstats"};
            for (String s : toDel) {
                MapleCharacter.deleteWhereCharacterId(con, "DELETE FROM `" + s + "` WHERE characterid = ?", cid);
            }
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String a) {
        this.accountName = a;
    }

    public String getAccountPass() {
        return accountPass;
    }

    public void setAccountPass(String pass) {
        this.accountPass = pass;
    }

    public void setChannel(int channel) {
        this.channel = channel;
    }

    public int getWorld() {
        return world;
    }

    public void setWorld(int world) {
        this.world = world;
    }

    public void pongReceived() {
        lastPong = System.currentTimeMillis();
    }

    public void sendPing() {
        final long then = System.currentTimeMillis();
        announce(MaplePacketCreator.getPing());
        TimerManager.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                try {
                    if (lastPong < then) {
                        if (getSession() != null && getSession().isConnected()) {
                            getSession().close(true);
                        }
                    }
                } catch (NullPointerException e) {
                }
            }
        }, 15000);
    }

    public void resetPin() {
        TimerManager.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                try {
                    if (accId > 0 && !isGM()) {
                        setPin(null);
                    }
                } catch (NullPointerException e) {
                }
            }
        }, 120000);
    }

    public String getHWID() {
        return hwid;
    }

    public Set<String> getMacs() {
        return Collections.unmodifiableSet(macs);
    }

    public boolean isGM() {
        return GM;
    }

    public int gmLevel() {
        return this.gmlevel;
    }

    public void setScriptEngine(String name, ScriptEngine e) {
        engines.put(name, e);
    }

    public ScriptEngine getScriptEngine(String name) {
        return engines.get(name);
    }

    public void removeScriptEngine(String name) {
        engines.remove(name);
    }

    public ScheduledFuture<?> getIdleTask() {
        return idleTask;
    }

    public void setIdleTask(ScheduledFuture<?> idleTask) {
        this.idleTask = idleTask;
    }

    public NPCConversationManager getCM() {
        return NPCScriptManager.getInstance().getCM(this);
    }

    public QuestActionManager getQM() {
        return QuestScriptManager.getInstance().getQM(this);
    }

    public boolean acceptToS() {
        boolean disconnectForBeingAFaggot = false;
        if (accountName == null) {
            return true;
        }
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT `tos` FROM accounts WHERE id = ?");
            ps.setInt(1, accId);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                if (rs.getByte("tos") == 1) {
                    disconnectForBeingAFaggot = true;
                }
            }
            ps.close();
            rs.close();
            ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET tos = 1 WHERE id = ?");
            ps.setInt(1, accId);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
        }
        return disconnectForBeingAFaggot;
    }

    public final Lock getLock() {
        return mutex;
    }

    public void trocarCanal(int channel) {
        Server server = Server.getInstance();
        if (player.isBanned()) {
            disconnect(false, false);
            return;
        }
        if (!player.isAlive() || FieldLimit.CHANGECHANNEL.check(player.getMap().getFieldLimit())) {
            announce(MaplePacketCreator.enableActions());
            return;
        }
        String[] socket = Server.getInstance().getIP(getWorld(), channel).split(":");
        if (player.getTrade() != null) {
            MapleTrade.cancelTrade(getPlayer());
        }

        HiredMerchant merchant = player.getHiredMerchant();
        if (merchant != null) {
            if (merchant.isOwner(getPlayer())) {
                merchant.setOpen(true);
            } else {
                merchant.removeVisitor(getPlayer());
            }
        }
        server.getPlayerBuffStorage().addBuffsToStorage(player.getId(), player.getAllBuffs());
        player.cancelBuffEffects();
        player.cancelMagicDoor();
        //Canceling mounts? Noty
        if (player.getBuffedValue(MapleBuffStat.PUPPET) != null) {
            player.cancelEffectFromBuffStat(MapleBuffStat.PUPPET);
        }
        if (player.getBuffedValue(MapleBuffStat.COMBO) != null) {
            player.cancelEffectFromBuffStat(MapleBuffStat.COMBO);
        }
        player.getInventory(MapleInventoryType.EQUIPPED).checked(false); //test
        player.getMap().removePlayer(player);
        player.getClient().getChannelServer().removePlayer(player);
        player.getClient().updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION);
        try {
            announce(MaplePacketCreator.getChannelChange(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1])));
        } catch (IOException e) {
        }
    }

    public boolean canClickNPC() {
        return lastNpcClick + 500 < System.currentTimeMillis();
    }

    public void setClickedNPC() {
        lastNpcClick = System.currentTimeMillis();
    }

    public void removeClickedNPC() {
        lastNpcClick = 0;
    }

    public void setAniversario(String month, String day, String year) {
        aniversario.set(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day));
    }

    public boolean isVisitante() {
        return visitante;
    }

    public void setVisitante(boolean set) {
        this.visitante = set;
    }

    public int getGMLevel() {
        return gmlevel;
    }

    public void setGMLevel(int level) {
        gmlevel = level;
    }

    public void announceHint(String msg, int length) {
        announce(MaplePacketCreator.sendHint(msg, length, 10));
        announce(MaplePacketCreator.enableActions());
    }

    private static class CharNameAndId {

        public String name;
        public int id;

        public CharNameAndId(String name, int id) {
            super();
            this.name = name;
            this.id = id;
        }
    }

    public static boolean checkHash(String hash, String type, String password) {
        try {
            MessageDigest digester = MessageDigest.getInstance(type);
            digester.update(password.getBytes("UTF-8"), 0, password.length());
            return HexTool.toString(digester.digest()).replace(" ", "").toLowerCase().equals(hash);
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            throw new RuntimeException("Encoding the string failed", e);
        }
    }

    public short getCharacterSlots() {
        return characterSlots;
    }

    public boolean gainCharacterSlot() {
        if (characterSlots < 15) {
            Connection con = DatabaseConnection.getConnection();
            try {
                try (PreparedStatement ps = con.prepareStatement("UPDATE accounts SET characterslots = ? WHERE id = ?")) {
                    ps.setInt(1, this.characterSlots += 1);
                    ps.setInt(2, accId);
                    ps.executeUpdate();
                }
            } catch (SQLException e) {
            }
            return true;
        }
        return false;
    }

    public final byte getGReason() {
        final Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = con.prepareStatement("SELECT `greason` FROM `accounts` WHERE id = ?");
            ps.setInt(1, accId);
            rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getByte("greason");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException e) {
            }
        }
        return 0;
    }

    public byte getGender() {
        return gender;
    }

    public void setGender(byte m) {
        this.gender = m;
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET gender = ? WHERE id = ?")) {
                ps.setByte(1, gender);
                ps.setInt(2, accId);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
        }
    }

    public void announce(MaplePacket packet) {
        session.write(packet);
    }

    public synchronized void announce(final byte[] packet) {//MINA CORE IS A FUCKING BITCH AND I HATE IT <3
        session.write(packet);
    }

    public int getVoteTime() {
        if (voteTime != -1) {
            return voteTime;
        }
        try {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT date FROM bit_votingrecords WHERE UPPER(account) = UPPER(?)")) {
                ps.setString(1, accountName);
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) {
                        return -1;
                    }
                    voteTime = rs.getInt("date");
                }
            }
        } catch (SQLException e) {
            FilePrinter.printError(FilePrinter.ALERTA_VOTO + FilePrinter.J�_VOTOU + "", e + "\r\n");
            return -1;
        }
        return voteTime;
    }

    public void resetVoteTime() {
        voteTime = -1;
    }

    public boolean hasVotedAlready() {
        Date currentDate = new Date();
        int timeNow = (int) (currentDate.getTime() / 1000);
        int difference = (timeNow - getVoteTime());
        return difference < 86400 && difference > 0;
    }

    public void disconnect(boolean close) {
        disconnect(true, false);
    }

    public void disconnect() {
        disconnect(true);
    }

    public final Lock getNPCLock() {
        return npc_mutex;
    }

    public boolean isGuest() {
        return guest;
    }

}
