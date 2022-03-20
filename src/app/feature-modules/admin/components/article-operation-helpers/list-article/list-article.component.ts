import {Component, OnInit} from '@angular/core';
import {ArticleManagerService} from "../../../services/article-manager.service";
import {BehaviorSubject, combineLatestWith, filter, map, Observable} from "rxjs";
import {IArticle} from "../../../../../interfaces/iarticle";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {
  refresher: BehaviorSubject<string> = new BehaviorSubject('');

  articles$: Observable<IArticle[]>;


  constructor(private articleManager: ArticleManagerService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.articles$ = this.refresher
      .pipe(
        combineLatestWith(this.articleManager.getAll()),
        map(([searchString, articles]) => {
          return articles
            .filter(a => a.name
              .toUpperCase().includes(
                searchString.toUpperCase()));
        })
      );
  }

  research(event: any): void {
    this.refresher.next(event.target.value);
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

}
