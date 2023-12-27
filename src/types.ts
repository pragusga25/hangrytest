import { IncomingMessage, ServerResponse } from 'http';

export type User = {
  id: string;
  name: string;
  email: string;
  dob: Date;
};

export type Req = IncomingMessage;
export type Res = ServerResponse<IncomingMessage> & {
  req: IncomingMessage;
};
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type Service = (req: Req, res: Res) => unknown;
export type Routes = {
  path: string | RegExp;
  service: Service;
  method: HTTPMethod;
}[];
export type SendResponseArg = {
  statusCode: number;
  data: object;
};
