import {Component, Input, OnInit} from '@angular/core';
import {IArticle} from "../../interfaces/iarticle";

@Component({
  selector: 'app-artictle-cell',
  templateUrl: './artictle-cell.component.html',
  styleUrls: ['./artictle-cell.component.scss']
})
export class ArtictleCellComponent implements OnInit {
  @Input() article: IArticle


  constructor() {
  }

  ngOnInit(): void {


  }

}

