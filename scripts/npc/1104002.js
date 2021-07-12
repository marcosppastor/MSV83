/*
var status = -1;
var ask = "Oh,vejo que você ganhou poder facilmente,gostaria de avançar para a próxima classe?";
var job;
var koc 

function start() {
   cm.sendNext("Hey #e#h ##n, Eu sou a responsável pela evolução da classe de ARAN em MapleStory.");
}

function action(m, t, s) {
    status++;
    if (m != 1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (cm.getJobId() < 1000 ||cm.getJobId() % 10 == 2) {
            cm.dispose();
        } else if (cm.getJobId() % 10 == 1 && cm.getJobId() < 2000) {
            cm.dispose();
        } else if (cm.getJobId() % 1000 == 0 && cm.getJobId() != 0 && cm.getLevel() >= 10) {
            if (cm.getJobId() == 1000) {
                for (var i = 1; i < 6; i++)
                




                var list = "What class of Cygnus Knight do you wish to advance to?";
                for (var k = 0; k < koc.length; k++)
                list += "\r\n#L" + k + "#" + cm.getJobName(koc[k]) + "#l";
                cm.sendSimple(list);
            } else if (cm.getJobId() == 2000) {
                job = cm.getJobId() + 100;
                koc.push(cm.getJobId() + 100 * i);
                cm.teachSkill(21000002 ,0,20);
         	cm.teachSkill(21000000,0,10);
                cm.teachSkill(21001001 ,0,15);
            	cm.teachSkill(21001003 ,0,20);
                
            }
        else
            cm.dispose();
        } else if (cm.getJobId() % 1000 != 0) {
            if (cm.getJobId() % 100 == 0 && cm.getLevel() >= 30) {
                job = cm.getJobId() + 10;
                cm.sendYesNo(ask);
                cm.teachSkill(21100001,0,20);
         	cm.teachSkill(21100000,0,20);
                cm.teachSkill(21100002,0,30);
            	cm.teachSkill(21101003,0,20);
                cm.teachSkill(21100004,0,20);
            	cm.teachSkill(21100005,0,20);
                
                
                
            } else if (cm.getJobId() % 10 == 0 && cm.getLevel() >= 70) {
                job = cm.getJobId() + 1;
                cm.sendYesNo(ask);
            } else if (cm.getJobId() % 10 == 1 && cm.getJobId() >= 2000 && cm.getLevel() >= 120) {
                job = cm.getJobId() + 1;
                cm.sendYesNo(ask);
            }
        }
    } else if (status == 1) {
        if (cm.getJobId() != 1000) {
            if (cm.getJobId() == 2000) {
                cm.changeJobById(job);
                cm.maxMastery();
                cm.resetStats();
                cm.dispose();
            } else {
                cm.changeJobById(job);
                cm.dispose();
            }
        } else if (cm.getJobId() == 1000) {
            cm.changeJobById(koc[s]);
            cm.resetStats();
            cm.dispose();
        }
    }
}  
*/

var status = -1;
var ask = "Oh,vejo que você ganhou poder facilmente,gostaria de avançar para a próxima classe?";
var job;
var koc 

function start() {
   cm.sendNext("Hey #e#h ##n, Eu sou a responsável pela evolução da classe de ARAN em MapleStory.");
}

function action(m, t, s) {
    status++;
    if (m != 1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (cm.getJobId() < 1000 ||cm.getJobId() % 10 == 2) {
            cm.dispose();
        } else if (cm.getJobId() % 10 == 1 && cm.getJobId() < 2000) {
            cm.dispose();
        } else if (cm.getJobId() % 1000 == 0 && cm.getJobId() != 0 && cm.getLevel() >= 10) {
            if (cm.getJobId() == 1000) {
                for (var i = 1; i < 6; i++)
                koc.push(cm.getJobId() + 100 * i);
                var list = "What class of Cygnus Knight do you wish to advance to?";
                for (var k = 0; k < koc.length; k++)
                list += "\r\n#L" + k + "#" + cm.getJobName(koc[k]) + "#l";
                cm.sendSimple(list);
            } else if (cm.getJobId() == 2000) {
                job = cm.getJobId() + 100;
                cm.sendYesNo(ask);
                cm.gainItem(1003031,1);
                
                cm.teachSkill(21000002,0,20,-1);
         	cm.teachSkill(21000000,0,10,-1);
                cm.teachSkill(21001001 ,0,15,-1);
            	cm.teachSkill(21001003 ,0,20,-1);
            }
        else
            cm.dispose();
        } else if (cm.getJobId() % 1000 != 0) {
            if (cm.getJobId() % 100 == 0 && cm.getLevel() >= 30) {
                job = cm.getJobId() + 10;
                cm.sendYesNo(ask);
                cm.teachSkill(21100001,0,20,-1);
         	cm.teachSkill(21100000,0,20,-1);
                cm.teachSkill(21100002,0,30,-1);
            	cm.teachSkill(21101003,0,20,-1);
                cm.teachSkill(21100004,0,20,-1);
            	cm.teachSkill(21100005,0,20,-1);
            } else if (cm.getJobId() % 10 == 0 && cm.getLevel() >= 70) {
                job = cm.getJobId() + 1;
                cm.teachSkill(21110002,0,20,-1);
            
                cm.teachSkill(21110007 ,1,1,-1);
                cm.teachSkill(21110008 ,1,1,-1);



                
                cm.sendYesNo(ask);
            } else if (cm.getJobId() % 10 == 1 && cm.getJobId() >= 2000 && cm.getLevel() >= 120) {
                job = cm.getJobId() + 1;
                cm.sendYesNo(ask);
                cm.teachSkill(21120009,1,1,-1);
                cm.teachSkill(21120010,1,1,-1);

            }
        }
    } else if (status == 1) {
        if (cm.getJobId() != 1000) {
            if (cm.getJobId() == 2000) {
                cm.changeJobById(job);
                //cm.maxMastery();
                cm.resetStats();
                cm.dispose();
            } else {
                cm.changeJobById(job);
                cm.dispose();
            }
        } else if (cm.getJobId() == 1000) {
            cm.changeJobById(koc[s]);
            cm.resetStats();
            cm.dispose();
        }
    }
}  