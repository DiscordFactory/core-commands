import { BaseAddon } from '@discord-factory/core-next'
import MakeCommand from './commands/MakeCommand'
import MakeHook from './commands/MakeHook'
import MakeEvent from './commands/MakeEvent'
import MakeContextMenu from './commands/MakeContextMenu'
import MakeEcosystem from './commands/MakeEcosystem'

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
      MakeContextMenu,
      MakeEcosystem,
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