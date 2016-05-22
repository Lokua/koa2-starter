import app from './server'
import { agent } from 'supertest'

const request = agent(app.listen())

describe('server:api', () => {
  describe('get foo', () => {
    it('should return foo', done => {
      request.get('/api/foo')
        .expect('Content-Type', /json/)
        .expect(200, { foo: true }, done)
    })
  })
})
