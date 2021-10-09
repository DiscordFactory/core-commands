import { CLI, BaseCli, CliContextRuntime } from '@discord-factory/core-next'
import Addon from '../index'
import path from 'path'
import fs from 'fs'
import Logger from '@leadcodedev/logger'

@CLI({
  prefix: 'make:context-menu',
  description: 'Generate a new context-menu file at the given location',
  args: ['filename'],
  config: {
    allowUnknownOptions: false,
    ignoreOptionDefaultValue: false
  }
})
export default class MakeContextMenu extends BaseCli<Addon> {
  public async run ({ args }: CliContextRuntime): Promise<void> {
    const location = path.parse(args.filename as string)
    const targetFile = path.join(process.cwd(), 'src', location.dir, `${location.name}.ts`)

    const templateFile = await fs.promises.readFile(
      path.join(__dirname, '..', '..', 'src', 'templates', 'ContextMenu.txt'),
      { encoding: 'utf-8' }) as unknown as string

    const filenameUpper = location.name.charAt(0).toUpperCase() + location.name.slice(1)

    try {
      await fs.promises.mkdir(path.join(process.cwd(), 'src', location.dir), { recursive: true })
      const fileData = templateFile
        .replace(/\$fileNameLower/g, filenameUpper.toLowerCase())
        .replace(/\$fileName/g, filenameUpper)

      await fs.promises.writeFile(targetFile, fileData)
      Logger.send('info', `File was created in ${targetFile.replace(/\\/g, '\\\\')}`)
    } catch (e) {
      console.log(e)
    }
  }
}