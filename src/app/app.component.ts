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
  title = 'aws'
  //currentuser:CurrentUser | undefined; 
   currentUser:any = {
    username: localStorage.getItem('signedUser'),
    location: localStorage.getItem('location')    
  };

  public ngOnInit() {

    
    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      console.log(success,'oninit');
      this.isAuthenticated = success;         
    });
  }

  Recive($event:boolean){
    console.log($event,'Appp');
    
      
  }

  

  isAuthenticated: boolean;
  
  
  constructor(private router: Router,
    private cognitoService: CognitoService
    ) {
      this.isAuthenticated = false;
    }
    
  

  

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.isAuthenticated = false;
      localStorage.removeItem('AccessToken')
      localStorage.removeItem('signedUser');
      localStorage.removeItem('location');
      this.router.navigate(['/signIn']);
    });
  }


}