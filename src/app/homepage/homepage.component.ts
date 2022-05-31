import { Component, OnInit } from '@angular/core';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private service:ServerComms) { }

  ngOnInit(): void {
    this.service.loggedin$.subscribe(res => console.log(res));
  }

}
