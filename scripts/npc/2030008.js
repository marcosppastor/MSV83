/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/


function start() {
    if (cm.c.getPlayer().getMapId() == 211042300 || cm.c.getPlayer().getMapId() == 211042300)
        cm.sendYesNo("Visando facilitar a vida dos jogadores, removemos as missoes do ZK!\r\nPara entrar no Templo, será necessário apenas\r\n#r1 Olho de Fogo#k.\r\nPor acaso, você deseja comprar #r1 Olho de Fogo#k, para ter acesso ao #eTemplo do Zakum?. O preço é 20.000.000 mesos");
}

function action(mode, type, selection) {
    if(mode != 1){
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 211042300){
        if(cm.getMeso() >= 20000000 && cm.canHold(4001017)){
            cm.gainMeso(-20000000);
            cm.gainItem(4001017,1);
	        
            cm.sendOk("Pronto. Agora você pode entrar no Templo do Zakum sem nenhuma restrição!");
			cm.dispose();
        }else
            cm.sendNext("Você não possui #bmesos#k. suficientes, ou seu inventário está cheio");
    }else{
        cm.warp(cm.c.getPlayer().getMapId() == 211042300 ? 211042300 : 211042300);
    }
    cm.dispose();
}

*/

/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Adobis
 * 
 * El Nath: The Door to Zakum (211042300)
 * 
 * Zakum Quest NPC 
*/

var status;
var mapId = 211042300;
var tehSelection = -1;
var nomeServer = "Zakum";

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("Cuidado, pois o poder de #b" + nomeServer + "#k ainda reina sobre este mundo... #b\r\n#L0#Entrar - Desconhecida Mina dos Mortos (Est. 1)#l\r\n#L1#Encare o Sopro da Lava (Est. 2)#l\r\n#L2#Criar os Olhos de Fogo (Est. 3)#l \r\n #L3#Comprar olho de fogo #r(20M)#k#l");						
		}
		else if (status == 1) {
			tehSelection = selection;
			if (selection == 0) { 
				if (cm.getParty() == null) { 
					cm.sendOk("Por favor, fale comigo depois de ter formado um grupo.");
					cm.dispose();
				}
				else if (!cm.isLeader()) { 
					cm.sendOk("Por favor,peca o lider do seu grupo para falar comigo.");
					cm.dispose();
				}
				else {
				if (cm.getPlayer().getItemQuantity(4031061,false) ==0) {
					var party = cm.getParty().getMembers();
					var mapId = cm.getChar().getMapId();
					var next = true;
					
					for (var i = 0; i < party.size() && next; i++) {
						if ((party.get(i).getLevel() < 50) || (party.get(i).getMapid() != mapId)) {
							next = false;
						}
					}
					
					if (next) {
						var em = cm.getEventManager("ZakumPQ");
						if (em == null) {
							cm.sendOk("Este desafio está atualmente em construção.");
						} else {
							em.startInstance(cm.getParty(), cm.getChar().getMap());
							party = cm.getChar().getEventInstance().getPlayers();
							if (cm.getChar().isGM() == false) {
								cm.removeFromParty(4001015, party);
								cm.removeFromParty(4001018, party);
								cm.removeFromParty(4001016, party);
							}
						}
						cm.dispose();
					}
					else {
						cm.sendNext("Certifique-se de todos os seus membros sao qualificados para comecar meus ensaios ...");
						cm.dispose();
					}
				}else {
                                    cm.sendOk("Você já possui um fragmento de olho, tente a próxima etapa da missão de #r Adobis #k.");

                                }
			}
                    }  
            
			else if (selection == 1) { //Zakum Jump Quest
				if (cm.getPlayer().getItemQuantity(4031061,false) ==1 && cm.getPlayer().getItemQuantity(4031062,false) ==0) {
					cm.sendYesNo("Gostaria de tentar o desafio mais dificil de sua vida?");
				} else {
					cm.sendOk("Você deve terminar a #bMina do Mortos#k primeiro e coletar o fragmento do olho, também sera necessário que você não possua nenhum #r sopro de lava#k,caso ja tenha algum, tente a próxima etapa da missão.");
					cm.dispose();
				}
			}else if (selection == 2) { //Golden Tooth Collection [4000082]
				if (cm.getPlayer().getItemQuantity(4031062,false) ==1) {
					if (!cm.haveItem(4000082, 30)) {
						cm.sendOk("Estamos prestes a enfrentar #rZakum#k.Colete #r30#k #bDentes dourados de zombie#k\r\na partir de #rZombies mineradores#k na #b Mina dos mortos#k. Uma vez que você tiver feito isso, volte ate mim .\r\n#bBoa sorte#k!");
						cm.dispose();
					} else {
						if (cm.haveItem(4031061, 1) && cm.haveItem(4031062, 1) && cm.haveItem(4000082, 30)) {
							cm.sendNext("Uau, você fez isso ! Aqui esta o #r Olho de fogo #k como recompensa . Basta soltar esse Olho no  #rZakum Altar#k, e #rZakum#k sera invocado.\r\n#rBoa sorte na luta contra ele!#k");
							cm.gainItem(4031061, -1);
							cm.gainItem(4031062, -1);
							cm.gainItem(4000082, -30);
							cm.gainItem(4001017, 1);
							cm.dispose();
						}
					}
				} else {
					cm.sendOk("Por favor, tente ir para o #rSopro da Lava#k antes de tentar essa busca você não poderá ter mais de um fragmento de olho nem mais de um sopro de lava em seu inventário.");
					cm.dispose();
				}
			}
                        
                        
                        else if (selection == 3) {
                    
                      
                
                if (cm.c.getPlayer().getMapId() == 211042300){
        if(cm.getMeso() >= 20000000 && cm.canHold(4001017)){
            cm.gainMeso(-20000000);
            cm.gainItem(4001017,1);
	        
            cm.sendOk("Pronto. Agora você pode entrar no Templo do Zakum sem nenhuma restrição!");
			cm.dispose();
        }else
            cm.sendNext("Você não possui #bmesos#k. suficientes, ou seu inventário está cheio");
    }else{
        cm.warp(cm.c.getPlayer().getMapId() == 211042300 ? 211042300 : 211042300);
    }
    cm.dispose();
}
		} else if (status == 2) {
			if (tehSelection == 1) {
					cm.warp(280020000, 0);
					cm.dispose();
			}
		}
                
                
                
	}
}