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
package scripting.npc;

import client.MapleCharacter;
import client.MapleClient;
import java.lang.reflect.UndeclaredThrowableException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.WeakHashMap;
import java.util.concurrent.locks.Lock;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;
import net.server.world.MaplePartyCharacter;
import scripting.AbstractScriptManager;
import server.life.MapleLifeFactory;
import tools.FilePrinter;
import tools.MaplePacketCreator;

/**
 *
 * @author Matze
 */
public class NPCScriptManager extends AbstractScriptManager {

    private Map<MapleClient, NPCConversationManager> cms = new HashMap<>();
    private final Map<MapleClient, NPCScript> script = new WeakHashMap<>();
    private Map<MapleClient, Invocable> scripts = new HashMap<>();
    private static NPCScriptManager instance = new NPCScriptManager();

    public synchronized static NPCScriptManager getInstance() {
        return instance;
    }

    public boolean start(MapleClient c, int npc, MapleCharacter chr) {
        return start2(c, npc, null, chr);
    }

    public boolean start(MapleClient c, int npc, int oid, MapleCharacter chr) {
        return start2(c, npc, oid, null, chr);
    }

    public boolean start2(MapleClient c, int npc, String fileName, MapleCharacter chr) {
        return start2(c, npc, -1, fileName, chr);
    }

    public boolean start2(MapleClient c, int npc, int oid, String fileName, MapleCharacter chr) {
        try {
            NPCConversationManager cm = new NPCConversationManager(c, npc, oid, fileName);
            if (cms.containsKey(c)) {
                dispose(c);
            }
            if (c.canClickNPC()) {
                cms.put(c, cm);
                Invocable iv = null;
                if (fileName != null) {
                    iv = getInvocable("npc/" + fileName + ".js", c);
                }
                if (iv == null) {
                    iv = getInvocable("npc/" + npc + ".js", c);
                }
                if (iv == null || NPCScriptManager.getInstance() == null) {
                    dispose(c);
                    return false;
                }
                engine.put("cm", cm);
                scripts.put(c, iv);
                c.setClickedNPC();
                try {
                    iv.invokeFunction("start");
                } catch (final NoSuchMethodException nsme) {
                    try {
                        iv.invokeFunction("start", chr);
                    } catch (final NoSuchMethodException nsma) {
                        nsma.printStackTrace();
                    }
                }
            } else {
                c.announce(MaplePacketCreator.enableActions());
            }

            return true;
        } catch (final UndeclaredThrowableException | ScriptException ute) {
            FilePrinter.printError(FilePrinter.NPC + npc + ".txt", ute);
            dispose(c);

            return false;
        } catch (final Exception e) {
            FilePrinter.printError(FilePrinter.NPC + npc + ".txt", e);
            dispose(c);

            return false;
        }
    }

    public void start(String fileName, MapleClient c, int npc, List<MaplePartyCharacter> chrs) {
        try {
            NPCConversationManager cm = new NPCConversationManager(c, npc, chrs, 0);
            cm.dispose();
            if (cms.containsKey(c)) {
                return;
            }
            if (c.canClickNPC()) {
                cms.put(c, cm);
                //Invocable iv = getInvocable("npc/mundo" + c.getWorld() + "/" + fileName + ".js", c);
                Invocable iv = getInvocable("npc/" + fileName + ".js", c);
                NPCScriptManager npcsm = NPCScriptManager.getInstance();

                if (iv == null || NPCScriptManager.getInstance() == null) {
                    cm.dispose();
                    return;
                }
                if (iv == null || npcsm == null) {
                    cm.dispose();
                    return;
                }
                engine.put("cm", cm);
                NPCScript ns = iv.getInterface(NPCScript.class);
                script.put(c, ns);
                ns.start(chrs);
                c.setClickedNPC();
            } else {
                c.announce(MaplePacketCreator.enableActions());
            }
        } catch (Exception e) {
            FilePrinter.printError(FilePrinter.NPC + npc + ".txt", e);
            dispose(c);
            cms.remove(c);
        }
    }

    public final void start(final MapleClient c, final int npc) {
        final Lock lock = c.getNPCLock();
        lock.lock();
        try {
            if (!cms.containsKey(c) && c.canClickNPC()) {
                Invocable iv = getInvocable("npc/" + npc + ".js", c, true);
                if (iv == null) {
                    iv = getInvocable("npc/notcoded.js", c, true); //safe disposal
                    if (iv == null) {
                        dispose(c);
                        return;
                    }
                }
                final ScriptEngine scriptengine = (ScriptEngine) iv;
                final NPCConversationManager cm = new NPCConversationManager(c, npc, -1, (byte) -1, iv);
                cms.put(c, cm);
                scriptengine.put("cm", cm);

                c.getPlayer().setConversation(1);
                c.setClickedNPC();
                //System.out.println("NPCID started: " + npc);
                try {
                    iv.invokeFunction("start"); // Temporary until I've removed all of start
                } catch (NoSuchMethodException nsme) {
                    iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
                }
            }
        } catch (final Exception e) {
            System.err.println("Error executing NPC script, NPC ID : " + npc + "." + e);
            // FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error executing NPC script, NPC ID : " + npc + "." + e);
            dispose(c);
        } finally {
            lock.unlock();
        }
    }

