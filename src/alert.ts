import {Failure, Result, Success} from './result';

export async function createAlert(): Promise<Result<string>> {
  return Promise.resolve(new Failure(new Error('Not implemented')));
}

