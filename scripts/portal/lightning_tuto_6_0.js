/*
 * @author Marcos P
 * Acre MS - 2016
 * acrems.net/
*/

var chat = -1;

function start() {
    action(1, 0, 0);
}

/* 
 * LEMBRETE:
 * 1 é NPC (final) sem cancel de chat no canto esquerdo;
 * 2 é meu personagem no canto direito com opção de 'end chat';
 * 3 é meu personagem no canto direito SEM opção de 'end chat';
 * 4 é NPC (final) COM cancel de chat no lado direito;
 * 5 utiliza OUTRO NPOC (3º), colocando-o no canto direito sem 'end chat';
 * 5 deixando nulo, utiliza somente o meu personagem.
*/
 
function action(mode, type, selection) {
    if (mode == -1 || mode == 0 && chat == 0) {
        cm.dispose();
        return;
    }
    mode == 1 ? chat++ : chat--;
	if (cm.c.getPlayer().getMapId() == 927020070) {	
    if (chat == 0)
	    cm.sendNextS("#b(What happened?)",5,2159357);
	else if (chat == 1)	
	    cm.sendNextPrevS("#b(I actived all 5 seals.)",3);
	else if (chat == 2)
        cm.sendNextS("#b(Now we jave to force the Black Mage's hand. The onlu way to get him to use his full power is if you Light magic against him.)",5,2159357);
	else if (chat == 3)
        cm.sendNextPrevS("#r#eTHE END IS HERE. MAY IT BE PAINFUL.",5,2159359);
	else if (chat == 4)
        cm.sendNextPrevS("#eDon't worry, Freud.",3);	
	else if (chat == 5)
        cm.sendNextPrevS("#eI end here and now.",3);
    else if (chat == 6) {	
	    cm.warp(101000100,0);
		cm.getPlayer().dropMessage(-1, "YEARS LATER");
	    cm.getPlayer().dropMessage(6, "Talk with Penny.");
	    cm.dispose();
	}
	}
}