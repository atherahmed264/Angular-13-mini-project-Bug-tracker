import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../Models/usermodel';
import { ServerComms } from '../Services/server-comms.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private service: ServerComms) { }

  signupForm!: any;
  pass: boolean = false;
  postObject!: User;
  passbool: boolean = false;
  allData: User[] = [];
  passchange: boolean = false;
  check: boolean = false;
  btndisable: boolean = false;
  id: any;
  show: any;

  ngOnInit(): void {
    fetch('http://localhost:5000/api/v1/user').then(x => x.json()).then(x => console.log(JSON.stringify(x))).catch(x => console.log(x))
    this.passchange = sessionStorage.getItem('data') ? true : false;
    this.btndisable = this.passchange;
    this.signupForm = new FormGroup({
      "firstName": new FormControl('', [Validators.required, this.notaNum]),
      "lastName": new FormControl('', [Validators.required]),
      "Mobile": new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]),
      "Country": new FormControl('', [Validators.required, this.notaNum]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "username": new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      "password": new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      "retypepass": new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])

    })
    this.getData();

  }

  notaNum(str: AbstractControl): any {
    let notNum = isNaN(str.value);
    if (!notNum) return { 'notnum': true };
    else return null;
  }

  vals() {
    return this.signupForm.value;
  }

  getData() {
    this.service.getUsers().subscribe(res => {
      this.allData = res;
      console.log(res, this.allData);
    })
    console.log(this.allData);
  }

  signUp() {
    if (!this.passchange) {
      if (this.signupForm != undefined && !this.signupForm.invalid) {
        if (this.vals()?.password == this.vals()?.retypepass) {
          this.passbool = false;
          console.log(this.signupForm);
          this.postObject = {
            Name: `${this.vals()?.firstName} ${this.vals()?.lastName}`,
            Email: this.vals()?.email,
            Mobile: this.vals()?.Mobile,
            Country: this.vals()?.Country,
            UserName: this.vals()?.username,
            Password: this.vals()?.password,
            ConfirmPassword: this.vals()?.retypepass
          }
          console.log(this.postObject);
          console.log(this.allData);
          let val = this.allData.find(el => el.UserName == this.postObject.UserName);
          console.log(val, 'bruhhhhhhhhhhhhhhhhhhhh');
          val = undefined
          if (val) {
            alert('Username Already Exists Please choose other one');
          }
          else {
            this.service.createAccount(this.postObject).subscribe( res => {
              console.log(JSON.stringify(res));
              console.log(JSON.stringify(this.postObject));
            }, err => {
              console.log("eerr",err);
            });
            setTimeout(() => {
              this.getData();
            }, 500)
            this.signupForm.reset();
            alert('Signup Successful Redirect to login page');
          }
        }
        else {
          console.log('pass didnt match');
          this.passbool = true;
        }
      }
      else {
        console.log('form error');
        alert('please fill out details carefully')
      }
    }
    else {

    }
  }
  checkuser() {
    this.check = true
    let usr = this.allData.find(val => {
      return val.UserName == this.vals()?.userName
    })
    console.log(usr);
    if (usr) {
      this.id = usr?.id;
      this.check = false;
      this.show = true;
      this.btndisable = false;
    }
    else alert('Username not found')
  }
  change() {
    if (this.vals()?.retypepass.length > 6 && this.vals()?.password.length > 6 && this.vals()?.password == this.vals()?.retypepass) {
      this.service.patchUser({
        Password: this.vals()?.password
      }, this.id)
        .subscribe();
      alert('Password Changed successfully');
      this.router.navigate([''])

    }
    else {
      alert('Passwords dont match');
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('data');
    this.passchange = false;
  }
}
