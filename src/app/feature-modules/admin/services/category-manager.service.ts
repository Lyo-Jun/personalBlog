import {Inject, Injectable} from '@angular/core';
import {AdminModule} from "../admin.module";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICategory} from "../../../interfaces/icategory";
import {IArticle} from "../../../interfaces/iarticle";


@Injectable()
export class CategoryManagerService {

  constructor(private http: HttpClient,
              @Inject('API_URL') private apiUrl: string) {
  }

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl + '/category');
  }

  getOne(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(this.apiUrl + `/category/${id}`);
  }

  getArticlesOfACategory(id: number): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this.apiUrl + `/category/${id}/articles`);
  }

  deleteOne(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/category/${id}`);
  }

  createOne(objectToPost: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.apiUrl + '/category', objectToPost);
  }

  updateOne(cat: ICategory, articleIds: number[] = undefined): Observable<ICategory> {
    if (!Array.isArray(articleIds)) {
      const params = new HttpParams({
        fromObject: {
          articles: articleIds
        }
      })
      return this.http.put<ICategory>(this.apiUrl + `/category/${cat.id}`
        , cat, {params});
    } else return this.http.put<ICategory>(this.apiUrl + `/category/${cat.id}`
      , cat);
  }

}
