import { CreateConfig } from '@vramework/core'
import { LogLevel } from '@vramework/core/services'
import { Config } from './application-types.js'

export const getConfig: CreateConfig<Config> = async () => ({
  logLevel: LogLevel.debug,
})
