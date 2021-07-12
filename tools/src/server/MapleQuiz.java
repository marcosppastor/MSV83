/*
package server; 

import client.MapleCharacter; 
import java.awt.Point; 
import java.sql.PreparedStatement; 
import java.sql.ResultSet; 
import java.sql.SQLException; 
import java.util.ArrayList; 
import server.maps.MapleMap; 
import tools.DatabaseConnection; 
import tools.MaplePacketCreator; 
import tools.Randomizer; 

public class MapleQuiz { 
    private static final ArrayList<MapleOxQuizQuestion> allQuestions = new ArrayList<MapleOxQuizQuestion>(); 
    private ArrayList<MapleOxQuizQuestion> availableQuestions = new ArrayList<MapleOxQuizQuestion>(); 
    private MapleMap map; 
    private MapleOxQuizQuestion currentQuestion; 
    private int number; 

    static { 
        loadQuestions(); 
    } 

    public MapleQuiz(MapleMap map) { 
        this.map = map; 
        this.availableQuestions = allQuestions; 
        // set first question 
        setQuestion(); 
    } 

    public static void loadQuestions() { 
        // clear old questions 
        allQuestions.clear(); 
        // load all questions! 
        try { 
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT question, answer, time FROM ox_questions"); 
            ResultSet rs = ps.executeQuery(); 
            while (rs.next()) { 
                allQuestions.add(new MapleOxQuizQuestion(rs.getString("question"), rs.getByte("time"), rs.getBoolean("answer"))); 
            } 
            rs.close(); 
            ps.close(); 
        } catch (SQLException sql) { 
            System.out.println("Failed to load OX question sets"); 
        } 
    } 

    public void sendQuestion() { 
        // display Question 
        map.broadcastMessage(MaplePacketCreator.serverNotice(6, number + ". " + currentQuestion.question)); 
        // send time 
        TimerManager.getInstance().schedule(new Runnable() { 
            @Override 
            public void run() { 
                // kill wrong people 
                for (MapleCharacter mc : map.getPlayers()) { 
                    if (mc == null) { 
                        continue; 
                    } 
                    if (!mc.isGM() && !isOnCorrectSide(mc)) { 
                        mc.setHpMp(0); 
                    } 
                } 
                // change question 
                setQuestion(); 
                // warp out dead 
                for (MapleCharacter mc : map.getPlayers()) { 
                    if (!mc.isAlive()) { 
                        mc.changeMap(mc.getMap().getReturnMap()); 
                    } 
                } 
                // continue or end event, if continue, send next 
                int nonGM = 0; 
                for (MapleCharacter mc : map.getPlayers()) { 
                    if (!mc.isGM()) { 
                        nonGM++; 
                        if (nonGM > 1) { 
                            sendQuestion(); 
                            return; 
                        } 
                    } 
                } 
                map.broadcastMessage(MaplePacketCreator.serverNotice(6, "O evento terminou")); 
                // givePrizes 
            } 
        }, currentQuestion.time * 1000); 
    } 

    private boolean isOnCorrectSide(MapleCharacter mc) { 
        Point pos = mc.getPosition(); 
        if (currentQuestion.answer) { 
            return (pos.x >= -142 && mc.getMap().getFootholds().findBelow(mc.getPosition()).getId() != 166 && pos.y > -206); 
        } 
        return (pos.x <= -308 && mc.getMap().getFootholds().findBelow(mc.getPosition()).getId() != 173 && pos.y > -206); 
    } 

    private void setQuestion() { 
        int index = Randomizer.getInstance().nextInt(availableQuestions.size()); 
        currentQuestion = availableQuestions.get(index); 
        availableQuestions.remove(index);
        number++; 
    } 

    private static class MapleOxQuizQuestion { 
        private final String question; 
        private final int time; 
        private final boolean answer; // is O 

        private MapleOxQuizQuestion(String question, int time, boolean answer) { 
            this.question = question; 
            this.time = time; 
            this.answer = answer; 
        } 
    }
    
    
    
}  

*/
