import { SearchModel } from '../../domain/use-cases/search-product'
import { ProductModel } from '../../domain/models/product'
import { WebCrawlerRepository } from '../protocols/web-crawler-repository'
import { WebSearchProduct } from './web-search-products'

const makeMarketplaceRepository = (): WebCrawlerRepository => {
  class MarketplaceRepositoryStub implements WebCrawlerRepository {
    async search (searchData: SearchModel): Promise<ProductModel[]> {
      const fakeProduct = {
        name: 'any_name',
        link: 'any_link',
        price: 10.9,
        store: 'any_store',
        state: 'any_state'
      }
      return await Promise.resolve([fakeProduct, fakeProduct])
    }
  }
  return new MarketplaceRepositoryStub()
}

interface SutTypes {
  sut: WebSearchProduct
  marketplaceRepositoryStub: WebCrawlerRepository
}

const makeSut = (): SutTypes => {
  const marketplaceRepositoryStub = makeMarketplaceRepository()
  const sut = new WebSearchProduct(marketplaceRepositoryStub)
  return { sut, marketplaceRepositoryStub }
}

describe('WebSearchProduct UseCase', () => {
  test('should call MarketplaceRepository with correct values', async () => {
    const { sut, marketplaceRepositoryStub } = makeSut()
    const repositorySpy = jest.spyOn(marketplaceRepositoryStub, 'search')
    await sut.search({
      text: 'any_search',
      limit: 10
    })
    expect(repositorySpy).toHaveBeenCalledWith({
      text: 'any_search',
      limit: 10
    })
  })

  test('should throw if MarketplaceRepository throws', async () => {
    const { sut, marketplaceRepositoryStub } = makeSut()
    jest
      .spyOn(marketplaceRepositoryStub, 'search')
      .mockImplementationOnce(async () => new Promise((resolve, reject) => reject(new Error())))
    const searchData = {
      text: 'any_search',
      limit: 10
    }
    const promise = sut.search(searchData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an array of ProductModel on success', async () => {
    const { sut } = makeSut()
    const searchData = {
      text: 'any_search',
      limit: 10
    }
    const products = await sut.search(searchData)
    expect(products).toEqual([
      {
        name: 'any_name',
        link: 'any_link',
        price: 10.9,
        store: 'any_store',
        state: 'any_state'
      },
      {
        name: 'any_name',
        link: 'any_link',
        price: 10.9,
        store: 'any_store',
        state: 'any_state'
      }
    ])
  })
})
