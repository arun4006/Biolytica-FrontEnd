
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';
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
  items: string[] = ['Reading', 'Sport', 'Gym', 'Drawing'];
  selectedItems:string[]=this.items;
  file:string='';
  selectedFile: File|null;

  constructor(private router: Router,
              private cognitoService: CognitoService, private payload:PayloadService,private formBuilder: FormBuilder) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
    this.selectedStateId = 0;
    this.selectedFile = null
    this.myForm = this.formBuilder.group({
      state: '',
      district: '',
      hobby:'',
      bio:''
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
    let usersub = {usersub:this.globalId}
    let email = {email:this.user.email}
    let name = { name: this.user.name };
    let bio = { bio: this.user.Bio };
    let hobby = {hobby: this.user.Hobbies}
    let locale = {locale: this.user.District}
    let profilePic = {profilePic:this.selectedFile}
   
    this.payload.sendPayload(name,locale,email,usersub,bio,hobby,profilePic).subscribe(
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
    this.filteredDistricts=[];
    console.log(this.selectedStateId,'from district');
    this.payload.getDistricts(this.selectedStateId).subscribe((districts:any) => {
      this.districts = districts.body ;
      console.log(this.districts,'districts');
      if(this.districts.length>0){
        this.filteredDistricts = this.districts.filter(
          (district:any) => district.stateId == this.selectedStateId);
      }
        });
  }

  onFileChange(event: any) {
    if(event.target.files){
      this.selectedFile=event.target.files
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.file=e.target.result;
      }
    } 
    }
  
 }




