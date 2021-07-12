/*var status; 

function start() { 
    status = -1;
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == 1) { 
        status++; 
    }else{ 
        status--;  
    } 
     
    if (status == 0) {
	    cm.sendSimple("Você gostaria de aprender a skills da sua Quarta classe em Maplestory?,serão descontados 10m em mesos para todas as skills ativadas!. \r\n #L0# Aprender skills de Aran \r\n #L1# Aprender skills de Cavaleiro Negro \r\n #L2# Aprender skills de Herói \r\n #L3# Aprender skills de Paladino \r\n #L4# Aprender skills de Mestre arqueiro \r\n #L5# Aprender skills de Atirador de elite   \r\n #L6# Aprender skills de Mago fogo e veneno  \r\n #L7# Aprender skills de Mago gelo e raio  \r\n #L8# Aprender skills de Sumo sacerdote  \r\n #L9# Aprender skills de Lorde negro  \r\n #L10# Aprender skills de Mestre das sombras");
	} else if (status == 1) {
	    if (selection == 0) {
    if (cm.getPlayer().getJob().getId() == 2000) {
			cm.teachSkill(21000000,0,10);
                        cm.teachSkill(21001003,0,20);
                        cm.teachSkill(21100002,0,30);
                       	cm.teachSkill(21100004,0,20);
                       	cm.teachSkill(21100005,0,20);
                      	cm.teachSkill(21110007,0,20);
                        cm.teachSkill(21110008,0,20);
                        cm.teachSkill(21110002,0,20);
                       	cm.teachSkill(21120004,0,30);
                       	cm.teachSkill(21120006,0,30);
                       	cm.teachSkill(21120007,0,30);
                        cm.teachSkill(21121008,0,5);
                        cm.teachSkill(21121000,0,30);
                        cm.teachSkill(21120005,0,30);
                        cm.gainMeso(-10000000);
                        cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e ser ARAN!")
		 cm.dispose();
	}
    } else if (selection == 1) {
        if (cm.getPlayer().getJob().getId() == 132) {
			cm.teachSkill(1321010,0,1);
                        cm.teachSkill(1320006,0,10);
                        cm.teachSkill(1320008,0,10);
                        cm.teachSkill(1320009,0,10);
                        cm.teachSkill(1121003,0,10);
                        cm.teachSkill(1321000,0,10);
                        cm.gainMeso(-10000000);
			cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e serCAVALEIRO NEGRO!")
		 cm.dispose();
                 
            }
            
        } else if (selection == 2) {
        if (cm.getPlayer().getJob().getId() == 112) {
			cm.teachSkill(1120003,0,10);
                        cm.teachSkill(1121010,0,10);
                        cm.teachSkill(1120005,0,10);
                        cm.teachSkill(1321002,0,10);
                        cm.teachSkill(1121011,0,1);
                        cm.teachSkill(1121006,0,10);
                        cm.teachSkill(1321000,0,10);
                        cm.gainMeso(-10000000);
                        
			cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e ser HEROI!")
		 cm.dispose();
                 
            }
            
            
            } else if (selection == 3) {
        if (cm.getPlayer().getJob().getId() == 122) {
			cm.teachSkill(1220010,0,10);
                        cm.teachSkill(1221011,0,10);
                        cm.teachSkill(1221003,0,10);
                        cm.teachSkill(1221004,0,10);
                        cm.teachSkill(1221012,0,1);
                        cm.teachSkill(1221007,0,10);
                        cm.teachSkill(1220006,0,10);
                        cm.teachSkill(1221000,0,10);
                        cm.gainMeso(-10000000);
                        
			cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e ser PALADINO!")
		 cm.dispose();
                 
            }
            
            } else if (selection == 4) {
        if (cm.getPlayer().getJob().getId() == 312) {
			cm.teachSkill(3121000,0,10);
                        cm.teachSkill(3121009,0,1);
                        cm.teachSkill(3121004,0,10);
                        cm.teachSkill(3121006,0,10);
                        cm.teachSkill(3121003,0,10);
                        cm.gainMeso(-10000000);
                        
			cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e ser MESTR ARQUEIRO!")
		 cm.dispose();
                 
            }
            
             } else if (selection == 5) {
        if (cm.getPlayer().getJob().getId() == 322) {
			cm.teachSkill(3221003,0,1);
                        cm.teachSkill(3221000,0,10);
                        cm.teachSkill(3221001,0,10);
                        cm.teachSkill(3221007,0,10);
                        cm.teachSkill(3221003,0,10);
                        cm.gainMeso(-10000000);
                        
			cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e ser ATIRADOR DE ELITE!")
		 cm.dispose();
                 
            }
            
             } else if (selection == 6) {
        if (cm.getPlayer().getJob().getId() == 212) {
			cm.teachSkill(2121008,0,1);
                        cm.teachSkill(2121000,0,10);
                        cm.teachSkill(2121007,0,10);
                        cm.teachSkill(2121003,0,10);
                        cm.teachSkill(2121005,0,10);
                        cm.teachSkill(2121004,0,10);
                        cm.gainMeso(-10000000);
                        
			cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e ser MAGO FOGO E VENENO!")
		 cm.dispose();
                 
            }
            
             } else if (selection == 7) {
        if (cm.getPlayer().getJob().getId() == 222) {
			cm.teachSkill(2221004,0,10);
                        cm.teachSkill(2221008,0,1);
                        cm.teachSkill(2221000,0,10);
                        cm.teachSkill(2221007,0,10);
                        cm.teachSkill(2221003,0,10);
                        cm.teachSkill(2221005,0,10);
                        cm.gainMeso(-10000000);
                        
			cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e ser MAGO GELO E RAIO!")
		 cm.dispose();
                 
            }
            
             } else if (selection == 8) {
        if (cm.getPlayer().getJob().getId() == 231) {
			cm.teachSkill(2121008,0,1);
                        cm.teachSkill(2121000,0,10);
                        cm.teachSkill(2321003,0,10);
                        cm.teachSkill(2321006,0,10);
                        cm.teachSkill(2321007,0,10);
                        cm.teachSkill(2321004,0,10);
                        cm.gainMeso(-10000000);
                        
			cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e ser SUMO SACERDOTE!")
		 cm.dispose();
                 
            }
            
             } else if (selection == 9) {
        if (cm.getPlayer().getJob().getId() == 412) {
			cm.teachSkill(4121009,0,1);
                        cm.teachSkill(4121000,0,10);
                        cm.teachSkill(4121007,0,10);
                        cm.teachSkill(4121003,0,10);
                        cm.teachSkill(4121004,0,10);
                        cm.teachSkill(4121008,0,10);
                        cm.gainMeso(-10000000);
                        
			cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e ser LORDE NEGRO!")
		 cm.dispose();
                 
            }
            
             } else if (selection == 10) {
        if (cm.getPlayer().getJob().getId() == 422) {
			cm.teachSkill(4221008,0,1);
                        cm.teachSkill(4221001,0,10);
                        cm.teachSkill(4221000,0,10);
                        cm.teachSkill(4221004,0,10);
                        cm.teachSkill(4221003,0,10);
                        cm.teachSkill(4221006,0,10);
                        cm.gainMeso(-10000000);
                        
			cm.sendOk("Suas skills foram adicionadas!");
			cm.dispose();
	} else {
	     cm.sendOk("Para usar meus serviços é necessário ter a quarta classe e ser MESTRE DAS SOMBRAS!")
		 cm.dispose();
                 
            }
        }
    }
    }
    
    */
   
   var status = 0;

