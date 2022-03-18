import {Inject, Injectable} from '@angular/core';
import {Observable, shareReplay} from "rxjs";
import {IArticle} from "../interfaces/iarticle";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles$: Observable<IArticle[]> = this.http.get<IArticle[]>(this.apiurl + '/faker/a')
    .pipe(
      shareReplay()
    );

  constructor(private http: HttpClient,
              @Inject('API_URL') private apiurl: string) {


  }

}
