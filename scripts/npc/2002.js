/*
var status = 0;   
var mapid = PONER ID DEL MAPA ACA; //Borrar el "PONER ID DEL MAPA ACA" y poner el ID de un MAPA :D 

function start() {   
    status = -1;   
    action(1, 0, 0);   
}   

function action(mode, type, selection) {   
        
    if (mode == -1) {   
        cm.dispose();   
    }   
    else {    
        if (status >= 2 && mode == 0) {    
            if(cm.getChar().isDonator() == true) { //checks for donator 
            cm.sendSimple("I am the donator NPC for MapleStory. Please choose what you would like to do. #L0#Can you summon some super EXP snails for me?#l#\r\n#L1#Warp me to Henesys, please.");    
            cm.spawnMonster(100100 1, 1, 1, 2000000, 0, 0, 10, 655, -146); 
            cm.dispose();    
            }else{ 
            if (status = 1) ( 
            cm.sendOK("Alrighty, come back later."); 
            cm.warp(mapid,0); 
            cm.dispose(); 
            } 
        } 
        
        */