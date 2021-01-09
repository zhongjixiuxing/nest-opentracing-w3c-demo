import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DefaultExceptionsFilter } from '@app/filter/default.exception.filter'
import { INestApplication } from '@nestjs/common'
import { initTracing } from '@app/service/tracing'
import { trace } from '@opentelemetry/api'
import { OpenTelemetryLogger } from './service/logger'
import { config } from '@app/config'

initTracing()
const tracer = trace.getTracer('nest-tracer')

/**
 * 初始化应用
 * @param app {INestApplication}
 */
const initialApp = async (app: INestApplication) => {
  app.useGlobalFilters(new DefaultExceptionsFilter())
}

async function bootstrap() {
  // const app: INestApplication = await NestFactory.create(AppModule)
  const logger = new OpenTelemetryLogger(tracer)
  const appCreateSpan = tracer.startSpan('Create nest app', { root: true })
  const app = await tracer.withSpan(appCreateSpan, async () => {
    const app = await NestFactory.create(AppModule, {
      logger,
    })

    await app.init()
    return app
  })

  appCreateSpan.end()
  await initialApp(app)
  await app.listen(config.app.port)
}
bootstrap()
