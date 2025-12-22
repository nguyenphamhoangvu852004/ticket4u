package com.example.ticket4u.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.ticket4u.internal.interceptor.AuthInterceptor;
import com.example.ticket4u.internal.interceptor.LoggerInterceptor;

@Component
public class LoggingConfig implements WebMvcConfigurer {
    @Autowired
    private LoggerInterceptor loggingInterceptor;
    @Autowired
    private AuthInterceptor authInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loggingInterceptor).addPathPatterns("/**");
        registry.addInterceptor(authInterceptor).addPathPatterns("/**");
    }

}
