/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net;

/**
 * @author Marcos Paulo Pastor
 * TrueMS - 2016 
 * truems.net.br/
 */
public interface MaplePacket extends java.io.Serializable {

    public byte[] getBytes();

    public Runnable getOnSend();

    public void setOnSend(Runnable onSend);
}
