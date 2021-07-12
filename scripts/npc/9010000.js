importPackage(Packages.server.life);
importPackage(Packages.java.lang);
importPackage(Packages.server);
importPackage(Packages.tools);

var status = -1;
var selections = {ITEM: 0, MOB: 1, MAP: 2};
var category;

function start() {
    cm.sendSimple("Selecione uma opção.", "Checar drop de um item especifico", "Checar stats e drops de um monstro especifico", "Checar stats e drops de monstro(s) neste mapa.");
}

function action(m,t,s) {
    if (m == -1 || s == 999)        {
        cm.dispose();
        return;
    } else if (m == 0 || s == 1000 || status == 3 || status == 2 && category == selections.MOB || status == 1 && category == selections.MAP) {
        start();
        status = -1;
    } else {
        status++;
    }
    if (status == 0) { 
        category = s;
        if (category == selections.ITEM) {
             cm.sendGetText("Qual item você deseja procurar?");
        } else if (category == selections.MOB) {
            cm.sendGetText("Qual monstro você deseja procurar?");
        } else if (category == selections.MAP) {
            cm.sendSimple(getMobsInMap());
        }
    } else if (status == 1) {
        if (category == selections.ITEM) {
            cm.sendSimple(searchItem(cm.getText()));
        } else if (category == selections.MOB) {
            cm.sendSimple("Lista de monstros encontrados com o nome inserido:\r\n" + cm.searchMobs(cm.getText()));
        } else if (category == selections.MOB) {
            cm.sendNext(getMobInfo(s));
        }
    } else if (status == 2) {
        if (category == selections.ITEM) {
            cm.sendSimple(mobsThatDrop(s));
        } else if (category == selections.MOB) {
            cm.sendNext(getMobInfo(s));
        }
    } else if (status == 3) {
        if (category == selections.ITEM) {
            cm.sendNext(getMobInfo(s));
        }
    } 
}

function searchItem(item) {
    var text = "Lista de items encontrados com o nome inserido:\r\n";
    var items = MapleItemInformationProvider.getInstance().getAllItems().toArray();
    for (var x = 0, counter = 0; x < items.length; x++) {
        if (counter > 999) {
            text += "#L999##eMUITOS ITENS LISTADOS#n#l";
            break;
        }
        if (items[x].getRight().toLowerCase().contains(item.toLowerCase())) {
            text += "#L"+items[x].getLeft()+"##b" + items[x].getLeft() + "#k - #r#z" + items[x].getLeft() + "##l\r\n";
            counter++;
        }
    }
    return text + "\r\n#L999##bFechar#k" + "\r\n#L1000##bVoltar#k";
}

function getMobsInMap() {
    var text = "Você esta no mapa #m "+ cm.getPlayer().getMapId() +"#.\r\nQual mob voce deseja" +
            " inspecionar?\r\n";
    var mobs = cm.getPlayer().getMap().getUniqueMonsters();
    for (var x = 0; x < mobs.size(); x++)
        text += "\r\n#b#L" + mobs.get(x) + "##o"+ mobs.get(x)+"\r\n";
    text += "\r\n#L999##bFechar#k\r\n#L1000##bVoltar#k";
    return text;
}

function getMobInfo(mobid) {
    var mob = MapleLifeFactory.getMonster(mobid);
    var drop_rate = 1000000 / cm.getPlayer().getDropRate();
    var text =  "Estatisticas do #b#o"+mobid+"##k:\r\n\r\n";
        text += "Level: " + mob.getStats().getLevel() + "\r\n";
        text += "HP: " + mob.getMaxHp() + "\r\n";
        text += "MP: " + mob.getMaxMp() + "\r\n";
        text += "EXP: " + mob.getExp() + "\r\n";
        text += "HP/Taxa de EXP: " + (Math.round((mob.getMaxHp() / mob.getExp() * 10)))/10 + "\r\n";
        text += "\r\n";
        text += "#eLista de drops:#n";
    var drops = MapleMonsterInformationProvider.getInstance().retrieveDrop(mobid).toArray();
    for (var x = 0; x < drops.length; x++)
        text += "\r\n#i" + drops[x].itemId;
    
    var global_drops = MapleMonsterInformationProvider.getInstance().getGlobalDrop().toArray();
    for (var x = 0; x < global_drops.length; x++)
        text += "\r\n#i" + drops[x].itemId;
    return text;
}

function getHarmlessMobInfo(mobid) {
    var mob = MapleLifeFactory.getMonster(mobid);
    var drop_rate = 1000000 / cm.getPlayer().getDropRate();
    var text =  "Estatisticas do #b#o"+mobid+"##k: \r\n\r\n";
        text += "Level: " + mob.getStats().getLevel() + "\r\n";
        text += "HP: " + mob.getMaxHp() + "\r\n";
        text += "MP: " + mob.getMaxMp() + "\r\n";
        text += "EXP: " + mob.getExp() + "\r\n";
        text += "HP/Taxa de EXP: " + (Math.round((mob.getMaxHp() / mob.getExp() * 10)))/10 + "\r\n";
        text += "\r\n";
        text += "#eLista de drop:#n";
    var drops = MapleMonsterInformationProvider.getInstance().retrieveDrop(mobid).toArray();
    for (var x = 0; x < drops.length; x++)
        text += "\r\n#i" + drops[x].itemId;
    
    var global_drops = MapleMonsterInformationProvider.getInstance().getGlobalDrop().toArray();
    for (var x = 0; x < global_drops.length; x++)
        text += "\r\n#i" + drops[x].itemId;
    
    return text;
}

function mobsThatDrop(itemid) {
    var start_time = System.currentTimeMillis();
    var text = "Esta e a lista dos monstros que dropam #e#z"+itemid+"##n\r\n";
    var ps = DatabaseConnection.getConnection().prepareStatement("SELECT dropperid, chance FROM drop_data WHERE itemid = ?");
    ps.setInt(1, itemid);
    var rs = ps.executeQuery();
    
    while (rs.next()) {
        var mobid = rs.getInt("dropperid");
        var chance = rs.getInt("chance")/(1000000/cm.getPlayer().getDropRate()) * 100;
        text += "\r\n#L" + mobid + "##b#o" + mobid + "##k ";
    }
    text += "#b\r\n#L999#Fechar#k#l";
    text += "#e\r\n\r\nPesquisa concluida em " + (System.currentTimeMillis() - start_time)/1000 + " segundos#n";
    rs.close();
    ps.close();
    return text;
}  