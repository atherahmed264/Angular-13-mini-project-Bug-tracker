import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor( private router:Router , private http:HttpClient) { }
  
  signupForm!:any;
  pass:boolean = false;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      "firstName": new FormControl('',[Validators.required,this.notaNum]),
      "lastName": new FormControl('',[Validators.required]),
      "Mobile": new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(11),this.isAstr]),
      "Country": new FormControl('',[Validators.required,this.notaNum]),
      "email": new FormControl('',[Validators.required,Validators.email]),
      "username": new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
      "password":new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]),
      "retypepass": new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(16)])

    })
  }

  notaNum(str:AbstractControl) :any{
    let com = /[a-z][A-Z]/;
    if(com.test(str.value)) return { 'notnum' :true }; 
    else return null;
  }

  isAstr(num:AbstractControl){
    let alphab = /[0-9]/;
    if(alphab.test(num.value)) return {'isAstr':true};
    else return null; 
  }

  passMatch(pass:AbstractControl){
    let pwd = this.signupForm.get('password')?.value;
    if(pass == pwd) return { 'passMatch':true};
    else return null;
  }

  signUp(){
    if(this.signupForm != undefined && !this.signupForm.invalid){
      console.log(this.signupForm);
    }
    else {
      console.log('form error');
      alert('please fill out details carefully')
    }
  }
}
