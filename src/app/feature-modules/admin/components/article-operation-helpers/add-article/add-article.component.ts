import {Component, OnInit} from '@angular/core';
import {IArticle} from "../../../../../interfaces/iarticle";
import {ArticleManagerService} from "../../../services/article-manager.service";
import {CategoryManagerService} from "../../../services/category-manager.service";
import {map, Observable} from "rxjs";
import {ICategory} from "../../../../../interfaces/icategory";
import {TagManagerService} from "../../../services/tag-manager.service";
import {ITag} from "../../../../../interfaces/Itag";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  articleToPost: IArticle = {
    id: 0,
    name: '',
    description: '',
    markdown: ''
  };
  catId: number = 0;

  categories$: Observable<ICategory[]>;

  seletedTags = [];
  dropdownList$: Observable<{ id: number; name: string }[]>;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    allowSearchFilter: true
  };


  constructor(private articleManager: ArticleManagerService,
              private categoryManager: CategoryManagerService,
              private tagManager: TagManagerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryManager
      .getAll();
    this.dropdownList$ = this.tagManager
      .getAll()
      .pipe(
        map((tags: ITag[]) => {
          return tags.map(({id, name}) => ({id, name}))
        })
      );
  }

  reset(): void {
    this.articleToPost = {
      id: 0,
      name: '',
      description: '',
      markdown: ''
    };
    this.catId = 0;
    this.seletedTags = [];
  }


  createOne(): void {
    this.articleToPost.isPublished = confirm('公开吗');
    let ids = this.seletedTags.map(t => t.id);

    this.articleManager
      .createOne(this.articleToPost, this.catId,
        ids.length > 0 ? ids : undefined
      ).subscribe(article => {
      this.checkAddedArticle(article.id);
    });
    this.reset();

  }

  checkAddedArticle(id: number): void {
    const urlTree = this.router
      .createUrlTree(['/article-detail']);

    urlTree.queryParams = {
      id: id
    };

    let address = this.router.serializeUrl(urlTree);
    window.open(address);
  }


}
