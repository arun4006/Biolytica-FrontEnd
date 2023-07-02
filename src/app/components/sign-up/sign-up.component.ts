
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import Swal from 'sweetalert2';
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
  selectedStateId: any;
  filteredDistricts: any=[];
  myForm: FormGroup;
  //hobbies:FormArray
  items: string[] = ['Reading', 'Sport', 'Gym', 'Drawing'];
  selectedItems:string[]=this.items;
  file:string='';
  selectedFile:File|null;
  files:any;

  constructor(private router: Router,
              private cognitoService: CognitoService, private payload:PayloadService,private formBuilder: FormBuilder,
              private toastr: ToastrModule) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
    //this.selectedStateId = 0;
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
    // console.log(param,"Clicked")
    this.loading = true;
    this.cognitoService.signUp(this.user)
    .then((res) => {
      this.globalId = res.userSub;     
      this.loading = false;
      this.isConfirm = true;
    }).catch((error) => {
      this.loading = false;
      if (error.code === 'UsernameExistsException') {
        Swal.fire(
          'An account with the given email already exists!'
        )
      }
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    let usersub = this.globalId;
    let email = this.user.email;
    let name =  this.user.name;
    let bio = this.user.Bio;
    let hobby = this.user.Hobbies;
    let stateId = this.selectedStateId;
    // console.log(stateString);
    
    // let statename = this.states.find((state:any) => state.id == stateString);
    // let allState = statename.states.toString();
    let city = this.user.District;
    let profilePic = this.files;
    
  console.log(name,email,usersub,stateId,city,hobby,bio,profilePic,'from');
  
    
    this.payload.sendPayload(name,email,usersub,stateId,city,hobby,bio,profilePic).subscribe(
      data => {
        console.log(data,'overall'); 
        return true;
      })
     this.cognitoService.confirmSignUp(this.user)
     Swal.fire(
      'User Created!',
      'The user has been Created Successfully.',
      'success'
    )
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
      this.districts = districts.body;
      console.log(this.districts,'districts');
      // if(this.districts.length>0){
      //   this.filteredDistricts = this.districts.filter(
      //     (district:any) => district.stateId == this.selectedStateId);
      // }
        });
  }
 }





