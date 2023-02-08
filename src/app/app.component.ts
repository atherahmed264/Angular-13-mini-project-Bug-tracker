import { Component, OnInit } from '@angular/core';
import { ServerComms } from './Services/server-comms.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private service:ServerComms){}

  loggedIn!:boolean
  ngOnInit(){
    this.service.loggedin$.subscribe(res => {
      this.loggedIn = !!res;
    });
   // this.service.checkPreferredTheme();
  }
  theme = window.matchMedia('(prefers-color-scheme: dark)')?.matches || false; // light by default
  changeTheme(){
    console.log(this.theme);
    this.theme = !this.theme;
    this.service.themeSwitch$.next(this.theme);
  }
  
}
