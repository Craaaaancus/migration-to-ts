import IDataSource from './IDataSource';

interface IDataSources {
  status: 'ok' | 'error';
  sources: Array<IDataSource>;
}

export default IDataSources;
