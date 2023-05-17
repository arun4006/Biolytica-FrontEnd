import { Component, OnInit } from '@angular/core';
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [PayloadService]
})
export class ProfileComponent {

  loading: boolean;
  user: IUser;
  //fileData :fil
  //images =[];
  

  constructor(private cognitoService: CognitoService, private payload:PayloadService) {
    this.loading = false;
    this.user = {} as IUser;
    //this.file = ;
    

  }

  public ngOnInit(): void {
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });
  }
  // handleFileInput(files: FileList) {
  //     this.fileToUpload = files.item(0);

  // public handleFileInput(event :any){
  //   var file:File[] = event.target.files[0];
  //   this.FileUpload(file);
  //   this.payload.postFile(file).subscribe(
  //     data => {
  //       console.log(file,'Form fileUploadd')
  //       return true;
  //     })
  //   console.log(file,'handleFileInput');


  // }

  FileUpload(event:any){
    console.log('hhh', event);
    // var file:File = event.target.files;
  //   this.FileUpload(file);
    console.log(event,'Fileupload');
    
    // this.payload.postFile(file).subscribe(
    //   data => {
    //     console.log(file,'Form fileUploadd')
    //     return true;
    //   })
  }
  
  //   imageService.getImages('https://my-lambda-function.com/images').then(function(response) {
  //   $scope.images = response.data;
  // });
  
  
    // this.loading = true;
    // this.cognitoService.updateUser(this.user)
    // .then(() => {
    //   this.loading = false;
    // }).catch(() => {
    //   this.loading = false;
    // });
}

