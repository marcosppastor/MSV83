/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package server.recompensa;

import java.util.ArrayList;
import java.util.List;
import tools.Pair;

/**
 *
 * @author Patrick/PurpleMadness
 */
public class MapleAchievements {

    private List<Pair<Integer, MapleAchievement>> achievements = new ArrayList<Pair<Integer, MapleAchievement>>();
    private static MapleAchievements instance = null;

    protected MapleAchievements() {

        achievements.add(new Pair<Integer, MapleAchievement>(1, new MapleAchievement("finished the training camp", 250, 3, false)));
        achievements.add(new Pair<Integer, MapleAchievement>(2, new MapleAchievement("completed the BossQuest", 17500)));
        achievements.add(new Pair<Integer, MapleAchievement>(3, new MapleAchievement("por matar a Anego", 3500)));
        achievements.add(new Pair<Integer, MapleAchievement>(4, new MapleAchievement("reached Level 70", 5000)));
        achievements.add(new Pair<Integer, MapleAchievement>(5, new MapleAchievement("reached Level 120", 7500)));
        achievements.add(new Pair<Integer, MapleAchievement>(6, new MapleAchievement("por matar um boss.", 10)));
        achievements.add(new Pair<Integer, MapleAchievement>(7, new MapleAchievement("equipped a dragon item", 3000)));
        achievements.add(new Pair<Integer, MapleAchievement>(8, new MapleAchievement("reached the meso cap", 10000)));
        achievements.add(new Pair<Integer, MapleAchievement>(9, new MapleAchievement("reached 50 fame", 2000, 25)));
        achievements.add(new Pair<Integer, MapleAchievement>(10, new MapleAchievement("por matar o Papulatus", 2500)));
        achievements.add(new Pair<Integer, MapleAchievement>(11, new MapleAchievement("saw a GM", 500, 7, false)));
        achievements.add(new Pair<Integer, MapleAchievement>(12, new MapleAchievement("succesfully scrolled an item", 1000, 10, false)));
        achievements.add(new Pair<Integer, MapleAchievement>(13, new MapleAchievement("earned a Zakum Helm", 2500, 15)));
        achievements.add(new Pair<Integer, MapleAchievement>(14, new MapleAchievement("said cc plz", 100, 5, false)));
        // achievements.add(new Pair<Integer, MapleAchievement>(15, new MapleAchievement("flew to Victoria Island by Shanks", 500, false)));
        achievements.add(new Pair<Integer, MapleAchievement>(16, new MapleAchievement("por matar o Zakum", 5000)));
        achievements.add(new Pair<Integer, MapleAchievement>(17, new MapleAchievement("por completar uma troca", 250, 5, false)));
        achievements.add(new Pair<Integer, MapleAchievement>(18, new MapleAchievement("por matar uma Lesma", 100, 5, false)));
        achievements.add(new Pair<Integer, MapleAchievement>(19, new MapleAchievement("por matar o Pianus", 50, 1)));
        achievements.add(new Pair<Integer, MapleAchievement>(20, new MapleAchievement("hit more than 10,000 damage to one monster", 3000, 10)));
        achievements.add(new Pair<Integer, MapleAchievement>(21, new MapleAchievement("hit 99,999 damage to one monster", 6000, 15)));
        achievements.add(new Pair<Integer, MapleAchievement>(22, new MapleAchievement("reached level 200 for the 1st time", 35000, 25)));
        achievements.add(new Pair<Integer, MapleAchievement>(23, new MapleAchievement("won Field of Judgement", 3500, 15)));
        achievements.add(new Pair<Integer, MapleAchievement>(24, new MapleAchievement("created a Guild", 2000, 6)));
        achievements.add(new Pair<Integer, MapleAchievement>(25, new MapleAchievement("completed the Guild Quest", 3000, 20)));
        achievements.add(new Pair<Integer, MapleAchievement>(26, new MapleAchievement("por matar o Horntail", 30000, 40)));
        achievements.add(new Pair<Integer, MapleAchievement>(27, new MapleAchievement("got a vote point for the first time!", 30000, 30)));
        achievements.add(new Pair<Integer, MapleAchievement>(28, new MapleAchievement("killed a bob for the first time", 40000, 50)));
        achievements.add(new Pair<Integer, MapleAchievement>(29, new MapleAchievement("donated a Maple Leaf for the Event", 30000, 40, true, true, 50000000)));
        achievements.add(new Pair<Integer, MapleAchievement>(30, new MapleAchievement("said wtf! I'm sure they will have more wtf's later!", 1000, 40, true, true, 10000000)));
        achievements.add(new Pair<Integer, MapleAchievement>(31, new MapleAchievement("won Capture the Flag for the first time", 35000, 35)));
        achievements.add(new Pair<Integer, MapleAchievement>(32, new MapleAchievement("said gtfo noob", 1000, 20)));
        achievements.add(new Pair<Integer, MapleAchievement>(33, new MapleAchievement("learned his ABC's", 1000, 20)));
        achievements.add(new Pair<Integer, MapleAchievement>(34, new MapleAchievement("got 1,000 Monster Kills", 35000, 20)));
        achievements.add(new Pair<Integer, MapleAchievement>(35, new MapleAchievement("got 10,000 Monster Kills", 35000, 50, true, true, 500000000)));
        achievements.add(new Pair<Integer, MapleAchievement>(36, new MapleAchievement("got 100,000 Monster Kills", 35000, 100, true, true, 1000000000)));
        achievements.add(new Pair<Integer, MapleAchievement>(37, new MapleAchievement("said 'i suck!' I think that's a personal problem :O", 5000, 5, true, true, 5000000)));
        achievements.add(new Pair<Integer, MapleAchievement>(38, new MapleAchievement("did the boat quest for the first time!", 35000, 20)));

    }

    public static MapleAchievements getInstance() {
        if (instance == null) {
            instance = new MapleAchievements();
        }
        return instance;
    }

    public MapleAchievement getById(int id) {
        for (Pair<Integer, MapleAchievement> achievement : this.achievements) {
            if (achievement.getLeft() == id) {
                return achievement.getRight();
            }
        }
        return null;
    }

    public List getAllAchievements() {
        return this.achievements;
    }

    public Integer getByMapleAchievement(MapleAchievement ma) {
        for (Pair<Integer, MapleAchievement> achievement : this.achievements) {
            if (achievement.getRight() == ma) {
                return achievement.getLeft();
            }
        }
        return null;
    }
}
