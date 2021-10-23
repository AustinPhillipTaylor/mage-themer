import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import replace from "@rollup/plugin-replace"
import typescript from "rollup-plugin-typescript2"
import json from "@rollup/plugin-json"
import styles from "rollup-plugin-styles"
import path from "path"

export default {
	input: "./src/code.ts",
	output: {
		file: path.join(
			__dirname,
			"./build/figma/code.js"
		),
		format: "cjs",
	},
	plugins: [
		typescript( { check: true } ),
		nodeResolve( { browser: true } ),
		commonjs( { esmExternals: true, sourceMap: false } ),
		styles(),
		json(),
		replace( {
			values: {
				"process.env.NODE_ENV": JSON.stringify( "production" ),
			},
			preventAssignment: true,
		} ),
		terser(),
	],
}
