package constants;

import client.*;
import client.inventory.Equip;
import client.inventory.MapleInventoryType;
import client.inventory.MapleWeaponType;
import client.status.MonsterStatus;
import constants.skills.Aran;
import java.awt.Point;
import java.util.*;
import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import tools.FileoutputUtil;
import tools.Pair;

/**
 *
 * @author kevintjuh93
 */
public class GameConstants {

    public static boolean GMS = true; //true = GMS

    public static int getHiddenSkill(final int skill) {
        switch (skill) {
            case Aran.HIDDEN_FULL_DOUBLE:
            case Aran.HIDDEN_FULL_TRIPLE:
                return Aran.FULL_SWING;
            case Aran.HIDDEN_OVER_DOUBLE:
            case Aran.HIDDEN_OVER_TRIPLE:
                return Aran.OVER_SWING;
        }
        return skill;
    }

    public static int getSkillBook(final int job) {
        if (job >= 2210 && job <= 2218) {
            return job - 2209;
        }
        return 0;
    }

    public static boolean isTransformation(int skillId) {
        return skillId == 5121003;
    }

    public static boolean isAranSkills(final int skill) {
        return Aran.FULL_SWING == skill || Aran.OVER_SWING == skill || Aran.COMBO_TEMPEST == skill || Aran.COMBO_PENRIL == skill || Aran.COMBO_DRAIN == skill
                || Aran.HIDDEN_FULL_DOUBLE == skill || Aran.HIDDEN_FULL_TRIPLE == skill || Aran.HIDDEN_OVER_DOUBLE == skill || Aran.HIDDEN_OVER_TRIPLE == skill
                || Aran.COMBO_SMASH == skill || Aran.DOUBLE_SWING == skill || Aran.TRIPLE_SWING == skill;
    }

    public static boolean isHiddenSkills(final int skill) {
        return Aran.HIDDEN_FULL_DOUBLE == skill || Aran.HIDDEN_FULL_TRIPLE == skill || Aran.HIDDEN_OVER_DOUBLE == skill || Aran.HIDDEN_OVER_TRIPLE == skill;
    }

    public static boolean isAran(final int job) {
        return job == 2000 || (job >= 2100 && job <= 2112);
    }

    public static boolean isFinisherSkill(int skillId) {
        return skillId > 1111002 && skillId < 1111007 || skillId == 11111002 || skillId == 11111003;
    }

    public static boolean isBambo(final int skill) {
        return skill >= 10001009 && skill <= 10001010;
    }

    public static boolean isDojo(int mapid) {
        return mapid >= 925020100 && mapid <= 925023814;
    }

    public static boolean isPyramid(int mapid) {
        return mapid >= 926010010 & mapid <= 930010000;
    }

    public static boolean isPQSkillMap(int mapid) {
        return isDojo(mapid) || isPyramid(mapid);
    }

    public static boolean isInJobTree(int skillId, int jobId) {
        int skill = skillId / 10000;
        if ((jobId - skill) + skill == jobId) {
            return true;
        }
        return false;
    }

    public static boolean isPqSkill(final int skill) {
        return skill >= 20001013 && skill <= 20000018 || skill % 10000000 == 1020 || skill == 10000013 || skill % 10000000 >= 1009 && skill % 10000000 <= 1011;
    }

    public static boolean bannedBindSkills(final int skill) {
        return isAranSkills(skill) || isPqSkill(skill);
    }

    public static boolean isGMSkills(final int skill) {
        return skill >= 9001000 && skill <= 9101008 || skill >= 8001000 && skill <= 8001001;
    }

    public static MapleInventoryType getInventoryType(final int itemId) {
        final byte type = (byte) (itemId / 1000000);
        if (type < 1 || type > 5) {
            return MapleInventoryType.UNDEFINED;
        }
        return MapleInventoryType.getByType(type);
    }

    public static boolean isThrowingStar(final int itemId) {
        return itemId / 10000 == 207;
    }

    public static boolean isBullet(final int itemId) {
        return itemId / 10000 == 233;
    }

    public static boolean isRechargable(final int itemId) {
        return isThrowingStar(itemId) || isBullet(itemId);
    }

    public static boolean isOverall(final int itemId) {
        return itemId / 10000 == 105;
    }

    public static boolean isPet(final int itemId) {
        return itemId / 10000 == 500;
    }

    public static boolean isInBag(final int slot, final byte type) {
        return ((slot >= 101 && slot <= 512) && type == MapleInventoryType.ETC.getType());
    }

