import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';
import { Objects } from 'src/app/interface/Objects';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [PayloadService]
})
export class ProfileComponent {

  loading: boolean;
  user: IUser;
  objects:Objects[] | undefined; 
  file: any;
 

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

  //  this.onGetFilesByLocation();
  }

  // onGetFilesByLocation() {
  //   this.payload.getFileByuserLocation()
  //   .subscribe({
  //     next: (response) => { 
  //      // this.users=response;
  //       this.objects=response;
  //       console.log(response);
  //     },
  //     error: (error: any) => console.log(error),
  //     complete: () => console.log('Finally we get all users'),
  //   }); 
    
  // }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file =event.target.files[0];
    
  }
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  upload() {
    
    console.log(this.file);
    if (this.file) {
      this.payload.uploadnewfile(this.file).subscribe(resp => {            
        alert("file Uploaded");   
        this.file = null; // Reset the value of the file variable
        //document.getElementById('formFile').value = '';
        this.fileInput.nativeElement.value = this.file;    
      })
    } else {
      alert("Please select a file first")
    }
  }

  clear(){
  
  }
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

 // FileUpload(event:any){
    //console.log('hhh', event);
  //  // var file:File = event.target.files;
  //   this.FileUpload(file);
   // console.log(event,'Fileupload');
    
    // this.payload.postFile(file).subscribe(
    //   data => {
    //     console.log(file,'Form fileUploadd')
    //     return true;
    //   })
 // }
  
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
//}

