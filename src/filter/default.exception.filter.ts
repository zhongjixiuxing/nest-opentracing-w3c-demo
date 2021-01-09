import { logger } from '@app/service'
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class DefaultExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request: Request = ctx.getRequest<Request>()
    const response: Response = ctx.getResponse<Response>()
    logger.error('未知错误', {
      exception: exception.stack,
      labels: { _url: request.url, _method: request.method },
    })

    response.status(200).json({
      err: -1,
      data: 'Internal Service Error.',
    })
  }
}
