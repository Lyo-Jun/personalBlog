import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article-service.service";
import {ActivatedRoute} from "@angular/router";
import {IArticle} from "../../interfaces/iarticle";
import {combineLatestWith, map, Observable, of, tap} from "rxjs";


@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {


  article$: Observable<IArticle>;
  placeHolder: IArticle = {
    id: -1,
    name: '错误：找不到文章',
    isPublished: true,
    createdTime: new Date().toISOString(),
    lastModifiedTime: new Date().toISOString(),
    description: '错误提示',

    markdown: `## 找不到文章(*>﹏<*)
---
\`\`\`typescript
console.error('Not Found');
\`\`\`
`
  }

  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.article$ = this.route.queryParamMap.pipe(
      combineLatestWith(this.articleService.articles$),
      map(([queryMap, allArticle]) => {
        let id = Number(queryMap.get('id') ?? -1);
        if (id < 0 || isNaN(id) || !allArticle.some(a => a.id === id))
          return null;
        let collection = allArticle.filter(a => a.id === id);
        return collection[0];
      })
    )
  }

}
