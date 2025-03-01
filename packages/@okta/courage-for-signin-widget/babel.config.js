import * as tsModuleResolver from 'babel-plugin-tsconfig-paths-module-resolver';

// Use aliases from tsconfig, with a couple exceptions
const createResolvePath = tsModuleResolver.default.createResolvePath;
const defaultResolvePath = createResolvePath();
function customResolvePath(sourceFile, currentFile, opts) {
  // Do not transform handlebars-inline-precompile
  if (sourceFile === 'handlebars-inline-precompile') {
    return sourceFile;
  }
  // Bundles are external and setup by top-level webpack
  if (sourceFile === 'okta-i18n-bundles') {
    return sourceFile;
  }
  return defaultResolvePath(sourceFile, currentFile, opts);
}

const presets = [
  '@babel/preset-typescript', // must run first: https://github.com/babel/babel/issues/12066
];

const plugins = [
  '@okta/babel-plugin-handlebars-inline-precompile', // should always come first
  // tsconfig.paths replaces babel/webpack aliases
  ['tsconfig-paths-module-resolver', {
    resolvePath: customResolvePath,
    alias: {
      '^handlebars(/runtime)?$': './lib/handlebars/dist/cjs/handlebars.runtime',
      '^backbone$': './src/courage/vendor/lib/backbone.js',
      '^jquery$': './src/courage/vendor/lib/jquery-1.12.4.js',
      '^underscore$': './lib/underscore/underscore-min.js'
    }
  }],
  ['transform-amd-to-commonjs', {
    restrictToTopLevelDefine: false
  }],
  '@babel/plugin-transform-shorthand-properties' // ES shorthand functions cannot be used as constructors
];

const targets = {
  esmodules: true,
  node: 'current'
};

const babelConfig = {
  presets,
  plugins,
  targets,
  inputSourceMap: true,
  sourceMaps: true
};

export default babelConfig;
