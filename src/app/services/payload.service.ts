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
  globalToken :any

   private API_URL = 'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/login';

   constructor(private http: HttpClient) { 
    this.user = {} as IUser;
   }


  sendPayload(name:any, locale:any,email:any,usersub:any) {
     let headers = new HttpHeaders({'Content-Type' : 'application/json'});
     //headers.append('Authorization', session.getIdToken().getJwtToken());
     let options = ({ headers: headers});
     let INFO =  Object.assign(name,locale,email,usersub);
     let body = JSON.stringify(INFO);
     return this.http.post(this.API_URL, body,options)//.map((res: Response) => res.json());
   }

  postFile(fileToUpload: File ){
    const formData: FormData = new FormData();
    let headers = new HttpHeaders({'Content-Type' : 'multipart/form-data', 'Authorization': 'Bearer  ' + localStorage.getItem('AccessToken')});
    let options = ({ headers: headers});
    let INFO =  Object.assign(fileToUpload);
    console.log(INFO,'From Post FIle')
    formData.append('file', fileToUpload);
    return this.http.post('https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/fileupload',formData,options)
      // .map(() => { return true; })
      // .catch((e) => this.handleError(e));
}
 }