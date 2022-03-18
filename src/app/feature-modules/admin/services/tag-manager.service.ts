import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminModule} from "../admin.module";
import {Observable} from "rxjs";
import {ITag} from "../../../interfaces/Itag";
import {IArticle} from "../../../interfaces/iarticle";

@Injectable()
export class TagManagerService {

  constructor(private http: HttpClient,
              @Inject('API_URL') private apiUrl: string
  ) {
  }

  getAll(): Observable<ITag[]> {
    return this.http
      .get<ITag[]>(this.apiUrl + '/tag');
  }

  getOne(id: number): Observable<ITag> {
    return this.http
      .get<ITag>(this.apiUrl + `/tag/${id}`);
  }

  getArticlesWithATag(id: number): Observable<IArticle[]> {
    return this.http
      .get<IArticle[]>(this.apiUrl + `/tag/${id}/articles`);
  }

  deleteOne(id: number): Observable<any> {
    return this.http
      .delete<any>(this.apiUrl + `/tag/${id}`);
  }

  AddOne(name: string) :Observable<any> {
    return this.http.post<any>(this.apiUrl + '/tag', null, {
      params: {
        name: name
      }
    });
  }


}
