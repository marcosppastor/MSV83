/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

importPackage(Packages.client);
importPackage(Packages.tools);
importPackage(Packages.server.life);

//Configuração de tempo, em milésimos de segundos
var closeTime = 120000; //Tempo para fechar a entrada
var beginTime = 150000; //Tempo para começar o caminho
var rideTime = 150000; //Tempo requerido para ir até o destino.
var Orbis_btf;
var Train_to_Orbis;
var Orbis_docked;
var Ludibrium_btf;
var Train_to_Ludibrium;
var Ludibrium_docked;
var Orbis_Station;
var Ludibrium_Station;


function init() {
    Orbis_btf = em.getChannelServer().getMapFactory().getMap(200000122);//Antes da partida <para Ludibrium>
    Ludibrium_btf = em.getChannelServer().getMapFactory().getMap(220000111);//Antes da partida <para Orbis>
    Train_to_Orbis = em.getChannelServer().getMapFactory().getMap(200090110);//Navio para Orbis
    Train_to_Ludibrium = em.getChannelServer().getMapFactory().getMap(200090100);//Navio para Ludibrium
    Orbis_docked = em.getChannelServer().getMapFactory().getMap(200000121);//Estação para Ludibrium
    Ludibrium_docked = em.getChannelServer().getMapFactory().getMap(220000110);//Estação para Orbis
    Orbis_Station = em.getChannelServer().getMapFactory().getMap(200000100);//Guichê de Orbis
    Ludibrium_Station = em.getChannelServer().getMapFactory().getMap(200000100);//Guichê de Orbis
	OBoatsetup();
    EBoatsetup();
    scheduleNew();
}

function scheduleNew() {
    Ludibrium_docked.setDocked(true);
    Orbis_Station.setDocked(true);
    Ludibrium_docked.broadcastMessage(MaplePacketCreator.boatPacket(true));
    Orbis_Station.broadcastMessage(MaplePacketCreator.boatPacket(true));
    em.setProperty("docked", "true");
    em.setProperty("entry", "true");
    em.schedule("stopentry", closeTime);
    em.schedule("takeoff", beginTime);
}

function stopentry() {
    em.setProperty("entry","false");
}

function takeoff() {
    em.setProperty("docked","false");
    var temp1 = Orbis_btf.getCharacters().iterator();
    while(temp1.hasNext()) {
        temp1.next().changeMap(Train_to_Ludibrium, Train_to_Ludibrium.getPortal(0));
    }
    var temp2 = Ludibrium_btf.getCharacters().iterator();
    while(temp2.hasNext()) {
        temp2.next().changeMap(Train_to_Orbis, Train_to_Orbis.getPortal(0));
    }
    Ludibrium_docked.setDocked(false);
    Orbis_docked.setDocked(false);
    Ludibrium_docked.broadcastMessage(MaplePacketCreator.boatPacket(false));
    Orbis_docked.broadcastMessage(MaplePacketCreator.boatPacket(false));
    em.schedule("arrived", rideTime);
}

function arrived() {
    var temp1 = Train_to_Orbis.getCharacters().iterator();
    while(temp1.hasNext()) {
        temp1.next().changeMap(Orbis_docked, Orbis_docked.getPortal(0));
    }
    var temp2 = Train_to_Ludibrium.getCharacters().iterator();
    while(temp2.hasNext()) {
        temp2.next().changeMap(Ludibrium_docked, Ludibrium_docked.getPortal(0));
    }
    scheduleNew();
}

function OBoatsetup() {
    em.getChannelServer().getMapFactory().getMap(200090011).getPortal("out00").setScriptName("OBoat1");
    em.getChannelServer().getMapFactory().getMap(200090011).getPortal("out01").setScriptName("OBoat2");
}

function EBoatsetup() {
    em.getChannelServer().getMapFactory().getMap(200090001).getPortal("out00").setScriptName("EBoat1");
    em.getChannelServer().getMapFactory().getMap(200090001).getPortal("out01").setScriptName("EBoat2");
}

function cancelSchedule() {
}