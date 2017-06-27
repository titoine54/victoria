package com.victoria.filters;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;
import java.util.regex.Pattern;
import java.security.SecureRandom;
import java.math.BigInteger;

public class XsrfPreventionFilter implements Filter {

    public static final String XSRF_HEADER_NAME = "X-XSRF-TOKEN";
    public static final String XSRF_COOKIE_NAME = "XSRF-TOKEN";
    private static final String passiveVerb = "GET";
    private SecureRandom random;
    private Pattern ignorePattern;

    public void init(FilterConfig filterConfig) throws ServletException {
        random = new SecureRandom();

        String pattern = filterConfig.getInitParameter("ignorePattern");
        ignorePattern = Pattern.compile(pattern);
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
    throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        if(isIgnored(httpRequest)) {
            chain.doFilter(httpRequest, httpResponse);
        } else {
            doXSRFFilter(httpRequest, httpResponse, chain);
        }
    }

    private void doXSRFFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws IOException, ServletException {
        HttpSession session = request.getSession(true);

        if(request.getMethod().equals(passiveVerb)) {
            String nonce = generateNonce();

            response.addCookie(buildCookie(nonce));
            session.setAttribute(XSRF_COOKIE_NAME, nonce);
        } else {
            String receivedNonce = request.getHeader(XSRF_HEADER_NAME);
            String nonce = (String) session.getAttribute(XSRF_COOKIE_NAME);

            if(nonce == null || receivedNonce == null) {
                return;
            }

            if(!receivedNonce.equals(nonce)) {
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private Boolean isIgnored(HttpServletRequest request) {
        return ignorePattern != null && ignorePattern.matcher(request.getRequestURI()).matches();
    }

    private String generateNonce() {
        return new BigInteger(130, random).toString(32);
    }

    private Cookie buildCookie(String nonce) {
        Cookie cookie = new Cookie(XSRF_COOKIE_NAME, nonce);
        cookie.setPath("/");
        cookie.setMaxAge(24*3600); // lasts a day
        return cookie;
    }

    public void destroy() {
    }

}
