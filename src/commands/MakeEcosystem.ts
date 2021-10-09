import { CLI, BaseCli } from '@discord-factory/core-next'
import Addon from '../index'
import path from 'path'
import fs from 'fs'
import Logger from '@leadcodedev/logger'

@CLI({
  prefix: 'pm2:ecosystem',
  description: 'Generate a new ecosystem.config.js file at root project',
  config: {
    allowUnknownOptions: false,
    ignoreOptionDefaultValue: false
  }
})
export default class MakeEcosystem extends BaseCli<Addon> {
  public async run (): Promise<void> {
    const targetFile = path.join(process.cwd(), 'ecosystem.config.js')

    const templateFile = await fs.promises.readFile(
      path.join(__dirname, '..', '..', 'src', 'templates', 'Ecosystem.txt'),
      { encoding: 'utf-8' }) as unknown as string

    try {
      await fs.promises.writeFile(targetFile, templateFile)
      Logger.send('info', 'Ecosystem file was create in your root project.')
    } catch (e) {
      console.log(e)
    }
  }
}