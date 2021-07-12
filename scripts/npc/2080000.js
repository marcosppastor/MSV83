/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var status = 0;
var selectedType = -1;
var selectedItem = -1;
var stimulator = false;
var item;
var mats;
var matQty;
var cost;
var stimID;

function start() {
    var selStr = "O poder de um dragão não deve ser subestimado. Se você quiser, posso adicionar seu poder a uma de suas armas. No entanto, a arma deve ser suficientemente poderosa para manter sua potencialidade...#b"
    var options = new Array("O que é um estimulador?","Criar uma arma de Guerreiro","Criar uma arma de Arqueiro","Criar uma arma de Mago","Criar uma arma de Gatuno",
        "Criar uma arma de guerreiro com estimulador","Criar uma arma de arqueiro com estimulador","Criar uma arma de mago com estimulador","Criar uma arma de gatuno com estimulador");
    for (var i = 0; i < options.length; i++){
        selStr += "\r\n#L" + i + "# " + options[i] + "#l";
    }
    cm.sendSimple(selStr);
}

function action(mode, type, selection) {
    if (mode > 0)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 1) {
        selectedType = selection;
        if (selectedType > 4) {
            stimulator = true;
            selectedType -= 4;
        }
        else
            stimulator = false;
        if (selectedType == 0) { //What's a stim?
            cm.sendNext("Um estimulador é uma poção especial que posso adicionar ao processo de criação de certos itens. Dá estatísticas como se tivesse caído de um monstro. No entanto, é possível não ter alterações, e também é possível que o item esteja abaixo da média. Também há 10% de chance de não obter nenhum item ao usar um estimulador, então escolha com sabedoria.")
            cm.dispose();
        } else if (selectedType == 1){ //warrior weapon
            var selStr = "Muito bem, então, qual arma de guerreiro receberá o poder de um dragão?#b";
            var weapon = new Array ("Dragon Carbella#k - Lv. 110 One-Handed Sword#b","Dragon Axe#k - Lv. 110 One-Handed Axe#b","Dragon Mace#k - Lv. 110 One-Handed BW#b","Dragon Claymore#k - Lv. 110 Two-Handed Sword#b","Dragon Battle Axe#k - Lv. 110 Two-Handed Axe#b","Dragon Flame#k - Lv. 110 Two-Handed BW#b",
                "Dragon Faltizan#k - Lv. 110 Spear#b","Dragon Chelbird#k - Lv. 110 Polearm#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 2){ //bowman weapon
            var selStr = "Muito bem, então, qual arma de arqueiro receberá o poder de um dragão?#b";
            var weapon = new Array ("Dragon Shiner Bow#k - Lv. 110 Bow#b","Dragon Shiner Cross#k - Lv. 110 Crossbow#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 3){ //magician weapon
            var selStr = "Muito bem, então, qual arma de mago receberá o poder de um dragão?#b";
            var weapon = new Array ("Dragon Wand#k - Lv. 108 Wand#b","Dragon Staff#k - Lv. 110 Staff#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        } else if (selectedType == 4){ //thief weapon
            var selStr = "Muito bem, então, qual arma de gatuno receberá o poder de um dragão?#b";
            var weapon = new Array ("Dragon Kanzir#k - Lv. 110 STR Dagger#b","Dragon Kreda#k - Lv. 110 LUK Dagger#b","Dragon Green Sleve#k - Lv. 110 Claw#b");
            for (var i = 0; i < weapon.length; i++){
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
    } else if (status == 2) {
        selectedItem = selection;
        if (selectedType == 1){ //warrior weapon
            var itemSet = new Array(1302059,1312031,1322052,1402036,1412026,1422028,1432038,1442045);
            var matSet = new Array(new Array(1302056,4000244,4000245,4005000),new Array(1312030,4000244,4000245,4005000),new Array(1322045,4000244,4000245,4005000),new Array(1402035,4000244,4000245,4005000),
                new Array(1412021,4000244,4000245,4005000),new Array(1422027,4000244,4000245,4005000),new Array(1432030,4000244,4000245,4005000),new Array(1442044,4000244,4000245,4005000));
            var matQtySet = new Array(new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8),new Array(1,20,25,8));
            var costSet = new Array(120000,120000,120000,120000,120000,120000,120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 2){ //bowman weapon
            var itemSet = new Array(1452044,1462039);
            var matSet = new Array(new Array(1452019,4000244,4000245,4005000,4005002),new Array(1462015,4000244,4000245,4005000,4005002));
            var matQtySet = new Array(new Array(1,20,25,3,5),new Array(1,20,25,5,3));
            var costSet = new Array(120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 3){ //magician weapon
            var itemSet = new Array(1372032,1382036);
            var matSet = new Array(new Array(1372010,4000244,4000245,4005001,4005003),new Array(1382035,4000244,4000245,4005001,4005003));
            var matQtySet = new Array(new Array(1,20,25,6,2),new Array(1,20,25,6,2));
            var costSet = new Array(120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 4){ //thief weapon
            var itemSet = new Array(1332049,1332050,1472051);
            var matSet = new Array(new Array(1332051,4000244,4000245,4005000,4005002),new Array(1332052,4000244,4000245,4005002,4005003),new Array(1472053,4000244,4000245,4005002,4005003));
            var matQtySet = new Array(new Array(1,20,25,5,3),new Array(1,20,25,3,5),new Array(1,20,25,2,6));
            var costSet = new Array(120000,120000,120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        var prompt = "Você quer que eu faça #t" + item + "#? Nesse caso, vou precisar de itens específicos de você para fazê-lo. Certifique-se de que você tenha espaço em seu inventário!#b";
        if(stimulator){
            stimID = getStimID(item);
            prompt += "\r\n#i"+stimID+"# 1 #t" + stimID + "#";
        }
        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
        }
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost + " meso";
        cm.sendYesNo(prompt);
    } else if (status == 3) {
        var complete = true;
        if (cm.getMeso() < cost) {
            cm.sendOk("Minha taxa é para o bem de todos os Leafre. Se você não pode pagar, então diga.")
        } else {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++) {
                    if (matQty[i] == 1)	{
                        if (!cm.haveItem(mats[i])) {
                            complete = false;
                        }
                    } else {
                        if (!cm.haveItem(mats[i], matQty[i] * selection))
                            complete=false;
                    }
                }
            } else {
                if (!cm.haveItem(mats,matQty * selection))
                    complete=false;
            }
        }
        if (stimulator){ //check for stimulator
            if (!cm.haveItem(stimID)) {
                complete = false;
            }
        }
        if (!complete)
            cm.sendOk("Receio que sem os itens corretos, a essência do dragão ... não faria uma arma muito confiável. Traga os itens corretos da próxima vez.");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i]);
                }
            } else
                cm.gainItem(mats, -matQty);
            cm.gainMeso(-cost);
            if (stimulator) { //check for stimulator
                cm.gainItem(stimID, -1);
                var deleted = Math.floor(Math.random() * 10);
                if (deleted != 0) {
                    cm.addRandomItem(item);
                    cm.sendOk("O processo está completo. Trate sua arma bem, para que não traga a ira dos dragões sobre você.");
                } else {
                    cm.sendOk("Infelizmente, a essência do dragão ... entrou em conflito com sua arma. Minhas desculpas pela perda.");
                }
            }
            else {//just give basic item
                cm.gainItem(item, 1);
                    cm.sendOk("O processo está completo. Trate sua arma bem, para que não traga a ira dos dragões sobre você.");
            }
        }
        cm.dispose();
    }
}

function getStimID(equipID){
    var cat = Math.floor(equipID / 10000);
    switch (cat){
        case 130: //1h sword
            return 4130002;
        case 131: //1h axe
            return 4130003;
        case 132: //1h bw
            return 4130004;
        case 140: //2h sword
            return 4130005;
        case 141: //2h axe
            return 4130006;
        case 142: //2h bw
            return 4130007;
        case 143: //spear
            return 4130008;
        case 144: //polearm
            return 4130009;
        case 137: //wand
            return 4130010;
        case 138: //staff
            return 4130011;
        case 145: //bow
            return 4130012;
        case 146: //xbow
            return 4130013;
        case 133: //dagger
            return 4130014;
        case 147: //claw
            return 4130015;
    }
    return 4130002;
}