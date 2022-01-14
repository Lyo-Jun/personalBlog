import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {ArticlePadComponent} from './article-pad/article-pad.component';
import {ArtictleCellComponent} from './article-pad/artictle-cell/artictle-cell.component';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {path: '', component: ArticlePadComponent},
  {path: 'articles', component: ArticlePadComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ArticlePadComponent,
    ArtictleCellComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
