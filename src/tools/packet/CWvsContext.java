/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.packet;

import client.MapleCharacter;
import client.MapleStat;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import constants.GameConstants;
import java.util.EnumMap;
import java.util.Map;
import net.SendOpcode;
import tools.data.output.MaplePacketLittleEndianWriter;

/**
 *
 * @author Marcos
 */
public class CWvsContext {

    public static byte[] getGachaponMega(final String name, final String message, final Item item, final byte rareness, final String gacha) {
        return getGachaponMega(name, message, item, rareness, false, gacha);
    }

    public static byte[] serverNotice(int type, String message) {
        /* 3162 */ return serverMessage(type, 0, message, false);
        /*      */    }

    /*      */
    /*      */ public static byte[] serverNotice(int type, int channel, String message) {
        /* 3166 */ return serverMessage(type, channel, message, false);
        /*      */    }

    /*      */
    /*      */ public static byte[] serverNotice(int type, int channel, String message, boolean smegaEar) {
        /* 3170 */ return serverMessage(type, channel, message, smegaEar);
        /*      */    }

    /*      */
    private static byte[] serverMessage(int type, int channel, String message, boolean megaEar) {
        /* 3174 */ MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        /*      */
        /* 3200 */ mplew.writeShort(SendOpcode.SERVERMESSAGE.getValue());
        /* 3201 */ mplew.write(type);
        /* 3202 */ if (type == 4) {
            /* 3203 */ mplew.write(1);
            /*      */        }
        /* 3205 */ if ((type != 23) && (type != 24)) {
            /* 3206 */ mplew.writeMapleAsciiString(message);
            /*      */        }
        /* 3208 */ switch (type) {
            /*      */ case 3:
            /*      */ case 22:
            /*      */ case 25:
            /*      */ case 26:
                /* 3213 */ mplew.write(channel - 1);
                /* 3214 */ mplew.write(megaEar ? 1 : 0);
                /* 3215 */ break;
            /*      */ case 9:
                /* 3217 */ mplew.write(channel - 1);
                /* 3218 */ break;
            /*      */ case 12:
                /* 3220 */ mplew.writeInt(channel);
                /* 3221 */ break;
            /*      */ case 6:
            /*      */ case 11:
            /*      */ case 20:
                /* 3225 */ mplew.writeInt((channel >= 1000000) && (channel < 6000000) ? channel : 0);
                /*      */
                /* 3227 */ break;
            /*      */ case 24:
                /* 3229 */ mplew.writeShort(0);
            /*      */ case 4:
            /*      */ case 5:
            /*      */ case 7:
            /*      */ case 8:
            /*      */ case 10:
            /*      */ case 13:
            /*      */ case 14:
            /*      */ case 15:
            /*      */ case 16:
            /*      */ case 17:
            /*      */ case 18:
            /*      */ case 19:
            /*      */ case 21:
            /* 3233 */ case 23:
        }
        return mplew.getPacket();
        /*      */    }

