import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import less from "rollup-plugin-less";
// import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
// import image from "@rollup/plugin-image";
const packageJson = require("./package.json");

export default {
	input: "src/index.ts",
	output: [
		{
			file: packageJson.main,
			format: "cjs",
			sourcemap: true
		},
		{
			file: packageJson.module,
			format: "esm",
			sourcemap: true
		}
	],
	plugins: [
		peerDepsExternal(),
		resolve({
			browser: true
		}),
		commonjs(),
		// image(),
		typescript({ useTsconfigDeclarationDir: true }),
		less(),
		copy({
			targets: [
				{
					src: "src/variables.less",
					dest: "build",
					rename: "variables.less"
				},
				{
					src: "rollup.build.css",
					dest: "build",
					rename: "styles.css"
				},
			]
		})
	]
};