function start() {
status = -1;
action(1, 0, 0);
}

function action(mode, type, selection) {
if (mode == -1) {
cm.dispose();
}
else if(mode == 0){
cm.sendOk("Entendo..");
cm.dispose();
}
else {
if (mode == 1)
status++;
else
status--;
if (status == 0) {
cm.sendYesNo("Guerreiro #d#h ##k,Por apenas #r 10M #k, sou capaz de implementar suas habilidades,talvez alguma que você ainda não possui...\r\nGostaria que eu lhe ajudasse?");
}

   
else if (status == 1 && cm.getPlayer().getJob().getId() == 2112 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(21120005) ===0 && cm.getPlayer().getSkillLevel(21120010) ===0 && cm.getPlayer().getSkillLevel(21120006) ===0 && cm.getPlayer().getSkillLevel(21121000) ===0)
{
 
			//cm.teachSkill(21000000,0,10,-1);
                        //cm.teachSkill(21001003,0,20,-1);
                        //cm.teachSkill(21100002,0,30,-1);
                       	///cm.teachSkill(21100004,0,20,-1);
                       	//cm.teachSkill(21100005,0,20,-1);
                      	//cm.teachSkill(21110007,0,20,-1);
                        //cm.teachSkill(21110008,0,20,-1);
                        //cm.teachSkill(21110002,0,20,-1);
                       	cm.teachSkill(21120004,0,30,-1);
                       	cm.teachSkill(21120006,0,30,-1);
                       	cm.teachSkill(21120007,0,30,-1);
                        cm.teachSkill(21121008,0,5,-1);
                        cm.teachSkill(21121000,0,30,-1);
                        cm.teachSkill(21120005,0,30,-1);
                        cm.teachSkill(21120002 ,0,30,-1);
                        cm.teachSkill(21120001,0,30,-1);
                        cm.teachSkill(21121003 ,0,30,-1);
                       




                        
                        cm.gainMeso(-10000000);
                        
			


 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
cm.dispose();

}

else if (status == 1 && cm.getPlayer().getJob().getId() == 132 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(1320006) ===0 ){
                        
                        cm.teachSkill(1321003 ,0,30,-1);
                        cm.teachSkill(1321010,0,5,-1);
                        cm.teachSkill(1320006,0,10,-1);
                        cm.teachSkill(1320008,0,25,-1);
                        cm.teachSkill(1320009,0,25,-1);
                        cm.teachSkill(1321000,0,10,-1);
                        cm.teachSkill(1321007 ,0,10,-1);
                        cm.teachSkill(1321001 ,0,10,-1);
                        cm.teachSkill(1321002,0,30,-1);
                        cm.teachSkill(1320005 ,0,30,-1);




                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        
        
             
        
        
        
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 112 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(1120003) ===0  && cm.getPlayer().getSkillLevel(1121002) ===0 && cm.getPlayer().getSkillLevel(1121006) ===0 && cm.getPlayer().getSkillLevel(1121010) ===0){
                        cm.teachSkill(1120003,0,10,-1);
                        cm.teachSkill(1121010,0,10,-1);
                        cm.teachSkill(1120005,0,10,-1);
                        cm.teachSkill(1121002 ,0,10,-1);
                        cm.teachSkill(1121011,0,5,-1);
                        cm.teachSkill(1121006,0,10,-1);
                        cm.teachSkill(1121000 ,0,10,-1);
                        cm.teachSkill(1120004  ,0,10,-1);
                        cm.teachSkill(1121008   ,0,10,-1);

                         

                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }

else if (status == 1 && cm.getPlayer().getJob().getId() == 122 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(1220010) ===0 && cm.getPlayer().getSkillLevel(1221011) ===0 && cm.getPlayer().getSkillLevel(1221000) ===0 && cm.getPlayer().getSkillLevel(1221002) ===0 && cm.getPlayer().getSkillLevel(1221001) ===0 && cm.getPlayer().getSkillLevel(1221012) ===0 ){
                        cm.teachSkill(1220010,0,10,-1);
                        cm.teachSkill(1221011,0,10,-1);
                        cm.teachSkill(1221003,0,10,-1);
                        cm.teachSkill(1221004,0,10,-1);
                        cm.teachSkill(1221012,0,5,-1);
                        cm.teachSkill(1221007   ,0,10,-1);
                        cm.teachSkill(1220006,0,10,-1);
                        cm.teachSkill(1221000,0,10,-1);
                        cm.teachSkill(1221002 ,0,10,-1);
                       cm.teachSkill(1221001  ,0,10,-1);
                       cm.teachSkill(1221009   ,0,10,-1);

                       cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
else if (status == 1 && cm.getPlayer().getJob().getId() == 312 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(3121000) ===0 && cm.getPlayer().getSkillLevel(3121009) ===0 && cm.getPlayer().getSkillLevel(3121008) ===0 && cm.getPlayer().getSkillLevel(3120005) ===0 && cm.getPlayer().getSkillLevel(3121007) ===0 && cm.getPlayer().getSkillLevel(3121003) ===0 ){
                        cm.teachSkill(3121000,0,10,-1);
                        cm.teachSkill(3121009,0,5,-1);
                        cm.teachSkill(3121004,0,10,-1);
                        cm.teachSkill(3121006,0,10,-1);
                        cm.teachSkill(3121003,0,10,-1);
                        cm.teachSkill(3121008 ,0,10,-1);
                        cm.teachSkill(3121002  ,0,10,-1);
                        cm.teachSkill(3120005   ,0,10,-1);
                        cm.teachSkill(3121007    ,0,10,-1);



                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }

else if (status == 1 && cm.getPlayer().getJob().getId() == 322 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(3221000) ===0 && cm.getPlayer().getSkillLevel(3221008) ===0  && cm.getPlayer().getSkillLevel(3221005) ===0  && cm.getPlayer().getSkillLevel(3221006) ===0  && cm.getPlayer().getSkillLevel(3221001) ===0  && cm.getPlayer().getSkillLevel(322107) ===0  ){
                        cm.teachSkill(3221000,0,10,-1);
                        cm.teachSkill(3221001,0,10,-1);
                        cm.teachSkill(3221007,0,10,-1);
                        cm.teachSkill(3221003,0,10,-1);
                        cm.teachSkill(3220004 ,0,10,-1);
                        cm.teachSkill(3221002 ,0,10,-1);
                        cm.teachSkill(3221006 ,0,10,-1);
                        cm.teachSkill(3221005 ,0,10,-1);
                        cm.teachSkill(3221008 ,0,5,-1);




                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
else if (status == 1 && cm.getPlayer().getJob().getId() == 222 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(2221004) ===0 && cm.getPlayer().getSkillLevel(2221008) ===0  && cm.getPlayer().getSkillLevel(2221000) ===0  && cm.getPlayer().getSkillLevel(2221007) ===0  && cm.getPlayer().getSkillLevel(2221003) ===0  && cm.getPlayer().getSkillLevel(2221005) ===0  && cm.getPlayer().getSkillLevel(2221001) ===0 && cm.getPlayer().getSkillLevel(2221002) ===0 && cm.getPlayer().getSkillLevel(2221006) ===0 ){
                        cm.teachSkill(2221004,0,10,-1);
                        cm.teachSkill(2221008,0,5,-1);
                        cm.teachSkill(2221000,0,10,-1);
                        cm.teachSkill(2221007,0,10,-1);
                        cm.teachSkill(2221003,0,10,-1);
                        cm.teachSkill(2221005,0,10,-1);
                        cm.teachSkill(2221005,0,10,-1);
                        cm.teachSkill(2221001 ,0,10,-1);
                        cm.teachSkill(2221002  ,0,10,-1);
                        cm.teachSkill(2221006   ,0,10,-1);


                       cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
else if (status == 1 && cm.getPlayer().getJob().getId() == 212 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(2121000) ===0 && cm.getPlayer().getSkillLevel(2121001) ===0  && cm.getPlayer().getSkillLevel(2121002) ===0  && cm.getPlayer().getSkillLevel(2121003) ===0  && cm.getPlayer().getSkillLevel(2121004) ===0  && cm.getPlayer().getSkillLevel(2121005) ===0  && cm.getPlayer().getSkillLevel(2121006) ===0 && cm.getPlayer().getSkillLevel(2121007) ===0 && cm.getPlayer().getSkillLevel(2221006) ===0 && cm.getPlayer().getSkillLevel(2221002) ===0 ){
                        cm.teachSkill(2121000 ,0,10,-1);
                        cm.teachSkill(2121001 ,0,10,-1);
                        cm.teachSkill(2121002 ,0,10,-1);
                        cm.teachSkill(2121003 ,0,10,-1);
                        cm.teachSkill(2121004 ,0,10,-1);
                        cm.teachSkill(2121005 ,0,10,-1);
                        cm.teachSkill(2121006 ,0,10,-1);
                        cm.teachSkill(2121007  ,0,10,-1);
                        cm.teachSkill(2221002  ,0,10,-1);
                        cm.teachSkill(2221006   ,0,10,-1);


                       cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 232 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(2321009) ===0 && cm.getPlayer().getSkillLevel(2321000) ===0 && cm.getPlayer().getSkillLevel(2321003) ===0 && cm.getPlayer().getSkillLevel(2321006) ===0 && cm.getPlayer().getSkillLevel(2321007) ===0 && cm.getPlayer().getSkillLevel(2321008) ===0 && cm.getPlayer().getSkillLevel(2321004) ===0 && cm.getPlayer().getSkillLevel(2321005) ===0 && cm.getPlayer().getSkillLevel(2321001) ===0 && cm.getPlayer().getSkillLevel(2321002) ===0){
                        cm.teachSkill(2321009 ,0,5,-1);
                        cm.teachSkill(2321000 ,0,10,-1);
                        cm.teachSkill(2321003,0,10,-1);
                        cm.teachSkill(2321006,0,10,-1);
                        cm.teachSkill(2321007,0,10,-1);
                        cm.teachSkill(2321004,0,10,-1);
                        cm.teachSkill(2321008,0,10,-1);
                        cm.teachSkill(2321001 ,0,10,-1);
                        cm.teachSkill(2321005  ,0,10,-1);
                        cm.teachSkill(2321002   ,0,10,-1);


                        


                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 412 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(4121009) ===0 && cm.getPlayer().getSkillLevel(4121000) ===0 && cm.getPlayer().getSkillLevel(4121009) ===0 && cm.getPlayer().getSkillLevel(4121007) ===0 && cm.getPlayer().getSkillLevel(4121003) ===0 && cm.getPlayer().getSkillLevel(4121004) ===0 && cm.getPlayer().getSkillLevel(4121008) ===0 && cm.getPlayer().getSkillLevel(4121006) ===0 && cm.getPlayer().getSkillLevel(4121002) ===0 ){
                        cm.teachSkill(4121009,0,5,-1);
                        cm.teachSkill(4121000,0,10,-1);
                        cm.teachSkill(4121007,0,10,-1);
                        cm.teachSkill(4121003,0,10,-1);
                        cm.teachSkill(4121004,0,10,-1);
                        cm.teachSkill(4121008,0,10,-1);
                        cm.teachSkill(4121006 ,0,10,-1);
                        cm.teachSkill(4120002  ,0,10,-1);
                        cm.teachSkill(4120005   ,0,10,-1);



                        
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 422 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(4221008) ===0 && cm.getPlayer().getSkillLevel(4221001) ===0&& cm.getPlayer().getSkillLevel(4221000) ===0 && cm.getPlayer().getSkillLevel(4221004) ===0 && cm.getPlayer().getSkillLevel(4221003) ===0 && cm.getPlayer().getSkillLevel(4221006) ===0 && cm.getPlayer().getSkillLevel(4220002) ===0 && cm.getPlayer().getSkillLevel(4220005) ===0 && cm.getPlayer().getSkillLevel(4220007) ===0 ){
                        cm.teachSkill(4221008,0,5,-1);
                        cm.teachSkill(4221001,0,10,-1);
                        cm.teachSkill(4221000,0,10,-1);
                        cm.teachSkill(4221004,0,10,-1);
                        cm.teachSkill(4221003,0,10,-1);
                        cm.teachSkill(4221006,0,10,-1);
                        cm.teachSkill(4221000 ,0,10,-1);
                        cm.teachSkill(4220002 ,0,10,-1);
                        cm.teachSkill(4220005 ,0,10,-1);
                        cm.teachSkill(4221007 ,0,10,-1);
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
       
        else if (status == 1 && cm.getPlayer().getJob().getId() == 1411 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(14111005) ===0 && cm.getPlayer().getSkillLevel(4121006) ===0 && cm.getPlayer().getSkillLevel(14110004) ===0 ){
                        cm.teachSkill(14111005,0,20,-1);
                        cm.teachSkill(4121006,0,20,-1);
                        cm.teachSkill(14110004 ,0,20,-1);


                        
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 1211 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(12111003) ===0 && cm.getPlayer().getSkillLevel(12111004) ===0 ){
                        cm.teachSkill(12111003,0,20,-1);
                        cm.teachSkill(12111004,0,20,-1);

                        
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 1311 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(13111002) ===0 && cm.getPlayer().getSkillLevel(13110003) ===0 ){
                        cm.teachSkill(13111002,0,20,-1);
                        cm.teachSkill(13110003 ,0,20,-1);


                        
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 1111 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(11111004) ===0 && cm.getPlayer().getSkillLevel(11110005 ) ===0){
                        cm.teachSkill(11111004 ,0,30,-1);
                        cm.teachSkill(11110005  ,0,30,-1);

                        
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
         else if (status == 1 && cm.getPlayer().getJob().getId() == 1511 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(15111004 ) ===0 && cm.getPlayer().getSkillLevel(15111005) ===0){
                        cm.teachSkill(15111004  ,0,20,-1);
                        cm.teachSkill(15111005   ,0,20,-1);

                        
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 512 && cm.getMeso() >= 10000000  && cm.getPlayer().getSkillLevel(5121000) ===0 && cm.getPlayer().getSkillLevel(5121001) ===0  && cm.getPlayer().getSkillLevel(5121002) ===0  && cm.getPlayer().getSkillLevel(5121003) ===0 && cm.getPlayer().getSkillLevel(5121004) ===0 && cm.getPlayer().getSkillLevel(5121005) ===0 && cm.getPlayer().getSkillLevel(5121007) ===0 && cm.getPlayer().getSkillLevel(5121008) ===0 && cm.getPlayer().getSkillLevel(5121009) ===0 && cm.getPlayer().getSkillLevel(5121010) ===0  ){
                        cm.teachSkill(5121000 ,0,10,-1);
                        cm.teachSkill(5121001,0,30,-1);
                        cm.teachSkill(5121007,0,30,-1);
                        cm.teachSkill(5121002 ,0,30,-1);
                        cm.teachSkill(5121003 ,0,30,-1);
                        cm.teachSkill(5121009 ,0,20,-1);
                        cm.teachSkill(5121010  ,0,30,-1);
                        cm.teachSkill(5121008  ,0,5,-1);
                        cm.teachSkill(5121004  ,0,30,-1);
                        cm.teachSkill(5121005  ,0,30,-1);
                      
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 522 && cm.getMeso() >= 10000000  && cm.getPlayer().getSkillLevel(5221000) ===0 && cm.getPlayer().getSkillLevel(5220001) ===0  && cm.getPlayer().getSkillLevel(5220011) ===0  && cm.getPlayer().getSkillLevel(5220002) ===0 && cm.getPlayer().getSkillLevel(5221003) ===0 && cm.getPlayer().getSkillLevel(5221004) ===0 && cm.getPlayer().getSkillLevel(5221009) ===0 && cm.getPlayer().getSkillLevel(5221006) ===0 && cm.getPlayer().getSkillLevel(5221007) ===0 && cm.getPlayer().getSkillLevel(5221008) ===0 && cm.getPlayer().getSkillLevel(5221010) ===0  ){
                        cm.teachSkill(5221000 ,0,10,-1);
                        cm.teachSkill(5220001 ,0,30,-1);
                        cm.teachSkill(5220011  ,0,20,-1);
                        cm.teachSkill(5220002  ,0,20,-1);
                        cm.teachSkill(5221003  ,0,30,-1);
                        cm.teachSkill(5221004   ,0,30,-1);
                        cm.teachSkill(5221009   ,0,20,-1);
                        cm.teachSkill(5221006    ,0,10,-1);
                        cm.teachSkill(5221007    ,0,30,-1);
                        cm.teachSkill(5221008    ,0,30,-1);
                        cm.teachSkill(5221010       ,0,5,-1);





                        
                      
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 2111 && cm.getLevel() >=70 && cm.getLevel() <120 && cm.getPlayer().getSkillLevel(21110007) ==0 ||  cm.getPlayer().getSkillLevel(21110007) ==1){
                        cm.teachSkill(21110007 ,1,1,-1);
                        cm.teachSkill(21110008 ,1,1,-1);
                        





                        
                      
 cm.sendOk("Seu combo foi corrigido com sucesso, perdoe o programador,falta conhecimentos de Aran!");
 cm.dispose();
        }
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 1411 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(14111005) >0 || cm.getPlayer().getSkillLevel(4121006) >0 && cm.getPlayer().getSkillLevel(14110004) ===0 ){
                                   cm.teachSkill(14110004 ,0,20,-1);
                                   cm.gainMeso(-10000000)
                                   cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
                             cm.dispose();
                    }
                    
        else if (status == 1 && cm.getPlayer().getJob().getId() == 1311 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(13111002) >0 && cm.getPlayer().getSkillLevel(13110003) ===0 ){
                                   cm.teachSkill(13110003,0,20,-1);
                                   cm.gainMeso(-10000000);
                                   cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
                             cm.dispose();
                    }
                    
                    else if (status == 1 && cm.getPlayer().getJob().getId() == 1111 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(11111004) >0 && cm.getPlayer().getSkillLevel(11110005) ===0 ){
                        cm.teachSkill(11110005,0,20,-1);

                        
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
        
        else if (status == 1 && cm.getPlayer().getJob().getId() == 1211 && cm.getMeso() >= 10000000 && cm.getPlayer().getSkillLevel(12111004) ===0 ){
                        cm.teachSkill(12111004,0,20,-1);

                        
                        cm.gainMeso(-10000000);
 cm.sendOk("Suas Habilidades foram adicionadas com sucesso!");
 cm.dispose();
        }
       
else{
cm.sendOk("Você precisa treinar mais,ou, você já possui todas as habilidades possiveis.. ");
cm.dispose();
}
}
}