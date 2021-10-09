import { CLI, BaseCli, CliContextRuntime } from '@discord-factory/core-next'
import Addon from '../index'
import path from 'path'
import Logger from '@leadcodedev/logger'
import { prompt } from 'enquirer'
import { eventList, makeFileName } from '../utils'
import fs from 'fs'

@CLI({
  prefix: 'make:event',
  description: 'Generate a new event file at the given location',
  args: ['filename'],
  config: {
    allowUnknownOptions: false,
    ignoreOptionDefaultValue: false
  }
})
export default class MakeEvent extends BaseCli<Addon> {
  public async run ({ args }: CliContextRuntime): Promise<void> {
    const location = path.parse(args.filename as string)
    const targetFile = path.join(process.cwd(), 'src', location.dir, `${location.name}.ts`)

    const result = await this.choiceEvent() as { event: string }
    const eventParams = eventList[result.event] as string
    const types = eventParams.includes(',')
      ? eventParams.split(',')
      : [eventParams]

    const paramsTypes = this.getUniqueTypes(types
      .flatMap((param: string) => param.split(': ')[1])
      .filter((a) => a !== 'string' && a !== 'number' && a !== 'null' && a !== 'undefined')
    )

    const importParamsTypes = paramsTypes
      .join(', ')

    const templateFile = await fs.promises.readFile(
      path.join(__dirname, '..', '..', 'src', 'templates', 'Event.txt'),
      { encoding: 'utf-8' }) as unknown as string

    try {
      await fs.promises.mkdir(path.join(process.cwd(), 'src', location.dir), { recursive: true })
      const fileData = templateFile
        .replace(/\$fileName/g, makeFileName(location.name))
        .replace(/\$event/g, result.event)
        .replace(/\$params/g, eventParams)
        .replace(/\$imports/g, `import { ${importParamsTypes} } from 'discord.js'`)

      await fs.promises.writeFile(targetFile, fileData)
      Logger.send('info', `File was created in ${targetFile.replace(/\\/g, '\\\\')}`)
    } catch (e) {
      Logger.send('error', e.message)
    }
  }

  protected async choiceEvent (): Promise<any> {
    try {
      return prompt({
        name: 'event',
        message: 'Please choose an event from the list below',
        type: 'autocomplete',
        choices: Object.keys(eventList),
      })
    } catch {
      Logger.send('error', 'An error has occurred')
    }
  }

  private getUniqueTypes(duplicateTypes) {
    const array: string[] = []
    duplicateTypes.forEach((type: string) => {
      const whitelistedType = type
        .replace(/\| null/g, '')
        .replace(/\| number/g, '')
        .replace(/\| string/g, '')
        .replace(/\| undefined/g, '')
        .trim()

      if (!array.includes(whitelistedType)) {
        array.push(whitelistedType)
      }
    })
    return array
  }
}