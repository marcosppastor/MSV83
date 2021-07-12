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
    if (chat == 0)
	    cm.sendNextS("The heavens have set the perfect stage for our final confrontation...",3);
	else if (chat == 1)	
	    cm.sendNextPrevS("Luminous Hystory:\r\nLike the other heroes, Luminous was one of the six heroes to seal the Black Mage.",5,2159353);
	else if (chat == 2)
		cm.sendNextPrevS("With instructions from Freud, Luminous and Phantom arrive last and idly wait at the entrance of the Temple of Time.",5,2159353);
	else if (chat == 3)
		cm.sendNextPrevS("Phantom soundly vanishes, but Guwaru, one of the Black Mage's Commanders, appears and challenges Luminous.",5,2159353);
	else if (chat == 4)
		cm.sendNextPrevS("Before they fight, Magnus, another of the Commanders, arrives and kills Guwaru and absorbs his essence.",5,2159353);
	else if (chat == 5)
		cm.sendNextPrevS("Luminous attacks Magnus, to no avail, and the Black Mage Commander tells him that he is finished with the Maple World before leaving.",5,2159353);
	else if (chat == 6)
		cm.sendNextPrevS("As Luminous presses on, he finds Aran struggling with soldiers. She informs him that Freud and Mercedes have already engaged the Black Mage and urges him on while she holds off the Mage's minions.",5,2159353);
	else if (chat == 7)
        cm.sendNextS("Upon entering the Black Mage's throne room, Luminous finds the injured Freud, Mercedes, and Me(Demon). Freud speaks to Luminous telepathically and tells him to seal off the Black Mage once and for all. Freud borrows power from the Goddess of Time and freezes time itself so Luminous can perform the sealing spell.",5,2159358);
	else if (chat == 8)
        cm.sendNextPrevS("After activating the seals, Freud requests Luminous to fight the Black Mage in order for him to use his full power, in which Freud will use the power of time against him and seal him once and for all. However, when the Black Mage attempts to break free, Luminous is forced to physically clash him. The Black Mage is defeated once and for all, but Luminous is tainted in the process...",5,2159357);
    else if (chat == 9) {	
		cm.warp(927020050,0);
	    cm.dispose();
	}
}


