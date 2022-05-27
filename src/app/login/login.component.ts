import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  form!:FormGroup;
  
  ngOnInit(): void {
    this.form = new FormGroup({
      username : new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    })
  }

  submitForm(){
    console.log(this.form.get('username')?.value,this.form.get('password')?.value);
  }

}
