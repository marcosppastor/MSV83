package server;

import java.io.FileReader;
import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;
import tools.DatabaseConnection;

/**
 *
 * @author Emilyx3
 */
public class ServerProperties {

    private static final Properties props = new Properties();
    private static final String[] toLoad = {
        "world.properties",
        "db.properties",
        "login.properties",
        "channel.properties"
    };

    private ServerProperties() {
    }

    static {
        for (String s : toLoad) {
            FileReader fr;
            try {
                fr = new FileReader(s);
                props.load(fr);
                fr.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }

    public static String getProperty(String s) {
        return props.getProperty(s);
    }

    public static void setProperty(String prop, String newInf) {
        props.setProperty(prop, newInf);
    }

    public static String getProperty(String s, String def) {
        return props.getProperty(s, def);
    }
}
