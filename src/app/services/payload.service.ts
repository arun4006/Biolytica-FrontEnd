import { Auth } from 'aws-amplify';
//import { RequestOptions } from '@angular/http';
//import { Http } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Headers} from '@angular/common/http'
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/do';
//import { map } from "rxjs/operators";
import { Observable, tap } from 'rxjs';
import './cognito.service';
import { IUser } from './cognito.service';
import { Objects } from '../interface/Objects';


@Injectable()
 export class PayloadService {
  user:IUser
  globalToken :any
  file:any

   private API_URL = 'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/user/register';

   constructor(private http: HttpClient) { 
    this.user = {} as IUser;
   }


  sendPayload(name:any, locale:any,email:any,usersub:any) {
     let headers = new HttpHeaders({'Content-Type' : 'application/json'});
     let options = ({ headers: headers});
     let INFO =  Object.assign(name,locale,email,usersub);
     let body = JSON.stringify(INFO);
     return this.http.post(this.API_URL, body,options)//.map((res: Response) => res.json());
   }

  

  getImagesByLocation(){
    const LocalToken = localStorage.getItem('AccessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${LocalToken}`);
    return this.http.get('https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/getfilesbylocation',{headers})
  }

uploadnewfile(file: File) {
  let formParams = new FormData();
  let token=localStorage.getItem('AccessToken');
  const myHeaders = new HttpHeaders()
   .append('Authorization',`Bearer ${token}`);
  formParams.append('file',file);
  return this.http.post('https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/fileupload', formParams,{
    headers:myHeaders
})
}  


 }