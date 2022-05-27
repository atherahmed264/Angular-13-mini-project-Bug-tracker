import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router) { }
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
  signup(){
    this.form.get('username')?.value || this.form.get('password')?.value ? alert('Are you sure you want to go to signup page'):'';
    this.route.navigate(['/signup']);
  }

}
