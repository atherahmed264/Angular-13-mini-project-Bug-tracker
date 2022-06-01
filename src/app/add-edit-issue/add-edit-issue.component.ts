import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { issue } from '../Models/issues.model';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-add-edit-issue',
  templateUrl: './add-edit-issue.component.html',
  styleUrls: ['./add-edit-issue.component.scss']
})
export class AddEditIssueComponent implements OnInit,OnDestroy {

  constructor(private service:ServerComms ,private route:Router){ }

press:boolean = false;
form!:any
options:String[]=['Minor' , 'Major' , 'Critical'];
radio:String[]=['Open' , 'Closed' , 'In Progress'];
postBody!:issue;
user!:String | undefined

ngOnInit(): void {
    this.form = new FormGroup({
        issue : new FormControl('' ,[Validators.required, Validators.minLength(5)]),
        select : new FormControl('',[Validators.required]),
        radio : new FormControl('',[Validators.required])
    })
    this.service.loggedin$.subscribe( res => this.user == res)
}
getvalue(){
    return this.form.value;
}
onsubmit(){
    console.log(this.getvalue().issue);
  if(this.form.valid){
    this.press=true;  
    this.postBody = {
      description: this.getvalue()?.issue,
      severity: this.getvalue()?.select,
      status: this.getvalue()?.radio,
      date: new Date(),
    }
    this.form.reset();
    this.service.addissues(this.postBody).subscribe();
    setTimeout(() => {
      this.route.navigate(['/home']);
    } ,500)
    
  }
}
ngOnDestroy(): void {
    if(!this.press) alert('Are You Sure You Want To Leave');
}
}
