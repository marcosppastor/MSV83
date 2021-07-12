/* 
* @Author Lerk
* 
* Shuang, Victoria Road: Excavation Site<Camp> (101030104)
* 
* Start of Guild Quest
*/

var status;
var GQItems = new Array(4001024, 4001025, 4001026, 4001027, 4001028, 4001031, 4001032, 4001033, 4001034, 4001035, 4001037);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) 
        cm.dispose();
     else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) 
            cm.sendSimple("O caminho para Sharenian comeca aqui. O que você gostaria de fazer? #b\r\n#L0#Iniciar a Missão de Clã#l\r\n#L1#Juntar-me aos outros participantes do meu clã.#l");
        else if (status == 1) {
            if (selection == 0) { 
                if (cm.getPlayer().getGuildId() == 0 || cm.getPlayer().getGuildRank() >= 3) { 
                    cm.sendNext("Somente um Mestre ou Jr. da guild pode iniciar.");
                    cm.dispose();
                }
                else {
                    var em = cm.getEventManager("GuildQuest");
                    if (em == null) 
                        cm.sendOk("Esta quest está em construção.");
                     else {
                        if (getEimForGuild(em, cm.getPlayer().getGuildId()) != null) 
                            cm.sendOk("Seu clã ja iniciou esta missão neste canal.\r\nPor favor, tente novamente mais tarde ou acesse em outro canal.")
                        else {
                            var guildId = cm.getPlayer().getGuildId();
                            var eim = em.newInstance(guildId);
                            em.startInstance(eim, cm.getPlayer().getName());
                            var map = eim.getMapInstance(990000000);
                            map.getPortal(5).setScriptName("guildwaitingenter");
                            map.getPortal(4).setScriptName("guildwaitingexit");
                            eim.registerPlayer(cm.getPlayer());
                            cm.guildMessage(6,"Seu clã acaba de entrar na Missão de Clã. Os demais participantes deverão falar com Shuang, no Campo de Escavação, no canal " + cm.getPlayer().getClient().getChannel() + ", para pode entrar.");
                            for (var i = 0; i < GQItems.length; i++) 
                                cm.removeAll(GQItems[i]);
                        }
                    }
                    cm.dispose();
                }
            }
            else if (selection == 1) { 
                if (cm.getPlayer().getGuildId() == 0) { 
                    cm.sendNext("Você deve estar em uma guild para se juntar a quest.");
                    cm.dispose();
                }
                else {
                    var em = cm.getEventManager("GuildQuest");
                    if (em == null)
                        cm.sendOk("Esta quest esta em construção.");
                     else {
                        var eim = getEimForGuild(em, cm.getPlayer().getGuildId());
                        if (eim == null) 
                            cm.sendOk("Atualmente, seu clã não esta registrada para fazer a\r\n#eMissão de Clã.");
                        else {
                            if ("true".equals(eim.getProperty("canEnter"))) {
                                eim.registerPlayer(cm.getPlayer());
                                for (var i = 0; i < GQItems.length; i++)
                                    cm.removeAll(GQItems[i]);
                            }
                            else 
                                cm.sendOk("Lamento, mas seu clã entrou sem você. Aguarde o termino, ou peça para que recomecem a #emissão de clã.#n");
                        }
                    }
                    cm.dispose();
                }
            }
        }
    }
}

function getEimForGuild(em, id) {
    var stringId = "" + id;
    return em.getInstance(stringId);
}