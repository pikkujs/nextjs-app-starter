import { LogLevel } from '@vramework/core/services/logger'
import { Config } from './application-types'
import { CreateConfig } from '@vramework/core'

export const getConfig: CreateConfig<Config> = async () => ({
  logLevel: LogLevel.debug,
})
