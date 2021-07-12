/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package config.jogo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import tools.DatabaseConnection;

/**
 *
 * @author Marcos
 */
public class SenhaCriptografada {

    public static String getSenhaCrypt(String name) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps;
            ResultSet rs;

            ps = con.prepareStatement("SELECT name, password2 FROM accounts WHERE name = ?");
            ps.setString(1, name);
            rs = ps.executeQuery();
            if (rs.next()) {
                return "username: " + rs.getString("name") + " | password: " + rs.getString("password");

            }
            int accid;
            ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, name);
            rs = ps.executeQuery();
            if (!rs.next()) {
                return "Este conta/personagem nao existe.";
            } else {
                accid = rs.getInt("accountid");
            }

            ps = con.prepareStatement("SELECT name, password2 FROM accounts WHERE id = ?");
            ps.setInt(1, accid);
            rs = ps.executeQuery();
            return "username: " + rs.getString("name") + " | password: " + rs.getString("password");
        } catch (SQLException exe) {
            return null;
        }
    }

}
