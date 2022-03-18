import {ICategory} from "./icategory";
import {ITag} from "./Itag";

export interface IArticle {
  id?: number;
  name?: string;
  markdown?: string;
  isPublished?: boolean;
  createdTime?: string;
  lastModifiedTime?: string;
  description?: string;
  tags?: ITag[];
  category?: ICategory
}
