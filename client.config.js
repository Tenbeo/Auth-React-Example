import esbuild from "esbuild";
import { htmlPlugin } from "@craftamap/esbuild-plugin-html"
import { livereloadPlugin } from "@jgoz/esbuild-plugin-livereload"
import * as fs from "fs";
import { parseArguments } from "@zouloux/cli";

// ----------------------------------------------------------------------------- ARGUMENTS
// Parse arguments and store in module scope
const _args = parseArguments({
	flagAliases: {
		d: 'dev'
	},
	defaultFlags: {
		dev: false
	}
})
const isDev = _args.flags.dev

// ----------------------------------------------------------------------------- PLUGINS

const plugins = [
	htmlPlugin({
		files: [
			{
				entryPoints: [ "src/client/index.tsx" ],
				filename: `client/index.html`,
				htmlTemplate: fs.readFileSync( "src/client/index.html" ),
				scriptLoading: "defer",
				hash: true
			}
		]
	})
]
if ( isDev ) {
	plugins.push(
		livereloadPlugin({
			port: 8865 // different port than middleware
		})
	)
}

// ----------------------------------------------------------------------------- BUILD CONTEXT
// Create build context
const _buildContext = await esbuild.context({
	target: [ 'chrome58', 'edge18', 'firefox57', 'safari11' ],
	platform: "browser",
	format: "iife",
	minify: !isDev,
	bundle: true,
	loader: {
		'.tsx' : 'tsx',
	},
	assetNames: '[hash]',
	chunkNames: '[hash]',
	metafile: true,
	write: true,
	plugins: plugins,
	logLevel: "info",
	outbase: "src/",
	entryPoints: ["src/client/index.tsx"],
	outdir: "dist/"
})

// ----------------------------------------------------------------------------- DEV OR BUILD

// Dev mode
if ( isDev ) {
	await _buildContext.watch()
}
// Build mode
else {
	await _buildContext.rebuild()
	await _buildContext.dispose()
}
