/*
 * @author Marcos Paulo Pastor
 * True MapleStory - 2018
 * https://truems.net.br/
 */
 
var setupTask;
var nomeServer = "DicaMaple";


function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 8);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis())
        nextTime += 100 * 1000;
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    scheduleNew();
    var Message = new Array(
	    "Última atualização: 14/05/2018.",
        "Agora foi melhorado o evento de experiência em dobro durante os finais de semana!!",
        "Para saber como casar, fale com o Ames, O Sábio, em Amoria. Ele lhe explicará!",
        "Vender itens ou mesos por dinheiro acarreta em banimento permanente do jogador!",
        "Para casar-se na Catedral, compre o Bilhete Casamento Catedral Chique na Loja!",
        "Casamentos Catedral e Capela disponíveis!",
        "Para casar-se na Capela compre o Bilhete Casamento Capela Chique na Loja!",
        "Ao descartar o anel de noivado, você perde os vínculos com o(a) parceiro(a) e será necessario casar-se novamente para ter os beneficios!",
        "Procurando itens raros? Abra o Gachapon!",
        "Para se casar, primeiro você deve escolher um(a) parceiro(a) e em seguida se informar próximo a Catedral em Amoria!",
        "Somente personagens casados podem fazer a Missão de Amoria e em horários pré definidos",
        "Você pode obter itens raros nos Gachapons de todas as cidades. Basta comprar um Cupom na Loja!",
		"Varias Missões em Grupo disponiveis. Aproveite!",
        "Troque Folhas Maple por Items Maple falando com a Mia, localizada em Henesys!",
        //"Troque Folhas Maple por Items Maple LV. 77 falando com o NPC Mad Bunny, localizado em Henesys!",
        "Personagem travado? Digite '@w' para resolver!",
        "Ficar parado recupera lentamente a barra de vida.",
		"Para adquirir a Terceira Classe, fale com o seu instrutor em El Nath!",
		"Aproveite as missões em grupo disponíveis no Mercado 7!");
        //"Presentei-e um amigo com item de cash. Vá à Loja e clique em presente!");         

        em.getChannelServer().yellowWorldMensagemAmarela("["+ nomeServer +"] "+Message[Math.floor(Math.random() * Message.length)]);
        
}