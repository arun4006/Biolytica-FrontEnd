import { environment } from './../../environments/environment.development';
import { Auth } from 'aws-amplify';
import { Injectable, Input } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
  private REGISTERAPI_URL: string = environment.API_ROUTES.REGISTER_URL;
  private GET_URL: string = environment.API_ROUTES.GET_IMAGES_BY_LOCATION_URL;
  private FILE_URL: string = environment.API_ROUTES.FILE_UPLOAD_URL;
  private STATE_URL : string = environment.API_ROUTES.GET_ALL_STATES_URL;
  private DISTRCT_URL: string = environment.API_ROUTES.GET_ALL_DISTRICTS_URL;
  private SIGNEDUSER_URL:string=environment.API_ROUTES.SIGNEDUSER_URL;
  private GET_ALL_USERS_URL :string=environment.API_ROUTES.GET_ALL_USERS_URL;
  private ALL_USERS_URL :string=environment.API_ROUTES.ALL_USERS_URL;
  private GET_FORM_URL:string=environment.API_ROUTES.GET_FORM_DATA_URL;
  private UPDATE_URL:string=environment.API_ROUTES.UPDATE_FORM_DATA_URL;
  private DELETE_URL:string=environment.API_ROUTES.DELETE_URL;
  page: string='';
   constructor(private http: HttpClient, ) { 
    this.user = {} as IUser;
   }

  sendPayload(name:any,email:any,usersub:any,state:any,city:any,hobby:any,bio:any,file: File) {
    console.log("name"+name);
    console.log("hobby"+hobby);
    let formParams = new FormData();
    formParams.append('file',file);
    formParams.append('name',name);
    formParams.append('email', email);
    formParams.append('userId',usersub);
    formParams.append('hobbies',hobby);
    formParams.append('bio',bio);
    formParams.append('districtId',city);
    formParams.append('stateId',state)
    console.log(formParams);
    return this.http.post(this.REGISTERAPI_URL, formParams)
   }

  

  getImagesByLocation():Observable<any[]>{
    const LocalToken = localStorage.getItem('AccessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${LocalToken}`);
    return this.http.get<any[]>(this.GET_URL,{headers})
  }

  getImagesInNavBar():Promise<any>{
    const LocalToken = localStorage.getItem('AccessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${LocalToken}`);
    return this.http.get(this.GET_URL,{headers}).toPromise()
  }

  getStates():Observable<any[]>{
    return this.http.get<any[]>(this.STATE_URL)
  }

  getDistricts(Id:number):Observable<any[]>{
    return this.http.get<any[]>(this.DISTRCT_URL+Id)
  }

  editUsersByAdmin(Id:number):Observable<any[]>{
    const accessToken = localStorage.getItem('AccessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<any[]>(this.GET_FORM_URL+Id,{headers})
  }
  
  updateUsersByAdmin(Id:number,name:any,allState:any,city:any,hobby:any,bio:any,profilePic:File):Observable<any[]>{
       
    let formParams = new FormData();
    formParams.append('file',profilePic);
    formParams.append('name',name);
    formParams.append('hobbies',hobby);
    formParams.append('bio',bio);
    formParams.append('district',city);
    formParams.append('state',allState);
    formParams.forEach(element => {
      console.log(element,'payload service');
      
    });
    
    const accessToken = localStorage.getItem('AccessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.put<any[]>(this.UPDATE_URL+Id,formParams,{headers})
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

  getAllUsers(page:number): Observable<any[]> {
    const accessToken = localStorage.getItem('AccessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<any[]>(this.GET_ALL_USERS_URL+page,{headers}); 
    
  }
  
  getUsers(page:number,searchText:string): Observable<any[]> {
    const accessToken = localStorage.getItem('AccessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);  
    const GET_USERS_URL = 'https://f0um40c994.execute-api.us-east-1.amazonaws.com/dev/getusers';

  let params = new HttpParams();

  if (searchText) {
    params = params.set('search', searchText);
    params = params.delete('page');
  } else {
    params = params.set('page', page);
  }
   return this.http.get<any[]>(GET_USERS_URL,{headers,params});  
  }


  GetSignedUserInfo(token:any):Observable<any[]>{  
    console.log("token" +token);      
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.SIGNEDUSER_URL,{headers})
  }

  deleteUserByAdmin(Id:number):Observable<any[]>{
    console.log(Id,'Url');
    const accessToken = localStorage.getItem('AccessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<any[]>(this.DELETE_URL+Id,{headers})
  }
}