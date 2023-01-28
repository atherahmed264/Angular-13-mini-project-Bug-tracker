import { HttpClient } from "@angular/common/http";
import { utf8Encode } from "@angular/compiler/src/util";
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
        createRecord:"/record",
        getRecordDetails:'/record/details',
        savedetails:'/record/edit',
        advancelookupUser:'/user/advancelookup',
        addcomment:'/comment', // post method to add patch method to edit delete method to delete
        addreply:'/comment',
    };

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
    getissues(obj:any,search:string|undefined): Observable<any> {
        console.log(obj);
        if(typeof obj === 'string') obj = JSON.parse(obj);
        let payload = 
            {
                "limit":"15",
                "page":"1",
                "searchText":search || ""
            }
        if(obj) payload = Object.assign(payload,obj);    
        let url = this.baseUrl + this.routes.records;
        console.log({payload});
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
    createRec(body:any){
        let url = this.baseUrl + this.routes.createRecord;
        return this.http.post(url,body);
    }
    getRecordDetails(body:{id:string}){
        let url = this.baseUrl + this.routes.getRecordDetails;
        return this.http.post(url,body);
    }
    saveRecordDetails(body:any){
        let url = this.baseUrl + this.routes.savedetails;
        return this.http.post(url,body);
    }

    userLookup(page:number,searchText:string="",limit:number=5){
        let body = { page, searchText, limit };
        let url = this.baseUrl + this.routes.advancelookupUser;
        return this.http.post(url,body);
    } 

    addCommentOrReply(type:string,recordId:string,userId:string,text:string){
        let body = {
            "Issue":recordId,
            "UserId":userId,
            "Type":type,
            "Comment":text
        }
        let url = this.baseUrl + this.routes.addcomment;
        return this.http.post(url,body)
    }
}

export const UserHeaders = [
    {
        name:"Name",
        attr:"Name"
    },
    {
        name:"User Name",
        attr:"UserName"
    },
    {
        name:"Email",
        attr:"Email"
    },
]

// [
//     {
//       name:"Record Number",
//       attr:"recordNum"
//     },
//     {
//       name:"Record Type",
//       attr:"recordType"
//     },
//     {
//       name:"Record Status",
//       attr:"recordStatus"
//     },
//     {
//       name:"Record Owner",
//       attr:"recordOwn"
//     },
//   ];