package initialize

import (
	"database/sql"
	"fmt"
	"go-event-ticket-service/global"
	"go-event-ticket-service/internal/database"
	"go-event-ticket-service/utils"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"go.uber.org/zap"
)

func checkErrC(err error, msg string) {
	if err != nil {
		utils.CallLogger(utils.ErrorLevel, msg, err, zap.String("error", err.Error()))
		panic(err)
	}
}

func InitMysqlC() {
	global.Logger.Info("Init mysql...")
	m := global.Config.Mysql
	dsn := "%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local"
	var s = fmt.Sprintf(dsn, m.Username, m.Password, m.Host, m.Port, m.Dbname)
	db, err := sql.Open("mysql", s)
	checkErrC(err, "Init mysql failed")
	global.Mdbc = db
	utils.CallLogger(utils.InfoLevel, "MysqlPool Initialize Successfully", nil, zap.Bool("isSuccess", true))
	// setPool
	SetPoolC()
}

func SetPoolC() {
	m := global.Config.Mysql
	sqlDB := global.Mdbc
	global.DbQueries = database.New(global.Mdbc)
	sqlDB.SetConnMaxIdleTime(time.Duration(m.MaxIdleConns))
	sqlDB.SetMaxOpenConns(m.MaxOpenConns)
	sqlDB.SetConnMaxLifetime(time.Duration(m.ConnMaxLifeTime))
}
