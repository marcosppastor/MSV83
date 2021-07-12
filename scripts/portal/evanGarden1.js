function enter(pi) {
    if (!pi.haveItem(4032451)) {
        pi.getPlayer().dropMessage(6,"Fale com Hen para que voce possa entrar neste portal.");
        return false;
    } else
        pi.warp(100030103,"west00");
    return true;
}