import { IsBoolean, IsObject, IsNumber, IsOptional } from 'class-validator'

export class SearchDto {
  @IsOptional()
  @IsObject()
  readonly next: any

  @IsNumber()
  page = 1

  @IsNumber()
  @IsOptional()
  limit = 30

  @IsOptional()
  @IsObject()
  conds: any = {}

  @IsOptional()
  @IsBoolean()
  returnTotal = false
}
