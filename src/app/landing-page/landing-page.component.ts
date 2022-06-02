import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { issue } from '../Models/issues.model';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private router:Router ,private service:ServerComms) { }

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

  ngOnInit(): void {
    this.service.loggedin$.subscribe( res => this.user = res);
    this.service.getissues().subscribe( res => {
      this.data = res ;
      this.data.forEach( el => {
        this.labels.push(el.description);
        this.values.push(el.count);
      })
      this.barChartLabels = this.labels;
      this.barChartData = [ { data: this.values ,label:'No. of views'}];
      console.log(this.labels , this.values); 
    })
  }

  route(str:String){
    this.router.navigate([`/${str}`]);
  }

}
