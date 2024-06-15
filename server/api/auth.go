package api

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	db "github.com/autorepl/server/db/sqlc"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

type googleRequest struct {
	Token string `json:"token" binding:"required"`
}

type googleUserInfo struct {
	Email   string `json:"email"`
	Name    string `json:"name"`
	Picture string `json:"picture"`
}

type googleResponse struct {
	AccessToken string       `json:"accessToken"`
	Message     string       `json:"message"`
	User        UserResponse `json:"user"`
}

// @Summary Google Auth
// @Description Authenticate user with Google OAuth token
// @Tags auth
// @Accept json
// @Produce json
// @Param request body googleRequest true "Google OAuth token"
// @Success 200 {object} googleResponse "Succes to login/sign up"
// @Router /auth/google [post]
func (server *Server) google(ctx *gin.Context) {
	var req googleRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	tokenSource := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: req.Token})
	httpClient := oauth2.NewClient(ctx, tokenSource)
	resp, err := httpClient.Get("https://www.googleapis.com/oauth2/v3/userinfo")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(fmt.Errorf("failed to read response body: %v", err)))
	}

	var userInfo googleUserInfo
	if err := json.Unmarshal(body, &userInfo); err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(fmt.Errorf("failed to unmarshal user info: %v", err)))
		return
	}

	var newUser = false
	user, err := server.store.GetUserByEmail(ctx, userInfo.Email)
	if err != nil {
		// User is not exist in db, create new user
		if err == sql.ErrNoRows {
			newUser = true
			user, err = server.store.CreateUser(ctx, db.CreateUserParams{
				Email:    userInfo.Email,
				Name:     sql.NullString{Valid: true, String: userInfo.Name},
				Avatar:   sql.NullString{Valid: true, String: userInfo.Picture},
				AccessToken: sql.NullString{Valid: true, String: req.Token},
			})
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, errorResponse(err))
				return
			}
		} else {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		}
	}

	// New user created in the prev code
	if !newUser {
		user, err = server.store.UpdateUser(ctx, db.UpdateUserParams{Name: sql.NullString{String: userInfo.Name, Valid: true}, Avatar: sql.NullString{String: userInfo.Picture, Valid: true}, Email: userInfo.Email, Uid: user.Uid, AccessToken: sql.NullString{String: req.Token, Valid: true}})
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse(err))
			return
		} 
	} 

	response := googleResponse{
		AccessToken: req.Token,
		Message:     "succes to login/sign up",
		User: UserResponse{
			ID:     user.Uid.String(),
			Email:  userInfo.Email,
			Name:   userInfo.Name,
			Avatar: userInfo.Picture,
		},
	}
	ctx.JSON(http.StatusOK, response)
}
