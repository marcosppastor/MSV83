/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.addon;

import java.lang.StringBuilder;
import java.util.Locale;
import tools.MaplePacketCreator;
import client.MapleCharacter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import tools.FilePrinter;

/**
 *
 * @author FateJiki
 */
public class WordFilter {

    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    private static final SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");

    private final static String[] bloqueados = {"idm", "bms2", "dupe", "dupar", "duplicar", "dupey", "dupei", "dupliquei", "roubar", "roubei", "hacker", "hack", "cheater", "cheatengine", "cheat", "injetor", "dll", "Ganja", "trainer", "timbuspe", "timbus", "blitz", "cheatsbrasil", "webcheats", "packet", "packets", "boot", "bot", "autopot", "ddos"};
    public final static String[] sitesBloqueados = {"idm", "bms2", "dupe", "dupar", "duplicar", "dupey", "dupei", "dupliquei", "roubar", "roubei", "hacker", "hack", "cheater", "cheatengine", "cheat", "injetor", "dll", "Ganja", "trainer", "timbuspe", "timbus", "blitz", "cheatsbrasil", "webcheats", "packet", "packets", "boot", "bot", "autopot", "ddos"};

    public static String illegalArrayCheck(String texto, MapleCharacter jogador) {
        StringBuilder sb = new StringBuilder(texto);
        String subString = texto.toLowerCase();
        if (!containsWebsite(texto, jogador)) {
            for (int i = 0; i < bloqueados.length; i++) {
                if (subString.contains(bloqueados[i].toLowerCase())) {
                    jogador.mensagemCabeca("Nosso sistema de censura bloqueou a palavra: '" + bloqueados[i].toLowerCase() + "'.");
                    sb.replace(sb.indexOf(bloqueados[i].toLowerCase()), sb.lastIndexOf(bloqueados[i].toLowerCase()) + bloqueados[i].length(), "porno");
                }
            }
        }
        return sb.toString();
    }

    public static boolean containsWebsite(String text, MapleCharacter player) {
        boolean sim = false;
        String subString = text.toLowerCase();
        for (int i = 0; i < sitesBloqueados.length; i++) {
            if (subString.contains(sitesBloqueados[i].toLowerCase())) {
                sim = true;
            }
        }
        if (sim) {
            player.getClient().getChannelServer().broadcastGMPacket(MaplePacketCreator.serverNotice(0, "[Atencao] - O jogador(a) " + player.getName() + " acabou de falar uma palavra nao permitida. Verifique!"));
            player.getClient().getChannelServer().broadcastGMPacket(MaplePacketCreator.serverNotice(0, "Ele(a) disse: " + player.getName() + " :" + subString.toString()));
            FilePrinter.printError(FilePrinter.TEXTO_BLOQUEADO + FilePrinter.DIVULGACOES + "", "O jogador " + player.getName() + " usou o texto: " + subString.toString() + "\r\nMapa: " + player.getMapId() + " || Nome: " + player.getMapName(player.getMapId()) + "\r\nLevel: " + player.getLevel() + " || Guild: " + player.getGuild().getName() + " || Mesos: " + player.getMeso() + "\r\nNo dia: " + sdf.format(Calendar.getInstance().getTime()) + " às " + sdf2.format(Calendar.getInstance().getTime()) + "\r\n");
        }
        return true;
    }

}
