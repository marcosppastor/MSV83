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

 Modified by @Daghlawi for TrueMapleStory
 */
package net.server.channel.handlers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Calendar;
import net.AbstractMaplePacketHandler;
import net.server.Server;
import tools.DatabaseConnection;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import client.MapleCharacter;
import client.MapleClient;
import tools.FilePrinter;

/*
 * 
 * @author BubblesDev
 */
public final class ReportHandler extends AbstractMaplePacketHandler {

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int type = slea.readByte(); //01 = Conversation claim 00 = illegal program
        String victim = slea.readMapleAsciiString();
        int reason = slea.readByte();
        String description = slea.readMapleAsciiString();
        if (type == 0) {
            if (c.getPlayer().getPossibleReports() > 0) {
                if (c.getPlayer().getMeso() > 299) {
                    c.getPlayer().decreaseReports();
                    c.getPlayer().gainMeso(-300, true);
                } else {
                    c.announce(MaplePacketCreator.reportResponse((byte) 4));
                    return;
                }
            } else {
                c.announce(MaplePacketCreator.reportResponse((byte) 2));
                return;
            }
            Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, victim + " foi denúnciado por: " + description));
            addReportEntry(c.getPlayer().getId(), MapleCharacter.getIdByName(victim), 0, description, null);
        } else if (type == 1) {
            String chatlog = slea.readMapleAsciiString();
            if (chatlog == null) {
                return;
            }
            if (c.getPlayer().getPossibleReports() > 0) {
                if (c.getPlayer().getMeso() > 299) {
                    c.getPlayer().decreaseReports();
                    c.getPlayer().gainMeso(-300, true);
                } else {
                    c.announce(MaplePacketCreator.reportResponse((byte) 4));
                    return;
                }
            }
            Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, victim + " foi denúnciado por: " + description));
            addReportEntry(c.getPlayer().getId(), MapleCharacter.getIdByName(victim), reason, description, chatlog);
        } else {
            Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, c.getPlayer().getName() + " Provavelmente, é a edição de pacotes. Tem um tipo de relatório desconhecido, o que é impossível."));
        }
    }

    private boolean addReportEntry(int reporterId, int victimId, int reason, String chatlog, String chatlog1) {
        try {
            Connection dcon = DatabaseConnection.getConnection();
            PreparedStatement ps;
            ps = dcon.prepareStatement("INSERT INTO reports VALUES (NULL, CURRENT_TIMESTAMP, ?, ?, ?, ?, 'DESTACADO')");
            ps.setInt(1, reporterId);
            ps.setInt(2, victimId);
            ps.setInt(3, reason);
            ps.setString(4, chatlog);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            return false;
        }
        return true;
    }
}
