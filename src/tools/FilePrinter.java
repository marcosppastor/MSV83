package tools;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class FilePrinter {

    public static final String ACCOUNT_STUCK = "Contas não salvas na DB/",
            ERRO_SALVAR_DB = "Contas não salvas na DB.txt",
            EXCEPTION_CAUGHT = "exceptionCaught.txt",
            PARANOIA_CHAT = "chat.log",
            PARANOIA_COMMAND = "commands.log",
            PARANOIA_CONSOLE = "console.log",
            PARANOIA_BLACKLIST = "blacklist/",
            CLIENT_START = "clientStartError.txt",
            ADD_PLAYER = "addPlayer.txt",
            MAPLE_MAP = "mapleMap.txt",
            ERROR38 = "error38.txt",
            PACKET_LOG = "log.txt",
            EXCEPTION = "exceptions.txt",
            PACKET_HANDLER = "Erro ao utilizar codigos/",
            PORTAL = "Portais com problemas/",
            PACKET_LOGS = "Logs de Pacotes/",
            INCUBADORA = "Incubadora/",
            TEXTO_BLOQUEADO = "Mensagens bloqueadas/",
            COMANDOS_USADOS = "Comandos usados/",
            ALERTA_VOTO = "Jogadores que ja votaram/",
            NPC = "NPCs com problemas/",
            INVOCABLE = "Eventos executáveis em .JS/",
            REACTOR = "Reatores com problemas/",
            QUEST = "Quests com problemas/",
            ITEM = "Items com problemas/",
            BOSSES = "Bosses derrotados/",
            PERSONAGENS = "Novos personagens/",
            MOB_MOVEMENT = "mobmovement.txt",
            MAP_SCRIPT = "mapscript/",
            ACESSOS = "Log de acessos/",
            FREDRICK = "Log de acesso Fredrick/",
            ALERTA_HACK = "Possiveis hacks/",
            JOGADOR_BANIDO = "Jogadores banidos/",
            LOG_CPQ = "Registros CPQ/",
            ERRO_LOJAS = "Erro no Mercado Livre",
            MOVIMENTACAO_ARMAZEM = "Armazem/",
            MATOU_BOSS = "Bosses derrotados/",
            DIRECTION = "directions/",
            SENHA = "Acessos com senha mestre/",
            ERRO_METODO = "Erros em metodos/",
            NÃO_CODADO = "NPC's não codados/",
            AUTO_SAVE = "Personagens salvos automaticamente/",
            AJUDA_GM = "Pedidos de ajuda para GM/",
            RELATORIO_BUG = "Relatórios de bugs/",
            RELATORIO_NX = "Relatórios de compra/venda de NX/",
            SALVAR_CHAR = "Personagens não salvos/",
            SAVE_DB = "Personagens salvos/",
            OBTENÇÃO_GACHAPON = "Items obtidos no Gachapon/",
            COMANDOS_GM = "Relatórios de Comandos GM/",
            COMANDO_BUG = "Relatórios de bugs.txt",
            VENDA_NX = "Solicitacao para VENDA de NX.txt",
            COMPRA_NX = "SolicitaÃ§Ã£o para COMPRA de NX.txt",
            SAVE_CHAR = "Personagens nÃ£o salvos.txt",
            ERROS_METODOS = "Erros em metodos.txt",
            ERRO_INCUBADORA = "Erro_Incubadora.txt",
            LOG_INCUBADORA = "Log_Incubadora.txt",
            INFO_CPQ = "Informacoes CPQ.txt",
            ERRO_CPQ = "Log de erro CPQ.txt",
            ERRO_MONSTER_CARNIVAL = "Erro na Folia dos Monstros.txt",
            INFO_MARKET = "Erro Mercado Livre.txt",
            COMANDO_DROP = "Drop de item feito por GM.txt",
            COMANDO_AJUDAGM = "Pedidos de ajuda para GM.txt",
            FUNCAO_AUTO_SAVE = "Personagens salvos automaticamente.txt",
            INSERT_CHAR = "insertCharacter.txt",
            LOAD_CHAR = "loadCharFromDB.txt",
            JÁ_VOTOU = "Jogadores que jÃ¡ votaram.txt",
            NPC_UNCODED = "NPC's não codados.txt",
            ANTI_AFK = "DC_AFK.txt",
            ARMAZEM = "Armazem.txt",
            SAVE_TO_DB = "Personagens salvos.txt",
            DIVULGACOES = "Mensagens bloqueadas.txt",
            SENHA_MESTRE = "Acessos com senha mestre.txt",
            HORN_TAIL = "Horntail derrotado.txt",
            POSSIVEL_HACK = "Possiveis hacks.txt",
            EXPLOITS = "Exploits.txt",
            DAR_NX = "DarNX.txt",
            MESO_SI = "MesoSi.txt",
            MESO_PERSON = "MesoPerson.txt",
            LEVEL_PERSON = "LevelPerson.txt",
            ITEM_OBTIDO_GACHAPON = "Items obtidos no Gachapon.txt",
            ITEM_DROP = "ItemDrop.txt",
            COMANDO_USADO = "Comandos usados por GM.txt",
            SPAWN_MOB = "SpawnMob.txt",
            NOVOS_PERSONAGENS = "Novos personagens.txt",
            REATOR = "Reatores com problemas.txt",
            LOJA_GM = "LojaGM.txt",
            PROCURAR = "Pesquisa.txt",
            PROXY_IPS = "PROTECAO_DDOS.txt",
            LOG_FREDRICK = "Log do Fredrick.txt",
            SESSAO = "Log de acessos.txt",
            EXCEPTION_CPQ = "exceptionCPQ.txt",
            QUEST_UNCODED = "Quests com problemas.txt",
            PIN_LOG = "PIN_LOG/Tentativas.txt",
            DEADLOCK_ERROR = "deadlocks.txt",
            DEADLOCK_STACK = "deadlocks/path.txt",
            DEADLOCK_LOCKS = "deadlocks/locks.txt",
            DEADLOCK_STATE = "deadlocks/state.txt";

    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    private static final String FILE_PATH = "relatórios/" + sdf.format(Calendar.getInstance().getTime()) + "/";// + sdf.format(Calendar.getInstance().getTime()) + "/"
    private static final String ERROR = "Registros/";
    private static final String cpq = "relatórios/PQs/Folia dos Monstros/";
    private static final String printIncubadora = "relatórios/incubadora/" + sdf.format(Calendar.getInstance().getTime()) + "/";// + sdf.format(Calendar.getInstance().getTime()) + "/"
    private static final String printCPQ = "relatórios/festivalCPQ/" + sdf.format(Calendar.getInstance().getTime()) + "/";// + sdf.format(Calendar.getInstance().getTime()) + "/"
    public static final String ALERTA_GM = "alertaGM/alertas.txt";// + sdf.format(Calendar.getInstance().getTime()) + "/"
    private static final String printHacker = "relatórios/hackers/dano/" + sdf.format(Calendar.getInstance().getTime()) + "/";// + sdf.format(Calendar.getInstance().getTime()) + "/"

    public static void printError(final String name, final Throwable t) {
        System.out.println("Erro ao executar NPC\r\nNovo log criado: " + name);
        FileOutputStream out = null;
        final String file = FILE_PATH + ERROR + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(getString(t).getBytes());
            out.write("\n---------------------------------\r\n".getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void printError(final String name, final Throwable t, final String info) {
        FileOutputStream out = null;
        final String file = FILE_PATH + ERROR + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write((info + "\r\n").getBytes());
            out.write(getString(t).getBytes());
            out.write("\n---------------------------------\r\n".getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void printError(final String name, final String s) {
        FileOutputStream out = null;
        final String file = FILE_PATH + ERROR + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(s.getBytes());
            //out.write("\n---------------------------------\n".getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void print(final String name, final String s) {
        print(name, s, true);
    }

    public static void print(final String name, final String s, boolean line) {
        FileOutputStream out = null;
        String file = FILE_PATH + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(s.getBytes());
            out.write("\r\n".getBytes());
            if (line) {
                out.write("---------------------------------\r\n".getBytes());
            }
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    private static String getString(final Throwable e) {
        String retValue = null;
        StringWriter sw = null;
        PrintWriter pw = null;
        try {
            sw = new StringWriter();
            pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            retValue = sw.toString();
        } finally {
            try {
                if (pw != null) {
                    pw.close();
                }
                if (sw != null) {
                    sw.close();
                }
            } catch (IOException ignore) {
            }
        }
        return retValue;
    }

    public static void print(final String file, final Throwable t) {
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(file, true);
            out.write(getString(t).getBytes());
            out.write("\n---------------------------------\n".getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void printIncubadora(final String name, final String s) {
        printIncubadora(name, s, true);
    }

    public static void printIncubadora(final String name, final String s, boolean line) {
        FileOutputStream out = null;
        final String file = printIncubadora + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(s.getBytes());
            out.write("\r\n".getBytes());
            if (line) {
                out.write("-------------------------------------------------------------------------\r\n".getBytes());
            }
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void printCPQ(final String name, final String s) {
        printCPQ(name, s, true);
    }

    public static void printCPQ(final String name, final String s, boolean line) {
        FileOutputStream out = null;
        final String file = printCPQ + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(s.getBytes());
            out.write("\r\n".getBytes());
            if (line) {
                out.write("-------------------------------------------------------------------------\r\n".getBytes());
            }
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void cpq(final String name, final String s) {
        cpq(name, s, true);
    }

    public static void cpq(final String name, final String s, boolean line) {
        FileOutputStream out = null;
        final String file = cpq + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(s.getBytes());
            out.write("\r\n".getBytes());
            if (line) {
                out.write("-------------------------------------------------------------------------\r\n".getBytes());
            }
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void printCPQ(final String name, final Throwable t) {
        FileOutputStream out = null;
        final String file = printCPQ + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(getString(t).getBytes());
            out.write("\n---------------------------------\r\n".getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void printAlerta(final String name, final Throwable t) {
        FileOutputStream out = null;
        final String file = ALERTA_GM + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(getString(t).getBytes());
            out.write("\n---------------------------------\r\n".getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void printHacker(final String name, final String s) {
        printHacker(name, s, true);
    }

    public static void printHacker(final String name, final String s, boolean line) {
        FileOutputStream out = null;
        final String file = printHacker + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(s.getBytes());
            out.write("\r\n".getBytes());
            if (line) {
                out.write("-------------------------------------------------------------------------\r\n".getBytes());
            }
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }
}
