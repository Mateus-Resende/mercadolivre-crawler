import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/crawler-search')
      .send({
        search: 'teclado mecanico',
        limit: 200
      })
      .expect(200)
  })
})
