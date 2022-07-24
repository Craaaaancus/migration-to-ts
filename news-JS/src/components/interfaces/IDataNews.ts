import { IDataArticle } from './index';
import { DataStatus } from '../controller';

export interface IDataNews {
  status: DataStatus;
  totalResults: number;
  articles: IDataArticle[];
}
