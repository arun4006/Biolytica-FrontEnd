import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { CognitoService } from './services/cognito.service';
import { PayloadService } from './services/payload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ProfileComponent,PayloadService]
})
export class AppComponent  {
  title = 'aws';


  isAuthenticated: boolean;

  constructor(private router: Router,
              private cognitoService: CognitoService
              ) {
    this.isAuthenticated = false;
  }

  public ngOnInit(): void {
    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      this.isAuthenticated = success; 
              
    });
  
  }

  

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      localStorage.removeItem('AccessToken')
      this.isAuthenticated = false;
      this.router.navigate(['/signIn']);
    });
  }

}