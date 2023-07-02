import {Component} from '@angular/core';
import {Router} from '@angular/router';
 
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';
import {Amplify, Auth } from 'aws-amplify';
import {AppComponent} from '../../app.component'
import Swal from 'sweetalert2';


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
  errorMessage: string = '';
  passwordRequiredErrorMessage: string = 'Password is required';
  passwordLengthErrorMessage: string = 'Password must be at least 8 characters';
  EmailRequiredErrorMessage :string = 'Email is required';
  InvalidEmailErrorMessage: string = 'Invalid Email Address';


  constructor(private router: Router,private appComponent: AppComponent,
              private cognitoService: CognitoService,private payload:PayloadService,
              ) {
    this.loading = false;
    this.user = {} as IUser;
    this.isAdmin = false;
  }

  public signIn(): void {
    this.loading = true;


    // if (!this.user.email) {
    //   this.errorMessage = this.EmailRequiredErrorMessage;
    //   this.loading = false;
    //   return;
    // } else if (!this.user.email.includes('@') || !this.user.email.includes('.')) {
    //     this.errorMessage = this.InvalidEmailErrorMessage;
    //     this.loading = false;
    //     return;
    //   }
  
    //   if (!this.user.password) {
    //     this.errorMessage = this.passwordRequiredErrorMessage;
    //     this.loading = false;
    //     return;
    //   } else if (this.user.password.length < 8) {
    //     this.errorMessage = this.passwordLengthErrorMessage;
    //     this.loading = false;
    //     return;
    //   }
    
  
    this.cognitoService.signIn(this.user)
      .then(() => {
        this.cognitoService.authenticationSubject.next(false);
        Auth.currentSession().then((data) => {
          this.cognitoService.demo();
          const accessToken = data.getAccessToken().getJwtToken();
          localStorage.setItem('AccessToken', accessToken);
          console.log(accessToken);
  
          this.payload.GetSignedUserInfo(accessToken).subscribe((res: any) => {  
            localStorage.setItem('userId',res.body.id)
            localStorage.setItem('userName',res.body.name) 
            localStorage.setItem('ProfilePic',res.body.profile_pic) 
            localStorage.setItem('userLocation',res.body.City.city_name); 
        
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
        });
      })
      .catch((error) => {
        if (error.code === 'NotAuthorizedException'){
          Swal.fire(
            '  Incorrect Email or Password '
          )
        }
        this.loading = false;
        console.error('Error obtaining access token:', error);
      });
  }
}