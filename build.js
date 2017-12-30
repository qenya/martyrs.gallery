#!/usr/bin/env node

var Metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var paths       = require('metalsmith-paths');
var permalinks  = require('metalsmith-permalinks');

Metalsmith(__dirname)
	.source('src')
	.destination('public')
	.use(markdown())
	.use(permalinks({
		relative: false
	}))
	.use(collections({
		homepage: {
			pattern: ["**/*.html", "!index.html"],
			sortBy: "homepage-order"
		},
		"Plan a Visit": {
			sortBy: "collection-order"
		},
		"About Us": {
			sortBy: "collection-order"
		},
		"Get Involved": {
			sortBy: "collection-order"
		}
	}))
	.use(paths({
		directoryIndex: "index.html"
	}))
	.use(require("metalsmith-debug")())
	.use(layouts({
		engine: 'nunjucks',
		default: 'pages.html',
		pattern: '**/*.html'
	}))
	.build(err => {if (err) throw err;});
