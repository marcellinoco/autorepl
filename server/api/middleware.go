package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	authorizationHeaderKey    = "authorization"
	authorizationHeaderBearer = "Bearer"
	authorizationPayloadKey   = "autorizationPayload"
)

func authMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authorizationHeader := ctx.GetHeader(authorizationHeaderKey)

		if len(authorizationHeader) == 0 {
			error := errors.New("authorization header is empty")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(error))
			return
		}

		field := strings.Fields(authorizationHeader)
		if len(field) < 2 {
			error := errors.New("authorization header is not valid")
			ctx.AbortWithStatusJSON(http.StatusBadRequest, errorResponse(error))
			return
		}

		authorizationType := strings.ToLower(field[0])
		if authorizationType != strings.ToLower(authorizationHeaderBearer) {
			error := errors.New("authorization type is not valid")
			ctx.AbortWithStatusJSON(http.StatusBadRequest, errorResponse(error))
			return
		}

		accessToken := field[1]

		tokenInfo, err := verifyGoogleToken(accessToken)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse(err))
			return
		}

		ctx.Set(authorizationPayloadKey, tokenInfo)
		ctx.Next()
	}
}


type GoogleTokenInfo struct {
	Aud           string `json:"aud"`
	UserId        string `json:"user_id"`
	ExpiresIn     int    `json:"expires_in"`
	Email         string `json:"email"`
	EmailVerified bool   `json:"email_verified"`
}

func verifyGoogleToken(token string) (*GoogleTokenInfo, error) {
	resp, err := http.Get(fmt.Sprintf("https://oauth2.googleapis.com/tokeninfo?id_token=%s", token))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("token validation failed")
	}

	var tokenInfo GoogleTokenInfo
	if err := json.NewDecoder(resp.Body).Decode(&tokenInfo); err != nil {
		return nil, err
	}

	if tokenInfo.ExpiresIn <= 0 {
		return nil, errors.New("token has expired")
	}

	return &tokenInfo, nil
}