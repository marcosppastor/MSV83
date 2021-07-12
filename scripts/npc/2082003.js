/*
 * @author Marcos P
 * TrueMS - 2016
 * truems.net/
*/
function start() {
cm.sendSimple("Caso você queira ir para um novo conceito de mundo, você esta no lugar certo!\r\nSempre vejo muitos guerreiros com sonhos extraordinários, mas quando deparam-se com a realidade, desistem facil.\r\n #L0#Eu quero ir para o Templo do Tempo #k#l");
}

function action(m, t, s) {
   if (m > 0){
      //cm.useItem(2210016); //TRANSFORM. DRAGÃO
      cm.warp(200090500, 0);
   }
   cm.dispose();
}  