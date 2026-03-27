package service

import (
	"bytes"
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"go-learn/intenal/payments/application/dto"
	"go-learn/intenal/payments/domain"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/segmentio/kafka-go"
	"github.com/sony/sonyflake"
)

// MOMO_ACCESSKEY=
// MOMO_SECRETKEY=
var (
	accessKey = "F8BBA842ECF85"
	secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
)

type PaymentService struct {
	kafkaWriter *kafka.Writer
	topic       string
}

// Callback implements [PaymentServiceInterface].
func (p *PaymentService) Callback(ctx *gin.Context, reqData *dto.MomoCallback) (interface{}, error) {

	// Publish payment event to Kafka
	eventPayload := map[string]interface{}{
		"orderId": reqData.OrderId,
		"amount":  reqData.Amount,
		"status":  "SUCCESS",
		"message": reqData.Message,
	}
	eventBytes, _ := json.Marshal(eventPayload)

	err := p.kafkaWriter.WriteMessages(context.Background(), kafka.Message{

		Key:   []byte(reqData.OrderId),
		Value: eventBytes,
	})
	if err != nil {
		log.Println("Failed to publish payment event to Kafka:", err)
	} else {
		fmt.Println("Successfully published payment event to Kafka for orderId:", reqData.OrderId)
	}

	return reqData, nil
}

// TestConnectKafka implements [PaymentServiceInterface].
func (p *PaymentService) TestConnectKafka(ctx *gin.Context) {
	if err := p.kafkaWriter.WriteMessages(ctx, kafka.Message{
		Key:   []byte("order-123"),
		Value: []byte("successfully"),
	}); err != nil {
		log.Println(err.Error())
		return
	}

	log.Println("Sent kafka sucess")
	return
}

// CheckTransaction implements [PaymentServiceInterface].
func (p *PaymentService) CheckTransaction(ctx *gin.Context, reqData *dto.CheckTransactionRequestDTO) (interface{}, error) {
	var rawSignature = fmt.Sprintf("accessKey=%s&orderId=%s&partnerCode=%s&requestId=%s", accessKey, reqData.OrderID, "MOMO", reqData.RequestID)

	// Create a new HMAC by defining the hash type and the key (as byte array)
	hmac := hmac.New(sha256.New, []byte(secretKey))

	// Write Data to it
	hmac.Write([]byte(rawSignature))

	var signature = hex.EncodeToString(hmac.Sum(nil))

	var payload = map[string]interface{}{
		"partnerCode": "MOMO",
		"requestId":   reqData.RequestID,
		"orderId":     reqData.OrderID,
		"signature":   signature,
		"lang":        "vi",
	}

	// callAPI
	var endpoint = fmt.Sprintf("%s/v2/gateway/api/query", os.Getenv("MOMO_APP"))
	var jsonPayload []byte
	var err error
	jsonPayload, err = json.Marshal(payload)
	if err != nil {
		log.Println(err)
	}
	fmt.Println("Payload: " + string(jsonPayload))
	fmt.Println("Signature: " + signature)

	//send HTTP to momo endpoint
	resp, err := http.Post(endpoint, "application/json", bytes.NewBuffer(jsonPayload))
	if err != nil {
		log.Fatalln(err)
	}

	//result
	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)
	fmt.Println("Response from Momo: ", result)

	return result, nil
}

