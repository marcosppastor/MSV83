/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Twilight of the gods
	Description: 		Pink Bean
 */
importPackage(java.lang);
importPackage(Packages.server);
 
var arena;

function start() {

cm.sendSimple ("Bem-vindo ao #rCrepusculo dos deuses#k , eu sou o Forgotten Temple Keeper. Darei inicio a expedição quando o lider estiver pronto!\r\n#L0#Invocar o  Pink Bean#l\r\n#L1#Sair da expedição #l");
}


function action(mode, type, selection) {
	  cm.dispose();
	if (selection == 0 ) {
                    if (cm.getPlayer().getMap().getMonsterCount() == 0) {      
                        
                        cm.spawnMonster(8820001,9, -160);
                        cm.dispose();
	}else {
            cm.sendOk("Já há um #rPinkBean#k neste mapa.")
        }
    }
     else   if (selection == 1 ) {
            var eim = cm.getPlayer().getEventInstance();

         
            if (cm.getPlayer().getMap().getCharacters().size() < 1){
            eim.dispose();
        }
        if (cm.getPlayer().getEventInstance() != null){
            cm.getPlayer().getEventInstance().removePlayer(cm.getPlayer());
        } else{
            cm.warp(270040100   );
        cm.dispose();
    }
}
        

         
        
     
}