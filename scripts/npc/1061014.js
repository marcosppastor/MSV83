importPackage(Packages.server.events);
var status = 0;
function start(){
    status = 0;
    action(1, 0, 0);
}

function action(mode, type, selection){
    if(mode <= 0){
        cm.dispose();
    } else if(status == 0){
        cm.sendNext("Olá. eu sou #b#nMu Young#n#k, o guarda do templo.");
        status++;
    } else if(BalrogPQ.partyLeader == "undefined"){
        if(status == 1){
        var text = "Este templo está atualmente sob cerco pelas tropas Balrog. Atualmente, não sabemos quem deu as ordens. " +
            "Por algumas semanas, o #e #b A ordem do Altar #n #k vem enviando mercenários, mas eles foram eliminados toda vez." +
            " Então, viajante, você gostaria de tentar sua sorte em derrotar esse horror inimaginário? \r\n\r\n " +
            "#L0#Sim. Por favor registre-me como líder da batalha\r\n#L1#O que é a #e Ordem do altar?";
        cm.sendSimple(text);
        status++;
        } else if(selection == 0){
            if(cm.getPlayer().getLevel() >= 70){
                BalrogPQ.partyLeader = cm.getPlayer().getName();
                cm.sendOk("Sucesso. Seu nome foi registrado e você pode entrar no campo de batalha. Venha falar comigo quando estiver pronto!");
                cm.getPlayer().getMap().broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(0, cm.getPlayer().getName() + " está atualmente lutando contra o balrog no canal " + cm.getPlayer().getClient().getChannel() + ". talvez ele precise de ajuda."))
                BalrogPQ.open(cm.getPlayer());
                
                cm.dispose();
            } else if(cm.getPlayer().getLevel() < 70){
                cm.sendOk("Você deve ter pelo menos o nível 70 para lutar contra o monstro.");
                cm.dispose();
            }
        } else if(selection == 1){
            cm.sendOk("A Ordem do Altar é um grupo de mercenários de elite que supervisionam a economia mundial e as operações de batalha. Foi fundada há 40 anos logo que Black Mage foi derrotado na esperança de ver o próximo possível ataque.");
            cm.dispose();
        } else if(status == 3){
            cm.warp(105100300);
            cm.dispose();
        }
        } else {
            if(status == 1){
            cm.sendYesNo(BalrogPQ.partyLeader + " e seu grupo estão batalhando contra o Balrog. Você gostaria de ajudar?");
            status++;
            } else if(status == 2){
                if(cm.getPlayer().getLevel() > 60 && cm.getPlayer().getClient().getChannel() == BalrogPQ.channel){
                cm.warp(105100300);
                cm.dispose();
                } else {
                    cm.sendOk("Você não pode enfrentar o balrog enquanto estiver abaixo do nível 60! \r\n\r\n Ou talvez você não esteja no canal certo. Tente o canal" + BalrogPQ.channel + ".");
                    cm.dispose();
                }
            }
        }
}  