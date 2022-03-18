import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article-service.service";
import {IArticle} from "../../interfaces/iarticle";
import {map, Observable, switchMap, tap} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-article-content-pad',
  templateUrl: './article-pad.component.html',
  styleUrls: ['./article-pad.component.scss']
})
export class ArticlePadComponent implements OnInit {
  articles: Observable<IArticle[]>
  currentPage: number
  itemsPerPage: number = 5

  constructor(public articleService: ArticleService,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.articles = this.activatedRoute.queryParamMap
      .pipe(
        switchMap((o) => {
          let searchContent = o.get('search') ?? ''
          return this.articleService.articles$;
        }),
        tap(() => this.currentPage = 1)
      )
  }


}
