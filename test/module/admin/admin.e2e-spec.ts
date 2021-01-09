import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@app/app.module'
import { expect } from '@jest/globals'
import * as _ from 'lodash'

describe('AdminModule#AppController (e2e)', () => {
  let app: INestApplication
  let moduleFixture: TestingModule
  afterAll(async (done) => {
    if (app) {
      await app.close()
    }
    done()
  })

  beforeEach(async (done) => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
    done()
  })

  it('/admin/ping (POST)', async () => {
    const body = {
      name: 'anxing',
      remark: '',
    }
    const result = await request(app.getHttpServer())
      .post('/admin/ping')
      .send(body)

    expect(result.body.err).toBe(0)
    expect(_.omit(result.body.data, 'headers')).toEqual({ requestArgs: body })
  })
})
