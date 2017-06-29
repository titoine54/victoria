package com.victoria.filters;

import java.io.IOException;
import static org.mockito.Mockito.*;
import org.mockito.*;
import org.mockito.Matchers.*;
import org.mockito.runners.MockitoJUnitRunner;
import static org.junit.Assert.*;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.servlet.*;
import javax.servlet.http.*;
import java.util.regex.Pattern;

@RunWith(MockitoJUnitRunner.class)
public class XsrfPreventionFilterTest {

    XsrfPreventionFilter test = new XsrfPreventionFilter();

    @Test
    public void setNonce()
    throws IOException, ServletException {
        HttpSession session = mock(HttpSession.class);
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);
        FilterConfig filterConfig = mock(FilterConfig.class);

        when(filterConfig.getInitParameter("ignorePattern")).thenReturn(null);
        when(request.getSession(true)).thenReturn(session);
        when(request.getMethod()).thenReturn("GET");

        test.init(filterConfig);
        test.doFilter(request, response, filterChain);

        ArgumentCaptor<Cookie> argument = ArgumentCaptor.forClass(Cookie.class);
        verify(response).addCookie(argument.capture());
        Cookie cookie = argument.getValue();

        //nonce should be 26 alphanumeric characters
        assertTrue(Pattern.compile("^\\p{Alnum}{26}$").matcher(cookie.getValue()).matches());
        assertEquals(cookie.getPath(), "/");
        assertEquals(cookie.getMaxAge(), 24*3600);
        verify(session).setAttribute(eq(XsrfPreventionFilter.XSRF_COOKIE_NAME), eq(cookie.getValue()));
        verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    public void valideNonce()
    throws IOException, ServletException {
        HttpSession session = mock(HttpSession.class);
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);
        FilterConfig filterConfig = mock(FilterConfig.class);

        when(filterConfig.getInitParameter("ignorePattern")).thenReturn(null);
        when(request.getSession(true)).thenReturn(session);
        when(request.getMethod()).thenReturn("POST");
        when(request.getHeader(XsrfPreventionFilter.XSRF_HEADER_NAME)).thenReturn("someNonce");
        when(session.getAttribute(XsrfPreventionFilter.XSRF_COOKIE_NAME)).thenReturn("someNonce");

        test.init(filterConfig);
        test.doFilter(request, response, filterChain);

        verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    public void invalideNonce()
    throws IOException, ServletException {
        HttpSession session = mock(HttpSession.class);
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);
        FilterConfig filterConfig = mock(FilterConfig.class);

        when(filterConfig.getInitParameter("ignorePattern")).thenReturn(null);
        when(request.getSession(true)).thenReturn(session);
        when(request.getMethod()).thenReturn("POST");
        when(request.getHeader(XsrfPreventionFilter.XSRF_HEADER_NAME)).thenReturn("someNonce");
        when(session.getAttribute(XsrfPreventionFilter.XSRF_COOKIE_NAME)).thenReturn("someOtherNonce");

        test.init(filterConfig);
        test.doFilter(request, response, filterChain);

        verify(response).sendError(eq(403));
        verify(filterChain, never()).doFilter(request, response);
    }

    @Test
    public void ignoredPath()
    throws IOException, ServletException {
        HttpSession session = mock(HttpSession.class);
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);
        FilterConfig filterConfig = mock(FilterConfig.class);

        when(filterConfig.getInitParameter("ignorePattern")).thenReturn("/ignorethisplz.*");
        when(request.getRequestURI()).thenReturn("/ignorethisplz/toignore");

        test.init(filterConfig);
        test.doFilter(request, response, filterChain);

        verify(response, never()).sendError(anyInt());
        verify(response, never()).addCookie(any(Cookie.class));
        verify(filterChain, times(1)).doFilter(request, response);
    }

}
