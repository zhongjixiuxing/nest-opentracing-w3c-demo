import { Body, Controller, Post, Res, Req } from '@nestjs/common'
import { Response, Request } from 'express'
import { SearchDto } from '@app/common/dto/search.dto'

@Controller('admin')
export class AdminController {
  @Post('ping')
  async delete(
    @Res() res: Response,
    @Req() req: Request,
    @Body() requestDto: SearchDto,
  ) {
    res.json({
      err: 0,
      data: { requestArgs: requestDto, headers: req.headers },
    })
  }
}
