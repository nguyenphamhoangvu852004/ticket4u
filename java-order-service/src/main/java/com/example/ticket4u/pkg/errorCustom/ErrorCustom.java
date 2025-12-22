package com.example.ticket4u.pkg.errorCustom;

public class ErrorCustom extends RuntimeException { 
    private int code;
    public ErrorCustom(int code ,String message) {
        super(message);
        this.code = code;
    }
    public int getCode() {
        return code;
    }

}
