//Mdaghawi
/*
var wui = 0;

function start() {
	cm.sendSimple("#rTrick-or-treat #k #b#h #!#k \r\n\r\n O Halloween tem a origem numa tradição muito mais antiga, e faz parte de um termo de origem gaélica que significa #ro fim do verão #k, marcava o início do inverno, o fim das colheitas e o início do novo ano celta, mas tudo isto esta ameaçado pois os guardiões do halloween foram mortos e as chaves das festas foram roubadas, gostaria que você me ajudasse a coleta-las novamente e salvar este lindo festejo. Em troca lhe darei o item mais poderoso de nossa geração, um item forjado pelo mal mas que se usado corretamente lhe dara um  grande poder! #b\r\n\r\n#L0#Vou ajudar a salvar o Halloween.#l #k");
}

function action(mode, type, selection) {
	if (mode == 0 || wui == 1) {
        cm.dispose();
	}
        if (selection == 0 ) {
            
            	cm.sendSimple("Esta mansão é maldita e assombrada,a presença de espiritos é constante, começando por olivia, uma criança que residia este lugar a mais de mil anos,os brinquedos dela ganham vida no #rhalloween#k e eles possuem as #rchaves#k para libertar este lugar do mal, no entanto, não sei lhe dizer quais são estes monstros, sei que habitam esta casa, sera um esqueleto, uma boneca?, que a sorte esteja com você! \r\n\r\n Procure por estas chaves: \r\n\r\n #i4032438# x30 \r\n #i4032439# x30 \r\n #i4032440# x30  \r\n\r\n Coletando-as volte até mim.#b\r\n\r\n#L1#Coletei as chaves conforme a história.#l \r\n#L2#Aumentar o poder dos meus itens.#l #k");

        
	
    }  else if (selection == 1 ) {
        
    if(cm.haveItem(4032438,30) && cm.haveItem(4032439,30) && cm.haveItem(4032440,30) && cm.canHold(1132014) && cm.canHold(1132015)) {
       
        cm.gainItem(1132014,1);
        cm.gainItem(1132015,1);
        cm.gainItem(4032438,-30);
        cm.gainItem(4032439,-30);
        cm.gainItem(4032440,-30);
        
        
        cm.sendOk("Parabéns você completou este evento de halloween e recebeu sua recompensa,caso deseje melhora-las selecione a opção #b'Aumentar o poder dos meus itens'#k");
        cm.dispose();

        
        
        }
        else {
            cm.sendOk("Você tem certeza que coletou as chaves?, sei que os brinquedos malditos são dificeis de se enfrentar, mas tenho certeza que seu poder será suficiente.");
            cm.dispose();

        }
}

      else if (selection == 2 ) {
          cm.sendSimple("Então você quer continuar a desafiar o mal, aviso-lhe que não será nada facil, no entanto a escolha é sua, a recompensa sera maior do que tudo ja visto, \r\n Vá para #r Lubibrium #k onde os ursos mortos residem, recupere deles a boneca preferida de minha querida #rMenina#k \r\n\r\n Colete: \r\n\r\n #i4000517# x1 \r\n #i1132014# x1 \r\n #i1132015# x1 \r\n\r\n #b #L3#Devolver a boneca de Sophilia.#l #k ")
      }
      
      else if (selection == 3 ) {
              if(cm.haveItem(4000517,1) && cm.haveItem(1132014,1) && cm.haveItem(1132015,1) && cm.canHold(1132016)) {
                  
               cm.gainItem(1132016,1);
               cm.gainItem(1132014,-1);
               cm.gainItem(1132015,-1);
               cm.gainItem(4000517,-1);
        cm.sendOk("Parabéns você completou este evento e conseguiu o item máximo, você pode adquirir itens em outros eventos ativos ou realizar este quantas vezes quiser!#k");

              cm.dispose();

        }
        
        else {
                        cm.sendOk("Você tem certeza que recuperou a boneca e possui os itens informados corretamente?");

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
cm.sendOk("Aaah o Halloween..");
cm.dispose();
}

function action(mode, type, selection) {
cm.dispose();
}