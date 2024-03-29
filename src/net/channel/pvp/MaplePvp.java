package net.channel.pvp;

import client.MapleCharacter;
import client.MapleBuffStat;
import client.MapleStat;
import client.MapleJob;
import net.server.guild.MapleGuild;
import net.server.channel.handlers.AbstractDealDamageHandler;
import server.MapleInventoryManipulator;
import server.life.MapleMonster;
import server.life.MapleLifeFactory;
import server.maps.MapleMap;
import tools.MaplePacketCreator;

public class MaplePvp {

    private static int pvpDamage, maxDis, maxHeight;
    private static boolean isAoe = false;
    public static boolean isLeft = false, isRight = false;

    private static boolean isMeleeAttack(AbstractDealDamageHandler.AttackInfo attack) {
        switch (attack.skill) {
            case 1001004:    //Power Strike
            case 1001005:    //Slash Blast
            case 4001334:    //Double Stab
            case 4201005:    //Savage Blow
            case 1111004:    //Panic: Axe
            case 1111003:    //Panic: Sword
            case 1111006:    //Coma: Axe
            case 1111005:    //Coma: Sword
            case 1211002:    //Charged Blow
            case 1311004:    //Dragon Fury: Pole Arm
            case 1311003:    //Dragon Fury: Spear
            case 1311002:    //Pole Arm Crusher
            case 1311005:    //Sacrifice
            case 1311001:    //Spear Crusher
            case 1121008:    //Brandish
            case 1221009:    //Blast
            case 1121006:    //Rush
            case 1221007:    //Rush
            case 1321003:    //Rush
            case 3101003:    //Power Knockback
            case 3201003:    //Power Knockback
            case 4221001:    //Assassinate
            case 5001002:    //Somersault Kick
            case 5121007:    //Barrage
            case 5101002:    //Backspin Blow
            case 5001001:    //Flash Fist
            case 5101003:    //Double Uppercut
            case 5121004:    //Demolition
            case 5111002:    //Energy Blast
            case 11001002:   //Power Strike
            case 11001003:   //Slash Blast
            case 11111002:   //Panic
            case 11111003:   //Coma
            case 11111004:   //Brandish
            case 15001001:   //Straight
            case 15001002:   //Somersault Kick
            case 15101003:   //Corkscrew Blow
            case 15101005:   //Energy Blast
            case 15111004:   //Barrage
            case 15111006:   //Spark
            case 21000002:   //Double Swing
            case 21100001:   //Triple Swing
            case 21100002:   //Final Charge
            case 21120005:   //Final Blow
            case 21110003:   //Final Cross
                return true;
        }
        return false;
    }

