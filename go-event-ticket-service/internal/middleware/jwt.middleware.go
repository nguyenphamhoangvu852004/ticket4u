package middleware

import (
	"encoding/json"
	"fmt"
	"go-event-ticket-service/global"
	"go-event-ticket-service/pkg/response"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthenticationMiddleware(isRequired bool) gin.HandlerFunc {
	secret := []byte(global.Config.Jwt.AccessSecret)
	var hasToken string = "hasToken"

	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")

		if auth == "" {
			if isRequired {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"code":  http.StatusUnauthorized,
					"error": "missing auth header",
				})
				return
			}
			c.Set(hasToken, false)
			c.Next()
			return
		}

		parts := strings.SplitN(auth, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			if isRequired {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"code":  http.StatusUnauthorized,
					"error": "invalid auth header",
				})
				return
			}
			c.Set(hasToken, false)
			c.Next()
			return
		}

		tokenStr := parts[1]

		token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected alg: %v", t.Header["alg"])
			}
			return secret, nil
		})

		if err != nil || !token.Valid {
			if isRequired {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"code":  http.StatusUnauthorized,
					"error": "invalid token"})
				return
			}
			c.Set(hasToken, false)
			c.Next()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			if isRequired {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"code":  http.StatusUnauthorized,
					"error": "invalid claims"})
				return
			}
			c.Set(hasToken, false)
			c.Next()
			return
		}

		c.Set(hasToken, true)
		c.Set("claims", claims)
		c.Next()
		return
	}
}

//	{
//		"code": 200,
//		"message": "Ok",
//		"data": {
//			"userId": "08a4c36b-bb33-4af7-9964-bd862bf23d63",
//			"username": "admin@gmail.com",
//			"loginTime": 0,
//			"loginIp": "",
//			"roles": [
//				"ADMIN"
//			],
//			"permissions": [],
//			"createdAt": "1970-01-01 00:00:00",
//			"modifiedAt": "1970-01-01 00:00:00",
//			"profile": {
//				"account": "admin@gmail.com",
//				"nickname": "admin",
//				"avatar": "testting//....com",
//				"state": "VN",
//				"mobile": "0987654321",
//				"gender": "FEMALE",
//				"birthday": "2025-12-18",
//				"email": "admin@gmail.com",
//				"createdAt": "1970-01-01 00:00:00",
//				"modifiedAt": "1970-01-01 00:00:00"
//			}
//		}
//	}
func AuthorizationMiddleware(listPermissionAllowed []string) gin.HandlerFunc {

	return func(c *gin.Context) {
		if len(listPermissionAllowed) == 0 || listPermissionAllowed == nil {
			// Nếu không có yêu cầu về quyền hạn, cho phép truy cập
			c.Next()
			return
		}

		url := "http://nestjs-auth-user-service:8087/api/v1/2025/users/profiles"

		httpReq, err := http.NewRequest("GET", url, nil)
		if err != nil {
			// c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			// 	"code":  http.StatusInternalServerError,
			// 	"error": "failed to create request"})
			response.ErrorResponse(c, http.StatusInternalServerError, "failed to create request",
				map[string]string{"url": url})
			return
		}

		httpReq.Header.Set("Authorization", c.GetHeader("Authorization"))
		httpReq.Header.Set("Content-Type", "application/json")
		httpReq.Header.Set("Accept", "application/json")
		client := &http.Client{}
		resp, err := client.Do(httpReq)
		if err != nil {
			response.ErrorResponse(c, http.StatusServiceUnavailable,
				http.StatusText(http.StatusServiceUnavailable),
				map[string]string{"url": url, "err": err.Error()})
			return
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			c.AbortWithStatusJSON(resp.StatusCode, gin.H{
				"code":  resp.StatusCode,
				"error": "failed to fetch user profile"})
			return
		}

		var apiResponse Response
		err = json.NewDecoder(resp.Body).Decode(&apiResponse)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"code":  http.StatusInternalServerError,
				"error": "failed to parse profile response"})
			return
		}
		allowed := false

		for _, requireRole := range listPermissionAllowed {
			for _, role := range apiResponse.Data.Roles {
				if role == requireRole {
					allowed = true
					break
				}
			}
			if allowed {
				break
			}
		}

		if !allowed {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"code":  http.StatusForbidden,
				"error": "no permission",
			})
			return
		}

		c.Next()
		// fmt.Println("list roles of this user: ", apiResponse.Data.Roles)
		// fmt.Println("list required roles: ", listPermissionAllowed)

		// for _, requireRole := range listPermissionAllowed {
		// 	hasRole := false
		// 	for _, role := range apiResponse.Data.Roles {
		// 		if role == requireRole {
		// 			hasRole = true
		// 			break
		// 		}
		// 	}
		// 	if !hasRole {
		// 		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
		// 			"code":  http.StatusForbidden,
		// 			"error": "no permission",
		// 		})
		// 		return
		// 	}
		// }
		// c.Next()
		return
	}
}

// "userId": "08a4c36b-bb33-4af7-9964-bd862bf23d63",
//
//	"username": "admin@gmail.com",
//	"loginTime": 0,
//	"loginIp": "",
//	"roles": [
//		"ADMIN"
//	],
//	"permissions": [],
//	"createdAt": "1970-01-01 00:00:00",
//	"modifiedAt": "1970-01-01 00:00:00",
//	"profile": {
//		"account": "admin@gmail.com",
//		"nickname": "admin",
//		"avatar": "testting//....com",
//		"state": "VN",
//		"mobile": "0987654321",
//		"gender": "FEMALE",
//		"birthday": "2025-12-18",
//		"email": "admin@gmail.com",
//		"createdAt": "1970-01-01 00:00:00",
//		"modifiedAt": "1970-01-01 00:00:00"
//	}
type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    UserProfile `json:"data"`
}
type UserProfile struct {
	Roles []string `json:"roles"`
}
