var setupTask;
var nomeServer = "Informativo";

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 2);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis())
        nextTime += 100 * 6000;
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    scheduleNew();
    em.getChannelServer().saveAll();
    em.getChannelServer().setRates();
   
    var mensagem = new Array("Todos os jogadores foram salvos com sucesso!");
    em.getChannelServer().yellowWorldMensagemAmarela("["+ nomeServer +"] " + mensagem);
        
}