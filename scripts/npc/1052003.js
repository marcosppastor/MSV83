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
/* Chris
	Victoria Road : Kerning City Repair Shop (103000006)
	
	Refining NPC: 
	* Minerals
	* Jewels
	* Special - Iron Hog's Metal Hoof x 100 into Steel Plate
	* Claws
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;
var last_use; //last item is a use item

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        cm.dispose();
    if (status == 0) {
        var selStr = "Sim, eu possuo essa forja. Se voc� est� disposto a pagar, posso oferecer-lhe alguns dos meus servi�os.#b"
        var options = new Array("Refinar um min�rio ","Refinar uma joia","Eu tenho casco de metal do porco de ferro ...","Atualize uma garra");
        for (var i = 0; i < options.length; i++){
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
			
        cm.sendSimple(selStr);
    }
    else if (status == 1) {
        selectedType = selection;
        if (selectedType == 0){ //mineral refine
            var selStr = "Ent�o, que tipo de min�rio mineral voc� gostaria de refinar??#b";
            var minerals = new Array ("Bronze","A�o","Mithril","Adamantium","Prata","Orihalcon","Ouro");
            for (var i = 0; i < minerals.length; i++){
                selStr += "\r\n#L" + i + "# " + minerals[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 1){ //jewel refine
            var selStr = "Ent�o, que tipo de min�rio mineral voc� gostaria de refinar??#b";
            var jewels = new Array ("Garnet","Amethyst","Aquamarine","Esmeralda","Opal","Safira","Topaz","Diamante","Cristal negro");
            for (var i = 0; i < jewels.length; i++){
                selStr += "\r\n#L" + i + "# " + jewels[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 2){ //foot refine
            var selStr = "Voc� sabe disso? Muitas pessoas n�o percebem o potencial no casaco de metal do Iron Hog ... Eu posso fazer isso em algo especial, se voc� quiser.";
            equip = false;
            cm.sendYesNo(selStr);
        }
        else if (selectedType == 3){ //claw refine
            var selStr = "Ah, voc� deseja atualizar uma garra? Ent�o me diga, qual deles?#b";
            var claws = new Array ("Blood Gigantic#k - Thief Lv. 60#b","Sapphire Gigantic#k - Thief Lv. 60#b","Dark Gigantic#k - Thief Lv. 60#b");
            for (var i = 0; i < claws.length; i++){
                selStr += "\r\n#L" + i + "# " + claws[i] + "#l";
            }
            equip = true;
            cm.sendSimple(selStr);
        }
        if (equip)
            status++;
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;
        if (selectedType == 0){ //mineral refine
            var itemSet = new Array(4011000,4011001,4011002,4011003,4011004,4011005,4011006);
            var matSet = new Array(4010000,4010001,4010002,4010003,4010004,4010005,4010006);
            var matQtySet = new Array(10,10,10,10,10,10,10);
            var costSet = new Array(300,300,300,500,500,500,800);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 1){ //jewel refine
            var itemSet = new Array(4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008);
            var matSet = new Array(4020000,4020001,4020002,4020003,4020004,4020005,4020006,4020007,4020008);
            var matQtySet = new Array(10,10,10,10,10,10,10,10,10);
            var costSet = new Array (500,500,500,500,500,500,500,1000,3000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //special refine
            var itemSet = new Array(4011001,1);
            var matSet = new Array(4000039,1);
            var matQtySet = new Array (100,1);
            var costSet = new Array (1000,1)
            item = itemSet[0];
            mats = matSet[0];
            matQty = matQtySet[0];
            cost = costSet[0];
        }
		
        var prompt = "Ent�o, voc� quer que eu fa�a alguns #t" + item + "#s? Nesse caso, quantos voc� quer que eu fa�a??";
		
        cm.sendGetNumber(prompt,1,1,100)
    }
	
    else if (status == 3) {
        if (equip)
        {
            selectedItem = selection;
            qty = 1;
        }
        else
            qty = selection;
			
        last_use = false;
		
        if (selectedType == 3){ //claw refine
            var itemSet = new Array (1472023,1472024,1472025);
            var matSet = new Array(new Array (1472022,4011007,4021000,2012000),new Array (1472022,4011007,4021005,2012002),new Array (1472022,4011007,4021008,4000046));
            var matQtySet = new Array (new Array (1,1,8,10),new Array (1,1,8,10),new Array (1,1,3,5));
            var costSet = new Array (80000,80000,100000)
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
            if (selectedItem != 2)
                last_use = true;
        }
		
        var prompt = "Voc� quer que eu fa�a";
        if (qty == 1)
            prompt += "a #t" + item + "#?";
        else
            prompt += qty + " #t" + item + "#?";
			
        prompt += " Nesse caso, vou precisar de itens espec�ficos de voc� para faz�-lo. Certifique-se de ter espa�o em seu invent�rio, no entanto!#b";
		
        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        }
        else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
		
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost * qty + " meso";
		
        cm.sendYesNo(prompt);
    }
    else if (status == 4) {
        var complete = true;
		
        if (cm.getMeso() < cost * qty)
        {
            cm.sendOk("Apenas dinheiro, sem cheques.")
        }
        else
        {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                {
                    if (matQty[i] * qty == 1)	{
                        if (!cm.haveItem(mats[i]))
                        {
                            complete = false;
                        }
                    }
                    else {
                        if (!cm.haveItem(mats[i],matQty[i] * selection)) complete=false;
                    }
                }
            }
            else {
                if (!cm.haveItem(mats,matQty * selection)) complete=false;
            }
        }
		
        if (!complete)
            cm.sendOk("N�o posso aceitar substitutos. Se voc� n�o tem o que eu preciso, n�o vou poder ajud�-lo.");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i] * qty);
                }
            }
            else
                cm.gainItem(mats, -matQty * qty);
            cm.gainMeso(-cost * qty);
            cm.gainItem(item, qty);
            cm.sendNext("Phew ... Eu quase n�o pensei que isso funcionaria por um segundo ... Bem, espero que voc� goste, de qualquer maneira.");
        }
        cm.dispose();
    }
}