import { Component, OnInit } from '@angular/core';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  theme!: boolean;

  constructor(private service:ServerComms) { }

  ngOnInit(): void {
    this.service.themeSwitch$.subscribe(res => {
      this.theme = res;
    })

    this.service.loggedin$.subscribe( res => {
      this.data = res;
      this.login = this.data ? true : false;
    } );

  }
  data!:any;
  login!:boolean

  logout(){
    this.service.loggedin$.next('');
  }
}
