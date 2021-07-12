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
//BY MOOGRA
/* Robeira
	Magician 3rd job advancement
	El Nath: Chief's Residence (211000001)
	Custom Quest 100100, 100102
*/

var status = 0;
var jobName;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var jobId=cm.getPlayer().getJob().getId();
    if (mode == -1) {
        cm.sendOk("Volte se você mudar de ideia.\r\n\r\n Boa sorte em suas aventuras.");
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("#eOlá #r#h ##k, sou a responsável pela evolução da sua terceira classe.");
        } else if (status == 1) {
            if ( cm.getLevel() < 70) {
               cm.sendNext("Desculpe você precisa estar no nivel 70 para usar os meus servicos.");
               cm.dispose ();
               
            }
                
                if(status==1) {
                
                if (cm.getJobId() == 210) {
                
                cm.changeJobById(211);
                cm.sendOk("Você atingiu o level necessário,agora você é um Mago de fogo e veneno!");
                cm.dispose();
                
                }   
                
               
                if (cm.getJobId() == 220) {
                cm.changeJobById(221);
                cm.sendOk("Você atingiu o level necessário,agora você é um Mago de gelo e raio!");
                cm.dispose();
                }
                
                if (cm.getJobId() == 230) {
                cm.changeJobById(231);
                cm.sendOk("Você atingiu o level necessário,agora você é um Sacerdote!");
                cm.dispose();
                }
                
                                
                    
                
            
                        
            
              
    
}
    

    }
    
        }
    
}