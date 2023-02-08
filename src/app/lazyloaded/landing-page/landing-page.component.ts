import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { issue } from '../../Models/issues.model';
import { ServerComms } from '../../Services/server-comms.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit,AfterViewInit {
  theme!: boolean;

  constructor(private router:Router ,private service:ServerComms,private render:Renderer2,private snack:MatSnackBar) { }

  labels:String[] = [];
  values:any[] = [];
  data:issue[]=[] ;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels!:any; 
  barChartLegend = true;
  barChartData!:any;
  user:any;
  phoneNum!:number;
  country!:string;
  firstName!:string;
  lastName!:string;
  editable = false;
  userDetails!:any;
  email!:string;
  username!:string;
  ngOnInit(): void {
    this.service.loggedin$.subscribe( res => this.user = res);
    this.userDetails = sessionStorage.getItem('userObj');
    if(this.userDetails){
      this.userDetails = JSON.parse(this.userDetails);
      this.firstName = this.userDetails.data?.Name?.split(" ")[0];
      this.lastName = this.userDetails.data?.Name?.split(" ")[1];
      this.phoneNum = this.userDetails.data?.Mobile;
      this.country = this.userDetails.data?.Country;
      this.email = this.userDetails.data?.Email;
      this.username = this.userDetails.data?.UserName;
    }
    // this.service.getissues().subscribe( res => {
    //   this.data = res ;
    //   this.data.forEach( el => {
    //     this.labels.push(el.description);
    //     this.values.push(el.count);
    //   })
    //   this.barChartLabels = this.labels;
    //   this.barChartData = [ { data: this.values ,label:'No. of views'}];
    //   console.log(this.labels , this.values); 
    // })
    this.service.themeSwitch$.subscribe(theme => {
      this.theme = theme;
    })
  }
  ngAfterViewInit(): void {
    this.service.themeSwitch$.subscribe(res => {
      this.theme = res;
      console.log("ress",this.theme);
      document.querySelectorAll('.mat-tab-label-content')?.forEach(el => {
        if(res) el.classList.add("text-white");
        else el.classList.remove("text-white");
      })
    })
  }
  uploadFile(ev:Event){
    let e = ev.target as HTMLInputElement
    let files = e.files;
    let filetoupload = files?.item(0);
    if(filetoupload){
      filetoupload?.arrayBuffer().then(buffer => {
        let blob = new Blob([new Uint8Array(buffer)]);
        let fd = new FormData();
        fd.append('document',blob,filetoupload?.name);
        let userID = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : ''
        if(!userID){
          this.snack.open("User Id not Found","",{ duration:4000});
          return;
        }

        this.service.uploadDP(userID,fd).subscribe((res:any) => {
          if(res.message?.toLowerCase() !== 'success'){
            this.snack.open("Error While Uploading to the server");
            return;
          }

          this.snack.open("File Uploaded Successfully","",{ duration:4000});
          console.log('data',res);
          this.imageUrl = 'data:image/jpeg;base64,' + res.base64String;
        },err => {
          this.snack.open(err.error.message || 'SomeThing Went Wrong',"",{ duration:4000});
          
        })
      }).catch(err => {
        console.log(err);
      })
    }
  }
  imageUrl = 'https://as2.ftcdn.net/v2/jpg/02/34/61/79/1000_F_234617921_p1AGQkGyEl8CSzwuUI74ljn6IZXqMUf2.jpg'

  route(str:String){
    this.router.navigate([`/${str}`]);
  }

}
