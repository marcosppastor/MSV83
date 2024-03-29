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

public enum MapleJob {

    Aprendiz(0),
    GUERREIRO(100),
    SOLDADO(110), TEMPL�RIO(111), HER�I(112),
    ESCUDEIRO(120), CAVALEIROBRANCO(121), PALADINO(122),
    /**
     *
     */
    Lanceiro(130), CAVALEIRODRACONIANO(131), CAVALEIRONEGRO(132),
    Bruxo(200),
    FEITICEIROFOGOEVENENO(210), MAGOFOGOEVENENO(211), ARQUIMAGOFOGOEVENENO(212),
    FEITICEIROGELOERAIO(220), MAGOGELOERAIO(221), ARQUIMAGOGELOERAIO(222),
    CL�RIGO(230), SACERDOTE(231), SUMOSACERDOTE(232),
    ARQUEIRO(300),
    CA�ADOR(310), RASTREADOR(311), MESTREARQUEIRO(312),
    BALESTREIRO(320), ATIRADOR(321), ATIRADORDEELITE(322),
    GATUNO(400),
    MERCEN�RIO(410), ANDARILHO(411), LORDENEGRO(412),
    ARRUACEIRO(420), MESTREARRUACEIRO(421), MESTREDASSOMBRAS(422),
    PIRATA(500),
    LUTADOR(510), SAQUEADOR(511), BUCANEIRO(512),
    PISTOLEIRO(520), FORAGIDO(521), CORS�RIO(522),
    MAPLELEAF_BRIGADIER(800),
    SUPORTE(900), ADMINISTRADOR(910),
    //SUPORTE (912),

    NOBRE(1000),
    GUERREIRODAAURORA1(1100), DAWNWARRIOR1(1100), DAWNWARRIOR2(1110), DAWNWARRIOR3(1111), DAWNWARRIOR4(1112),
    BLAZEWIZARD1(1200), BLAZEWIZARD2(1210), BLAZEWIZARD3(1211), BLAZEWIZARD4(1212),
    WINDARCHER1(1300), WINDARCHER2(1310), WINDARCHER3(1311), WINDARCHER4(1312),
    NIGHTWALKER1(1400), NIGHTWALKER2(1410), NIGHTWALKER3(1411), NIGHTWALKER4(1412),
    THUNDERBREAKER1(1500), THUNDERBREAKER2(1510), THUNDERBREAKER3(1511), THUNDERBREAKER4(1512),
    LENDA(2000),
    ARAN1(2100), ARAN2(2110), ARAN3(2111), ARAN4(2112), EVAN(2001),
    EVAN1(2200), EVAN2(2210), EVAN3(2211), EVAN4(2212), EVAN5(2213), EVAN6(2214),
    EVAN7(2215), EVAN8(2216), EVAN9(2217), EVAN10(2218),
    BEGINNER(0),
    WARRIOR(100),
    FIGHTER(110), CRUSADER(111), HERO(112),
    PAGE(120), WHITEKNIGHT(121), PALADIN(122),
    SPEARMAN(130), DRAGONKNIGHT(131), DARKKNIGHT(132),
    MAGICIAN(200),
    FP_WIZARD(210), FP_MAGE(211), FP_ARCHMAGE(212),
    IL_WIZARD(220), IL_MAGE(221), IL_ARCHMAGE(222),
    CLERIC(230), PRIEST(231), BISHOP(232),
    BOWMAN(300),
    HUNTER(310), RANGER(311), BOWMASTER(312),
    CROSSBOWMAN(320), SNIPER(321), MARKSMAN(322),
    THIEF(400),
    ASSASSIN(410), HERMIT(411), NIGHTLORD(412),
    BANDIT(420), CHIEFBANDIT(421), SHADOWER(422),
    PIRATE(500),
    BRAWLER(510), MARAUDER(511), BUCCANEER(512),
    GUNSLINGER(520), OUTLAW(521), CORSAIR(522),
    GM(900), SUPERGM(910),
    NOBLESSE(1000),;

