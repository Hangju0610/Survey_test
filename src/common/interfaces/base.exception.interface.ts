import { GraphQLErrorExtensions } from 'graphql';

export interface IBaseException {
  message: string;
  extensions: GraphQLErrorExtensions;
}
