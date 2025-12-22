package logger

import (
	"go-event-ticket-service/pkg/setting"
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

type LoggerZap struct {
	*zap.Logger
}

func NewLogger(logSetting setting.Log) *LoggerZap {
	logLevel := logSetting.LogLevel
	// debug --> info --> warning --> error ==> panic == > fatal ==> panic
	var level zapcore.Level
	switch logLevel {
	case "debug":
		level = zap.DebugLevel
	case "info":
		level = zap.InfoLevel
	case "warning":
		level = zap.WarnLevel
	case "error":
		level = zap.ErrorLevel
	case "panic":
		level = zap.PanicLevel
	case "fatal":
		level = zap.FatalLevel
	default:
		level = zap.InfoLevel
	}
	encoderLog := getEncoderLog() // get format
	hook := &lumberjack.Logger{
		Filename:   "./storage/logs/server.log",
		MaxSize:    logSetting.MaxAge,
		MaxBackups: logSetting.MaxBackups,
		MaxAge:     logSetting.MaxAge,
		Compress:   logSetting.Compress,
	}
	core := zapcore.NewCore(encoderLog,
		zapcore.NewMultiWriteSyncer(zapcore.AddSync(os.Stdout), zapcore.AddSync(hook)),
		level)

	logger := zap.New(core, zap.AddCaller())
	logger.Info("test", zap.String("test", "hello world"))
	return &LoggerZap{zap.New(core, zap.AddCaller(), zap.AddStacktrace(zap.ErrorLevel))}
}

func getEncoderLog() zapcore.Encoder {
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	encoderConfig.TimeKey = "timestamp"
	encoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder
	encoderConfig.EncodeCaller = zapcore.ShortCallerEncoder
	return zapcore.NewJSONEncoder(encoderConfig)
}
