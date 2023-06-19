import { Router, ActivatedRoute} from '@angular/router';
import { PayloadService } from './../../services/payload.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { CognitoService } from 'src/app/services/cognito.service';
import {  TitleCasePipe } from '@angular/common';
import { Subscription } from 'aws-sdk/clients/ec2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  @Output() BoolAuth=new EventEmitter<boolean>();
  data: any=[];
  editdata:any=[];
  searchValue:string='';
  allUsers: number = 0;
  pagination: number = 1;
  selectedId:number=0;
  id:number=3;
  currentUser:any;
  isAuthenticated:any;
  
  constructor(private router: Router,private payload: PayloadService, private cognitoService:CognitoService, 
              private route:ActivatedRoute) { 
                route.params.subscribe(val=>{
                  this.getUsers()
                })
              }

  ngOnInit() {
    this.getUsers();
    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      console.log(success,'admin-page-comp');       
    });
    
  }
  
  getUsers(){
    this.payload.getData(this.pagination).subscribe((response:any) => {
      this.data = response.body.userList;
      this.allUsers=response.body.id;
      this.currentUser=response.body.user;
      // localStorage.setItem('signedUser',this.currentUser.signedUsername);
      // localStorage.setItem('location',this.currentUser.userLocation);
    })
  }

  editUsers(){
    this.payload.editUsersByAdmin(this.id).subscribe((res:any)=>{
      this.editdata=res.body;
      this.allUsers=res.body.id;
    })
  }

  searchText:EventEmitter<string>=new EventEmitter<string>();
  changeSearchValue(event:Event){
    this.searchText.emit(this.searchValue)
  }

  renderPage(event: number) {
    this.pagination = event;
    this.getUsers();
  }

  editForm(id:number){
    this.selectedId=id;
    this.router.navigate(['/editUser',id]);
  }


  deleteUser(id:number) {
    this.payload.deleteUserByAdmin(id).subscribe((res:any)=>{
      console.log(id, 'deluser id');
      console.log(res);
      this.getUsers();
      Swal.fire(
        'Deleted!',
        'The user has been deleted.',
        'success'
      );
    })
  }

}
