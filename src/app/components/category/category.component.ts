import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArticleService} from "../../services/article-service.service";
import {BehaviorSubject, combineLatestWith, map, Observable} from "rxjs";
import {ICategory} from "../../interfaces/icategory";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  cats$: Observable<ICategory[]>;
  filter$: BehaviorSubject<string> = new BehaviorSubject('');

  @ViewChild('input', {static: true})
  input: ElementRef;


  constructor(private articleService: ArticleService,
              private router: Router) {
  }

  ngOnInit(): void {
    const allCats$ = this.articleService
      .getAllCategoriesWithArticles();

    this.cats$ = this.filter$
      .pipe(
        combineLatestWith(allCats$),
        map(([filter, cats]) => {
          return cats.filter(c => c.name.toUpperCase()
            .includes(filter.toUpperCase())
          );
        })
      );

  }

  openDetailPage(id: number): void {
    const url = this.router.createUrlTree(['/category-detail']);
    url.queryParams = {id};
    window.open(this.router.serializeUrl(url));
  }

  filter(): void {
    const value: string = this.input.nativeElement.value;
    this.filter$.next(value);
  }


}
