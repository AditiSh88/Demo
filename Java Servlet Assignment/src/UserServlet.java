import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

public class UserServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String fullName = request.getParameter("full_name");

        // Hash the password (you can use a stronger hashing function like bcrypt in a real-world app)
        String hashedPassword = password; // Just for simplicity; DON'T store plain-text passwords in production

        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/user_db", "root", "password")) {
            String sql = "INSERT INTO users (username, password, email, full_name) VALUES (?, ?, ?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, username);
                stmt.setString(2, hashedPassword);
                stmt.setString(3, email);
                stmt.setString(4, fullName);
                
                int rows = stmt.executeUpdate();
                if (rows > 0) {
                    response.sendRedirect("login.jsp");
                } else {
                    response.sendRedirect("register.jsp?error=Registration failed");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
