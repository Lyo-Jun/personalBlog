import {Component, OnInit} from '@angular/core';
import {CategoryManagerService} from "../../services/category-manager.service";
import {BehaviorSubject, combineLatestWith, map, Observable, Subject, switchMap} from "rxjs";
import {ICategory} from "../../../../interfaces/icategory";
import {IArticle} from "../../../../interfaces/iarticle";
import {Router} from "@angular/router";
import {ArticleManagerService} from "../../services/article-manager.service";

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent implements OnInit {


  private refresher$: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  private filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  categories$: Observable<ICategory[]>;
  selected$: Subject<number> = new Subject<number>();
  articles$: Observable<IArticle[]>;

  newTitle: string = '';
  newDescription: string = '';


  constructor(private categoryManager: CategoryManagerService,
              private router: Router,
              private articleManager: ArticleManagerService) {
  }

  refresh(): void {
    this.refresher$.next(0);
  }

  ngOnInit(): void {
    this.categories$ = this.refresher$
      .pipe(
        combineLatestWith(this.filter$),
        switchMap(([_, searchString]) => this.categoryManager.getAll()
          .pipe(
            map(all => all.filter(cat => {
              const searchString_upper = searchString.toUpperCase();
              return cat.name
                .toUpperCase()
                .includes(searchString_upper);
            })))
        )
      )


    this.articles$ = this.selected$
      .pipe(
        switchMap(id => this.categoryManager
          .getArticlesOfACategory(id))
      );

  }

  select(id: number): void {
    this.selected$.next(id);
  }

  deleteOne(id: number, name: string): void {
    let confirmDelete = confirm('你确定要删除文章集合\n' +
      name + '\n吗？\n' + '这会同时删除里面的文章'
    );
    if (!confirmDelete) return;
    this.categoryManager.deleteOne(id)
      .subscribe(()=>this.refresh());

  }

  createANewCategory(): void {
    this.newTitle = this.newTitle.trim();
    this.newDescription = this.newDescription.trim();
    if (this.newTitle === '' || this.newDescription === '') {
      alert('输入不合法');
      this.newTitle = '';
      this.newDescription = '';
      return;
    }
    let confirmCreate = confirm('你确定要新建文章集合\n' + this.newTitle + '\n吗？');
    if (!confirmCreate)
      return;

    this.categoryManager.createOne({
      name: this.newTitle,
      description: this.newDescription,
      id: 0
    }).subscribe(()=>this.refresh());


  }


  checkArticle(id: number): void {
    const urlTree = this.router
      .createUrlTree(['/article-detail']);

    urlTree.queryParams = {
      id: id
    };

    let address = this.router.serializeUrl(urlTree);
    window.open(address);

  }


  deleteAnArticle(id: number, name: string): void {
    let confirmDelete = confirm('你真的要删除文章'
      + '\n' + name + '\n吗？');
    if (!confirmDelete)
      return;
    this.articleManager
      .deleteOne(id)
      .subscribe(()=>this.refresh());

  }
  search(event:any):void{
    this.filter$.next(event.target.value);
  }

}
