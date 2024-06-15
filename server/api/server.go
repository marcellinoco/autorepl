package api

import (
	"fmt"
	"net/http"

	db "github.com/autorepl/server/db/sqlc"
	"github.com/autorepl/server/docs"
	"github.com/autorepl/server/util"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
	config util.Config
	store  db.Store
	router *gin.Engine
}

type ErrorResponse struct {
	Error string `json:"error"`
}

func NewServer(config *util.Config, store db.Store) (*Server, error) {
	server := &Server{config: *config, store: store}
	server.setupRouter()

	return server, nil
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}

func (server *Server) setupRouter() {
	router := gin.Default()
	authenticatedRouter := router.Group("/").Use(authMiddleware())

	// configure swagger docs
	docs.SwaggerInfo.BasePath = "/api"
	docs.SwaggerInfo.Host = server.config.BackendSwaggerHost
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	// health check api
	router.GET("/api/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "server is running"})
	})

	router.POST("/api/auth/google", server.google)

	// user api
	authenticatedRouter.GET("/api/users", server.getUserData)
	authenticatedRouter.PATCH("/api/users", server.updateUser)

	authenticatedRouter.POST("/api/emails", server.getEmails)

	server.router = router
}

func getUserPayload(ctx *gin.Context) (*GoogleTokenInfo, string, error) {
	payload, payloadExist := ctx.Get(authorizationPayloadKey)
	token, tokenExist := ctx.Get(oauthToken)
	if !payloadExist {
		return nil, "", fmt.Errorf("payload is missing")
	}
	if !tokenExist {
		return nil, "", fmt.Errorf("token is missing")
	}
	userPayload, userPayloadOk := payload.(*GoogleTokenInfo)
	if !userPayloadOk {
		return nil, "", fmt.Errorf("payload structure is not correct")
	}
	tokenPayload, tokenPayloadOk := token.(string) // Directly assert as string
	if !tokenPayloadOk {
		return nil, "", fmt.Errorf("token structure is not correct")
	}

	return userPayload, tokenPayload, nil
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