    public static String getJobName(int id) {
        switch (id) {
            case 0:
                return "Aprendiz";
            case 100:
                return "Guerreiro";
            case 110:
                return "Soldado";
            case 111:
                return "Paladino";
            case 112:
                return "Heroi";
            case 120:
                return "Escudeiro";
            case 121:
                return "Cavaleiro Branco";
            case 122:
                return "Paladino";
            case 130:
                return "Lanceiro";
            case 131:
                return "Cavaleiro Draconiano";
            case 132:
                return "Cavaleiro Negro";
            case 200:
                return "Bruxo";
            case 210:
                return "Feiticeiro Fogo/Veneno";
            case 211:
                return "Mago Fogo/Veneno";
            case 212:
                return "Arquimago Fogo/Veneno";
            case 220:
                return "Feiticeiro Gelo/Raio";
            case 221:
                return "Mago Gelo/Raio";
            case 222:
                return "Arquimago Gelo/Raio";
            case 230:
                return "Clerigo";
            case 231:
                return "Sacerdote";
            case 232:
                return "Bispo";
            case 300:
                return "Arqueiro";
            case 310:
                return "Cacador";
            case 320:
                return "Balesteiro";
            case 311:
                return "Rastreador";
            case 321:
                return "Atirador";
            case 312:
                return "Mestre Arqueiro";
            case 322:
                return "Atirador de Elite";
            case 400:
                return "Gatuno";
            case 410:
                return "Mercenario";
            case 420:
                return "Arruaceiro";
            case 411:
                return "Andarilho";
            case 421:
                return "Mestre Arruaceiro";
            case 412:
                return "Lorde Negro";
            case 422:
                return "Mestre das Sombras";
            case 500:
                return "Pirata";
            case 510:
                return "Lutador";
            case 511:
                return "Saqueador";
            case 512:
                return "Bucaneiro";
            case 520:
                return "Pistoleiro";
            case 521:
                return "Foragido";
            case 522:
                return "Corsario";
            case 900:
                return "Semi Deus";
            case 910:
                return "Deus";
            default:
                return "";
        }
    }

    public static boolean isExist(int id) {
        for (MapleJob job : values()) {
            if (job.getId() == id) {
                return true;
            }
        }
        return false;
    }

    final int jobid;

    private MapleJob(int id) {
        jobid = id;
    }

    public int getId() {
        return jobid;
    }

    public static MapleJob getById(int id) {
        for (MapleJob l : MapleJob.values()) {
            if (l.getId() == id) {
                return l;
            }
        }
        return null;
    }

    public static MapleJob getBy5ByteEncoding(int encoded) {
        switch (encoded) {
            case 2:
                return GUERREIRO;
            case 4:
                return Bruxo;
            case 8:
                return ARQUEIRO;
            case 16:
                return GATUNO;
            case 32:
                return PIRATA;
            case 1024:
                return NOBRE;
            case 2048:
                return GUERREIRODAAURORA1;
            case 4096:
                return BLAZEWIZARD1;
            case 8192:
                return WINDARCHER1;
            case 16384:
                return NIGHTWALKER1;
            case 32768:
                return THUNDERBREAKER1;
            default:
                return Aprendiz;
        }
    }

    public boolean isBeginner(MapleJob beginners) {
        return MAGICIAN == beginners || WARRIOR == beginners || THIEF == beginners || PIRATE == beginners || BOWMAN == beginners || ARAN1 == beginners || THUNDERBREAKER1 == beginners
                || DAWNWARRIOR1 == beginners || NIGHTWALKER1 == beginners || BLAZEWIZARD1 == beginners;
    }

    public boolean isA(MapleJob basejob) {
        return getId() >= basejob.getId() && getId() / 100 == basejob.getId() / 100;
    }
}