// CreatePaymentURl implements [PaymentServiceInterface].
func (p *PaymentService) CreatePaymentURl(ctx *gin.Context, reqData *dto.CreatePaymentURLRequestDTO) (interface{}, error) {
	fmt.Println(reqData)
	fmt.Printf("Hello Momo!\n")

	flake := sonyflake.NewSonyflake(sonyflake.Settings{})
	//randome requestID
	b, _ := flake.NextID()

	var endpoint = fmt.Sprintf("%s/v2/gateway/api/create", os.Getenv("MOMO_APP"))
	var orderInfo = "pay with MoMo"
	var partnerCode = "MOMO"
	var redirectUrl = os.Getenv("MOMO_REDIRECTURL")
	var ipnUrl = os.Getenv("MOMO_IPNURL")
	var amount = reqData.Amount
	var orderId = reqData.OrderID
	var requestId = strconv.FormatUint(b, 16)
	var extraData = ""
	var partnerName = "MoMo Payment"
	var storeId = "Test Store"
	var orderGroupId = ""
	var autoCapture = true
	var lang = "vi"
	var requestType = "payWithMethod"

	// rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId \
	//            + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl\
	//            + "&requestId=" + requestId + "&requestType=" + requestType

	//build raw signature
	var rawSignature bytes.Buffer
	rawSignature.WriteString("accessKey=")
	rawSignature.WriteString(accessKey)
	rawSignature.WriteString("&amount=")
	rawSignature.WriteString(amount)
	rawSignature.WriteString("&extraData=")
	rawSignature.WriteString(extraData)
	rawSignature.WriteString("&ipnUrl=")
	rawSignature.WriteString(ipnUrl)
	rawSignature.WriteString("&orderId=")
	rawSignature.WriteString(orderId)
	rawSignature.WriteString("&orderInfo=")
	rawSignature.WriteString(orderInfo)
	rawSignature.WriteString("&partnerCode=")
	rawSignature.WriteString(partnerCode)
	rawSignature.WriteString("&redirectUrl=")
	rawSignature.WriteString(redirectUrl)
	rawSignature.WriteString("&requestId=")
	rawSignature.WriteString(requestId)
	rawSignature.WriteString("&requestType=")
	rawSignature.WriteString(requestType)

	// Create a new HMAC by defining the hash type and the key (as byte array)
	hmac := hmac.New(sha256.New, []byte(secretKey))

	// Write Data to it
	hmac.Write(rawSignature.Bytes())
	fmt.Println("Raw signature: " + rawSignature.String())

	// Get result and encode as hexadecimal string
	signature := hex.EncodeToString(hmac.Sum(nil))

	amountInt, _ := strconv.ParseInt(amount, 10, 64)

	var payload = domain.Payload{
		PartnerCode:  partnerCode,
		AccessKey:    accessKey,
		RequestID:    requestId,
		Amount:       amountInt,
		RequestType:  requestType,
		RedirectUrl:  redirectUrl,
		IpnUrl:       ipnUrl,
		OrderID:      orderId,
		StoreId:      storeId,
		PartnerName:  partnerName,
		OrderGroupId: orderGroupId,
		AutoCapture:  autoCapture,
		Lang:         lang,
		OrderInfo:    orderInfo,
		ExtraData:    extraData,
		Signature:    signature,
	}

	var jsonPayload []byte
	var err error
	jsonPayload, err = json.Marshal(payload)
	if err != nil {
		log.Println(err)
	}
	fmt.Println("Payload: " + string(jsonPayload))
	fmt.Println("Signature: " + signature)

	//send HTTP to momo endpoint
	resp, err := http.Post(endpoint, "application/json", bytes.NewBuffer(jsonPayload))
	if err != nil {
		log.Fatalln(err)
	}

	//result
	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)
	fmt.Println("Response from Momo: ", result)

	// Publish payment event to Kafka
	// eventPayload := map[string]interface{}{
	// 	"orderId": orderId,
	// 	"amount":  amountInt,
	// 	"status":  "PAYMENT_URL_CREATED",
	// }
	// eventBytes, _ := json.Marshal(eventPayload)

	// err = p.kafkaWriter.WriteMessages(context.Background(), kafka.Message{

	// 	Key:   []byte(orderId),
	// 	Value: eventBytes,
	// })
	// if err != nil {
	// 	log.Println("Failed to publish payment event to Kafka:", err)
	// } else {
	// 	fmt.Println("Successfully published payment event to Kafka for orderId:", orderId)
	// }

	return result, nil
}

func NewPaymentService(kafkaWriter *kafka.Writer, topic string) PaymentServiceInterface {
	return &PaymentService{
		kafkaWriter: kafkaWriter,
		topic:       topic,
	}
}
