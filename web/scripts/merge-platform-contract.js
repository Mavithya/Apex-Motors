/* eslint-disable @typescript-eslint/no-require-imports -- This build script runs in Node's CommonJS package scope. */
const fs = require('node:fs')
const path = require('node:path')

const manifestPath = path.resolve(__dirname, '../fivora-template.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const contract = JSON.parse(fs.readFileSync(require.resolve('@deneb-ui/ui/platform-contract'), 'utf8'))
const siteData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/site-data.json'), 'utf8'))
const known = new Set()
function collect(value, prefix = '') {
  if (Array.isArray(value)) value.forEach((item) => collect(item, `${prefix}[*]`))
  else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => collect(item, prefix ? `${prefix}.${key}` : key))
  else if (prefix) known.add(prefix)
}
function collectSchema(field, prefix) {
  if (field.type === 'list') {
    for (const child of field.fields ?? []) collectSchema(child, `${prefix}[*].${child.key}`)
    if (field.itemField) collectSchema(field.itemField, `${prefix}[*]`)
  } else if (field.type === 'object') {
    for (const child of field.fields ?? []) collectSchema(child, `${prefix}.${child.key}`)
  } else known.add(prefix)
}
collect(siteData.content)
for (const section of manifest.editorSchema?.sections ?? []) collectSchema(section, section.path ?? section.id)
manifest.visualEditing ??= { contractVersion: 1, mode: 'strict' }
manifest.visualEditing.controlOnlyPaths = Array.from(new Set([
  ...(manifest.visualEditing.controlOnlyPaths ?? []),
  ...(contract.platformControlledPaths ?? []).filter((field) => known.has(field)),
])).sort()
const next = JSON.stringify(manifest, null, 2) + '\n'
if (fs.readFileSync(manifestPath, 'utf8') !== next) fs.writeFileSync(manifestPath, next)
