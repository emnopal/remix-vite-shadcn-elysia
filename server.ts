import chalk from 'chalk'
import { Elysia } from 'elysia'
import { remix } from 'elysia-remix'
import fs from 'fs'
import { Logestic } from 'logestic';

const start = Date.now()
const port = Number(process.env.PORT) || 3000

let viteVersion: string
let remixVersion: string

// get vite and remix version from package.json
if (process.env.NODE_ENV !== 'production') {
  viteVersion = JSON.parse(
    fs.readFileSync('node_modules/vite/package.json', 'utf-8'),
  ).version
  remixVersion = JSON.parse(
    fs.readFileSync('node_modules/@remix-run/dev/package.json', 'utf-8'),
  ).version
}

const app = new Elysia()
  .use(await remix())
  .use(Logestic.preset('common', { showLevel: true }))

app.listen(port, () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('http://localhost:' + port)
  } else {
    // since we're using a custom server, emulate what vite dev server prints
    const elapsed = Date.now() - start

    console.log(
      `  ${chalk.greenBright.bold('VITE')} ${chalk.green(
        `v${viteVersion}`,
      )} ${chalk.blueBright.bold('Remix')} ${chalk.blue(
        `v${remixVersion}`,
      )} ready in ${chalk.bold(elapsed)} ms`,
    )
    console.log()
    console.log(
      `  ${chalk.greenBright.bold('➜')}  ${chalk.bold('Local:')}   ${chalk.cyan(
        'http://localhost:' + port,
      )}`,
    )
    console.log()
  }
})
