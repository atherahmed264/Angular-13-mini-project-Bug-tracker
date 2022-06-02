import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { issue } from '../Models/issues.model';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private service:ServerComms, private route:Router) { }

  Username!:String|undefined;
  issues!:issue[]
  viewenable:boolean = false;
  searchinput!:string;
  body:any;

  ngOnInit(): void {
    this.service.loggedin$.subscribe(res => this.Username = res);
    this.service.getissues().subscribe( response => this.issues = response);
  }

  gotToaddIssue(){
    this.route.navigate(['/addissue'])
  }
  sort(str:String){
    if(str=='o'){
    this.issues.sort((a:issue,b:issue) => {
      let frst = new Date(a.date);
      let scnd = new Date(b.date);
      if(frst > scnd) return 1;
      else return -1;
    })
    }
    else{
      this.issues.sort((a:issue,b:issue) => {
        let frst = new Date(a.date);
        let scnd = new Date(b.date);
        if(frst < scnd) return 1;
        else return -1;
      })
    }
  }

  count(id:number,count:number){
    let c;
    count ? c = count + 1 : count == 0 ? c = count + 1 : c = 0;
    this.body = {
      count : c,
    };
    this.service.patchissue(this.body,id).subscribe();
  }
  
}
