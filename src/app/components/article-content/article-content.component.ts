import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IArticle} from "../../interfaces/iarticle";
import {BehaviorSubject, combineLatestWith, map, Observable, of, switchMap, tap} from "rxjs";
import arrayShuffle from "array-shuffle";


@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {

  private refresher$ = new BehaviorSubject(0);
  article$: Observable<IArticle>;
  articlesInTheSameCat$: Observable<IArticle[]>;
  isShow: boolean;
  topPosToStartShowing: number = 250;

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

  constructor(private articleService: ArticleService
    , private route: ActivatedRoute
    , private router: Router) {
  }

  ngOnInit(): void {
    // this.article$ = this.route.queryParamMap.pipe(
    //   combineLatestWith(this.articleService.articles$),
    //   map(([queryMap, allArticle]) => {
    //     let id = Number(queryMap.get('id') ?? -1);
    //     if (id < 0 || isNaN(id) || !allArticle.some(a => a.id === id))
    //       return null;
    //     let collection = allArticle.filter(a => a.id === id);
    //     return collection[0];
    //   })
    // );
    this.article$ = this.route.data
      .pipe(
        map(data => data?.['article'])
      );

    this.articlesInTheSameCat$ = this.refresher$
      .pipe(
        combineLatestWith(this.article$, this.articleService.articles$)
        ,
        map(([_, article, all]) => {
          return all.filter(a => a.id !== article.id && a.category.id ===
            article.category.id);
        })
        ,
        map(array => {
          let shuffled = arrayShuffle(array);
          if (shuffled.length === 0)
            return null;
          return shuffled.slice(0, 5);
        })
      );


  }

  @HostListener('window:scroll')
  checkScroll() {

    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;


    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  checkAddedArticle(id: number): void {
    const urlTree = this.router
      .createUrlTree(['/article-detail']);

    urlTree.queryParams = {id};
    let address = this.router.serializeUrl(urlTree);
    window.open(address);
  }

  refresh(): void {
    this.refresher$.next(0);
  }

  openCat(id: number): void {
    const urlTree = this.router
      .createUrlTree(['/category-detail']);
    urlTree.queryParams = {id};
    let address=this.router.serializeUrl(urlTree);
    window.open(address);

  }

}
