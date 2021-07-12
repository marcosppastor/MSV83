/*
var comumbook = Array(2290000,2290001,2290002,2290003,2290004,2290005,2290006);
var normalbook = Array(2290008,2290010,2290012,2290014,2290016,2290018,2290020,2290022,2290024,2290026,2290028,2290030,2290032,2290034,2290036,2290038,2290040,2290042,2290044,2290046,2290048,2290050,2290052,2290054,2290056,2290058,2290062,2290064,2290066,2290068,2290070,2290072,2290074,2290076,2290078,2290080,2290082,2290084,2290086,2290088,2290090,2290092,2290094,2290097,2290099,2290101,2290102,2290104,2290106,2290108,2290110,2290112,2290115,2290117,2290119,2290121,2290123);
var rarobook = Array(2290007,2290009,2290011,2290013,2290015,2290017,2290019,2290021,2290023,2290025,2290027,2290029,2290031,2290033,2290035,2290039,2290041,2290043,2290045,2290047,2290049,2290051,2290053,2290055,2290057,2290059,2290060,2290061,2290063,2290065,2290067,2290069,2290071,2290073,2290075,2290077,2290079,2290081,2290083,2290085,2290087,2290089,2290091,2290093,2290095,2290096,2290098,2290100,2290103,2290105,2290107,2290109,2290111,2290113,2290114,2290116,2290118,2290120,2290122,2290124,2290125);

var comumchair = Array(3010001,3010002);
var normalchair = Array(3010002,3010003,3010006,3010009);
var rarochair = Array(3010013,3010014,3010018,3011000,3010045,3010072,3010060,3010062,3010067,3010085,3012010,3012011,3010069,3010045);

var comumperga = Array(2040000,2040001,2040002,2040003,2040004,2040005,2040006,2040007,2040008,2040009,2040010,2040021,2040022);
var normalperga = Array(2040012,2040013,2040024,2040025,2040026,2040027,2040028,2040029,2040030,2040031,2040418,2040419,2040420,2040421,2040422,2040423,2040424,2040425,2040426,2040427,2040500,2040501,2040502,2040503,2040504,2040505,2040506,2040507,2040508,2040509,2040510,2040511,2040512,2040513,2040514,2040515,2040516,2040517,2040518,2040519,2040520,2040521,2040522,2040523,2040524,2040525,2040526,2040527,2040528,2040529,2040530,2040531,2040532,2040533,2040534,2040805,2040803 );
var raroperga = Array(2049100,2049000,2049001,2049002,2049003,2040758,2040760,2044713,2044613,2044513,2044420,2044320,2044220,2044120,2044028,2043813,2043713,2043313,2043220,2043120,2043022,2041068,2041069,2040943,2040833,2040834,2040755,2040756,2040757,2040629,2040542,2040543,2040429,2040333,2040045,2040046,2040804,2040814 ,2040816 );

function getRandom(min, max) {
	if (min > max) {
		return(-1);
	}

	if (min == max) {
		return(min);
	}

	return(min + parseInt(Math.random() * (max - min + 1)));
}

var icomumchair = comumchair[getRandom(0, comumchair.length - 1)];
var inormalchair = normalchair[getRandom(0, normalchair.length - 1)];
var irarochair = rarochair[getRandom(0, rarochair.length - 1)];

var icomumbook = comumbook[getRandom(0, comumbook.length - 1)];
var inormalbook = normalbook[getRandom(0, normalbook.length - 1)];
var irarobook = rarobook[getRandom(0, normalbook.length - 1)];

var icomumperga = comumperga[getRandom(0, comumperga.length - 1)];
var inormalperga = normalperga[getRandom(0, normalperga.length - 1)];
var iraroperga = raroperga[getRandom(0, raroperga.length - 1)];

var chance = getRandom(0, 5);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("Ok, como queira!");
        cm.dispose();
        return;
    }
    
    if (status == 0 ) {
			cm.sendSimple("Pelo visto você esta em busca de recompensas , me espanta como um grande rei como meu pai, permitiu todas essas regalias, escolha:\r\n #d#L0#Obter Livros de habilidades #i2290084#\r\n\r\n #d#L1# Obter cadeiras #i3010013#\r\n\r\n #d#L2# Obter pergaminhos #i2049100# \r\n\r\n #d#L3#Maça Onix #i2022179# x3 \r\n\r\n #d#L4#Queijo suiço #i2022273# x3");
      
            
    
    } else if (selection == 0) {
        if (selection == 0 && cm.haveItem(4001259 , 1)) {
                      cm.gainItem(4001259, -1);

			if (chance > 0 && chance <= 2) {
				cm.gainItem(icomumbook, 1);
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormalbook, 1);
			} else {
				cm.gainItem(irarobook, 1);
			}
                      
                      
	              cm.sendOk("Sua troca foi concluida com sucesso.");
                      cm.dispose();
            } else {
	cm.sendOk("Parece que você não possui os itens necessários,para realizar esta troca é necessario ter no minimo 1 #i4001259#.");
                cm.dispose();
        }
        
        
                   
    
    
    } else if (selection == 1) {
        if (selection == 1 && cm.haveItem(4001259 , 1)) {
                      cm.gainItem(4001259 , -1);

			if (chance > 0 && chance <= 2) {
				cm.gainItem(icomumchair, 1);
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormalchair, 1);
			} else {
				cm.gainItem(irarochair, 1);
			}
                      
                      
	              cm.sendOk("Sua troca foi concluida com sucesso.");
                      cm.dispose();
            } else {
	cm.sendOk("Parece que você não possui os itens necessários,para realizar esta troca é necessario ter no minimo 1 #i4001259#.");
                cm.dispose();
        }
        
        
                   
    
    
    } else if (selection == 2) {
        if (selection == 2 && cm.haveItem(4001259 , 1)) {
                      cm.gainItem(4001259 , -1);

			if (chance > 0 && chance <= 2) {
				cm.gainItem(icomumperga, 1);
			} else if (chance >= 3 && chance <= 4) {
				cm.gainItem(inormalperga, 1);
			} else {
				cm.gainItem(iraroperga, 1);
			}
                      
                      
	              cm.sendOk("Sua troca foi concluida com sucesso.");
                      cm.dispose();
            } else {
	cm.sendOk("Parece que você não possui os itens necessários,para realizar esta troca é necessario ter no minimo 1 #i4001259#.");
                cm.dispose();
        }
        
        
                   
    }else if (selection == 3) {
        if (selection == 3 && cm.haveItem(4001259 , 1)) {
                      cm.gainItem(4001259 , -1);

			cm.gainItem(2022179 ,3)
                      
                      
	              cm.sendOk("Sua troca foi concluida com sucesso.");
                      cm.dispose();
            } else {
	cm.sendOk("Parece que você não possui os itens necessários,para realizar esta troca é necessario ter no minimo 1 #i4001259#.");
                cm.dispose();
        }
    }
    
     else if (selection == 4) {
        if (selection == 4 && cm.haveItem(4001259 , 1)) {
                      cm.gainItem(4001259 , -1);

			cm.gainItem(2022273  ,3)
                      
                      
	              cm.sendOk("Sua troca foi concluida com sucesso.");
                      cm.dispose();
            } else {
	cm.sendOk("Parece que você não possui os itens necessários,para realizar esta troca é necessario ter no minimo 1 #i4001259#.");
                cm.dispose();
        }
    }
 
                 
    
}



*/

/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/

function start() {
//cm.gainItem()
cm.sendOk("Bem-vindo ao meu reinado!");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}