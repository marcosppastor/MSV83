


/*

	오딘 KMS 팀 소스의 스크립트 입니다.

	엔피시아이디 : 1012102
	
	엔피시 이름 : 피아

	엔피시가 있는 맵 : 헤네시스

	엔피시 설명 : 주문서 교환


*/

var scrollz0 = new Array(new Array(65, 2040001, 1), new Array(65, 2040002, 1), new Array(65, 2040008, 1), new Array(65, 2040009, 1));
var scrollz1 = new Array(new Array(65, 2040004, 1), new Array(65, 2040005, 1), new Array(65, 2040010, 1), new Array(65, 2040011, 1));
var scrollz2 = new Array(new Array(65, 2040012, 1), new Array(65, 2040013, 1), new Array(65, 2040025, 1), new Array(65, 2040026, 1));
var scrollz3 = new Array(new Array(65, 2040028, 1), new Array(65, 2040029, 1), new Array(65, 2040030, 1), new Array(65, 2040031, 1));
var scrollz4 = new Array(new Array(65, 2040233, 1));
var scrollz5 = new Array(new Array(65, 2040234, 1));
var scrollz6 = new Array(new Array(65, 2040235, 1));
var scrollz7 = new Array(new Array(65, 2040236, 1));
var scrollz8 = new Array(new Array(65, 2040301, 1), new Array(65, 2040302, 1), new Array(65, 2040304, 1), new Array(65, 2040305, 1), new Array(65, 2040330, 1));
var scrollz9 = new Array(new Array(65, 2040306, 1), new Array(65, 2040307, 1), new Array(65, 2040317, 1), new Array(65, 2040318, 1), new Array(65, 2040329, 1));
var scrollz10 = new Array(new Array(65, 2040320, 1), new Array(65, 2040321, 1), new Array(65, 2040322, 1), new Array(65, 2040323, 1), new Array(65, 2040331, 1));
var scrollz11 = new Array(new Array(65, 2040325, 1), new Array(65, 2040326, 1), new Array(65, 2040327, 1), new Array(65, 2040328, 1));
var scrollz12 = new Array(new Array(65, 2040401, 1), new Array(65, 2040402, 1), new Array(65, 2040404, 1), new Array(65, 2040405, 1));
var scrollz13 = new Array(new Array(65, 2040406, 1), new Array(65, 2040407, 1), new Array(65, 2040418, 1), new Array(65, 2040419, 1));
var scrollz14 = new Array(new Array(65, 2040408, 1), new Array(65, 2040409, 1), new Array(65, 2040421, 1), new Array(65, 2040422, 1));
var scrollz15 = new Array(new Array(65, 2040424, 1), new Array(65, 2040425, 1), new Array(65, 2040426, 1), new Array(65, 2040427, 1));
var scrollz16 = new Array(new Array(65, 2040501, 1), new Array(65, 2040502, 1), new Array(65, 2040508, 1), new Array(65, 2040509, 1));
var scrollz17 = new Array(new Array(65, 2040504, 1), new Array(65, 2040505, 1), new Array(65, 2040510, 1), new Array(65, 2040511, 1));
var scrollz18 = new Array(new Array(65, 2040513, 1), new Array(65, 2040514, 1), new Array(65, 2040518, 1), new Array(65, 2040519, 1));
var scrollz19 = new Array(new Array(65, 2040516, 1), new Array(65, 2040517, 1), new Array(65, 2040520, 1), new Array(65, 2040521, 1));
var scrollz20 = new Array(new Array(65, 2040531, 1), new Array(65, 2040532, 1), new Array(65, 2040533, 1), new Array(65, 2040534, 1));
var scrollz21 = new Array(new Array(65, 2040601, 1), new Array(65, 2040602, 1), new Array(65, 2040604, 1), new Array(65, 2040605, 1));
var scrollz22 = new Array(new Array(65, 2040606, 1), new Array(65, 2040607, 1), new Array(65, 2040618, 1), new Array(65, 2040619, 1));
var scrollz23 = new Array(new Array(65, 2040608, 1), new Array(65, 2040609, 1), new Array(65, 2040621, 1), new Array(65, 2040622, 1));
var scrollz24 = new Array(new Array(65, 2040624, 1), new Array(65, 2040625, 1), new Array(65, 2040626, 1), new Array(65, 2040627, 1));
var scrollz25 = new Array(new Array(65, 2040701, 1), new Array(65, 2040702, 1), new Array(65, 2040712, 1), new Array(65, 2040713, 1));
var scrollz26 = new Array(new Array(65, 2040704, 1), new Array(65, 2040705, 1), new Array(65, 2040714, 1), new Array(65, 2040715, 1));
var scrollz27 = new Array(new Array(65, 2040707, 1), new Array(65, 2040708, 1), new Array(65, 2040716, 1), new Array(65, 2040717, 1));
var scrollz28 = new Array(new Array(65, 2040801, 1), new Array(65, 2040802, 1), new Array(65, 2040808, 1), new Array(65, 2040809, 1));
var scrollz29 = new Array(new Array(65, 2040804, 1), new Array(65, 2040805, 1), new Array(65, 2040810, 1), new Array(65, 2040811, 1), new Array(65, 2040826, 1));
var scrollz30 = new Array(new Array(65, 2040812, 1), new Array(65, 2040813, 1), new Array(65, 2040824, 1), new Array(65, 2040825, 1));
var scrollz31 = new Array(new Array(65, 2040901, 1), new Array(65, 2040902, 1), new Array(65, 2040904, 1), new Array(65, 2040905, 1));
var scrollz32 = new Array(new Array(65, 2040906, 1), new Array(65, 2040907, 1), new Array(65, 2040924, 1), new Array(65, 2040925, 1));
var scrollz33 = new Array(new Array(65, 2040908, 1), new Array(65, 2040909, 1), new Array(65, 2040927, 1), new Array(65, 2040928, 1));
var scrollz34 = new Array(new Array(65, 2040930, 1), new Array(65, 2040931, 1), new Array(65, 2040932, 1), new Array(65, 2040933, 1));
var scrollz35 = new Array(new Array(65, 2041001, 1), new Array(65, 2041002, 1), new Array(65, 2041026, 1), new Array(65, 2041027, 1));
var scrollz36 = new Array(new Array(65, 2041004, 1), new Array(65, 2041005, 1), new Array(65, 2041028, 1), new Array(65, 2041029, 1));
var scrollz37 = new Array(new Array(65, 2041007, 1), new Array(65, 2041008, 1), new Array(65, 2041030, 1), new Array(65, 2041031, 1));
var scrollz38 = new Array(new Array(65, 2041010, 1), new Array(65, 2041011, 1), new Array(65, 2041032, 1), new Array(65, 2041033, 1));
var scrollz39 = new Array(new Array(65, 2041013, 1), new Array(65, 2041014, 1), new Array(65, 2041034, 1), new Array(65, 2041035, 1));
var scrollz40 = new Array(new Array(65, 2041016, 1), new Array(65, 2041017, 1), new Array(65, 2041036, 1), new Array(65, 2041037, 1));
var scrollz41 = new Array(new Array(65, 2041019, 1), new Array(65, 2041020, 1), new Array(65, 2041038, 1), new Array(65, 2041039, 1));
var scrollz42 = new Array(new Array(65, 2041022, 1), new Array(65, 2041023, 1), new Array(65, 2041040, 1), new Array(65, 2041041, 1));
var scrollz43 = new Array(new Array(65, 2041101, 1), new Array(65, 2041102, 1), new Array(65, 2041112, 1), new Array(65, 2041113, 1));
var scrollz44 = new Array(new Array(65, 2041104, 1), new Array(65, 2041105, 1), new Array(65, 2041114, 1), new Array(65, 2041115, 1));
var scrollz45 = new Array(new Array(65, 2041107, 1), new Array(65, 2041108, 1), new Array(65, 2041116, 1), new Array(65, 2041117, 1));
var scrollz46 = new Array(new Array(65, 2041110, 1), new Array(65, 2041111, 1), new Array(65, 2041118, 1), new Array(65, 2041119, 1));
var scrollz47 = new Array(new Array(65, 2041301, 1), new Array(65, 2041302, 1), new Array(65, 2041312, 1), new Array(65, 2041313, 1));
var scrollz48 = new Array(new Array(65, 2041304, 1), new Array(65, 2041305, 1), new Array(65, 2041314, 1), new Array(65, 2041315, 1));
var scrollz49 = new Array(new Array(65, 2041307, 1), new Array(65, 2041308, 1), new Array(65, 2041316, 1), new Array(65, 2041317, 1));
var scrollz50 = new Array(new Array(65, 2041310, 1), new Array(65, 2041311, 1), new Array(65, 2041318, 1), new Array(65, 2041319, 1));
var scrollz51 = new Array(new Array(65, 2043001, 1), new Array(65, 2043002, 1), new Array(65, 2043004, 1), new Array(65, 2043005, 1), new Array(65, 2043016, 1), new Array(65, 2043017, 1), new Array(65, 2043018, 1), new Array(65, 2043019, 1));
var scrollz52 = new Array(new Array(65, 2043101, 1), new Array(65, 2043102, 1), new Array(65, 2043104, 1), new Array(65, 2043105, 1), new Array(65, 2043111, 1), new Array(65, 2043112, 1), new Array(65, 2043113, 1), new Array(65, 2043114, 1));
var scrollz53 = new Array(new Array(65, 2043201, 1), new Array(65, 2043202, 1), new Array(65, 2043204, 1), new Array(65, 2043205, 1), new Array(65, 2043211, 1), new Array(65, 2043212, 1), new Array(65, 2043213, 1), new Array(65, 2043214, 1));
var scrollz54 = new Array(new Array(65, 2043301, 1), new Array(65, 2043302, 1), new Array(65, 2043304, 1), new Array(65, 2043305, 1), new Array(65, 2043316, 1));
var scrollz55 = new Array(new Array(65, 2043401, 1), new Array(65, 2043402, 1), new Array(65, 2043407, 1));
var scrollz56 = new Array(new Array(65, 2043601, 1), new Array(65, 2043602, 1), new Array(65, 2043603, 1), new Array(65, 2043604, 1));
var scrollz57 = new Array(new Array(65, 2043701, 1), new Array(65, 2043702, 1), new Array(65, 2043704, 1), new Array(65, 2043705, 1), new Array(65, 2043714, 1));
var scrollz58 = new Array(new Array(65, 2043801, 1), new Array(65, 2043802, 1), new Array(65, 2043804, 1), new Array(65, 2043805, 1), new Array(65, 2043814, 1));
var scrollz59 = new Array(new Array(65, 2044001, 1), new Array(65, 2044002, 1), new Array(65, 2044004, 1), new Array(65, 2044005, 1), new Array(65, 2044011, 1), new Array(65, 2044012, 1), new Array(65, 2044013, 1), new Array(65, 2044014, 1), new Array(65, 2044015, 1));
var scrollz60 = new Array(new Array(65, 2044101, 1), new Array(65, 2044102, 1), new Array(65, 2044104, 1), new Array(65, 2044105, 1), new Array(65, 2044111, 1), new Array(65, 2044112, 1), new Array(65, 2044113, 1), new Array(65, 2044114, 1));
var scrollz61 = new Array(new Array(65, 2044201, 1), new Array(65, 2044202, 1), new Array(65, 2044204, 1), new Array(65, 2044205, 1), new Array(65, 2044211, 1), new Array(65, 2044212, 1), new Array(65, 2044213, 1), new Array(65, 2044214, 1));
var scrollz62 = new Array(new Array(65, 2044301, 1), new Array(65, 2044302, 1), new Array(65, 2044304, 1), new Array(65, 2044305, 1), new Array(65, 2044311, 1), new Array(65, 2044312, 1), new Array(65, 2044313, 1), new Array(65, 2044314, 1));
var scrollz63 = new Array(new Array(65, 2044401, 1), new Array(65, 2044402, 1), new Array(65, 2044404, 1), new Array(65, 2044405, 1), new Array(65, 2044411, 1), new Array(65, 2044412, 1), new Array(65, 2044413, 1), new Array(65, 2044414, 1));
var scrollz64 = new Array(new Array(65, 2044501, 1), new Array(65, 2044502, 1), new Array(65, 2044504, 1), new Array(65, 2044505, 1));
var scrollz65 = new Array(new Array(65, 2044601, 1), new Array(65, 2044602, 1), new Array(65, 2044604, 1), new Array(65, 2044605, 1));
var scrollz66 = new Array(new Array(65, 2044701, 1), new Array(65, 2044702, 1), new Array(65, 2044704, 1), new Array(65, 2044705, 1));
var scrollz67 = new Array(new Array(65, 2043601, 1), new Array(65, 2043602, 1), new Array(65, 2043603, 1), new Array(65, 2043604, 1));
var scrollz68 = new Array(new Array(65, 2044801, 1), new Array(65, 2044802, 1), new Array(65, 2044803, 1), new Array(65, 2044804, 1), new Array(65, 2044806, 1), new Array(65, 2044807, 1), new Array(65, 2044808, 1), new Array(65, 2044809, 1));
var scrollz69 = new Array(new Array(65, 2044901, 1), new Array(65, 2044902, 1), new Array(65, 2044903, 1), new Array(65, 2044904, 1));
var scrollz70 = new Array(new Array(65, 2045201, 1), new Array(65, 2045202, 1), new Array(65, 2045203, 1), new Array(65, 2045204, 1), new Array(65, 2045208, 1));
var scrollz71 = new Array(new Array(65, 2045301, 1), new Array(65, 2045302, 1), new Array(65, 2045303, 1), new Array(65, 2045304, 1));
var scrollz72 = new Array(new Array(65, 2048001, 1), new Array(65, 2048002, 1), new Array(65, 2048004, 1), new Array(65, 2048005, 1), new Array(65, 2048010, 1), new Array(65, 2048011, 1), new Array(65, 2048012, 1), new Array(65, 2048013, 1), new Array(65, 2048018, 1), new Array(65, 2048019, 1), new Array(65, 2048026, 1), new Array(65, 2048027, 1), new Array(65, 2048036, 1), new Array(65, 2048037, 1));
var scrollz73 = new Array(new Array(50, 2049401, 1),new Array(70, 2049400, 1),new Array(100, 2049701, 1));