    private static final int[] closeness = {0, 1, 3, 6, 14, 31, 60, 108, 181, 287, 434, 632, 891, 1224, 1642, 2161, 2793,
        3557, 4467, 5542, 6801, 8263, 9950, 11882, 14084, 16578, 19391, 22547, 26074,
        30000};
    private static final int[] setScore = {0, 10, 100, 300, 600, 1000, 2000, 4000, 7000, 10000};
    private static final int[] cumulativeTraitExp = {0, 20, 46, 80, 124, 181, 255, 351, 476, 639, 851, 1084,
        1340, 1622, 1932, 2273, 2648, 3061, 3515, 4014, 4563, 5128,
        5710, 6309, 6926, 7562, 8217, 8892, 9587, 10303, 11040, 11788,
        12547, 13307, 14089, 14883, 15689, 16507, 17337, 18179, 19034, 19902,
        20783, 21677, 22584, 23505, 24440, 25399, 26362, 27339, 28331, 29338,
        30360, 31397, 32450, 33519, 34604, 35705, 36823, 37958, 39110, 40279,
        41466, 32671, 43894, 45135, 46395, 47674, 48972, 50289, 51626, 52967,
        54312, 55661, 57014, 58371, 59732, 61097, 62466, 63839, 65216, 66597,
        67982, 69371, 70764, 72161, 73562, 74967, 76376, 77789, 79206, 80627,
        82052, 83481, 84914, 86351, 87792, 89237, 90686, 92139, 93596, 96000};
    private static final int[] mobHpVal = {0, 15, 20, 25, 35, 50, 65, 80, 95, 110, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350,
        375, 405, 435, 465, 495, 525, 580, 650, 720, 790, 900, 990, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
        1900, 2000, 2100, 2200, 2300, 2400, 2520, 2640, 2760, 2880, 3000, 3200, 3400, 3600, 3800, 4000, 4300, 4600, 4900, 5200,
        5500, 5900, 6300, 6700, 7100, 7500, 8000, 8500, 9000, 9500, 10000, 11000, 12000, 13000, 14000, 15000, 17000, 19000, 21000, 23000,
        25000, 27000, 29000, 31000, 33000, 35000, 37000, 39000, 41000, 43000, 45000, 47000, 49000, 51000, 53000, 55000, 57000, 59000, 61000, 63000,
        65000, 67000, 69000, 71000, 73000, 75000, 77000, 79000, 81000, 83000, 85000, 89000, 91000, 93000, 95000, 97000, 99000, 101000, 103000,
        105000, 107000, 109000, 111000, 113000, 115000, 118000, 120000, 125000, 130000, 135000, 140000, 145000, 150000, 155000, 160000, 165000, 170000, 175000, 180000,
        185000, 190000, 195000, 200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000, 320000,
        330000, 340000, 350000, 360000, 370000, 380000, 390000, 400000, 410000, 420000, 430000, 440000, 450000, 460000, 470000, 480000, 490000, 500000, 510000, 520000,
        530000, 550000, 570000, 590000, 610000, 630000, 650000, 670000, 690000, 710000, 730000, 750000, 770000, 790000, 810000, 830000, 850000, 870000, 890000, 910000};
    private static final int[] pvpExp = {0, 3000, 6000, 12000, 24000, 48000, 960000, 192000, 384000, 768000};
    private static final int[] guildexp = {0, 20000, 160000, 540000, 1280000, 2500000, 4320000, 6860000, 10240000, 14580000};
    private static final int[] mountexp = {0, 6, 25, 50, 105, 134, 196, 254, 263, 315, 367, 430, 543, 587, 679, 725, 897, 1146, 1394, 1701, 2247,
        2543, 2898, 3156, 3313, 3584, 3923, 4150, 4305, 4550};
    public static final int[] itemBlock = {5200000, 2290653, 4001168, 5220013, 3993003, 2340000, 2049100, 4001129, 2040037, 2040006, 2040007, 2040303, 2040403, 2040506, 2040507, 2040603, 2040709, 2040710, 2040711, 2040806, 2040903, 2041024, 2041025, 2043003, 2043103, 2043203, 2043303, 2043703, 2043803, 2044003, 2044103, 2044203, 2044303, 2044403, 2044503, 2044603, 2044908, 2044815, 2044019, 2044703};
    public static final int[] cashBlock = {5200000, 5062000, 5062001, 5062002, 5062003, 5062005, 5062500, 5610000, 5610001, 5640000, 2531000, 2530000,
        5534000, 5050000, 5510000, 5521000, 5062200, 5062201, 5133000, 5520001, 5030000, 5030001, 5030006,
        5470000, 1122121, 5155000, 5062400, 5700000, 1112909, 5450005, 5040004, 5220000, 5050000, 5062000,
        5062001, 5062002, 5062003, 5211046, 5360000, 5051001, 5590000, 5200014, 5202000, 5202001, 5202002, 5222060};
    public static final int[] rankC = {70000000, 70000001, 70000002, 70000003, 70000004, 70000005, 70000006, 70000007, 70000008, 70000009, 70000010, 70000011, 70000012, 70000013};
    public static final int[] rankB = {70000014, 70000015, 70000016, 70000017, 70000018, 70000021, 70000022, 70000023, 70000024, 70000025, 70000026};
    public static final int[] rankA = {70000027, 70000028, 70000029, 70000030, 70000031, 70000032, 70000033, 70000034, 70000035, 70000036, 70000039, 70000040, 70000041, 70000042};
    public static final int[] rankS = {70000043, 70000044, 70000045, 70000047, 70000048, 70000049, 70000050, 70000051, 70000052, 70000053, 70000054, 70000055, 70000056, 70000057, 70000058, 70000059, 70000060, 70000061, 70000062};
    public static final int[] circulators = {2702000, 2700000, 2700100, 2700200, 2700300, 2700400, 2700500, 2700600, 2700700, 2700800, 2700900, 2701000};
    public static final int JAIL = 180000004, MAX_BUFFSTAT = 12;
    public static final int[] skillsBloqueadas = {4341003, 2111011};
    public static final String[] RESERVADO = {"Mind", "Ruan", "Marcos", "MapleNews", "Hack"};
    public static final String[] stats = {"tuc", "reqLevel", "reqJob", "reqSTR", "reqDEX", "reqINT", "reqLUK", "reqPOP", "cash", "cursed", "success", "setItemID", "equipTradeBlock", "durability", "randOption", "randStat", "masterLevel", "reqSkillLevel", "elemDefault", "incRMAS", "incRMAF", "incRMAI", "incRMAL", "canLevel", "skill", "charmEXP"};
    public static final int[] hyperTele = {10000, 20000, 30000, 40000, 50000, 1000000, 1010000, 1020000, 2000000, //Maple Island
        104000000, 104010000, 104010100, 104010200, 104020000, 103010100, 103010000, 103000000, 103050000, 103020000, 103020020, 103020100, 103020200, 103020300, 103020310, 103020320, 103020400, 103020410, 103020420, 103030000, 103030100, 103030200, 103030300, 103030400, 102000000, 102010000, 102010100, 102020000, 102020100, 102020200, 102020300, 102020400, 102020500, 102040000, 102040100, 102040200, 102040300, 102040400, 102040500, 102040600, 102030000, 102030100, 102030200, 102030300, 102030400, 101000000, 101010000, 101010100, 101020000, 101020100, 101020200, 101020300, 101030000, 101030100, 101030200, 101030300, 101030400, 101030500, 101030101, 101030201, 101040000, 101040100, 101040200, 101040300, 101040310, 101040320, 101050000, 101050400, 100000000, 100010000, 100010100, 100020000, 100020100, 100020200, 100020300, 100020400, 100020500, 100020401, 100020301, 100040000, 100040100, 100040200, 100040300, 100040400, 100020101, 106020000, 120010100, 120010000, 120000000, 120020000, 120020100, 120020200, 120020300, 120020400, 120020500, 120020600, 120020700, 120030000, 120030100, 120030200, 120030300, 120030400, 120030500, //Victoria Island
        105000000, 105010100, 105020000, 105020100, 105020200, 105020300, 105020400, 105020500, 105030000, 105030100, 105030200, 105030300, 105030400, 105030500, 105100000, 105100100, //Sleepy Wood
        120000100, 120000101, 120000102, 120000103, 120000104, 120000201, 120000202, 120000301, //Nautilus
        103040000, 103040100, 103040101, 103040102, 103040103, 103040200, 103040201, 103040202, 103040203, 103040300, 103040301, 103040302, 103040303, 103040400, //Kerning Square
        200000000, 200010000, 200010100, 200010110, 200010120, 200010130, 200010111, 200010121, 200010131, 200010200, 200010300, 200010301, 200010302, 200020000, 200030000, 200040000, 200050000, 200060000, 200070000, 200080000, 200000100, 200000200, 200000300, 200100000, 200080100, 200080200, 200081500, 200082200, 200082300, 211000000, 211000100, 211000200, 211010000, 211020000, 211030000, 211040000, 211050000, 211040100, 211040200, 921120000, //Orbis
        211040300, 211040400, 211040500, 211040600, 211040700, 211040800, 211040900, 211041000, 211041100, 211041200, 211041300, 211041400, 211041500, 211041600, 211041700, 211041800, 211041900, 211042000, 211042100, 211042200, 211042300, 211042400, 280030000, 211060000, //Dead Mine
        211060010, 211060100, 211060200, 211060201, 211060300, 211060400, 211060401, 211060410, 211060500, 211060600, 211060601, 211060610, 211060620, 211060700, 211060800, 211060801, 211060810, 211060820, 211060830, 211060900, 211061000, 211061001, 211070000, //Lion King's Castle
        220000000, 220000100, 220000300, 220000400, 220000500, 220010000, 220010100, 220010200, 220010300, 220010400, 220010500, 220010600, 220010700, 220010800, 220010900, 220011000, 220020000, 220020100, 220020200, 220020300, 220020400, 220020500, 220020600, 220030100, 220030200, 220030300, 220030400, 220030000, 220040000, 220040100, 220040200, 220040300, 220040400, 220050000, 220050100, 220050200, 221023200, 221022300, 221022200, 221021700, 221021600, 221021100, 221020000, 221000000, 221030000, 221030100, 221030200, 221030300, 221030400, 221030500, 221030600, 221040000, 221040100, 221040200, 221040300, 221040400, 222000000, 222010000, 222010001, 222010002, 222010100, 222010101, 222010102, 222010200, 222010201, 222010300, 222010400, 222020300, 222020200, 222020100, 222020000, //Ludas Lake
        220050300, 220060000, 220060100, 220060200, 220060300, 220060400, 220070000, 220070100, 220070200, 220070300, 220070400, 220080000, 220080001, //Clock Tower Lower Floor
        300000100, 300000000, 300010000, 300010100, 300010200, 300010400, 300020000, 300020100, 300020200, 300030000, 300030100, 300010410, 300020210, 300030200, 300030300, 300030310, //Ellin Forest
        230010000, 230010100, 230010200, 230010201, 230010300, 230010400, 230020000, 230020100, 230020200, 230020201, 230020300, 230030000, 230030100, 230030101, 230030200, 230040000, 230040100, 230040200, 230040300, 230040400, 230040410, 230040420, 230000000, //Aqua Road
        250000000, 250000100, 250010000, 250010100, 250010200, 250010300, 250010301, 250010302, 250010303, 250010304, 250010400, 250010500, 250010501, 250010502, 250010503, 250010600, 250010700, 250020000, 250020100, 250020200, 250020300, 251000000, 251000100, 251010000, 251010200, 251010300, 251010400, 251010401, 251010402, 251010403, 251010500, //Mu Lung Garden
        240010100, 240010200, 240010300, 240010400, 240010500, 240010600, 240010700, 240010800, 240010900, 240011000, 240020000, 240020100, 240020101, 240020200, 240020300, 240020400, 240020401, 240020500, 240030000, 240030100, 240030101, 240030102, 240030200, 240030300, 240040000, 240040100, 240040200, 240040300, 240040400, 240040500, 240040510, 240040511, 240040520, 240040521, 240040600, 240040700, 240050000, 240010000, 240000000, //Minar Forest
        240070000, 240070010, 240070100, 240070200, 240070300, 240070400, 240070500, 240070600, //Neo City
        260010000, 260010100, 260010200, 260010300, 260010400, 260010500, 260010600, 260010700, 260020000, 260020100, 260020200, 260020300, 260020400, 260020500, 260020600, 260020610, 260020620, 260020700, 261000000, 260000000, 926010000, 261010000, 261010001, 261010002, 261010003, 261010100, 261010101, 261010102, 261010103, 261020000, 261020100, 261020200, 261020300, 261020400, 261020500, 261020600, 261020700, 260000300, 260000200, //Nihal Desert
        270000000, 270000100, 270010000, 270010100, 270010110, 270010111, 270010200, 270010210, 270010300, 270010310, 270010400, 270010500, 270020000, 270020100, 270020200, 270020210, 270020211, 270020300, 270020310, 270020400, 270020410, 270020500, 270030000, 270030100, 270030110, 270030200, 270030210, 270030300, 270030310, 270030400, 270030410, 270030411, 270030500, 270040000, 270050000, //Temple of Time
        271000000, 271000100, 271000200, 271000210, 271000300, 271020000, 271020100, 271010000, 271010100, 271010200, 271010300, 271010301, 271010400, 271010500, 271030000, 271030100, 271030101, 271030102, 271030200, 271030201, 271030300, 271030310, 271030320, 271030400, 271030410, 271030500, 271030510, 271030520, 271030530, 271030540, 271030600, 271040000, 271040100, //Gate of Future
        130000000, 130000100, 130000110, 130000120, 130000200, 130000210, 130010000, 130010010, 130010020, 130010100, 130010110, 130010120, 130010200, 130010210, 130010220, 130020000, 130030005, 130030006, 130030000, //Ereve
        140000000, 140010000, 140010100, 140010200, 140020000, 140020100, 140020200, 140030000, 140090000, 140020300, //Rien
        310000000, 310000010, 310020000, 310020100, 310020200, 310030000, 310030100, 310030110, 310030200, 310030300, 310030310, 310040000, 310040100, 310040110, 310040200, 310040300, 310040400, 310050000, 310050100, 310050200, 310050300, 310050400, 310050500, 310050510, 310050520, 310050600, 310050700, 310050800, 310060000, 310060100, 310060110, 310060120, 310060200, 310060210, 310060220, 310060300, 310010000, //Edelstein
        600000000, 600010100, 600010200, 600010300, 600010400, 600010500, 600010600, 600010700, 600020000, 600020100, 600020200, 600020300, 600020400, 600020500, 600020600, 682000000, 610010000, 610010001, 610010002, 610010004, 610020000, 610020001, 610020006, 610040000, 610040100, 610040200, 610040210, 610040220, 610040230, 610040400//Masteria
    };
    public static final int[] unusedNpcs = {9201142, 9201254, 9201030, 9010037, 9010038, 9010039, 9010040, 9300010, 9070004, 9070006, 9000017, 2041017, 9270075, 9000069, 9201029, 9130024, 9330072, 9133080, 9201152, 9330189};
    //Unused npcs will be removed from map once you enter it.

