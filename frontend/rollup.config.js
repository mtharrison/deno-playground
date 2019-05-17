import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import commonjs from "rollup-plugin-commonjs";
import json from 'rollup-plugin-json'

export default [
	{
		input: 'src/main.ts',
		output: {
            file: 'static/bundle.js',
            format: 'iife'
		},
		plugins: [
			typescript(),
			commonjs(),
			resolve(),
			json()
		]
	}
];
