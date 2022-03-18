import {Component, Inject, Input, OnInit} from '@angular/core';
import {IArticle} from "../../interfaces/iarticle";
import {Router} from "@angular/router";

@Component({
  selector: 'app-artictle-cell',
  templateUrl: './artictle-cell.component.html',
  styleUrls: ['./artictle-cell.component.scss']
})
export class ArtictleCellComponent implements OnInit {
  @Input() article: IArticle


  constructor(public router: Router,
              @Inject('APIURL') apiurl: string) {
  }

  ngOnInit(): void {
  }

  navigateToDetail(): void {
    console.log(this.article)
    this.router.navigate(
      ['article-detail']
      , {
        queryParams: {
          id: this.article.id
        }
      }
    );

  }

}

