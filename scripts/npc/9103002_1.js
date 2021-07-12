var status = 0;
var hairmale = Array(30000, 30010, 30020, 30030, 30040, 30050, 30060, 30070, 30080, 30090, 30100, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190, 30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370, 30400, 30410, 30420, 30430, 30440, 30450, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 30540, 30550, 30560, 30570, 30580, 30590, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30690, 30700, 30710, 30720, 30730, 30740, 30750, 30760, 30770, 30780, 30790, 30800, 30810, 30820);
var hairfemale = Array(31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090, 31100, 31110, 31120, 31130, 31140, 31150, 31160, 31170, 31180, 31190, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290, 31300, 31310, 31320, 31330, 31340, 31350, 31400, 31410, 31420, 31430, 31440, 31450, 31460, 31470, 31480, 31490, 31510, 31520, 31530, 31540, 31550, 31560, 31570, 31580, 31590, 31600, 31610, 31620, 31630, 31640, 31650, 31660, 31670, 31680, 31690, 31700, 31710, 31720, 31730, 31740, 31750, 31760, 31770, 31790, 31800);
var facemale = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20026);
var facefemale = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21016, 21017, 21018, 21019, 21020, 21022, 21023, 21024);
var skin = Array(0, 1, 2, 3, 4, 9);
var current = 0;
var haircolor = Array();
var facenew = Array();
var colors = Array();

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
   			cm.dispose();
   			return;
  		}
		if (mode == 1)
   			status++;
  		else
   			status--;
  		if (status == 0) {
			if (cm.getChar().getState() == 0) {
				if (cm.getChar().getGender() == 0) 
					cm.sendStyle("Hello " + cm.getChar().getName() + ", please select your new hair\r\nremember. once chosen, you can't turn back!", hairmale);
				else
					cm.sendStyle("Hello " + cm.getChar().getName() + ", please select your new hair\r\nremember. once chosen, you can't turn back!", hairfemale);
			} else if (cm.getChar().getState() == 1) {
				if (!(cm.getHair() == 30010)) {
					haircolor = Array();
					current = parseInt(cm.getChar().getHair()/10)*10;
					for(var i = 0; i < 8; i++) {
						haircolor.push(current + i);
					}
					cm.sendStyle("Hello " + cm.getChar().getName() + ", please select your new haircolor\r\nremember. once chosen, you can't turn back!", haircolor);
				} else {
					cm.sendOk("Sorry, but i can't change the color of that hair");
				}
			} else if (cm.getChar().getState() == 2) {
				cm.sendStyle("Please select your new skin\r\nYou dont have to change it if your happy with your current!", skin);
			} else if (cm.getChar().getState() == 3) {
				facenew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < facemale.length; i++) {
						facenew.push(facemale[i] + cm.getChar().getFace() % 1000 - (cm.getChar().getFace() % 100));
					}
					cm.sendStyle("Hello " + cm.getChar().getName() + ", please select your new face\r\nremember. once chosen, you can't turn back!", facenew);
				} else {
					for(var i = 0; i < facefemale.length; i++) {
						facenew.push(facefemale[i] + cm.getChar().getFace() % 1000 - (cm.getChar().getFace() % 100));
					}
					cm.sendStyle("Hello " + cm.getChar().getName() + ", please select your new face\r\nremember. once chosen, you can't turn back!", facenew);
				}
			} else {
				if (cm.getChar().getGender() == 0) {
					current = cm.getChar().getFace() % 100 + 20000;
				} else {
					current = cm.getChar().getFace() % 100 + 21000;
				}
				colors = Array(current , current + 100, current + 200, current + 300, current +400, current + 500, current + 600, current + 700);
				cm.sendStyle("Hello " + cm.getChar().getName() + ", please select your new face\r\nremember. once chosen, you can't turn back!", colors);
			}
		} else {
			if (cm.getChar().getState() == 0) {
				if (cm.getChar().getGender() == 0) {
					cm.setHair(hairmale[selection]);
				} else {
					cm.setHair(hairfemale[selection]);
				}
			} else if (cm.getChar().getState() == 1) {
				if (!(cm.getHair() == 30010)) {
					cm.setHair(haircolor[selection]);
				}
			} else if (cm.getChar().getState() == 2) {
				cm.setSkin(skin[selection]);
			} else if (cm.getChar().getState() == 3) {
				cm.setFace(facenew[selection]);
			} else {
				cm.setFace(colors[selection]);
			}
			cm.warp(809050017);
			cm.dispose();
		}
	}
}