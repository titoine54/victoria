package com.victoria.filters;

import org.jasig.cas.client.authentication.AuthenticationRedirectStrategy;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public final class Authentication401Strategy implements AuthenticationRedirectStrategy {

    public void redirect(final HttpServletRequest request, final HttpServletResponse response,
            final String potentialRedirectUrl) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }

}
