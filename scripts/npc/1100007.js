/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100007 Kiriru (Victoria Island Station to Ereve)

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Ereve");
var method;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("Se você não esta afim..");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			for(var i=0; i < menu.length; i++) {
					var display = "\r\n#L"+i+"##b Ereve (5000 mesos)#k";
				}			
				cm.sendSimple("Eh... So... Um... Se você estiver interessado em deixar #rIlha victoria #k e explorar regiões diferentes, posso te levar por apenas #k5.000 mesos #k.\r\n"+display);
			
		} else if(status == 1) {
		 if(cm.getMeso() < 1000) {
				cm.sendNext("Hmm... Você tem certeza que possui #b5000#k Mesos? se você não possuir , infelizmente não poderei ajudar.....");
				cm.dispose();
			} else {
				cm.gainMeso(-5000);
				cm.warp(130000210);
				cm.dispose();
				}
			}
		}
}