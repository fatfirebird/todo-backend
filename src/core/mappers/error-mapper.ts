import { ValidationError } from 'express-validator';
import { HttpError } from '../error';

export const errorMapper = ({ msg, param, value }: ValidationError): HttpError => {
  return {
    value,
    message: msg,
    field: param,
  };
};
