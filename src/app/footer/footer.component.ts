import { Component, OnInit } from '@angular/core';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  theme: any;

  constructor(private service:ServerComms) { }

  ngOnInit(): void {
    this.service.themeSwitch$.subscribe(res => {
      this.theme = res;
    })
  }

}
