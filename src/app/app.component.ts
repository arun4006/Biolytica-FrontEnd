import { Component, OnInit,Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { CognitoService } from './services/cognito.service';
import { PayloadService } from './services/payload.service';
import {BehaviorSubject} from 'rxjs';

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
      //this.cognitoService.demo();
      if(success){
        this.cognitoService.demo();
        this.cognitoService.getisLogged.subscribe((data)=>{
          console.log("data from app.cpmonet"+data);
          this.isAuthenticated = data;
          
        })
      }
      else {
        this.cognitoService.getisLogged.subscribe((data)=>{
          console.log("data from app.cpmonet"+data);
          this.isAuthenticated = data;
          
        })
      }
      
        
         
    });
   // console.log(this.isLogged.value,'isLogged');
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