package api

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	db "github.com/autorepl/server/db/sqlc"
	"github.com/gin-gonic/gin"
)

type UserResponse struct {
	ID                string    `json:"id"`
	Email             string    `json:"email"`
	Name              string    `json:"name"`
	Avatar            string    `json:"avatar"`
	CreatedAt         time.Time `json:"createdAt"`
	UpdatedAt         time.Time `json:"updatedAt"`
}

func ReturnUserResponse(user *db.Users) *UserResponse {
	return &UserResponse{
		ID:                user.Uid.String(),
		Avatar:            user.Avatar.String,
		Name:              user.Name.String,
		Email:             user.Email,
		CreatedAt:         user.CreatedAt,
		UpdatedAt:         user.UpdatedAt,
	}
}

// @Summary Get user data
// @Description Retrieve user information
// @Tags users
// @Accept json
// @Produce json
// @Success 200 {object} UserResponse "User information retrieved successfully"
// @Security BearerAuth
// @Router /users [get]
func (server *Server) getUserData(ctx *gin.Context) {
	payload, err := getUserPayload(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	user, err := server.store.GetUserByEmail(ctx, payload.Email)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(fmt.Errorf("user with email %s is not found", user.Email)))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, ReturnUserResponse(&user))
}

type updateUserRequest struct {
	Avatar string `json:"avatar"`
	Name   string `json:"name"`
}

type updateUserResponse struct {
	Message string        `json:"message"`
	User    *UserResponse `json:"user"`
}

// @Summary Update user information
// @Description Update user information based on the provided user ID
// @Tags users
// @Accept json
// @Produce json
// @Param request body updateUserRequest true "User update details"
// @Success 200 {object} updateUserResponse "User information updated successfully"
// @Security BearerAuth
// @Router /users [patch]
func (server *Server) updateUser(ctx *gin.Context) {
	payload, err := getUserPayload(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	var req updateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	user, err := server.store.GetUserByEmail(ctx, payload.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(fmt.Errorf("user with email %s is not found", user.Email)))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	avatar := req.Avatar
	name := req.Name
	if len(avatar) == 0 {
		avatar = user.Avatar.String
	}
	if len(name) == 0 {
		name = user.Name.String
	}

	user, err = server.store.UpdateUser(ctx, db.UpdateUserParams{Uid: user.Uid, Avatar: sql.NullString{Valid: true, String: avatar}, Email: user.Email, Name: sql.NullString{Valid: true, String: name}})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	response := &updateUserResponse{
		Message: "user information has been successfully updated",
		User:    ReturnUserResponse(&user),
	}

	ctx.JSON(http.StatusOK, response)
}