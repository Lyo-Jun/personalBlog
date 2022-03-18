import {Inject, Injectable} from '@angular/core';
import {Observable, shareReplay, tap} from "rxjs";
import {IArticle} from "../interfaces/iarticle";
import {HttpClient, HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles$: Observable<IArticle[]> = this.http
    .get<IArticle[]>(this.apiurl + '/article/full-detail')
    .pipe(
      shareReplay(),
      tap(x=>console.log(x))
    );

  constructor(private http: HttpClient,
              @Inject('API_URL') private apiurl: string) {


  }

}
