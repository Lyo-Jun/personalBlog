import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {ArticlePadComponent} from './article-pad/article-pad.component';
import {ArtictleCellComponent} from './article-pad/artictle-cell/artictle-cell.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {ContactMeComponent} from './contact-me/contact-me.component';
import {ArticleContentComponent} from './article-content/article-content.component';
import {MarkdownModule} from "ngx-markdown";

import "node_modules/prismjs/prism.js";
import "node_modules/prismjs/components/prism-typescript.min";
import "node_modules/prismjs/components/prism-csharp.min";
import "node_modules/prismjs/components/prism-c.min";
import "node_modules/prismjs/components/prism-cpp.min";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {OverlayModule} from "@angular/cdk/overlay";

const routes: Routes = [
  {path: '', component: ArticlePadComponent},
  {
    path: 'articles', component: ArticlePadComponent,
  },
  {path: 'article-detail', component: ArticleContentComponent},
  {path: 'contact-me', component: ContactMeComponent},
  {path: 'category', component: ArticleContentComponent},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
]


@NgModule({
  declarations: [
    AppComponent,
    ArticlePadComponent,
    ArtictleCellComponent,
    ContactMeComponent,
    ArticleContentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    OverlayModule
  ],
  providers: [
    {provide: 'APIURL', useValue: 'https://localhost:7035'}
  ],
  bootstrap: [AppComponent,
  ]
})
export class AppModule {
}
