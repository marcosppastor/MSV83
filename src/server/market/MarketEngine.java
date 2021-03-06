/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor. Then suck a dick
 */
package server.market;

import client.MapleCharacter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import net.server.channel.Channel;
import tools.DatabaseConnection;

/**
 *
 * @author David
 */
public class MarketEngine {

    public static class ItemEntry {

        private int quantity;
        private int id;
        private int price;
        private int owner;

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public int getPrice() {
            return price;

        }

        public void setPrice(int price) {
            this.price = price;
        }

        public int getOwner() {
            return owner;
        }

        public void setOwner(int owner) {
            this.owner = owner;
        }
    }

    private List<ItemEntry> items = new LinkedList<ItemEntry>();
    private Map<Integer, String> names = new LinkedHashMap<Integer, String>();

    public void addItem(int itemId, int quantity, int price, int charid) {
        //see if s/he's already put the same item up
        synchronized (items) {
            for (ItemEntry ie : items) {
                if (ie.getId() == itemId && ie.getOwner() == charid
                        && ie.getPrice() == price) {
                    ie.setQuantity(ie.getQuantity() + quantity);
                    return;
                }
            }
        }
        ItemEntry ie = new ItemEntry();
        ie.setId(itemId);
        ie.setQuantity(quantity);
        ie.setOwner(charid);
        ie.setPrice(price);
        synchronized (items) {
            items.add(ie);
        }
    }

    public void removeItem(int itemId, int quantity, int charid) {
        synchronized (items) {
            for (int i = 0; i < items.size(); i++) {
                ItemEntry ie = items.get(i);
                if (ie.getOwner() == charid && ie.getId() == itemId
                        && ie.getQuantity() >= quantity) {
                    if (ie.getQuantity() == quantity) {
                        items.remove(items.indexOf(ie));
                    } else {
                        ie.setQuantity(ie.getQuantity() - quantity);
                    }
                }
            }
        }
    }

    public ItemEntry getItem(int position) {
        return items.get(position);
    }

    public List<ItemEntry> getItems() {
        return items;
    }

    public String getCharacterName(int charId) {
        if (names.get(charId) != null) {
            return names.get(charId);
        }

        for (Channel cs : Channel.getAllInstances()) {
            for (MapleCharacter mc : cs.getPlayerStorage().getAllCharacters()) {
                if (mc.getId() == charId) {
                    names.put(charId, mc.getName());
                    return mc.getName();
                }
            }
        }
        //Not found.. look in SQL
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
            ps.setInt(1, charId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                String name = rs.getString("name");
                names.put(charId, name);
                return name;
            }
        } catch (SQLException fuckthisissofuckinggay) {
            return "SQL Error fixmepl0x";
        }
        return "No user";
    }

    @Override
    public String toString() {
        String ret = "";
        synchronized (items) {
            for (ItemEntry ie : items) {
                ret += "#v" + ie.getId()
                        + //Item picture
                        "# Preco: #b" + ie.getPrice() + "#k"
                        + //Price 
                        "Vendedor: #b" + getCharacterName(ie.getOwner()) + "#k"
                        + //Seller
                        "\\r\\n"; //Newline
            }
        }
        return ret;
    }
}
