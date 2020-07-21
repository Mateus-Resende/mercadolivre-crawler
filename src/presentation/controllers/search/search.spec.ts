import { SearchController } from './search'
import { MissingParamError } from '../../errors'

describe('Search Controller', () => {
  test('Should return 400 if no search is provided', () => {
    const sut = new SearchController()
    const httpRequest = {
      body: {
        limit: 10
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('search'))
  })
})
