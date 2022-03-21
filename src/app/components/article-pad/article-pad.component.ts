import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article-service.service";
import {IArticle} from "../../interfaces/iarticle";
import {BehaviorSubject, map, Observable, switchMap, tap} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ICategory} from "../../interfaces/icategory";
import arrayShuffle from "array-shuffle";

@Component({
  selector: 'app-article-content-pad',
  templateUrl: './article-pad.component.html',
  styleUrls: ['./article-pad.component.scss']
})
export class ArticlePadComponent implements OnInit {
  articles: Observable<IArticle[]>;
  currentPage: number;
  itemsPerPage: number = 10;
  allCategories$: Observable<ICategory[]>;
  refresher$: BehaviorSubject<any> = new BehaviorSubject(0);

  constructor(private articleService:ArticleService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const all$ = this.activatedRoute.data
      .pipe(
        map(data => data?.['articles'])
      );


    this.articles = this.activatedRoute.queryParamMap
      .pipe(
        switchMap((o) => {
          let searchContent = o.get('search') ?? ''
          return all$
            .pipe(
              map(arts => arts.filter(a => {
                return a.name.includes(searchContent)
                  || a.tags.some(t => t.name.includes(searchContent))
                  || a.category.name.includes(searchContent);
              })),
              map(
                arts => arts.sort((a, b) => {
                  return new Date(b.lastModifiedTime).getTime()
                    - new Date(a.lastModifiedTime).getTime();
                })
              )
            )
        }),
        tap(() => this.currentPage = 1)
      );


    this.allCategories$ = this.refresher$
      .pipe(switchMap(_ => this.articleService
          .getAllCategories()
        ),
        map(cats => arrayShuffle(cats))
      );

  }

  refreshCats(): void {
    this.refresher$.next(0);
  }


}
