import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
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

  constructor(private router:Router ,private service:ServerComms,private render:Renderer2) { }

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
      let tab = this.render.selectRootElement('#mat-tab-label-0-0',true);
      let tab2 = this.render.selectRootElement('#mat-tab-label-0-1',true);
      
      console.log('rendere',tab);
      console.log('rendere2',tab2);
      if(tab){
        if(this.theme){
          this.render.addClass(tab,'text-white');
          this.render.addClass(tab2,'text-white');
        }
        else{
          this.render.removeClass(tab,'text-white');
          this.render.removeClass(tab2,'text-white');
        }
      }
    })
  }

  route(str:String){
    this.router.navigate([`/${str}`]);
  }

}
