import { Component, Inject, Input, OnInit, ViewChild , ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-advancelookup',
  templateUrl: './advancelookup.component.html',
  styleUrls: ['./advancelookup.component.scss']
})
export class AdvancelookupComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  filteredOptions = [
    {
      name:"Ather AHmed",
      email:"atherfar@gmail.com",
      username:"atherAhm",
      selected:false
    },
    {
      name:"AHmed nashith",
      email:"anasht@gmail.com",
      username:"nashtAhm",
      selected:false
    },
    {
      name:"md sarfaraz",
      email:"sarfarzar@gmail.com",
      username:"sompraj",
      selected:false
    },
    {
      name:"Ather AHmed",
      email:"atherfar@gmail.com",
      username:"atherAhm",
      selected:false
    },
    {
      name:"AHmed nashith",
      email:"anasht@gmail.com",
      username:"nashtAhm",
      selected:false
    },
    {
      name:"md sarfaraz",
      email:"sarfarzar@gmail.com",
      username:"sompraj",
      selected:false
    },
    
  ];
  @Input() inputVal!:string;
  headerObj = [
    {
      id:1,
      name:"Name",
      attr:"Name"
    },
    {
      id:2,
      name:"Email",
      attr:"email"
    },
    {
      id:3,
      name:"User Name",
      attr:"userName"
    }
];
  @Input() advanceLookup !: boolean ;
  openLookup(){
    let dialogref = this.dialog.open(LookupPopup,{
      width:"900px",
      height:"400px",
      disableClose:true,
      data:[this.filteredOptions,this.headerObj]
    });
  } 
}

@Component({
  selector:"app-lookup-popup",
  templateUrl:'./lookup-popup.html'
})

export class LookupPopup implements OnInit,AfterViewInit{
  
  constructor( @Inject(MAT_DIALOG_DATA) public data:any ,public dialog:MatDialogRef<LookupPopup>){}

  headers!:any[];
  tabledata!:any[];
  filteredOptions = [
    {
      name:"Ather AHmed",
      email:"atherfar@gmail.com",
      username:"atherAhm",
      selected:false
    },
    {
      name:"AHmed nashith",
      email:"anasht@gmail.com",
      username:"nashtAhm",
      selected:false
    },
    {
      name:"md sarfaraz",
      email:"sarfarzar@gmail.com",
      username:"sompraj",
      selected:false
    },
    {
      name:"Ather AHmed",
      email:"atherfar@gmail.com",
      username:"atherAhm",
      selected:false
    },
    {
      name:"AHmed nashith",
      email:"anasht@gmail.com",
      username:"nashtAhm",
      selected:false
    },
    {
      name:"md sarfaraz",
      email:"sarfarzar@gmail.com",
      username:"sompraj",
      selected:false
    },
    
  ];
  @ViewChild('loader',{ read: ElementRef }) loader!:ElementRef
  ngOnInit(): void { 
      [this.tabledata,this.headers] = this.data;
      console.log(this.tabledata,this.headers);
      console.log(this.loader.nativeElement);
  }
  ngAfterViewInit(): void {
      console.log(this.loader.nativeElement);
      const intrsc = new IntersectionObserver(val => {
        if(val[0].isIntersecting){
          console.log(this.tabledata)
          console.log("LOAD MORE");
          this.tabledata.push(...this.tabledata);
          console.log(this.tabledata);
        }
      });
      intrsc.observe(this.loader.nativeElement);
  }

  radioSelected(email:any){
    this.tabledata.map(val => {
      console.log(email != val.email,email != val.email)
      if(val.email != email){ 
        val.selected = false;
      }else if(val.email == email){
        val.selected = true;
      }
    });
    console.log(this.tabledata);
  }
}
