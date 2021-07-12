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

/* Lira
 * 
 * Adobis's Mission I : Breath of Lava <Level 2> (280020001)
 * Zakum Quest NPC 
 * Custom Quest 100202 -> Done this stage once
x
 
var status;
 
function start() {
    cm.sendNext("Congratulations on getting this far!  Well, I suppose I'd better give you your #bBreath of Fire#k.  You've certainly earned it!");
}
 
function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1)
            cm.sendNextPrev("Well, time for you to head off.");
        else if (status == 2) {
            cm.gainItem(4031062,1);
            cm.warp(211042300);
            if (cm.isQuestCompleted(100202)) {
                cm.startQuest(100202);
                cm.completeQuest(100202);
                cm.gainExp(10000);
            }
            cm.dispose();
        }
    }
}
*/

/*var rand = Math.floor(Math.random()*100);
function start() {
    status = -1;
    action(1, 0, 0);
}


              
              function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("Ok, não ficarei aqui o dia todo!");
        cm.dispose();
        return;
    }
    
    //if (cm.getMapId()===105040300 && cm.getLevel() <=34) {
    if (status == 0 ) {
	cm.sendSimple("Finalmente você chegou,achei que não iria conseguir,afinal,para descifrar todas as charadas da #bLira #k só um jogador forte e sábio seria capaz..  #b\n\r\n#L0#Receber meu prêmio.");
      
          
    
    } else if (selection == 0) {
            if ( cm.haveItem(4001126,1000 ) && cm.haveItem(4000042,100) && cm.haveItem(4000153 ,100) && cm.haveItem(4000020 ,100) && cm.haveItem(4000069,100) && cm.haveItem(4000106 ,100)) {

        
		cm.gainItem(4001126,-1000);
                cm.gainItem(4000042,-100);
                cm.gainItem(4000153,-100);
                cm.gainItem(4000020,-100);
                cm.gainItem(4000069,-100);
                cm.gainItem(4000106,-100);
                cm.gainItem(1902015,1);
                cm.gainItem(1912011,1);
cm.sendOk("Faça bom uso do seu prêmio,não é comum ganhar um desses hein?, poucos irão conseguir!");
                          

                          cm.dispose();
            }
            
            else {
                cm.sendOk("Parece que você não conseguiu descifrar todas as charadas,o prêmio vale a pena,porém você tem até as #b19PM para conclui-lo,apresse-se!");
	cm.dispose();
            }
        
        

              }
              
              }



function start() {
//cm.gainItem()
cm.sendOk("Olá #h #, tudo bem?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}


function start() {
cm.sendSimple ("Parabéns por completar a Jump Quest da Mansão,deixe espaço livre em seus inventários!.\r\n#L0#Receber meu prêmio#k #l");
}

function action(mode, type, selection) {
cm.dispose();
         if (selection == 0) {
	cm.gainItem(1302063, 1);   
        cm.gainItem(5220000, 3);//Grey HeadBand
	cm.gainItem(2049100,1);   //Yang In
	cm.gainMeso(1000000); //Player Gains 100,000,000
        cm.gainItem (1012147,1,false,false,604800000);
        cm.warp(100000000, 0);

        cm.dispose();
}
         
}
*/

function start() {
//cm.gainItem()
cm.sendOk("Olá #h #, tudo bem?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}