import { Component, OnInit ,OnDestroy, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion/expansion-panel';
import { ActivatedRoute, Router } from '@angular/router';

import { issue } from '../Models/issues.model';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.scss']
})
export class ViewComponentComponent implements OnInit {

  constructor(private route: ActivatedRoute ,private service:ServerComms ,private router:Router) { }
  
  icon:'userstory' | 'bug' | 'task' | '' = '';
  type:'userstory' | 'bug' | 'task' | '' = '';
  description!:string;
  status:string = ''
  classes = {
    "invalid":"inv",
    "active":"act",
    "new":"new"
  }
  overviewSection = true;
  commentsSection = false;
  reply!:string
  comment!:string;
  @ViewChild('matoverview', { static: true }) matOverview!: MatExpansionPanel;
  @ViewChild('matcomment', { static: true }) matComment!: MatExpansionPanel;

  ngOnInit(): void {
  
    
  }
  
  showCount:number = 0
  count(){
    this.showCount = this.description.length;
  }
  openAcc(e:string){
    console.log('opened',e);
    if(e === 'comment')
      this.matComment.open();
    if( e=== 'overview')
      this.matOverview.open();  
  }
  ontypeChange(){
    this.icon = this.type;
  }


}

