/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.lojas;

import client.MapleCharacter;
import java.lang.ref.WeakReference;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import server.MaplePlayerShopItem;

/**
 *
 * @author Marcos
 */
public abstract class AbstractPlayerStore implements IMaplePlayerShop {

    private int objectId;

    protected boolean open = false, available = false;
    protected String ownerName, des, pass;
    protected int ownerId, owneraccount, itemId, channel, map;
    protected AtomicInteger meso = new AtomicInteger(0);
    protected WeakReference<MapleCharacter> chrs[];
    protected List<String> visitors = new LinkedList<>();
    protected List<BoughtItem> bought = new LinkedList<>();
    protected List<MaplePlayerShopItem> items = new LinkedList<>();

    public int getObjectId() {
        return objectId;
    }

    public void setObjectId(int id) {
        this.objectId = id;
    }

    //@Override
    public List<BoughtItem> getBoughtItems() {
        return bought;
    }

    public static final class BoughtItem {

        public int id;
        public int quantity;
        public int totalPrice;
        public String buyer;

        public BoughtItem(final int id, final int quantity, final int totalPrice, final String buyer) {
            this.id = id;
            this.quantity = quantity;
            this.totalPrice = totalPrice;
            this.buyer = buyer;
        }
    }
}
