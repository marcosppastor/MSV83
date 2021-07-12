/*
var rand = Math.floor(Math.random()*100);
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
	cm.sendSimple("#r Não se esqueça de presta atenção em todos os detalhes ditos no texto #k,eu sou o encarregado de iniciar o evento.Para todos poderem participar, para todos terem tempo de participar o evento acontecerá das #b 8AM-19PM:#k #b \r\n\r\n#L0#Desejo ir para o evento.#l\r\n\#L1#Obter informações sobre o evento.#l");
      
          
    
    } else if (selection == 0) {
                      cm.warp(280020000,0);
                      cm.gainItem(4032055,1);
                      cm.mapMessage(1,"[Etapa Física] \r\n Nesta primeira etapa, o jogador deve enfrentar o desafio da JQ de lava.A única maneira de chegar ao proximo estagio é falando com a NPC no fim desta missão,la você vai encontrar enigmas no qual o conduzirão a certos lugares,o jogador deve ser esperto para não ceder.");
		
	
cm.dispose();
            
        
} else if (selection == 1) {
      
                      

                      cm.sendOk("Nesta primeira etapa do evento você deve enfrentar um dificil exercicio,não são todos que conseguem, para começar lhe darei um  ticket #i4032055# você deve entrega-lo ao NPC localizado no mapa final para onde te levarei.");
                      cm.dispose();
                  }
              }


*/function start() {
//cm.gainItem()
cm.sendOk("Olá #h #, tudo bem?");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}