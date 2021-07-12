package client.autoban;

import client.MapleCharacter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import client.MapleClient;

/**
 *
 * @author Matze
 */
public class AutobanManipulator implements Runnable {

    private static class ExpirationEntry implements Comparable<AutobanManipulator.ExpirationEntry> {

        public long time;
        public int acc, pontos;

        public ExpirationEntry(long time, int acc, int points) {
            this.time = time;
            this.acc = acc;
            this.pontos = points;
        }

        public int compareTo(AutobanManipulator.ExpirationEntry o) {
            return (int) (time - o.time);
        }
    }
    private MapleCharacter chr;
    private Map<AutobanFactory, Integer> points = new HashMap<>();
    private Map<AutobanFactory, Long> lastTime = new HashMap<>();
    private int misses = 0;
    private int lastmisses = 0;
    private int samemisscount = 0;
    private long spam[] = new long[20];
    private int timestamp[] = new int[20];
    private byte timestampcounter[] = new byte[20];
    private Map<Integer, Integer> pontos = new HashMap<Integer, Integer>();
    private Map<Integer, List<String>> reasons = new HashMap<Integer, List<String>>();
    private Set<AutobanManipulator.ExpirationEntry> expirations = new TreeSet<AutobanManipulator.ExpirationEntry>();
    private static final int AUTOBAN_POINTS = 2147483647;
    private static AutobanManipulator instance = null;

    public static AutobanManipulator getInstance() {
        if (instance == null) {
            instance = new AutobanManipulator();
        }
        return instance;
    }

    //public AutobanManipulator(MapleCharacter chr) {
    //this.chr = chr;
    //}
    public void addPoint(AutobanFactory fac, String reason) {
        if (lastTime.containsKey(fac)) {
            if (lastTime.get(fac) < (System.currentTimeMillis() - fac.getExpire())) {
                points.put(fac, points.get(fac) / 2); //So the points are not completely gone.
            }
        }
        if (fac.getExpire() != -1) {
            lastTime.put(fac, System.currentTimeMillis());
        }

        if (points.containsKey(fac)) {
            points.put(fac, points.get(fac) + 1);
        } else {
            points.put(fac, 1);
        }

        if (points.get(fac) >= fac.getMaximum()) {
            chr.autoban("Banido automaticamente por " + fac.name() + " ;" + reason);
            chr.sendPolice("O nosso #bsistema anti-hack#k baniu-o pelo seguinte motivo: #eUso de HACK!#n");
        }
    }

    public void addMiss() {
        this.misses++;
    }

    public void resetMisses() {
        if (lastmisses == misses && misses > 6) {
            samemisscount++;
        }
        if (samemisscount > 4) {
            chr.autoban("Banido automaticamente por : " + misses + " Miss GodMode");
        } else if (samemisscount > 0) {
            this.lastmisses = misses;
        }
        this.misses = 0;
    }

    //Don't use the same type for more than 1 thing
    public void spam(int type) {
        this.spam[type] = System.currentTimeMillis();
    }

    public long getLastSpam(int type) {
        return spam[type];
    }

    /**
     * Timestamp checker
     *
     * <code>type</code>:<br>
     * 0: HealOverTime<br>
     * 1: Pet Food<br>
     * 2: ItemSort<br>
     * 3: ItemIdSort<br>
     * 4: SpecialMove<br>
     * 5: UseCatchItem<br>
     *
     * @param type type
     * @return Timestamp checker
     */
    public void setTimestamp(int type, int time) {
        if (this.timestamp[type] == time) {
            this.timestampcounter[type]++;
            if (this.timestampcounter[type] > 3) {
                chr.getClient().disconnect(false, false);
                //System.out.println("Same timestamp for type: " + type + "; Character: " + chr);
            }
            return;
        }
        this.timestamp[type] = time;
    }

    public void autoban(MapleClient c, String reason) {
        if (c.getPlayer().isGM()) {
            return;
        }
        addPoints(c, AUTOBAN_POINTS, 0, reason);
    }

    public synchronized void addPoints(MapleClient c, int points, long expiration, String reason) {
        if (c.getPlayer().isGM()) {
            return;
        }
        int acc = c.getPlayer().getAccountID();
        List<String> reasonList;
        if (this.pontos.containsKey(acc)) { //uncomment if you want to enable autoban
            //  if (this.points.get(acc) >= AUTOBAN_POINTS) {
            return;
            //  }
            //  this.points.put(acc, this.points.get(acc) + points);
            //  reasonList = this.reasons.get(acc);
            //  reasonList.add(reason);
        } else {
            this.pontos.put(acc, points);
            reasonList = new LinkedList<String>();
            reasonList.add(reason);
            this.reasons.put(acc, reasonList);
        }
//        if (this.points.get(acc) >= AUTOBAN_POINTS) {
//            String name = c.getPlayer().getName();
//            StringBuilder banReason = new StringBuilder("Autoban for Character ");
//            banReason.append(name);
//            banReason.append(" (IP ");
//            banReason.append(c.getSession().getRemoteAddress().toString());
//            banReason.append("): ");
//            for (String s : reasons.get(acc)) {
//                banReason.append(s);
//                banReason.append(", ");
//            }
//
//            if (!c.getPlayer().isGM()) {
//                c.getPlayer().ban(banReason.toString());
//                try {
//                    c.getChannelServer().getWorldInterface().broadcastMessage(null, MaplePacketCreator.serverNotice(0, "" + name + " has been banned by the system. (Last reason: " + reason + ")").getBytes());
//                } catch (RemoteException e) {
//                    c.getChannelServer().reconnectWorld();
//                }
//            }
//            return;
//        }
        if (expiration > 0) {
            expirations.add(new AutobanManipulator.ExpirationEntry(System.currentTimeMillis() + expiration, acc, points));
        }
    }

    public void run() {
        long now = System.currentTimeMillis();
        for (AutobanManipulator.ExpirationEntry e : expirations) {
            if (e.time <= now) {
                this.pontos.put(e.acc, this.pontos.get(e.acc) - e.pontos);
            } else {
                return;
            }
        }
    }
}
