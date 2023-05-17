//import { IUser } from './../cognito.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';
import * as AWS from 'aws-sdk';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers:[PayloadService]
})
export class SignUpComponent {
  globalId :any;
  loading: boolean;
  isConfirm: boolean;
  user: IUser;

  constructor(private router: Router,
              private cognitoService: CognitoService, private payload:PayloadService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp(): void {
    console.log("Clicked")
    this.loading = true;
    this.cognitoService.signUp(this.user)
    .then((res) => {
      console.log(res.userSub);
      this.globalId = res.userSub;     
      this.loading = false;
      this.isConfirm = true;
    }).catch(() => {
      this.loading = false;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    console.log(this.user);
    let usersub = {usersub:this.globalId}
    let email = {email:this.user.email}
    let name = { name: this.user.name };
    let locale = { locale: this.user.locale };
    this.payload.sendPayload(name,locale,email,usersub).subscribe(
      data => {
        //console.log(data,'Form create person')
        return true;
      })
     this.cognitoService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/signIn']);
    }).catch(() => {
      this.loading = false;
    });
  }
}



