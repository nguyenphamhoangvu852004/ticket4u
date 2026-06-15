package com.ticket4u.utils;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class TimeUtils {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            .withZone(ZoneId.systemDefault());

    /**
     * Lấy current time theo UNIX seconds
     */
    public static int getNowSeconds() {
        return Integer.parseInt(String.valueOf(System.currentTimeMillis() / 1000L));
    }

    /**
     * Format từ UNIX seconds -> String
     */
    public static String formatFromSeconds(long unixSeconds) {
        return FORMATTER.format(Instant.ofEpochSecond(unixSeconds));
    }

}