var scrollCategorys = new Array("투구 방어력", "투구 체력", "투구 지력", "투구 민첩성", "눈 장식 힘", "눈 장식 민첩", "눈 장식 지력", "눈 장식 행운", "귀 장식 지력", "귀 장식 민첩", "귀 장식 행운", "귀 장식 체력", "상의 방어력", "상의 힘", "상의 체력", "상의 행운", "전신 갑옷 민첩성", "전신 갑옷 방어력", "전신 갑옷 지력", "전신 갑옷 행운", "전신 갑옷 힘", "하의 방어력", "하의 점프", "하의 체력", "하의 민첩성", "신발 민첩성", "신발 점프력", "신발 이동속도", "장갑 민첩성", "장갑 공격력", "장갑 체력", "방패 방어력", "방패 행운", "방패 체력", "방패 힘", "망토 마법 방어력", "망토 물리 방어력", "망토 체력", "망토 마나", "망토 힘", "망토 지력", "망토 민첩성", "망토 행운", "반지 힘", "반지 지력", "반지 민첩성", "반지 행운", "벨트 힘", "벨트 지력", "벨트 민첩성", "벨트 행운", "한손검", "한손도끼", "한손둔기", "단검", "블레이드", "케인", "완드", "스태프", "두손검", "두손도끼", "두손둔기", "창", "폴암", "활", "석궁", "아대", "케인", "너클", "건", "듀얼 보우건", "핸드캐논", "펫장비", "잠재 부여 주문서");


