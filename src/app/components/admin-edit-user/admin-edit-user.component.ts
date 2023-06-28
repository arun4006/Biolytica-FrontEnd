import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { CognitoService, IUser } from 'src/app/services/cognito.service';
import { PayloadService } from 'src/app/services/payload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.scss']
})
export class AdminEditUserComponent {
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
state:new FormControl(''),
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
    this.UserId = this.routes.snapshot.paramMap.get('id'); //this.routes.snapshot.params['Id']; 
    this.payload.editUsersByAdmin(this.UserId).subscribe((data:any)=>{
    this.globalData=data;
    console.log();
    
    let statename = this.states.find((s:any) => s.id == this.globalData.body.state_id);
    console.log("statename"+statename);
    this.selectedStateId = parseInt(statename.id)
    console.log("selectedStateId"+ this.selectedStateId );
    
    this.onChangeDistrict()
    this.file=this.globalData.body.profile_pic
    console.log(this.file);
    var gg = this.globalData.body.hobbies.split(',');
    this.myForm = this.formBuilder.group({
      email: new FormControl(this.globalData.body.email),
      name: new FormControl(this.globalData.body.name),
      state:new FormControl(this.selectedStateId),
      district:new FormControl(parseInt(this.globalData.body.district_id)),
      bio:new FormControl(this.globalData.body.bio),
      hobbies:new FormControl(gg),
      });
   })
  }

  adminEditUserForm(){
    let name =  this.myForm.get('name')?.value;
    let bio = this.myForm.get('bio')?.value;
    let hobby = this.myForm.get('hobbies')?.value;
    let state =this.myForm.get('state')?.value;
    console.log(state);
    // let statename = this.states.find((state:any) => state.id == stateString);
    // let allState = statename.states;
    let city = this.myForm.get('district')?.value;
    let profilePic = this.files;
    this.payload.updateUsersByAdmin(this.UserId,name,state,city,hobby,bio,profilePic).subscribe(
      data => {
        console.log(data,'overall'); 
      })
      Swal.fire({
        icon: 'success',
        title: 'Updated Succesfully',
        showConfirmButton: false,
        timer: 1000
      })  
    this.router.navigate(['/users']);
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
    this.payload.getDistricts(this.selectedStateId).subscribe((districts:any) => {
      this.districts = districts.body;
      if(this.districts.length>0){
        this.filteredDistricts = this.districts.filter(
          (district:any) => district.stateId == this.selectedStateId);
      }
    });
  }

}
