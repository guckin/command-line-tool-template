import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

function bundleScript(input, output) {
    return {
        input,
        output: {
            file: output,
            sourcemap: true,
            format: 'es',
            banner: '#!/usr/bin/env node'
        },
        plugins: [
            typescript({
                "module": "esnext",
            }),
            resolve({exportConditions: ["node"], preferBuiltins: true}),
            commonjs(),
            terser(),
            json()
        ]
    };
}

export default [
    bundleScript('src/cli.ts', 'bin/cli.mjs')
];
