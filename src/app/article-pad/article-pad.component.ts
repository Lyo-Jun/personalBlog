import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../services/article-service.service";
import {IArticle} from "../interfaces/iarticle";
import {map, Observable, pipe, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article-pad',
  templateUrl: './article-pad.component.html',
  styleUrls: ['./article-pad.component.scss']
})
export class ArticlePadComponent implements OnInit {
  articles: Observable<IArticle[]>

  constructor(public articleService: ArticleService,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.articles = this.activatedRoute.queryParamMap
      .pipe(
        switchMap(o => {
          let searchContent = o.get('search') ?? ''
          return this.articleService.articles$.pipe(
            map(o => o.filter(x => x.title.includes(searchContent)))
          )
        })
      )
  }

}
