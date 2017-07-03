package com.victoria.servlets;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import org.apache.catalina.servlets.DefaultServlet;

public class AngularDefaultServlet extends DefaultServlet {

    @Override
    protected void serveResource(HttpServletRequest request,
                                 HttpServletResponse response,
                                 boolean content,
                                 String encoding)
    throws IOException, ServletException {
        String path = request.getRequestURI();
        // Let angular perform client-side routing on any path that
        // doesn't look like a file
        if(!path.contains("."))
            request.getRequestDispatcher("/index.html").forward(request, response);
        else
            super.serveResource(request, response, content, encoding);
    }

}
