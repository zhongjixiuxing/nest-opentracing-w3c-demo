import { Body, Controller, Post, Res, Req, HttpService } from '@nestjs/common'
import { Response, Request } from 'express'
import { SearchDto } from '@app/common/dto/search.dto'
import { config } from '@app/config'

@Controller('admin')
export class AdminController {
  constructor(private httpService: HttpService) {}
  @Post('ping')
  async delete(
    @Res() res: Response,
    @Req() req: Request,
    @Body() requestDto: SearchDto,
  ) {
    const result: any = { requestArgs: requestDto, headers: req.headers }
    if (config.app.isMaster === 'yes') {
      const nodeRes = await this.httpService
        .post(`http://${config.app.childNodeHost}/admin/ping`, {
          ...requestDto,
        })
        .toPromise()

      result.childNodeResult = nodeRes.data
    }

    res.json({
      err: 0,
      data: result,
    })
  }
}
