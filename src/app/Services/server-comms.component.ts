import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,BehaviorSubject } from "rxjs";

import { User } from "../Models/usermodel";
@Injectable({
    providedIn:'root'
})
export class ServerComms {
    constructor(private http:HttpClient) {}

    loggedin$ = new BehaviorSubject<String|undefined>('');
    data!:User[];
    users:string = 'http://localhost:3000/users' 

    createAccount(body:User):Observable<any>{
        return this.http.post(this.users, body);
    }
    getUsers():Observable<any>{
        return this.http.get(this.users);
    }
    getData(){
        this.getUsers().subscribe(res=>{
            this.data = res;
            console.log(this.data);
        })
    }
}