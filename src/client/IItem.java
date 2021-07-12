package client;

import client.inventory.Item;
import java.util.List;

public interface IItem extends Comparable<Item> {

    public final int ITEM = 2;
    public final int EQUIP = 1;

    byte getType();

    byte getPosition();

    void setPosition(byte position);

    int getItemId();

    short getQuantity();

    String getOwner();

    int getPetId();

    int getUniqueId();

    IItem copy();

    void setOwner(String owner);

    void setQuantity(short quantity);

    public void log(String msg, boolean fromDB);

    List<String> getLog();

    long getExpiration();

    void setExpiration(long expire);
}
