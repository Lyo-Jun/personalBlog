import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {ArticlePadComponent} from './article-pad/article-pad.component';
import {ArtictleCellComponent} from './article-pad/artictle-cell/artictle-cell.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {ContactMeComponent} from './contact-me/contact-me.component';
import {CategoryComponent} from './category/category.component';
import {MarkdownModule} from "ngx-markdown";

import "node_modules/prismjs/prism.js";
import "node_modules/prismjs/components/prism-typescript.min";
import "node_modules/prismjs/components/prism-csharp.min";
import "node_modules/prismjs/components/prism-c.min";
import "node_modules/prismjs/components/prism-cpp.min";




const routes: Routes = [
  {path: '', component: ArticlePadComponent},
  {path: 'articles', component: ArticlePadComponent},
  {path: 'contact-me', component: ContactMeComponent},
  {path: 'category', component: CategoryComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ArticlePadComponent,
    ArtictleCellComponent,
    ContactMeComponent,
    CategoryComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent,
  ]
})
export class AppModule {
}
