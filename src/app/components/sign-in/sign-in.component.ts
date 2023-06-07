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
  isAdmin :string;

  constructor(private router: Router,
              private cognitoService: CognitoService,private payload:PayloadService ) {
    this.loading = false;
    this.user = {} as IUser;
    this.isAdmin = 'false';
  }
  
  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
    .then(() => {
      Auth.currentSession()
    .then((data) => {
    const accessToken = data.getAccessToken().getJwtToken();
    localStorage.setItem('AccessToken',accessToken );
    this.payload.isAdmin(accessToken).subscribe((res:any)=>{  
      console.log("fff"+res.body);      
     this.isAdmin='true'; //res.body;    
    });
    
  })
    console.log("value"+this.isAdmin);
    

    if(this.isAdmin)
    {
      this.router.navigate(['/admin']);

    }else{
    this.router.navigate(['/profile']);
    }
    }).catch((error) => {
      this.loading = false;
      console.error('Error obtaining access token:', error);
    });
  }

}