import Options from './Options';
import Endpoints from './Endpoints';

type Responce = {
  endpoint: Endpoints;
  options?: Partial<Options>;
};

export default Responce;