    private static boolean isRangeAttack(AbstractDealDamageHandler.AttackInfo attack) {
        switch (attack.skill) {
            case 1000:       //Three Snails
            case 10001000:   //Three Snails
            case 20001000:   //Three Snails
            case 3111003:    //Inferno
            case 3101005:    //Arrow Bomb : Bow
            case 3201005:    //Iron Arrow : Crossbow
            case 2001004:    //Energy Bolt
            case 2001005:    //Magic Claw
            case 3001004:    //Arrow Blow
            case 3001005:    //Double Shot
            case 4001344:    //Lucky Seven
            case 2101004:    //Fire Arrow
            case 2101005:    //Poison Brace
            case 2201004:    //Cold Beam
            case 2301005:    //Holy Arrow
            case 4101005:    //Drain
            case 2211002:    //Ice Strike
            case 2211003:    //Thunder Spear
            case 3111006:    //Strafe
            case 3211006:    //Strafe
            case 4111005:    //Avenger
            case 4211002:    //Assaulter
            case 2121003:    //Fire Demon
            case 2221006:    //Chain Lightning
            case 2221003:    //Ice Demon
            case 2111006:    //Element Composition F/P
            case 2211006:    //Element Composition I/L
            case 2321007:    //Angel's Ray
            case 3121003:    //Dragon Pulse
            case 3121004:    //Hurricane
            case 3221003:    //Dragon Pulse
            case 3221001:    //Piercing
            case 3221007:    //Sniping
            case 4121003:    //Showdown taunt
            case 4121007:    //Triple Throw
            case 4221007:    //Boomerang Step
            case 4221003:    //Showdown taunt
            case 4111004:    //Shadow Meso
            case 5001003:    //Double Shot (Gun)
            case 5201004:    //Blank Shot
            case 5221004:    //Rapid Fire
            case 5221007:    //Battleship cannon
            case 5221008:    //Battleship torpedo
            case 5201002:    //Grenade
            case 5211005:    //Ice Splitter
            case 5201001:    //Invisible Shot
            case 5211004:    //Flamethrower
            case 5210000:    //Burst Fire
            case 5201006:    //Recoil Shot
            case 5111004:    //Energy Drain
            case 5121005:    //Snatch
            case 5111006:    //Shockwave
            case 5121001:    //Dragon Strike
            case 12001003:   //Magic Claw
            case 12101002:   //Fire Arrow
            case 12111006:   //Fire Strike
            case 11101004:   //Soul Blade
            case 13001003:   //Double Shot
            case 13101005:   //Storm Break
            case 13111001:   //Strafe
            case 13111002:   //Hurricane
            case 13111006:   //Wind Piercing
            case 13111007:   //Wind Shot
            case 14001004:   //Lucky Seven
            case 14111001:   //Shadow Web
            case 14111002:   //Avenger
            case 14110004:   //Venom
            case 14111005:   //Triple Throw
            case 15111007:   //Shark Wave
            case 15111001:   //Energy Drain
            case 15111003:   //Shockwave
            case 21100004:   //Combo Smash
            case 21110004:   //Combo Fenrir?
                return true;
        }
        return false;
    }

    private static boolean isAoeAttack(AbstractDealDamageHandler.AttackInfo attack) {
        switch (attack.skill) {
            case 2201005:    //Thunderbolt
            case 1311006:    //Dragon Roar
            case 2111002:    //Explosion
            case 2111003:    //Poison Mist
            case 2311004:    //Shining Ray
            case 3111004:    //Arrow Rain
            case 3211004:    //Arrow Eruption
            case 3211003:    //Blizzard (Sniper)
            case 4211004:    //Band of Thieves
            case 1221011:    //Sanctuary Skill
            case 2121001:    //Big Bang
            case 2121007:    //Meteor
            case 2121006:    //Paralyze
            case 2221001:    //Big Bang
            case 2221007:    //Blizzard
            case 2321008:    //Genesis
            case 2321001:    //Big Bang
            case 4121004:    //Ninja Ambush
            case 4121008:    //Ninja Storm knockback
            case 4221004:    //Ninja Ambush
            case 9001001:    //GM dragon roar
            case 5221003:    //Aerial Strike
            case 12101006:   //Fire Pillar
            case 12111003:   //Meteor Shower
            case 12111005:   //Flame Gear
            case 11111006:   //Soul Driver
            case 13111000:   //Arrow Rain
            case 14101006:   //Vampire
            case 14111006:   //Poison Bomb
            case 21110006:   //Rolling Spin
                return true;
        }
        return false;
    }

    private static void getDirection(AbstractDealDamageHandler.AttackInfo attack) {
        if (isAoe) {
            isRight = true;
            isLeft = true;
        } else if (attack.direction <= 0 && attack.stance <= 0) {
            isRight = false;
            isLeft = true;
        } else {
            isRight = true;
            isLeft = false;
        }
    }

