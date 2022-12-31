import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { issue } from '../Models/issues.model';
import { ServerComms } from '../Services/server-comms.component';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private service: ServerComms, private route: Router, private dialog: MatDialog) { }

  tableHeaders = ['Record Number', 'Title', 'Type', 'Status', 'Assigned To', 'Created At'];
  Username!: String | undefined;
  issues!: any[]
  viewenable: boolean = false;
  searchinput!: string;
  body: any;
  dataSource!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ["Type", "Status", "Title", "AssignedTo"];

  loadPage() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.service.loggedin$.subscribe(res => this.Username = res);
    this.service.getissues().subscribe(response => {
      this.issues = response.data;
      this.dataSource = new MatTableDataSource(this.issues);
      this.loadPage()
      console.log(this.issues);
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
      height: '400px',
      width: '800px'
    });
    dialog.afterClosed().subscribe({
      next: payload => {
        this.service.getissues(payload).subscribe({
          next: res => {
            this.issues = res.data;
            this.dataSource = new MatTableDataSource(this.issues);
            this.loadPage()
            console.log(this.issues);
          }
        })
      }
    })
  }

}


@Component({
  selector: 'app-filterpopup',
  templateUrl: './filter-popup.html',
  styles: [``]
})

export class FilterPopup implements OnInit {
  constructor(private snack: MatSnackBar, public dialog: MatDialogRef<FilterPopup>) { }

  ngOnInit(): void {

  }

  filterStatus = new FormControl('');
  statusFilters = ['Active', 'Invalid', 'New']
  filterType = new FormControl('');
  typeFilters = ['Bug', 'User Story', 'Task'];
  radio!: any;
  statusFilter!: any;
  typeFilter!: any;

  runValidation() {
    let valids = [this.typeFilter, this.statusFilter, this.radio]
    let noneSelected = valids.every(value => !value);
    if (noneSelected) {
      this.snack.open("Make Selection Before Applying", "", { duration: 3000 });
      return;
    }
    this.buildObj()
  }

  buildObj() {
    let payload: any = {}
    if (this.radio) {
      payload.sort = this.radio;
    }
    if (this.typeFilter) {
      payload.filter = payload.filter || {};
      payload.filter.Type = this.typeFilter
    }
    if (this.statusFilter) {
      payload.filter = payload.filter || {};
      payload.filter.Status = this.statusFilter
    }
    this.dialog.close(payload);
  }
}