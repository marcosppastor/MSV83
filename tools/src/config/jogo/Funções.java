/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package config.jogo;

/**
 * @author Marcos P TrueMS - 2016 truems.net.br/
 */
public class Fun��es {

    public static String TIMEZONE = "GMT-3";
    //MOBS QUE N�O RECEBEM DROP GLOBAL
    public static final Integer[] MOBS_REMOVED_FROM_GLOBAL_DROP = {3400004, 3400006};
    //Java8
    /**
     *
     */
    public static boolean JAVA_8 = false;
    //Maxchat
    public static int MENSAGEM_ILIMITADA = Byte.MAX_VALUE;
    //Ativar/Desativar PIC
    public static final boolean ATIVAR_PIC = true;             //Pick true/false to enable or disable Pic. Delete character needs this feature ENABLED.
    public static final boolean ATIVAR_PIN = false;  

    //Ativar/Desativar Duey
    public static final boolean USAR_DUEY = false;
    //Thread Tracker Configuration
    public static final boolean USE_THREAD_TRACKER = false;      //[SEVERE] This deadlock auditing thing will bloat the memory as fast as the time frame one takes to lose track of a raindrop on a tempesting day. Only for debugging purposes.
    //Dangling Items/Locks Configuration
    public static final int ITEM_EXPIRE_TIME  = 3 * 60 * 1000;  //Time before items start disappearing. Recommended to be set up to 3 minutes.
    public static final int ITEM_MONITOR_TIME = 5 * 60 * 1000;  //Interval between item monitoring tasks on maps, which checks for dangling (null) item objects on the map item history.
    public static final int LOCK_MONITOR_TIME = 30 * 1000;      //Waiting time for a lock to be released. If it reach timed out, a critical server deadlock has made present.
    public static final int ITEM_EXPIRE_CHECK = 10 * 1000;      //Interval between item expiring tasks on maps, which checks and makes disappear expired items.
    public static final int ITEM_LIMIT_ON_MAP = 200;            //Max number of items allowed on a map.
    public static final boolean USE_ENFORCE_UNMERCHABLE_PET = true; //Forces players to not sell pets via merchants. (since non-named pets gets dirty name and other possible DB-related issues)
    //Outras configurações/funções
    public static boolean GM_INVISIVEL_PARA_PLAYERS = true;
    public static final boolean RENASCER_FULL_HP = true; //Ao nascer, o jogador nascerá com HP cheio, e não com apenas 50.
    //Proteção DDOS - Thanks LeaderMS Rev. v2
    public static boolean PROTECAO_DDOS = false;
    public static String[] PROXY_IPS = {};
    //Habilidades bloqueadas
    public static final int[] skillsBloqueadas = {4341003, 2111011};
    //Outros
    public static int[] mapasBloqueados = {109050000, 280030000, 240060200, 280090000, 280030001, 240060201, 950101100, 950101010, 809000201};
}
