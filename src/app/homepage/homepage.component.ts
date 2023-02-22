import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { issue } from '../Models/issues.model';
import { ServerComms, UserHeaders } from '../Services/server-comms.component';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit,OnChanges {
  theme!: boolean;
  
  constructor(public service: ServerComms, public route: Router, private dialog: MatDialog , private snack:MatSnackBar) { }
  
  searchText!: string;
  tableHeaders = ['Record Number', 'Title', 'Type', 'Status', 'Assigned To', 'Created At'];
  Username!: String | undefined;
  issues!: any[]
  viewenable: boolean = false;
  searchinput!: string;
  body: any;
  dataSource!: any;
  displayedColumns = ["Type", "Status", "Title", "AssignedTo"];
  loader = false;

  ngOnInit(): void {
    this.service.loggedin$.subscribe(res => this.Username = res);
    this.getRecords(sessionStorage.getItem('payload'),this.searchText);
    let ob$ = this.searchText$.asObservable();
    ob$.pipe(debounceTime(2000)).subscribe(val => {
      this.searchText = val;
      this.getRecords(sessionStorage.getItem('payload'),val);
    });
    this.service.themeSwitch$.subscribe(theme => {
      this.theme = theme;
    })
  }

  ngOnChanges(){
    console.log("pnchange")
  }

  searchText$:Subject<string> = new Subject<string>();
  search(){
    this.searchText$.next(this.searchinput);
  }

  getRecords(body?:any,search?:string){ 
    this.loader = true;
    let payload = body ? body : sessionStorage.getItem('payload');
    let searchText = search;
    this.service.getissues(payload,searchText).subscribe(response => {
      this.issues = response.data;
      console.log(this.issues);
      this.loader = false
    },
    err => {
      this.snack.open("Some Error Occurred","",{ duration:3000});
      this.loader = false;
    });
  }
  gotToaddIssue() {
    this.route.navigate(['/addissue'])
  }
  sort(str: String) {
    if (str == 'o') {
      this.issues.sort((a: issue, b: issue) => {
        let frst = new Date(a.date);
        let scnd = new Date(b.date);
        if (frst > scnd) return 1;
        else return -1;
      })
    }
    else {
      this.issues.sort((a: issue, b: issue) => {
        let frst = new Date(a.date);
        let scnd = new Date(b.date);
        if (frst < scnd) return 1;
        else return -1;
      })
    }
  }

  count(id: number, count: number) {
    let c;
    count ? c = count + 1 : count == 0 ? c = count + 1 : c = 0;
    this.body = {
      count: c,
    };
    this.service.patchissue(this.body, id).subscribe();
  }

  openPopup() {
    let dialog = this.dialog.open(FilterPopup, {
      height: '420px',
      width: '800px',
      disableClose:true
    });
    dialog.afterClosed().subscribe({
      next: payload => {
        console.log('payload',payload);
        if(payload === true) this.getRecords({},this.searchText);
        if(payload) this.getRecords(payload,this.searchText);
      }
    })
  }
  cl(x:any){
    console.log(x)
  }
}


@Component({
  selector: 'app-filterpopup',
  templateUrl: './filter-popup.html',
  styles: []
})

export class FilterPopup implements OnInit {
  theme!: boolean;
  constructor(private snack: MatSnackBar, public dialog: MatDialogRef<FilterPopup>, public service:ServerComms, private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.radio = sessionStorage.getItem('radio') || undefined;
    this.typeFilter = JSON.parse(sessionStorage.getItem('typeFilters') as string) || undefined;
    this.statusFilter = JSON.parse(sessionStorage.getItem('statusFilters') as string) || undefined;
    this.getUsers();
    this.service.themeSwitch$.subscribe(theme => {
      this.theme = theme;
    })
  }

  filterStatus = new FormControl('');
  statusFilters = ['Active', 'Invalid', 'New']
  filterType = new FormControl('');
  typeFilters = ['Bug', 'UserStory', 'Task'];
  radio!: any;
  statusFilter!: any;
  typeFilter!: any;
  filterCleared = false;

  runValidation() {
    console.log("jkk",this.selectedUsers);
    let valids = [this.typeFilter, this.statusFilter, this.radio]
    let noneSelected = valids.every(value => !value);
    if (noneSelected) {
      this.snack.open("Make Selection Before Applying or Click Close if You Want to Close", "", { duration: 3000 });
      return;
    }
    this.buildObj()
  }
  selectedUsers = {name:"",id:""}
  users:any
  buildObj() {
    this.filterCleared = false;
    sessionStorage.removeItem('payload');
    let payload: any = {}
    if (this.radio) {
      let radio = this.radio;
      payload.sort = this.radio;
      sessionStorage.setItem('radio',radio);
    }
    if (this.typeFilter) {
      let filters = JSON.stringify(this.typeFilter);
      payload.filter = payload.filter || {};
      payload.filter.Type = this.typeFilter;
      sessionStorage.setItem('typeFilters',filters);
    }
    if (this.statusFilter) {
      let filters = JSON.stringify(this.statusFilter);
      payload.filter = payload.filter || {};
      payload.filter.Status = this.statusFilter;
      sessionStorage.setItem('statusFilters',filters);
    }
    if(this.selectedUsers.id){
      payload.filter.OwnerId = this.selectedUsers.id;
    }
    if(this.startDate && this.endDate){
      let start = this.datePipe.transform(this.startDate,"yyyy-MM-dd");
      let end = this.datePipe.transform(this.endDate,"yyyy-MM-dd");
      payload.dateRange = start+"/"+end;
    }
    if(Object.keys(payload).length > 0){
      let str = JSON.stringify(payload)
      sessionStorage.setItem('payload',str);
    }
    this.dialog.close(payload);
  }

  pageNo = 1;
  limit = 10;
  searchText = "";
  startDate!:Date;
  endDate!:Date;
  getUsers(){
    this.service.userLookup(this.pageNo,this.searchText,this.limit).subscribe({
      next:(res:any) => {
        this.headerObj = UserHeaders;
        this.data = res.data;
        console.log(this.data);
      },
      error:(err:any) => {
        this.snack.open("Unable to fetch Users Right now","",{ duration:4000});
      }
    })
  }
  
  clear(){
    this.filterCleared = true;
    this.radio = undefined;
    this.typeFilter = undefined;
    this.statusFilter = undefined;
    sessionStorage.removeItem('payload');
    sessionStorage.removeItem('statusFilters');
    sessionStorage.removeItem('typeFilters');
    sessionStorage.removeItem('radio');
  }
  
  headerObj:any;
  data:any
  loadMore(page:number){
    console.log("load moreeee");
    console.log(page);
  }
  searchApi(search:string){
    console.log("SEARCHHH");
    console.log(search);
  }
}