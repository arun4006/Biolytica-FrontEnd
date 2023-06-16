import { Component } from '@angular/core';
import {PayloadService} from '../../services/payload.service'
import { CognitoService, IUser } from 'src/app/services/cognito.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers:[PayloadService]
})

export class UpdateUserComponent {

  globalId :any;
  loading: boolean;
  UserId:any;
  user: IUser;
  states: any=[];
  districts: any=[];
  selectedStateId: number;
  filteredDistricts: any=[];
 myForm: any;
  items: string[] = ['Reading', 'Sport', 'Gym', 'Drawing'];
  selectedItems:string[]=this.items;
  file:string='';
  selectedFile:File|null;
  files:any;
  globalData:any;

  constructor(private router: Router, private routes:ActivatedRoute, private payload:PayloadService,private formBuilder: FormBuilder) {
this.loading = false;
this.user = {} as IUser;
this.selectedStateId = 0;
this.selectedFile = null;
this.myForm = this.formBuilder.group({
profilePicture: null,
email: new FormControl(''),
name: new FormControl(''),
stateew:new FormControl(''),
district:new FormControl(''),
hobbies:new FormControl(['']),
bio:new FormControl('')
});
}
  ngOnInit(){
    this.payload.getStates().subscribe((event:any)=>{
      this.states = event.body;
      console.log(this.states);
    })
    this.UserId = localStorage.getItem('UserId'); 
    console.log(this.UserId);
    this.payload.editUsersByAdmin(this.UserId).subscribe((data:any)=>{
    console.log(data,'update profile');
    this.globalData=data;
    let statename = this.states.find((state:any) => state.states == this.globalData.body[0].state);
    this.selectedStateId = statename.id;
    this.onChangeDistrict()
    this.file=this.globalData.body[0].profilepic
    var gg = this.globalData.body[0].hobbies.split(',');
    this.myForm = this.formBuilder.group({
      email: new FormControl(this.globalData.body[0].email),
      name: new FormControl(this.globalData.body[0].name),
      stateew:new FormControl(statename.id),
      district:new FormControl(this.globalData.body[0].district),
      bio:new FormControl(this.globalData.body[0].bio),
      hobbies:new FormControl(gg),
      });
   })
  }

  adminEditUserForm(){
    let name =  this.myForm.get('name')?.value;
    let bio = this.myForm.get('bio')?.value;
    //let usersub = 
    let hobby = this.myForm.get('hobbies')?.value;
    let stateString = this.selectedStateId;
    let statename = this.states.find((state:any) => state.id == stateString);
    let allState = statename.states.toString();
    let city = this.myForm.get('district')?.value;
    let profilePic = this.files;
    console.log(bio,'hbuhiuhuh');
    this.payload.updateUsersByAdmin(this.UserId,name,allState,city,hobby,bio,profilePic).subscribe(
      data => {
        console.log(data,'overall'); 
        return true;
      })
    this.router.navigate(['/profile'])
    Swal.fire('Updated Succesfully','User information has been updated.','success')
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