    public void start(MapleClient c, int npc, String fileName, MapleCharacter chr) {
        try {
            NPCConversationManager cm = new NPCConversationManager(c, npc);
            if (cms.containsKey(c)) {
                dispose(c);
                return;
            }
            cms.put(c, cm);
            Invocable iv = null;
            if (fileName != null) {
                //iv = getInvocable("npc/mundo" + c.getWorld() + "/" + fileName + ".js", c);
                iv = getInvocable("npc/" + fileName + ".js", c);
            }
            if (iv == null) {
                //iv = getInvocable("npc/mundo" + c.getWorld() + "/" + npc + ".js", c);
                iv = getInvocable("npc/" + npc + ".js", c);
            }
            if (iv == null) {
                FilePrinter.printError(FilePrinter.NÃO_CODADO + FilePrinter.NPC_UNCODED + "", "NPC " + MapleLifeFactory.getNPC(npc).getName() + " (" + npc + ") nao esta codado.\r\n");
                //c.getPlayer().dropMessage(1, "Ocorreu um erro desconhecido durante a execucao deste NPC. Por favor reporte por meio do comando @bug <mensagem> falando sobre o NPC: " + npc);
            }
            if (iv == null || NPCScriptManager.getInstance() == null) {
                dispose(c);
                return;
            }
            engine.put("cm", cm);
            scripts.put(c, iv);
            try {
                iv.invokeFunction("start");
            } catch (final NoSuchMethodException nsme) {
                try {
                    iv.invokeFunction("start", chr);
                } catch (final NoSuchMethodException nsma) {
                    iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
                }
            }
        } catch (final UndeclaredThrowableException | ScriptException ute) {
            FilePrinter.printError(FilePrinter.NPC + npc + ".txt", ute);
            notice(c, npc);
            dispose(c);
        } catch (final Exception e) {
            FilePrinter.printError(FilePrinter.NPC + npc + ".txt", e);
            notice(c, npc);
            dispose(c);
        }
    }

    public void startint(MapleClient c, int npc, int cod, MapleCharacter chr) {
        try {
            NPCConversationManager cm = new NPCConversationManager(c, npc);
            if (cms.containsKey(c)) {
                dispose(c);
                return;
            }
            cms.put(c, cm);
            Invocable iv = null;
            if (cod != 0) {
                //iv = getInvocable("npc/mundo" + c.getWorld() + "/" + cod + ".js", c);
                iv = getInvocable("npc/" + cod + ".js", c);
            }
            if (iv == null) {
                //iv = getInvocable("npc/mundo" + c.getWorld() + "/" + npc + ".js", c);
                iv = getInvocable("npc/" + npc + ".js", c);
            }
            if (iv == null) {
                FilePrinter.printError(FilePrinter.NÃO_CODADO + FilePrinter.NPC_UNCODED + "", "NPC " + MapleLifeFactory.getNPC(npc).getName() + " (" + npc + ") nao esta codado.\r\n");
                //c.getPlayer().dropMessage(1, "Ocorreu um erro desconhecido durante a execucao deste NPC. Por favor reporte por meio do comando @bug <mensagem> falando sobre o NPC: " + npc);
            }
            if (iv == null || NPCScriptManager.getInstance() == null) {
                dispose(c);
                return;
            }
            engine.put("cm", cm);
            scripts.put(c, iv);
            try {
                iv.invokeFunction("start");
            } catch (final NoSuchMethodException nsme) {
                try {
                    iv.invokeFunction("start", chr);
                } catch (final NoSuchMethodException nsma) {
                    iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
                }
            }
        } catch (final UndeclaredThrowableException | ScriptException ute) {
            FilePrinter.printError(FilePrinter.NPC + npc + ".txt", ute);
            notice(c, npc);
            dispose(c);
        } catch (final Exception e) {
            FilePrinter.printError(FilePrinter.NPC + npc + ".txt", e);
            notice(c, npc);
            dispose(c);
        }
    }

    public void action(MapleClient c, byte mode, byte type, int selection) {
        Invocable iv = scripts.get(c);
        if (iv != null) {
            try {
                iv.invokeFunction("action", mode, type, selection);
            } catch (ScriptException | NoSuchMethodException t) {
                if (getCM(c) != null) {
                    FilePrinter.printError(FilePrinter.NPC + getCM(c).getNpc() + ".txt", t);
                    notice(c, getCM(c).getNpc());
                }
                dispose(c);//lol this should be last, not notice fags
            }
        }
    }

    public void dispose(NPCConversationManager cm) {
        MapleClient c = cm.getClient();
        cms.remove(c);
        scripts.remove(c);
        //resetContext("npc/mundo" + c.getWorld() + "/" + cm.getNpc() + ".js", c);
        resetContext("npc/" + cm.getNpc() + ".js", c);
    }

    public void dispose(MapleClient c) {
        if (cms.get(c) != null) {
            dispose(cms.get(c));
        }
    }

    public NPCConversationManager getCM(MapleClient c) {
        return cms.get(c);
    }

    private void notice(MapleClient c, int id) {
        if (c != null) {
            c.getPlayer().dropMessage(1, "Lamento, mas estou em manutenção. Já informei ao meu criador que não estou funcionando! (" + id + ")");
        }
    }
}
