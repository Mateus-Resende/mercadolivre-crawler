import { SearchProduct, SearchModel } from '../../domain/use-cases/search-product'
import { ProductModel } from '../../domain/models/product'
import { MarketplaceRepository } from '../protocols/marketplace-repository'

export class WebSearchProduct implements SearchProduct {
  private readonly marketplaceRepository: MarketplaceRepository

  constructor (marketplaceRepository: MarketplaceRepository) {
    this.marketplaceRepository = marketplaceRepository
  }

  search (search: SearchModel): ProductModel[] {
    this.marketplaceRepository.search(search)
    return []
  }
}
