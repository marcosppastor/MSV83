/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.packet;

import net.SendOpcode;
import static tools.MaplePacketCreator.environmentChange;
import tools.data.output.MaplePacketLittleEndianWriter;

/**
 *
 * @author Marcos
 */
public class CField {

    public static byte[] showEffect(String effect) {
        return environmentChange(effect, 3);
    }

    public static byte[] playSound(String sound) {
        return environmentChange(sound, 4);
    }

    public static byte[] getClock(int time) {
        /* 1749 */ MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        /*      */
        /* 1751 */ mplew.writeShort(SendOpcode.CLOCK.getValue());
        /* 1752 */ mplew.write(2);
        /* 1753 */ mplew.writeInt(time);
        /*      */
        /* 1755 */ return mplew.getPacket();
        /*      */    }
}