    public static byte[] getGachaponMega(final String name, final String message, final Item item, final byte rareness, final boolean dragon, final String gacha) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendOpcode.SERVERMESSAGE.getValue());
        mplew.write(13); // 15, 16 = twin dragon egg
        mplew.writeMapleAsciiString(name + message);
        if (!dragon) { // only for gachapon
            mplew.writeInt(0); // 0/1 = light blue
            mplew.writeInt(item.getItemId()); // item id
        }
        mplew.writeMapleAsciiString(gacha); // Gachapon Name
        PacketHelper.addItemInfo(mplew, item);

        return mplew.getPacket();
    }

    public static Object enableActions() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public static class InventoryPacket {

        public static byte[] getShowItemGain(int itemId, short quantity, boolean inChat) {
            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

            if (inChat) {
                mplew.writeShort(SendOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
                mplew.write(5);
                mplew.write(1); // item count // if this is 0, then after quantity extra 1 string
                mplew.writeInt(itemId);
                mplew.writeInt(quantity);
            } else {
                mplew.writeShort(SendOpcode.SHOW_STATUS_INFO.getValue());
                mplew.writeShort(0);
                mplew.writeInt(itemId);
                mplew.writeInt(quantity);
            }

            return mplew.getPacket();
        }

        public static byte[] updateInventorySlot(final MapleInventoryType type, final Item item, final boolean fromDrop) {
            final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

            mplew.writeShort(SendOpcode.INVENTORY_OPERATION.getValue());
            mplew.write(fromDrop ? 1 : 0);
            mplew.write(1); //how many items to update
            mplew.write(0);

            mplew.write(GameConstants.isInBag(item.getPosition(), type.getType()) ? 6 : 1); //bag
            mplew.write(type.getType()); // iv type
            mplew.writeShort(item.getPosition()); // slot id
            mplew.writeShort(item.getQuantity());
            mplew.write(0); // only needed here when size is <= 1

            return mplew.getPacket();
        }

        public static byte[] addInventorySlot(final MapleInventoryType type, final Item item) {
            return addInventorySlot(type, item, false);
        }

        public static byte[] addInventorySlot(final MapleInventoryType type, final Item item, final boolean fromDrop) {
            final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

            mplew.writeShort(SendOpcode.INVENTORY_OPERATION.getValue());
            mplew.write(fromDrop ? 1 : 0); // update tick
            mplew.write(1); // how many items to add
            mplew.write(1); // used for remove case only. related to 2230000 (EXP Item), if its a 0, function executed.

            mplew.write(GameConstants.isInBag(item.getPosition(), type.getType()) ? 9 : 0);
            mplew.write(type.getType());
            mplew.writeShort(item.getPosition());
            PacketHelper.addItemInfo(mplew, item);
            mplew.write(0); // only needed here when size is <= 1

            return mplew.getPacket();
        }

        public static byte[] enableActions() {
            return updatePlayerStats(new EnumMap<MapleStat, Integer>(MapleStat.class), true, null);
        }

        public static byte[] updatePlayerStats(final Map<MapleStat, Integer> stats, final MapleCharacter chr) {
            return updatePlayerStats(stats, false, chr);
        }

        public static byte[] updatePlayerStats(Map<MapleStat, Integer> mystats, boolean itemReaction, MapleCharacter chr) {
            /* 2689 */ MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
            /*      */
            /* 2691 */ mplew.writeShort(SendOpCodewritable.UPDATE_STATS.getValue());
            /* 2692 */ mplew.write(itemReaction ? 1 : 0);
            /* 2693 */ long updateMask = 0L;
            /* 2694 */ for (MapleStat statupdate : mystats.keySet()) {
                /* 2695 */ updateMask |= statupdate.getValue();
                /*      */            }
            /* 2697 */ mplew.writeLong(updateMask);
            for (final Map.Entry<MapleStat, Integer> statupdate : mystats.entrySet()) {
                switch (statupdate.getKey()) {
                    case SKIN:
                    case LEVEL:

                        // case FATIGUE:
                        // / case BATTLE_RANK:
                        // case ICE_GAGE: // not sure..
/* 2705 */ mplew.write((statupdate.getValue()).byteValue());
                        /* 2706 */ break;
                    case JOB:
                    case STR:
                    case DEX:
                    case INT:
                    case LUK:
                    case AVAILABLEAP:
                        /* 2713 */ mplew.writeShort(((Integer) statupdate.getValue()).shortValue());
                        /* 2714 */ break;
                    /*      */ case AVAILABLESP:
                        /* 2716 */        // if (GameConstants.isSeparatedSp(chr.getJob())) {
/* 2717 */ mplew.write(chr.getRemainingSpSize());
                        /* 2718 */ for (int i = 0; i < chr.getRemainingSps().length; i++) /* 2719 */ // if (chr.getRemainingSp(i) > 0) {
                        /* 2720 */ {
                            mplew.write(i + 1);
                        }
                        /* 2721 */              // mplew.write(chr.getRemainingSp(i));
/*      */             //}
/*      */     //    }
/*      */       //  else {
/* 2725 */        //   mplew.writeShort(chr.getRemainingSp());
/*      */         //}
/* 2727 */ break;
                    /*      */      // case TRAIT_LIMIT:
/* 2729 */       //  mplew.writeInt(((Integer)statupdate.getValue()).intValue());
/* 2730 */        // mplew.writeInt(((Integer)statupdate.getValue()).intValue());
/* 2731 */         //mplew.writeInt(((Integer)statupdate.getValue()).intValue());
/* 2732 */         //break;
/*      */ case PET:
                        /* 2734 */ mplew.writeLong(((Integer) statupdate.getValue()).intValue());
                        /* 2735 */ mplew.writeLong(((Integer) statupdate.getValue()).intValue());
                        /* 2736 */ mplew.writeLong(((Integer) statupdate.getValue()).intValue());
                        /* 2737 */ break;
                    /*      */ default:
                        /* 2739 */ mplew.writeInt(((Integer) statupdate.getValue()).intValue());
                    /*      */                }
                /*      */            }
            /*      */
            /* 2743 */ if ((updateMask == 0L) && (!itemReaction)) {
                /* 2744 */ mplew.write(1);
                /*      */            }
            /* 2746 */ mplew.write(0);
            /* 2747 */ mplew.write(0);
            /*      */
            /* 2749 */ return mplew.getPacket();
            /*      */        }

        public static class InfoPacket {

            public static byte[] getShowItemGain(int itemId, short quantity) {
                return getShowItemGain(itemId, quantity, false);
            }

            public static byte[] getShowItemGain(int itemId, short quantity, boolean inChat) {
                MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

                if (inChat) {
                    mplew.writeShort(SendOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
                    mplew.write(5);
                    mplew.write(1); // item count // if this is 0, then after quantity extra 1 string
                    mplew.writeInt(itemId);
                    mplew.writeInt(quantity);
                } else {
                    mplew.writeShort(SendOpcode.SHOW_STATUS_INFO.getValue());
                    mplew.writeShort(0);
                    mplew.writeInt(itemId);
                    mplew.writeInt(quantity);
                }

                return mplew.getPacket();
            }

        }
    }
}
