import { Component, OnInit ,OnDestroy, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion/expansion-panel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { issue } from '../Models/issues.model';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.scss']
})
export class ViewComponentComponent implements OnInit {

  constructor(private route: ActivatedRoute ,private service:ServerComms ,private router:Router,private snack:MatSnackBar,private param:ActivatedRoute) { }
  
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
    this.param.paramMap.subscribe(res => {
      let rcid = res.get("id");
      if(rcid && rcid !=='add')
        this.getRecordDetails(rcid);
      else{
        this.getRecordDetails("63a36684cbdfe83c273dbfb3");
      }  
    });
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
  goBack(){
    this.router.navigate(['/home']);
  }
  title:any;
  assignedTo:any;
  createRecord(){
  //   {
  //     "Title":"task for",
  //     "Descryption":"nothing",
  //     "Type":"Task",
  //     "CreatedBy":"639ca034da10173255153d65",
  //     "AssignedTo":"639ca034da10173255153d65",
  //     "Status":"Active"
  // }
    let arr = [this.title,this.assignedTo,this.status,this.type,this.description];
    console.log(arr);
    let err = arr.some(el => !el);
    if(err){
      this.snack.open("Please Fill The Mandatory Details","",{ duration:2000});
      return;
    }
    let payload = {
      "Title":this.title,
      "Descryption":this.description,
      "Type":this.type,
      "CreatedBy":this.assignedTo,
      "AssignedTo":this.assignedTo,
      "Status":this.status,
    }
    this.service.createRec(payload).subscribe(res => {
      console.log(res);
    },err => {
      this.snack.open(err.error.message,"",{duration:2000});
    });
  }
  comments:Comment[] = [{
    comment:"this is a very nice task brooooo",
    username:"Ather Ahmed",
    userid:"aldhfghadlsfgg44422",
    replies:[
      {
        username:"Ather Ahmed",
        reply:"LOL noob"
      }
    ]
  }];
  addReply(i:number){
    let reply = {
      username:"Ather Ahmed",
      userId:"alhdsgfhadgf76ghg3",
      reply:this.reply
    }
    this.comments[i].replies.push(reply);
    this.reply = ""
  }
  addComment(){
    let newCom:Comment = {
      comment:this.comment,
      username:'Ather Ahmed',//user,
      userid:"ahgkga124gb",
      replies:[]
    }
    this.comments.push(newCom);
    this.comment = "";
  }

  getRecordDetails(id:string){
    let pay = {id};
    this.service.getRecordDetails(pay).subscribe((res:any) => {
      if(res.message.toLowerCase() !== "success"){
        this.snack.open(res.message,"",{ duration:2000});
        return;
      }
      this.title = res.data.Title;
      this.status = res.data.Status;
      this.type = res.data.Type.toLowerCase();
      this.description = res.data.Descryption;
      this.assignedTo = res.data.AssignedTo;
    },err => {
      this.snack.open(err.error.message,"",{ duration:2000});
    });
  }
}
type Comment = {
  comment:string,
  username:string,
  userid:string,
  replies:any[],
}
