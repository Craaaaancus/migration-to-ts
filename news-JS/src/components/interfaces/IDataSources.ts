import { IDataSource } from './index';
import { DataStatus } from '../controller';

export interface IDataSources {
  status: DataStatus;
  sources: IDataSource[];
}
