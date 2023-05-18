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
     //headers.append('Authorization', session.getIdToken().getJwtToken());
     let options = ({ headers: headers});
     let INFO =  Object.assign(name,locale,email,usersub);
     let body = JSON.stringify(INFO);
     return this.http.post(this.API_URL, body,options)//.map((res: Response) => res.json());
   }

  

// getFileByuserLocation():Observable<Objects[]> {
//   var token= 'eyJraWQiOiJcL3pNUHpJdVJJZ0dKbG85SFwvNG0yRVROUzIrUTE2UW1BaFhUSUFBSG41amM9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhY2JlNzdlYy1jMWIzLTQxZDMtYjU0ZS0wNmU3YWEwYjg2NGMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV94RDBKRm9oVEUiLCJjbGllbnRfaWQiOiIyZHJiMm50M2RwcDlrY3Nwb3E1Mm9uYWRuMyIsIm9yaWdpbl9qdGkiOiJlMTYyNGViNi0yNGI3LTQ0MWYtYTIzZC0zNDc2MTQwMTcwNWUiLCJldmVudF9pZCI6IjIxMjQwMGQ4LTYwNzAtNGNjYy04YWEzLTE3NzYyZWMyZGU0NiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODQzNDk4NjMsImV4cCI6MTY4NDM1MzQ2MywiaWF0IjoxNjg0MzQ5ODYzLCJqdGkiOiJmNjE2NjU0NC1lMWNkLTRmZGQtYWZiNS1lMGEyMDM4MDBkZTEiLCJ1c2VybmFtZSI6ImFjYmU3N2VjLWMxYjMtNDFkMy1iNTRlLTA2ZTdhYTBiODY0YyJ9.nhqseueTRWnGjXw9gWhlLkoNBkMp7lKQqI0JEIOVet83lCWxRsDxlgbTwJCSHmjrJiIiqA4k8Iccxmu0fOETurpb3sV7mcKd61J0W7xngul3knWh6u5gIU-hxaSfDQ0b5iZqviiB8yRNGEtpiEap2oWO3jWq-TEkBvBLH-u0u3g0asw02GzoEBJPg3AKyn_o-OGm1uIwC9lO-wZe8c7UIgTzzIbxhHUAlVMY9EmayyWnJN32fvHYMk4o1YOrdvhludJQjjFtV2yTYdRoj6_B2pg-DthDLTiRvJA3PhSMCLKbsusoGcy46uUIypwRp3J1yf3s-2xMy0yWciC56BtdTA';
//     console.log("token"+token);
  
//   const myHeaders = new HttpHeaders()
//      .append('Authorization',`Bearer ${token}`);
//     return this.http.get<Objects[]>(`https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/getobjurl`,{
//       headers: myHeaders
//     });
// }

uploadnewfile(file: File) {
  let formParams = new FormData();
  
  let token=localStorage.getItem('AccessToken');

  const myHeaders = new HttpHeaders()
   .append('Authorization',`Bearer ${token}`);
//formParams.append('fileName', fileName);
formParams.append('file',file);
return this.http.post('https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/fileupload', formParams,{
  headers:myHeaders
})
}  


 }