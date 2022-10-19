import {Command, program} from 'commander';
import * as  packageJson from '../package.json';

program.name('cli-template')
.description('Command line template for typescript node')
.version(packageJson.version);

const helloWorldCommand = new Command('hello-world').action(() => {
    console.log('hello world');
});

program.addCommand(helloWorldCommand);

program.parse();