/* 
* @Author Stereo
* Adobis - El Nath: Entrance to Zakum Altar (211042400)
* Start of Zakum Bossfight
*/

var status;
var minLevel = 50;
var state;
var maxPlayers = 10;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
		status++;
        if (mode == 0 && status == 0) {
			cm.sendOk("Até mais!");
            cm.dispose();
            return;
        }
        if (status == 0) {
            if (cm.getPlayer().getLevel() < minLevel && !cm.getPlayer().isGM()) {
                cm.warp(211042300);
                cm.sendOk("Volte quando estiver preparado para enfrentar o Zakum!\r\nPara que voce possa participar, requer-se que voce seja no minimo #eLV. 50#n.");
                cm.dispose();
                return;
            }
            //if(cm.getBossLog('ZAKUM') > 50) {
            //	cm.sendOk("You have entered the Zakum Altar more than 50 times today. You may not enter until tomorrow.");
            //	cm.dispose();
            //	return;
            //  }
            cm.sendSimple("A batalha contra o Zakum comeca aqui!\r\nO que voce gostaria de fazer?#b\r\n#L0#Iniciar a Batalha contra o Zakum#l\r\n#L1#Entrar em um Grupo que esteja lutando contra o Zakum#l");
        }
        else if (status == 1) {
            state = selection;
            if (selection == 0) {//Start
                cm.sendGetText("Para ir ate o Zakum, voce precisara escolher um nome para a instancia da sua batalha. Esta sera basicamente a senha de acesso para que outras pessoas possam lhe ajudar, entrando em sua batalha por meio da senha.");
	}
            else if (selection == 1) {//Join
                cm.sendGetText("Para participar de uma batalha, voce precisara da senha da instancia criada. Caso voce nao saiba, pergunte ao lider do grupo que esta a batalhar.");
		}
        }
        else if (status == 2) {
            var em = cm.getEventManager("ZakumBattle");
            var passwd = cm.getText();
            if (em == null)
                cm.sendOk("Esta missão esta temporariamente desativada.");
            else {
                if (state == 0) { // Leader
                    if (getEimForString(em,passwd) != null)
                        cm.sendOk("Você não pode usar esta senha para sua instancia.");
                    else {
                        var eim = em.newInstance("Zakum" + passwd);
                        em.startInstance(eim,cm.getPlayer().getName());
                        eim.registerPlayer(cm.getPlayer());
                    //	cm.setBossLog('ZAKUM');
					    cm.dispose();
                    }
                }
                if (state == 1) {
                    var eim = getEimForString(em,passwd);
                    if (eim == null)
                        cm.sendOk("Nao ha nenhuma batalha registrada com este nome.");
					    //cm.dispose();
                    else {
                        if (eim.getProperty("canEnter").toLowerCase() == "true") {
                            if (eim.getPlayers().size() < maxPlayers)
                                eim.registerPlayer(cm.getPlayer());
                            //  cm.setBossLog('ZAKUM');
                            else
                                cm.sendOk("Lamento, mas esta batalha ja esta cheia de participantes. Inicie uma ou aguarde vaga.");
                        }
                        else
                            cm.sendOk("Lamento, mas esta batalha ja esta em progresso. Aguarde ate o fim desta.");
                    }
                }
            }
        }
    }
}

function getEimForString(em, name) {
    var stringId = "Zakum" + name;
    return em.getInstance(stringId);
}