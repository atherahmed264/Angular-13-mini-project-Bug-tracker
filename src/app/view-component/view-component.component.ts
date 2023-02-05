import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion/expansion-panel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { RecordHeaders, ServerComms, UserHeaders } from '../Services/server-comms.component';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.scss']
})
export class ViewComponentComponent implements OnInit, AfterViewInit {
  adding!: boolean;
  headerObj!: { name: string; attr: string; }[];
  data: any;
  el!: HTMLButtonElement;

  constructor(private route: ActivatedRoute, private service: ServerComms, private router: Router, private snack: MatSnackBar, private activeRoute: ActivatedRoute, private element: ElementRef) { }

  icon: 'UserStory' | 'Bug' | 'Task' | '' = '';
  type: 'UserStory' | 'Bug' | 'Task' | '' = '';
  description!: string;
  status: string = ''
  classes = {
    "invalid": "inv",
    "active": "act",
    "new": "new"
  }
  efforts!: number;
  effortsComp!: number;
  endDate!: Date;
  startDate!: Date;
  overviewSection = true;
  commentsSection = false;
  reply!: string
  comment!: string;
  new = false;
  @ViewChild('matoverview', { static: true }) matOverview!: MatExpansionPanel;
  @ViewChild('matcomment', { static: true }) matComment!: MatExpansionPanel;

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(res => {
      this.rcid = res.get("id");
      if (this.rcid && this.rcid !== 'add')
        this.getRecordDetails(this.rcid);
      else
        this.new = true;
    });
    this.getUsers();
   // this.getRecords();
  }
  ngAfterViewInit(): void {
    this.el = document.querySelector(".advopen") as HTMLButtonElement;
    console.log("elll", this.el);
  }

  clickel() {

    this.el = document.querySelector(".advopen") as HTMLButtonElement;


    console.log(this.el)
    this.el.click();
  }

  showCount: number = 0
  count() {
    this.showCount = this.description.length;
  }
  openAcc(e: string) {
    console.log('opened', e);
    if (e === 'comment')
      this.matComment.open();
    if (e === 'overview')
      this.matOverview.open();
  }
  ontypeChange() {
    this.icon = this.type;
  }
  goBack() {
    this.router.navigate(['/home']);
  }
  title: any;
  assignedTo: any;
  rcid: any
  checkMandatory(): boolean {
    let arr = [this.title, this.assignedTo, this.status, this.type, this.description];
    console.log(arr);
    let err = arr.some(el => !el);
    return err
  }
  createRecord() {
    //   {
    //     "Title":"Task for",
    //     "Descryption":"nothing",
    //     "Type":"Task",
    //     "CreatedBy":"639ca034da10173255153d65",
    //     "AssignedTo":"639ca034da10173255153d65",
    //     "Status":"Active"
    // }

    let err = this.checkMandatory();
    if (err) {
      this.snack.open("Please Fill The Mandatory Details", "", { duration: 2000 });
      return;
    }

    let payload = {
      "Title": this.title,
      "Descryption": this.description,
      "Type": this.type,
      "CreatedBy": this.assignedTo, // chanbge
      "AssignedTo": this.assignedTo,
      "Status": this.status,
      "StartDate": this.startDate,
      "EndDate": this.endDate,
      "Efforts": this.efforts,
      "CompletedEfforts": this.effortsComp
    }
    console.log("payload", payload);
    this.service.createRec(payload).subscribe((res: any) => {
      console.log(res);
      this.bindRecordDetails(res);
      this.snack.open(`${res.data.Type} Created Successfully Number - ${res.data.RecordNumber}`, "", { duration: 3000 });
    }, err => {
      this.snack.open(err.error.message, "", { duration: 2000 });
    });
  }
  comments!: Comment[];
  file!:FileList;
  addReply(i: number) {
    let reply = {
      username: "Ather Ahmed",
      userId: "alhdsgfhadgf76ghg3",
      reply: this.reply
    }
    this.comments[i].replies.push(reply);
    this.reply = ""
  }
  addComment() {
    if (!sessionStorage.getItem('userId')) {
      this.snack.open("Login Before Adding Comments", "", { duration: 3000 });
      return;
    }
    this.adding = true;
    this.service.addCommentOrReply("Comment", this.rcid, sessionStorage.getItem('userId') as string, this.comment)
      .subscribe({
        next: (res: any) => {
          let newCom: Comment = {
            comment: res.data?.Comment,
            username: 'Ather Ahmed',//user,
            userid: res.data?.UserId,
            replies: res.data?.Replies
          }
          this.comments.push(newCom);
          this.adding = false;
          this.comment = "";
        },
        error: err => {
          this.adding = false;
          this.snack.open(err.error.message, "", { duration: 3000 });
        }
      })

  }

  getRecordDetails(id: string) {
    let pay = { id };
    this.service.getRecordDetails(pay).subscribe((res: any) => {
      if (res.message.toLowerCase() !== "success") {
        this.snack.open(res.message, "", { duration: 2000 });
        return;
      }

      this.bindRecordDetails(res);
    }, err => {
      this.snack.open(err.error.message, "", { duration: 2000 });
    });
  }
  createdBy!:any; 
  createdOn!:string
  bindRecordDetails(res: any) {
    debugger;
    console.log(res)
    let intl = new Intl.RelativeTimeFormat('en',{ style:'short',numeric:'auto'});
    let current = Date.now();
    let created = new Date(res.data.CreatedAt).valueOf();
    const diff = created - current;
    
   this.createdOn= intl.format(Math.floor(diff/(1000*60*60*24)),'days');
    this.selectedUsers.id = res.data.AssignedTo?._id;
    this.selectedUsers.name = res.data.AssignedTo?.Name + " - " + res.data.AssignedTo?.Email;
    console.log(res);
    let obj: RecordDetails = {
      Title: res.data.Title,
      Status: res.data.Status,
      Type: res.data.Type,
      Descryption: res.data.Descryption,
      AssignedTo: res.data.AssignedTo?.Name + " - " + res.data.AssignedTo?.Email,
      Efforts: res.data.Efforts,
      CompletedEfforts: res.data.CompletedEfforts,
      StartDate: res.data.StartDate,
      EndDate: res.data.EndDate,
    }

    this.title = obj.Title;
    this.status = obj.Status;
    this.type = obj.Type;
    this.description = obj.Descryption;
    this.assignedTo = obj.AssignedTo;
    this.efforts = obj.Efforts as number;
    this.effortsComp = obj.CompletedEfforts as number;
    this.startDate = obj.StartDate as Date;
    this.endDate = obj.EndDate as Date;
  }

  saveData() {
   
    let err = this.checkMandatory();
    if (err) {
      this.snack.open("Please Fill The Mandatory Details", "", { duration: 2000 });
      return;
    }

    let payload: RecordDetails = {
      Title: this.title,
      Type: this.type,
      Status: this.status,
      AssignedTo: this.selectedUsers.id,
      Descryption: this.description,
      Efforts: this.efforts,
      CompletedEfforts: this.effortsComp,
      EndDate: this.endDate,
      StartDate: this.startDate,
      id: this.rcid
    }
    if(this.file){
      let fd = new FormData();
      //fd.append("document",this.file,this.file.name);
      this.service.uploadFile(this.rcid,fd).subscribe({
        next:(val:any) => {
          this.snack.open("File Uploaded", "" , { duration :3000});
        },
        error:(err:any) => {
          this.snack.open(`File Upload Failed ${err.error.message}`, "" , { duration :3000});
        }
      });
      console.log(this.file);
    }
    this.service.saveRecordDetails(payload).subscribe({
      next: (res: any) => {
        if (res.message.toLowerCase() !== 'success') {
          this.snack.open("Some Error Occurred", "", { duration: 3000 });
          return
        }
        this.bindRecordDetails(res);
        this.snack.open("Details Saved Successfully", "OK", { duration: 4000 });

      },
      error: err => {
        this.snack.open(err.error.message, "", { duration: 4000 });
      }
    });

  }
  saveOrCreate() {
    if (this.new) {
      this.createRecord();
    }
    else {
      this.saveData();
    }
  }
  upload(ev: Event) {
    let e = ev.target as HTMLInputElement;
    this.file = e.files as FileList;
    console.log(this.file);
    let filetoupload = this.file.item(0);
    
    if(filetoupload?.type.split("/")[0] !== 'image'){
      this.snack.open("Only Images are Allowed","",{ duration:4000});
      e.files = null;
      return;
    }

    let name = filetoupload?.name;
    let fd = new FormData();
    filetoupload?.arrayBuffer().then(buff => {
      let blob = new Blob([new Uint8Array(buff)]);
      fd.append('document', blob,name);
      this.service.uploadFile(this.rcid, fd).subscribe({
        next:(res:any) => {
          if(res.message.toLowerCase() === 'success')
            this.snack.open("File Uploaded Successfully","",{ duration:4000});
            this.input.value = "";
        }
      })
    }).catch(err => {
      this.snack.open("Something wrong with file " + err, "", { duration: 4000 });
    })
  }

  loadComments() {
    this.service.getCommentList(this.rcid).subscribe({
      next: (res: any) => {
        console.log(res.data, "daaata");
        this.comments = res.data.map((val: any) => {
          return {
            comment: val.Comment,
            username: val.UserId?.UserName,
            userid: val.UserId?._id,
            replies: val.Replies
          }
        });
      },
      error: err => {
        this.snack.open(err.error.message, "", { duration: 3000 });
      }
    })
  }
  pageNo = 1;
  limit = 10;
  searchText = "";
  selectedUsers = { name: "", id: "" }
  getUsers() {
    this.service.userLookup(this.pageNo, this.searchText, this.limit).subscribe({
      next: (res: any) => {
        this.headerObj = UserHeaders;
        this.data = res.data.map((x: any, i: number) => {
          return {
            ...x,
            id: i,
            selected: false
          }
        });
        console.log(this.data);
      },
      error: (err: any) => {
        this.snack.open("Unable to fetch Users Right now", "", { duration: 4000 });
      }
    })
  }
  loadMore(page: number) {
    console.log("load moreeee");
    console.log(page);
  }
  searchApi(search: string) {
    console.log("SEARCHHH");
    console.log(search);
  }
  recordHeaders = RecordHeaders;
  recordsData!: any;
  selectedRecord = { name: "", id: "" }
  getRecords() {
    this.service.recordLookup(1, 10, "").subscribe({
      next: (response: any) => {
        if (response.message?.toLowerCase() !== 'success') {
          this.snack.open(response.message, "", { duration: 3000 });
          return;
        }

        this.recordsData = response.data.map((record: any) => {
          return {
            id: record._id || " - ",
            Name: (record.RecordNumber && record.Title) ? record.RecordNumber + " - " + record.Title : ' - ',
            recordNum: record.RecordNumber || "-",
            recordOwn: record.AssignedTo?.Name || "-",
            recordStatus: record.Status || "-",
            recordType: record.Type || "-"
          }
        })
      }
    })
  }

  @ViewChild('fileInput') input!:any;
  attachments = []
}
type Comment = {
  comment: string,
  username: string,
  userid: string,
  replies: any[],
}
type RecordDetails = {
  Title: string,
  Status: string,
  Type: 'UserStory' | 'Bug' | 'Task' | '',
  Descryption: string,
  AssignedTo: string,
  Attachments?: string[],
  Parent?: string,
  Child?: string,
  Efforts?: number,
  CompletedEfforts?: number,
  StartDate?: Date,
  EndDate?: Date,
  id?: string
} 
