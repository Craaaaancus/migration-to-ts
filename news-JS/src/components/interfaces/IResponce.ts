import { Options, Endpoints } from '../controller';

export interface IResponce {
  endpoint: Endpoints;
  options?: Partial<Options>;
}
