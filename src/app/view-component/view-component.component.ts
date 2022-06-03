import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { issue } from '../Models/issues.model';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.scss']
})
export class ViewComponentComponent implements OnInit,OnDestroy {

  constructor(private route: ActivatedRoute ,private service:ServerComms ,private router:Router) { }

  editMode:boolean = false;  
  id!:any;
  details!:issue
  name:String = '' ;
  severe:String ='' ;
  status:String = '' ;  
  date:any;
  options:String[]=['Minor' , 'Major' , 'Critical'];
  radio:String[]=['Open' , 'Closed' , 'In Progress'];
  save:boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(re => this.id = re.get('id'));
    this.service.getissuebyID(this.id).subscribe( res => {
      this.details = res;
      this.name = this.details.description;
      this.severe = this.details.severity;
      this.status = this.details.status;
      this.date = this.details.date;
    })
    
  }
  edit(){
    let obj:issue = {
      description:this.name,
      severity:this.severe,
      status:this.status,
      date: new Date(),
    };
    this.service.editissue(this.id,obj).subscribe();
    this.save = true;
    setTimeout(() => {
      this.router.navigate(['/home'])
    } ,500)
  }
  delete(id:number){
    this.service.deleteissue(id).subscribe();
    setTimeout( () => {
      this.router.navigate(['/home']);  
    } ,500);
  }

  ngOnDestroy() : void {
    this.save ? alert('Are you sure you want to submit'): this.editMode ? alert('Are you sure tou want to exit') : '';
  }

}

