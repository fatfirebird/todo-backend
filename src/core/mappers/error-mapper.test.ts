import { ValidationError } from 'express-validator';
import { errorMapper } from './error-mapper';

describe('test errorMapper', () => {
  it('should map correct validation error', () => {
    expect(
      errorMapper({
        msg: 'msg',
        param: 'id',
        location: 'body',
        value: '1234',
      }),
    ).toEqual({
      message: 'msg',
      value: '1234',
      field: 'id',
    });
  });

  it('should map empty validation error', () => {
    expect(
      errorMapper({
        msg: '',
        param: '',
        location: 'params',
        value: '',
      }),
    ).toEqual({
      message: '',
      value: '',
      field: '',
    });

    expect(errorMapper({} as unknown as ValidationError)).toEqual({
      message: undefined,
      value: undefined,
      field: undefined,
    });
  });
});
