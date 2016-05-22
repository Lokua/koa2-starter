import app from './server'
import { agent } from 'supertest'

const request = agent(app.listen())

describe('server:router', () => {
  it('should return index.html', done => {
    request.get('/')
      .expect('Content-Type', /text\/html/)
      .expect(res => {
        assert.isTrue(res.text.startsWith('<!doctype html>'))
      })
      .expect(200, done)
  })
})
