import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';
import {Amplify, Auth } from 'aws-amplify';

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

  constructor(private router: Router,
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
    this.payload.isAdmin(accessToken).subscribe((res:any)=>{  
      console.log("isAdmin value"+typeof JSON.parse(res.body));     
      this.isAdmin=JSON.parse(res.body);     
      if(this.isAdmin)
      {
        this.router.navigate(['/admin']); 
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