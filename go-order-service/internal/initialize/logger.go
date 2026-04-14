package initialize

import (
	"go-order-service/global"

	"github.com/natefinch/lumberjack"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func InitLogger() {
	l := global.Config.Log
	hook := lumberjack.Logger{
		Filename:   l.FileLogName,
		MaxSize:    l.MaxSize,
		MaxBackups: l.MaxBackups,
		MaxAge:     l.MaxAge,
		Compress:   l.Compress,
	}

	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder

	core := zapcore.NewCore(
		zapcore.NewJSONEncoder(encoderConfig),
		zapcore.AddSync(&hook),
		zap.NewAtomicLevelAt(zapcore.DebugLevel), // Simplified for now
	)

	logger := zap.New(core, zap.AddCaller())
	global.Logger = logger
}
