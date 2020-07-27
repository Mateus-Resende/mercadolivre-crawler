import request from 'supertest'
import app from '../config/app'

describe('Search Routes', () => {
  test('Should return 200 on success', async () => {
    await request(app)
      .post('/api/crawler-search')
      .send({
        search: 'teclado mecanico',
        limit: 200
      })
      .expect(200)
  })
})
