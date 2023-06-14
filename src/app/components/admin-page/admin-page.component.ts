import { Router } from '@angular/router';
import { PayloadService } from './../../services/payload.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { CognitoService } from 'src/app/services/cognito.service';

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
  
  
  

  constructor(private router: Router,private payload: PayloadService, private cognitoService:CognitoService) { }

  ngOnInit() {
    this.getUsers();
    this.editUsers();
    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      console.log(success,'admin-page-comp');
      this.BoolAuth.emit(success);
      console.log(this.BoolAuth,'fjjfjfjf');
               
    });
  }
  
  getUsers(){
    this.payload.getData(this.pagination).subscribe((response:any) => {
      console.log("getusers:"+response.body.userList);
      this.data = response.body.userList;
      this.allUsers=response.body.id;
      this.currentUser=response.body.user;
      localStorage.setItem('signedUser',this.currentUser.signedUsername);
      localStorage.setItem('location',this.currentUser.userLocation);
      localStorage.setItem('profilepic',this.currentUser.profilePic);
      console.log(this.data);
    })
  }

  editUsers(){
    this.payload.editUsersByAdmin(this.id).subscribe((res:any)=>{
      console.log(res.body,'edituser');
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
    console.log(this.selectedId,'editForm');
    this.router.navigate(['/editUser',{Id:id}]);
  }


  deleteUser(id:number) {
    this.payload.deleteUserByAdmin(id).subscribe((res:any)=>{
      console.log(id, 'deluser id');
      console.log(res);
    })
  }

}
