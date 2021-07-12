/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package server.recompensa;

import net.MaplePacket;
import java.rmi.RemoteException;
import client.IItem;
import client.MapleCharacter;
import client.MapleClient;
import net.server.Server;
import net.server.channel.Channel;
import tools.MaplePacketCreator;
import server.recompensa.MapleAchievements;

/**
 *
 * @author Patrick/PurpleMadness
 */
public class MapleAchievement {

    private String tipoRecompensa;
    MapleClient c;
    private int recompenaNX;
    private int recompensaNova;
    public MapleAchievements ach;
    private boolean aviso;
    private boolean prizemeso;
    private int reward3;

    public MapleAchievement(String name, int recompenaNX) {
        this.tipoRecompensa = name;
        this.recompenaNX = recompenaNX;
        this.recompensaNova = recompensaNova;
        this.aviso = true;
    }

    public MapleAchievement(String name, int recompenaNX, int recompensaNova) {
        this.tipoRecompensa = name;
        this.recompenaNX = recompenaNX;
        this.recompensaNova = recompensaNova;
        this.aviso = true;
    }

    public MapleAchievement(String name, int recompenaNX, int recompensaNova, boolean notice) {
        this.tipoRecompensa = name;
        this.recompenaNX = recompenaNX;
        this.recompensaNova = recompensaNova;
        this.aviso = notice;
    }

    public MapleAchievement(String name, int recompenaNX, int recompensaNova, boolean notice, boolean prizemeso, int reward3) {
        this.tipoRecompensa = name;
        this.recompenaNX = recompenaNX;
        this.recompensaNova = recompensaNova;
        this.aviso = notice;
        this.prizemeso = prizemeso;
        this.reward3 = reward3;
    }

    public String getName() {
        return tipoRecompensa;
    }

    public void setName(String name) {
        this.tipoRecompensa = name;
    }

    public int getReward() {
        return recompenaNX;
    }

    public int getReward2() {
        return recompensaNova;
    }

    public void setReward(int reward) {
        this.recompenaNX = reward;
    }

    public void setReward2(int reward2) {
        this.recompensaNova = reward2;
    }

    public void finishAchievement(MapleCharacter player) {
        // MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        // IItem item = ii.getEquipById(?);
        //  MapleInventoryManipulator.addFromDrop(c, item, true);
        //player.setPassionPoints(player.getPassionPoints() + reward2);
        //player.modificarCashNX(1, recompenaNX);
        // player.setAchievementFinished(MapleAchievements.getInstance().getByMapleAchievement(this));
        //player.getClient().getSession().write(MaplePacketCreator.serverNotice(6, "Parab[ens " + tipoRecompensa + ". Em breve você passará a ser recompensado por isso."));
        //player.getClient().getSession().write(MaplePacketCreator.serverNotice(6, "[Recompensa] Você ganhou " + recompenaNX + " em Crédito de NX como recompensa " + tipoRecompensa + "."));
        //Server.getInstance().broadcastMessage(c.getWorld(), MaplePacketCreator.serverNotice(6, "[Parabéns] " + player.getName() + " acaba de concluir uma de nossas recompensas!"));
        if (prizemeso) {
            if (reward3 + player.getMeso() < Integer.MAX_VALUE) {
                player.gainMeso(reward3);
            } else {
                player.setMeso(2147483647);
            }
        }
        //if (aviso && !player.isGM()) 
        //Server.getInstance().broadcastMessage(c.getWorld(), MaplePacketCreator.serverNotice(6, "[Parabéns] " + player.getName() + " acaba de concluir uma das recompensas disponíveis em nosso servidor!"));
    }
}
