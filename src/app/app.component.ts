import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: [string,string][] = [['文章','articles'], ['分类','category'], ['与我联系','contact-me']]
  searchContent: string

  constructor(public router: Router) {
  }

  search(): void {
    console.log('haha')
    this.router.navigate(
      ['articles'],
      {
        queryParams: {
          search: this.searchContent
        }
      })


  }
}
