
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';
import * as AWS from 'aws-sdk';
import { FormGroup,FormBuilder,FormControl } from '@angular/forms';
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
  states: any=[];
  districts: any=[];
  selectedStateId: number;
  filteredDistricts: any=[];
  myForm: FormGroup;

  constructor(private router: Router,
              private cognitoService: CognitoService, private payload:PayloadService,private formBuilder: FormBuilder) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
    this.selectedStateId = 0;
    this.myForm = this.formBuilder.group({
      state: new FormControl(''),
      district: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.payload.getStates().subscribe((event:any)=>{
      this.states = event.body;
    })

  }
  

  public signUp(): void {
    console.log("Clicked")
    this.loading = true;
    this.cognitoService.signUp(this.user)
    .then((res) => {
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
    let state = { state: this.user.State };
    let district = {district: this.user.District}
    this.payload.sendPayload(name,state,district,email,usersub).subscribe(
      data => {
        return true;
      })
     this.cognitoService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/signIn']);
    }).catch(() => {
      this.loading = false;
    });
  }
  onChangeDistrict():void {
    this.payload.getDistricts(this.selectedStateId).subscribe((districts:any) => {
      this.districts = districts.body ;
      this.filteredDistricts = districts.body;
      this.filteredDistricts = this.districts.filter(
            (district:any) => district.stateId == this.selectedStateId);
      console.log(this.filteredDistricts,'From Onchngedistrict')
    });
  }
}



