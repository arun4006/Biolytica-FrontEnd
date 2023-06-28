import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {PayloadService} from '../../services/payload.service'
import { IUser, CognitoService } from '../../services/cognito.service';
import { Objects } from 'src/app/interface/Objects';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
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
  thumbnail:string[]=[];
  UserName:any;
  UserLocation:any;
  showModal: boolean;
  selectedImage:any;
  UserId:any;
  ProfilePic:any;
  constructor(private cognitoService: CognitoService, 
              private payload:PayloadService,
              private router: Router) {
    this.loading = false;
    this.user = {} as IUser;
    this.showModal=false;

  }
  

  public ngOnInit(): void {
    if(! localStorage.getItem('AccessToken')){
      alert("You are not authorized");
      this.router.navigate(['/signIn']);
    }else {
     this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
      this.getImagesByLocationFunction();
    });


    }
  }


  getImagesByLocationFunction(){
    this.payload.getImagesByLocation().subscribe((baseImage:any)=>{
      for(let i=0;i<baseImage.body.length;i++){
        console.log("image"+baseImage.body+" "+i);
        this.thumbnail[i] = baseImage.body[i].image_url;  
      }
    })
  }
  
  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file =event.target.files[0];
  }
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  upload() {
    console.log(this.file);
    if (this.file) {
      this.payload.uploadnewfile(this.file).subscribe(resp => {            
        this.getImagesByLocationFunction();  
        this.file = null; 
        this.fileInput.nativeElement.value = this.file;    
      })
    } else {
      alert("Please select a file first")
    }
  }
  toggleImage(image: any) {
    this.selectedImage = image
    this.showModal = true;
  }
  Close(){
    this.showModal = false;
  }
}