    public static int getGuildExpNeededForLevel(final int level) {
        if (level < 0 || level >= guildexp.length) {
            return Integer.MAX_VALUE;
        }
        return guildexp[level];
    }

    public static int getPVPExpNeededForLevel(final int level) {
        if (level < 0 || level >= pvpExp.length) {
            return Integer.MAX_VALUE;
        }
        return pvpExp[level];
    }

    public static int getClosenessNeededForLevel(final int level) {
        return closeness[level - 1];
    }

    public static int getMountExpNeededForLevel(final int level) {
        return mountexp[level - 1];
    }

    public static int getTraitExpNeededForLevel(final int level) {
        if (level < 0 || level >= cumulativeTraitExp.length) {
            return Integer.MAX_VALUE;
        }
        return cumulativeTraitExp[level];
    }

    public static int getSetExpNeededForLevel(final int level) {
        if (level < 0 || level >= setScore.length) {
            return Integer.MAX_VALUE;
        }
        return setScore[level];
    }

    public static int getMonsterHP(final int level) {
        if (level < 0 || level >= mobHpVal.length) {
            return Integer.MAX_VALUE;
        }
        return mobHpVal[level];
    }

    public static int getBookLevel(final int level) {
        return (int) ((5 * level) * (level + 1));
    }

    public static int getTimelessRequiredEXP(final int level) {
        return 70 + (level * 10);
    }

