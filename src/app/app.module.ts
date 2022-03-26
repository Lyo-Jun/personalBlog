import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {ArticlePadComponent} from './components/article-pad/article-pad.component';
import {ArtictleCellComponent} from './components/artictle-cell/artictle-cell.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {ContactMeComponent} from './components/contact-me/contact-me.component';
import {ArticleContentComponent} from './components/article-content/article-content.component';
import {MarkdownModule} from "ngx-markdown";

import "node_modules/prismjs/prism.js";
import "node_modules/prismjs/components/prism-typescript.min";
import "node_modules/prismjs/components/prism-csharp.min";
import "node_modules/prismjs/components/prism-c.min";
import "node_modules/prismjs/components/prism-cpp.min";
import "node_modules/prismjs/components/prism-swift.min";
import "node_modules/prismjs/components/prism-java.min";
import "node_modules/prismjs/components/prism-dart.min";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {OverlayModule} from "@angular/cdk/overlay";
import {AdminGuard} from "./guards/admin.guard";
import {CategoryComponent} from './components/category/category.component';
import {CategoryDetailComponent} from './components/category-detail/category-detail.component';
import {ArticleResolver} from "./guards/article.resolver";
import {ArticlesResolver} from "./guards/articles.resolver";
import {GotoContactMeGuard} from "./guards/goto-contact-me.guard";

const routes: Routes = [
  {path: '', redirectTo: 'articles',pathMatch:'full'},
  {
    path: 'articles', component: ArticlePadComponent,
    resolve: {
      articles: ArticlesResolver
    }
  },
  {
    path: 'article-detail', component: ArticleContentComponent,
    resolve: {
      article: ArticleResolver
    }
  },
  {
    path: 'contact-me', canActivate: [GotoContactMeGuard]
    , component: ContactMeComponent
  },
  {path: 'category', component: CategoryComponent},
  {
    path: 'admin', canActivate: [AdminGuard],
    loadChildren: () => import('./feature-modules/admin/admin.module').then(m => m.AdminModule)
  },
  {path: 'category-detail', component: CategoryDetailComponent}

]


@NgModule({
  declarations: [
    AppComponent,
    ArticlePadComponent,
    ArtictleCellComponent,
    ContactMeComponent,
    ArticleContentComponent,
    CategoryComponent,
    CategoryDetailComponent,
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
    {provide: 'API_URL', useValue: 'https://localhost:7007'}
  ],
  bootstrap: [AppComponent,
  ]
})
export class AppModule {
}
