
 /* By Daghlawi
 */
function start() { 
    cm.sendSimple("Oque você gostaria de fazer? \r\n #L0# Ir para Masteria, level minimo requerido(100), taxa de custo no valor de 30,000 mesos!  \r\n #L1# Sair"); 
} 

function action(mode, type, selection) { 
    if (mode == 1) { 
        if (selection == 0 && cm.getPlayer().getLevel() >= 70) {
            //cm.gainItem(4000313, 1);
            cm.gainMeso(-30000)
            cm.warp (610020006,0)    
        
        } else if (selection == 1) {
            cm.dispose(); 
        }else {
          cm.sendOk("Desculpe mapa disponível apenas para a jogadores com o nivel 100 ou superior")
          cm.dispose();
       }
    }
}