    private static void DamageBalancer(AbstractDealDamageHandler.AttackInfo attack) {
        if (attack.skill == 0) {
            pvpDamage = 100;
            maxDis = 130;
            maxHeight = 35;
        } else if (isMeleeAttack(attack)) {
            maxDis = 130;
            maxHeight = 45;
            isAoe = false;
            if (attack.skill == 4201005) {
                pvpDamage = (int) (Math.floor(Math.random() * (75 - 5) + 5));
            } else if (attack.skill == 1121008) {
                pvpDamage = (int) (Math.floor(Math.random() * (320 - 180) + 180));
                maxHeight = 50;
            } else if (attack.skill == 4221001) {
                pvpDamage = (int) (Math.floor(Math.random() * (200 - 150) + 150));
            } else if (attack.skill == 1121006 || attack.skill == 1221007 || attack.skill == 1321003) {
                pvpDamage = (int) (Math.floor(Math.random() * (200 - 80) + 80));
            } else {
                pvpDamage = (int) (Math.floor(Math.random() * (600 - 250) + 250));
            }
        } else if (isRangeAttack(attack)) {
            maxDis = 300;
            maxHeight = 40;
            isAoe = false;
            if (attack.skill == 4201005) {
                pvpDamage = (int) (Math.floor(Math.random() * (75 - 5) + 5));
            } else if (attack.skill == 4121007) {
                pvpDamage = (int) (Math.floor(Math.random() * (60 - 15) + 15));
            } else if (attack.skill == 4001344 || attack.skill == 2001005) {
                pvpDamage = (int) (Math.floor(Math.random() * (195 - 90) + 90));
            } else if (attack.skill == 4221007) {
                pvpDamage = (int) (Math.floor(Math.random() * (350 - 180) + 180));
            } else if (attack.skill == 3121004 || attack.skill == 3111006 || attack.skill == 3211006) {
                maxDis = 450;
                pvpDamage = (int) (Math.floor(Math.random() * (50 - 20) + 20));
            } else if (attack.skill == 2121003 || attack.skill == 2221003) {
                pvpDamage = (int) (Math.floor(Math.random() * (600 - 300) + 300));
            } else {
                pvpDamage = (int) (Math.floor(Math.random() * (400 - 250) + 250));
            }
        } else if (isAoeAttack(attack)) {
            maxDis = 350;
            maxHeight = 350;
            isAoe = true;
            if (attack.skill == 2121001 || attack.skill == 2221001 || attack.skill == 2321001 || attack.skill == 2121006) {
                maxDis = 175;
                maxHeight = 175;
                pvpDamage = (int) (Math.floor(Math.random() * (350 - 180) + 180));
            } else {
                pvpDamage = (int) (Math.floor(Math.random() * (700 - 300) + 300));
            }
        }
    }

