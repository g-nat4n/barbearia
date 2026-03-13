package barbearia.barbearia;

import java.sql.Connection;
import java.sql.DriverManager;

public class TestePostgres {
    public static void main(String[] args) throws Exception {
        Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/barbearia",
                "postgres",
                "040501"
        );
        System.out.println("Conectou ao PostgreSQL!");
        conn.close();
    }
}