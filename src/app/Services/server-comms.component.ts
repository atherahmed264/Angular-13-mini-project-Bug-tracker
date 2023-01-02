import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, retry } from "rxjs";
import { issue } from "../Models/issues.model";

import { User } from "../Models/usermodel";
@Injectable({
    providedIn: 'root'
})
export class ServerComms {
    constructor(private http: HttpClient) { }
    baseUrl = "http://localhost:5000/api/v1";
    routes = {
        signup: "/user/signup",
        login:'/user/login',
        records:'/record/list',
    }

    loggedin$ = new BehaviorSubject<String | undefined>('');
    data!: User[];
    users: string = 'http://localhost:3000/users';
    issue: string = 'http://localhost:3000/issues'

    createAccount(body: User): Observable<any> {
        let url = this.baseUrl+this.routes.signup;
        console.log(url,body);
        return this.http.post(url, body);
    }
    loginUser(body:any){
        let url = this.baseUrl + this.routes.login;
        return this.http.post(url,body);
    }
    getUsers(): Observable<any> {
        return this.http.get(this.users);
    }
    patchUser(body: any, id: any) {
        return this.http.patch(`${this.users}/${id}`, body);
    }
    getData() {
        this.getUsers().subscribe(res => {
            this.data = res;
            console.log(this.data);
        })
    }
    addissues(body: issue): Observable<any> {
        return this.http.post(this.issue, body);
    }
    getissues(obj?:any,search?:string): Observable<any> {
        if(sessionStorage.getItem('payload')) obj = JSON.parse(sessionStorage.getItem('payload') as string); 
        let payload = 
            {
                "limit":"15",
                "page":"1",
                "searchText":search || ""
            }
        if(obj) payload = Object.assign(payload,obj);    
        let url = this.baseUrl + this.routes.records;
        console.log(payload);
        return this.http.post(url,payload);
    }
    getissuebyID(str: any): Observable<any> {
        return this.http.get(`${this.issue}/${str}`);
    }
    editissue(id: any, body: any) {
        return this.http.put(`${this.issue}/${id}`, body);
    }
    callnext(name: String) {
        this.loggedin$.next(name);
    }
    patchissue(body: any, id: number): Observable<any> {
        return this.http.patch(`${this.issue}/${id}`, body);
    }
    deleteissue(id: number) {
        return this.http.delete(`${this.issue}/${id}`);
    }
}