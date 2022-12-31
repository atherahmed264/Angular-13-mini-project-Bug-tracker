import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../Models/usermodel';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router, private service:ServerComms,private snackBar:MatSnackBar) { }
  form!:FormGroup;
  data!:User[];
  wrongcred:boolean = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      username : new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    })
    this.service.getData();
  }

  submitForm(){
    console.log(this.form);
    console.log(this.service.data);
    this.data = this.service.data
    let payload = {
      userEmail:this.form.value.username,
      userPass:this.form.value.password,
    }
    this.service.loginUser(payload).subscribe({
      next: (val:any) => {
        if(val.message === "Success"){
          console.log("login success",val);
          this.service.callnext(val.data.UserName);
          localStorage.setItem("Token",val.token);
          this.snackBar.open("Login Successfull","", { duration : 1000});
          this.route.navigate(['/landing']);
        }

      },
      error: err => {}
    })
  }
  signup(){
    this.route.navigate(['/signup']);
  }
  changepass(){
    sessionStorage.setItem('data','changepass');
  }

}
