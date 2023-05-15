import { Auth } from 'aws-amplify';
//import { RequestOptions } from '@angular/http';
//import { Http } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Headers} from '@angular/common/http'
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/do';
//import { map } from "rxjs/operators";
import './cognito.service';
import { IUser } from './cognito.service';


@Injectable()
 export class PayloadService {
  user:IUser

   private API_URL = 'https://p6ud9y8gk1.execute-api.us-east-1.amazonaws.com/dev/payload/authenticate';

   constructor(private http: HttpClient) { 
    this.user = {} as IUser;
   }

  //  this.authService.getAuthenticatedUser().getSession((err, session) => {
  //   console.log(session);
  //   let headers = new HttpHeaders();
  //   headers.append('Authorization', session.getIdToken().getJwtToken());


  sendPayload(name:any, locale:any,email:any,usersub:any) {
     let headers = new HttpHeaders({'Content-Type' : 'application/json'});
     //headers.append('Authorization', session.getIdToken().getJwtToken());
     let options = ({ headers: headers});
     let INFO =  Object.assign(name,locale,email,usersub);
     console.log(INFO, 'info clicked')
     let body = JSON.stringify(INFO);
     return this.http.post(this.API_URL, body,options)//.map((res: Response) => res.json());
   }
 }