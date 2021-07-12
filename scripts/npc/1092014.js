var status = 0;
var maps = [104000000, 102000000, 100000000, 101000000, 103000000];
var cost = [1000, 1000, 1000, 800, 1000];
var selectedMap = -1;


function start() {
    cm.sendNext("Olá, eu dirijo o Táxi. Se você quiser ir de uma cidade a outra com segurança e rapidez, então pegue nosso táxi. Nós iremos levá-lo ao seu destino com um preço acessível.");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("Há muito a ver nesta cidade também. Volte e encontre-nos quando precisar ir a uma cidade diferente.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            var selStr = "";
            if (cm.getJobId() == 0)
                selStr += "Nós temos um desconto especial para a classe aprendiz.";
            selStr += "Escolha o seu destino, pois as taxas irão mudar de lugar para lugar.#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + " mesos)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("Você não tem mais nada para fazer aqui, hein? Você realmente quer ir para #b#m" + maps[selection] + "##k? Vai custar-lhe #b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " mesos#k.");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getMeso() < (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection])) {
                cm.sendNext("Você não tem mesos suficientes. Desculpe por dizer isso, mas sem eles, você não poderá utilizar o táxi.");
                cm.dispose();
                return;
            }
            if (cm.getJobId() == 0) {
            	mesos = -cost[selectedMap] / 10;
            } else {
            	mesos = -cost[selectedMap];
            }
            cm.gainMeso(mesos);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}