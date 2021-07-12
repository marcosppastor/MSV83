/*
 * LeaderMS 2012 
 */
var setupTask;
var nomeServer = "DicaMaple";

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 1);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis())
        nextTime += 300 * 1000;
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    scheduleNew();
    var Message = new Array("Use os atalhos do teclado (I, E, S, K, G, W, M, R, H) para acessar todos os menus rapidamente.",
        "Para associar um item a um atalho de teclado, arraste o item do seu inventário para o slot rápido.",
        "Procure portais escondidos para ampliar sua aventura!",
        "Pressione F1~F7 para fazer careta.",
        "Use o portal em um mapa para ir para uma área diferente.",
        "A maioria dos portais é exibida no minimapa como um ponto azul.",
        "Ao sair da Ilha Victoria, você não poderá voltar à Ilha Maple.",
        "Outros personagens ao seu redor serão mostrados, no minimapa, como pontos vermelhos.",
        "Ficar parado recupera lentamente a barra de vida.",
        "Pressione CTRL para atacar e ALT para saltar.",
        "Visite as lojas para comprar as poções e equipamentos necessários para sua jornada.",
        "Quando você subir de nível, entre na janela de atributos para gastar os pontos de atributos ganhos.",
        "Você só pode escolher uma classe. Ao escolher a primeira classe, o caminho do seu personagem será na classe escolhida.",
        "Para usar com um item, entre no inventário de equipamentos e arraste o item para a janela de itens usados ou clique duas vezes no item desejado no inventário.",
        "Usuários que abusarem dos Termos de Serviço serão bloqueados do jogo.",
        "Quem usar, vender, trocar ou promover hackers ou ferramentas de hackers será bloqueado do jogo.",
        "Itens pagos podem ser comprados na Loja de Itens, usando Dinheiro Nexon comprado em nosso site.",
        "Fale com os instrutores das cclasses em cada cidade para mudar de classe.",
        "Para se tornar um bruxo, você precisa estar no nível 8. As outras profissões exigem no mínimo o nível 10.",
        "São PROIBIDOS o compartilhamento, a venda e a troca de contas. Essas contas serão bloqueadas.");
        em.getChannelServer().yellowWorldMessageAprendiz("["+ nomeServer +"] " + Message[Math.floor(Math.random() * Message.length)]);
}