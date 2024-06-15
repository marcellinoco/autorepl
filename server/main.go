package main

import (
	"database/sql"
	"log"

	"github.com/autorepl/server/api"
	db "github.com/autorepl/server/db/sqlc"
	"github.com/autorepl/server/util"
	_ "github.com/lib/pq"
	_ "github.com/swaggo/files"
	_ "github.com/swaggo/gin-swagger"
)

type Message struct {
	URL string `json:"url"`
}

// @title Segment3d App API Documentation
// @version 1.0
// @description This is a documentation for Segment3d App API

// @host localhost:8080
// @BasePath /api

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {
	// configuration
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("can't load config: ", err)
	}

	// postgresql
	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("can't connect to database: ", err)
	}
	store := db.NewStore(conn)

	// server
	server, err := api.NewServer(&config, store)
	if err != nil {
		log.Fatal("can't create server: ", err)
	}

	// start server
	err = server.Start(config.ServerAddress)
	if err != nil {
		log.Fatal("can't start server: ", err)
	}
}
