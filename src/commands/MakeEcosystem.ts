import { CLICommand, BaseAddonCommand } from '@discord-factory/core-next'
import Addon from '../index'
import path from 'path'
import fs from 'fs'
import Logger from '@leadcodedev/logger'

@CLICommand({
  name: 'Create ecosystem file',
  prefix: 'pm2:ecosystem',
  usages: []
})
export default class MakeEcosystem extends BaseAddonCommand<Addon> {
  public async run (filename: string): Promise<void> {
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