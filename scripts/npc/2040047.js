/*
@	Author : Raz
@
@	NPC = Sgt.Anderson
@	Map =  Abandoned Tower <Stage 1>
@	NPC MapId = 922010100
@	NPC Exit-MapId = 221024500
@
 */
//4001022 - PASS OF DIMENSION

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

         
    if (mode == -1) {//ExitChat
        cm.dispose();
	
    }else if (mode == 0){//No
        cm.sendOk("Tudo bem.\r\nFale comigo novamente caso queira sair deste local.");
        cm.dispose();

    }else{		    //Regular Talk
        if (mode == 1)
            status++;
        else
            status--;
	if(cm.getPlayer().getMap().getId() == 922010000){
            if(status == 0){
		cm.sendNext("Ate a proxima!");
            }else if (status == 1){
		cm.warp(970000102);
		cm.dispose();
            }


        }else{
            if (status == 0) {
		cm.sendYesNo("Voce deseja desistir e sair da Missao de Ludibrium?");
            }else if (status == 1) {
		cm.sendNext("Tudo bem. Ate mais!");
            }else if (status == 2) {
		var eim = cm.getPlayer().getEventInstance();  
		if(eim == null){
                    cm.sendOk("Voce ralou tanto para chegar neste estagio e logo agora vai desistir?\r\nEnfim... voce quem decide.");
		}else{
                    if(isLeader() == true){
                        eim.disbandParty();
						cm.removeAll(4001008);
                    }else{
                        eim.leftParty(cm.getPlayer());
                        cm.removeAll(4001022);
                    }
                    cm.dispose();
		}
	    }else if (status == 3){
	    	cm.warp(970000102);
		cm.removeAll(4001022);
		cm.dispose();
	    }
	}
    }
}

function isLeader(){
    if(cm.getParty() == null){
        return false;
    }else{
        return cm.isLeader();
    }
}