import { Router, ActivatedRoute, Params } from '@angular/router';
import { PayloadService } from './../../services/payload.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CognitoService } from 'src/app/services/cognito.service';
import Swal from 'sweetalert2';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: any = [];
  currentPage: number = 1;
  totalPages: number = 1;
  selectedId: number = 0;
  data: any = [];
  editdata: any = [];
  allUsers: number = 0;
  pagination: number = 1;
  id: number = 3;
  currentUser: any;
  isAuthenticated: any;
  searchText: string = '';

  constructor(
    private router: Router,
    private payload: PayloadService,
    private cognitoService: CognitoService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((val) => {
      this.getUsers(1,'');
    });
  }

  ngOnInit() {
    if(! localStorage.getItem('AccessToken')){
      alert("You are not authorized");
      this.router.navigate(['/signIn']);
    }else {
    this.getUsers(1,'');
    this.cognitoService.isAuthenticated().then((success: boolean) => {
      console.log(success, 'admin-page-comp');
    });
  }
  }

  getUsers(page: number,searchText:string) {
    this.payload.getUsers(page,searchText).subscribe((response: any) => {
      console.log(response);
      this.users = response.body.users;
      this.totalPages = response.body.totalPages;
      console.log(this.users);
    });
  }

  editUsers() {
    this.payload.editUsersByAdmin(this.id).subscribe((res: any) => {
      this.editdata = res.body;
      this.allUsers = res.body.id;
    });
  }

  editForm(id: number) {
    this.selectedId = id;
    this.router.navigate(['/editUser', id]);
  }

  deleteUser(id: number,name:string) {
    
    Swal.fire({
      title: 'Are you sure?',
      html: `<span class="custom-message">Do you want to delete <strong>${name}?</strong>.</span>`,
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#c1c1c1',
      showConfirmButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#f15e5e',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete(id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          showConfirmButton: false,
          timer: 1000
        })
        this.getUsers(1,'');
      }
    })
  }
  
  confirmDelete(id: number){
    this.payload.deleteUserByAdmin(id).subscribe((res: any) => {
      console.log(id, 'deluser id');
      console.log(res);
      //this.getUsers(id,'');
     });
  }

  onSearchChange(): void {
    console.log(this.searchText);
    const accessToken = localStorage.getItem('AccessToken')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    this.getUsers(1,this.searchText);
    
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      console.log('the current page' + this.currentPage);

      this.getUsers(this.currentPage,'');
    }
  }

  getPageRange(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}
