import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common'
import { AdminController } from './admin.controller'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {} // eslint-disable-line
}
