import { Router } from '@angular/router';
import { PayloadService } from './../../services/payload.service';
import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  data: any=[];
  editdata:any=[];
  searchValue:string='';
  allUsers: number = 0;
  pagination: number = 1;
  selectedId:number=0;
  id:number=3;

  constructor(private router: Router,private payload: PayloadService) { }

  ngOnInit() {
    this.getUsers();
    this.editUsers();
  }
  
  getUsers(){
    this.payload.getData(this.pagination).subscribe((response:any) => {
      console.log(response);
      this.data = response.body;
      this.allUsers=response.body.id;
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


  editContact(contact: any) {
    let route = '/contacts/edit-contact';
    //this.router.navigate([route], { queryParams: { id: contact.id } });
  }

  viewContact(contact: any) {
    let route = '/contacts/view-contact';
    //this.router.navigate([route], { queryParams: { id: contact.id } });
  }
}