    private static void monsterBomb(MapleCharacter player, MapleCharacter attackedPlayers, MapleMap map, AbstractDealDamageHandler.AttackInfo attack) {
        //level balances
        if (attackedPlayers.getLevel() > player.getLevel() + 25) {
            pvpDamage *= 1.35;
        } else if (attackedPlayers.getLevel() < player.getLevel() - 25) {
            pvpDamage /= 1.35;
        } else if (attackedPlayers.getLevel() > player.getLevel() + 100) {
            pvpDamage *= 1.50;
        } else if (attackedPlayers.getLevel() < player.getLevel() - 100) {
            pvpDamage /= 1.50;
        }
        //class balances
        if (player.getJob().equals(MapleJob.Bruxo)) {
            pvpDamage *= 1.20;
        }
        //buff modifiers
        Integer mguard = attackedPlayers.getBuffedValue(MapleBuffStat.MAGIC_GUARD);
        Integer mesoguard = attackedPlayers.getBuffedValue(MapleBuffStat.MESOGUARD);
        if (mguard != null) {
            int mploss = (int) (pvpDamage / .5);
            pvpDamage *= .70;
            if (mploss > attackedPlayers.getMp()) {
                pvpDamage /= .70;
                attackedPlayers.cancelBuffStats(MapleBuffStat.MAGIC_GUARD);
            } else {
                attackedPlayers.setMp(attackedPlayers.getMp() - mploss);
                attackedPlayers.updateSingleStat(MapleStat.MP, attackedPlayers.getMp());
            }
        } else if (mesoguard != null) {
            int mesoloss = (int) (pvpDamage * .75);
            pvpDamage *= .75;
            if (mesoloss > attackedPlayers.getMeso()) {
                pvpDamage /= .75;
                attackedPlayers.cancelBuffStats(MapleBuffStat.MESOGUARD);
            } else {
                attackedPlayers.gainMeso(-mesoloss, false);
            }
        }
        //Item bonusues
        if (player.haveItem(4000213)) { //Damage Bonus
            pvpDamage *= 2;
        }
        if (attackedPlayers.haveItem(4031890)) {
            pvpDamage /= 2;
        }
        MapleMonster pvpMob = MapleLifeFactory.getMonster(9400711);
        map.spawnMonsterOnGroundBelow(pvpMob, attackedPlayers.getPosition());
        for (int attacks = 0; attacks < attack.numDamage; attacks++) {
            map.broadcastMessage(MaplePacketCreator.damagePlayerpvp(attack.numDamage, pvpMob.getId(), attackedPlayers.getId(), pvpDamage));
            attackedPlayers.addHP(-pvpDamage);
        }
        int attackedDamage = pvpDamage * attack.numDamage;
        player.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "Voc� acertou o jogador" + attackedPlayers.getName() + "  com " + attackedDamage + " de dano!"));
        player.getClient().getSession().write(MaplePacketCreator.serverNotice(5, attackedPlayers.getName() + " agora tem " + attackedPlayers.getHp() + "/" + attackedPlayers.getMaxHp() + " de HP restante."));
        attackedPlayers.getClient().getSession().write(MaplePacketCreator.serverNotice(5, player.getName() + " recebu " + attackedDamage + " de dano!"));
        map.killMonster(pvpMob, player, false);
        //rewards
        if (attackedPlayers.getHp() <= 0 && !attackedPlayers.isAlive()) {
            int expReward = attackedPlayers.getLevel() * 10000 * (attackedPlayers.getLevel() / player.getLevel());
            int gpReward = (int) (Math.floor(Math.random() * (200 - 50) + 50));
            // if (player.getPvpKills() * .25 >= player.getPvpDeaths()) {
            //expReward *= 20;

            //}
            //if (player.getGuildId() != 0 && player.getGuildId() != attackedPlayers.getGuildId()) {
            // try {
            //MapleGuild guild = player.getClient().getChannelServer().getWorldInterface().getGuild(player.getGuildId(), null);
            //guild.gainGP(gpReward);
            //} catch (Exception e) {
            // }
            // }
            // player.gainPvpKill();
            MapleInventoryManipulator.addById(player.getClient(), 4031448, (short) 1);
            player.getClient().getSession().write(MaplePacketCreator.serverNotice(6, "Voc� matou " + attackedPlayers.getName() + "!! Voc� ganhou um fragmento de Medo!"));
            //attackedPlayers.gainPvpDeath();
            // MapleInventoryManipulator.addById(attackedPlayers.getClient(), 4031448 , (short) -1);
            attackedPlayers.getClient().getSession().write(MaplePacketCreator.serverNotice(6, player.getName() + " lhe matou!"));
        }
    }

    public static void doPvP(MapleCharacter player, MapleMap map, AbstractDealDamageHandler.AttackInfo attack) {
        DamageBalancer(attack);
        getDirection(attack);
        for (MapleCharacter attackedPlayers : player.getMap().getNearestPvpChar(player.getPosition(), maxDis, maxHeight, player.getMap().getCharacters())) {
            if (attackedPlayers.getWantPvp() && attackedPlayers.isAlive() && (player.getParty() == null || player.getParty() != attackedPlayers.getParty())) {
                monsterBomb(player, attackedPlayers, map, attack);
            }
        }
    }
}
