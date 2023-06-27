import { Component, OnInit,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  title = 'aws';
  isAuthenticated: boolean;
  userName:any;
  userLocation:any;
  proflePicUrl:any;
  constructor(private router: Router,
    private cognitoService: CognitoService,private activatedRoute:ActivatedRoute,private payload:PayloadService) {
      this.isAuthenticated = false;
    }



  public ngOnInit() {   
    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      console.log(success,'oninit');
      if(success){
        this.cognitoService.demo();
        this.cognitoService.getisLogged.subscribe((data)=>{
          console.log("data from app.component"+data);
          this.isAuthenticated = data;
          this.getProfileData();
        })
      }
      else {
        this.cognitoService.getisLogged.subscribe((data)=>{
          console.log("data from app.compomonent"+data);
          this.isAuthenticated = data;
          
        })
      }       
    });
    
   
    this,this.activatedRoute.paramMap.subscribe((val)=>{
      this.userName;
      this.userLocation;
      this.proflePicUrl

    })
     //this.getUserDetailsInNavBar()
  }
  getUserDetailsInNavBar(){
    this.payload.getImagesByLocation().subscribe((data:any)=>{
      this.userName = data.body.user.signedUsername.toUpperCase();
      this.userLocation = data.body.user.userLocation.toUpperCase();
      this.proflePicUrl = data.body.user.profilePic;
    })
  }

  getProfileData(){
      console.log("userData for navbar");
       this.userName = localStorage.getItem('userName');
       this.userLocation = localStorage.getItem('userLocation');
       this.proflePicUrl = localStorage.getItem('ProfilePic');
  }

  reserProfileData(){
    localStorage.removeItem('userName');
    localStorage.removeItem('userLocation');
    localStorage.removeItem('ProfilePic');
    this.userName='';
    this.userLocation='';
    this.proflePicUrl='';
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.isAuthenticated = false;
      console.log("signout function called..!"); 
      localStorage.removeItem('AccessToken');
      this.reserProfileData();
      localStorage.removeItem('UserId');
      this.router.navigate(['/signIn']);
    });
  }

 


}