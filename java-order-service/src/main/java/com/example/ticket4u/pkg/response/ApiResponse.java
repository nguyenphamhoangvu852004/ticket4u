package com.example.ticket4u.pkg.response;

import com.example.ticket4u.pkg.errorCustom.ErrorCustom;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;
    private Object error;

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "Success", data, null);
    }

    public static <T> ApiResponse<T> error(int code, String message, Object error) {
        switch (code) {
            case 400:
                return new ApiResponse<>(code, "Bad Request", null, error);
            case 404:
                return new ApiResponse<>(code, "Not Found", null, error);
            case 409:   
                return new ApiResponse<>(code, "Conflict", null, error);
            default:
                return new ApiResponse<>(500, "Internal Server Error", null, error);
        }
    }
}
