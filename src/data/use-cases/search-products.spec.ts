import { SearchModel } from '../../domain/use-cases/search-product'
import { ProductModel } from '../../domain/models/product'
import { MarketplaceRepository } from '../protocols/marketplace-repository'
import { WebSearchProduct } from './search-products'

const makeMarketplaceRepository = (): MarketplaceRepository => {
  class MarketplaceRepositoryStub implements MarketplaceRepository {
    search (searchData: SearchModel): ProductModel[] {
      const fakeProduct = {
        name: 'any_name',
        link: 'any_link',
        price: 10.9,
        store: 'any_store',
        state: 'any_state'
      }
      return [fakeProduct]
    }
  }
  return new MarketplaceRepositoryStub()
}

interface SutTypes {
  sut: WebSearchProduct
  marketplaceRepositoryStub: MarketplaceRepository
}

const makeSut = (): SutTypes => {
  const marketplaceRepositoryStub = makeMarketplaceRepository()
  const sut = new WebSearchProduct(marketplaceRepositoryStub)
  return { sut, marketplaceRepositoryStub }
}

describe('WebSearchProduct UseCase', () => {
  test('should call MarketplaceRepository with correct values', () => {
    const { sut, marketplaceRepositoryStub } = makeSut()
    const repositorySpy = jest.spyOn(marketplaceRepositoryStub, 'search')
    sut.search({ search: 'any_search', limit: 10 })
    expect(repositorySpy).toHaveBeenCalledWith({ search: 'any_search', limit: 10 })
  })
})
