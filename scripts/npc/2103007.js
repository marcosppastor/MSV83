var status = -1;     

function start() {     
    cm.sendNext("I summon Bosses for #bFantasyStory#l. I summon 10 monsters at a time for free.");     
}     

function action(mode, type, selection) {            
    if (mode < 1)   
        cm.dispose();     
    else {        
        status++;     
        if (status == 0) {     
            cm.sendSimple("Please remember I will summon 10. \r\nPlease choose #b\r\n#L0#Papulatus clock#l\r\n#L1#Headless Horseman#l\r\n#L2#Black Crow#l\r\n#L3#Anego#l\r\n#L4#Rooster#l\r\n#L5#BigFoot#l\r\n#L6#MushMom#l#r\r\n#L7#Clear Drops#l\r\n#L8#Kill All Monsters#l"); 
        } else if (status == 1) { 
            mobs = [8500001, 9400549, 9400014, 9400121, 9600001, 9400575, 9500124]; 
            hp = [23000000, 3500000, 35000000, 75000000, 340, 32000000, 20000]; 
            mp = [596000, 300000, 1780000, 3900000, 33, 2660000, 1200]; 
        if (selection < 7) {   
            cm.summonMob(mobs[selection], hp[selection], mp[selection], 10); 
        } else if (selection == 7) { 
            cm.cleardrops();  
        } else if (selection == 8) { 
            cm.killAllMonsters(true); 
        }   
        cm.dispose(); 
    }  
}  
}