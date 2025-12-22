package com.example.ticket4u.utils;

import lombok.Data;

@Data
public class ApiResponseStruct<T> { 
    private int code;
    private String message;
    private T data;
    private Object error;
}
