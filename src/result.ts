export type Result<T> = Success<T> | Failure;

export const Result = {

  fromUndefined<T>(value: T | undefined): Result<T> {
    return (value === undefined || value === null) ?
      new Failure(new UndefinedValueError()) :
      new Success(value);
  },

  match<T, N>(onSuccess: (s: T) => N, onFailure: (f: Error) => N): (result: Result<T>) => N {
    return (result: Result<T>) => {
      if (result.isSuccess()) {
        return onSuccess(result.value);
      }
      return onFailure(result.error);
    };
  },

  map<T, N>(fn: (s:T) => N): (result: Result<T>) => Result<N> {
    return (result: Result<T>) => {
      if (result.isSuccess()) {
        return new Success(fn(result.value));
      }
      return result;
    };
  }
};

export class UndefinedValueError extends Error {

  name = 'UndefinedValueError';

  constructor() {
    super('Value is undefined');
  }
}

export class Success<T> {

  constructor(public readonly value: T) {}

  isSuccess(): this is Success<T> {
    return true;
  }
  isFailure(): this is Failure {
    return false;
  }
}

export class Failure {

  constructor(public readonly error: Error) {}

  isSuccess(): this is Success<unknown> {
    return false;
  }
  isFailure(): this is Failure {
    return true;
  }

}
