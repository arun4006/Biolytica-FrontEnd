import { Component, OnInit } from '@angular/core';
import {PayloadService} from '../payload.service'
import { IUser, CognitoService } from '../cognito.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [PayloadService]
})
export class ProfileComponent {

  loading: boolean;
  user: IUser;
  

  constructor(private cognitoService: CognitoService, private payload:PayloadService) {
    this.loading = false;
    this.user = {} as IUser;
    

  }

  public ngOnInit(): void {
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });
  }
  // handleFileInput(files: FileList) {
  //     this.fileToUpload = files.item(0);

  public handleFileInput(event :any){
    this.user.file = event.target.files[0];
    console.log(this.user.file,'handleFileInput');


  }

  FileUpload(){
    console.log(this.user.file,'Fileupload');
    
    this.payload.postFile(this.user.file).subscribe(
      data => {
        console.log(this.user.file,'Form fileUploadd')
        return true;
      })

    
  }
  
  
    // this.loading = true;
    // this.cognitoService.updateUser(this.user)
    // .then(() => {
    //   this.loading = false;
    // }).catch(() => {
    //   this.loading = false;
    // });
}

