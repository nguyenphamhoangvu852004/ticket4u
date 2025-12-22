package com.example.ticket4u.internal.middlewares;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLoginJWTPayload {
    private String id;
    private String email;
    private long iat;
    private long exp;
}
