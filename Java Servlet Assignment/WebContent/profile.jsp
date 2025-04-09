<%@ page import="javax.servlet.http.*, java.sql.*" %>
<%
    HttpSession session = request.getSession();
    String username = (String) session.getAttribute("username");

    if (username == null) {
        response.sendRedirect("login.jsp");
    }

    try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/user_db", "root", "password")) {
        String sql = "SELECT * FROM users WHERE username = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, username);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
%>
                <h1>Welcome, <%= rs.getString("full_name") %></h1>
                <p>Username: <%= rs.getString("username") %></p>
                <p>Email: <%= rs.getString("email") %></p>
                <a href="logout.jsp">Logout</a>
<%
            }
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
%>
