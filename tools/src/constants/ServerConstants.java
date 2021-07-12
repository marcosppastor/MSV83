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
package constants;

import config.game.Messages;
import java.io.FileInputStream;
import java.util.Calendar;
import java.util.Properties;

public class ServerConstants {

    public static short VERSION = 83;
    public static String SERVER_NAME = "MapleStory v0." + Messages.V_ORIGENS + "";
    public static String[] WORLD_NAMES = {"Orion", "Bera", "Broa", "Windia", "Khaini", "Bellocan", "Mardia", "Kradia", "Yellonde", "Demethos", "Galicia", "El Nido", "Zenith", "Arcenia", "Kastia", "Judis", "Plana", "Kalluna", "Stius", "Croa", "Medere"};
    ;
    
    public static final boolean USE_DEBUG = false;            
    
    //Configuration login
    public static final boolean ALLOW_MASTER_PASSWORD = true;
    public static String MASTER_PASSWORD = "moratte";

    // Rate Configuration
    public static final byte QUEST_EXP_RATE = 4;
    public static final byte QUEST_MESO_RATE = 1;

    // Login Configuration
    public static final int CHANNEL_LOAD = 50;//Players per channel

    public static final long RESPAWN_INTERVAL = 8 * 1000;	//10 seconds, 10000.
    public static final long RANKING_INTERVAL = 60 * 60 * 1000;	//60 minutes, 3600000.
    
     //Miscellaneous Configuration
    public static final byte MIN_UNDERLEVEL_TO_EXP_GAIN = 20;        //Characters are unable to get EXP from a mob if their level are under this threshold, only if "USE_ENFORCE_MOB_LEVEL_RANGE" is enabled. For bosses, this attribute is doubled.
    public static final byte MAX_MONITORED_BUFFSTATS = 5;           //Limits accounting for "dormant" buff effects, that should take place when stronger stat buffs expires.
    public static final int MAX_AP = 32767;                             //Max AP allotted on the auto-assigner.
    public static final int MAX_EVENT_LEVELS = 8;                       //Event has different levels of rewarding system.
    public static final long BLOCK_NPC_RACE_CONDT = (long) (0.5 * 1000); //Time the player client must wait before reopening a conversation with an NPC.
    public static final long PET_LOOT_UPON_ATTACK = (long) (0.2 * 1000); //Time the pet must wait before trying to pick items up.


    //Event Configuration
    public static final boolean PERFECT_PITCH = false;

    public static final boolean USE_AUTOBAN = true;                //Commands the server to detect infractors automatically.
    public static final boolean USE_AUTOSAVE = true;                //Enables server autosaving feature (saves characters to DB each 1 hour).

    public static final int[] REMOVER_NPCS = new int[]{11000, 9000021, 9000036, 9209001, 9209000, 9209007, 9209008, 1022101, 9000017, 9201118, 2041017};
    public static final boolean BLOCK_GENERATE_CASH_ITEM = false;   //Prevents creation of cash items with the item/drop command.
    
    public static final int FAME_GAIN_BY_QUEST = 4;//fame gain each N quest completes, set 0 to disable.

    //Functions
    public static int PARTY_EXPERIENCE_MOD;

    public static final boolean USE_PERFECT_SCROLLING = false;   //scrolls doesn't use slots upon failure.
    public static final boolean USE_ENHANCED_CHSCROLL = false;   //equips even more powerful with chaos upgrade
    public static final boolean USE_ENHANCED_CRAFTING = false;   //applys chaos scroll on every equip crafted.
    public static final boolean USE_ULTRA_NIMBLE_FEET = true;   //still needs some client editing to work =/
    public static final boolean USE_MAXRANGE = true;                //Will send and receive packets from all events on a map, rather than those of only view range.
    public static final boolean USE_ULTRA_RECOVERY = true;      //huehue another client edit
    public static final boolean USE_ULTRA_THREE_SNAILS = true;
    public static final boolean USE_ADD_SLOTS_BY_LEVEL = true;  //slots are added each 20 levels.
    //public static final boolean USE_ADD_RATES_BY_LEVEL = false;  //rates are added each 20 levels.
    public static final boolean USE_ERASE_PET_ON_EXPIRATION = false;//Forces pets to be removed from inventory when expire time comes, rather than converting it to a doll.
    public static final int SCROLL_CHANCE_RATE = 0;//n

    public static boolean SHUTDOWNHOOK;

    public static final boolean GMS_LIKE = false;

    //Configuração IP
    public static String HOST = "";

    //Configuração DB
    public static String DB_URL = "";//"jdbc:mysql://localhost:3306/DB_DESEJADA?autoReconnect=true";
    public static String DB_USER = "";//root
    public static String DB_PASS = "";//senha
    public static String EVENTOS = "";//eventos

    static {
        Properties p = new Properties();
        try {
            p.load(new FileInputStream("login.ini"));
            //SERVER
            ServerConstants.HOST = p.getProperty("HOST");
            //SQL DATABASE
            ServerConstants.DB_URL = p.getProperty("URL");
            ServerConstants.DB_USER = p.getProperty("DB_USER");
            ServerConstants.DB_PASS = p.getProperty("DB_PASS");
            //EVENTOS
            ServerConstants.EVENTOS = p.getProperty("EVENTOS");
        } catch (Exception e) {
            System.out.println("Falha ao carregar o login.ini.");
            System.exit(0);
        }
    }
}
