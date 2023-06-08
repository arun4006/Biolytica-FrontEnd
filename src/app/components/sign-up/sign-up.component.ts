
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';
import { FormGroup,FormBuilder,FormControl, FormArray } from '@angular/forms';
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
  //hobbies:FormArray
  items: string[] = ['Reading', 'Sport', 'Gym', 'Drawing'];
  selectedItems:string[]=this.items;
  file:string='';
  selectedFile:File|null;
  files:any;

  constructor(private router: Router,
              private cognitoService: CognitoService, private payload:PayloadService,private formBuilder: FormBuilder) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
    this.selectedStateId = 0;
    this.selectedFile = null;
    this.myForm = this.formBuilder.group({
      profilePicture: null,
      email: '',
      name: '',
      state:'',
      district:'',
      hobbies:'',
      bio:''
    });
  }
  ngOnInit(): void {
    this.payload.getStates().subscribe((event:any)=>{
      this.states = event.body;
      console.log(this.states);
    })
  }

  onFilechange(event: any) {
    if(event.target.files[0]){
      this.files=event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.file=e.target.result;
      }
    } 
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
    let usersub = this.globalId;
    let email = this.user.email;
    let name =  this.user.name;
    let bio = this.user.Bio;
    let hobby = this.user.Hobbies;
    let stateString = this.selectedStateId;
    let statename = this.states.find((state:any) => state.id == stateString);
    let allState = statename.states.toString();
    let city = this.user.District;
    let profilePic = this.files;
    
  console.log(name,email,usersub,allState,city,hobby,bio,profilePic,'from');
  console.log("allState"+typeof allState);
  console.log("allState"+typeof allState);
  
    
    this.payload.sendPayload(name,email,usersub,allState,city,hobby,bio,profilePic).subscribe(
      data => {
        console.log(data,'overall'); 
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
 }





