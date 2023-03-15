import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HelpPageComponent } from './components/pages/help-page/help-page.component';
import { PagenotfoundComponent } from './components/pages/pagenotfound/pagenotfound.component';
import { GenerateComponent } from './components/pages/generate/generate.component';
import { SpotifyService } from './services/spotify.service';
import { LoadingPageComponent } from './components/shared/loading-page/loading-page.component';
import { CompleteComponent, SafeHtmlPipe } from './components/pages/complete/complete.component';
import { ErrorModalComponent } from './components/shared/error-modal/error-modal.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'about', component: AboutComponent},
  {path: 'help', component: HelpPageComponent},
  {path: 'generate', component: GenerateComponent},
  {path: 'complete', component: CompleteComponent},

  { path: '**', pathMatch: 'full', 
        component: PagenotfoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    FooterComponent,
    AboutComponent,
    HelpPageComponent,
    PagenotfoundComponent,
    GenerateComponent,
    LoadingPageComponent,
    CompleteComponent,
    SafeHtmlPipe,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ 
    SpotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
