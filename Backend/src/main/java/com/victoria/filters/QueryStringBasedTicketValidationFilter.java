package com.victoria.filters;

import org.jasig.cas.client.validation.Cas20ProxyReceivingTicketValidationFilter;
import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;

/**
 * Wrapper for Cas20ProxyReceivingTicketValidationFilter
 * Inheritance does not allow quite enough flexibility since
 * the preFilter method is final
 */
public class QueryStringBasedTicketValidationFilter implements Filter {

    private Cas20ProxyReceivingTicketValidationFilter filter;
    private String prefix;

    public QueryStringBasedTicketValidationFilter() {
        filter = new Cas20ProxyReceivingTicketValidationFilter();
    }

    public void init(final FilterConfig filterConfig) throws ServletException {
        filter.init(filterConfig);
        prefix = filterConfig.getInitParameter("service");
    }

    public void doFilter(final ServletRequest servletRequest, final ServletResponse servletResponse,
            final FilterChain filterChain) throws IOException, ServletException {
        // CAS requires the service parameter to be exactly the same at generation
        // and validation, since our api is note aware of the frontend routes
        // we forward the url as a query parameter
        String serviceUrl = servletRequest.getParameter("service");
        if (serviceUrl != null && !serviceUrl.startsWith(prefix)) {
            ((HttpServletResponse) servletResponse).sendError(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        filter.setService(serviceUrl);

        filter.doFilter(servletRequest, servletResponse, filterChain);
    }

    public void destroy() {
        filter.destroy();
    }

}
