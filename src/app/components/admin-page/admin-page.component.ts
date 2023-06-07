import { PayloadService } from './../../services/payload.service';
import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  data: any=[];
  searchValue:string='';
  allUsers: number = 0;
  pagination: number = 1;

  constructor(private payload: PayloadService) { }

  ngOnInit() {
    this.getUsers();
  }
  
  getUsers(){
    
    this.payload.getData(this.pagination).subscribe((response:any) => {
      console.log(response);
      this.data = response.body;
      this.allUsers=response.body.id;
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
  editContact(contact: any) {
    let route = '/contacts/edit-contact';
    //this.router.navigate([route], { queryParams: { id: contact.id } });
  }

  viewContact(contact: any) {
    let route = '/contacts/view-contact';
    //this.router.navigate([route], { queryParams: { id: contact.id } });
  }
}