var status = -1;
var menuSelect = -1;
var select = -1;


function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
        var trade = "어떤 주문서를 원하는데?\r\n\r\n#b";
        for (var i = 0; i < scrollCategorys.length; i++) {
            trade += "#L"+i+"#"+scrollCategorys[i]+"#l\r\n";
        }
        cm.sendSimple(trade);
    } else if (status == 1) {
        menuSelect = selection;
        var trade = "자. 원하는 주문서를 골라봐.\r\n\r\n#b";
        var scrollArray = getArray(selection);
        for (var i = 0;i < scrollArray.length; i++) {
            trade += "#L"+i+"##i"+scrollArray[i][1]+"# #z"+scrollArray[i][1]+"##l\r\n";
        }
        cm.sendSimple(trade);
    } else if (status == 2) {
        select = selection;
        var scrollArray = getArray(menuSelect);
        cm.sendYesNo("단풍잎 "+scrollArray[select][0]+"개를 #b#i"+scrollArray[select][1]+"# #z"+scrollArray[select][1]+"##k 로 교환하고 싶은거야? 환불은 안되니 신중하게 결정하라구.");
    } else if (status == 3) {
        var scrollArray = getArray(menuSelect);
        if (cm.haveItem(4001126, scrollArray[select][0]) && cm.canHold(scrollArray[select][1])) {
            cm.gainItem(4001126, -scrollArray[select][0]);
            cm.gainItem(scrollArray[select][1], scrollArray[select][2]);
            cm.sendOk("교환완료! 인벤토리를 확인해봐!");
            cm.dispose();
        } else {
            cm.sendOk("인벤토리 공간이 부족한거 아냐? 아니면 #b단풍잎 "+scrollArray[select][0]+"개#k 는 잘 갖고 있는거야? 난 바쁜몸이니 제대로 확인하고 오란말이야!");
            cm.dispose();
            return;
        }
    }
}


