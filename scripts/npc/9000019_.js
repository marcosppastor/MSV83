var compchoice; 
var playerchoice; 
var Frock = "#fUI/UIWindow.img/RpsGame/Frock#"; 
var Fpaper = "#fUI/UIWindow.img/RpsGame/Fpaper#"; 
var Fscissor = "#fUI/UIWindow.img/RpsGame/Fscissor#"; 
var rock = "#fUI/UIWindow.img/RpsGame/rock#"; 
var paper = "#fUI/UIWindow.img/RpsGame/paper#"; 
var scissor = "#fUI/UIWindow.img/RpsGame/scissor#"; 
var win = "#fUI/UIWindow.img/RpsGame/win#"; 
var lose = "#fUI/UIWindow.img/RpsGame/lose#"; 
var draw = "#fUI/UIWindow.img/RpsGame/draw#"; 
var spacing = "                                   "; 
var beta = "#fUI/UIWindow.img/BetaEdition/BetaEdition#\r\n"; 
var status = -1;
var winmatch = false; 
var losematch = false 
var drawmatch = false; 
var ids = [1382001,1002064,1050049,1302027,1051023,1332013,1312001,1040080,1061087,1050054,1051047, 1312030,1050008,1051027,1051055,1372003,1061083,1050055,1442017,1442009,1372010,2022113, 1302019,1051017,1002245,1002084,1050056,1422005,2000005,1002028,2002018,1050003,1002143, 1322010];


function start() { 
    cm.sendNext(beta + "Ola. Sou o administrador do BETA Real Maple Story..."); 
} 

function action(mode, type, selection) {
    if (mode != 1) {
        if (status == 1)
            cm.sendOk("Ok. Ate!"); 
        cm.dispose();
        return;
    } else
        status++;
    if (status == 0) { 
            cm.sendAcceptDecline("Vamos jogar pedra papel ou tesoura? Você pode ganhar 50000 mesos, ou perder 5000 mesos"); 
    } else if (status == 1) { 
            cm.sendSimple("Escolha um...\r\n" 
            + "#L0##fUI/UIWindow.img/RpsGame/Frock##l" 
            + "#L1##fUI/UIWindow.img/RpsGame/Fpaper##l" 
            + "#L2##fUI/UIWindow.img/RpsGame/Fscissor##l" 
            ); 
    } else if (status == 2) { 
        if (selection == 0) { 
            playerchoice = "rock"; 
        } else if (selection == 1) { 
            playerchoice = "paper"; 
        } else if (selection == 2) { 
            playerchoice = "scissor"; 
        } 
        var random = Math.floor(Math.random()*4); 
        if (random <= 1) { 
            compchoice = "rock"; 
        } else if (random <= 2) { 
            compchoice = "paper"; 
        } else if (random <= 4) { 
            compchoice = "scissor"; 
        } 
        cm.sendNext("E os resutasdos são..."); 
    } else if (status == 3) { 
        if (playerchoice == "rock" && compchoice == "rock") { 
            cm.sendOk(Frock + spacing + rock + draw); 
            drawmatch = true; 
        } else if (playerchoice == "rock" && compchoice == "paper") { 
            cm.sendOk(Frock + spacing + paper + lose); 
            losematch = true; 
        } else if (playerchoice == "rock" && compchoice == "scissor") { 
            cm.sendOk(Frock + spacing + scissor + win); 
            winmatch = true; 
        } else if (playerchoice == "paper" && compchoice == "rock") { 
            cm.sendOk(Fpaper + spacing + rock + win); 
            winmatch = true; 
        } else if (playerchoice == "paper" && compchoice == "paper") { 
            cm.sendOk(Fpaper + spacing + paper + draw); 
            drawmatch = true; 
        } else if (playerchoice == "paper" && compchoice == "scissor") { 
            cm.sendOk(Fpaper + spacing + scissor + lose); 
            losematch = true; 
        } else if (playerchoice == "scissor" && compchoice == "rock") { 
            cm.sendOk(Fscissor + spacing + rock + lose); 
            losematch = true; 
        } else if (playerchoice == "scissor" && compchoice == "paper") { 
            cm.sendOk(Fscissor + spacing + paper + win); 
            winmatch = true; 
        } else if (playerchoice == "scissor" && compchoice == "scissor") { 
            cm.sendOk(Fscissor + spacing + scissor + draw); 
            drawmatch = true; 
        } else { 
            cm.sendOk("Error"); 
        } 
    } else if (status == 4) { 
        if (losematch == true) 
            cm.gainMeso(-5000);
        if (winmatch == true)
            cm.gainMeso(50000);
        cm.dispose();
    }
}