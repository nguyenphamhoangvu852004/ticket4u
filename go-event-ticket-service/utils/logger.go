package utils

import (
	"go-event-ticket-service/global"

	"go.uber.org/zap"
)

const (
	ErrorLevel = "error"
	WarnLevel  = "warn"
	InfoLevel  = "info"
	DebugLevel = "debug"
)

func CallLogger(level string, msg string, err error, fields ...zap.Field) {
	// Nếu có err thì tự đẩy vào fields
	if err != nil {
		fields = append(fields, zap.Error(err))
	}

	// // Nếu muốn log thêm "level" cho thống nhất JSON
	// fields = append(fields, zap.String("level", level))

	switch level {
	case ErrorLevel:
		global.Logger.Error(msg, fields...)
	case WarnLevel:
		global.Logger.Warn(msg, fields...)
	case InfoLevel:
		global.Logger.Info(msg, fields...)
	case DebugLevel:
		global.Logger.Debug(msg, fields...)
	default:
		global.Logger.Info(msg, fields...)
	}
}
