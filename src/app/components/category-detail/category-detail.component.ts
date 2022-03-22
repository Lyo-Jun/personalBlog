import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {combineLatestWith, map, Observable, switchMap} from "rxjs";
import {ICategory} from "../../interfaces/icategory";
import {ArticleService} from "../../services/article-service.service";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  cat$: Observable<ICategory>;


  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cat$ = this.activatedRoute.queryParamMap
      .pipe(
        map(m => Number(m.get('id'))),
        combineLatestWith(this.articleService.getAllCategoriesWithArticles()),
        map(([id, cats]) => {
          for (let cat of cats) {
            if (id === cat.id)
              return cat;
          }
          return null;
        })
      );


  }

  openArticle(id: number): void {
    const url=this.router.createUrlTree(['/article-detail']);
    url.queryParams={id};
    window.open(this.router.serializeUrl(url));
    // this.router.navigate(['/article-detail'], {
    //   queryParams: {id}
    // });

  }


}
