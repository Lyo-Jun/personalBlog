import {Component, OnInit} from '@angular/core';
import {ListArticleComponent} from "../article-operation-helpers/list-article/list-article.component";
import {AddArticleComponent} from "../article-operation-helpers/add-article/add-article.component";

@Component({
  selector: 'app-article-manager',
  templateUrl: './article-manager.component.html',
  styleUrls: ['./article-manager.component.scss']
})
export class ArticleManagerComponent implements OnInit {
  dynamicComponent: any;


  constructor() {
  }

  ngOnInit(): void {
    this.dynamicComponent = ListArticleComponent;
  }

  changeComponent(id: number): void {
    if (id === 1)
      this.dynamicComponent = ListArticleComponent;
    else if (id === 2)
      this.dynamicComponent = AddArticleComponent;

  }

}
