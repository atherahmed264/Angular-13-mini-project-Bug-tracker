import { Component, OnInit } from '@angular/core';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private service:ServerComms) { }

  ngOnInit(): void {

    this.service.loggedin$.subscribe( res => {
      this.data = res;
      if(this.data) this.login = true;
      else this.login = false;
    } );

  }
  data!:any;
  login!:boolean
}
