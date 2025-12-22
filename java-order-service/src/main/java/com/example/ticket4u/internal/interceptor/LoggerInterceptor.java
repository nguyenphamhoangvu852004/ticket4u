package com.example.ticket4u.internal.interceptor;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class LoggerInterceptor implements HandlerInterceptor {

    private Logger log =  LoggerFactory.getLogger(LoggerInterceptor.class);

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        String requestId = (String) request.getAttribute("requestId");
        int status = response.getStatus();

        // System.out.println("[RESPONSE] id=" + requestId + ", status=" + status);
        log.info("[RESPONSE] id=" + requestId + ", status=" + status);
        if (ex != null) {
            // System.out.println("[ERROR] id=" + requestId + " msg=" + ex.getMessage());
            log.error("[ERROR] id=" + requestId + " msg=" + ex.getMessage());
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        // TODO Auto-generated method stub
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String method = request.getMethod();
        String uri = request.getRequestURI();
        String query = request.getQueryString();
        String requestId = UUID.randomUUID().toString();

        request.setAttribute("requestId", requestId);

        log.info("[REQUEST] id=" + requestId +
                ", method=" + method +
                ", uri=" + uri +
                (query != null ? "?" + query : ""));
        return true;
    }

}
