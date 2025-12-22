package com.example.ticket4u.utils;


import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class TimeUtils {

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
                             .withZone(ZoneId.systemDefault());

    /**
     * Lấy current time theo UNIX seconds
     */
    public static int getNowSeconds() {
        return Integer.parseInt(String.valueOf(System.currentTimeMillis() / 1000L)) ;
    }

    /**
     * Lấy current time theo UNIX milliseconds
     */
    public static long getNowMillis() {
        return System.currentTimeMillis();
    }

    /**
     * Format từ UNIX seconds -> String
     */
    public static String formatFromSeconds(long unixSeconds) {
        return FORMATTER.format(Instant.ofEpochSecond(unixSeconds));
    }

    /**
     * Format từ UNIX milliseconds -> String
     */
    public static String formatFromMillis(long unixMillis) {
        return FORMATTER.format(Instant.ofEpochMilli(unixMillis));
    }
}

