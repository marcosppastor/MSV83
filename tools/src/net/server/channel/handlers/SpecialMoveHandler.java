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
package net.server.channel.handlers;

import client.MapleCharacter;
import client.MapleCharacter.CancelCooldownAction;
import client.MapleClient;
import client.MapleStat;
import client.Skill;
import client.SkillFactory;
import client.autoban.AutobanFactory;
import constants.GameConstants;
import constants.skills.Brawler;
import constants.skills.Buccaneer;
import constants.skills.Corsair;
import constants.skills.DarkKnight;
import constants.skills.Hero;
import constants.skills.Paladin;
import constants.skills.Priest;
import java.awt.Point;
import java.util.concurrent.ScheduledFuture;
import net.AbstractMaplePacketHandler;
import net.server.channel.Channel;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import net.server.Server;
import server.MapleStatEffect;
import server.TimerManager;
import server.life.MapleMonster;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public final class SpecialMoveHandler extends AbstractMaplePacketHandler {

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCharacter jogador = c.getPlayer();
        MapleCharacter chr = c.getPlayer();
        chr.getAutobanManager().setTimestamp(4, slea.readInt());
        int skillid = slea.readInt();
        if ((!GameConstants.isPQSkillMap(c.getPlayer().getMapId()) && GameConstants.isPqSkill(skillid)) || (!c.getPlayer().isGM() && GameConstants.isGMSkills(skillid)) || (!GameConstants.isInJobTree(skillid, c.getPlayer().getJob().getId()) && !c.getPlayer().isGM())) {
            AutobanFactory.EDICAO_PACOTE.autoban(jogador, "O(a) jogador(a) " + c.getPlayer().getName() + " tentou usar a skill " + skillid + " sendo de outra classe e foi banido automaticamente pelo nosso sistema anti-hack.");
            FilePrinter.printError(FilePrinter.JOGADOR_BANIDO + FilePrinter.EXPLOITS + "", "Em suma, " + c.getPlayer().getName() + " tentou usar a skill " + skillid + " sendo de outra classe e foi banido automaticamente pelo nosso sistema anti-hack.\r\n");
            Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O jogador(a) " + c.getPlayer().getName() + " acaba de ser banido(a) automaticamente por EDICAO_PACOTE (Tentou usar a skill " + skillid + " sendo de outra classe e foi banido automaticamente pelo nosso sistema anti-hack)."));
            jogador.dropMessage(0, "Voc� acaba de ser banido(a) automaticamente por EDICAO_PACOTE (Tentou usar a skill " + skillid + " sendo de outra classe e foi banido automaticamente pelo nosso sistema anti-hack).");
            c.disconnect(true, false);
            return;
        }
        Point pos = null;
        int __skillLevel = slea.readByte();
        Skill skill = SkillFactory.getSkill(skillid);
        int skillLevel = chr.getSkillLevel(skill);
        if (skillid % 10000000 == 1010 || skillid % 10000000 == 1011) {
            skillLevel = 1;
            chr.setDojoEnergy(0);
            c.announce(MaplePacketCreator.getEnergy("energy", 0));
        }
        if (skillLevel == 0 || skillLevel != __skillLevel) {
            return;
        }

        MapleStatEffect effect = skill.getEffect(skillLevel);
        if (effect.getCooldown() > 0) {
            if (chr.skillisCooling(skillid)) {
                return;
            } else if (skillid != Corsair.BATTLE_SHIP) {
                c.announce(MaplePacketCreator.skillCooldown(skillid, effect.getCooldown()));
                ScheduledFuture<?> timer = TimerManager.getInstance().schedule(new CancelCooldownAction(c.getPlayer(), skillid), effect.getCooldown() * 1000);
                chr.addCooldown(skillid, System.currentTimeMillis(), effect.getCooldown() * 1000, timer);
            }
        }
        if (skillid == Hero.MONSTER_MAGNET || skillid == Paladin.MONSTER_MAGNET || skillid == DarkKnight.MONSTER_MAGNET) { // Monster Magnet
            int num = slea.readInt();
            int mobId;
            byte success;
            for (int i = 0; i < num; i++) {
                mobId = slea.readInt();
                success = slea.readByte();
                chr.getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showMagnet(mobId, success), false);
                MapleMonster monster = chr.getMap().getMonsterByOid(mobId);
                if (monster != null) {
                    monster.switchController(c.getPlayer(), monster.isControllerHasAggro());
                }
            }
            byte direction = slea.readByte();
            chr.getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showBuffeffect(chr.getId(), skillid, chr.getSkillLevel(skillid), direction), false);
            c.announce(MaplePacketCreator.enableActions());
            return;
        } else if (skillid == Buccaneer.TIME_LEAP) { // Timeleap
            MapleParty p = chr.getParty();
            if (p != null) {
                for (MaplePartyCharacter mpc : p.getMembers()) {
                    for (Channel cserv : Server.getInstance().getChannelsFromWorld(c.getWorld())) {
                        if (cserv.getPlayerStorage().getCharacterById(mpc.getId()) != null) {
                            cserv.getPlayerStorage().getCharacterById(mpc.getId()).removeAllCooldownsExcept(5121010);
                        }
                    }
                }
            }
            chr.removeAllCooldownsExcept(Buccaneer.TIME_LEAP);
        } else if (skillid == Brawler.MP_RECOVERY) {// MP Recovery
            Skill s = SkillFactory.getSkill(skillid);
            MapleStatEffect ef = s.getEffect(chr.getSkillLevel(s));
            int lose = chr.getMaxHp() / ef.getX();
            chr.setHp(chr.getHp() - lose);
            chr.updateSingleStat(MapleStat.HP, chr.getHp());
            int gain = lose * (ef.getY() / 100);
            chr.setMp(chr.getMp() + gain);
            chr.updateSingleStat(MapleStat.MP, chr.getMp());
        } else if (skillid % 10000000 == 1004) {
            slea.readShort();
        }
        if (slea.available() == 5) {
            pos = new Point(slea.readShort(), slea.readShort());
        }
        if (chr.isAlive()) {
            if (skill.getId() != Priest.MYSTIC_DOOR || chr.canDoor()) {
                skill.getEffect(skillLevel).applyTo(c.getPlayer(), pos);
            } else {
                chr.message("Espere um tempo antes de usar DOOR novamente");
                c.announce(MaplePacketCreator.enableActions());
            }
        } else {
            c.announce(MaplePacketCreator.enableActions());
        }
    }
}
