import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {ArticleManagerComponent} from './components/article-manager/article-manager.component';
import {BaseComponent} from './components/base/base.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TagManagerComponent} from './components/tag-manager/tag-manager.component';
import {CategoryManagerComponent} from './components/category-manager/category-manager.component';
import {ArticleManagerService} from "./services/article-manager.service";
import {TagManagerService} from "./services/tag-manager.service";
import {FormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {CategoryManagerService} from "./services/category-manager.service";

const route: Routes = [
  {
    path: '', component: BaseComponent,
    children: [
      {path: 'article', component: ArticleManagerComponent, pathMatch: 'full'},
      {path: 'tag', component: TagManagerComponent, pathMatch: 'full'},
      {path: 'category', component: CategoryManagerComponent, pathMatch: 'full'}
    ]
  },

]

@NgModule({
  declarations: [
    ArticleManagerComponent,
    BaseComponent,
    TagManagerComponent,
    CategoryManagerComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(route),
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatExpansionModule,

  ],
  providers: [
    {provide: 'API_URL', useValue: 'https://localhost:7007'},
    ArticleManagerService,
    CategoryManagerService,
    TagManagerService
  ]
})
export class AdminModule {
}
