/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package client.comando;

import client.MapleCharacter;
import client.MapleClient;
import net.server.Server;
import net.server.channel.Channel;
import net.server.world.World;
import tools.MaplePacketCreator;

/**
 *
 * @author David
 * @credit: Hades for (Examples)
 * @credit: kevintjuh93 (connect the string in the array)
 */
public class ConsoleComandos {

    public static boolean executeCommand(String[] sub, char heading) {
        Server srv = Server.getInstance();
        MapleClient c = null;
        World worldServer = null;

        switch (sub[0].toLowerCase()) {
            case "gmonline":
                for (Channel ch : srv.getAllChannels()) {
                    String s = "Jogadores online (World: " + ch.getWorld() + " Canal: " + ch.getId() + " Online: " + ch.getPlayerStorage().getAllCharacters().size() + ") : ";
                    if (ch.getPlayerStorage().getAllCharacters().size() < 50) {
                        for (MapleCharacter chr : ch.getPlayerStorage().getAllCharacters()) {
                            if (chr.isGM()) {
                                s += MapleCharacter.makeMapleReadable(chr.getName()) + ", ";
                            }
                        }
                        System.out.println(s.substring(0, s.length() - 2));
                    }
                }
                break;
            case "online":
                for (Channel ch : srv.getAllChannels()) {
                    String s = "No canal " + ch.getId() + ", há " + ch.getPlayerStorage().getAllCharacters().size() + " online, sendo: ";
                    if (ch.getPlayerStorage().getAllCharacters().size() < 50) {
                        for (MapleCharacter chr : ch.getPlayerStorage().getAllCharacters()) {
                            s += MapleCharacter.makeMapleReadable(chr.getName()) + ", ";
                        }
                        System.out.println(s.substring(0, s.length() - 2));
                    }
                }
                break;
            case "desligar":
                srv.shutdown();
                break;
            case "reiniciar":
                srv.restart();
                break;
            case "exprate":
                c.getWorldServer().setExpRate(Integer.parseInt(sub[1]));
                for (MapleCharacter mc : c.getWorldServer().getPlayerStorage().getAllCharacters()) {
                    mc.setRates();
                }
                Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(1, "[AVISO] A taxa de EXP foi alterada para " + sub[1] + "x"));
                System.out.println("A taxa de EXP foi alterada, mediante CONSOLE EXTERNO, para " + sub[1] + "x");
                break;
            /*case "exprate":
             if (sub.length <= 1) {
             worldServer = srv.getWorld(Integer.parseInt(sub[1]));
             worldServer.setExpRate(Integer.parseInt(sub[2]));//sub[2]
             for (MapleCharacter mc : worldServer.getPlayerStorage().getAllCharacters()) {
             mc.setRates();
             }
             Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "A taxa de EXP foi alterada, mediante CONSOLE EXTERNO, para " + sub[2] + "x"));
             System.out.println("A taxa de EXP foi alterada, mediante CONSOLE EXTERNO, para " + sub[2] + "x");
             }
             break;
             * 
             */
            case "droprate":
                if (sub.length <= 1) {
                    worldServer = srv.getWorld(Integer.parseInt(sub[1]));
                    worldServer.setDropRate(Integer.parseInt(sub[2]));//sub[2]
                    for (MapleCharacter mc : worldServer.getPlayerStorage().getAllCharacters()) {
                        mc.setRates();
                    }
                    Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "A taxa de DROP foi alterada, mediante CONSOLE EXTERNO, para " + sub[2] + "x"));
                    System.out.println("A taxa de DROP foi alterada, mediante CONSOLE EXTERNO, para " + sub[2] + "x");
                }
                break;
            case "mesorate":
                if (sub.length <= 1) {
                    worldServer = srv.getWorld(Integer.parseInt(sub[1]));
                    worldServer.setMesoRate(Integer.parseInt(sub[2]));//sub[2]
                    for (MapleCharacter mc : worldServer.getPlayerStorage().getAllCharacters()) {
                        mc.setRates();
                    }
                    Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "A taxa de MESO foi alterada, mediante CONSOLE EXTERNO, para " + sub[2] + "x"));
                    System.out.println("A taxa de MESO foi alterada, mediante CONSOLE EXTERNO, para " + sub[2] + "x");
                }
                break;
            case "salvarjogo":
                try {
                    for (World world : Server.getInstance().getWorlds()) {
                        for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
                            chr.saveToDB();
                        }
                    }
                    Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Informação] Todos os personagens foram salvos com sucesso!"));
                    System.out.println("[Informação] Todos os personagens foram salvos com sucesso!");
                } catch (Exception e) {
                    System.out.println("[Informação] Ocorreu um erro!");
                }
                break;
            case "servermessage":
                worldServer = srv.getWorld(Integer.parseInt(sub[1]));
                worldServer.setServerMensagem(joinStringFrom(sub, 2));
                break;
            case "noticia":
            case "mensagem":
                try {
                    srv.broadcastMessage(Integer.parseInt(sub[1]), MaplePacketCreator.serverNotice(6, " " + joinStringFrom(sub, 2)));
                    System.out.println("[Informação] " + joinStringFrom(sub, 2));
                } catch (Exception ex) {
                    System.out.println("Insira o mundo correto (geralmente 0)");
                }
                break;
            default:
                return false;
        }
        return true;
    }

    private static String joinStringFrom(String arr[], int start) {
        return joinStringFrom(arr, start, arr.length - 1);
    }

    private static String joinStringFrom(String arr[], int start, int end) {
        StringBuilder builder = new StringBuilder();
        for (int i = start; i < arr.length; i++) {
            builder.append(arr[i]);
            if (i != end) {
                builder.append(" ");
            }
        }
        return builder.toString();
    }
}
