import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IArticle} from "../interfaces/iarticle";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private uri: string = 'https://localhost:7159/api/articles'
  articles$: Observable<IArticle[]> = this.http.get<IArticle[]>(this.uri)

  constructor(public http: HttpClient) {
  }

}
