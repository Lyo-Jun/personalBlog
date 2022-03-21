import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {IArticle} from "../interfaces/iarticle";
import {ArticleService} from "../services/article-service.service";

@Injectable({
  providedIn: 'root'
})
export class ArticlesResolver implements Resolve<IArticle[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticle[]> {
    return this.articleService.articles$;
  }

  constructor(private articleService: ArticleService) {
  }
}
