/* 
 * To change this template, choose Tools | Templates 
 * and open the template in the editor. 
 */
package server;

import client.MapleCharacter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import net.server.channel.Channel;
import tools.FilePrinter;

/**
 *
 * @author JS-Maple
 */
public class AutoSave {

    private static AutoSave instance;
    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    private static final SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");

    public AutoSave() {
        super();
    }

    public static void main(String[] args) {
        if (instance == null) {
            return;
        }
        instance.run();
    }

    public static void run() {
        for (int i = 0; i < Channel.getAllInstances().size(); i++) {
            for (MapleCharacter character : Channel.getInstance(i).getPlayerStorage().getAllCharacters()) {
                if (character == null) {
                    continue;
                }
                try {
                    character.saveToDB();
                } catch (Exception e) {
                    FilePrinter.printError(FilePrinter.AUTO_SAVE + FilePrinter.FUNCAO_AUTO_SAVE + "", "Erro ao salvar personagem no dia " + sdf.format(Calendar.getInstance().getTime()) + " às " + sdf2.format(Calendar.getInstance().getTime()) + ".\r\nLog de erro: " + e + "\r\n");
                }
            }
        }
    }

    public static void createInstance(AutoSave inst) {
        instance = inst;
    }

    public static AutoSave getInstance() {
        return instance;
    }
}
