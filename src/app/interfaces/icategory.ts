import {IArticle} from "./iarticle";

export interface ICategory {
  id: number;
  name: string;
  description: string;
  articles: IArticle[]
}
