import { PayloadService } from './../../services/payload.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  data: any=[];

  constructor(private payload: PayloadService) { }

  ngOnInit() {
    this.payload.getData().subscribe((response:any) => {
      this.data = response.users;
      console.log(this.data);
      
    });
  }
}
