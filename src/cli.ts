import {Command, program} from 'commander';
import * as  packageJson from '../package.json';
import {createAlert} from './alert';
import {Result} from './result';
import chalk from 'chalk';

program.name('cli-template')
.description('Command line template for typescript node')
.version(packageJson.version);

const printResult = Result.match(
  success => console.log(chalk.green(success)),
  failure => console.log(chalk.red(failure.message))
);

const logResults = (
  fn: (...args: unknown[]) => Result<unknown> | Promise<Result<unknown>>
) => async (...args: unknown[]): Promise<void> => {
  const result = await fn(...args);
  printResult(result);
};

const createAlertCommand = new Command('create').action(logResults(createAlert));

const alertsCommand = new Command('alert').addCommand(createAlertCommand);

program.addCommand(alertsCommand);

program.parse();
