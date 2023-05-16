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
     let body = JSON.stringify(INFO);
     return this.http.post(this.API_URL, body,options)//.map((res: Response) => res.json());
   }
   sendToken(accessToken:any) {
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    //headers.append('Authorization', session.getIdToken().getJwtToken());
    let options = ({ headers: headers});
    // let INFO =  Object.assign(accessToken);
    // console.log(accessToken);
    // let token = JSON.stringify(accessToken)

    return this.http.post(this.API_URL, accessToken,options)//.map((res: Response) => res.json());
  }
  postFile(fileToUpload: File){
    const formData: FormData = new FormData();
    let headers = new HttpHeaders({'Content-Type' : 'multipart/form-data'});
    //headers.append('Authorization', session.getIdToken().getJwtToken());
    let options = ({ headers: headers});
    let INFO =  Object.assign(fileToUpload);
    console.log(INFO,'From Post FIle')
    formData.append('image', fileToUpload);
    return this.http.post('https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/filesupload',INFO,options)
      // .map(() => { return true; })
      // .catch((e) => this.handleError(e));
}
 }