import { environment } from './../../environments/environment.development';
import { Auth } from 'aws-amplify';
import { Injectable, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import './cognito.service';
import { IUser } from './cognito.service';
import { Objects } from '../interface/Objects';



@Injectable()
 export class PayloadService {
  user:IUser
  globalToken :any
  file:any
  profilePic:any
  private API_URL: string = environment.API_ROUTES.REGISTER_URL;
  private GET_URL: string = environment.API_ROUTES.GET_IMAGES_BY_LOCATION_URL;
  private FILE_URL: string = environment.API_ROUTES.FILE_UPLOAD_URL;
  private STATE_URL : string = environment.API_ROUTES.GET_ALL_STATES_URL;
  private DISTRCT_URL: string = environment.API_ROUTES.GET_ALL_DISTRICTS_URL;
  private apiUrl = 'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/getuserbyadmin';
   constructor(private http: HttpClient, ) { 
    this.user = {} as IUser;
   }


  sendPayload(name:any,email:any,usersub:any,locale:any,bio:any,hobby:any,profilePic:any) {
    
     let headers = new HttpHeaders({'Content-Type' : 'application/json'});
     let options = ({ headers: headers});
     let INFO =  Object.assign(email,name,locale,usersub,bio,hobby,profilePic);
     let body = JSON.stringify(INFO);
     console.log(body,'From payload');
     return this.http.post(this.API_URL, body,options)
   }

  

  getImagesByLocation(){
    const LocalToken = localStorage.getItem('AccessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${LocalToken}`);
    return this.http.get(this.GET_URL,{headers})
  }

  getStates():Observable<any[]>{
    return this.http.get<any[]>(this.STATE_URL)
  }

  getDistricts(Id:number):Observable<any[]>{
    return this.http.get<any[]>(this.DISTRCT_URL+Id)

  }

  uploadnewfile(file: File) {
    let formParams = new FormData();
    let token=localStorage.getItem('AccessToken');
    const myHeaders = new HttpHeaders()
    .append('Authorization',`Bearer ${token}`);
    formParams.append('file',file);
    return this.http.post(this.FILE_URL, formParams,{
      headers:myHeaders
  })
  }  

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // + '?page=' + page page:number
    
  }


 }