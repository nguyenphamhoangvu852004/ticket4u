package utils

import (
	"database/sql"
	"time"
)

func NullStringToString(ns sql.NullString) string {
	if ns.Valid {
		return ns.String
	}
	return ""
}

func StringToNullString(s string) sql.NullString {
	return sql.NullString{String: s, Valid: true}
}

func StringToTime(s string, layout string) time.Time {
	t, err := time.Parse(layout, s)
	if err != nil {
		panic(err)
	}
	return t
}

func UNIXtoTime(s int64) time.Time {
	return time.Unix(s, 0)
}

func TimeToUNIX(t time.Time) int64 {
	return t.Unix()
}

func StringToTimeTime(s string, layout string) time.Time {
	t, err := time.Parse(layout, s)
	if err != nil {
		panic(err)
	}
	return t
}

func TimeTimeToString(t time.Time, layout string) string {
	return t.Format(layout)
}
