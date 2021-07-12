package net.server;

import config.game.Messages;
import java.io.Console;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 *
 * @author kevintjuh93
 */
public class CreateINI {

    public static void main(String args[]) {
        StringBuilder sb = new StringBuilder();
        String nextline = "\r\n";//Because I can, and it's free.
        byte worlds;
        Console con = System.console();

        System.out.println("Bem vindo ao criador de console do MapleStory v0." + Messages.V_ORIGENS + ".\r\n\r\n");
        sb.append("#Creditos ao kevintjuh93, criador do CreateINI.java\r\n");
        sb.append("#Tipos de bandeira de selecao de canal: 0 = nada, 1 = evento, 2 = novidades, 3 = super novidades\r\n\r\n");

        System.out.println("Tipos de bandeira de selecao de canal: 0 = nada, 1 = evento, 2 = novidades, 3 = super novidades\r\n\r\n");

        worlds = Byte.parseByte(con.readLine("Quantidade de Mundos: "));
        sb.append("worlds=").append(worlds).append("\r\n\r\n");

        System.out.println("\r\n");

        for (byte b = 0; b < worlds; b++) {
            sb.append("#Propriedades para o mundo ").append(b).append("\r\n");

            System.out.println("Propriedades para o mundo " + b);
            if (b > 1) {
                System.out.println("E necessario uma pasta contendo scripts de NPC neste mundo!");
            }
            sb.append("flag").append(b).append("=").append(
                    Integer.parseInt(con.readLine("   Bandeira de selecao de canal: "))).append("\r\n");

            sb.append("servermessage").append(b).append("=").append(
                    con.readLine("   Mensagem do Servidor: ")).append("\r\n");

            sb.append("eventmessage").append(b).append("=").append(
                    con.readLine("   Mensagem de Evento: ")).append("\r\n");

            sb.append("whyamirecommended").append(b).append("=").append(
                    con.readLine("   Mensagem Recomendada: ")).append("\r\n");

            sb.append("channels").append(b).append("=").append(
                    Byte.parseByte(con.readLine("   Quantidade de canais: "))).append("\r\n");

            sb.append("exprate").append(b).append("=").append(
                    Integer.parseInt(con.readLine("   Taxa de EXP: "))).append("\r\n");

            sb.append("droprate").append(b).append("=").append(
                    Integer.parseInt(con.readLine("   Taxa de DROP: "))).append("\r\n");

            sb.append("mesorate").append(b).append("=").append(
                    Integer.parseInt(con.readLine("   Taxa de MESO: "))).append("\r\n");

            sb.append("bossdroprate").append(b).append("=").append(
                    Integer.parseInt(con.readLine("   Taxa de DROP BOSS: "))).append("\r\n");

            System.out.println(nextline);
            sb.append("\r\n");
        }

        sb.append("\r\n").append("gmserver=").append(Boolean.parseBoolean(con.readLine("Deseja fazer deste um 'gm server'? (true/false)")));
        FileOutputStream out = null;
        try {
            out = new FileOutputStream("propriedades.ini", false);
            out.write(sb.toString().getBytes());
        } catch (Exception ex) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ex) {
            }
        }

        sb = new StringBuilder();
        try {
            System.out.println("\r\nCaso voce nao entenda o que e Java Heap Size, digite '?'.");
            String heapsize = con.readLine("Java Heap Size (em MB): ");
            while (heapsize.equals("?")) {
                System.out.println("\r\n");
                System.out.println("WikiAnswers: Java heap is the heap size allocated to JVM applications which takes care of the new objects being created. If the objects being created exceed the heap size, it will throw an error saying memoryOutof Bound\r\n");
                System.out.println("Caso voce tenha um sistema 64bits e 4GM de RAM, recomendo 4000 MB");
                heapsize = con.readLine("Java Heap Size (em MB): ");
            }
            String linux = con.readLine("\r\nVoce esta usando a plataforma Linux? (y/n):");
            while (!linux.equals("y") && !linux.equals("n")) {
                System.out.println("Use 'y' caso seja Linux, se nao,  'n'.");
                linux = con.readLine("Voce esta usando a plataforma Linux, ou nao? (y/n):");
            }
            if (linux.equals("n")) {
                out = new FileOutputStream("[MapleStory v0." + Messages.V_ORIGENS + "] INICIAR CONSOLE.bat", false);
                sb.append("@echo off").append("\r\n").append("@title MapleStory v0." + Messages.V_ORIGENS + " v0." + Messages.V_ORIGENS + "").append("\r\n");
                sb.append("set CLASSPATH=.;dist\\*\r\n");
                sb.append("java -Xmx").append(heapsize).append("m -Dwzpath=wz\\ net.server.Server\r\n");
                sb.append("pause");
            } else {//test
                out = new FileOutputStream("[MapleStory v0." + Messages.V_ORIGENS + "] INICIAR CONSOLE.sh", false);
                sb.append("#!/bin/sh").append("\r\n\r\n");
                sb.append("export CLASSPATH=\".:dist/*\" \r\n\r\n");
                sb.append("java -Dwzpath=wz/ \\\r\n");
                sb.append("-Xmx").append(heapsize).append("m ").append("net.server.Server");
                System.out.println("Use DOS2UNIX command to convert the .sh file once again.");
            }
            out.write(sb.toString().getBytes());
        } catch (Exception ex) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ex) {
            }
        }
        System.out.println("\r\nTenha certeza que voce configurou o ServerConstants. Caso nao, edite e compile.");
        System.out.println("Caso queira mudar alguma propriedade, edite o arquivo propriedades.ini");
    }
}
