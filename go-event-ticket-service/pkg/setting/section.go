package setting

type Config struct {
	Redis  Redis  `mapstructure:"redis"`
	Mysql  Mysql  `mapstructure:"mysql"`
	Log    Log    `mapstructure:"log"`
	Server Server `mapstructure:"server"`
	Jwt    Jwt    `mapstructure:"jwt"`
	Cors   Cors   `mapstructure:"cors"`
	// Admin      Admin      `mapstructure:"admin"`
	GoogleOAuth  GoogleOAuth  `mapstructure:"googleOAuth"`
	Kafka        Kafka        `mapstructure:"kafka"`
	EurekaClient EurekaClient `mapstructure:"eurekaClient"`
	Cloudinary   Cloudinary   `mapstructure:"cloudinary"`
}

type EurekaClient struct {
	Hostname string `mapstructure:"hostname"`
	Port     int    `mapstructure:"port"`
}

type Kafka struct {
	Brokers []string `mapstructure:"brokers"`
	GroupID string   `mapstructure:"groupId"`
	Topics  []string `mapstructure:"topics"`
}

// type Topics struct {
// 	OrderCreated string `mapstructure:"orderCreated"`
// }

type Admin struct {
	Email       string `mapstructure:"email"`
	Password    string `mapstructure:"password"`
	PhoneNumber string `mapstructure:"phoneNumber"`
	Username    string `mapstructure:"username"`
}

type Cloudinary struct {
	CloudName string `mapstructure:"cloudName"`
	Key       string `mapstructure:"key"`
	Secret    string `mapstructure:"secret"`
	URL       string `mapstructure:"url"`
}

type Cors struct {
	Url string `mapstructure:"url"`
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

type GoogleOAuth struct {
	ClientId          string `mapstructure:"clientId"`
	ClientSecret      string `mapstructure:"clientSecret"`
	ProjectId         string `mapstructure:"projectId"`
	AuthUri           string `mapstructure:"authUri"`
	RedirectUris      string `mapstructure:"redirectUris"`
	JavascriptOrigins string `mapstructure:"javascriptOrigins"`
}