    public static int getReverseRequiredEXP(final int level) {
        return 60 + (level * 5);
    }

    public static int getProfessionEXP(final int level) {
        return ((100 * level * level) + (level * 400)) / 2;
    }

    public static boolean isHarvesting(final int itemId) {
        return itemId >= 1500000 && itemId < 1520000;
    }

    public static int maxViewRangeSq() {
        return 1000000; // 1024 * 768
    }

    public static int maxViewRangeSq_Half() {
        return 500000; // 800 * 800
    }

    public static boolean isJobFamily(final int baseJob, final int currentJob) {
        return currentJob >= baseJob && currentJob / 100 == baseJob / 100;
    }

    public static short getBeginnerJob(final short job) {
        if (job % 1000 < 10) {
            return job;
        }
        switch (job / 100) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return 0;
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                return 1000;
            case 20:
                return 2000;
            case 21:
                return 2000;
            case 22:
                return 2001;
            case 23:
                return 2002;
            case 24:
                return 2003;
            case 27:
                return 2004;
            case 31:
                return 3001;
            case 36:
                return 3002;
            case 30:
            case 32:
            case 33:
            case 35:
                return 3000;
            case 41:
                return 4001;
            case 42:
                return 4002;
            case 50:
            case 51:
                return 5000;
            case 60:
            case 61:
                return 6000;
            case 65:
                return 6001;
            case 100:
            case 110:
                return 10000;
        }
        return 0;
    }

    public static boolean isKOC(final int job) {
        return job >= 1000 && job < 2000;
    }

    public static boolean isEvan(final int job) {
        return job == 2001 || (job / 100 == 22);
    }

    public static boolean isMercedes(final int job) {
        return job == 2002 || (job / 100 == 23);
    }

    public static boolean isJett(final int job) {
        return job == 508 || (job / 10 == 57);
    }

    public static boolean isPhantom(final int job) {
        return job == 2003 || (job / 100 == 24);
    }

    public static boolean isWildHunter(final int job) {
        return job == 3000 || (job >= 3300 && job <= 3312);
    }

    public static boolean isMechanic(final int job) {
        return job == 3000 || (job >= 3500 && job <= 3512);
    }

    public static boolean isDK(final int job) {
        return job == 100 || (job >= 130 && job <= 132);
    }

    public static boolean isHero(final int job) {
        return job == 100 || (job >= 110 && job <= 112);
    }

    public static boolean isPage(final int job) {
        return job == 100 || (job >= 120 && job <= 122);
    }

    public static boolean isBishop(final int job) {
        return job == 200 || (job >= 230 && job <= 232);
    }

    public static boolean isFP(final int job) {
        return job == 200 || (job >= 210 && job <= 212);
    }

    public static boolean isIL(final int job) {
        return job == 200 || (job >= 220 && job <= 222);
    }

    public static boolean isHunter(final int job) {
        return job == 300 || (job >= 310 && job <= 312);
    }

    public static boolean isCrossB(final int job) {
        return job == 300 || (job >= 320 && job <= 322);
    }

    public static boolean isAssassin(final int job) {
        return job == 400 || (job >= 410 && job <= 412);
    }

    public static boolean isBandit(final int job) {
        return job == 400 || (job >= 420 && job <= 422);
    }

    public static boolean isBrawler(final int job) {
        return job == 500 || (job >= 510 && job <= 512);
    }

    public static boolean isGunlinger(final int job) {
        return job == 500 || (job >= 520 && job <= 522);
    }

    public static boolean isDawnWarrior(final int job) {
        return job == 1000 || (job >= 1100 && job <= 1112);
    }

    public static boolean isWindArcher(final int job) { //woops xD:3
        return job == 1300 || (job >= 1310 && job <= 1312);
    }

