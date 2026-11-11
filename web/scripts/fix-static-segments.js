/* eslint-disable @typescript-eslint/no-require-imports -- Node build script. */
const fs = require('node:fs')
const path = require('node:path')

// Next 16.4 can export segment filenames as nested directories on Windows.
// The client requests dot-separated names on every operating system.
const output = path.resolve(__dirname, '../out')
function walk(directory, segmentRoot) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    const root = segmentRoot ?? (entry.isDirectory() && entry.name.startsWith('__next.') ? file : undefined)
    if (entry.isDirectory()) walk(file, root)
    else if (root && entry.name.endsWith('.txt')) {
      const relative = path.relative(path.dirname(root), file)
      const target = path.join(path.dirname(root), relative.split(path.sep).join('.'))
      if (target !== file) fs.copyFileSync(file, target)
    }
  }
}
if (fs.existsSync(output)) walk(output)
