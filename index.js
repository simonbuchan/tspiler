#!/usr/bin/env node
'use strict';
var ts = require('typescript');

var args = ts.parseCommandLine(process.argv.slice(2));
// TODO: find and parse tsconfig.json
if (args.errors && args.errors.length) {
  args.errors.forEach(console.error);
  process.exit(1);
}

// TODO: Support this
if (args.fileNames && args.fileNames.length) {
  console.error("File names not supported yet, stdin only");
  process.exit(2);
}

var input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (chunk) {
  input += chunk;
});
process.stdin.on('end', function (chunk) {
  /* TODO: use ts.transpileModule(input, {
        compilerOptions?: CompilerOptions;
        fileName?: string;
        reportDiagnostics?: boolean;
        moduleName?: string;
        renamedDependencies?: Map<string>;
    }: {
        outputText: string;
        diagnostics?: Diagnostic[];
        sourceMapText?: string;
    }
   */
  var output = ts.transpile(input, args.options);
  process.stdout.write(output);
});
process.stdin.resume();
