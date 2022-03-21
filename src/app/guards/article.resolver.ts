import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {IArticle} from "../interfaces/iarticle";
import {ArticleService} from "../services/article-service.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver implements Resolve<IArticle> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticle> {
    let id = Number(route.queryParams['id']);
    return this.articleService
      .articles$
      .pipe(
        map(articles => {
          for (let x of articles) {
            if (x.id === id)
              return x;
          }
          return null;
        })
      );

  }

  constructor(private articleService: ArticleService) {
  }

}