//    public static boolean isSeparatedSp(int job) {
////        System.err.println(job);
////        System.err.println(isSeparatedSp(job));
//        int jobGrade = getTrueJobGrade(job);
//        return job / 1000 == 0 || //new explorers revamped RED
//                job / 1000 == 1 // cygnus
//                && (jobGrade == 0 || jobGrade == 5 || jobGrade == 3 || jobGrade == 1)// thunder breaker wind archer and dawn warrior
//                || job / 1000 == 3 // resistance
//                || job / 100 == 22 // evan
//                || job == 2001 // evan
//                || isMercedes(job)
//                || isPhantom(job)
//                || isMihile(job)
//                || isLuminous(job)
//                || isNova(job)
//                || isZero(job)
//                || isJett(job)
//                || isSengoku(job);
//    }
    public static boolean isSeparatedSp(int job) {
        //return isAdventurer(job) || isZero(job) || isKOC(job) || isEvan(job) || isResist(job) || isMercedes(job) || isJett(job) || isPhantom(job) || isMihile(job) || isNova(job) || isAngelicBuster(job) || isKaiser(job) || isLuminous(job) || isHayato(job) || isKanna(job) || isDemonAvenger(job);
        if (isKOC(job)) {
            if (getTrueJobGrade(job) == 2 || getTrueJobGrade(job) == 4) {
                return false;
            }
            //} if (isAran(job) || isBeastTamer(job)) {
            return false;
        }
        return true;
    }

    public static int getTrueJobGrade(int job) {
        int result;
        int jobGrade = job % 1000 / 100;
        if (job / 100 == 27) {
            jobGrade = 2;
        }
        result = 4;
        if (job / 100 != 36) {
            result = jobGrade;
        }
        return result;
    }

    public static boolean isDualBladeNoSP(int job) {
        return job == 430 ? true : job == 432;
    }

    public static boolean isDemonSlayer(final int job) {
        return job == 3001 || (job >= 3100 && job <= 3112 && job != 3101);
    }

    public static boolean isDemonAvenger(int job) {
        return job == 3001 || job == 3101 || (job >= 3120 && job <= 3122);
    }

    public static boolean isResist(final int job) {
        return job / 1000 == 3;
    }

    public static boolean isAdventurer(final int job) {
        return job >= 0 && job < 1000;
    }

    public static boolean isCannon(final int job) {
        return job == 1 || job == 501 || (job >= 530 && job <= 532);
    }

    public static boolean isDualBlade(final int job) {
        return job == 400 || (job >= 430 && job <= 434);
    }

    public static boolean isMihile(final int job) {
        return job == 5000 || (job >= 5100 && job <= 5112);
    }

    public static boolean isLuminous(final int job) {
        return job == 2004 || (job >= 2700 && job <= 2712);
    }

    public static boolean isKaiser(final int job) {
        return job == 6000 || (job >= 6100 && job <= 6112);
    }

    public static boolean isAngelicBuster(final int job) {
        return job == 6001 || (job >= 6500 && job <= 6512);
    }

    public static boolean isNova(final int job) {
        return job / 1000 == 6;
    }

    public static boolean isXenon(final int job) {
        return job == 3002 || (job >= 3600 && job <= 3612);
    }

    public static boolean isHayato(int job) {
        return job == 4001 || (job >= 4100 && job <= 4112);
    }

    public static boolean isKanna(int job) {
        return job == 4002 || (job >= 4200 && job <= 4212);
    }

    public static boolean isSengoku(int job) {
        return job / 1000 == 4;
    }

    public static boolean isZero(int job) {
        return job == 10000 || (job >= 10100 && job <= 10112);
    }

    public static boolean isExceedAttack(int id) {
        switch (id) {
            case 31011000:
            case 31011004:
            case 31011005:
            case 31011006:
            case 31011007:
            case 31201000:
            case 31201007:
            case 31201008:
            case 31201009:
            case 31201010:
            case 31211000:
            case 31211007:
            case 31211008:
            case 31211009:
            case 31211010:
            case 31221000:
            case 31221009:
            case 31221010:
            case 31221011:
            case 31221012:
                return true;
        }
        return false;
    }

    public static boolean isChangeable(int id) {
        switch (id) {
            case 9306000:
                return true;
        }
        return false;
    }

    public static boolean isFighter(final int job) {
        return job == 1 || job == 100 || (job >= 110 && job <= 112);
    }

    public static int DOJO = 150100;
    public static int DOJO_RECORD = 150101;
    public static int DOJO_REGULAR = 150136;
    public static int DOJO_RANKED = 150137;

    public static boolean isMapaBoss(int mapid) {
        switch (mapid) {
            case 0:
            case 105100300:
            case 105100400:
            case 211070100:
            case 211070101:
            case 211070110:
            case 220080001:
            case 240040700:
            case 240060200:
            case 240060201:
            case 270050100:
            case 271040100:
            case 271040200:
            case 280030000:
            case 280030001:
            case 280030100:
            case 300030310:
            case 551030200:
            case 802000111:
            case 802000211:
            case 802000311:
            case 802000411:
            case 802000611:
            case 802000711:
            case 802000801:
            case 802000802:
            case 802000803:
            case 802000821:
            case 802000823:
                return true;
        }
        return false;
    }

    public static List<Integer> getSealedBoxItems(int itemId) {
        List<Integer> list = new LinkedList();
        int[] items = {};
        switch (itemId) {
            case 2028154://sealed box hat 
                items = new int[]{1002792, 1003180, 1003177, 1003178, 1152120,
                    1003179, 1003181, 1002794, 4000524, 4310014, 4310064}; // ADD DROP DE HALPHAS BLODY SET
                break;
            case 2028155://sealed box Overall 
                items = new int[]{1052319, 1052320, 1052321, 1052322, 1132212,
                    1052323, 1042231, 1062148, 1060133, 1072488, 1061155, 4000524,
                    4310014, 4310064};
                break;
            case 2028156://sealed box Shoes gloves 
                items = new int[]{1072492, 1072491, 1072490, 1072493, 1072521, 1082315, 1082322,
                    1072494, 1152109, 1122198, 1082401, 1112681, 1072618, 1132211, 1132213, 1152121,
                    1152122, 4000524, 4310014, 4310064};
                break;
            case 2028161://sealed box weapons 
                items = new int[]{1302153, 1402096, 1312117, 1412066, 1322097, 1422067,
                    1452112, 1462100, 1472123, 1332131, 1432087, 1442117, 1372085, 1372042,
                    1382052, 1382152, 1492086, 1342035, 1522022, 1532067, 1222013, 1212043,
                    1242052, 1552039, 1542016, 1542046, 4000524, 4310014, 4310064};
                break;
            case 2028162://chaos sealed box hat 
                items = new int[]{1003715, 1003719, 1003716, 1003720, 1003717, 1003722, 1003718, 1003721};
                break;
            case 2028163://chaos sealed box Overall 
                items = new int[]{1042254, 1042255};
                break;
            case 2028164://chaos sealed box Shoes, gloves 
                items = new int[]{1072870, 1082556};
                break;
            case 2028165://chaos sealed box weapons 
                items = new int[]{1212063, 1222058, 1232057, 1242061, 1252015, 1302275,
                    1322203, 1332225, 1342082, 1362090, 1372177, 1382208, 1402196, 1412135,
                    1422140, 1432167, 1442223, 1452205, 1462193, 1472214, 1482168, 1492179,
                    1522094, 1532098, 1542063, 1552063, 1312153};
                break;
        }
        for (int i : items) {
            list.add(i);
        }
        return list;
    }

    public short changeExp(short level, MapleCharacter chr) {
        switch (chr.getLevel()) {
            case 100:
                return 100;
            case 140:
                return 140;
        }
        return 1;
    }

    public static int getKaiserMode(int id) {
        switch (id) {
            case 61100005:
            case 61110005:
            case 61120010:
                return 60001216;
        }
        return 0;
    }

    public static boolean hasSPTable(MapleJob job) {
        switch (job) {
            case EVAN:
            case EVAN1:
            case EVAN2:
            case EVAN3:
            case EVAN4:
            case EVAN5:
            case EVAN6:
            case EVAN7:
            case EVAN8:
            case EVAN9:
            case EVAN10:
                return true;
            default:
                return false;
        }
    }

    public static int getLuminousSkillMode(int id) {
        switch (id) {
            case 27001100:
            case 27101100:
            case 27111100:
            case 27111101:
            case 27121100:
                return 20040216;//light
            case 27001201:
            case 27101202:
            case 27111202:
            case 27121201:
            case 27121202:
            case 27120211:
                return 20040217;//dark
            //           case 27111303:
            //           case 27121303:
            //               return 20040220;
        }
        return 0;
    }

    public static boolean isLinkedAranSkill(final int id) {
        return getLinkedAranSkill(id) != id;
    }

    public static int getLinkedAranSkill(final int id) {
        switch (id) {
            case 21110007:
            case 21110008:
                return 21110002;
            case 21120009:
            case 21120010:
                return 21120002;
            case 4321001:
                return 4321000;
            case 33101006:
            case 33101007:
                return 33101005;
            case 33101008:
                return 33101004;
            case 35101009:
            case 35101010:
                return 35100008;
            case 35111009:
            case 35111010:
                return 35111001;
            case 35121013:
                return 35111004;
            case 35121011:
                return 35121009;
            case 32001007:
            case 32001008:
            case 32001009:
            case 32001010:
            case 32001011:
                return 32001001;
            case 5300007:
                return 5301001;
            case 5320011:
                return 5321004;
            case 23101007:
                return 23101001;
            case 23111010:
            case 23111009:
                return 23111008;
            case 31001006:
            case 31001007:
            case 31001008:
                return 31000004;
            case 30010183:
            case 30010184:
            case 30010186:
                return 30010110;
            case 5710012:
                return 5711002;
            case 31121010:
                return 31121000;
            case 5211015:
            case 5211016:
                return 5211011;
            case 24111008:
                return 24111006;
            case 24121010:
                return 24121003;
            case 5001008:
                return 5200010;
            case 5001009:
                return 5101004;
        }
        return id;
    }

    public static byte gachaponRareItem(int id) {
        switch (id) {
            case 2340000: // White Scroll
            case 2049100: // Chaos Scroll

                return 2;
            //1 = wedding msg o.o
        }
        return 0;
    }

    public static final String[] RESERVED = {"True MapleStory"};

}

//public static boolean isLightSkills(int skillid) {
// switch (skillid) {
           // case 20041226: // 
