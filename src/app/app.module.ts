import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { HttpClientModule } from '@angular/common/http';
//import {Http, Response, RequestOptions, Headers} from '@angular/common/http';
//import { routing } from "./app-routing.module";
//import {SndComingSoonPageComponent} from '.......';
// import awsconfig from '../aws-exports.js';
// Amplify.configure(awsconfig);
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    FileuploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AmplifyAuthenticatorModule,
    HttpClientModule
    //Http, Response, RequestOptions, Headers
   // routing
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
