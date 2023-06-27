import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';
import {Amplify, Auth } from 'aws-amplify';
import {AppComponent} from '../../app.component'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers:[PayloadService]
})
export class SignInComponent {

  loading: boolean;
  user: IUser;
  isAdmin :boolean;
  signedUser:any;

  constructor(private router: Router, private appComponent: AppComponent,
              private cognitoService: CognitoService,private payload:PayloadService,
              ) {
    this.loading = false;
    this.user = {} as IUser;
    this.isAdmin = false;
  }
  
  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
    .then(() => {
     this.cognitoService.authenticationSubject.next(false);
      Auth.currentSession()
    .then((data) => {
      this.cognitoService.demo();
    const accessToken = data.getAccessToken().getJwtToken();
    localStorage.setItem('AccessToken',accessToken );
    console.log(accessToken)
    this.payload.GetSignedUserInfo(accessToken).subscribe((res:any)=>{  
    console.log("signedUser"+ JSON.stringify(res.body)); 
    const userData=JSON.stringify(res.body);
    localStorage.setItem('userName',res.body.name) 
    localStorage.setItem('ProfilePic',res.body.profile_pic) 
    localStorage.setItem('userLocation','Chennai'); 

    // this.cognitoService.setSignedUserData(res.body);
    // console.log("after insert into service from sign in component"+this.cognitoService.getSignedUserData());
    this.isAdmin=res.body.is_admin;
    this.appComponent.getProfileData();
    if(this.isAdmin)
      {
        this.router.navigate(['/users']); 
      }else{
        this.router.navigate(['/profile']);
      }
      });
  
  })    
    }).catch((error) => {
      this.loading = false;
      console.error('Error obtaining access token:', error);
    });
  }

}   