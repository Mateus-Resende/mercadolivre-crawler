import { SearchController } from './search'
import { MissingParamError } from '../../errors'
import { SearchProduct, SearchModel } from '../../../domain/use-cases/search-product'
import { ProductModel } from '../../../domain/models/product'
import { ServerError } from '../../errors/server-error'

const makeSearchProduct = (): SearchProduct => {
  class SearchProductStub implements SearchProduct {
    async search (search: SearchModel): Promise<ProductModel[]> {
      return new Promise(resolve => resolve([{
        name: 'any_name',
        link: 'any_link',
        price: 10.9,
        store: 'any_store',
        state: 'any_state'
      }]))
    }
  }
  return new SearchProductStub()
}

interface SutTypes {
  sut: SearchController
  searchProductStub: SearchProduct
}

const makeSut = (): SutTypes => {
  const searchProductStub = makeSearchProduct()
  const sut = new SearchController(searchProductStub)
  return {
    sut,
    searchProductStub
  }
}

describe('Search Controller', () => {
  test('Should return 400 if no search is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        limit: 10
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('search'))
  })

  test('Should return 400 if no limit is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        search: 'any_search'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('limit'))
  })

  test('Should call the SearchProducts with the correct values', async () => {
    const { sut, searchProductStub } = makeSut()
    const searchSpy = jest.spyOn(searchProductStub, 'search')
    const httpRequest = {
      body: {
        search: 'any_search',
        limit: 10
      }
    }
    await sut.handle(httpRequest)
    expect(searchSpy).toHaveBeenCalledWith({ search: 'any_search', limit: 10 })
  })

  test('Should return 500 if SearchProduct throws', async () => {
    const { sut, searchProductStub } = makeSut()
    jest.spyOn(searchProductStub, 'search').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        search: 'any_search',
        limit: 10
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        search: 'any_search',
        limit: 10
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([{
      name: 'any_name',
      link: 'any_link',
      price: 10.9,
      store: 'any_store',
      state: 'any_state'
    }])
  })

  test('Should return 204 if valid data is provided but not results', async () => {
    const { sut, searchProductStub } = makeSut()
    jest.spyOn(searchProductStub, 'search').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpRequest = {
      body: {
        search: 'any_search',
        limit: 10
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(204)
    expect(httpResponse.body).toEqual(null)
  })
})
