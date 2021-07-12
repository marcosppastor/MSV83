/* 
 * Scripted by Daghlawi



function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1 )
        status++;
    else {
        cm.sendOk("Tem certeza? o evento acabará em breve!");
        cm.dispose();
        return;
    }
    if (cm.getClient().getChannel() == 1) {
if (status == 0 ) {
            cm.sendSimple("Sou o assistente do evento de hoje de #r True MapleStory #k o evento se encerra ás #r 00h #k, confirme sua participação abaixo \n\r #L1#Ir para o mapa do evento \r\n #L2#Não desejo participar ");
      
      
    } else if (selection == 1 ) {
             cm.warp(683000000);
             cm.getPlayer().getMap().addMapTimer(60*120);

             cm.mapMessage(1,"<Instruções >\r\n 1° Para conquistar as recompensas disponiveis hoje, o jogador terá que coletar 50 pedaços de bolo e troca-los por itens.\r\n 2° O premio pode ser retirado com o NPC Candy neste mesmo mapa .\r\n 3° O jogador poderá trocar quantas vezes quiser , até o final do evento, lembrando que os itens irão vir de forma randomica, todos com a mesma porcentagem de serem os premiados. \r\n4° Caso queira sair do evento basta entrar no portal a esquerda. \r\n5° Nos 30 minutos finais aparecera no mapa o BOSS BOLO recheado de itens,bom evento a todos!");
         
               cm.dispose();
            
        
        
        
        } else if (selection == 2 ) {
                          
            cm.dispose();
            
                               
}
}

else {
    
            cm.sendOk("Somente canal 1!");
			
			 */ 
			 
			 

/*
 * @author Marcos d
 * TrueMS - 2016
 * truems.net/
*/
function start() {
cm.sendOk("Até o próximo evento !");
}

function action(m, t, s) {
   
   
   cm.dispose();
}
