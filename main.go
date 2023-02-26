package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/fontainecoutino/SpotifyMagnify/templates"
)

const basePath = "/api"

func main() {
	// front-end
	templates.SetupRoutes()

	// back-end
	fmt.Println(basePath)

	// start service
	fmt.Println("Strated service ...")
	fmt.Println("http://localhost:80")
	log.Fatal(http.ListenAndServe(":80", nil))
}
