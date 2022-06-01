import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, tap, take } from "rxjs";
import { ServerComms } from "./server-comms.component";
import { Router } from "@angular/router"

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate  {
    constructor( private service: ServerComms ,private router:Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.service.loggedin$.pipe(take(1),map(el => !!el),tap( str => {
            if(!str){
                alert('Redirecting to Sign in Page please sign in')
                this.router.navigate(['']);
            }
        }))
    }
}