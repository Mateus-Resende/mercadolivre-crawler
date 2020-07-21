import { SearchController } from './search'
import { MissingParamError } from '../../errors'

interface SutTypes {
  sut: SearchController
}

const makeSut = (): SutTypes => ({
  sut: new SearchController()
})

describe('Search Controller', () => {
  test('Should return 400 if no search is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        limit: 10
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('search'))
  })

  test('Should return 400 if no limit is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        search: 'any_search'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('limit'))
  })
})
