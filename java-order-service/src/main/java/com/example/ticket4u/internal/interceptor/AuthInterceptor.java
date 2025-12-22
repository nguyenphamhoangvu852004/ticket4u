package com.example.ticket4u.internal.interceptor;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.method.HandlerMethod;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.ticket4u.internal.anotation.RequireLogin;
import com.example.ticket4u.internal.middlewares.UserLoginJWTPayload;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.servlet.HandlerInterceptor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Value("${login.user.jwt.secret}")
    private String userLoginJWTSecret;

    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response,
            Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod method)) {
            return true;
        }

        boolean requireLogin = method.hasMethodAnnotation(RequireLogin.class)
                || method.getBeanType().isAnnotationPresent(RequireLogin.class);

        if (!requireLogin) {
            return true; // public API
        }
        String auth = request.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            response.setStatus(401);
            return false;
        }

        String token = auth.substring(7);
        Algorithm algorithm = Algorithm.HMAC256(userLoginJWTSecret);

        try {
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);
            UserLoginJWTPayload payload = new UserLoginJWTPayload();
            payload.setId(jwt.getClaim("id").asString());
            payload.setEmail(jwt.getClaim("email").asString());

            request.setAttribute("userPayloadJWTDecoded", payload);
            return true;
        } catch (Exception e) {
            response.setStatus(401);
            return false;
        }
    }
}
