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
package net.server.handlers.login;

import net.AbstractMaplePacketHandler;
import net.server.Server;
import server.MapleItemInformationProvider;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleJob;
import client.MapleSkinColor;
import client.autoban.AutobanFactory;
import client.inventory.Item;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import config.game.Messages;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public final class CreateCharHandler extends AbstractMaplePacketHandler {

    private static final SimpleDateFormat sdf = new SimpleDateFormat("HH:mm dd-MM-yyyy");

    private static int[] IDs = {
        1302000, 1312004, 1322005, 1442079,// weapons
        1040002, 1040006, 1040010, 1041002, 1041006, 1041010, 1041011, 1042167,// bottom
        1060002, 1060006, 1061002, 1061008, 1062115, // top
        1072001, 1072005, 1072037, 1072038, 1072383,// shoes
        30000, 30010, 30020, 30030, 31000, 31040, 31050, 36790,// hair  
        20000, 20001, 20002, 21000, 21001, 21002, 21201, 20401, 20402, 21700, 20100 //face
    //#NeverTrustStevenCode
    };

    private static boolean isLegal(int toCompare) {
        for (int i = 0; i < IDs.length; i++) {
            if (IDs[i] == toCompare) {
                return true;
            }
        }
        return false;
    }

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        String name = slea.readMapleAsciiString();
        if (!MapleCharacter.canCreateChar(name)) {
            return;
        }
        MapleCharacter jogador = c.getPlayer();
        MapleCharacter newchar = MapleCharacter.getDefault(c);
        newchar.setWorld(c.getWorld());

        int job = slea.readInt();
        int face = slea.readInt();

        int hair = slea.readInt();
        int hairColor = slea.readInt();
        int skincolor = slea.readInt();

        newchar.setSkinColor(MapleSkinColor.getById(skincolor));
        int top = slea.readInt();
        int bottom = slea.readInt();
        int shoes = slea.readInt();
        int weapon = slea.readInt();
        newchar.setGender(slea.readByte());
        newchar.setName(name);
        newchar.setHair(hair + hairColor);
        newchar.setFace(face);
        int[] items = new int[]{weapon, top, bottom, shoes, hair, face};
        for (int i = 0; i < items.length; i++) {
            if (!isLegal(items[i])) {
                AutobanFactory.EDICAO_PACOTE.autoban(newchar, "O jogador(a) " + name + " tentou editar um pacote durante a criação de um personagem.");
                //FilePrinter.printError(FilePrinter.JOGADOR_BANIDO+FilePrinter.EXPLOITS+"", "Em suma, " + name + " Tentou editar um pacote durante a criação de um personagem.\r\n");
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("O jogador(a) " + name + " acaba de ser banido(a) automaticamente por EDICAO_PACOTE"));
                //jogador.dropMessage(0, "Você acaba de ser banido(a) automaticamente por EDIÇÃO_PACOTE.");
                c.disconnect(true, false);
                return;
            }
        }
        if (job == 0) { // Knights of Cygnus
            newchar.setJob(MapleJob.NOBRE);
            newchar.setMapId(130030000);
            newchar.getInventory(MapleInventoryType.ETC).adcItem(new Item(4161047, (short) 0, (short) 1));
        } else if (job == 1) { // Adventurer   
            newchar.setJob(MapleJob.Aprendiz);
            newchar.setMapId(/*specialJobType == 2 ? 3000600 : */10000);//start_game é 10000
            newchar.getInventory(MapleInventoryType.ETC).adcItem(new Item(4161001, (short) 0, (short) 1));
        } else if (job == 2) { // Aran
            newchar.setJob(MapleJob.LENDA);
            newchar.setMapId(914000000);
            newchar.getInventory(MapleInventoryType.ETC).adcItem(new Item(4161048, (short) 0, (short) 1));
        } else {
            c.announce(MaplePacketCreator.deleteCharResponse(0, 9));
            return;
        }

        MapleInventory equipped = newchar.getInventory(MapleInventoryType.EQUIPPED);

        Item eq_top = MapleItemInformationProvider.getInstance().getEquipById(top);
        eq_top.setPosition((byte) -5);
        equipped.addFromDB(eq_top);
        Item eq_bottom = MapleItemInformationProvider.getInstance().getEquipById(bottom);
        eq_bottom.setPosition((byte) -6);
        equipped.addFromDB(eq_bottom);
        Item eq_shoes = MapleItemInformationProvider.getInstance().getEquipById(shoes);
        eq_shoes.setPosition((byte) -7);
        equipped.addFromDB(eq_shoes);
        Item eq_weapon = MapleItemInformationProvider.getInstance().getEquipById(weapon);
        eq_weapon.setPosition((byte) -11);
        equipped.addFromDB(eq_weapon.copy());

        if (!newchar.insertNewChar()) {
            c.announce(MaplePacketCreator.deleteCharResponse(0, 9));
            return;
        }
        c.announce(MaplePacketCreator.addNewCharEntry(newchar));
        System.out.println("Acaba de ser criado o personagem " + name);
        FilePrinter.printError(FilePrinter.PERSONAGENS + FilePrinter.NOVOS_PERSONAGENS + "", "O personagem " + name + " foi criado às " + sdf.format(Calendar.getInstance().getTime()) + "\r\n");
        Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("[Informação] O ID " + c.getAccountName() + " criou o personagem: " + name + " às " + sdf.format(Calendar.getInstance().getTime())));
        c.getChannelServer().yellowWorldMessage("[Bem-vindo] " + name + " " + Messages.Novo_Jogador);
    }

    private boolean checkName(MapleClient c, String name) {
        String lowerCase = name.toLowerCase();
        if (lowerCase.contains("gm")
                || lowerCase.contains("admin")
                || lowerCase.contains("gamemaster")
                || lowerCase.contains("fuc")
                || lowerCase.contains("bugado")
                || lowerCase.contains("lixo")
                || lowerCase.contains("buceta")
                || lowerCase.contains("pinto")
                || lowerCase.contains("caralho")
                || lowerCase.contains("vagina")
                || lowerCase.contains("viado")
                || lowerCase.contains("lesbica")
                || lowerCase.contains("BMS2")
                || lowerCase.contains("ExtaliaMS")
                || lowerCase.contains("Extalia")
                || lowerCase.contains("MapleForever")
                || lowerCase.contains("Foda")
                || lowerCase.contains("Mesos")
                || lowerCase.contains("shit")) {
            c.getSession().close();
            return true;
        }
        return false;
    }
}
