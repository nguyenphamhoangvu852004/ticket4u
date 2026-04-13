package setting

type Config struct {
	Redis  Redis  `mapstructure:"redis"`
	Mysql  Mysql  `mapstructure:"mysql"`
	Log    Log    `mapstructure:"log"`
	Server Server `mapstructure:"server"`
	Jwt    Jwt    `mapstructure:"jwt"`
	Kafka  Kafka  `mapstructure:"kafka"`
	App    App    `mapstructure:"app"`
}

type App struct {
	ProductURL string `mapstructure:"productUrl"`
}

type Kafka struct {
	Brokers []string `mapstructure:"brokers"`
	GroupID string   `mapstructure:"groupId"`
	Topics  Topics   `mapstructure:"topics"`
}

type Topics struct {
	OrderCreated string `mapstructure:"orderCreated"`
}

type Jwt struct {
	TokenHourLifeSpan        int    `mapstructure:"tokenHourLifeSpan"`
	AccessSecret             string `mapstructure:"accessSecret"`
	AccessSecretExpiriedTime string `mapstructure:"accessSecretExpiriedTime"`
}

type Server struct {
	Mode string `mapstructure:"mode"`
	Port int    `mapstructure:"port"`
}

type Redis struct {
	Host     string `mapstructure:"host"`
	Port     int    `mapstructure:"port"`
	Password string `mapstructure:"password"`
	Database int    `mapstructure:"database"`
}

type Mysql struct {
	Host            string `mapstructure:"host"`
	Port            int    `mapstructure:"port"`
	Username        string `mapstructure:"username"`
	Password        string `mapstructure:"password"`
	Dbname          string `mapstructure:"dbname"`
	MaxIdleConns    int    `mapstructure:"maxIdleConns"`
	MaxOpenConns    int    `mapstructure:"maxOpenConns"`
	ConnMaxLifeTime int    `mapstructure:"connMaxLifeTime"`
}

type Log struct {
	LogLevel    string `mapstructure:"logLevel"`
	FileLogName string `mapstructure:"fileLogName"`
	MaxSize     int    `mapstructure:"maxSize"`
	MaxBackups  int    `mapstructure:"maxBackups"`
	MaxAge      int    `mapstructure:"maxAge"`
	Compress    bool   `mapstructure:"compress"`
}
