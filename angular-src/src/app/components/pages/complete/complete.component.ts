import { Component, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent {
  userLoggedIn = false;
  playlist_href = "";
  embeded = "";
  isEmbededLoaded = false;

  constructor( private router: Router, private route: ActivatedRoute, private spotify: SpotifyService ) { }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.playlist_href = params['playlist_href'];
      this.loadContent();
    });
  }
  
  async loadContent() {
    this.userLoggedIn = true;
    var embedObj = await this.spotify.getPlaylistEmbeded(this.playlist_href)
    // this.embeded = this.sanitizeSpotifyEmbededObj(embedObj)
    // this.isEmbededLoaded = true
    this.embeded = ""
  }

  onTakeHome(){
    this.router.navigate([ '/' ])
  }

  private sanitizeSpotifyEmbededObj(obj:any){
    let objHTML:string = obj.html
    let src = `src="${objHTML.split('src="')[1].split('"')[0]}"`
    let style = `style="border-radius: 5px" width="100%" height="100%"`
    let metadata = `title="Spotify Embed: Discover - Magnify" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"`
    let html = `<iframe ${style} ${metadata} ${src}></iframe>`

    return html
  }
}
