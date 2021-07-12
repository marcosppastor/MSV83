/*
 * JavaScriptz (javascriptz@leaderms.com.br)
 * LeaderMS 2012 - 2015
 * Brasil MapleStory Server
 * Incubadora
 * www.leaderms.com.br
 */
package config.jogo;

import client.inventory.Equip;
import java.io.BufferedReader;
import java.io.FileReader;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map.Entry;
import client.MapleClient;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import tools.FilePrinter;
import tools.MaplePacketCreator;

public class Incubadora {

    /* Mensagem ao usar incubadora */
    public static String Mensagem = "Você acaba de ganhar um item mediante uso da incubadora!";
    /* Definiï¿½ï¿½es de Hora */
    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    private static final SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");

    /* Criado por JS-Maple */
    public static final String[] Random = {"ItemsId"};

    public static boolean getIncubatedItem(MapleClient c, int itemid) {
        String name;
        switch (itemid) {
            case 4170000:
                name = "Henesys";
                break;
            case 4170001:
                name = "Ellinia";
                break;
            case 4170002:
                name = "Kerning";
                break;
            case 4170003:
                name = "Perion";
                break;
            case 4170004:
                name = "El_Nath";
                break;
            case 4170005:
                name = "Ludibrium";
                break;
            case 4170006:
                name = "Orbis";
                break;
            case 4170007:
                name = "Aquarium";
                break;
            case 4170009:
                name = "Notilus";
                break;
            default:
                System.out.println("Item não existe na incubadora : " + itemid);
                return false;
        }
        HashMap<String, String> IncubatedItem = new HashMap<>();
        try {
            double chance = Math.random();
            FileReader fl = new FileReader("jogo/incubadora/" + name + "/" + Random[(int) (chance * Random.length)] + ".properties");
            BufferedReader br = new BufferedReader(fl);
            String[] readSplit = new String[2];
            String readLine = null;
            while ((readLine = br.readLine()) != null) {
                readSplit = readLine.split(" - ");
                IncubatedItem.put(readSplit[0], readSplit[1]);
            }
            fl.close();
            br.close();
        } catch (Exception e) {
            FilePrinter.printError(FilePrinter.INCUBADORA + FilePrinter.ERRO_INCUBADORA + "", "Erro ao usar incubadora no dia " + sdf.format(Calendar.getInstance().getTime()) + " Ã s " + sdf2.format(Calendar.getInstance().getTime()) + ".\r\nLog de erro: " + e + "\r\n");
            return false;
        }
        int rand = (int) (Math.random() * IncubatedItem.entrySet().size());
        int hmany = 0;
        int itemcode = 0;
        int amount = 0;
        for (Entry<String, String> entry : IncubatedItem.entrySet()) {
            hmany++;
            if (hmany == rand) {
                try {
                    itemcode = Integer.parseInt(entry.getKey());
                    amount = Integer.parseInt(entry.getValue());
                    break;
                } catch (Exception e) {
                    System.out.print(e);
                    return false;
                }
            }
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        boolean equip = false;
        if (itemcode == 0 || amount == 0) {
            return false;
        }
        if (getInventory(c, MapleInventoryType.EQUIP).isFull(1) || getInventory(c, MapleInventoryType.USE).isFull(3) || getInventory(c, MapleInventoryType.ETC).isFull(1)) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            c.getSession().write(MaplePacketCreator.getShowInventoryFull());
            return false;
        }
        if (ii.getInventoryType(itemcode) == MapleInventoryType.EQUIP) {
            MapleInventoryManipulator.addFromDrop(c, ii.randomizeStatsIncuba((Equip) ii.getEquipById(itemcode)), "");
            c.getSession().write(MaplePacketCreator.getMostrarItemGanho(itemcode, (short) amount, true));
            c.getPlayer().mensagemCabeca(Mensagem);
            FilePrinter.printError(FilePrinter.INCUBADORA + FilePrinter.LOG_INCUBADORA + "", c.getPlayer().getName() + " ganhou o item: " + itemcode + " no dia: " + sdf.format(Calendar.getInstance().getTime()) + " Ã s " + sdf2.format(Calendar.getInstance().getTime()) + ".\r\n");
            equip = true;
        }
        if (!equip) {
            //MapleInventoryManipulator.addById(c, itemcode, (short) amount, "incubadora", "");
            MapleInventoryManipulator.addById(c, itemcode, (short) amount);
            c.getSession().write(MaplePacketCreator.getMostrarItemGanho(itemcode, (short) amount, true));
            FilePrinter.printError(FilePrinter.INCUBADORA + FilePrinter.LOG_INCUBADORA + "", c.getPlayer().getName() + " ganhou o itemID: " + itemcode + " no dia: " + sdf.format(Calendar.getInstance().getTime()) + " Ã s " + sdf2.format(Calendar.getInstance().getTime()) + ".\r\n");
            c.getPlayer().mensagemCabeca(Mensagem);
        }
        return true;
    }

    private static MapleInventory getInventory(MapleClient c, MapleInventoryType type) {
        return c.getPlayer().getInventory(type);
    }
}
