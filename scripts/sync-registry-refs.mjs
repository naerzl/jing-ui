import { readFileSync, writeFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
const registry = JSON.parse(readFileSync('registry.json', 'utf8'))
const prefix = 'naerzl/jing-ui/'
const ref = `v${packageJson.version}`
const checkOnly = process.argv.includes('--check')

let changed = false
for (const item of registry.items) {
  if (!item.registryDependencies) continue
  item.registryDependencies = item.registryDependencies.map((dependency) => {
    if (!dependency.startsWith(prefix)) return dependency
    const base = dependency.split('#')[0]
    const next = `${base}#${ref}`
    changed ||= dependency !== next
    return next
  })
}

if (changed && checkOnly) {
  throw new Error(
    `自有 registry 依赖未锁定到 ${ref}，请运行 pnpm registry:sync`,
  )
}

if (changed) {
  writeFileSync('registry.json', `${JSON.stringify(registry, null, 2)}\n`)
  console.log(`已将自有 registry 依赖锁定到 ${ref}`)
} else {
  console.log(`自有 registry 依赖已锁定到 ${ref}`)
}
