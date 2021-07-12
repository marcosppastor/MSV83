/*
ESPIAR INVENTARIO
Criado por Hugo do MadStory/VoidMS
Melhorado por Marcos do OrbisMS
Adaptado para GM Pleno
www.orbisms.net/
*/

var name;
var status = 0;
var thing = 0;
var slot;
var p = null;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 2 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getPlayer().getGMLevel() >= 5) {
                cm.sendGetText("Oi #h #, tudo bem?\r\nRecentemente desenvolvemos este NPC, visando visualizar, de forma pratica, o que determinado jogador possui no inventario.\r\n\Para verificar, insira o #enome do jogador#n.");
            } else {
                cm.sendOk("Ola #h #, tudo bem?");
                cm.dispose();
            }
        } else if (status == 1) {
            name = cm.getText(); 
            p = cm.getCharByName(name);
            if (p != null) {
                cm.sendSimple("Selecione uma das opcoes para analisar o inventario do(a) jogador(a):#b\r\n#L0#Equip#l\r\n#L1#Uso#l\r\n#L2#Setup#l\r\n#L3#ETC#l\r\n#L4#Cash#l\r\n#L5#Oque este jogador esta equipando?#l");
            } else {
                cm.sendOk("#eErro!#n\r\n\r\nPossiveis causas: Jogador offline (1), jogador em outro canal (2) ou nome invalido (3).\r\n\r\nVerifique e tente novamente.");
            }
        } else if (status == 2) {
            string = "Esta es a lista do que o jogador possui.\r\nCaso queira remover algum dos itens, clique no mesmo.\r\n\r\n";
            thing = selection;
            if (selection == 0) {                
                cm.sendSimple(string+cm.EquipList(p.getClient()));
            } else if (selection == 1) {
                cm.sendSimple(string+cm.UseList(p.getClient()));
            } else if (selection == 2) {
                cm.sendSimple(string+cm.SetupList(p.getClient()));
            } else if (selection == 3) {
                cm.sendSimple(string+cm.ETCList(p.getClient()));
            } else if (selection == 4) {
                cm.sendSimple(string+cm.CashList(p.getClient()));
            }            
            else if (selection==5){
               cm.sendSimple(string+cm.Equipado(p.getClient()));
            }
        } else if (status == 3) {
            slot = selection;
            send = "Este jogador possui #r";
			quantidade = "#b";
            send2 = "#k do seguinte item: #i";
			tipo1 = "#i";
            if (thing == 0) {
                send += p.getQuantidadeItem(p.getEquipId(selection), true);
				quantidade += p.getQuantidadeItem(p.getEquipId(selection), true);
                send2 += p.getEquipId(selection);
				tipo1 += p.getEquipId(selection);
            } else if (thing  == 1) {
                send += p.getQuantidadeItem(p.getUseId(selection), true);
				quantidade += p.getQuantidadeItem(p.getUseId(selection), true);
                send2 += p.getUseId(selection);
				tipo1 += p.getUseId(selection);
            } else if (thing == 2) {
                send += p.getQuantidadeItem(p.getSetupId(selection), true);
				quantidade += p.getQuantidadeItem(p.getSetupId(selection), true);
                send2 += p.getSetupId(selection);
				tipo1 += p.getSetupId(selection);
            } else if (thing == 3) {
                send += p.getQuantidadeItem(p.getETCId(selection), true);
				quantidade += p.getQuantidadeItem(p.getETCId(selection), true);
                send2 += p.getETCId(selection);
				tipo1 += p.getETCId(selection);
            } else if (thing == 4) {
                send += p.getQuantidadeItem(p.getCashId(selection), true);
				quantidade += p.getQuantidadeItem(p.getCashId(selection), true);
                send2 += p.getCashId(selection);
				tipo1 += p.getCashId(selection);
            }
            var send3 = "Este(a) jogador(a) possui " + quantidade + " unidades#k de " + tipo1 + "#.\r\nVoce tem certeza que deseja remover " + quantidade + " unidade(s)#k de " + tipo1 + "# do inventario dele(a)?";
            cm.sendYesNo(send3);
        } else if (status == 4) {
            if (thing == 0) { 
                p.deleteAll(p.getEquipId(slot));
            } else if (thing == 1) {
                p.deleteAll(p.getUseId(slot));
            } else if (thing == 2) {
                p.deleteAll(p.getSetupId(slot));
            } else if (thing == 3) {
                p.deleteAll(p.getETCId(slot));
            } else if (thing == 4) {
                p.deleteAll(p.getCashId(slot));
                
                } else if (thing == 5) {
                p.deleteAll(p.getEquipadoId(slot));
            }
            cm.sendOk("Pronto, " + name + ". O item foi #bremovido com sucesso!");
            cm.dispose();
        }
    }
}  