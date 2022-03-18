import {Inject, Injectable} from '@angular/core';
import {AdminModule} from "../admin.module";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IArticle} from "../../../interfaces/iarticle";
import {ITag} from "../../../interfaces/Itag";
import {ICategory} from "../../../interfaces/icategory";

@Injectable({providedIn: AdminModule})
export class ArticleManagerService {

  constructor(private http: HttpClient,
              @Inject('API_URL') private apiUrl: string) {
  }

  getAll(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this.apiUrl + '/article');
  }

  getOne(id: number): Observable<IArticle> {
    return this.http.get<IArticle>(this.apiUrl + '/article/' + id);
  }

  getTagsOfOne(id: number): Observable<ITag[]> {
    return this.http.get<ITag[]>(this.apiUrl + '/article/' + id + '/tags');
  }

  getCategoryOfOne(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(this.apiUrl + '/article/' + id + '/category');
  }

  deleteOne(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/article/' + id);
  }

  updateOne(article: IArticle, catId: number = -1, tagIds: number[] = undefined) {
    if (Array.isArray(tagIds)) {
      let params = new HttpParams({
        fromObject: {
          tags: tagIds
        }
      });
      if (catId > 0) {
        params = params.set('catId', catId);
      }
      return this.http.put<IArticle>(this.apiUrl + '/article/' + article.id,
        article, {params});
    }

    let param = new HttpParams();
    if (catId > 0) {
      param = param.set('catId', catId);
    }
    return this.http.put<IArticle>(this.apiUrl + '/article/' + article.id,
      article, {params: param});


  }

  createOne(article: IArticle, catId: number = -1, tagIds: number[] = undefined) {
    let params = new HttpParams();

    if (Array.isArray(tagIds)) {
      params = new HttpParams({
        fromObject: {
          tags: tagIds
        }
      });
    }

    if (catId > 0)
      params = params.set('catId', catId);
    return this.http.post<IArticle>(this.apiUrl + '/article',
      article, {params});
  }

}
