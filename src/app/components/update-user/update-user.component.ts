import { Component } from '@angular/core';
import {PayloadService} from '../../services/payload.service'
import { CognitoService, IUser } from 'src/app/services/cognito.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers:[PayloadService]
})

export class UpdateUserComponent {
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

  UpdateUser(){
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
