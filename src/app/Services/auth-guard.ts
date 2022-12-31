import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, tap, take } from "rxjs";
import { ServerComms } from "./server-comms.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router"

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate  {
    constructor( private service: ServerComms ,private router:Router,private snackBar:MatSnackBar) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.service.loggedin$.pipe(take(1),map(el => !!el),tap( str => {
            if(!str){
                this.snackBar.open('Redirecting to Sign in Page please sign in','',{ duration:3000});
                setTimeout(() => this.router.navigate(['']) ,2000);
                
            }
        }))
    }
}