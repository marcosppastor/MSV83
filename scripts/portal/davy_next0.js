	


function enter(pi) {
    var mobCount = pi.countMonster();
    var reactorCount = pi.countReactor();
            
    if (mobCount < 1) {
	pi.warp(925100100,0); //next
    } else {
	pi.playerMessage(5, "O portal ainda não esta aberto, mate todos os monstros e quebre todas as caixas!");
    }
}