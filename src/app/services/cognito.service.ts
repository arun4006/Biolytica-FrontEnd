import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Amplify, Auth } from 'aws-amplify';

import { environment } from '../../environments/environment.development';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
  locale: string;
  UserSub : string;
  State : string;
  District:string;
  Bio:string;
  Hobbies:string;
  Profile:File |null;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  public authenticationSubject: BehaviorSubject<any>;
  private isLogged = new BehaviorSubject(false);
  signedUserInfo:any;

  getisLogged=this.isLogged.asObservable();

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });
    console.log("isLogged",this.isLogged.value);
    
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      attributes:{
        name: user.name,
        locale: user.locale
      },
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

  demo(){
    this.isLogged.next(true);
  }

  demo1() {
    this.isLogged.next(false);
  }
 
  setSignedUserData(data: any) {
    this.signedUserInfo = data;
  }

  getSignedUserData() {
    return this.signedUserInfo;
  }
}