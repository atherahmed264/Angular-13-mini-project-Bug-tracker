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
  theme!: boolean;

  constructor(private route:Router, public service:ServerComms,private snackBar:MatSnackBar) { }
  form!:FormGroup;
  data!:User[];
  wrongcred:boolean = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      username : new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    })
    this.service.getData();
    this.service.themeSwitch$.subscribe(res => {
      this.theme = res;
    })
  }

  submitForm(){
    this.service.loader = true;
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
          this.snackBar.open("Login Successfull","", { duration : 1000});
          console.log("login success",val);
          this.service.callnext(val.data.UserName);
          localStorage.setItem("Token",val.token);
          sessionStorage.setItem("userObj",JSON.stringify(val));
          sessionStorage.setItem("userId",val.data?._id);
          this.route.navigate(['/home']);
        }
        this.service.loader = false;
      },
      error: err => {
        console.log(err.error.message);
        let msg = err.error?.message || "Something went wrong";
        this.snackBar.open(msg,"",{ duration : 1000});
        this.service.loader = false;
      }
    })
  }
  signup(){
    this.route.navigate(['/signup']);
  }
  changepass(){
    sessionStorage.setItem('data','changepass');
  }

}
