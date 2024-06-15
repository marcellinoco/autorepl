package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	authorizationHeaderKey    = "authorization"
	authorizationHeaderBearer = "Bearer"
	authorizationPayloadKey   = "authorizationPayload"
	oauthToken                = "oauthToken"
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
		ctx.Set(oauthToken, accessToken)
		ctx.Next()
	}
}

type GoogleTokenInfo struct {
	Aud           string `json:"aud"`
	UserId        string `json:"sub"`
	ExpiresIn     string `json:"expires_in"` // Changed to string to handle the JSON response
	Email         string `json:"email"`
	EmailVerified string `json:"email_verified"` // Changed to string to handle the JSON response
}

func verifyGoogleToken(token string) (*GoogleTokenInfo, error) {
	resp, err := http.Get(fmt.Sprintf("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=%s", token))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errorResponse map[string]interface{}
		json.NewDecoder(resp.Body).Decode(&errorResponse)
		return nil, fmt.Errorf("token validation failed: %v", errorResponse)
	}

	var tokenInfo GoogleTokenInfo
	if err := json.NewDecoder(resp.Body).Decode(&tokenInfo); err != nil {
		return nil, err
	}
	
	// Convert expires_in to an integer
	expiresIn, err := strconv.Atoi(tokenInfo.ExpiresIn)
	if err != nil {
		return nil, errors.New("invalid expires_in value")
	}
	if expiresIn <= 0 {
		return nil, errors.New("token has expired")
	}

	// Convert email_verified to a boolean
	emailVerified, err := strconv.ParseBool(tokenInfo.EmailVerified)
	if err != nil || !emailVerified {
		return nil, errors.New("email not verified")
	}

	return &tokenInfo, nil
}