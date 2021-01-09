import { loki } from './loki'
import { jaeger } from './jaeger'
import * as appPackage from '../../package.json'

const appCfg: any = {
  port: process.env.APP_PORT || 80,
  name: process.env.APP_NAME || appPackage.name,
  isMaster: process.env.IS_MASTER || 'no',
  childNodeHost: process.env.CHILD_NODE_HOST || 'xxx',
}

export class Config {
  app: any = appCfg
  public loki: any = loki
  public jaeger: any = jaeger
}

export const config = new Config()
