package middleware

import (
	"fmt"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func JWTMiddleware() gin.HandlerFunc {
	secret := []byte("abcxyz")

	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if auth == "" {
			// Không có token → public request
			c.Set("hasToken", false)
			c.Next()
			return
		}

		parts := strings.SplitN(auth, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(401, gin.H{
				"code":  401,
				"error": "invalid auth header",
			})
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
			c.AbortWithStatusJSON(401, gin.H{
				"code":  401,
				"error": "invalid token"})
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.AbortWithStatusJSON(401, gin.H{
				"code":  401,
				"error": "invalid claims"})
			return
		}

		c.Set("hasToken", true)
		c.Set("claims", claims)
		c.Next()
	}
}
