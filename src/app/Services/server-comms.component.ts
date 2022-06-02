import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,BehaviorSubject, retry } from "rxjs";
import { issue } from "../Models/issues.model";

import { User } from "../Models/usermodel";
@Injectable({
    providedIn:'root'
})
export class ServerComms {
    constructor(private http:HttpClient) {}

    loggedin$ = new BehaviorSubject<String|undefined>('');
    data!:User[];
    users:string = 'http://localhost:3000/users';
    issue:string = 'http://localhost:3000/issues' 

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
    addissues(body:issue): Observable<any>{
        return this.http.post(this.issue,body);
    }
    getissues() : Observable<any>{
        return this.http.get(this.issue);
    }
    getissuebyID(str:any) : Observable<any>{
        return this.http.get(`${this.issue}/${str}`);
    }
    editissue(id:any,body:any){
        return this.http.put(`${this.issue}/${id}`,body);
    }
    callnext(name:String){
        this.loggedin$.next(name);
    }
    patchissue(body:any,id:number):Observable<any>{
        return this.http.patch(`${this.issue}/${id}`,body);
    }
    deleteissue(id:number){
        return this.http.delete(`${this.issue}/${id}`);
    }
}