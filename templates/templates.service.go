package templates

import (
	"html/template"
	"net/http"
    "log"

	"github.com/fontainecoutino/SpotifyMagnify/cors"
)

var tmpl *template.Template

const templatePath = "templates/pages"

// SetupRoutes
func SetupRoutes() {
	// be able to access assets folder
	assets := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets", assets))

	// home
	homeHandler := http.HandlerFunc(handleHome)
	http.Handle("/", cors.HtmlMiddleware(homeHandler))

	// contact
	contactHandler := http.HandlerFunc(handleContact)
	http.Handle("/contact", cors.HtmlMiddleware(contactHandler))
}

func handleHome(w http.ResponseWriter, r *http.Request) {
    files := []string{
        templatePath + "/base.html",
        templatePath + "/index.html",
    }

    ts, err := template.ParseFiles(files...)
    if err != nil {
        log.Print(err.Error())
        http.Error(w, "Internal Server Error", 500)
        return
    }

    // Use the ExecuteTemplate() method to write the content of the "base" 
    // template as the response body.
    err = ts.ExecuteTemplate(w, "base", nil)
    if err != nil {
        log.Print(err.Error())
        http.Error(w, "Internal Server Error", 500)
    }

	// tmpl = template.Must(template.ParseGlob(templatePath + "/*.html"))
	// tmpl.ExecuteTemplate(w, "index.html", nil)
}

func handleContact(w http.ResponseWriter, r *http.Request) {
	tmpl = template.Must(template.ParseGlob(templatePath + "/*.html"))
	tmpl.ExecuteTemplate(w, "contact.html", nil)
}
