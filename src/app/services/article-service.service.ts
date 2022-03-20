import {Inject, Injectable} from '@angular/core';
import {Observable, shareReplay, tap} from "rxjs";
import {IArticle} from "../interfaces/iarticle";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ICategory} from "../interfaces/icategory";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles$: Observable<IArticle[]> = this.http
    .get<IArticle[]>(this.apiurl + '/article/full-detail')
    .pipe(
      shareReplay(),
      tap(x => console.log(x))
    );

  constructor(private http: HttpClient,
              @Inject('API_URL') private apiurl: string) {
  }

  getArticlesOfACategory(id: number): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this.apiurl + '/category/'
      + id + '/articles');
  }

  getCategoryOfAnArticle(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(this.apiurl + '/article/'
      + id + '/category');
  }


}
