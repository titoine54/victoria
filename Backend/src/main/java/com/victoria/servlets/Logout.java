package com.victoria.servlets;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class Logout extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
        HttpSession session = request.getSession(false);
        if(session != null)
            session.invalidate();
        response.sendRedirect("https://cas.usherbrooke.ca/logout");
    }

}