function getArray(sel) {
if (sel==0)return scrollz0;
if (sel==1)return scrollz1;
if (sel==2)return scrollz2;
if (sel==3)return scrollz3;
if (sel==4)return scrollz4;
if (sel==5)return scrollz5;
if (sel==6)return scrollz6;
if (sel==7)return scrollz7;
if (sel==8)return scrollz8;
if (sel==9)return scrollz9;
if (sel==10)return scrollz10;
if (sel==11)return scrollz11;
if (sel==12)return scrollz12;
if (sel==13)return scrollz13;
if (sel==14)return scrollz14;
if (sel==15)return scrollz15;
if (sel==16)return scrollz16;
if (sel==17)return scrollz17;
if (sel==18)return scrollz18;
if (sel==19)return scrollz19;
if (sel==20)return scrollz20;
if (sel==21)return scrollz21;
if (sel==22)return scrollz22;
if (sel==23)return scrollz23;
if (sel==24)return scrollz24;
if (sel==25)return scrollz25;
if (sel==26)return scrollz26;
if (sel==27)return scrollz27;
if (sel==28)return scrollz28;
if (sel==29)return scrollz29;
if (sel==30)return scrollz30;
if (sel==31)return scrollz31;
if (sel==32)return scrollz32;
if (sel==33)return scrollz33;
if (sel==34)return scrollz34;
if (sel==35)return scrollz35;
if (sel==36)return scrollz36;
if (sel==37)return scrollz37;
if (sel==38)return scrollz38;
if (sel==39)return scrollz39;
if (sel==40)return scrollz40;
if (sel==41)return scrollz41;
if (sel==42)return scrollz42;
if (sel==43)return scrollz43;
if (sel==44)return scrollz44;
if (sel==45)return scrollz45;
if (sel==46)return scrollz46;
if (sel==47)return scrollz47;
if (sel==48)return scrollz48;
if (sel==49)return scrollz49;
if (sel==50)return scrollz50;
if (sel==51)return scrollz51;
if (sel==52)return scrollz52;
if (sel==53)return scrollz53;
if (sel==54)return scrollz54;
if (sel==55)return scrollz55;
if (sel==56)return scrollz56;
if (sel==57)return scrollz57;
if (sel==58)return scrollz58;
if (sel==59)return scrollz59;
if (sel==60)return scrollz60;
if (sel==61)return scrollz61;
if (sel==62)return scrollz62;
if (sel==63)return scrollz63;
if (sel==64)return scrollz64;
if (sel==65)return scrollz65;
if (sel==66)return scrollz66;
if (sel==67)return scrollz67;
if (sel==68)return scrollz68;
if (sel==69)return scrollz69;
if (sel==70)return scrollz70;
if (sel==71)return scrollz71;
if (sel==72)return scrollz72;
if (sel==73)return scrollz73;
    
}