import {Injectable} from '@angular/core';
import {Observable, shareReplay} from "rxjs";
import {IArticle} from "../interfaces/iarticle";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private uri: string = 'https://localhost:7159/api/articles'
  articles$: Observable<IArticle[]> = this.http.get<IArticle[]>(this.uri)
    .pipe(
      shareReplay()
    )

  constructor(public http: HttpClient) {
  }

}
