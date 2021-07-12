package net.server.channel.handlers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import client.MapleClient;
import client.MapleCharacter;
import client.inventory.MapleInventoryType;
import java.sql.SQLException;
import tools.DatabaseConnection;
import net.AbstractMaplePacketHandler;
import scripting.npc.Marriage;
import tools.data.input.SeekableLittleEndianAccessor;
import scripting.npc.NPCScriptManager;
import server.MapleInventoryManipulator;
import tools.MaplePacketCreator;

/**
 * Ring actions o.O
 *
 * @author Jvlaple
 */
//header  mode
//[7C 00] [00] 08 00 53 68 69 74 46 75 63 6B 01 2E 22 00 => Send
//[7C 00] [01] Cancel send?
//[7C 00] [03] 84 83 3D 00 => Dropping engagement ring
public class RingActionHandler extends AbstractMaplePacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(RingActionHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte mode = slea.readByte();
        MapleCharacter player = c.getPlayer();
        //c.getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(1, "TEST"));
        switch (mode) {
            case 0x00: //Send
                String partnerName = slea.readMapleAsciiString();
                MapleCharacter partner = c.getChannelServer().getPlayerStorage().getCharacterByName(partnerName);
                if (partnerName.equalsIgnoreCase(player.getName())) {
                    c.getPlayer().dropMessage(1, "Você não pode por seu próprio nome aqui.");
                    return;
                } else if (partner == null) {
                    c.getPlayer().dropMessage(1, partnerName + " não foi encontrado neste canal. Se ambos estiverem logados, por favor tenham a certeza de estarem no mesmo canal.");
                    return;
                } else if (partner.getGender() == player.getGender()) {
                    c.getPlayer().dropMessage(1, "Seu parceiro(a) é do mesmo sexo que você.");
                    return;

                } else if (player.haveItem(2240000)) {
                    //MapleInventoryManipulator.removeById(partner.getClient(), MapleInventoryType.USE, 2240000, 1, false, false);
                    MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.USE, 2240000, 1, false, false);
                    MapleInventoryManipulator.addById(player.getClient(), 4031358, (short) 1);
                    MapleInventoryManipulator.addById(player.getClient(), 4031357, (short) 1);
                    MapleInventoryManipulator.addById(partner.getClient(), 4031358, (short) 1);
                    MapleInventoryManipulator.addById(partner.getClient(), 4031357, (short) 1);
                    c.getPlayer().dropMessage(1, "Você recebeu um anel de noivado,grande passo para o casamento!.");
                    partner.getClient().getSession().write(MaplePacketCreator.serverNotice(6, player.getName() + " lhe enviou um anel de noivado,parabéns por este passo!!"));

                } else if (player.haveItem(2240001)) {
                    //MapleInventoryManipulator.removeById(partner.getClient(), MapleInventoryType.USE, 2240001, 1, false, false);
                    MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.USE, 2240001, 1, false, false);
                    MapleInventoryManipulator.addById(player.getClient(), 4031360, (short) 1);
                    MapleInventoryManipulator.addById(player.getClient(), 4031359, (short) 1);
                    MapleInventoryManipulator.addById(partner.getClient(), 4031360, (short) 1);
                    MapleInventoryManipulator.addById(partner.getClient(), 4031359, (short) 1);
                    c.getPlayer().dropMessage(1, "Você recebeu um anel de noivado,grande passo para o casamento!.");
                    partner.getClient().getSession().write(MaplePacketCreator.serverNotice(6, player.getName() + " lhe enviou um anel de noivado,parabéns por este passo!!"));

                } else if (player.haveItem(2240002)) {
                    //MapleInventoryManipulator.removeById(partner.getClient(), MapleInventoryType.USE, 2240002, 1, false, false);
                    MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.USE, 2240002, 1, false, false);
                    MapleInventoryManipulator.addById(player.getClient(), 4031362, (short) 1);
                    MapleInventoryManipulator.addById(player.getClient(), 4031361, (short) 1);
                    MapleInventoryManipulator.addById(partner.getClient(), 4031362, (short) 1);
                    MapleInventoryManipulator.addById(partner.getClient(), 4031361, (short) 1);
                    c.getPlayer().dropMessage(1, "Você recebeu um anel de noivado,grande passo para o casamento!.");
                    partner.getClient().getSession().write(MaplePacketCreator.serverNotice(6, player.getName() + " lhe enviou um anel de noivado,parabéns por este passo!!"));

                } else if (player.haveItem(2240003)) {
                    //MapleInventoryManipulator.removeById(partner.getClient(), MapleInventoryType.USE, 2240003, 1, false, false);
                    MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.USE, 2240003, 1, false, false);
                    MapleInventoryManipulator.addById(player.getClient(), 4031364, (short) 1);
                    MapleInventoryManipulator.addById(player.getClient(), 4031363, (short) 1);
                    MapleInventoryManipulator.addById(partner.getClient(), 4031364, (short) 1);
                    MapleInventoryManipulator.addById(partner.getClient(), 4031363, (short) 1);
                    c.getPlayer().dropMessage(1, "Você recebeu um anel de noivado,grande passo para o casamento!.");
                    partner.getClient().getSession().write(MaplePacketCreator.serverNotice(6, player.getName() + " lhe enviou um anel de noivado,parabéns por este passo!!"));

                }
                break;
            case 0x01: //Cancel send
                c.getPlayer().dropMessage(1, "Você cancelou o pedido.");
                break;
            case 0x03: //Drop Ring
                if (player.haveItem(4031358)) {

                    try {
                        PreparedStatement ps2 = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET married = 0 WHERE id =?");

                        ps2.setInt(1, player.getId());
                        ps2.executeUpdate();
                        ps2.close();
                    } catch (SQLException ex) {
                    }

                    MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.ETC, 4031358, 1, false, false);
                    player.setMarried(0);
                    c.getPlayer().dropMessage(1, "O anel é seu selo de compromisso,jogando ele fora você deixara de ter um parceiro,e não poderá participar de eventos como a APQ, caso queira será necessário casar novamente");
                } else if (player.haveItem(4031360)) {

                    try {
                        PreparedStatement ps2 = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET married = 0 WHERE id =?");

                        ps2.setInt(1, player.getId());
                        ps2.executeUpdate();
                        ps2.close();
                    } catch (SQLException ex) {
                    }

                    MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.ETC, 4031360, 1, false, false);
                    player.setMarried(0);
                    c.getPlayer().dropMessage(1, "O anel é seu selo de compromisso,jogando ele fora você deixara de ter um parceiro,e não poderá participar de eventos como a APQ, caso queira será necessário casar novamente");
                } else if (player.haveItem(4031362)) {

                    try {
                        PreparedStatement ps2 = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET married = 0 WHERE id =?");

                        ps2.setInt(1, player.getId());
                        ps2.executeUpdate();
                        ps2.close();
                    } catch (SQLException ex) {
                    }

                    MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.ETC, 4031362, 1, false, false);
                    player.setMarried(0);
                    c.getPlayer().dropMessage(1, "O anel é seu selo de compromisso,jogando ele fora você deixara de ter um parceiro,e não poderá participar de eventos como a APQ, caso queira será necessário casar novamente");
                } else if (player.haveItem(4031364)) {

                    try {
                        PreparedStatement ps2 = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET married = 0 WHERE id =?");

                        ps2.setInt(1, player.getId());
                        ps2.executeUpdate();
                        ps2.close();
                    } catch (SQLException ex) {
                    }
                    MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.ETC, 4031364, 1, false, false);
                    player.getClient().getSession().write(MaplePacketCreator.serverNotice(6, "O anel é seu selo de compromisso,jogando ele fora você deixara de ter um parceiro,e não poderá participar de eventos como a APQ, caso queira será necessário casar novamente!"));
                    player.setMarried(0);
                    c.getPlayer().dropMessage(1, "O anel é seu selo de compromisso,jogando ele fora você deixara de ter um parceiro,e não poderá participar de eventos como a APQ, caso queira será necessário casar novamente");
                    break;
                } else {
                    log.info("Um erro ocorreu..");
                    break;
                }
            default:
                log.info("Unhandled Ring Packet : " + slea.toString());
                break;
        }
    }
}
