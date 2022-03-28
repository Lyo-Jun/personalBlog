import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {lastValueFrom, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {sha256} from "js-sha256";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router,
              @Inject('API_URL') private baseUrl) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Promise<true | UrlTree> {
    const password = prompt('请输入密码');
    const encrypted = sha256(password);


    const request$ = this.http.get<boolean>(this.baseUrl + '/auth', {
      params: {password: encrypted}
    });
    // const result = await lastValueFrom(request$);
    // if (result)
    //   return true;
    // return this.router.createUrlTree(['/']);
    return lastValueFrom(request$)
      .then(isCorrect => {
        return isCorrect ? true : this.router.createUrlTree(['/']);
      })
  }


}
