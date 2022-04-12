import {Component, OnInit} from '@angular/core';
import {ArticleManagerService} from "../../../services/article-manager.service";
import {BehaviorSubject, combineLatestWith, filter, map, Observable, switchMap} from "rxjs";
import {IArticle} from "../../../../../interfaces/iarticle";
import {Router} from "@angular/router";
import {convertFromMaybeForwardRefExpression} from "@angular/compiler/src/render3/util";

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {
  private filter$ = new BehaviorSubject<string>('');
  private refresher$ = new BehaviorSubject(0)
  articles$: Observable<IArticle[]>;


  constructor(private articleManager: ArticleManagerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.articles$ = this.refresher$
      .pipe(
        combineLatestWith(this.filter$),
        switchMap(([_, content]) => this.articleManager
          .getAll()
          .pipe(
            map(articles => {
              return articles.filter(a => a.name.toUpperCase()
                .includes(content))
            })
          ))
      )

  }

  research(event: any): void {
    this.filter$.next(event.target.value);

  }

  checkAnArticle(id: number): void {
    const urlTree = this.router
      .createUrlTree(['/article-detail']);

    urlTree.queryParams = {
      id: id
    };

    let address = this.router.serializeUrl(urlTree);
    window.open(address);

  }

  deleteAnArticle(id: number, name: string) {
    let confirmDelete = confirm('你确定要删除文章\n' + name + '吗？')
    if (confirmDelete)
      this.articleManager.deleteOne(id).subscribe(() => {
        this.refresher$.next(1)
      })
  }

}
