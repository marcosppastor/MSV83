/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.packet;

import client.MapleCharacter;
import client.inventory.Equip;
import client.inventory.Item;
import constants.GameConstants;
import tools.data.output.MaplePacketLittleEndianWriter;

/**
 *
 * @author Marcos
 */
public class PacketHelper {

    public static void addItemInfo(final MaplePacketLittleEndianWriter mplew, final Item item) {
        addItemInfo(mplew, item, null);
    }

    /*      */ public static final void addItemInfo(MaplePacketLittleEndianWriter mplew, Item item, MapleCharacter chr) {
        /*  705 */ mplew.write(item.getPet() != null ? 3 : item.getType());
        /*  706 */ mplew.writeInt(item.getItemId());
        /*      */
 /*  709 */ /*  716 */
 /*  718 */ if (item.getType() == 1) {
            /*  719 */ Equip equip = (Equip) item;
            /*  720 */ mplew.write(equip.getUpgradeSlots());
            /*  721 */ mplew.write(equip.getLevel());
            /*  722 */ mplew.writeShort(equip.getStr());
            /*  723 */ mplew.writeShort(equip.getDex());
            /*  724 */ mplew.writeShort(equip.getInt());
            /*  725 */ mplew.writeShort(equip.getLuk());
            /*  726 */ mplew.writeShort(equip.getHp());
            /*  727 */ mplew.writeShort(equip.getMp());
            /*  728 */ mplew.writeShort(equip.getWatk());
            /*  729 */ mplew.writeShort(equip.getMatk());
            /*  730 */ mplew.writeShort(equip.getWdef());
            /*  731 */ mplew.writeShort(equip.getMdef());
            /*  732 */ mplew.writeShort(equip.getAcc());
            /*  733 */ mplew.writeShort(equip.getAvoid());
            /*  734 */ mplew.writeShort(equip.getHands());
            /*  735 */ mplew.writeShort(equip.getSpeed());
            /*  736 */ mplew.writeShort(equip.getJump());
            /*  737 */ mplew.writeMapleAsciiString(equip.getOwner());
            /*  738 */ mplew.writeShort(equip.getFlag());
            /*  739 */
 /*      */        }
        /*      */    }
    /*      */

 /*      */
}
