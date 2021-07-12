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
import client.MapleClient;
import client.MapleStat;
import client.Skill;
import client.SkillFactory;
import client.autoban.AutobanFactory;
import constants.GameConstants;
import constants.skills.Aran;
import net.AbstractMaplePacketHandler;
import net.server.Server;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public final class DistributeSPHandler extends AbstractMaplePacketHandler {

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readInt();
        int skillid = slea.readInt();
        if (skillid == Aran.HIDDEN_FULL_DOUBLE || skillid == Aran.HIDDEN_FULL_TRIPLE || skillid == Aran.HIDDEN_OVER_DOUBLE || skillid == Aran.HIDDEN_OVER_TRIPLE) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleCharacter jogador = c.getPlayer();
        int remainingSp = jogador.getRemainingSp();
        boolean isBeginnerSkill = false;
        if ((!GameConstants.isPQSkillMap(jogador.getMapId()) && GameConstants.isPqSkill(skillid)) || (!jogador.isGM() && GameConstants.isGMSkills(skillid)) || (!GameConstants.isInJobTree(skillid, jogador.getJob().getId()) && !jogador.isGM())) {
            AutobanFactory.EDICAO_PACOTE.autoban(jogador, "tentou alterar um pacote da distribuicao de SP e foi banido pelo sistema anti-hack.");
            FilePrinter.printError(FilePrinter.JOGADOR_BANIDO + FilePrinter.EXPLOITS + "", "Em suma, " + c.getPlayer().getName() + " tentou usar a skill " + skillid + " e foi banido pelo sistema anti-hack, pois a skill usada não faz referência a classe do(a) mesmo(a).\r\n");
            Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O jogador(a) " + c.getPlayer().getName() + " acaba de ser banido(a) automaticamente por EDICAO_PACOTE"));
            jogador.dropMessage(0, "Voc� acaba de ser banido(a) automaticamente por EDICAO_PACOTE.");
            c.disconnect(true, false);
            return;
        }
        if (skillid % 10000000 > 999 && skillid % 10000000 < 1003) {
            int total = 0;
            for (int i = 0; i < 3; i++) {
                total += jogador.getSkillLevel(SkillFactory.getSkill(jogador.getJobType() * 10000000 + 1000 + i));
            }
            remainingSp = Math.min((jogador.getLevel() - 1), 6) - total;
            isBeginnerSkill = true;
        }
        Skill skill = SkillFactory.getSkill(skillid);
        int curLevel = jogador.getSkillLevel(skill);
        if ((remainingSp > 0 && curLevel + 1 <= (skill.isFourthJob() ? jogador.getMasterLevel(skill) : skill.getMaxLevel()))) {
            if (!isBeginnerSkill) {
                jogador.setRemainingSp(jogador.getRemainingSp() - 1);
            }
            jogador.updateSingleStat(MapleStat.AVAILABLESP, jogador.getRemainingSp());
            jogador.changeSkillLevel(skill, (byte) (curLevel + 1), jogador.getMasterLevel(skill), jogador.getSkillExpiration(skill));
        }
    }
}
