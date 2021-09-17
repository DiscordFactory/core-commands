import { BaseAddon } from '@discord-factory/core-next'
import MakeCommand from './commands/MakeCommand'
import MakeHook from './commands/MakeHook'
import MakeEvent from './commands/MakeEvent'

export default class Index extends BaseAddon<Index> {
  public addonName = 'core-commands'

  public async init (): Promise<Index> {
    return this
  }

  public registerHooks () {
    return []
  }

  public registerCLI () {
    return [
      MakeCommand,
      MakeHook,
      MakeEvent,
    ]
  }

  public registerCommands () {
    return []
  }

  public registerEvents () {
    return [
    ]
  }

  public defineKeys () {
    return []
  }
}