export interface IBaseException {
  errorCode: string;
  timestamp: string;
  message: string;
  statusCode: number;
  path: string;
}
