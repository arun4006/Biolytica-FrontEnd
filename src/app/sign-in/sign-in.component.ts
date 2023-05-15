import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PayloadService} from '../payload.service'
import { IUser, CognitoService } from '../cognito.service';
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

  constructor(private router: Router,
              private cognitoService: CognitoService,private payload:PayloadService ) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
    
    .then(() => {
      Auth.currentSession()
    .then((data) => {
    const accessToken = data.getAccessToken().getJwtToken();
    //console.log('Access Token:', accessToken);
    this.payload.sendToken(accessToken).subscribe(
      data => {
        //console.log(data,'Form create person')
        return true;
      })
  })
      this.router.navigate(['/profile']);
    }).catch((error) => {
      this.loading = false;
      console.error('Error obtaining access token:', error);
    });
  }

}