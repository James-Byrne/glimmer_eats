'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const prod = process.env.EMBER_ENV === 'production';

module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    rollup: {
      plugins: [
        resolve({ jsnext: true, module: true, main: true }),
        commonjs()
      ]
    },
    addons: {
      blacklist: prod ? [] : ['ember-service-worker'],
    },
    'asset-cache': {
      include: [
        'assets/**/*',
        '**/*',
        'sw-registration.js',
      ],
      exclude: [
        '**/*.txt',
        '**/*.css',
        'test.json',
        'sw.js',
      ],
      version: 1,
      requestMode: 'cors',
    },
    'esw-cache-fallback': {
      patterns: [
        'https://developers.zomato.com/api/(.+)',
      ],
    },
    minifyJS: {
      enabled: prod,
      options: {
        mangle: true,
      },
    },
    minifyCSS: {
      enabled: prod,
    },
    inlineContent: {
      'critical-css': 'src/ui/styles/app.css',
    },
    minifyHTML: {
      enabled: prod,
      htmlFiles: ['index.html'],
      minifierOptions: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    },
  });

  return app.toTree();
};
