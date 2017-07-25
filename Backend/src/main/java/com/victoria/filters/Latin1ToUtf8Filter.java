package com.victoria.filters;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.*;
import java.net.URLDecoder;
import java.net.URLEncoder;

/**
 * CAS likes to encode url using Latin-1
 * This filter detects these urls and redirects to an utf-8 version
 */
public class Latin1ToUtf8Filter implements Filter {

    public void init(final FilterConfig filterConfig) throws ServletException {
    }

    public void doFilter(final ServletRequest servletRequest, final ServletResponse servletResponse,
            final FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String uri = request.getRequestURI().toString();

        String latin1Uri = URLDecoder.decode(uri, "ISO-8859-1");
        if (!validUtf8(latin1Uri.getBytes("ISO-8859-1"))) {
            String encodedUri = URLEncoder.encode(latin1Uri, "UTF-8");

            String validUri = encodedUri.replace("%2F", "/").replace("+", "%20");
            String query = request.getQueryString();
            if (query != null) {
                validUri += "?" + query;
            }

            response.sendRedirect(validUri);
            return;
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    public void destroy() {
    }

    static private boolean validUtf8(byte[] bytes) {
        for (int i = 0; i < bytes.length; i++) {
            byte code = bytes[i];
            if(((code >> 7) & 1) == 1) {
                // look for most significant 0
                boolean found = false;
                int j;
                for (j = 1; j < 4; j++) {
                  if (((~code >> (7-j)) & 1) == 1) {
                      found = true;
                      break;
                  }
                }
                if (!found || j == 1 || i + j > bytes.length + 1) {
                    return false;
                }

                // the next j-1 bytes need to start with 10
                for (int k = 1; k < j; k++) {
                    byte nextCode = bytes[i+k];
                    if (((~nextCode >> 7) & 1) == 1 || ((nextCode >> 6) & 1) == 1) {
                        return false;
                    }
                }

                i += j - 1;
            }
        }
        return true;
    }

}
