
function act() {
    rm.mapMessage(6, "A música tocava pelo ar.");
	var em = rm.getEventManager("OrbisPQ");
		em.setProperty("music", "1");
	
}