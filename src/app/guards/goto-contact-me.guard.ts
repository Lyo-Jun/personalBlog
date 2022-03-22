import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {lastValueFrom, Observable} from 'rxjs';
import {ArticleService} from "../services/article-service.service";
import {ICategory} from "../interfaces/icategory";

@Injectable({
  providedIn: 'root'
})
export class GotoContactMeGuard implements CanActivate {

  constructor(private router: Router,
              private articleService: ArticleService) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<false> {

    const cats$ = this.articleService.getAllCategories();
    const cats = await lastValueFrom(cats$);
    let contactMe = null;

    for (let cat of cats) {
      if (cat.name === '联系我')
        contactMe = cat;
    }

    if(!contactMe) {
      await this.router.navigate(['/']);
    }

    await this.router.navigate(['/category-detail'],{
      queryParams:{
        id:contactMe.id
      }
    });

    return false;
  }

}
