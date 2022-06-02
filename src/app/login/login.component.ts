import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../Models/usermodel';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router, private service:ServerComms) { }
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
    if(this.form.valid){
      let user = this.data.find(el => el.Username == this.form.value.username && el.Password == this.form.value.password);
      console.log(user);
      if(user){
      this.service.callnext(user?.Username);
      this.route.navigate(['/landing'])
      }
      else{
        this.wrongcred = true;
      }
    }
    else{
      alert('Wrong Username or Password')
    }
  }
  signup(){
    this.form.get('username')?.value || this.form.get('password')?.value ? alert('Are you sure you want to go to signup page'):'';
    this.route.navigate(['/signup']);
  }

}
